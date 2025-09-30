import { Router } from "express";
import { aiGenerate, stripJsonFences } from "@jino/ai";
import { buildContentPlannerPrompt } from "@jino/ai/src/prompts";

export const aiContentPlannerRouter = Router();

aiContentPlannerRouter.post("/", async (req, res) => {
  try {
    const { mission_vision, target_audience, core_values, tone_of_voice, products_services, competitors, unique_selling_proposition, content_goals } = req.body || {};
    if (!mission_vision || !target_audience || !core_values || !tone_of_voice || !products_services || !competitors || !unique_selling_proposition || !content_goals) {
      return res.status(400).json({ ok: false, error: "All fields are required" });
    }

    const prompt = buildContentPlannerPrompt(req.body);

    const raw = await aiGenerate(prompt, { maxTokens: 2000 });
    let posts: string[];
    try {
      posts = JSON.parse(stripJsonFences(raw));
      if (!Array.isArray(posts)) throw new Error();
      posts = posts.slice(0, 5);
    } catch {
      posts = raw.split(/\n+/).filter(Boolean).slice(0, 5);
    }
    res.json({ ok: true, posts });
  } catch (err: any) {
    res.status(400).json({ ok: false, error: err.message });
  }
});
