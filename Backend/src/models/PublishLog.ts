import { Schema, model } from "mongoose";

export interface IPublishLog {
  userId: string;
  provider: "x" | "linkedin" | "facebook" | "instagram";
  content: string;
  providerPostId?: string;
  status: "success" | "error";
  errorMessage?: string;
  createdAt: Date;
}

const PublishLogSchema = new Schema<IPublishLog>(
  {
    userId: { type: String, index: true, required: true },
    provider: { type: String, required: true },
    content: { type: String, required: true },
    providerPostId: String,
    status: { type: String, enum: ["success", "error"], required: true },
    errorMessage: String
  },
  { timestamps: { createdAt: true, updatedAt: false } }
);

export const PublishLog = model<IPublishLog>("PublishLog", PublishLogSchema);
