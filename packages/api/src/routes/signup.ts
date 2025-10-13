import { Router } from "express";
import { User } from "../models/User";
import bcrypt from "bcryptjs";
import { connectDb } from "../../../common/dist/db";
import { sendEmail } from "../utils/email";
import crypto from "crypto";

export const signup = Router();

// Handle preflight OPTIONS request
signup.options("/", (req, res) => {
  console.log("OPTIONS request received for /signup");
  res.header("Access-Control-Allow-Origin", req.headers.origin);
  res.header("Access-Control-Allow-Methods", "POST, OPTIONS");
  res.header("Access-Control-Allow-Headers", "Content-Type, Authorization");
  res.header("Access-Control-Allow-Credentials", "true");
  res.status(200).send();
});

signup.post("/", async (req, res) => {
  try {
    console.log("Signup request received:", { body: req.body });
    const { email, password, firstName, lastName } = req.body;

    if (!email || !password || !firstName || !lastName) {
      console.log("Missing required fields");
      return res.status(400).json({ message: "All fields are required." });
    }

    console.log("Checking for existing user with email:", email);
    const existingUser = await User.findOne({ email });

    if (existingUser) {
      console.log("User already exists");
      return res.status(409).json({ message: "User already exists." });
    }

    console.log("Creating new user");
    const hashedPassword = await bcrypt.hash(password, 10);

    const user = new User({
      email,
      password: hashedPassword,
      firstName,
      lastName,
    });

    const emailVerificationToken = crypto.randomBytes(32).toString("hex");
    user.emailVerificationToken = emailVerificationToken;
    user.emailVerificationTokenExpires = new Date(Date.now() + 3600000); // 1 hour

    await user.save();
    console.log("User created successfully:", user.id);

    const verificationUrl = `${process.env.CLIENT_ORIGIN}/auth/verify-email?token=${emailVerificationToken}`;

    await sendEmail(
      user.email,
      "Verify your email address",
      `Please click this link to verify your email address: ${verificationUrl}`,
      `<p>Please click this link to verify your email address: <a href="${verificationUrl}">${verificationUrl}</a></p>`
    );

    res.status(201).json({ message: "User created successfully. Please check your email to verify your account." });
  } catch (error) {
    console.error("Signup error:", error);

    // Handle MongoDB duplicate key errors specifically
    if (error instanceof Error && error.message.includes('E11000 duplicate key error')) {
      if (error.message.includes('email')) {
        return res.status(409).json({ message: "Email already exists" });
      }
      if (error.message.includes('userId')) {
        console.error("userId index error - this should be fixed by running npm run fix-indexes");
        return res.status(500).json({ message: "Database configuration error - please contact support" });
      }
      return res.status(409).json({ message: "User already exists" });
    }

    return res.status(500).json({ message: "Internal server error", error: error instanceof Error ? error.message : String(error) });
  }
});
