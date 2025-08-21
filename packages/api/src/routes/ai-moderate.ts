import { Router } from "express";
import { aiGenerate, stripJsonFences } from "@jino/ai";

export const aiModerateRouter = Router();

aiModerateRouter.post("/", async (req, res) => {
  try {
    const { text, platform } = req.body || {};
    if (!text || !platform) {
      return res.status(400).json({ ok: false, error: "text and platform are required" });
    }
    const prompt = `Moderate the following text for ${platform}.
Check for slurs, harassment, disallowed claims, or platform policy risks.
Return JSON {"severity":"none|low|medium|high","issues":[string],"suggestedFix":string}.

${text}`;

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