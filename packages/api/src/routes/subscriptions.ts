import { Router } from "express";
import mongoose from "mongoose";
import { Plan } from "../models/Plan";
import { Subscription } from "../models/Subscription";
import { User } from "../models/User";
import { initializePayment, verifyPayment } from "../utils/flutterwave";
import { protect } from "../middleware/auth";

export const subscriptionsRouter = Router();

subscriptionsRouter.post("/initialize", protect, async (req, res) => {
    try {
        const { planId } = req.body;
        const user = await User.findById(req.user.sub);
        const plan = await Plan.findById(planId);

        if (!user || !plan) {
            return res.status(404).json({ message: "User or plan not found" });
        }

        const subscription = new Subscription({
            user: user._id,
            plan: plan._id,
        });

        await subscription.save();

        const transaction = await initializePayment(user.email, plan.price, {
            userId: user._id.toString(),
            planId: plan._id.toString(),
            subscriptionId: subscription._id.toString(),
        });

        if (transaction.status !== 'success') {
            return res.status(500).json({ message: "Error initializing payment" });
        }

        subscription.flutterwaveReference = transaction.data.tx_ref;
        await subscription.save();

        res.json({ authorization_url: transaction.data.link });
    } catch (error) {
        console.error("Error initializing subscription:", error);
        res.status(500).json({ message: "Internal server error" });
    }
});

subscriptionsRouter.post("/webhook", async (req, res) => {
    try {
        const hash = req.headers["verif-hash"];
        if (!hash || hash !== process.env.FLUTTERWAVE_HASH) {
            return res.status(401).json({ message: "Unauthorized" });
        }

        const { id, tx_ref } = req.body.data;

        const transaction = await verifyPayment(id);

        if (transaction.data.status !== "successful" || transaction.data.tx_ref !== tx_ref) {
            return res.status(400).json({ message: "Transaction not successful or reference mismatch" });
        }

        const subscription = await Subscription.findOne({ flutterwaveReference: tx_ref });

        if (!subscription) {
            return res.status(404).json({ message: "Subscription not found" });
        }

        subscription.status = "active";
        subscription.expiresAt = new Date(Date.now() + 30 * 24 * 60 * 60 * 1000); // 30 days
        await subscription.save();

        const user = await User.findById(subscription.user);
        if (user) {
            user.subscription = subscription._id as mongoose.Types.ObjectId;
            await user.save();
        }

        res.status(200).send();
    } catch (error) {
        console.error("Error verifying subscription:", error);
        res.status(500).json({ message: "Internal server error" });
    }
});