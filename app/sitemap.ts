import type { MetadataRoute } from "next";
import { routing } from "@/i18n/routing";
import {
	getLanguageAlternates,
	getLocalizedUrl,
	SITE_ROUTES,
} from "@/lib/site";

export const dynamic = "force-static";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
	const mainEntries = routing.locales.flatMap((locale) =>
		SITE_ROUTES.map((path) => ({
			url: getLocalizedUrl(locale, path),
			lastModified: new Date(),
			changeFrequency: path === "" ? ("weekly" as const) : ("monthly" as const),
			priority: path === "" ? 1 : 0.8,
			alternates: {
				languages: getLanguageAlternates(path),
			},
		})),
	);
	return mainEntries;
}
