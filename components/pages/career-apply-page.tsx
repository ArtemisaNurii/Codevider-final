import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { Suspense } from "react";
import CareerApply from "@/components/career/career-apply";
import { StructuredData } from "@/components/seo/structured-data";
import {
	createPageMetadata,
	getLocalePathPrefix,
	getOgImageUrl,
	getSiteUrl,
} from "@/lib/site";
import type { LocalePageProps } from "./home-page";

export async function generateCareerApplyMetadata({
	params,
}: LocalePageProps): Promise<Metadata> {
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

export async function CareerApplyPage({ params }: LocalePageProps) {
	const { locale } = await params;
	setRequestLocale(locale);
	const t = await getTranslations({ locale });

	return (
		<div className="home-page">
			<StructuredData
				title={t("metadata.career_apply.title")}
				description={t("metadata.career_apply.description")}
				image={getOgImageUrl(locale, "career")}
				url={`${getSiteUrl()}${getLocalePathPrefix(locale)}/career/apply`}
			/>
			<Suspense>
				<CareerApply />
			</Suspense>
		</div>
	);
}
