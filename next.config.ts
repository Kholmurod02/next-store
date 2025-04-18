import type { NextConfig } from "next";
import createNextIntlPlugin from 'next-intl/plugin';

const nextConfig: NextConfig = {
  images:{
    domains:["store-api.softclub.tj"]
  }
};

const withNextIntl = createNextIntlPlugin();
export default withNextIntl(nextConfig);
