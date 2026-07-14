import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

const CAREER_APPLY_PATH_PATTERN = /^(\/career\/apply)\/(\d+)\/?$/;
const LOCALE_PREFIX_PATTERN =
	/^\/(en|de|fr|es|it|zh|sq)(\/.*)?$/;

/**
 * Redirects legacy locale-prefixed URLs and path-based career apply URLs.
 * Production uses `functions/_middleware.js` on Cloudflare Pages.
 */
export function proxy(request: NextRequest) {
	const { pathname } = request.nextUrl;

	const localeMatch = pathname.match(LOCALE_PREFIX_PATTERN);
	if (localeMatch) {
		const url = request.nextUrl.clone();
		url.pathname = localeMatch[2] ?? "/";
		return NextResponse.redirect(url, 301);
	}

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
	matcher: [
		"/en/:path*",
		"/de/:path*",
		"/fr/:path*",
		"/es/:path*",
		"/it/:path*",
		"/zh/:path*",
		"/sq/:path*",
		"/career/apply/:path*",
	],
};
