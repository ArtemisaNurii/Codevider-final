import type { Metadata } from "next";
import { getCopy } from "@/lib/copy";
import LegalDocument from "@/components/legal/legal-document";
import LegalHero from "@/components/legal/legal-hero";
import { StructuredData } from "@/components/seo/structured-data";
import { createPageMetadata, getOgImageUrl, getPageUrl } from "@/lib/site";

const PRIVACY_SECTIONS = [
	"collection",
	"legal_basis",
	"transfers",
	"retention",
	"rights",
	"contact",
] as const;

export async function generateMetadata(): Promise<Metadata> {
	const t = getCopy();

	return createPageMetadata({
		title: t("metadata.privacy.title"),
		description: t("metadata.privacy.description"),
		page: "privacy",
	});
}

export default async function PrivacyPage() {
	const t = getCopy();

	return (
		<div className="home-page">
			<StructuredData
				title={t("metadata.privacy.title")}
				description={t("metadata.privacy.description")}
				image={getOgImageUrl("privacy")}
				url={getPageUrl("/privacy")}
			/>
			<LegalHero namespace="legal.privacy" />
			<LegalDocument namespace="legal.privacy" sections={PRIVACY_SECTIONS} />
		</div>
	);
}
