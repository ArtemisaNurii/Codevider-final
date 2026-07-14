import {
	CareerApplyPage,
	generateCareerApplyMetadata,
} from "@/components/pages/career-apply-page";
import { routing } from "@/i18n/routing";

type Props = {
	params: Promise<{ locale: string }>;
};

export function generateStaticParams() {
	return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata(props: Props) {
	return generateCareerApplyMetadata(props);
}

export default CareerApplyPage;
