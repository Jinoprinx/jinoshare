import { Router, Request, Response } from "express";
import { buildImagePrompt } from "@jino/ai";
import axios from "axios";
import fs from "fs/promises";
import path from "path";
import crypto from "crypto";

export const aiImageGenerateRouter = Router();

// Create media storage directory if it doesn't exist
const MEDIA_DIR = path.join(process.cwd(), 'ai-generated');
fs.mkdir(MEDIA_DIR, { recursive: true }).catch(() => {});

aiImageGenerateRouter.post("/", async (req: Request, res: Response) => {
  try {
    const { 
      prompt, 
      style = "photographic", 
      dimensions = "1024x1024",
      quality = "standard" 
    } = req.body || {};

    if (!prompt) {
      return res.status(400).json({ ok: false, error: "prompt is required" });
    }

    // Check if AI image generation is configured
    const apiUrl = process.env.AI_IMAGE_API_URL;
    const apiKey = process.env.AI_IMAGE_API_KEY;

    if (!apiUrl || !apiKey) {
      // Development fallback - create a placeholder image URL
      return res.json({ 
        ok: true, 
        imageUrl: "https://via.placeholder.com/1024x1024/4f46e5/ffffff?text=AI+Generated+Image+Placeholder",
        message: "AI_IMAGE_API_URL/KEY not set. Using placeholder image."
      });
    }

    const finalPrompt = buildImagePrompt(prompt, "generic", style, dimensions, quality);

    // Call DALL-E or other image generation API
    const response = await axios.post(`${apiUrl}/images/generations`, {
      model: "dall-e-3",
      prompt: finalPrompt,
      n: 1,
      size: dimensions,
      quality: quality,
      response_format: "url"
    }, {
      headers: {
        "Authorization": `Bearer ${apiKey}`,
        "Content-Type": "application/json"
      }
    });

    const imageUrl = response.data?.data?.[0]?.url;
    if (!imageUrl) {
      throw new Error("No image URL returned from AI service");
    }

    // Download and store the image locally
    const imageResponse = await axios.get(imageUrl, { responseType: 'arraybuffer' });
    const fileId = crypto.randomUUID();
    const filename = `ai-image-${fileId}.png`;
    const filePath = path.join(MEDIA_DIR, filename);

    await fs.writeFile(filePath, imageResponse.data);

    // Return local URL
    const localImageUrl = `/api/media-storage/serve-ai/${filename}`;
    
    res.json({ 
      ok: true, 
      imageUrl: localImageUrl,
      originalPrompt: prompt,
      style,
      dimensions
    });

  } catch (err: any) {
    console.error("AI Image Generation Error:", err);
    const message = err.response?.data ? JSON.stringify(err.response.data) : err.message;
    res.status(500).json({ ok: false, error: "Failed to generate image", detail: message });
  }
});