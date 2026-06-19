"use client";

import { NextIntlClientProvider } from "next-intl";
import { englishMessages, getMessageByPath } from "@/i18n/get-locale-messages";

type Props = {
	children: React.ReactNode;
	locale: string;
	messages: Record<string, unknown>;
	timeZone: string;
};

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
