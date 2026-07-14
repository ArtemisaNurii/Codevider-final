// CloudFront Function (event type: "viewer request").
//
// Single-language site (English) at www.codevider.com. Handles:
//
//   1. apex -> www canonical redirect (codevider.com -> www.codevider.com, 301)
//   2. legacy locale prefixes (/en, /de, …) -> unprefixed paths (301)
//   3. career apply job IDs: /career/apply/123 -> /career/apply?id=123 (301)
//   4. extensionless URL rewrite to Next static-export .html files
//
// Next.js static export (trailingSlash: false) writes:
//   /           -> index.html
//   /about      -> about.html
//   /career/apply -> career/apply.html
//
// NOTE: Set Viewer Protocol Policy to "Redirect HTTP to HTTPS".
// Remove any custom error response mapping 403/404 -> /index.html (200);
// point 404 to /404.html with a 404 status.

var CANONICAL_HOST = "www.codevider.com";
var APEX_HOST = "codevider.com";
var LEGACY_LOCALES = {
	en: true,
	de: true,
	fr: true,
	es: true,
	it: true,
	zh: true,
	sq: true,
};

// eslint-disable-next-line @typescript-eslint/no-unused-vars -- CloudFront runtime entry point
function handler(event) {
	var request = event.request;
	var uri = request.uri;
	var query = stringifyQuery(request.querystring);

	// 1. Canonical host: apex -> www
	var host = request.headers.host ? request.headers.host.value : "";
	if (host === APEX_HOST) {
		return redirect("https://" + CANONICAL_HOST + uri + query);
	}

	// 2. Strip legacy locale prefixes: /en -> /, /de/about -> /about
	var stripped = stripLegacyLocalePrefix(uri);
	if (stripped !== null) {
		return redirect("https://" + CANONICAL_HOST + stripped + query);
	}

	// 3. Career apply job IDs -> ?id=
	var applyRedirect = getCareerApplyRedirect(uri, request.querystring);
	if (applyRedirect) {
		return redirect("https://" + CANONICAL_HOST + applyRedirect);
	}

	// 4. Rewrite extensionless paths to .html objects
	request.uri = toHtmlObjectKey(uri);
	return request;
}

function stripLegacyLocalePrefix(pathname) {
	var normalized =
		pathname.length > 1 && pathname.endsWith("/")
			? pathname.slice(0, -1)
			: pathname;

	var segments = normalized.split("/");
	// ["", "en"] or ["", "de", "about"]
	if (segments.length < 2 || !LEGACY_LOCALES[segments[1]]) {
		return null;
	}

	var rest = segments.slice(2).join("/");
	return rest ? "/" + rest : "/";
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

function getCareerApplyRedirect(pathname, querystring) {
	var match = pathname.match(/^(\/career\/apply)\/(\d+)\/?$/);
	if (!match) {
		return null;
	}

	querystring.id = { value: match[2] };
	return match[1] + stringifyQuery(querystring);
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
