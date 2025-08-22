import "multer";

export type ProviderId = "x" | "linkedin" | "facebook" | "instagram";

export interface TokenResponse {
  access_token: string;
  refresh_token?: string;
  token_type?: string;
  scope?: string;
  expires_in?: number;
}

export interface Provider {
  id: ProviderId;
  displayName: string;
  // Return full authorize URL. Implement PKCE if the provider supports it.
  buildAuthUrl(params: {
    state: string;
    codeChallenge?: string;
  }): string;

  // Exchange authorization code for tokens.
  exchangeCodeForToken(params: {
    code: string;
    redirectUri: string;
    codeVerifier?: string;
  }): Promise<TokenResponse>;

  // Optional refresh
  refreshAccessToken?(refreshToken: string): Promise<TokenResponse>;

  // Whether PKCE is required/supported for this provider.
  usesPkce: boolean;

  // Validate and refresh if needed. Return valid access token.
  ensureValidAccessToken(conn: {
    accessToken: string;
    refreshToken?: string;
    expiresAt?: Date;
    update(tokens: Partial<{ accessToken: string; refreshToken: string; scope: string; expiresAt: Date }>): Promise<void>;
  }): Promise<string>;

  // Minimal posting interface (text). Providers can expand later.
  postText(accessToken: string, payload: { text: string }): Promise<{ id: string, url: string }>;

  // Optional media posting interface.
  postMedia?(accessToken: string, payload: { file: any, text?: string }): Promise<{ id: string, url: string }>;
}
