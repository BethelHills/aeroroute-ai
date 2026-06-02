import type { NextConfig } from "next";

const aomiProxyTarget = (
  process.env.AOMI_BACKEND_PROXY_TARGET ??
  process.env.NEXT_PUBLIC_BACKEND_URL ??
  "https://api.aomi.dev"
).replace(/\/$/, "");

const nextConfig: NextConfig = {
  env: {
    NEXT_PUBLIC_VERCEL_URL: process.env.VERCEL_URL ?? "",
  },
  async rewrites() {
    return [
      {
        source: "/api/aomi/:path*",
        destination: `${aomiProxyTarget}/:path*`,
      },
    ];
  },
};

export default nextConfig;
