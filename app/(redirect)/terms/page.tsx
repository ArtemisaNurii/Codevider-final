import type { Metadata } from "next";
import { LocaleRedirect } from "@/components/locale-redirect";
import en from "@/dictionaries/en.json";
import { routing } from "@/i18n/routing";
import { createPageMetadata } from "@/lib/site";

export const metadata: Metadata = createPageMetadata({
	locale: routing.defaultLocale,
	title: en.metadata.terms.title,
	description: en.metadata.terms.description,
	page: "terms",
});

export default function TermsRedirectPage() {
	return <LocaleRedirect path="terms" />;
}
