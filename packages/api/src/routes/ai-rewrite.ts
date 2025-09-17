import { Router } from "express";
import { aiGenerate } from "@jino/ai";
import { buildRewritePrompt } from "@jino/ai"

export const aiRewriteRouter = Router();

aiRewriteRouter.post("/", async (req, res) => {
  try {
    const { text, platform, tone = "concise", improve = "clarity" } = req.body || {};
    if (!text || !platform) {
      return res.status(400).json({ ok: false, error: "text and platform are required" });
    }

    const prompt = buildRewritePrompt(text, platform, tone, improve);

    const rewritten = await aiGenerate(prompt, { maxTokens: 500 });
    res.json({ ok: true, text: rewritten.trim() });
  } catch (err: any) {
    res.status(400).json({ ok: false, error: err.message });
  }
});