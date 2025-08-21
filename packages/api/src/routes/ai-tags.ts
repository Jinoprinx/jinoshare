import { Router } from "express";
import { aiGenerate, stripJsonFences } from "@jino/ai";

export const aiTagsRouter = Router();

aiTagsRouter.post("/", async (req, res) => {
  try {
    const { text, platform } = req.body || {};
    if (!text || !platform) {
      return res.status(400).json({ ok: false, error: "text and platform are required" });
    }
    const prompt = `From the text below, propose up to 7 platform-appropriate hashtags and one engaging caption for ${platform}.
Return JSON with { "hashtags": [string], "caption": string }.

${text}`;

    const raw = await aiGenerate(prompt, { maxTokens: 400 });
    let parsed: any;
    try {
      parsed = JSON.parse(stripJsonFences(raw));
    } catch {
      parsed = { caption: text.slice(0, 140), hashtags: [] };
    }
    res.json({ ok: true, ...parsed });
  } catch (err: any) {
    res.status(400).json({ ok: false, error: err.message });
  }
});