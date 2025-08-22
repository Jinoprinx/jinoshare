'use client';
import { useState } from "react";
import { generatePosts } from "../../../../lib/ai";
import { useRouter } from "next/navigation";

export default function GeneratePostsPage() {
  const [topic, setTopic] = useState("");
  const [platform, setPlatform] = useState("x");
  const [tone, setTone] = useState("concise");
  const [generatedPosts, setGeneratedPosts] = useState<string[]>([]);
  const [isGenerating, setIsGenerating] = useState(false);
  const router = useRouter();

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

  return (
    <div className="p-4">
      <button onClick={() => router.back()} className="p-2 bg-gray-200 text-black rounded mb-4">
        &larr; Back
      </button>
      <h2 className="text-2xl font-bold mb-4">Generate Posts</h2>
      <div className="flex flex-col gap-4 max-w-md">
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
  );
}
