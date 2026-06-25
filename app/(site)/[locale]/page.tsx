import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import Hero from "@/components/index/hero";
import {
	Contact,
	CoreServices,
	Faq,
	GlobalPartnerships,
	WhoWeAre,
	WhoWeEmpower,
	WhyChooseUs,
	WhyOutsource,
} from "@/components/index/home-below-fold";
import { createPageMetadata } from "@/lib/site";

type Props = {
	params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
	const { locale } = await params;
	const t = await getTranslations({ locale });

	return createPageMetadata({
		locale,
		title: t("metadata.home.title"),
		description: t("metadata.home.description"),
		page: "home",
	});
}

export default async function Home({ params }: Props) {
	const { locale } = await params;
	setRequestLocale(locale);

	return (
		<div className="home-page">
			<Hero />
			<WhoWeAre />
			<CoreServices />
			<WhoWeEmpower />
			<WhyOutsource />
			<GlobalPartnerships />
			<WhyChooseUs />
			<Faq />
			<Contact />
		</div>
	);
}
