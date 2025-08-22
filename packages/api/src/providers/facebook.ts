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
    return `https://www.facebook.com/v18.0/dialog/oauth?${params.toString()}`;
  },

  async exchangeCodeForToken({ code, redirectUri }): Promise<TokenResponse> {
    const res = await axios.post("https://graph.facebook.com/v18.0/oauth/access_token", null, {
      params: {
        client_id: config.providers.facebook.clientId,
        client_secret: config.providers.facebook.clientSecret,
        redirect_uri: redirectUri,
        code
      }
    });
    return {
      access_token: res.data.access_token,
      expires_in: res.data.expires_in
    };
  },

  async ensureValidAccessToken(conn) {
    return conn.accessToken;
  },

  async postText(accessToken: string, { text }: { text: string }) {
    // Get pages and use first one
    const pagesRes = await axios.get("https://graph.facebook.com/v18.0/me/accounts", {
      params: { access_token: accessToken }
    });
    
    const page = pagesRes.data.data[0];
    if (!page) throw new Error("No Facebook page connected");
    
    const res = await axios.post(`https://graph.facebook.com/v18.0/${page.id}/feed`, null, {
      params: {
        message: text,
        access_token: page.access_token
      }
    });
    
    return { id: res.data.id, url: `https://www.facebook.com/${res.data.id}` };
  },

  async postMedia(accessToken: string, { file, text }: { file: any, text?: string }) {
    // Get pages and use first one
    const pagesRes = await axios.get("https://graph.facebook.com/v18.0/me/accounts", {
      params: { access_token: accessToken }
    });
    
    const page = pagesRes.data.data[0];
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
    
    const res = await axios.post(`https://graph.facebook.com/v18.0/${page.id}/${endpoint}`, formData, {
      headers: formData.getHeaders()
    });
    
    return { id: res.data.id, url: `https://www.facebook.com/${res.data.id}` };
  }
};
