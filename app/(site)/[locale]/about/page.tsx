import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import AboutCulture from "@/components/about/about-culture";
import AboutHero from "@/components/about/about-hero";
import AboutJoinCta from "@/components/about/about-join-cta";
import AboutLifeGrid from "@/components/about/about-life-grid";
import AboutMeetTeam from "@/components/about/about-meet-team";
import AboutWhoWeAre from "@/components/about/about-who-we-are";
import { createPageMetadata, getOgImageUrl, getSiteUrl } from "@/lib/site";
import { StructuredData } from "@/components/seo/structured-data";

export async function generateMetadata({ params }: Props): Promise<Metadata> {
	const { locale } = await params;
	const t = await getTranslations({ locale });

	return createPageMetadata({
		locale,
		title: t("metadata.about.title"),
		description: t("metadata.about.description"),
		page: "about",
	});
}

type Props = {
	params: Promise<{ locale: string }>;
};

export default async function AboutPage({ params }: Props) {
	const { locale } = await params;
	setRequestLocale(locale);
	const t = await getTranslations({ locale });

	return (
		<div className="home-page">
			<StructuredData
				title={t("metadata.about.title")}
				description={t("metadata.about.description")}
				image={getOgImageUrl(locale, "about")}
				url={`${getSiteUrl()}/${locale}/about`}
			/>
			<AboutHero />
			<AboutWhoWeAre />
			<AboutCulture />
			<AboutLifeGrid />
			<AboutMeetTeam />
			<AboutJoinCta />
		</div>
	);
}
