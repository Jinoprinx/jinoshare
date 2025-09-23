import "multer";
import axios from "axios";
import { config } from "../config";
import { Provider, TokenResponse } from "./types";

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
      expires_in: res.data.expires_in,
      refresh_token: res.data.refresh_token
    };
  },

  async refreshAccessToken(refreshToken: string): Promise<TokenResponse> {
    const body = new URLSearchParams({
      grant_type: "refresh_token",
      refresh_token: refreshToken,
      client_id: config.providers.linkedin.clientId!,
      client_secret: config.providers.linkedin.clientSecret!
    });

    const res = await axios.post(TOKEN_URL, body.toString(), {
      headers: { "Content-Type": "application/x-www-form-urlencoded" }
    });

    return {
      access_token: res.data.access_token,
      expires_in: res.data.expires_in,
      refresh_token: res.data.refresh_token
    };
  },

  async ensureValidAccessToken(conn) {
    if (conn.expiresAt && conn.expiresAt.getTime() > Date.now()) {
      return conn.accessToken;
    }

    if (conn.refreshToken && this.refreshAccessToken) {
      const t = await this.refreshAccessToken(conn.refreshToken);
      const expiresAt = t.expires_in ? new Date(Date.now() + t.expires_in * 1000) : undefined;
      await conn.update({
        accessToken: t.access_token,
        refreshToken: t.refresh_token,
        scope: t.scope,
        expiresAt
      });
      return t.access_token;
    }

    return conn.accessToken;
  },

  async postText(accessToken: string, { text }: { text: string }) {
    const user = await axios.get("https://api.linkedin.com/v2/userinfo", {
      headers: { Authorization: `Bearer ${accessToken}` }
    });
    const urn = `urn:li:person:${user.data.sub}`
    const body = {
      "author": urn,
      "commentary": text,
      "visibility": "PUBLIC",
      "distribution": {
        "feedDistribution": "MAIN_FEED",
      },
      "lifecycleState": "PUBLISHED",
    };
    const res = await axios.post("https://api.linkedin.com/rest/posts", body, {
      headers: {
        "Authorization": `Bearer ${accessToken}`,
        "Content-Type": "application/json",
        "X-Restli-Protocol-Version": "2.0.0",
        "LinkedIn-Version": "202509"
      }
    });
    return { id: res.headers["x-restli-id"], url: `https://www.linkedin.com/feed/update/${res.headers["x-restli-id"]}` };
  },

  async postMedia(accessToken: string, { file, text }: { file: any, text?: string }) {
    if (!file || !file.mimetype) {
      throw new Error("Invalid file or mimetype for LinkedIn post");
    }
    const user = await axios.get("https://api.linkedin.com/v2/userinfo", {
      headers: { Authorization: `Bearer ${accessToken}` }
    });
    const urn = `urn:li:person:${user.data.sub}`

    // 1. Initialize upload
    const initRes = await axios.post("https://api.linkedin.com/rest/images?action=initializeUpload", {
      "initializeUploadRequest": {
        "owner": urn
      }
    }, {
      headers: {
        "Authorization": `Bearer ${accessToken}`,
        "Content-Type": "application/json",
        "X-Restli-Protocol-Version": "2.0.0",
        "LinkedIn-Version": "202509"
      }
    });
    const uploadUrl = initRes.data.value.uploadUrl;
    const imageUrn = initRes.data.value.image;

    // 2. Upload media
    await axios.put(uploadUrl, file.buffer, {
      headers: { "Content-Type": file.mimetype }
    });

    // 3. Create post
    const body = {
      "author": urn,
      "commentary": text || "",
      "visibility": "PUBLIC",
      "distribution": {
        "feedDistribution": "MAIN_FEED",
      },
      "content": {
        "media": {
          "id": imageUrn
        }
      },
      "lifecycleState": "PUBLISHED",
    };

    const res = await axios.post("https://api.linkedin.com/rest/posts", body, {
      headers: {
        "Authorization": `Bearer ${accessToken}`,
        "Content-Type": "application/json",
        "X-Restli-Protocol-Version": "2.0.0",
        "LinkedIn-Version": "202509"
      }
    });

    return { id: res.headers["x-restli-id"], url: `https://www.linkedin.com/feed/update/${res.headers["x-restli-id"]}` };
  }
};