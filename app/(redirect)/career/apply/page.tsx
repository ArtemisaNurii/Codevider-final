import {
	CareerApplyPage,
	generateCareerApplyMetadata,
} from "@/components/pages/career-apply-page";
import { routing } from "@/i18n/routing";

const params = Promise.resolve({ locale: routing.defaultLocale });

export function generateMetadata() {
	return generateCareerApplyMetadata({ params });
}

export default function CareerApplyPageDefault() {
	return <CareerApplyPage params={params} />;
}
