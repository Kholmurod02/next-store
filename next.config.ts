// next.config.ts
import type { NextConfig } from "next";
import createNextIntlPlugin from 'next-intl/plugin';

const withNextIntl = createNextIntlPlugin();

const nextConfig: NextConfig = {
  images: {
    domains: ["store-api.softclub.tj"],
  },
  reactStrictMode: true,  // Recommended for production
  swcMinify: true         // Recommended for faster builds
};

export default withNextIntl(nextConfig);
