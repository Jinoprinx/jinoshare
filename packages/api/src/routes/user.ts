import { Router } from "express";
import { User } from "../models/User";
import { config } from "../config";

export const user = Router();

// GET /user/settings
user.get("/settings", async (req, res) => {
  const userId = config.defaultUserId; // Assuming a default user for now

  try {
    let user = await User.findOne({ userId });
    if (!user) {
      // Create the user if they don't exist in our settings table yet
      user = await User.create({ userId, is_auto_posting_enabled: false });
    }
    res.json(user);
  } catch (err: any) {
    res.status(500).json({ error: "Failed to get user settings", detail: err.message });
  }
});

// PUT /user/settings
user.put("/settings", async (req, res) => {
  const { is_auto_posting_enabled } = req.body;
  const userId = config.defaultUserId;

  if (typeof is_auto_posting_enabled !== 'boolean') {
    return res.status(400).json({ error: "'is_auto_posting_enabled' must be a boolean." });
  }

  try {
    const user = await User.findOneAndUpdate(
      { userId },
      { is_auto_posting_enabled },
      { new: true, upsert: true } // Create if it doesn't exist
    );
    res.json(user);
  } catch (err: any) {
    res.status(500).json({ error: "Failed to update user settings", detail: err.message });
  }
});
