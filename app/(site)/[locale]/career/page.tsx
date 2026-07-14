import {
	CareerPage,
	generateCareerMetadata,
} from "@/components/pages/career-page";

type Props = {
	params: Promise<{ locale: string }>;
};

export async function generateMetadata(props: Props) {
	return generateCareerMetadata(props);
}

export default CareerPage;
