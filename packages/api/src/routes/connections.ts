
import { Router } from "express";
import { Connection } from "../models/Connection";
import { protect } from "../middleware/auth";

export const connections = Router();

connections.get("/", protect, async (req, res) => {
  try {
    const connections = await Connection.find({ userId: (req as any).user.id });
    res.json({ connections });
  } catch (err: any) {
    res.status(500).json({ error: "Failed to get connections", detail: err.message });
  }
});

connections.delete("/:provider", protect, async (req, res) => {
  try {
    await Connection.deleteOne({ userId: (req as any).user.id, provider: req.params.provider });
    res.json({ ok: true });
  } catch (err: any) {
    res.status(500).json({ error: "Failed to delete connection", detail: err.message });
  }
});
