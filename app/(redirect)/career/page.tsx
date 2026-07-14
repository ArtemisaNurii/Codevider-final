import {
	CareerPage,
	generateCareerMetadata,
} from "@/components/pages/career-page";
import { routing } from "@/i18n/routing";

const params = Promise.resolve({ locale: routing.defaultLocale });

export function generateMetadata() {
	return generateCareerMetadata({ params });
}

export default function CareerPageDefault() {
	return <CareerPage params={params} />;
}
