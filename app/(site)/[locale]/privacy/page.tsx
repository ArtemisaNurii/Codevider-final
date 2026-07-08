import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import LegalDocument from "@/components/legal/legal-document";
import LegalHero from "@/components/legal/legal-hero";
import { createPageMetadata, getOgImageUrl, getSiteUrl } from "@/lib/site";
import { StructuredData } from "@/components/seo/structured-data";

const PRIVACY_SECTIONS = [
	"collection",
	"legal_basis",
	"transfers",
	"retention",
	"rights",
	"contact",
] as const;

export async function generateMetadata({ params }: Props): Promise<Metadata> {
	const { locale } = await params;
	const t = await getTranslations({ locale });

	return createPageMetadata({
		locale,
		title: t("metadata.privacy.title"),
		description: t("metadata.privacy.description"),
		page: "privacy",
	});
}

type Props = {
	params: Promise<{ locale: string }>;
};

export default async function PrivacyPage({ params }: Props) {
	const { locale } = await params;
	setRequestLocale(locale);
	const t = await getTranslations({ locale });

	return (
		<div className="home-page">
			<StructuredData
				title={t("metadata.privacy.title")}
				description={t("metadata.privacy.description")}
				image={getOgImageUrl(locale, "privacy")}
				url={`${getSiteUrl()}/${locale}/privacy`}
			/>
			<LegalHero namespace="legal.privacy" />
			<LegalDocument namespace="legal.privacy" sections={PRIVACY_SECTIONS} />
		</div>
	);
}
