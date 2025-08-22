'use client';
import { useState } from "react";
import { useRouter } from "next/navigation";

const BACKEND = process.env.NEXT_PUBLIC_BACKEND_URL || "http://localhost:4000";

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
          quality: "standard"
        })
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
    <div className="p-4">
      <button onClick={() => router.back()} className="p-2 bg-gray-200 text-black rounded mb-4">
        &larr; Back
      </button>
      <h2 className="text-2xl font-bold mb-4">Generate Images</h2>
      <div className="flex flex-col gap-4 max-w-md">
        <input
          type="text"
          placeholder="Describe the image you want"
          value={imagePrompt}
          onChange={(e) => setImagePrompt(e.target.value)}
          className="p-2 border rounded"
        />
        <select value={imageStyle} onChange={(e) => setImageStyle(e.target.value)} className="p-2 border rounded">
          <option value="photographic">Photographic</option>
          <option value="digital-art">Digital Art</option>
          <option value="cinematic">Cinematic</option>
          <option value="anime">Anime</option>
          <option value="sketch">Sketch</option>
        </select>
        <select value={imageDimensions} onChange={(e) => setImageDimensions(e.target.value)} className="p-2 border rounded">
          <option value="1024x1024">Square (1024x1024)</option>
          <option value="1792x1024">Landscape (1792x1024)</option>
          <option value="1024x1792">Portrait (1024x1792)</option>
        </select>
        <button 
          onClick={handleImageGenerate} 
          disabled={isGeneratingImage || !imagePrompt.trim()} 
          className="p-2 bg-purple-500 text-white rounded disabled:bg-gray-400"
        >
          {isGeneratingImage ? "Generating..." : "Generate Image"}
        </button>
        {generatedImage && (
          <div className="mt-4">
            <img src={generatedImage} alt="AI Generated" className="max-w-full h-auto rounded" />
            <button 
              onClick={() => {
                navigator.clipboard.writeText(generatedImage);
              }}
              className="mt-2 p-1 bg-gray-200 text-sm rounded"
            >
              Copy Image URL
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
