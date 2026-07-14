import {
	generateTermsMetadata,
	TermsPage,
} from "@/components/pages/terms-page";

type Props = {
	params: Promise<{ locale: string }>;
};

export async function generateMetadata(props: Props) {
	return generateTermsMetadata(props);
}

export default TermsPage;
