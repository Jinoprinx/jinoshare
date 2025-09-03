import mongoose, { Document, Schema } from "mongoose";

export interface IUser extends Document {
  // Assuming a simple structure for now. This can be expanded with more user fields.
  userId: string;
  is_auto_posting_enabled: boolean;
}

const UserSchema: Schema = new Schema(
  {
    userId: { type: String, required: true, unique: true, index: true },
    is_auto_posting_enabled: { type: Boolean, default: false },
  },
  { timestamps: true }
);

export const User = mongoose.model<IUser>("User", UserSchema);
