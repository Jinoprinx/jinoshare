
import mongoose, { Document, Schema } from "mongoose";

export interface ISubscription extends Document {
  user: mongoose.Types.ObjectId;
  plan: mongoose.Types.ObjectId;
  status: "active" | "inactive" | "expired";
  expiresAt: Date;
  paystackReference: string;
}

const SubscriptionSchema: Schema = new Schema(
  {
    user: { type: Schema.Types.ObjectId, ref: "User", required: true },
    plan: { type: Schema.Types.ObjectId, ref: "Plan", required: true },
    status: {
      type: String,
      enum: ["active", "inactive", "expired"],
      default: "inactive",
    },
    expiresAt: { type: Date },
    paystackReference: { type: String },
  },
  { timestamps: true }
);

export const Subscription = mongoose.model<ISubscription>(
  "Subscription",
  SubscriptionSchema
);
