import type { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";

const withNextIntl = createNextIntlPlugin();

const nextConfig: NextConfig = {
  output: "export",
  allowedDevOrigins: ['192.168.4.124']
};

export default withNextIntl(nextConfig);
