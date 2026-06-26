import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import { rewriteCareerApplyPath } from "@/lib/career-apply";

/**
 * Rewrites numeric career apply URLs to the static-export shell route.
 * Production uses `functions/_middleware.js` on Cloudflare Pages.
 */
export function proxy(request: NextRequest) {
	const rewrittenPath = rewriteCareerApplyPath(request.nextUrl.pathname);

	if (rewrittenPath) {
		const url = request.nextUrl.clone();
		url.pathname = rewrittenPath;
		return NextResponse.rewrite(url);
	}

	return NextResponse.next();
}

export const config = {
	matcher: [
		"/career/apply/:path*",
		"/en/career/apply/:path*",
		"/de/career/apply/:path*",
		"/fr/career/apply/:path*",
		"/es/career/apply/:path*",
		"/it/career/apply/:path*",
		"/sq/career/apply/:path*",
	],
};
