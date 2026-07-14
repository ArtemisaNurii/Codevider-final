import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import CareerHero from "@/components/career/career-hero";
import CareerHiringProcess from "@/components/career/career-hiring-process";
import CareerOpenings from "@/components/career/career-openings";
import CareerWhyJoin from "@/components/career/career-why-join";
import { StructuredData } from "@/components/seo/structured-data";
import { routing } from "@/i18n/routing";
import {
	createPageMetadata,
	getLocalizedUrl,
	getOgImageUrl,
} from "@/lib/site";
import type { LocalePageProps } from "./home-page";

export async function generateCareerMetadata({
	params,
}: LocalePageProps): Promise<Metadata> {
	const { locale } = await params;
	const t = await getTranslations({ locale });

	return createPageMetadata({
		locale,
		title: t("metadata.career.title"),
		description: t("metadata.career.description"),
		page: "career",
	});
}

export async function CareerPage({ params }: LocalePageProps) {
	const { locale } = await params;
	setRequestLocale(locale);
	const t = await getTranslations({ locale });

	return (
		<div className="home-page">
			<StructuredData
				title={t("metadata.career.title")}
				description={t("metadata.career.description")}
				image={getOgImageUrl(locale, "career")}
				url={getLocalizedUrl(
					locale as (typeof routing.locales)[number],
					"/career",
				)}
			/>
			<CareerHero />
			<CareerOpenings />
			<CareerWhyJoin />
			<CareerHiringProcess />
		</div>
	);
}
