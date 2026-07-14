/** Canonical production host — must match lib/site.ts SITE_URL. */
const CANONICAL_HOST = "www.codevider.com";
const LOCALES = new Set(["en", "de", "fr", "es", "it", "zh", "sq"]);

/**
 * Enforce a single canonical origin for SEO:
 * - apex (codevider.com) → www.codevider.com
 * - http → https
 * - legacy /en/... /sq/... paths → unprefixed URLs (locale is client-only)
 *
 * Serve the static apply shell for any numeric job ID so new roles work
 * without rebuilding the site.
 *
 * Skips *.pages.dev preview deployments for host/canonical redirects only.
 */
export async function onRequest(context) {
	const url = new URL(context.request.url);
	const isPreview = url.hostname.endsWith(".pages.dev");

	if (!isPreview) {
		const needsHttps = url.protocol === "http:";
		const needsWww = url.hostname === "codevider.com";

		if (needsHttps || needsWww) {
			url.protocol = "https:";
			if (needsWww) {
				url.hostname = CANONICAL_HOST;
			}
			return Response.redirect(url.toString(), 301);
		}
	}

	const stripped = stripLocalePrefix(url.pathname);
	if (stripped !== null) {
		url.pathname = stripped;
		return Response.redirect(url.toString(), 301);
	}

	const redirectTarget = redirectCareerApplyPath(url);
	if (redirectTarget) {
		return Response.redirect(redirectTarget.toString(), 301);
	}

	return context.next();
}

function normalizePathname(pathname) {
	return pathname.endsWith("/") && pathname.length > 1
		? pathname.slice(0, -1)
		: pathname;
}

/** Redirect /en, /en/about, /sq/services → /, /about, /services */
function stripLocalePrefix(pathname) {
	const normalized = normalizePathname(pathname);
	const match = normalized.match(/^\/([a-z]{2})(\/.*)?$/);
	if (!match || !LOCALES.has(match[1])) {
		return null;
	}

	return match[2] ?? "/";
}

function redirectCareerApplyPath(url) {
	const match = url.pathname.match(/^(\/career\/apply)\/(\d+)\/?$/);
	if (!match) return null;
	const target = new URL(url);
	target.pathname = match[1];
	target.searchParams.set("id", match[2]);
	return target;
}
