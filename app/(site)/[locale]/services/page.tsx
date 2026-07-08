import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import ServicesCapabilities from "@/components/services/services-capabilities";
import ServicesHero from "@/components/services/services-hero";
import ServicesProcess from "@/components/services/services-process";
import ServicesTechStack from "@/components/services/services-tech-stack";
import { createPageMetadata, getOgImageUrl, getSiteUrl } from "@/lib/site";
import { StructuredData } from "@/components/seo/structured-data";

export async function generateMetadata({ params }: Props): Promise<Metadata> {
	const { locale } = await params;
	const t = await getTranslations({ locale });

	return createPageMetadata({
		locale,
		title: t("metadata.services.title"),
		description: t("metadata.services.description"),
		page: "services",
	});
}

type Props = {
	params: Promise<{ locale: string }>;
};

export default async function ServicesPage({ params }: Props) {
	const { locale } = await params;
	setRequestLocale(locale);
	const t = await getTranslations({ locale });

	return (
		<div className="home-page">
			<StructuredData
				title={t("metadata.services.title")}
				description={t("metadata.services.description")}
				image={getOgImageUrl(locale, "services")}
				url={`${getSiteUrl()}/${locale}/services`}
			/>
			<ServicesHero />
			<ServicesCapabilities />
			<ServicesProcess />
			<ServicesTechStack />
		</div>
	);
}
