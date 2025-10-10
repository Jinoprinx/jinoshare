import { Router } from "express";
import { aiGenerate, stripJsonFences } from "@jino/ai";
import { buildPromptFromTemplate } from "@jino/ai";

export const aiContentPlannerRouter = Router();

aiContentPlannerRouter.post("/", async (req, res) => {
  try {
    const { templateName, variables } = req.body || {};

    // Default to "Generic" template if no templateName is provided
    const template = templateName || "Generic";

    if (!variables) {
      console.error("Missing variables:", { variables });
      return res.status(400).json({
        ok: false,
        error: "variables are required"
      });
    }

    const prompt = buildPromptFromTemplate(template, variables);

    const raw = await aiGenerate(prompt, { maxTokens: 3000 });
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
