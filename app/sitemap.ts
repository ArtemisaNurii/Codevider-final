import type { MetadataRoute } from "next";
import { routing } from "@/i18n/routing";
import { getOpenJobsForBuild } from "@/lib/career-apply";
import {
	getLanguageAlternates,
	getLocalizedUrl,
	getPathLanguageAlternates,
	getSiteUrl,
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

	const jobs = await getOpenJobsForBuild();
	const careerApplyEntries = jobs.flatMap((job) => {
		const path = `/career/apply/${job.id}`;

		return routing.locales.map((locale) => ({
			url: `${getSiteUrl()}/${locale}${path}`,
			lastModified: new Date(),
			changeFrequency: "weekly" as const,
			priority: 0.7,
			alternates: {
				languages: getPathLanguageAlternates(path),
			},
		}));
	});

	return [...mainEntries, ...careerApplyEntries];
}
