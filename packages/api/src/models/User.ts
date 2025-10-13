import mongoose, { Document, Schema } from "mongoose";

export interface IUser extends Document {
  firstName?: string;
  lastName?: string;
  email?: string;
  image?: string;
  password?: string;
  emailVerified?: Date;
  is_auto_posting_enabled: boolean;
  role: 'user' | 'admin';
  createdAt: Date;
  updatedAt: Date;
  emailVerificationToken?: string;
  emailVerificationTokenExpires?: Date;
  isEmailVerified: boolean;
  subscription?: mongoose.Types.ObjectId;
}

const UserSchema: Schema = new Schema(
  {
    firstName: { type: String },
    lastName: { type: String },
    email: { type: String, unique: true },
    image: { type: String },
    password: { type: String },
    emailVerified: { type: Date },
    is_auto_posting_enabled: { type: Boolean, default: false },
    role: {
      type: String,
      enum: ['user', 'admin'],
      default: 'user',
    },
    emailVerificationToken: { type: String, select: false },
    emailVerificationTokenExpires: { type: Date, select: false },
    isEmailVerified: { type: Boolean, default: false },
    subscription: {
      type: Schema.Types.ObjectId,
      ref: "Subscription",
    },
  },
  { timestamps: true }
);

export const User = mongoose.model<IUser>("User", UserSchema);
