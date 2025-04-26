// next.config.ts
import type { NextConfig } from "next";
import createNextIntlPlugin from 'next-intl/plugin';

const withNextIntl = createNextIntlPlugin();

const nextConfig: NextConfig = {
  images: {
    domains: ["store-api.softclub.tj"],
  },
  reactStrictMode: true,
  swcMinify: true,
  typescript: {
    ignoreBuildErrors: true, // ✅ Ignore type errors during build
  },
  eslint: {
    ignoreDuringBuilds: true, // ✅ Ignore eslint errors during build
  },
};

export default withNextIntl(nextConfig);
