/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  transpilePackages: ["common"],
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