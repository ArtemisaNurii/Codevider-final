import {
	generateHomeMetadata,
	HomePage,
} from "@/components/pages/home-page";

type Props = {
	params: Promise<{ locale: string }>;
};

export async function generateMetadata(props: Props) {
	return generateHomeMetadata(props);
}

export default HomePage;
