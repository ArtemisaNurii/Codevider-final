import type { MetadataRoute } from "next";
import { routing } from "@/i18n/routing";
import {
	getLanguageAlternates,
	getLocalizedUrl,
	SITE_ROUTES,
} from "@/lib/site";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
	return routing.locales.flatMap((locale) =>
		SITE_ROUTES.map((path) => ({
			url: getLocalizedUrl(locale, path),
			lastModified: new Date(),
			changeFrequency: path === "" ? "weekly" : "monthly",
			priority: path === "" ? 1 : 0.8,
			alternates: {
				languages: getLanguageAlternates(path),
			},
		})),
	);
}
