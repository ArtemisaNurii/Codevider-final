import {
	generatePrivacyMetadata,
	PrivacyPage,
} from "@/components/pages/privacy-page";

type Props = {
	params: Promise<{ locale: string }>;
};

export async function generateMetadata(props: Props) {
	return generatePrivacyMetadata(props);
}

export default PrivacyPage;
