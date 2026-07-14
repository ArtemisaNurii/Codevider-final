import type { Metadata } from "next";
import { getMessages, setRequestLocale } from "next-intl/server";
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

/**
 * Unprefixed English routes (static export + localePrefix: as-needed).
 * Renders the full site shell for the default locale without an `/en` prefix.
 */
export default async function DefaultLocaleLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	const locale = routing.defaultLocale;
	setRequestLocale(locale);
	const messages = await getMessages();

	return (
		<SiteDocument locale={locale}>
			<LocaleProvider
				locale={locale}
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
