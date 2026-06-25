import type { Metadata } from "next";
import { SiteDocument } from "@/components/layout/site-document";
import { getSiteUrl } from "@/lib/site";

export const metadata: Metadata = {
	metadataBase: new URL(getSiteUrl()),
	title: "Codevider",
	description: "Your strategic partner in software development",
	...(process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION
		? {
				verification: {
					google: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION,
				},
			}
		: {}),
};

export default function RedirectRootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return <SiteDocument locale="en">{children}</SiteDocument>;
}
