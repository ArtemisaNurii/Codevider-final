import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import ServicesCapabilities from "@/components/services/services-capabilities";
import ServicesHero from "@/components/services/services-hero";
import ServicesProcess from "@/components/services/services-process";
import ServicesTechStack from "@/components/services/services-tech-stack";

export async function generateMetadata({ params }: Props): Promise<Metadata> {
	const { locale } = await params;
	const t = await getTranslations({ locale });

	return {
		title: t("metadata.services.title"),
		description: t("metadata.services.description"),
	};
}

type Props = {
	params: Promise<{ locale: string }>;
};

export default async function ServicesPage({ params }: Props) {
	const { locale } = await params;
	setRequestLocale(locale);

	return (
		<div className="home-page">
			<ServicesHero />
			<ServicesCapabilities />
			<ServicesProcess />
			<ServicesTechStack />
		</div>
	);
}
