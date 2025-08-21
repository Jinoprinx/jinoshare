import { Router } from "express";
import crypto from "crypto";
import { getProvider } from "../providers/index";
import { generateVerifier, challengeFromVerifier } from "../utils/pkce";
import { config } from "../config";
import { Connection } from "../models/Connection";
import { Channel } from "../../../common/src/index";

export const auth = Router();

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
