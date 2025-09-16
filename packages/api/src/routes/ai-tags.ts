import { Router } from "express";
import { aiGenerate, stripJsonFences } from "@jino/ai";
import { buildTagsPrompt } from "@jino/ai/src/prompts"

export const aiTagsRouter = Router();

aiTagsRouter.post("/", async (req, res) => {
  try {
    const { text, platform } = req.body || {};
    if (!text || !platform) {
      return res.status(400).json({ ok: false, error: "text and platform are required" });
    }
    const prompt = buildTagsPrompt(text, platform);
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