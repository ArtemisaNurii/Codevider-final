import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { Suspense } from "react";
import CareerApply from "@/components/career/career-apply";
import { StructuredData } from "@/components/seo/structured-data";
import { routing } from "@/i18n/routing";
import { createPageMetadata, getOgImageUrl, getPageUrl } from "@/lib/site";

export async function generateMetadata(): Promise<Metadata> {
	const t = await getTranslations();

	return createPageMetadata({
		locale: routing.defaultLocale,
		title: t("metadata.career_apply.title"),
		description: t("metadata.career_apply.description"),
		page: "career",
		path: "/career/apply",
	});
}

export default async function CareerApplyPage() {
	const t = await getTranslations();

	return (
		<div className="home-page">
			<StructuredData
				title={t("metadata.career_apply.title")}
				description={t("metadata.career_apply.description")}
				image={getOgImageUrl(routing.defaultLocale, "career")}
				url={getPageUrl("/career/apply")}
			/>
			<Suspense>
				<CareerApply />
			</Suspense>
		</div>
	);
}
