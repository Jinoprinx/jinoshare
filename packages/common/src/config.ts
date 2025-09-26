import "dotenv/config";

export const config = {
  port: parseInt(process.env.PORT || "4000", 10),
  clientOrigin: process.env.CLIENT_ORIGIN || "http://localhost:3000",
  appUrl: process.env.APP_URL || "http://localhost:3000",
  mongoUri: process.env.MONGODB_URI || "mongodb://127.0.0.1:27017/jinoshareDB",
  defaultUserId: process.env.DEFAULT_USER_ID || "dev-user",
  workerSecret: process.env.WORKER_SECRET || "dev-worker-secret",
  providers: {
    x: {
      clientId: process.env.X_CLIENT_ID!,
      clientSecret: process.env.X_CLIENT_SECRET!,
      redirectUri: process.env.X_REDIRECT_URI!,
      scopes: ["tweet.read", "tweet.write", "users.read", "offline.access"]
    },
    linkedin: {
      clientId: process.env.LINKEDIN_CLIENT_ID,
      clientSecret: process.env.LINKEDIN_CLIENT_SECRET,
      redirectUri: process.env.LINKEDIN_REDIRECT_URI,
      scopes: ["openid", "profile", "w_member_social", "email"]
    },
    facebook: {
      clientId: process.env.FB_CLIENT_ID,
      clientSecret: process.env.FB_CLIENT_SECRET,
      redirectUri: process.env.FB_REDIRECT_URI,
      scopes: ["public_profile", "pages_manage_posts", "pages_read_engagement", "pages_show_list"]
    },
    instagram: {
      clientId: process.env.IG_CLIENT_ID,
      clientSecret: process.env.IG_CLIENT_SECRET,
      redirectUri: process.env.IG_REDIRECT_URI,
      scopes: ["instagram_basic", "pages_show_list", "instagram_content_publish"]
    }
  }
};
