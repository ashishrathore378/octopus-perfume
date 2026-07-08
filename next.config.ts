import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "tlvtmaqdughqnvseoqmh.supabase.co",
      },
    ],
  },
};

export default nextConfig;