import { Router } from "express";
import { aiGenerate, stripJsonFences } from "@jino/ai";
import { buildGeneratePostIdeasPrompt } from "@jino/ai"

export const aiGenerateRouter = Router();



aiGenerateRouter.post("/post-ideas", async (req, res) => {
  try {
    const { niche } = req.body || {};
    if (!niche) {
      return res.status(400).json({ ok: false, error: "niche is required" });
    }

    const prompt = buildGeneratePostIdeasPrompt(niche);

    const raw = await aiGenerate(prompt, { maxTokens: 2000 });
    let ideas: string[];
    try {
      ideas = JSON.parse(stripJsonFences(raw));
      if (!Array.isArray(ideas)) throw new Error();
    } catch {
      ideas = raw.split(/\n+/).filter(Boolean);
    }
    res.json({ ok: true, ideas });
  } catch (err: any) {
    res.status(400).json({ ok: false, error: err.message });
  }
});