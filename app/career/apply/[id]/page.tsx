import type { Metadata } from "next";
import { LocaleRedirect } from "@/components/locale-redirect";
import { fetchOpenJobs } from "@/lib/api/recruit-jobs";
import { createRedirectPageMetadata } from "@/lib/site";

type Props = {
	params: Promise<{ id: string }>;
};

export const metadata: Metadata = createRedirectPageMetadata("career");

export async function generateStaticParams() {
	try {
		const response = await fetchOpenJobs({ page: 1, limit: 100 });
		return response.data.map((job) => ({ id: String(job.id) }));
	} catch {
		return [];
	}
}

export default async function CareerApplyRedirectPage({ params }: Props) {
	const { id } = await params;

	return <LocaleRedirect path={`career/apply/${id}`} />;
}
