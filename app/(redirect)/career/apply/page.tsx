import type { Metadata } from "next";
import { Suspense } from "react";
import { CareerApplyLocaleRedirect } from "@/components/career/career-apply-locale-redirect";
import { createRedirectPageMetadata } from "@/lib/site";

export const metadata: Metadata = createRedirectPageMetadata("career");

export default function CareerApplyRedirectPage() {
	return (
		<Suspense>
			<CareerApplyLocaleRedirect />
		</Suspense>
	);
}
