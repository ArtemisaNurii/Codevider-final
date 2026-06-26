import type { Metadata } from "next";
import { LocaleRedirect } from "@/components/locale-redirect";
import en from "@/dictionaries/en.json";
import { routing } from "@/i18n/routing";
import { createPageMetadata } from "@/lib/site";

export const metadata: Metadata = createPageMetadata({
	locale: routing.defaultLocale,
	title: en.metadata.privacy.title,
	description: en.metadata.privacy.description,
	page: "privacy",
});

export default function PrivacyRedirectPage() {
	return <LocaleRedirect path="privacy" />;
}
