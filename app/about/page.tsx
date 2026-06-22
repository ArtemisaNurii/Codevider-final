import type { Metadata } from "next";
import { LocaleRedirect } from "@/components/locale-redirect";
import { createRedirectPageMetadata } from "@/lib/site";

export const metadata: Metadata = createRedirectPageMetadata("about");

export default function AboutRedirectPage() {
	return <LocaleRedirect path="about" />;
}
