"use client";

import { NextIntlClientProvider } from "next-intl";
import { englishMessages, getMessageByPath } from "@/i18n/get-locale-messages";

/** Props for LocaleProvider. */
type Props = {
	children: React.ReactNode;
	locale: string;
	messages: Record<string, unknown>;
	timeZone: string;
};

/**
 * Locale provider component wrapping NextIntlClientProvider with fallback to English messages.
 *
 * @param children - Child components to wrap
 * @param locale - Current locale
 * @param messages - Localized messages
 * @param timeZone - Time zone for date formatting
 * @returns Locale provider JSX
 */
export function LocaleProvider({
	children,
	locale,
	messages,
	timeZone,
}: Props) {
	return (
		<NextIntlClientProvider
			locale={locale}
			messages={messages}
			timeZone={timeZone}
			getMessageFallback={({ namespace, key }) =>
				getMessageByPath(englishMessages, namespace, key) ?? key
			}
		>
			{children}
		</NextIntlClientProvider>
	);
}
