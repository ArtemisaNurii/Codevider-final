/** Canonical production host — must match lib/site.ts SITE_URL. */
const CANONICAL_HOST = "www.codevider.com";
const DEFAULT_LOCALE = "en";

/**
 * Enforce a single canonical origin for SEO:
 * - apex (codevider.com) → www.codevider.com
 * - http → https
 * - /en/... → unprefixed English paths (localePrefix: as-needed)
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

	const stripped = stripDefaultLocalePrefix(url.pathname);
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

function stripDefaultLocalePrefix(pathname) {
	const normalized =
		pathname.endsWith("/") && pathname.length > 1
			? pathname.slice(0, -1)
			: pathname;

	if (normalized === `/${DEFAULT_LOCALE}`) {
		return "/";
	}

	const prefix = `/${DEFAULT_LOCALE}/`;
	if (normalized.startsWith(prefix)) {
		return normalized.slice(DEFAULT_LOCALE.length + 1);
	}

	return null;
}

function redirectCareerApplyPath(url) {
	const match = url.pathname.match(
		/^((?:\/[a-z]{2})?\/career\/apply)\/(\d+)\/?$/,
	);
	if (!match) return null;
	const target = new URL(url);
	let basePath = match[1];
	if (basePath.startsWith(`/${DEFAULT_LOCALE}/`)) {
		basePath = basePath.slice(DEFAULT_LOCALE.length + 1);
	}
	target.pathname = basePath;
	target.searchParams.set("id", match[2]);
	return target;
}
