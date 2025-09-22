import "multer";
import axios from "axios";
import FormData from "form-data";
import { Provider, TokenResponse } from "./types";
import { config } from "../config";

// Facebook Graph uses long-lived tokens and Page tokens for posting.
export const facebookProvider: Provider = {
  id: "facebook",
  displayName: "Facebook",
  usesPkce: false,

  buildAuthUrl({ state }) {
    const params = new URLSearchParams({
      response_type: "code",
      client_id: config.providers.facebook.clientId!,
      redirect_uri: config.providers.facebook.redirectUri!,
      scope: (config.providers.facebook.scopes || []).join(","),
      state
    });
    return `https://www.facebook.com/v20.0/dialog/oauth?${params.toString()}`;
  },

  async exchangeCodeForToken({ code, redirectUri }): Promise<TokenResponse> {
    const res = await axios.post("https://graph.facebook.com/v20.0/oauth/access_token", null, {
      params: {
        client_id: config.providers.facebook.clientId,
        client_secret: config.providers.facebook.clientSecret,
        redirect_uri: redirectUri,
        code
      }
    });
    console.log("Facebook token exchange response:", res.data);
    return {
      access_token: res.data.access_token,
      expires_in: res.data.expires_in
    };
  },

  async ensureValidAccessToken(conn) {
    if (conn.expiresAt && conn.expiresAt.getTime() > Date.now()) {
      return conn.accessToken;
    }

    // Exchange for a long-lived token
    const res = await axios.get("https://graph.facebook.com/v20.0/oauth/access_token", {
      params: {
        grant_type: "fb_exchange_token",
        client_id: config.providers.facebook.clientId,
        client_secret: config.providers.facebook.clientSecret,
        fb_exchange_token: conn.accessToken
      }
    });

    const newAccessToken = res.data.access_token;
    const newExpiresIn = res.data.expires_in;

    conn.accessToken = newAccessToken;
    conn.expiresAt = new Date(Date.now() + newExpiresIn * 1000);

    // Here you would typically save the updated connection to your database
    // For example: await db.updateConnection(conn.id, { accessToken: newAccessToken, expiresAt: conn.expiresAt });

    return newAccessToken;
  },

  async postText(accessToken: string, { text }: { text: string }) {
    console.log("Facebook postText - accessToken:", accessToken ? 'Present' : 'Missing');
    // Get pages and use first one
    const pagesRes = await axios.get("https://graph.facebook.com/v20.0/me/accounts", {
      params: { access_token: accessToken }
    });

    console.log("Facebook pages response:", pagesRes.data);
    const page = pagesRes.data.data[0];
    console.log("Facebook page:", page);
    if (!page) throw new Error("No Facebook page connected");
    
    const res = await axios.post(`https://graph.facebook.com/v20.0/${page.id}/feed`, null, {
      params: {
        message: text,
        access_token: page.access_token
      }
    });
    
    return { id: res.data.id, url: `https://www.facebook.com/${res.data.id}` };
  },

  async postMedia(accessToken: string, { file, text }: { file: any, text?: string }) {
    if (!file || !file.mimetype) {
      throw new Error("Invalid file or mimetype for Facebook post");
    }
    // Get pages and use first one
    const pagesRes = await axios.get("https://graph.facebook.com/v20.0/me/accounts", {
      params: { access_token: accessToken }
    });
    
    const page = pagesRes.data.data[0];
    console.log("Facebook page:", page);
    if (!page) throw new Error("No Facebook page connected");
    
    const isVideo = file.mimetype.startsWith('video/');
    const endpoint = isVideo ? 'videos' : 'photos';
    
    const formData = new FormData();
    formData.append(isVideo ? 'source' : 'source', file.buffer, {
      filename: file.originalname,
      contentType: file.mimetype
    });
    
    if (text) formData.append(isVideo ? 'description' : 'message', text);
    formData.append('access_token', page.access_token);
    
    const res = await axios.post(`https://graph.facebook.com/v20.0/${page.id}/${endpoint}`, formData, {
      headers: formData.getHeaders()
    });
    
    return { id: res.data.id, url: `https://www.facebook.com/${res.data.id}` };
  }
};