import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import CareerHero from "@/components/career/career-hero";
import CareerHiringProcess from "@/components/career/career-hiring-process";
import CareerOpenings from "@/components/career/career-openings";
import CareerWhyJoin from "@/components/career/career-why-join";
import { StructuredData } from "@/components/seo/structured-data";
import { routing } from "@/i18n/routing";
import { createPageMetadata, getOgImageUrl, getPageUrl } from "@/lib/site";

export async function generateMetadata(): Promise<Metadata> {
	const t = await getTranslations();

	return createPageMetadata({
		locale: routing.defaultLocale,
		title: t("metadata.career.title"),
		description: t("metadata.career.description"),
		page: "career",
	});
}

export default async function CareerPage() {
	const t = await getTranslations();

	return (
		<div className="home-page">
			<StructuredData
				title={t("metadata.career.title")}
				description={t("metadata.career.description")}
				image={getOgImageUrl(routing.defaultLocale, "career")}
				url={getPageUrl("/career")}
			/>
			<CareerHero />
			<CareerOpenings />
			<CareerWhyJoin />
			<CareerHiringProcess />
		</div>
	);
}
