import {
	generateServicesMetadata,
	ServicesPage,
} from "@/components/pages/services-page";
import { routing } from "@/i18n/routing";

const params = Promise.resolve({ locale: routing.defaultLocale });

export function generateMetadata() {
	return generateServicesMetadata({ params });
}

export default function ServicesPageDefault() {
	return <ServicesPage params={params} />;
}
