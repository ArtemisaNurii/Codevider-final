import {
	generatePrivacyMetadata,
	PrivacyPage,
} from "@/components/pages/privacy-page";
import { routing } from "@/i18n/routing";

const params = Promise.resolve({ locale: routing.defaultLocale });

export function generateMetadata() {
	return generatePrivacyMetadata({ params });
}

export default function PrivacyPageDefault() {
	return <PrivacyPage params={params} />;
}
