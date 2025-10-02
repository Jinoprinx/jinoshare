import { Router } from "express";
import { aiGenerate, stripJsonFences } from "@jino/ai";
import { buildPromptFromTemplate } from "@jino/ai";

export const aiContentPlannerRouter = Router();

aiContentPlannerRouter.post("/", async (req, res) => {
  try {
    const { templateName, variables } = req.body || {};
    if (!templateName || !variables) {
      console.error("Missing required fields:", { templateName, variables });
      return res.status(400).json({
        ok: false,
        error: "templateName and variables are required",
        details: { hasTemplateName: !!templateName, hasVariables: !!variables }
      });
    }

    const prompt = buildPromptFromTemplate(templateName, variables);

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
