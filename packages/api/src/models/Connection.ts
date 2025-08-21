import { IConnection } from "@jino/common";
import { Schema, model } from "mongoose";

const ConnectionSchema = new Schema<IConnection>(
  {
    userId: { type: String, index: true, required: true },
    provider: { type: String, enum: ["x", "linkedin", "facebook", "instagram"], required: true },
    providerUserId: String,
    handle: String,
    accessToken: { type: String, required: true },
    refreshToken: String,
    tokenType: String,
    scope: String,
    expiresAt: Date,
    meta: Schema.Types.Mixed
  },
  { timestamps: true }
);

ConnectionSchema.index({ userId: 1, provider: 1 }, { unique: true });

export const Connection = model<IConnection>("Connection", ConnectionSchema);
