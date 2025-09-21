import "multer";
import axios from "axios";
import FormData from "form-data";
import { config } from "../config";
import { Provider, TokenResponse } from "./types";

const AUTH_URL = "https://twitter.com/i/oauth2/authorize";
const TOKEN_URL = "https://api.twitter.com/2/oauth2/token";
const TWEET_URL = "https://api.twitter.com/2/tweets";

function basicAuthHeader() {
  const creds = Buffer.from(`${config.providers.x.clientId}:${config.providers.x.clientSecret}`).toString("base64");
  return `Basic ${creds}`;
}

export const xProvider: Provider = {
  id: "x",
  displayName: "X (formerly Twitter)",
  usesPkce: true,

  buildAuthUrl({ state, codeChallenge }) {
    const scopes = config.providers.x.scopes.join(" ");
    const params = new URLSearchParams({
      response_type: "code",
      client_id: config.providers.x.clientId!,
      redirect_uri: config.providers.x.redirectUri!,
      scope: scopes,
      state,
      code_challenge: codeChallenge || "",
      code_challenge_method: "S256"
    });
    return `${AUTH_URL}?${params.toString()}`;
  },

  async exchangeCodeForToken({ code, redirectUri, codeVerifier }): Promise<TokenResponse> {
    const body = new URLSearchParams({
      grant_type: "authorization_code",
      code,
      redirect_uri: redirectUri,
      client_id: config.providers.x.clientId!,
      code_verifier: codeVerifier || ""
    });

    const res = await axios.post(TOKEN_URL, body.toString(), {
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        "Authorization": basicAuthHeader()
      }
    });

    return res.data;
  },

  async refreshAccessToken(refreshToken: string): Promise<TokenResponse> {
    const body = new URLSearchParams({
      grant_type: "refresh_token",
      refresh_token: refreshToken,
      client_id: config.providers.x.clientId!
    });

    const res = await axios.post(TOKEN_URL, body.toString(), {
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        "Authorization": basicAuthHeader()
      }
    });

    return res.data;
  },

  async ensureValidAccessToken(conn) {
    const needRefresh =
      !!conn.refreshToken &&
      !!conn.expiresAt &&
      conn.expiresAt.getTime() < Date.now() + 60_000;

    if (needRefresh && this.refreshAccessToken) {
      const t = await this.refreshAccessToken(conn.refreshToken!);
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
    const res = await axios.post(
      TWEET_URL,
      { text },
      { headers: { Authorization: `Bearer ${accessToken}`, "Content-Type": "application/json" } }
    );
    const id = res.data?.data?.id;
    return { id, url: `https://x.com/anyuser/status/${id}` };
  },

  async postMedia(accessToken: string, { file, text }: { file: any, text?: string }) {
    if (!file || !file.mimetype) {
      throw new Error("Invalid file or mimetype for X post");
    }
    // 1. Upload media first
    const formData = new FormData();
    formData.append("media", file.buffer, {
      filename: file.originalname,
      contentType: file.mimetype
    });
    
    const uploadRes = await axios.post("https://upload.twitter.com/1.1/media/upload.json", formData, {
      headers: {
        "Authorization": `Bearer ${accessToken}`,
        ...formData.getHeaders()
      }
    });
    
    const mediaId = uploadRes.data.media_id_string;
    
    // 2. Create tweet with media
    const tweetRes = await axios.post(
      TWEET_URL,
      { 
        text: text || "",
        media: { media_ids: [mediaId] }
      },
      { 
        headers: { 
          Authorization: `Bearer ${accessToken}`, 
          "Content-Type": "application/json" 
        } 
      }
    );
    
    const id = tweetRes.data?.data?.id;
    return { id, url: `https://x.com/anyuser/status/${id}` };
  }
};
