import type { Metadata } from "next";
import en from "@/dictionaries/en.json";
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

/** List of all site routes available for localization. */
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
 *
 * @param locale - Internal locale code (e.g., "en", "de")
 * @returns Open Graph locale string (e.g., "en_US")
 */
function getOpenGraphLocale(locale: string): string {
	return (
		LOCALE_TO_OG_BCP47[locale as (typeof routing.locales)[number]] ?? locale
	);
}

/**
 * Gets list of alternate Open Graph locales for a given locale.
 *
 * @param locale - Current locale to exclude from alternates
 * @returns Array of alternate Open Graph locale strings
 */
function getOpenGraphAlternateLocales(
	locale: string,
): NonNullable<Metadata["openGraph"]>["alternateLocale"] {
	return routing.locales
		.filter((entry) => entry !== locale)
		.map((entry) => getOpenGraphLocale(entry));
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
 * Locale path prefix for URLs. Default locale (en) is unprefixed.
 *
 * @param locale - Locale to use
 * @returns `""` for default locale, otherwise `"/{locale}"`
 */
export function getLocalePathPrefix(
	locale: string,
): "" | `/${(typeof routing.locales)[number]}` {
	if (locale === routing.defaultLocale) {
		return "";
	}

	return `/${locale as (typeof routing.locales)[number]}`;
}

/**
 * Builds a fully qualified localized URL for a given locale and path.
 *
 * @param locale - Locale to use
 * @param path - Site route
 * @returns Full localized URL
 */
export function getLocalizedUrl(
	locale: (typeof routing.locales)[number],
	path: (typeof SITE_ROUTES)[number],
): string {
	const base = getSiteUrl();
	const prefix = getLocalePathPrefix(locale);

	if (path === "") {
		return prefix ? `${base}${prefix}` : base;
	}

	return `${base}${prefix}${path}`;
}

/**
 * Gets language alternates for a specific site route.
 *
 * @param path - Site route
 * @returns Record of locale to full URL
 */
export function getLanguageAlternates(
	path: (typeof SITE_ROUTES)[number],
): Record<string, string> {
	return getPathLanguageAlternates(path);
}

/**
 * Gets language alternates for any given path string.
 *
 * @param path - Path string
 * @returns Record of locale to full URL
 */
export function getPathLanguageAlternates(
	path: string,
): Record<string, string> {
	const languages = Object.fromEntries(
		routing.locales.map((locale) => {
			const prefix = getLocalePathPrefix(locale);
			return [
				locale,
				path === "" && !prefix
					? getSiteUrl()
					: `${getSiteUrl()}${prefix}${path}`,
			];
		}),
	);

	languages["x-default"] =
		path === ""
			? getSiteUrl()
			: `${getSiteUrl()}${getLocalePathPrefix(routing.defaultLocale)}${path}`;

	return languages;
}

/**
 * Gets the path to the Open Graph image for a locale and page.
 *
 * @param locale - Locale to use
 * @param page - Page key
 * @returns Path to OG image (e.g., /images/og/english/home/og.png)
 */
export function getOgImagePath(locale: string, page: OgPage): string {
	const language =
		LOCALE_TO_OG_LANGUAGE[locale as (typeof routing.locales)[number]] ??
		"english";

	return `/images/og/${language}/${page}/og.png`;
}

/**
 * Gets the full URL to the Open Graph image for a locale and page.
 *
 * @param locale - Locale to use
 * @param page - Page key
 * @returns Full URL to OG image
 */
export function getOgImageUrl(locale: string, page: OgPage): string {
	return `${getSiteUrl()}${getOgImagePath(locale, page)}`;
}

/** Input options for creating page metadata. */
type PageMetadataInput = {
	locale: string;
	title: string;
	description: string;
	page: OgPage;
	path?: string;
};

/**
 * Creates Next.js Metadata object for a localized page.
 *
 * @param options - Metadata options
 * @param options.locale - Page locale
 * @param options.title - Page title
 * @param options.description - Page description
 * @param options.page - OG page key
 * @param options.path - Optional path override
 * @returns Next.js Metadata object
 */
export function createPageMetadata({
	locale,
	title,
	description,
	page,
	path: pathOverride,
}: PageMetadataInput): Metadata {
	const siteRoute = OG_PAGE_TO_ROUTE[page];
	const prefix = getLocalePathPrefix(locale);
	const canonical = pathOverride
		? `${getSiteUrl()}${prefix}${pathOverride}`
		: getLocalizedUrl(locale as (typeof routing.locales)[number], siteRoute);
	const ogImageUrl = getOgImageUrl(locale, page);
	const languageAlternates = pathOverride
		? Object.fromEntries(
				routing.locales.map((entry) => [
					entry,
					`${getSiteUrl()}${getLocalePathPrefix(entry)}${pathOverride}`,
				]),
			)
		: getLanguageAlternates(siteRoute);

	if (!pathOverride) {
		languageAlternates["x-default"] = getLocalizedUrl(
			routing.defaultLocale,
			siteRoute,
		);
	} else {
		languageAlternates["x-default"] =
			`${getSiteUrl()}${getLocalePathPrefix(routing.defaultLocale)}${pathOverride}`;
	}

	return {
		title,
		description,
		alternates: {
			canonical,
			languages: languageAlternates,
		},
		openGraph: {
			title,
			description,
			url: canonical,
			siteName: "Codevider",
			locale: getOpenGraphLocale(locale),
			alternateLocale: getOpenGraphAlternateLocales(locale),
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

/**
 * Creates metadata for a redirect page using default locale translations.
 *
 * @param page - OG page key
 * @returns Next.js Metadata object
 */
export function createRedirectPageMetadata(page: OgPage): Metadata {
	const meta = en.metadata[page];

	return createPageMetadata({
		locale: routing.defaultLocale,
		title: meta.title,
		description: meta.description,
		page,
	});
}
