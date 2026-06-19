import { getMessages, setRequestLocale } from "next-intl/server";
import { hasLocale } from "next-intl";
import { notFound } from "next/navigation";
import { Navbar } from "@/components/nav/Navbar";
import Footer from "@/components/nav/Footer";
import { SetHtmlLang } from "@/components/providers/SetHtmlLang";
import { LocaleProvider } from "@/components/providers/LocaleProvider";
import { routing } from "@/i18n/routing";
import { DEFAULT_TIME_ZONE } from "@/dictionaries";

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
