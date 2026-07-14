import {
	AboutPage,
	generateAboutMetadata,
} from "@/components/pages/about-page";

type Props = {
	params: Promise<{ locale: string }>;
};

export async function generateMetadata(props: Props) {
	return generateAboutMetadata(props);
}

export default AboutPage;
