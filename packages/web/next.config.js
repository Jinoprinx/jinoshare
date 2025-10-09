/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  transpilePackages: ["common"],
  images: {
    domains: ["images.unsplash.com", "lh3.googleusercontent.com"],
  },
  async rewrites() {
    const apiDestination = "https://jinoshare-api-59028d83893a.herokuapp.com";
    return [
      {
        source: "/api/ai/:path*",
        destination: `${apiDestination}/api/ai/:path*`,
      },
      {
        source: "/api/user/:path*",
        destination: `${apiDestination}/api/user/:path*`,
      },
      {
        source: "/api/connections/:path*",
        destination: `${apiDestination}/api/connections/:path*`,
      },
      {
        source: "/api/worker/:path*",
        destination: `${apiDestination}/api/worker/:path*`,
      },
      {
        source: "/api/post/:path*",
        destination: `${apiDestination}/api/post/:path*`,
      },
      {
        source: "/api/upload/:path*",
        destination: `${apiDestination}/api/upload/:path*`,
      },
    ];
  },
  webpack(config) {
    config.resolve.alias = {
      ...config.resolve.alias,
      "@common": require("path").resolve(__dirname, "../common/src"),
      "@": require("path").resolve(__dirname, "./"),
      "@components": require("path").resolve(__dirname, "./components"),
      "@lib": require("path").resolve(__dirname, "./lib"),
    };
    return config;
  },
};
module.exports = nextConfig;