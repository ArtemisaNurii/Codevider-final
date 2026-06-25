import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import LegalDocument from "@/components/legal/legal-document";
import LegalHero from "@/components/legal/legal-hero";
import { createPageMetadata } from "@/lib/site";

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
		page: "about",
		path: "/terms",
	});
}

type Props = {
	params: Promise<{ locale: string }>;
};

export default async function TermsPage({ params }: Props) {
	const { locale } = await params;
	setRequestLocale(locale);

	return (
		<div className="home-page">
			<LegalHero namespace="legal.terms" />
			<LegalDocument namespace="legal.terms" sections={TERMS_SECTIONS} />
		</div>
	);
}
