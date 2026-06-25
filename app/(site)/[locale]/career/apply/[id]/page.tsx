import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import CareerApply from "@/components/career/career-apply";
import { JobPostingSchema } from "@/components/seo/job-posting-schema";
import { routing } from "@/i18n/routing";
import {
	CAREER_APPLY_PLACEHOLDER_ID,
	getCareerApplyJobIds,
} from "@/lib/career-apply";
import { fetchJobById } from "@/lib/api/recruit-jobs";
import { createPageMetadata } from "@/lib/site";

type Props = {
	params: Promise<{ locale: string; id: string }>;
};

export const dynamicParams = false;

export async function generateStaticParams() {
	const jobIds = await getCareerApplyJobIds();

	return routing.locales.flatMap((locale) =>
		jobIds.map((id) => ({ locale, id })),
	);
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
	const { locale, id } = await params;
	const t = await getTranslations({ locale });

	return createPageMetadata({
		locale,
		title: t("metadata.career_apply.title"),
		description: t("metadata.career_apply.description"),
		page: "career",
		path: `/career/apply/${id}`,
	});
}

export default async function CareerApplyPage({ params }: Props) {
	const { locale, id } = await params;
	setRequestLocale(locale);

	const job =
		id !== CAREER_APPLY_PLACEHOLDER_ID
			? await fetchJobById(Number(id)).catch(() => null)
			: null;

	return (
		<div className="home-page">
			{job ? <JobPostingSchema job={job} locale={locale} /> : null}
			<CareerApply />
		</div>
	);
}
