import type { Metadata } from "next";
import en from "@/dictionaries/en.json";
import { routing } from "@/i18n/routing";

export const SITE_URL = "https://codevider.com";

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

type PageMetadataInput = {
	locale: string;
	title: string;
	description: string;
	page: OgPage;
};

export function createPageMetadata({
	locale,
	title,
	description,
	page,
}: PageMetadataInput): Metadata {
	const path = OG_PAGE_TO_ROUTE[page];
	const canonical = getLocalizedUrl(
		locale as (typeof routing.locales)[number],
		path,
	);
	const ogImage = getOgImagePath(locale, page);

	return {
		title,
		description,
		alternates: {
			canonical,
			languages: getLanguageAlternates(path),
		},
		openGraph: {
			title,
			description,
			url: canonical,
			siteName: "Codevider",
			locale,
			type: "website",
			images: [{ url: ogImage, width: 1200, height: 630, alt: title }],
		},
		twitter: {
			card: "summary_large_image",
			title,
			description,
			images: [ogImage],
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
