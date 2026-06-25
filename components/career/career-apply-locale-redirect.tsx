"use client";

import { usePathname } from "next/navigation";
import { LocaleRedirect } from "@/components/locale-redirect";
import { parseCareerApplyJobId } from "@/lib/career-apply";

export function CareerApplyLocaleRedirect() {
	const pathname = usePathname();
	const jobId = parseCareerApplyJobId(pathname);

	if (!jobId) {
		return <LocaleRedirect path="career" />;
	}

	return <LocaleRedirect path={`career/apply/${jobId}`} />;
}
