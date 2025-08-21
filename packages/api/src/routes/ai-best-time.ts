import { Router } from "express";
import { aiGenerate, stripJsonFences } from "@jino/ai";
import { PublishLog } from "../models/PublishLog";

export const aiBestTimeRouter = Router();

aiBestTimeRouter.get("/", async (req, res) => {
  try {
    const { userId, platform } = req.query as { userId: string; platform: string };
    if (!userId || !platform) {
      return res.status(400).json({ ok: false, error: "userId and platform are required" });
    }

    const logs = await PublishLog.find({ userId, provider: platform })
      .sort({ createdAt: -1 })
      .limit(400);
    const examples = logs.map(l => {
      const d = new Date(l.createdAt);
      return { dow: d.getDay(), hour: d.getHours(), impressions: 0, likes: 0 };
    });

    const prompt = `Given historical performance entries (dayOfWeek, hour, impressions, likes), recommend top 3 posting hours for ${platform}.
Return JSON [{"dow":number,"hour":number,"reason":string}].

Data:
${JSON.stringify(examples)}`;

    const raw = await aiGenerate(prompt, { maxTokens: 400 });
    let recs;
    try {
      recs = JSON.parse(stripJsonFences(raw));
    } catch {
      recs = [{ dow: 2, hour: 9, reason: "Default slot" }];
    }
    res.json({ ok: true, recommendations: recs });
  } catch (err: any) {
    res.status(400).json({ ok: false, error: err.message });
  }
});