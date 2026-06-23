import { notFound } from "next/navigation";
import { hasLocale } from "next-intl";
import { getMessages, setRequestLocale } from "next-intl/server";
import Footer from "@/components/nav/Footer";
import { Navbar } from "@/components/nav/Navbar";
import { LocaleProvider } from "@/components/providers/LocaleProvider";
import { SetHtmlLang } from "@/components/providers/SetHtmlLang";
import { DEFAULT_TIME_ZONE } from "@/dictionaries";
import { routing } from "@/i18n/routing";

type Props = {
	children: React.ReactNode;
	params: Promise<{ locale: string }>;
};

export function generateStaticParams() {
	return routing.locales.map((locale) => ({ locale }));
}

export default async function LocaleLayout({ children, params }: Props) {
	const { locale } = await params;

	if (!hasLocale(routing.locales, locale)) {
		notFound();
	}

	setRequestLocale(locale);
	const messages = await getMessages();

	return (
		<LocaleProvider
			locale={locale}
			messages={messages}
			timeZone={DEFAULT_TIME_ZONE}
		>
			<SetHtmlLang locale={locale} />
			<Navbar />
			<div id="root" className="flex flex-1 flex-col">
				<main className="flex-1">{children}</main>
				<Footer />
			</div>
		</LocaleProvider>
	);
}
