import "multer";
import axios from "axios";
import { Provider, TokenResponse } from "./types";
import { config } from "../config";

// Note: Instagram Content Publishing API requires Business accounts and a connected Facebook Page.
export const instagramProvider: Provider = {
  id: "instagram",
  displayName: "Instagram",
  usesPkce: false,

  buildAuthUrl({ state }) {
    const params = new URLSearchParams({
      response_type: "code",
      client_id: config.providers.instagram.clientId!,
      redirect_uri: config.providers.instagram.redirectUri!,
      scope: (config.providers.instagram.scopes || []).join(","),
      state
    });
    return `https://www.facebook.com/v18.0/dialog/oauth?${params.toString()}`;
  },

  async exchangeCodeForToken({ code, redirectUri }): Promise<TokenResponse> {
    // Exchange via Facebook Graph OAuth
    const res = await axios.post("https://graph.facebook.com/v18.0/oauth/access_token", null, {
      params: {
        client_id: config.providers.instagram.clientId,
        client_secret: config.providers.instagram.clientSecret,
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

  async postText() {
    // Instagram doesn't support text-only posts; requires media. 
    throw new Error("Instagram postText not supported; requires media upload");
  },

  async postMedia(accessToken: string, { file, text }: { file: any, text?: string }) {
    // 1. First get the Instagram Business Account ID
    const pagesRes = await axios.get("https://graph.facebook.com/v18.0/me/accounts", {
      params: { access_token: accessToken }
    });
    
    const page = pagesRes.data.data[0]; // Use first connected page
    if (!page) throw new Error("No Facebook page connected");
    
    const igAccountRes = await axios.get(`https://graph.facebook.com/v18.0/${page.id}`, {
      params: { 
        fields: "instagram_business_account",
        access_token: accessToken 
      }
    });
    
    const igAccountId = igAccountRes.data.instagram_business_account?.id;
    if (!igAccountId) throw new Error("No Instagram Business account linked to Facebook page");

    // 2. Create media container
    const isVideo = file.mimetype.startsWith('video/');
    const mediaType = isVideo ? 'VIDEO' : 'IMAGE';
    
    // For this implementation, we'll need to host the media somewhere accessible via URL
    // This is a simplified approach - in production you'd want proper media hosting
    const mediaUrl = `data:${file.mimetype};base64,${file.buffer.toString('base64')}`;
    
    const containerRes = await axios.post(`https://graph.facebook.com/v18.0/${igAccountId}/media`, null, {
      params: {
        ...(isVideo ? { video_url: mediaUrl } : { image_url: mediaUrl }),
        media_type: mediaType,
        caption: text || "",
        access_token: accessToken
      }
    });
    
    const containerId = containerRes.data.id;
    
    // 3. Publish the media
    const publishRes = await axios.post(`https://graph.facebook.com/v18.0/${igAccountId}/media_publish`, null, {
      params: {
        creation_id: containerId,
        access_token: accessToken
      }
    });
    
    const mediaId = publishRes.data.id;
    return { id: mediaId, url: `https://www.instagram.com/p/${mediaId}/` };
  }
};
