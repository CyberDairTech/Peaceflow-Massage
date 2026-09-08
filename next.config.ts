import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  experimental: {
    optimizeCss: true,
  },
  async redirects() {
    return [
      {
        source: "/book",
        has: [{ type: "query", key: "service", value: "(?<slug>.*)" }],
        destination: "/book/:slug",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
