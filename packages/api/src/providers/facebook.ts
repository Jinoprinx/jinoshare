import { Provider } from "./types";
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

  async exchangeCodeForToken() {
    // Implement code exchange with app secret and optionally swap for long-lived token.
    throw new Error("Facebook token exchange not implemented yet");
  },

  async ensureValidAccessToken(conn) {
    // Implement token extension/validation if needed.
    return conn.accessToken;
  },

  async postText() {
    // Post to a Page feed: POST /{page-id}/feed with message + page access token.
    throw new Error("Facebook postText not implemented yet");
  }
};
