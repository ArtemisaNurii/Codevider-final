import type { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";

const withNextIntl = createNextIntlPlugin();

const nextConfig: NextConfig = {
	output: "export",
	images: {
		unoptimized: true,
	},
	allowedDevOrigins: ["192.168.4.126"],
};

export default withNextIntl(nextConfig);
