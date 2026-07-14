import {
	generateTermsMetadata,
	TermsPage,
} from "@/components/pages/terms-page";
import { routing } from "@/i18n/routing";

const params = Promise.resolve({ locale: routing.defaultLocale });

export function generateMetadata() {
	return generateTermsMetadata({ params });
}

export default function TermsPageDefault() {
	return <TermsPage params={params} />;
}
