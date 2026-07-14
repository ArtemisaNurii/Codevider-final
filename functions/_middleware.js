/** Canonical production host — must match lib/site.ts SITE_URL. */
const CANONICAL_HOST = "www.codevider.com";

/**
 * Enforce a single canonical origin for SEO:
 * - apex (codevider.com) → www.codevider.com
 * - http → https
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

	const redirectTarget = redirectCareerApplyPath(url);
	if (redirectTarget) {
		return Response.redirect(redirectTarget.toString(), 301);
	}

	return context.next();
}

function redirectCareerApplyPath(url) {
	const match = url.pathname.match(/^(\/career\/apply)\/(\d+)\/?$/);
	if (!match) return null;
	const target = new URL(url);
	target.pathname = match[1];
	target.searchParams.set("id", match[2]);
	return target;
}
