import {
	generateHomeMetadata,
	HomePage,
} from "@/components/pages/home-page";
import { routing } from "@/i18n/routing";

const params = Promise.resolve({ locale: routing.defaultLocale });

export function generateMetadata() {
	return generateHomeMetadata({ params });
}

export default function RootPage() {
	return <HomePage params={params} />;
}
