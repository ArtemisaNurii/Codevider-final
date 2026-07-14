import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

const CAREER_APPLY_PATH_PATTERN = /^(\/career\/apply)\/(\d+)\/?$/;

/**
 * Redirects path-based career apply URLs.
 * Production uses `functions/_middleware.js` on Cloudflare Pages.
 */
export function proxy(request: NextRequest) {
	const { pathname } = request.nextUrl;

	const match = pathname.match(CAREER_APPLY_PATH_PATTERN);
	if (match) {
		const url = request.nextUrl.clone();
		url.pathname = match[1];
		url.searchParams.set("id", match[2]);
		return NextResponse.redirect(url, 301);
	}

	return NextResponse.next();
}

export const config = {
	matcher: ["/career/apply/:path*"],
};
