import type { Metadata } from "next";
import { Suspense } from "react";
import { getTranslations, setRequestLocale } from "next-intl/server";
import CareerApply from "@/components/career/career-apply";
import { routing } from "@/i18n/routing";
import { createPageMetadata, getOgImageUrl, getSiteUrl } from "@/lib/site";
import { StructuredData } from "@/components/seo/structured-data";

type Props = {
	params: Promise<{ locale: string }>;
};

export function generateStaticParams() {
	return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
	const { locale } = await params;
	const t = await getTranslations({ locale });

	return createPageMetadata({
		locale,
		title: t("metadata.career_apply.title"),
		description: t("metadata.career_apply.description"),
		page: "career",
		path: "/career/apply",
	});
}

export default async function CareerApplyPage({ params }: Props) {
	const { locale } = await params;
	setRequestLocale(locale);
	const t = await getTranslations({ locale });

	return (
		<div className="home-page">
			<StructuredData
				title={t("metadata.career_apply.title")}
				description={t("metadata.career_apply.description")}
				image={getOgImageUrl(locale, "career")}
				url={`${getSiteUrl()}/${locale}/career/apply`}
			/>
			<Suspense>
				<CareerApply />
			</Suspense>
		</div>
	);
}
