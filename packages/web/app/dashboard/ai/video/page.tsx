'use client';
import { useState } from "react";
import { useRouter } from "next/navigation";

const BACKEND = process.env.NEXT_PUBLIC_BACKEND_URL || "http://localhost:4000";

export default function GenerateVideoPage() {
  const [videoPrompt, setVideoPrompt] = useState("");
  const [videoStyle, setVideoStyle] = useState("cinematic");
  const [videoDuration, setVideoDuration] = useState(5);
  const [videoDimensions, setVideoDimensions] = useState("1024x1024");
  const [generatedVideo, setGeneratedVideo] = useState<string | null>(null);
  const [isGeneratingVideo, setIsGeneratingVideo] = useState(false);
  const [videoGenerationId, setVideoGenerationId] = useState<string | null>(null);
  const router = useRouter();

  const handleVideoGenerate = async () => {
    setIsGeneratingVideo(true);
    try {
      const response = await fetch(`${BACKEND}/api/ai/video-generate/`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          prompt: videoPrompt,
          style: videoStyle,
          duration: videoDuration,
          dimensions: videoDimensions
        })
      });
      const data = await response.json();
      if (data.ok) {
        if (data.videoUrl) {
          setGeneratedVideo(`${BACKEND}${data.videoUrl}`);
        } else if (data.generationId) {
          setVideoGenerationId(data.generationId);
          pollVideoGeneration(data.generationId);
        }
      } else {
        console.error("Video generation failed:", data.error);
      }
    } catch (error) {
      console.error("Video generation error:", error);
    } finally {
      setIsGeneratingVideo(false);
    }
  };

  const pollVideoGeneration = async (generationId: string) => {
    const maxAttempts = 20;
    let attempts = 0;
    
    const poll = async () => {
      if (attempts >= maxAttempts) return;
      attempts++;
      
      try {
        const response = await fetch(`${BACKEND}/api/ai/video-generate/status/${generationId}`);
        const data = await response.json();
        
        if (data.ok && data.status === 'completed' && data.videoUrl) {
          setGeneratedVideo(`${BACKEND}${data.videoUrl}`);
          setVideoGenerationId(null);
        } else if (data.status === 'processing') {
          setTimeout(poll, 10000); // Poll every 10 seconds
        }
      } catch (error) {
        console.error("Video status check error:", error);
      }
    };
    
    setTimeout(poll, 5000); // Start polling after 5 seconds
  };

  return (
    <div className="p-4">
      <button onClick={() => router.back()} className="p-2 bg-gray-200 text-black rounded mb-4">
        &larr; Back
      </button>
      <h2 className="text-2xl font-bold mb-4">Generate Videos</h2>
      <div className="flex flex-col gap-4 max-w-md">
        <input
          type="text"
          placeholder="Describe the video you want"
          value={videoPrompt}
          onChange={(e) => setVideoPrompt(e.target.value)}
          className="p-2 border rounded"
        />
        <select value={videoStyle} onChange={(e) => setVideoStyle(e.target.value)} className="p-2 border rounded">
          <option value="cinematic">Cinematic</option>
          <option value="dynamic">Dynamic</option>
          <option value="artistic">Artistic</option>
          <option value="realistic">Realistic</option>
        </select>
        <input
          type="number"
          placeholder="Duration (seconds)"
          value={videoDuration}
          onChange={(e) => setVideoDuration(Number(e.target.value))}
          min="1"
          max="30"
          className="p-2 border rounded"
        />
        <select value={videoDimensions} onChange={(e) => setVideoDimensions(e.target.value)} className="p-2 border rounded">
          <option value="1024x1024">Square (1024x1024)</option>
          <option value="1920x1080">Landscape (1920x1080)</option>
          <option value="1080x1920">Portrait (1080x1920)</option>
        </select>
        <button 
          onClick={handleVideoGenerate} 
          disabled={isGeneratingVideo || !videoPrompt.trim()} 
          className="p-2 bg-red-500 text-white rounded disabled:bg-gray-400"
        >
          {isGeneratingVideo ? "Generating..." : "Generate Video"}
        </button>
        {videoGenerationId && (
          <div className="mt-2 p-2 bg-yellow-100 text-sm rounded">
            Video is generating... This may take several minutes.
          </div>
        )}
        {generatedVideo && (
          <div className="mt-4">
            <video src={generatedVideo} controls className="max-w-full h-auto rounded" />
            <button 
              onClick={() => {
                navigator.clipboard.writeText(generatedVideo);
              }}
              className="mt-2 p-1 bg-gray-200 text-sm rounded"
            >
              Copy Video URL
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
