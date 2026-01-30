import type { NextConfig } from "next";

const nextConfig: NextConfig = {
	typedRoutes: true,
	output: "export",
	images: {
		unoptimized: true, // Required for static export
		remotePatterns: [
			{
				protocol: "https",
				hostname: "images.unsplash.com",
				port: "",
				pathname: "/**",
			},
		],
	},
	// Disable features that don't work with static export
	trailingSlash: true, // Optional: helps with S3 routing
};

export default nextConfig;
