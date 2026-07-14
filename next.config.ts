import type { NextConfig } from "next";

const isStaticExport = process.env.STATIC_EXPORT === "1";

/**
 * Static export is used for S3/CloudFront (`out/`).
 * API route handlers are stripped during that build (see scripts/build-static.mjs)
 * so production `/api/*` can be served by Cloudflare Pages Functions if used.
 */
const nextConfig: NextConfig = {
	...(isStaticExport ? { output: "export" } : {}),
	images: {
		unoptimized: true,
	},
};

export default nextConfig;
