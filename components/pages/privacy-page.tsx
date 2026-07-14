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

const PRIVACY_SECTIONS = [
	"collection",
	"legal_basis",
	"transfers",
	"retention",
	"rights",
	"contact",
] as const;

export async function generatePrivacyMetadata({
	params,
}: LocalePageProps): Promise<Metadata> {
	const { locale } = await params;
	const t = await getTranslations({ locale });

	return createPageMetadata({
		locale,
		title: t("metadata.privacy.title"),
		description: t("metadata.privacy.description"),
		page: "privacy",
	});
}

export async function PrivacyPage({ params }: LocalePageProps) {
	const { locale } = await params;
	setRequestLocale(locale);
	const t = await getTranslations({ locale });

	return (
		<div className="home-page">
			<StructuredData
				title={t("metadata.privacy.title")}
				description={t("metadata.privacy.description")}
				image={getOgImageUrl(locale, "privacy")}
				url={getLocalizedUrl(
					locale as (typeof routing.locales)[number],
					"/privacy",
				)}
			/>
			<LegalHero namespace="legal.privacy" />
			<LegalDocument namespace="legal.privacy" sections={PRIVACY_SECTIONS} />
		</div>
	);
}
