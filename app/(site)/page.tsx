import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
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
import { StructuredData } from "@/components/seo/structured-data";
import { routing } from "@/i18n/routing";
import { createPageMetadata, getOgImageUrl, getPageUrl } from "@/lib/site";

export async function generateMetadata(): Promise<Metadata> {
	const t = await getTranslations();

	return createPageMetadata({
		locale: routing.defaultLocale,
		title: t("metadata.home.title"),
		description: t("metadata.home.description"),
		page: "home",
	});
}

export default async function Home() {
	const t = await getTranslations();

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
			<StructuredData
				title={t("metadata.home.title")}
				description={t("metadata.home.description")}
				image={getOgImageUrl(routing.defaultLocale, "home")}
				url={getPageUrl("")}
			/>
		</div>
	);
}
