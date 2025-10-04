import { Router } from "express";
import { PublishLog } from "../models/PublishLog";
import { auth } from "../middleware/auth";

const router = Router();

router.get("/", auth, async (req, res) => {
  try {
    const logs = await PublishLog.find({ userId: req.user?._id }).sort({ createdAt: -1 });
    res.json(logs);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch publish logs" });
  }
});

export default router;
