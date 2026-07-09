import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import CareerHero from "@/components/career/career-hero";
import CareerHiringProcess from "@/components/career/career-hiring-process";
import CareerOpenings from "@/components/career/career-openings";
import CareerWhyJoin from "@/components/career/career-why-join";
import { StructuredData } from "@/components/seo/structured-data";
import { createPageMetadata, getOgImageUrl, getSiteUrl } from "@/lib/site";

export async function generateMetadata({ params }: Props): Promise<Metadata> {
	const { locale } = await params;
	const t = await getTranslations({ locale });

	return createPageMetadata({
		locale,
		title: t("metadata.career.title"),
		description: t("metadata.career.description"),
		page: "career",
	});
}

type Props = {
	params: Promise<{ locale: string }>;
};

export default async function CareerPage({ params }: Props) {
	const { locale } = await params;
	setRequestLocale(locale);
	const t = await getTranslations({ locale });

	return (
		<div className="home-page">
			<StructuredData
				title={t("metadata.career.title")}
				description={t("metadata.career.description")}
				image={getOgImageUrl(locale, "career")}
				url={`${getSiteUrl()}/${locale}/career`}
			/>
			<CareerHero />
			<CareerOpenings />
			<CareerWhyJoin />
			<CareerHiringProcess />
		</div>
	);
}
