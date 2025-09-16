'use client';

import { useState } from "react";
import { useRouter } from "next/navigation";
import { ArrowLeftIcon } from "lucide-react";

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
          dimensions: videoDimensions,
        }),
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

        if (data.ok && data.status === "completed" && data.videoUrl) {
          setGeneratedVideo(`${BACKEND}${data.videoUrl}`);
          setVideoGenerationId(null);
        } else if (data.status === "processing") {
          setTimeout(poll, 10000); // Poll every 10 seconds
        }
      } catch (error) {
        console.error("Video status check error:", error);
      }
    };

    setTimeout(poll, 5000); // Start polling after 5 seconds
  };

  return (
    <div className="min-h-screen flex flex-col items-center p-4 sm:p-6 lg:p-8">
      {/* Page header */}
      <div className="w-full max-w-4xl mb-6">
        <button
          onClick={() => router.back()}
          className="flex items-center gap-2 rounded-md border border-white/10 bg-white/5 px-4 py-2 text-sm font-medium hover:bg-white/10"
        >
          <ArrowLeftIcon className="h-4 w-4" />
          Back
        </button>
        <h2 className="font-display text-3xl font-bold mt-4 text-center">
          Generate Videos
        </h2>
      </div>

      {/* Glassmorphism content card */}
      <div className="relative w-full max-w-2xl rounded-2xl border border-white/10 bg-white/5 shadow-[0_0_1px_0_rgba(255,255,255,0.25),0_20px_60px_-20px_rgba(0,0,0,0.6)] backdrop-blur-md supports-[backdrop-filter]:bg-white/5">
        <div className="p-5 sm:p-6 lg:p-8">
          <div className="flex flex-col gap-4">
            <input
              type="text"
              placeholder="Describe the video you want"
              value={videoPrompt}
              onChange={(e) => setVideoPrompt(e.target.value)}
              className="rounded-md border border-white/20 bg-black/60 text-white p-2 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-red-500/50"
            />

            <select
              value={videoStyle}
              onChange={(e) => setVideoStyle(e.target.value)}
              className="appearance-none rounded-md border border-white/20 bg-black/60 text-white p-2 focus:outline-none focus:ring-2 focus:ring-red-500/50"
            >
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
              className="rounded-md border border-white/20 bg-black/60 text-white p-2 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-red-500/50"
            />

            <select
              value={videoDimensions}
              onChange={(e) => setVideoDimensions(e.target.value)}
              className="rounded-md border border-white/20 bg-black/60 text-white p-2 focus:outline-none focus:ring-2 focus:ring-red-500/50"
            >
              <option value="1024x1024">Square (1024x1024)</option>
              <option value="1920x1080">Landscape (1920x1080)</option>
              <option value="1080x1920">Portrait (1080x1920)</option>
            </select>

            <button
              onClick={handleVideoGenerate}
              disabled={isGeneratingVideo || !videoPrompt.trim()}
              className="rounded-md bg-red-600 px-4 py-3 mb-6 text-sm font-medium text-white hover:bg-red-700 disabled:opacity-60 disabled:cursor-not-allowed"
            >
              {isGeneratingVideo ? "Generating..." : "Generate Video"}
            </button>

            {videoGenerationId && (
              <div className="mt-2 rounded-lg border border-yellow-400/20 bg-yellow-400/10 p-3 text-sm text-yellow-300">
                Video is generating... This may take several minutes.
              </div>
            )}

            {generatedVideo && (
              <div className="mt-4">
                <video
                  src={generatedVideo}
                  controls
                  className="max-w-full h-auto rounded-lg"
                />
                <button
                  onClick={() => {
                    navigator.clipboard.writeText(generatedVideo);
                  }}
                  className="mt-2 rounded-md border border-white/10 bg-white/5 px-3 py-1.5 text-sm text-white hover:bg-white/10"
                >
                  Copy Video URL
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Optional subtle highlight */}
        <div className="pointer-events-none absolute inset-0 rounded-2xl ring-1 ring-white/10 [mask-image:linear-gradient(transparent,black,transparent)]" />
      </div>
    </div>
  );
}