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
import { StructuredData } from "@/components/seo/structured-data";
import { routing } from "@/i18n/routing";
import {
	createPageMetadata,
	getLocalizedUrl,
	getOgImageUrl,
} from "@/lib/site";

export type LocalePageProps = {
	params: Promise<{ locale: string }>;
};

export async function generateHomeMetadata({
	params,
}: LocalePageProps): Promise<Metadata> {
	const { locale } = await params;
	const t = await getTranslations({ locale });

	return createPageMetadata({
		locale,
		title: t("metadata.home.title"),
		description: t("metadata.home.description"),
		page: "home",
	});
}

export async function HomePage({ params }: LocalePageProps) {
	const { locale } = await params;
	setRequestLocale(locale);
	const t = await getTranslations({ locale });

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
				image={getOgImageUrl(locale, "home")}
				url={getLocalizedUrl(locale as (typeof routing.locales)[number], "")}
			/>
		</div>
	);
}
