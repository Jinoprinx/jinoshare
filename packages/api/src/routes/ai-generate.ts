import { Router } from "express";
import { aiGenerate, stripJsonFences } from "@jino/ai";
import { buildGeneratePostsPrompt } from "@jino/ai"

export const aiGenerateRouter = Router();

aiGenerateRouter.post("/", async (req, res) => {
  try {
    const { topic, platform, tone = "concise", count = 5 } = req.body || {};
    if (!topic || !platform) {
      return res.status(400).json({ ok: false, error: "topic and platform are required" });
    }

    

    const prompt = buildGeneratePostsPrompt(topic, platform, tone, count);

//     const prompt = `Generate ${count} distinct ${platform} posts about "${topic}".
// Tone: ${tone}. Style: ${platformHints[platform] || platformHints.generic}.
// Output as a JSON array of strings only.`;

    const raw = await aiGenerate(prompt, { maxTokens: 800 });
    let posts: string[];
    try {
      posts = JSON.parse(stripJsonFences(raw));
      if (!Array.isArray(posts)) throw new Error();
    } catch {
      posts = raw.split(/\n+/).filter(Boolean).slice(0, count);
    }
    res.json({ ok: true, posts });
  } catch (err: any) {
    res.status(400).json({ ok: false, error: err.message });
  }
});