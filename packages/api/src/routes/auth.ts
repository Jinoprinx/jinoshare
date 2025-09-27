import { Router } from "express";
import crypto from "crypto";
import { getProvider } from "../providers/index";
import { generateVerifier, challengeFromVerifier } from "../utils/pkce";
import { config } from "../config";
import { Connection } from "../models/Connection";
import { Channel } from "../../../common/dist/types";

import { User } from "../models/User";
import bcrypt from "bcryptjs";

export const auth = Router();

// Handle preflight OPTIONS request for credentials
auth.options("/credentials", (req, res) => {
  console.log("OPTIONS request received for /auth/credentials");
  res.header("Access-Control-Allow-Origin", req.headers.origin);
  res.header("Access-Control-Allow-Methods", "POST, OPTIONS");
  res.header("Access-Control-Allow-Headers", "Content-Type, Authorization");
  res.header("Access-Control-Allow-Credentials", "true");
  res.status(200).send();
});

auth.post("/credentials", async (req, res) => {
  try {
    console.log("Auth request received:", { email: req.body.email, hasPassword: !!req.body.password });
    const { email, password } = req.body;

    if (!email || !password) {
      console.log("Missing email or password");
      return res.status(400).json({ message: "Email and password are required." });
    }

    console.log("Looking for user with email:", email);
    const user = await User.findOne({ email });
    console.log("User found:", { userExists: !!user, hasPassword: !!user?.password });

    if (user && user.password) {
      console.log("Comparing passwords");
      const isPasswordCorrect = await bcrypt.compare(password, user.password);
      console.log("Password comparison result:", isPasswordCorrect);

      if (isPasswordCorrect) {
        console.log("Authentication successful for user:", user.id);
        return res.status(200).json({
          id: user.id,
          firstName: user.firstName,
          lastName: user.lastName,
          email: user.email,
          image: user.image,
          role: user.role,
          is_auto_posting_enabled: user.is_auto_posting_enabled,
          emailVerified: user.emailVerified?.toISOString(),
          createdAt: user.createdAt.toISOString(),
          updatedAt: user.updatedAt.toISOString(),
        });
      }
    }

    console.log("Authentication failed for email:", email);
    return res.status(401).json({ message: "Invalid credentials." });
  } catch (error) {
    console.error("Auth credentials error:", error);
    return res.status(500).json({ message: "Internal server error", error: error instanceof Error ? error.message : String(error) });
  }
});

// GET /auth/:provider/login
auth.get("/:provider/login", async (req, res) => {
  const providerId = (req.params.provider || "").toLowerCase() as Channel;
  const provider = getProvider(providerId);
  if (!provider) return res.status(404).send("Unknown provider");

  const userId = (req.query.userId as string) || config.defaultUserId;
  const state = crypto.randomBytes(16).toString("hex");

  let codeVerifier: string | undefined;
  let codeChallenge: string | undefined;

  if (provider.usesPkce) {
    codeVerifier = generateVerifier();
    codeChallenge = challengeFromVerifier(codeVerifier);
  }

  res.cookie(`oauth_state_${providerId}`, state, { httpOnly: true, sameSite: "lax", maxAge: 10 * 60 * 1000 });
  if (codeVerifier) {
    res.cookie(`oauth_verifier_${providerId}`, codeVerifier, { httpOnly: true, sameSite: "lax", maxAge: 10 * 60 * 1000 });
  }
  res.cookie(`oauth_uid_${providerId}`, userId, { httpOnly: true, sameSite: "lax", maxAge: 10 * 60 * 1000 });

  const url = provider.buildAuthUrl({ state, codeChallenge });
  res.redirect(url);
});

// GET /auth/:provider/callback
auth.get("/:provider/callback", async (req, res) => {
  const providerId = (req.params.provider || "").toLowerCase() as Channel;
  const provider = getProvider(providerId);
  if (!provider) return res.status(404).send("Unknown provider");

  try {
    const { code, state } = req.query as { code?: string; state?: string };
    const cookieState = req.cookies[`oauth_state_${providerId}`];
    const verifier = req.cookies[`oauth_verifier_${providerId}`];
    const userId = req.cookies[`oauth_uid_${providerId}`] || config.defaultUserId;

    if (!code || !state || !cookieState || state !== cookieState) {
      return res.status(400).send("Invalid OAuth state or code");
    }

    const redirectUri = (config.providers as any)[providerId].redirectUri as string;
    const tokens = await provider.exchangeCodeForToken({
      code,
      redirectUri,
      codeVerifier: provider.usesPkce ? verifier : undefined
    });

    const expiresAt = tokens.expires_in ? new Date(Date.now() + tokens.expires_in * 1000) : undefined;

    await Connection.findOneAndUpdate(
      { userId, provider: providerId },
      {
        $set: {
          accessToken: tokens.access_token,
          refreshToken: tokens.refresh_token,
          tokenType: tokens.token_type,
          scope: tokens.scope,
          expiresAt
        }
      },
      { upsert: true }
    );

    const redirectTo = new URL("/dashboard", config.clientOrigin);
    redirectTo.searchParams.set(providerId, "connected");
    res.redirect(redirectTo.toString());
  } catch (err: any) {
    console.error(`[${providerId}] OAuth callback error`, err.response?.data || err.message);
    const redirectTo = new URL("/dashboard", config.clientOrigin);
    redirectTo.searchParams.set(providerId, "error");
    res.redirect(redirectTo.toString());
  }
});
