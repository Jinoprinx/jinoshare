import { Router } from "express";
import { aiGenerate, stripJsonFences } from "@jino/ai";

export const aiForecastRouter = Router();

aiForecastRouter.post("/", async (req, res) => {
  try {
    const { text, platform, scheduledFor } = req.body || {};
    if (!text || !platform) {
      return res.status(400).json({ ok: false, error: "text and platform are required" });
    }
    const prompt = `Estimate engagement for this ${platform} post scheduled at ${scheduledFor || "unspecified"}.
Return JSON {"risk":"low|medium|high","estImpressions":number,"notes":string}.

${text}`;

    const raw = await aiGenerate(prompt, { maxTokens: 400 });
    let forecast;
    try {
      forecast = JSON.parse(stripJsonFences(raw));
    } catch {
      forecast = { risk: "medium", estImpressions: 1000, notes: "Fallback estimate" };
    }
    res.json({ ok: true, forecast });
  } catch (err: any) {
    res.status(400).json({ ok: false, error: err.message });
  }
});