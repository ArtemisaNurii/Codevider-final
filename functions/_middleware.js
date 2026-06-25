/** Canonical production host — must match lib/site.ts SITE_URL. */
const CANONICAL_HOST = "www.codevider.com";
const DEFAULT_LOCALE = "en";

const LOCALE_PREFIX_REDIRECTS = new Map([
	["/", `/${DEFAULT_LOCALE}`],
	["/about", `/${DEFAULT_LOCALE}/about`],
	["/services", `/${DEFAULT_LOCALE}/services`],
	["/career", `/${DEFAULT_LOCALE}/career`],
	["/privacy", `/${DEFAULT_LOCALE}/privacy`],
	["/terms", `/${DEFAULT_LOCALE}/terms`],
]);

/**
 * Enforce a single canonical origin for SEO:
 * - apex (codevider.com) → www.codevider.com
 * - http → https
 * - unprefixed paths → /en/... (301 for crawlers)
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

	const localeRedirect = getLocalePrefixRedirect(url.pathname);
	if (localeRedirect) {
		url.pathname = localeRedirect;
		return Response.redirect(url.toString(), 301);
	}

	const rewrittenPath = rewriteCareerApplyPath(url.pathname);
	if (rewrittenPath) {
		url.pathname = rewrittenPath;
		return context.env.ASSETS.fetch(new Request(url, context.request));
	}

	return context.next();
}

function getLocalePrefixRedirect(pathname) {
	const normalized =
		pathname.endsWith("/") && pathname.length > 1
			? pathname.slice(0, -1)
			: pathname;

	const direct = LOCALE_PREFIX_REDIRECTS.get(normalized);
	if (direct) {
		return direct;
	}

	const applyMatch = normalized.match(/^\/career\/apply\/([^/]+)$/);
	if (applyMatch) {
		return `/${DEFAULT_LOCALE}/career/apply/${applyMatch[1]}`;
	}

	return null;
}

function rewriteCareerApplyPath(pathname) {
	if (!/\/career\/apply\/\d+\/?$/.test(pathname)) {
		return null;
	}

	return pathname.replace(/\/\d+\/?$/, "/_");
}
