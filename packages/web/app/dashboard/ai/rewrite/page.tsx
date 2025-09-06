'use client';

import { useState } from "react";
import { rewritePost } from "../../../../lib/ai";
import { useRouter } from "next/navigation";
import { ArrowLeftIcon } from "lucide-react";

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
          Rewrite Post
        </h2>
      </div>

      {/* Glassmorphism content card */}
      <div className="relative w-full max-w-2xl rounded-2xl border border-white/10 bg-white/5 shadow-[0_0_1px_0_rgba(255,255,255,0.25),0_20px_60px_-20px_rgba(0,0,0,0.6)] backdrop-blur-md supports-[backdrop-filter]:bg-white/5">
        <div className="p-5 sm:p-6 lg:p-8">
          <div className="flex flex-col gap-4">
            <textarea
              placeholder="Text to rewrite"
              value={textToRewrite}
              onChange={(e) => setTextToRewrite(e.target.value)}
              className="rounded-md border border-white/20 bg-black/60 text-white p-2 min-h-[120px] placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500/50"
            />

            <select
              value={platform}
              onChange={(e) => setPlatform(e.target.value)}
              className="rounded-md border border-white/20 bg-black/60 text-white p-2 focus:outline-none focus:ring-2 focus:ring-blue-500/50"
            >
              <option value="x">X (Twitter)</option>
              <option value="linkedin">LinkedIn</option>
              <option value="instagram">Instagram</option>
            </select>

            <select
              value={tone}
              onChange={(e) => setTone(e.target.value)}
              className="rounded-md border border-white/20 bg-black/60 text-white p-2 focus:outline-none focus:ring-2 focus:ring-blue-500/50"
            >
              <option value="concise">Concise</option>
              <option value="formal">Formal</option>
              <option value="casual">Casual</option>
            </select>

            <button
              onClick={handleRewrite}
              disabled={isRewriting || !textToRewrite.trim()}
              className="rounded-md bg-blue-600 px-4 py-3 mb-6 text-sm font-medium text-white hover:bg-blue-700 disabled:opacity-60 disabled:cursor-not-allowed"
            >
              {isRewriting ? "Rewriting..." : "Rewrite"}
            </button>

            {rewrittenText && (
              <div className="mt-4 rounded-lg border border-white/10 bg-black/20 p-4">
                {rewrittenText}
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