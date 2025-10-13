
import mongoose, { Document, Schema } from "mongoose";

export interface IPlan extends Document {
  name: string;
  price: number;
  features: string[];
}

const PlanSchema: Schema = new Schema(
  {
    name: { type: String, required: true, unique: true },
    price: { type: Number, required: true },
    features: [{ type: String }],
  },
  { timestamps: true }
);

export const Plan = mongoose.model<IPlan>("Plan", PlanSchema);
