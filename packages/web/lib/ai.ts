import type { AIGenerateRequest, AIGenerateResponse, AIRewriteRequest, AIRewriteResponse } from "@jino/common";

const API_BASE = process.env.NEXT_PUBLIC_BACKEND_URL || "http://localhost:4000";



export async function rewritePost(text: string, platform: string, tone: string, improve: string) {
  const req: AIRewriteRequest = { text, platform, tone, improve };
  const res = await fetch(`${API_BASE}/api/ai/rewrite/`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(req)
  });
  const data: AIRewriteResponse = await res.json();
  if (!data.ok) throw new Error(data.error || "AI rewrite failed");
  return data.text || "";
}

export async function generatePostIdeas({ niche }: { niche: string }) {
  const res = await fetch(`${API_BASE}/api/ai/generate/post-ideas`,
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ niche }),
    }
  );
  const data = await res.json();
  if (!data.ok) throw new Error(data.error || "AI generate failed");
  return data.ideas || [];
}