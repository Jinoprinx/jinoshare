/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  transpilePackages: ["common"],
  images: {
    domains: ["images.unsplash.com", "lh3.googleusercontent.com"],
  },
  webpack(config) {
    config.resolve.alias = {
      ...config.resolve.alias,
      "@common": require("path").resolve(__dirname, "../common/src"),
      "@": require("path").resolve(__dirname, "./"),
    };
    return config;
  },
};
module.exports = nextConfig;