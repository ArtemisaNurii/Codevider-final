import type { Metadata } from "next";
import { HashScrollHandler } from "@/components/layout/hash-scroll-handler";
import Footer from "@/components/nav/Footer";
import { Navbar } from "@/components/nav/Navbar";
import { getSiteUrl } from "@/lib/site";

export const metadata: Metadata = {
	metadataBase: new URL(getSiteUrl()),
	...(process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION
		? {
				verification: {
					google: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION,
				},
			}
		: {}),
};

export default function SiteLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<>
			<Navbar />
			<HashScrollHandler />
			<div id="root" className="flex flex-1 flex-col">
				<main className="flex-1">{children}</main>
				<Footer />
			</div>
		</>
	);
}
