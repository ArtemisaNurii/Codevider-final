import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

const CAREER_APPLY_PATH_PATTERN =
	/^((?:\/[a-z]{2})?\/career\/apply)\/(\d+)\/?$/;

/**
 * Redirects legacy path-based career apply URLs to query param form.
 * Production uses `functions/_middleware.js` on Cloudflare Pages.
 */
export function proxy(request: NextRequest) {
	const match = request.nextUrl.pathname.match(CAREER_APPLY_PATH_PATTERN);

	if (match) {
		const url = request.nextUrl.clone();
		url.pathname = match[1];
		url.searchParams.set("id", match[2]);
		return NextResponse.redirect(url, 301);
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
