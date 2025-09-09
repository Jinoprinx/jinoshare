import { Router } from "express";
import { User } from "../models/User";
import bcrypt from "bcryptjs";
import { connectDb } from "../db";

export const signup = Router();

signup.post("/", async (req, res) => {
  await connectDb();

  const { email, password, firstName, lastName } = req.body;

  if (!email || !password || !firstName || !lastName) {
    return res.status(400).json({ message: "All fields are required." });
  }

  const existingUser = await User.findOne({ email });

  if (existingUser) {
    return res.status(409).json({ message: "User already exists." });
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const user = new User({
    email,
    password: hashedPassword,
    firstName,
    lastName,
  });

  await user.save();

  res.status(201).json({ message: "User created successfully." });
});
