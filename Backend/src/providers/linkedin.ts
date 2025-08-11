import axios from "axios";
import { config } from "../config.js";
import { Provider, TokenResponse } from "./types.js";

const AUTH_URL = "https://www.linkedin.com/oauth/v2/authorization";
const TOKEN_URL = "https://www.linkedin.com/oauth/v2/accessToken";
// Posting endpoint uses UGC/shares; specifics will be added later.

export const linkedinProvider: Provider = {
  id: "linkedin",
  displayName: "LinkedIn",
  usesPkce: false, // LinkedIn supports standard OAuth 2.0; PKCE optional for some flows.

  buildAuthUrl({ state }) {
    const scopes = (config.providers.linkedin.scopes || []).join(" ");
    const params = new URLSearchParams({
      response_type: "code",
      client_id: config.providers.linkedin.clientId!,
      redirect_uri: config.providers.linkedin.redirectUri!,
      scope: scopes,
      state
    });
    return `${AUTH_URL}?${params.toString()}`;
  },

  async exchangeCodeForToken({ code, redirectUri }): Promise<TokenResponse> {
    const body = new URLSearchParams({
      grant_type: "authorization_code",
      code,
      redirect_uri: redirectUri,
      client_id: config.providers.linkedin.clientId!,
      client_secret: config.providers.linkedin.clientSecret!
    });
    const res = await axios.post(TOKEN_URL, body.toString(), {
      headers: { "Content-Type": "application/x-www-form-urlencoded" }
    });
    return {
      access_token: res.data.access_token,
      expires_in: res.data.expires_in
    };
  },

  async ensureValidAccessToken(conn) {
    // LinkedIn refresh tokens are limited/optional; implement when enabling offline access.
    return conn.accessToken;
  },

  async postText(accessToken: string, { text }: { text: string }) {
    // Placeholder: implement UGC Post or Shares API with author URN.
    throw new Error("LinkedIn postText not implemented yet");
  }
};
