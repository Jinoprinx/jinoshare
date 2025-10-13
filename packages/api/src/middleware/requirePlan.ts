
import { Request, Response, NextFunction } from "express";
import { User } from "../models/User";
import { Subscription } from "../models/Subscription";
import { Plan } from "../models/Plan";

export const requirePlan = (requiredPlan: string) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      const user = await User.findById(req.user.id).populate("subscription");

      if (!user || !user.subscription) {
        return res.status(403).json({ message: "You do not have an active subscription." });
      }

      const subscription = await Subscription.findById(user.subscription).populate("plan");

      if (!subscription || !subscription.plan) {
        return res.status(403).json({ message: "You do not have an active subscription." });
      }

      if ((subscription.plan as any).name !== requiredPlan) {
        return res.status(403).json({ message: `This feature requires the ${requiredPlan} plan.` });
      }

      next();
    } catch (error) {
      console.error("Error in requirePlan middleware:", error);
      res.status(500).json({ message: "Internal server error" });
    }
  };
};
