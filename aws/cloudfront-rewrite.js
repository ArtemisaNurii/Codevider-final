// CloudFront Function (event type: "viewer request").
//
// English (default locale) is unprefixed: `/`, `/about`, …
// Other locales keep a prefix: `/de`, `/de/about`, …
// `/en` and `/en/...` permanently redirect to the unprefixed English URLs.
//
// Next.js static export (trailingSlash: false) writes:
//   /           -> index.html
//   /about      -> about.html
//   /en         -> en.html
//   /de/about   -> de/about.html
//
// Extensionless paths are rewritten to the matching `.html` object key.

var CANONICAL_HOST = "www.codevider.com";
var APEX_HOST = "codevider.com";
var DEFAULT_LOCALE = "en";

// eslint-disable-next-line @typescript-eslint/no-unused-vars -- CloudFront runtime entry point
function handler(event) {
	var request = event.request;
	var uri = request.uri;
	var query = stringifyQuery(request.querystring);

	// 1. Canonical host: apex -> www (preserves path + query).
	var host = request.headers.host ? request.headers.host.value : "";
	if (host === APEX_HOST) {
		return redirect("https://" + CANONICAL_HOST + uri + query);
	}

	// 2. Strip default-locale prefix: /en -> /, /en/about -> /about
	var stripped = stripDefaultLocalePrefix(uri);
	if (stripped !== null) {
		return redirect("https://" + CANONICAL_HOST + stripped + query);
	}

	// 3. Career apply job IDs -> ?id=
	var applyRedirect = getCareerApplyRedirect(uri, request.querystring);
	if (applyRedirect) {
		return redirect("https://" + CANONICAL_HOST + applyRedirect);
	}

	// 4. Rewrite extensionless paths to .html objects.
	request.uri = toHtmlObjectKey(uri);
	return request;
}

function stripDefaultLocalePrefix(pathname) {
	var normalized =
		pathname.length > 1 && pathname.endsWith("/")
			? pathname.slice(0, -1)
			: pathname;

	if (normalized === "/" + DEFAULT_LOCALE) {
		return "/";
	}

	var prefix = "/" + DEFAULT_LOCALE + "/";
	if (normalized.indexOf(prefix) === 0) {
		return normalized.slice(DEFAULT_LOCALE.length + 1);
	}

	return null;
}

function toHtmlObjectKey(uri) {
	if (uri === "/") {
		return "/index.html";
	}

	if (uri.length > 1 && uri.endsWith("/")) {
		uri = uri.slice(0, -1);
	}

	var lastSegment = uri.slice(uri.lastIndexOf("/") + 1);
	if (lastSegment.indexOf(".") !== -1) {
		return uri;
	}

	return uri + ".html";
}

// /<locale>/career/apply/<digits> or /career/apply/<digits> -> .../apply?id=<digits>
function getCareerApplyRedirect(pathname, querystring) {
	var match = pathname.match(/^((?:\/[a-z]{2})?\/career\/apply)\/(\d+)\/?$/);
	if (!match) {
		return null;
	}

	var basePath = match[1];
	// Unprefix English: /en/career/apply/123 -> /career/apply?id=123
	if (basePath.indexOf("/" + DEFAULT_LOCALE + "/") === 0) {
		basePath = basePath.slice(DEFAULT_LOCALE.length + 1);
	}

	querystring.id = { value: match[2] };
	return basePath + stringifyQuery(querystring);
}

function redirect(location) {
	return {
		statusCode: 301,
		statusDescription: "Moved Permanently",
		headers: { location: { value: location } },
	};
}

function stringifyQuery(querystring) {
	var pairs = [];
	for (var key in querystring) {
		var entry = querystring[key];
		if (entry.multiValue) {
			for (var i = 0; i < entry.multiValue.length; i++) {
				pairs.push(encodePair(key, entry.multiValue[i].value));
			}
		} else {
			pairs.push(encodePair(key, entry.value));
		}
	}
	return pairs.length ? "?" + pairs.join("&") : "";
}

function encodePair(key, value) {
	return value === "" ? key : key + "=" + value;
}
