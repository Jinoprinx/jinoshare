
import { Router } from "express";
import { Plan } from "../models/Plan";

export const plansRouter = Router();

plansRouter.get("/", async (req, res) => {
  try {
    const plans = await Plan.find();
    res.json(plans);
  } catch (error) {
    console.error("Error fetching plans:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});
