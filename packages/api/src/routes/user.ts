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

import { Router } from "express";
import { z } from "zod";
import { validate } from "../middleware/auth";
import { User } from "../models/User";

export const userRoutes = Router();

const userSchema = z.object({
  connections: z.array(z.string()),
});

userRoutes.get("/user", async (req, res) => {
  const { userId } = req.query;
  if (!userId) {
    return res.status(400).send({ message: "User ID is required" });
  }

  try {
    const user = await User.findById(userId).populate("connections");
    if (!user) {
      return res.status(404).send({ message: "User not found" });
    }
    res.send(user);
  } catch (error) {
    res.status(500).send({ message: "Error fetching user data", error });
  }
});

userRoutes.put("/user", validate, async (req, res) => {
  const { success } = userSchema.safeParse(req.body);
  if (!success) return res.status(400).send({ message: "Invalid request body" });

  const { connections } = req.body;
  const user = await User.findOneAndUpdate(
    { _id: req.userId },
    { connections },
    { new: true, upsert: true }
  );

  res.send(user);
});
