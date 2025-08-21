import { Router } from "express";
import { aiGenerate, stripJsonFences } from "@jino/ai";

export const aiGenerateRouter = Router();

aiGenerateRouter.post("/", async (req, res) => {
  try {
    const { topic, platform, tone = "concise", count = 5 } = req.body || {};
    if (!topic || !platform) {
      return res.status(400).json({ ok: false, error: "topic and platform are required" });
    }

    const platformHints: Record<string, string> = {
      x: "max 280 chars, punchy hook, 1 emoji max",
      linkedin: "value-forward, 3–6 lines, no emoji spam",
      instagram: "friendly, 1–2 emojis, up to 5 hashtags",
      generic: "clear, concise, actionable"
    };

    const prompt = `Generate ${count} distinct ${platform} posts about "${topic}".
Tone: ${tone}. Style: ${platformHints[platform] || platformHints.generic}.
Output as a JSON array of strings only.`;

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

//////////////////////////////////////////////////////

// import { Router } from "express";
// import { aiGenerate } from "@jino/ai";
// import { AIGenerateRequest, AIGenerateResponse } from "@jino/common";

// export const aiGenerateRouter = Router();

// aiGenerateRouter.post<{}, AIGenerateResponse, AIGenerateRequest>("/", async (req, res) => {
//   try {
//     const { topic, platform, tone = "concise", count = 5 } = req.body;
//     const prompt = `Generate ${count} ${platform} posts about "${topic}". Tone: ${tone}. Output JSON array.`;
//     const raw = await aiGenerate(prompt, { maxTokens: 600 });
//     const posts = JSON.parse(raw.replace(/```json|```/g, ""));
//     res.json({ ok: true, posts });
//   } catch (err: any) {
//     res.status(400).json({ ok: false, error: err.message });
//   }
// });