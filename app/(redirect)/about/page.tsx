import {
	AboutPage,
	generateAboutMetadata,
} from "@/components/pages/about-page";
import { routing } from "@/i18n/routing";

const params = Promise.resolve({ locale: routing.defaultLocale });

export function generateMetadata() {
	return generateAboutMetadata({ params });
}

export default function AboutPageDefault() {
	return <AboutPage params={params} />;
}
