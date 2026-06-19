import type { Metadata } from "next";
import { setRequestLocale } from "next-intl/server";
import ServicesCapabilities from "@/components/services/services-capabilities";
import ServicesHero from "@/components/services/services-hero";
import ServicesProcess from "@/components/services/services-process";
import ServicesTechStack from "@/components/services/services-tech-stack";

export const metadata: Metadata = {
	title: "Services — Codevider",
	description:
		"Explore how Codevider designs, builds, and scales reliable software: custom development, web apps, AI integration, automation, systems integration, cloud, and team augmentation.",
};

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
