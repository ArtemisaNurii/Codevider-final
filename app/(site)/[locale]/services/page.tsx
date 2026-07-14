import {
	generateServicesMetadata,
	ServicesPage,
} from "@/components/pages/services-page";

type Props = {
	params: Promise<{ locale: string }>;
};

export async function generateMetadata(props: Props) {
	return generateServicesMetadata(props);
}

export default ServicesPage;
