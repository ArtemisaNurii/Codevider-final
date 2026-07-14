import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { StructuredData } from "@/components/seo/structured-data";
import ServicesCapabilities from "@/components/services/services-capabilities";
import ServicesHero from "@/components/services/services-hero";
import ServicesProcess from "@/components/services/services-process";
import ServicesTechStack from "@/components/services/services-tech-stack";
import { routing } from "@/i18n/routing";
import {
	createPageMetadata,
	getLocalizedUrl,
	getOgImageUrl,
} from "@/lib/site";
import type { LocalePageProps } from "./home-page";

export async function generateServicesMetadata({
	params,
}: LocalePageProps): Promise<Metadata> {
	const { locale } = await params;
	const t = await getTranslations({ locale });

	return createPageMetadata({
		locale,
		title: t("metadata.services.title"),
		description: t("metadata.services.description"),
		page: "services",
	});
}

export async function ServicesPage({ params }: LocalePageProps) {
	const { locale } = await params;
	setRequestLocale(locale);
	const t = await getTranslations({ locale });

	return (
		<div className="home-page">
			<ServicesHero />
			<ServicesCapabilities />
			<ServicesProcess />
			<ServicesTechStack />
			<StructuredData
				title={t("metadata.services.title")}
				description={t("metadata.services.description")}
				image={getOgImageUrl(locale, "services")}
				url={getLocalizedUrl(
					locale as (typeof routing.locales)[number],
					"/services",
				)}
			/>
		</div>
	);
}
