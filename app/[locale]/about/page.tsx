import type { Metadata } from "next";
import { setRequestLocale } from "next-intl/server";
import AboutCulture from "@/components/about/about-culture";
import AboutHero from "@/components/about/about-hero";
import AboutJoinCta from "@/components/about/about-join-cta";
import AboutLifeGrid from "@/components/about/about-life-grid";
import AboutMeetTeam from "@/components/about/about-meet-team";
import AboutWhoWeAre from "@/components/about/about-who-we-are";

export const metadata: Metadata = {
	title: "About — Codevider",
	description:
		"Founded in 2019 in Tirana, Albania, Codevider crafts software that means business — strategy, design, and engineering in harmony.",
};

type Props = {
	params: Promise<{ locale: string }>;
};

export default async function AboutPage({ params }: Props) {
	const { locale } = await params;
	setRequestLocale(locale);

	return (
		<div className="home-page">
			<AboutHero />
			<AboutWhoWeAre />
			<AboutCulture />
			<AboutLifeGrid />
			<AboutMeetTeam />
			<AboutJoinCta />
		</div>
	);
}
