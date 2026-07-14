import type { Metadata } from "next";
import { routing } from "@/i18n/routing";

/** Production fallback when NEXT_PUBLIC_SITE_URL is not set at build time. */
export const SITE_URL = "https://www.codevider.com";

/**
 * Canonical origin for metadata, sitemap, and OG image URLs.
 * Set NEXT_PUBLIC_SITE_URL when building for staging or test domains, e.g.
 * NEXT_PUBLIC_SITE_URL=https://staging.example.com npm run build
 */
export function getSiteUrl(): string {
	if (process.env.NEXT_PUBLIC_SITE_URL) {
		return process.env.NEXT_PUBLIC_SITE_URL.replace(/\/$/, "");
	}

	if (process.env.NODE_ENV === "development") {
		return `http://localhost:${process.env.PORT ?? "3000"}`;
	}

	return SITE_URL;
}

/** List of all site routes. */
export const SITE_ROUTES = [
	"",
	"/about",
	"/services",
	"/career",
	"/privacy",
	"/terms",
] as const;

/** List of pages that have custom Open Graph images. */
export const OG_PAGES = [
	"home",
	"about",
	"services",
	"career",
	"privacy",
	"terms",
] as const;

/** Type representing a page that has a custom Open Graph image. */
export type OgPage = (typeof OG_PAGES)[number];

/** Maps internal locale codes to BCP47 Open Graph locale strings. */
const LOCALE_TO_OG_BCP47: Record<(typeof routing.locales)[number], string> = {
	en: "en_US",
	de: "de_DE",
	fr: "fr_FR",
	es: "es_ES",
	it: "it_IT",
	sq: "sq_AL",
	zh: "zh_CN",
};

/**
 * Converts an internal locale code to an Open Graph BCP47 locale string.
 */
function getOpenGraphLocale(locale: string): string {
	return (
		LOCALE_TO_OG_BCP47[locale as (typeof routing.locales)[number]] ?? locale
	);
}

/** Maps internal locale codes to English language names for OG image paths. */
const LOCALE_TO_OG_LANGUAGE: Record<(typeof routing.locales)[number], string> =
	{
		en: "english",
		de: "german",
		fr: "french",
		es: "spanish",
		it: "italian",
		sq: "albanian",
		zh: "chinese",
	};

/** Maps OG page keys to their corresponding site routes. */
const OG_PAGE_TO_ROUTE: Record<OgPage, (typeof SITE_ROUTES)[number]> = {
	home: "",
	about: "/about",
	services: "/services",
	career: "/career",
	privacy: "/privacy",
	terms: "/terms",
};

/**
 * Builds a fully qualified URL for a site path (no locale prefix).
 */
export function getPageUrl(
	path: (typeof SITE_ROUTES)[number] | string,
): string {
	const base = getSiteUrl();
	if (path === "" || path === "/") {
		return base;
	}
	return `${base}${path.startsWith("/") ? path : `/${path}`}`;
}

/**
 * Gets the path to the Open Graph image for a locale and page.
 */
export function getOgImagePath(locale: string, page: OgPage): string {
	const language =
		LOCALE_TO_OG_LANGUAGE[locale as (typeof routing.locales)[number]] ??
		"english";

	return `/images/og/${language}/${page}/og.png`;
}

/**
 * Gets the full URL to the Open Graph image for a locale and page.
 */
export function getOgImageUrl(locale: string, page: OgPage): string {
	return `${getSiteUrl()}${getOgImagePath(locale, page)}`;
}

/** Input options for creating page metadata. */
type PageMetadataInput = {
	locale?: string;
	title: string;
	description: string;
	page: OgPage;
	path?: string;
};

/**
 * Creates Next.js Metadata for a page (locale lives in localStorage, not the URL).
 */
export function createPageMetadata({
	locale = routing.defaultLocale,
	title,
	description,
	page,
	path: pathOverride,
}: PageMetadataInput): Metadata {
	const siteRoute = OG_PAGE_TO_ROUTE[page];
	const canonical = pathOverride
		? getPageUrl(pathOverride)
		: getPageUrl(siteRoute);
	const ogImageUrl = getOgImageUrl(locale, page);

	return {
		title,
		description,
		alternates: {
			canonical,
		},
		openGraph: {
			title,
			description,
			url: canonical,
			siteName: "Codevider",
			locale: getOpenGraphLocale(locale),
			type: "website",
			images: [
				{
					url: ogImageUrl,
					width: 1200,
					height: 630,
					alt: title,
					type: "image/png",
				},
			],
		},
		twitter: {
			card: "summary_large_image",
			title,
			description,
			images: [ogImageUrl],
		},
	};
}
