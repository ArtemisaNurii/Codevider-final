import type { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";

const withNextIntl = createNextIntlPlugin();

/**
 * Static export is used for Cloudflare Pages (`out/` + `functions/`).
 * API route handlers are stripped during that build (see scripts/build-static.mjs)
 * so production `/api/*` is served by Pages Functions instead.
 */
const isStaticExport = process.env.STATIC_EXPORT === "1";

const nextConfig: NextConfig = {
	...(isStaticExport ? { output: "export" } : {}),
	images: {
		unoptimized: true,
	},
};

export default withNextIntl(nextConfig);
