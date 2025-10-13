
import { Router } from "express";
import { Plan } from "../models/Plan";
import { Subscription } from "../models/Subscription";
import { User } from "../models/User";
import { initializeTransaction, verifyTransaction } from "../utils/paystack";
import { protect } from "../middleware/auth";

export const subscriptionsRouter = Router();

subscriptionsRouter.post("/initialize", protect, async (req, res) => {
  try {
    const { planId } = req.body;
    const user = await User.findById(req.user.id);
    const plan = await Plan.findById(planId);

    if (!user || !plan) {
      return res.status(404).json({ message: "User or plan not found" });
    }

    const transaction = await initializeTransaction(user.email, plan.price);

    const subscription = new Subscription({
      user: user._id,
      plan: plan._id,
      paystackReference: transaction.data.reference,
    });

    await subscription.save();

    res.json({ authorization_url: transaction.data.authorization_url });
  } catch (error) {
    console.error("Error initializing subscription:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

subscriptionsRouter.get("/verify", async (req, res) => {
  try {
    const { reference } = req.query;

    if (!reference) {
      return res.status(400).json({ message: "Missing transaction reference" });
    }

    const transaction = await verifyTransaction(reference as string);

    if (transaction.data.status !== "success") {
      return res.status(400).json({ message: "Transaction not successful" });
    }

    const subscription = await Subscription.findOne({ paystackReference: reference });

    if (!subscription) {
      return res.status(404).json({ message: "Subscription not found" });
    }

    subscription.status = "active";
    subscription.expiresAt = new Date(Date.now() + 30 * 24 * 60 * 60 * 1000); // 30 days
    await subscription.save();

    const user = await User.findById(subscription.user);
    if (user) {
      user.subscription = subscription._id;
      await user.save();
    }

    res.redirect(`${process.env.CLIENT_ORIGIN}/dashboard?subscription=success`);
  } catch (error) {
    console.error("Error verifying subscription:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});
