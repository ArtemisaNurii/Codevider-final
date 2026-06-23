import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getTranslations, setRequestLocale } from "next-intl/server";
import CareerApply from "@/components/career/career-apply";
import { routing } from "@/i18n/routing";
import { fetchJobById, fetchOpenJobs } from "@/lib/api/recruit-jobs";
import { createPageMetadata } from "@/lib/site";
import { parseJobMetaDetails } from "@/lib/types/recruit";

type Props = {
	params: Promise<{ locale: string; id: string }>;
};

export async function generateStaticParams() {
	try {
		const response = await fetchOpenJobs({ page: 1, limit: 100 });

		return routing.locales.flatMap((locale) =>
			response.data.map((job) => ({
				locale,
				id: String(job.id),
			})),
		);
	} catch {
		return [];
	}
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
	const { locale, id } = await params;
	const t = await getTranslations({ locale });
	const jobId = Number(id);

	let title = t("metadata.career_apply.title");
	let description = t("metadata.career_apply.description");

	if (Number.isFinite(jobId) && jobId > 0) {
		try {
			const job = await fetchJobById(jobId);
			const meta = parseJobMetaDetails(job.meta_details);
			const roleTitle = meta.title ?? job.title;

			title = t("metadata.career_apply.title_with_role", { title: roleTitle });
			description =
				meta.description?.trim() || job.job_description?.trim() || description;
		} catch {
			// Keep generic fallbacks when the job cannot be loaded at build time.
		}
	}

	return createPageMetadata({
		locale,
		title,
		description,
		page: "career",
		path: `/career/apply/${id}`,
	});
}

export default async function CareerApplyPage({ params }: Props) {
	const { locale, id } = await params;
	const jobId = Number(id);

	if (!Number.isFinite(jobId) || jobId <= 0) {
		notFound();
	}

	setRequestLocale(locale);

	return (
		<div className="home-page">
			<CareerApply jobId={jobId} />
		</div>
	);
}
