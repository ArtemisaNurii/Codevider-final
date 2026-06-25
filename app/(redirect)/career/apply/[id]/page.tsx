import type { Metadata } from "next";
import { CareerApplyLocaleRedirect } from "@/components/career/career-apply-locale-redirect";
import { getCareerApplyJobIds } from "@/lib/career-apply";
import { createRedirectPageMetadata } from "@/lib/site";

export const metadata: Metadata = createRedirectPageMetadata("career");

export const dynamicParams = false;

export async function generateStaticParams() {
	const jobIds = await getCareerApplyJobIds();
	return jobIds.map((id) => ({ id }));
}

export default function CareerApplyRedirectPage() {
	return <CareerApplyLocaleRedirect />;
}
