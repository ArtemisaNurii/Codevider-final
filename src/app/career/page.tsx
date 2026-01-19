import { Metadata } from "next";
import { Footer } from "../components/CTA";
import Header from "../components/navbar";
import JobsListing from "./jobsListing";

export const metadata: Metadata = {
	title: "Career",
	description: "Explore our job openings",
};

export default function CareerPage() {
	return (
		<main>
			<Header />
			<section>
				<JobsListing page={1} limit={10} />
			</section>
			<Footer />
		</main>
	);
}
