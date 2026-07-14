import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import LegalDocument from "@/components/legal/legal-document";
import LegalHero from "@/components/legal/legal-hero";
import { StructuredData } from "@/components/seo/structured-data";
import { routing } from "@/i18n/routing";
import {
	createPageMetadata,
	getLocalizedUrl,
	getOgImageUrl,
} from "@/lib/site";
import type { LocalePageProps } from "./home-page";

const TERMS_SECTIONS = [
	"scope",
	"ip",
	"acceptable_use",
	"liability",
	"governing_law",
	"contact",
] as const;

export async function generateTermsMetadata({
	params,
}: LocalePageProps): Promise<Metadata> {
	const { locale } = await params;
	const t = await getTranslations({ locale });

	return createPageMetadata({
		locale,
		title: t("metadata.terms.title"),
		description: t("metadata.terms.description"),
		page: "terms",
	});
}

export async function TermsPage({ params }: LocalePageProps) {
	const { locale } = await params;
	setRequestLocale(locale);
	const t = await getTranslations({ locale });

	return (
		<div className="home-page">
			<StructuredData
				title={t("metadata.terms.title")}
				description={t("metadata.terms.description")}
				image={getOgImageUrl(locale, "terms")}
				url={getLocalizedUrl(
					locale as (typeof routing.locales)[number],
					"/terms",
				)}
			/>
			<LegalHero namespace="legal.terms" />
			<LegalDocument namespace="legal.terms" sections={TERMS_SECTIONS} />
		</div>
	);
}
