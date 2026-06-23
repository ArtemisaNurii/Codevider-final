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

export const SITE_ROUTES = ["", "/about", "/services", "/career"] as const;

export const OG_PAGES = ["home", "about", "services", "career"] as const;

export type OgPage = (typeof OG_PAGES)[number];

const LOCALE_TO_OG_LANGUAGE: Record<(typeof routing.locales)[number], string> =
	{
		en: "english",
		de: "german",
		fr: "french",
		es: "spanish",
		it: "italian",
		sq: "albanian",
	};

const OG_PAGE_TO_ROUTE: Record<OgPage, (typeof SITE_ROUTES)[number]> = {
	home: "",
	about: "/about",
	services: "/services",
	career: "/career",
};

export function getLocalizedUrl(
	locale: (typeof routing.locales)[number],
	path: (typeof SITE_ROUTES)[number],
): string {
	const base = getSiteUrl();
	return path === "" ? `${base}/${locale}` : `${base}/${locale}${path}`;
}

export function getLanguageAlternates(
	path: (typeof SITE_ROUTES)[number],
): Record<string, string> {
	const languages = Object.fromEntries(
		routing.locales.map((locale) => [locale, getLocalizedUrl(locale, path)]),
	);

	languages["x-default"] = getLocalizedUrl(routing.defaultLocale, path);

	return languages;
}

export function getOgImagePath(locale: string, page: OgPage): string {
	const language =
		LOCALE_TO_OG_LANGUAGE[locale as (typeof routing.locales)[number]] ??
		"english";

	return `/images/og/${language}/${page}/og.png`;
}

export function getOgImageUrl(locale: string, page: OgPage): string {
	return `${getSiteUrl()}${getOgImagePath(locale, page)}`;
}

type PageMetadataInput = {
	locale: string;
	title: string;
	description: string;
	page: OgPage;
	path?: string;
};

export function createPageMetadata({
	locale,
	title,
	description,
	page,
	path: pathOverride,
}: PageMetadataInput): Metadata {
	const siteRoute = OG_PAGE_TO_ROUTE[page];
	const canonical = pathOverride
		? `${getSiteUrl()}/${locale}${pathOverride}`
		: getLocalizedUrl(locale as (typeof routing.locales)[number], siteRoute);
	const ogImageUrl = getOgImageUrl(locale, page);
	const languageAlternates = pathOverride
		? Object.fromEntries(
				routing.locales.map((entry) => [
					entry,
					`${getSiteUrl()}/${entry}${pathOverride}`,
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
			`${getSiteUrl()}/${routing.defaultLocale}${pathOverride}`;
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
			locale,
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

export function createRedirectPageMetadata(page: OgPage): Metadata {
	const meta = en.metadata[page];

	return createPageMetadata({
		locale: routing.defaultLocale,
		title: meta.title,
		description: meta.description,
		page,
	});
}
