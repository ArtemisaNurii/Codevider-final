import type { Metadata } from "next";
import { getMessages } from "next-intl/server";
import { HashScrollHandler } from "@/components/layout/hash-scroll-handler";
import { SiteDocument } from "@/components/layout/site-document";
import Footer from "@/components/nav/Footer";
import { Navbar } from "@/components/nav/Navbar";
import { LocaleProvider } from "@/components/providers/LocaleProvider";
import { DEFAULT_TIME_ZONE } from "@/dictionaries";
import { routing } from "@/i18n/routing";
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

export default async function SiteLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	const messages = await getMessages();

	return (
		<SiteDocument locale={routing.defaultLocale}>
			<LocaleProvider
				locale={routing.defaultLocale}
				messages={messages}
				timeZone={DEFAULT_TIME_ZONE}
			>
				<Navbar />
				<HashScrollHandler />
				<div id="root" className="flex flex-1 flex-col">
					<main className="flex-1">{children}</main>
					<Footer />
				</div>
			</LocaleProvider>
		</SiteDocument>
	);
}
