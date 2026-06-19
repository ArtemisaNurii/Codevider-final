import type { Metadata } from "next";
import { setRequestLocale } from "next-intl/server";
import CareerHero from "@/components/career/career-hero";
import CareerHiringProcess from "@/components/career/career-hiring-process";
import CareerOpenings from "@/components/career/career-openings";
import CareerWhyJoin from "@/components/career/career-why-join";

export const metadata: Metadata = {
	title: "Careers — Codevider",
	description:
		"Join Codevider and help build the future of software development. Explore our hiring process and connect with our team in Tirana, Albania.",
};

type Props = {
	params: Promise<{ locale: string }>;
};

export default async function CareerPage({ params }: Props) {
	const { locale } = await params;
	setRequestLocale(locale);

	return (
		<div className="home-page">
			<CareerHero />
			<CareerOpenings />
			<CareerWhyJoin />
			<CareerHiringProcess />
		</div>
	);
}
