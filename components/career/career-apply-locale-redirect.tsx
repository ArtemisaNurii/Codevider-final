"use client";

import { useSearchParams } from "next/navigation";
import { LocaleRedirect } from "@/components/locale-redirect";

export function CareerApplyLocaleRedirect() {
	const searchParams = useSearchParams();
	const id = searchParams.get("id");
	const jobId = id && /^\d+$/.test(id) ? id : null;

	if (!jobId) {
		return <LocaleRedirect path="career" />;
	}

	return <LocaleRedirect path={`career/apply?id=${jobId}`} />;
}
