import { Router } from "express";
import { aiGenerate, stripJsonFences } from "@jino/ai";
import { buildModerationPrompt } from "@jino/ai";


export const aiModerateRouter = Router();

aiModerateRouter.post("/", async (req, res) => {
  try {
    const { text, platform } = req.body || {};
    if (!text || !platform) {
      return res.status(400).json({ ok: false, error: "text and platform are required" });
    }
    const prompt = buildModerationPrompt(text, platform);
    const raw = await aiGenerate(prompt, { maxTokens: 400 });
    let moderation;
    try {
      moderation = JSON.parse(stripJsonFences(raw));
    } catch {
      moderation = { severity: "none", issues: [], suggestedFix: "" };
    }
    res.json({ ok: true, moderation });
  } catch (err: any) {
    res.status(400).json({ ok: false, error: err.message });
  }
});