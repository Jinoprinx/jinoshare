import { buildVideoPrompt } from "@jino/ai/src/prompts";
import { Router, Request, Response } from "express";
import axios from "axios";
import fs from "fs/promises";
import path from "path";
import crypto from "crypto";

export const aiVideoGenerateRouter = Router();

// Create media storage directory if it doesn't exist
const MEDIA_DIR = path.join(process.cwd(), 'ai-generated');
fs.mkdir(MEDIA_DIR, { recursive: true }).catch(() => {});

aiVideoGenerateRouter.post("/", async (req: Request, res: Response) => {
  try {
    const { 
      prompt, 
      duration = 5, 
      style = "cinematic", 
      dimensions = "1024x1024" 
    } = req.body || {};

    if (!prompt) {
      return res.status(400).json({ ok: false, error: "prompt is required" });
    }

    // Check if AI video generation is configured
    const apiUrl = process.env.AI_VIDEO_API_URL;
    const apiKey = process.env.AI_VIDEO_API_KEY;

    if (!apiUrl || !apiKey) {
      // Development fallback - create a placeholder video URL
      return res.json({ 
        ok: true, 
        videoUrl: "https://sample-videos.com/zip/10/mp4/SampleVideo_1280x720_1mb.mp4",
        message: "AI_VIDEO_API_URL/KEY not set. Using placeholder video.",
        duration: duration
      });
    }

    const videoApiEndpoint = `${apiUrl}/generate-video`;
    const [width, height] = dimensions.split('x').map(Number);
    const format = width > height ? 'horizontal' : height > width ? 'vertical' : 'square';
    const finalPrompt = buildVideoPrompt(prompt, "generic", duration, format, style);

    // Make the video generation request
    const response = await axios.post(videoApiEndpoint, {
      prompt: finalPrompt,
      duration,
      width,
      height
    }, {
      headers: {
        "Authorization": `Bearer ${apiKey}`,
        "Content-Type": "application/json"
      },
      timeout: 300000 // 5 minutes timeout for video generation
    });

    // The response format will vary by provider, but typically includes a video URL or generation ID
    let videoUrl;
    let generationId;

    if (response.data?.video_url) {
      videoUrl = response.data.video_url;
    } else if (response.data?.url) {
      videoUrl = response.data.url;
    } else if (response.data?.id) {
      generationId = response.data.id;
      // If we get an ID, we might need to poll for completion
      // For simplicity, we'll return a pending status
      return res.json({
        ok: true,
        generationId: generationId,
        status: "generating",
        message: "Video generation started. Check status with the generation ID.",
        estimatedTime: duration * 30 // Rough estimate: 30 seconds per second of video
      });
    } else {
      throw new Error("No video URL or generation ID returned from AI service");
    }

    // Download and store the video locally
    const videoResponse = await axios.get(videoUrl, { 
      responseType: 'arraybuffer',
      timeout: 300000 // 5 minutes timeout for download
    });
    
    const fileId = crypto.randomUUID();
    const filename = `ai-video-${fileId}.mp4`;
    const filePath = path.join(MEDIA_DIR, filename);

    await fs.writeFile(filePath, videoResponse.data);

    // Return local URL
    const localVideoUrl = `/api/media-storage/serve-ai/${filename}`;
    
    res.json({ 
      ok: true, 
      videoUrl: localVideoUrl,
      originalPrompt: prompt,
      style,
      duration,
      dimensions
    });

  } catch (err: any) {
    console.error("AI Video Generation Error:", err);
    const message = err.response?.data ? JSON.stringify(err.response.data) : err.message;
    res.status(500).json({ ok: false, error: "Failed to generate video", detail: message });
  }
});

// Check status of video generation (for async generation services)
aiVideoGenerateRouter.get("/status/:generationId", async (req: Request, res: Response) => {
  try {
    const { generationId } = req.params;
    const apiUrl = process.env.AI_VIDEO_API_URL;
    const apiKey = process.env.AI_VIDEO_API_KEY;

    if (!apiUrl || !apiKey) {
      return res.status(400).json({ ok: false, error: "AI video service not configured" });
    }

    const response = await axios.get(`${apiUrl}/status/${generationId}`, {
      headers: {
        "Authorization": `Bearer ${apiKey}`,
        "Content-Type": "application/json"
      }
    });

    const status = response.data;
    
    // If video is ready and we have a URL, download and store it
    if (status.status === 'completed' && status.video_url) {
      const videoResponse = await axios.get(status.video_url, { 
        responseType: 'arraybuffer',
        timeout: 300000 
      });
      
      const filename = `ai-video-${generationId}.mp4`;
      const filePath = path.join(MEDIA_DIR, filename);
      
      await fs.writeFile(filePath, videoResponse.data);
      
      const localVideoUrl = `/api/media-storage/serve-ai/${filename}`;
      
      res.json({
        ok: true,
        status: 'completed',
        videoUrl: localVideoUrl
      });
    } else {
      res.json({
        ok: true,
        status: status.status || 'processing',
        progress: status.progress || 0
      });
    }

  } catch (err: any) {
    console.error("AI Video Status Check Error:", err);
    const message = err.response?.data ? JSON.stringify(err.response.data) : err.message;
    res.status(500).json({ ok: false, error: "Failed to check video generation status", detail: message });
  }
});