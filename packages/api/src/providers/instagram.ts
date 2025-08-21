import { Provider } from "./types";
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

  async exchangeCodeForToken() {
    // Exchange via Facebook Graph OAuth, then use IG Business endpoints.
    throw new Error("Instagram token exchange not implemented yet");
  },

  async ensureValidAccessToken(conn) {
    return conn.accessToken;
  },

  async postText() {
    // Instagram doesn't support text-only posts; requires media. We'll add media workflow later.
    throw new Error("Instagram postText not supported; requires media upload");
  }
};
