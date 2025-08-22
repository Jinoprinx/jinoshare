
import { useState } from "react";
import { generatePosts, rewritePost } from "../lib/ai";

const BACKEND = process.env.NEXT_PUBLIC_BACKEND_URL || "http://localhost:4000";

export function AI() {
  const [topic, setTopic] = useState("");
  const [platform, setPlatform] = useState("x");
  const [tone, setTone] = useState("concise");
  const [generatedPosts, setGeneratedPosts] = useState<string[]>([]);
  const [textToRewrite, setTextToRewrite] = useState("");
  const [rewrittenText, setRewrittenText] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);
  const [isRewriting, setIsRewriting] = useState(false);

  // AI Image Generation
  const [imagePrompt, setImagePrompt] = useState("");
  const [imageStyle, setImageStyle] = useState("photographic");
  const [imageDimensions, setImageDimensions] = useState("1024x1024");
  const [generatedImage, setGeneratedImage] = useState<string | null>(null);
  const [isGeneratingImage, setIsGeneratingImage] = useState(false);

  // AI Video Generation
  const [videoPrompt, setVideoPrompt] = useState("");
  const [videoStyle, setVideoStyle] = useState("cinematic");
  const [videoDuration, setVideoDuration] = useState(5);
  const [videoDimensions, setVideoDimensions] = useState("1024x1024");
  const [generatedVideo, setGeneratedVideo] = useState<string | null>(null);
  const [isGeneratingVideo, setIsGeneratingVideo] = useState(false);
  const [videoGenerationId, setVideoGenerationId] = useState<string | null>(null);

  const handleGenerate = async () => {
    setIsGenerating(true);
    try {
      const posts = await generatePosts({ topic, platform, tone });
      setGeneratedPosts(posts);
    } catch (error) {
      console.error(error);
    } finally {
      setIsGenerating(false);
    }
  };

  const handleRewrite = async () => {
    setIsRewriting(true);
    try {
      const rewritten = await rewritePost(textToRewrite, platform, tone, "clarity");
      setRewrittenText(rewritten);
    } catch (error) {
      console.error(error);
    } finally {
      setIsRewriting(false);
    }
  };

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
          // Poll for completion
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
      <h2 className="text-2xl font-bold mb-4">AI Features</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        <div>
          <h3 className="text-xl font-semibold mb-2">Generate Posts</h3>
          <div className="flex flex-col gap-4">
            <input
              type="text"
              placeholder="Topic"
              value={topic}
              onChange={(e) => setTopic(e.target.value)}
              className="p-2 border rounded"
            />
            <select value={platform} onChange={(e) => setPlatform(e.target.value)} className="p-2 border rounded">
              <option value="x">X (Twitter)</option>
              <option value="linkedin">LinkedIn</option>
              <option value="instagram">Instagram</option>
            </select>
            <select value={tone} onChange={(e) => setTone(e.target.value)} className="p-2 border rounded">
              <option value="concise">Concise</option>
              <option value="formal">Formal</option>
              <option value="casual">Casual</option>
            </select>
            <button onClick={handleGenerate} disabled={isGenerating} className="p-2 bg-blue-500 text-white rounded">
              {isGenerating ? "Generating..." : "Generate"}
            </button>
            <div className="mt-4">
              {generatedPosts.map((post, index) => (
                <div key={index} className="p-2 border-b">
                  {post}
                </div>
              ))}
            </div>
          </div>
        </div>
        <div>
          <h3 className="text-xl font-semibold mb-2">Rewrite Post</h3>
          <div className="flex flex-col gap-4">
            <textarea
              placeholder="Text to rewrite"
              value={textToRewrite}
              onChange={(e) => setTextToRewrite(e.target.value)}
              className="p-2 border rounded"
            />
            <button onClick={handleRewrite} disabled={isRewriting} className="p-2 bg-blue-500 text-white rounded">
              {isRewriting ? "Rewriting..." : "Rewrite"}
            </button>
            {rewrittenText && (
              <div className="mt-4 p-2 border rounded bg-gray-100">
                {rewrittenText}
              </div>
            )}
          </div>
        </div>
        
        {/* AI Image Generation */}
        <div>
          <h3 className="text-xl font-semibold mb-2">Generate Images</h3>
          <div className="flex flex-col gap-4">
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
                    // Copy image URL to clipboard or use in post
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

        {/* AI Video Generation */}
        <div>
          <h3 className="text-xl font-semibold mb-2">Generate Videos</h3>
          <div className="flex flex-col gap-4">
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
      </div>
    </div>
  );
}
