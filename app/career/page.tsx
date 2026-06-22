import type { Metadata } from "next";
import { LocaleRedirect } from "@/components/locale-redirect";
import { createRedirectPageMetadata } from "@/lib/site";

export const metadata: Metadata = createRedirectPageMetadata("career");

export default function CareerRedirectPage() {
	return <LocaleRedirect path="career" />;
}
