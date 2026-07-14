import type { NextConfig } from "next";

/**
 * Static export is used for Cloudflare Pages (`out/` + `functions/`).
 * API route handlers are stripped during that build (see scripts/build-static.mjs)
 * so production `/api/*` is served by Pages Functions instead.
 */
const nextConfig: NextConfig = {
	images: {
		unoptimized: true,
	},
};

export default nextConfig;
