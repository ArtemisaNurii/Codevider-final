import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import AboutCulture from "@/components/about/about-culture";
import AboutHero from "@/components/about/about-hero";
import AboutJoinCta from "@/components/about/about-join-cta";
import AboutLifeGrid from "@/components/about/about-life-grid";
import AboutMeetTeam from "@/components/about/about-meet-team";
import AboutWhoWeAre from "@/components/about/about-who-we-are";
import { StructuredData } from "@/components/seo/structured-data";
import { routing } from "@/i18n/routing";
import { createPageMetadata, getOgImageUrl, getPageUrl } from "@/lib/site";

export async function generateMetadata(): Promise<Metadata> {
	const t = await getTranslations();

	return createPageMetadata({
		locale: routing.defaultLocale,
		title: t("metadata.about.title"),
		description: t("metadata.about.description"),
		page: "about",
	});
}

export default async function AboutPage() {
	const t = await getTranslations();

	return (
		<div className="home-page">
			<AboutHero />
			<AboutWhoWeAre />
			<AboutCulture />
			<AboutLifeGrid />
			<AboutMeetTeam />
			<AboutJoinCta />
			<StructuredData
				title={t("metadata.about.title")}
				description={t("metadata.about.description")}
				image={getOgImageUrl(routing.defaultLocale, "about")}
				url={getPageUrl("/about")}
			/>
		</div>
	);
}
