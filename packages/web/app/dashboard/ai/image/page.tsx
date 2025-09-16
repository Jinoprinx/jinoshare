'use client';

import { useState } from "react";
import { useRouter } from "next/navigation";
import { ArrowLeftIcon } from "lucide-react";
import Image from "next/image";

const BACKEND = process.env.NEXT_PUBLIC_BACKEND_URL || "https://jinoshare-api-59028d83893a.herokuapp.com";

export default function GenerateImagePage() {
  const [imagePrompt, setImagePrompt] = useState("");
  const [imageStyle, setImageStyle] = useState("photographic");
  const [imageDimensions, setImageDimensions] = useState("1024x1024");
  const [generatedImage, setGeneratedImage] = useState<string | null>(null);
  const [isGeneratingImage, setIsGeneratingImage] = useState(false);
  const router = useRouter();

  const handleImageGenerate = async () => {
    setIsGeneratingImage(true);
    try {
      const response = await fetch(`${BACKEND}/api/ai/image-generate/`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          prompt: imagePrompt,
          style: imageStyle,
          dimensions: imageDimensions,
          quality: "standard",
        }),
      });
      const data = await response.json();
      if (data.ok) {
        setGeneratedImage(`${BACKEND}${data.imageUrl}`);
      } else {
        console.error("Image generation failed:", data.error);
      }
    } catch (error) {
      console.error("Image generation error:", error);
    } finally {
      setIsGeneratingImage(false);
    }
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
          Generate Images
        </h2>
      </div>

      {/* Glassmorphism content card */}
      <div className="relative w-full max-w-2xl rounded-2xl border border-white/10 bg-white/5 shadow-[0_0_1px_0_rgba(255,255,255,0.25),0_20px_60px_-20px_rgba(0,0,0,0.6)] backdrop-blur-md supports-[backdrop-filter]:bg-white/5">
        <div className="p-5 sm:p-6 lg:p-8">
          <div className="flex flex-col gap-4">
            <input
              type="text"
              placeholder="Describe the image you want"
              value={imagePrompt}
              onChange={(e) => setImagePrompt(e.target.value)}
              className="rounded-md border border-white/20 bg-black/60 text-white p-2 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500/50"
            />

            <select
              value={imageStyle}
              onChange={(e) => setImageStyle(e.target.value)}
              className="rounded-md border border-white/20 bg-black/60 text-white p-2 focus:outline-none focus:ring-2 focus:ring-purple-500/50"
            >
              <option value="photographic">Photographic</option>
              <option value="digital-art">Digital Art</option>
              <option value="cinematic">Cinematic</option>
              <option value="anime">Anime</option>
              <option value="sketch">Sketch</option>
            </select>

            <select
              value={imageDimensions}
              onChange={(e) => setImageDimensions(e.target.value)}
              className="rounded-md border border-white/20 bg-black/60 text-white p-2 focus:outline-none focus:ring-2 focus:ring-purple-500/50"
            >
              <option value="1024x1024">Square (1024x1024)</option>
              <option value="1792x1024">Landscape (1792x1024)</option>
              <option value="1024x1792">Portrait (1024x1792)</option>
            </select>

            <button
              onClick={handleImageGenerate}
              disabled={isGeneratingImage || !imagePrompt.trim()}
              className="rounded-md bg-purple-600 px-4 py-3 mb-6 text-sm font-medium text-white hover:bg-purple-700 disabled:opacity-60 disabled:cursor-not-allowed"
            >
              {isGeneratingImage ? "Generating..." : "Generate Image"}
            </button>

            {generatedImage && (
              <div className="mt-4">
                <Image
                  src={generatedImage}
                  alt="AI Generated"
                  width={1024}
                  height={1024}
                  className="max-w-full h-auto rounded-lg"
                />
                <button
                  onClick={() => {
                    navigator.clipboard.writeText(generatedImage);
                  }}
                  className="mt-2 rounded-md border border-white/10 bg-white/5 px-3 py-1.5 text-sm text-white hover:bg-white/10"
                >
                  Copy Image URL
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