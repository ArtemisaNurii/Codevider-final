import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import LegalDocument from "@/components/legal/legal-document";
import LegalHero from "@/components/legal/legal-hero";
import { createPageMetadata, getOgImageUrl, getSiteUrl } from "@/lib/site";
import { StructuredData } from "@/components/seo/structured-data";

const TERMS_SECTIONS = [
	"scope",
	"ip",
	"acceptable_use",
	"liability",
	"governing_law",
	"contact",
] as const;

export async function generateMetadata({ params }: Props): Promise<Metadata> {
	const { locale } = await params;
	const t = await getTranslations({ locale });

	return createPageMetadata({
		locale,
		title: t("metadata.terms.title"),
		description: t("metadata.terms.description"),
		page: "terms",
	});
}

type Props = {
	params: Promise<{ locale: string }>;
};

export default async function TermsPage({ params }: Props) {
	const { locale } = await params;
	setRequestLocale(locale);
	const t = await getTranslations({ locale });

	return (
		<div className="home-page">
			<StructuredData
				title={t("metadata.terms.title")}
				description={t("metadata.terms.description")}
				image={getOgImageUrl(locale, "terms")}
				url={`${getSiteUrl()}/${locale}/terms`}
			/>
			<LegalHero namespace="legal.terms" />
			<LegalDocument namespace="legal.terms" sections={TERMS_SECTIONS} />
		</div>
	);
}
