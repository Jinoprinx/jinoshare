'use client';
import { useState } from "react";
import { rewritePost } from "../../../../lib/ai";
import { useRouter } from "next/navigation";

export default function RewritePostPage() {
  const [textToRewrite, setTextToRewrite] = useState("");
  const [rewrittenText, setRewrittenText] = useState("");
  const [isRewriting, setIsRewriting] = useState(false);
  const [platform, setPlatform] = useState("x");
  const [tone, setTone] = useState("concise");
  const router = useRouter();

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

  return (
    <div className="p-4">
      <button onClick={() => router.back()} className="p-2 bg-gray-200 text-black rounded mb-4">
        &larr; Back
      </button>
      <h2 className="text-2xl font-bold mb-4">Rewrite Post</h2>
      <div className="flex flex-col gap-4 max-w-md">
        <textarea
          placeholder="Text to rewrite"
          value={textToRewrite}
          onChange={(e) => setTextToRewrite(e.target.value)}
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
  );
}
