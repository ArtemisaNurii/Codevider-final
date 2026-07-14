import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import AboutCulture from "@/components/about/about-culture";
import AboutHero from "@/components/about/about-hero";
import AboutJoinCta from "@/components/about/about-join-cta";
import AboutLifeGrid from "@/components/about/about-life-grid";
import AboutMeetTeam from "@/components/about/about-meet-team";
import AboutWhoWeAre from "@/components/about/about-who-we-are";
import { StructuredData } from "@/components/seo/structured-data";
import { routing } from "@/i18n/routing";
import {
	createPageMetadata,
	getLocalizedUrl,
	getOgImageUrl,
} from "@/lib/site";
import type { LocalePageProps } from "./home-page";

export async function generateAboutMetadata({
	params,
}: LocalePageProps): Promise<Metadata> {
	const { locale } = await params;
	const t = await getTranslations({ locale });

	return createPageMetadata({
		locale,
		title: t("metadata.about.title"),
		description: t("metadata.about.description"),
		page: "about",
	});
}

export async function AboutPage({ params }: LocalePageProps) {
	const { locale } = await params;
	setRequestLocale(locale);
	const t = await getTranslations({ locale });

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
				image={getOgImageUrl(locale, "about")}
				url={getLocalizedUrl(
					locale as (typeof routing.locales)[number],
					"/about",
				)}
			/>
		</div>
	);
}
