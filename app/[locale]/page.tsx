import { setRequestLocale } from "next-intl/server";
import Contact from "@/components/index/contact";
import CoreServices from "@/components/index/core-services";
import Faq from "@/components/index/faq";
import GlobalPartnerships from "@/components/index/global-partnerships";
import Hero from "@/components/index/hero";
import WhoWeAre from "@/components/index/who-we-are";
import WhoWeEmpower from "@/components/index/who-we-empower";
import WhyChooseUs from "@/components/index/why-choose-us";
import WhyOutsource from "@/components/index/why-outsource";

type Props = {
	params: Promise<{ locale: string }>;
};

export default async function Home({ params }: Props) {
	const { locale } = await params;
	setRequestLocale(locale);

	return (
		<div className="home-page">
			<Hero />
			<WhoWeAre />
			<CoreServices />
			<WhoWeEmpower />
			<WhyOutsource />
			<GlobalPartnerships />
			<WhyChooseUs />
			<Faq />
			<Contact />
		</div>
	);
}
