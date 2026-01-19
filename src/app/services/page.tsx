// pages/index.js

import { Metadata } from "next";
import { Footer } from "../components/CTA";
import Header from "../components/navbar";
import ProcessStepper from "./process";
import ServicesPage from "./services";
import TechStack from "./tech";

export const metadata: Metadata = {
	title: "Services",
	description: "Welcome to Codevider",
};

export default function Technologies() {
	return (
		<main>
			<Header />
			<ServicesPage />
			<ProcessStepper />
			<TechStack />
			<Footer />
		</main>
	);
}
