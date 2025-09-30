/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  transpilePackages: ["common"],
  images: {
    domains: ["images.unsplash.com", "lh3.googleusercontent.com"],
  },
  async rewrites() {
    const apiDestination = "https://jinoshare-api-59028d83893a.herokuapp.com/:path*";
    return [
      {
        source: "/api/ai/:path*",
        destination: apiDestination,
      },
      {
        source: "/api/user/:path*",
        destination: apiDestination,
      },
      {
        source: "/api/connections/:path*",
        destination: apiDestination,
      },
      {
        source: "/api/worker/:path*",
        destination: apiDestination,
      },
      {
        source: "/api/post/:path*",
        destination: apiDestination,
      },
      {
        source: "/api/upload/:path*",
        destination: apiDestination,
      },
    ];
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