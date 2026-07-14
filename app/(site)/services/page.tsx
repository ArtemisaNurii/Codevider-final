import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { StructuredData } from "@/components/seo/structured-data";
import ServicesCapabilities from "@/components/services/services-capabilities";
import ServicesHero from "@/components/services/services-hero";
import ServicesProcess from "@/components/services/services-process";
import ServicesTechStack from "@/components/services/services-tech-stack";
import { routing } from "@/i18n/routing";
import { createPageMetadata, getOgImageUrl, getPageUrl } from "@/lib/site";

export async function generateMetadata(): Promise<Metadata> {
	const t = await getTranslations();

	return createPageMetadata({
		locale: routing.defaultLocale,
		title: t("metadata.services.title"),
		description: t("metadata.services.description"),
		page: "services",
	});
}

export default async function ServicesPage() {
	const t = await getTranslations();

	return (
		<div className="home-page">
			<ServicesHero />
			<ServicesCapabilities />
			<ServicesProcess />
			<ServicesTechStack />
			<StructuredData
				title={t("metadata.services.title")}
				description={t("metadata.services.description")}
				image={getOgImageUrl(routing.defaultLocale, "services")}
				url={getPageUrl("/services")}
			/>
		</div>
	);
}
