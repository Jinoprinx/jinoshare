
import { Router } from "express";
import { User } from "../models/User";

export const verifyEmail = Router();

verifyEmail.get("/", async (req, res) => {
  try {
    const { token } = req.query;

    if (!token) {
      return res.status(400).json({ message: "Invalid verification token." });
    }

    const user = await User.findOne({
      emailVerificationToken: token as string,
      emailVerificationTokenExpires: { $gt: new Date() },
    });

    if (!user) {
      return res.status(400).json({ message: "Invalid or expired verification token." });
    }

    user.isEmailVerified = true;
    user.emailVerified = new Date();
    user.emailVerificationToken = undefined;
    user.emailVerificationTokenExpires = undefined;

    await user.save();

    // Redirect to a page that informs the user that their email has been verified
    // and they can now log in.
    res.redirect(`${process.env.CLIENT_ORIGIN}/auth/verified`);

  } catch (error) {
    console.error("Email verification error:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});
