"use client";

import { hasLocale, NextIntlClientProvider } from "next-intl";
import {
	createContext,
	useCallback,
	useContext,
	useEffect,
	useState,
	useTransition,
} from "react";
import { detectBrowserLocale } from "@/i18n/detect-locale";
import {
	englishMessages,
	getLocaleMessages,
	getMessageByPath,
} from "@/i18n/get-locale-messages";
import { routing } from "@/i18n/routing";

const STORAGE_KEY = "locale";

type MessageTree = Record<string, unknown>;

type LocaleContextType = {
	setLocale: (locale: string) => void;
};

const LocaleContext = createContext<LocaleContextType | undefined>(undefined);

/** Props for LocaleProvider. */
type Props = {
	children: React.ReactNode;
	locale: string;
	messages: MessageTree;
	timeZone: string;
};

function readStoredLocale(): string | null {
	const stored = localStorage.getItem(STORAGE_KEY);
	return hasLocale(routing.locales, stored) ? stored : null;
}

/**
 * Client locale provider: preference lives in localStorage, not the URL.
 * Static HTML is English; preferred locale is applied after hydration.
 */
export function LocaleProvider({
	children,
	locale: initialLocale,
	messages: initialMessages,
	timeZone,
}: Props) {
	const [locale, setLocaleState] = useState(initialLocale);
	const [messages, setMessages] = useState(initialMessages);
	const [, startTransition] = useTransition();

	const applyLocale = useCallback(
		(nextLocale: string, nextMessages: MessageTree) => {
			startTransition(() => {
				setLocaleState(nextLocale);
				setMessages(nextMessages);
				document.documentElement.lang = nextLocale;
			});
		},
		[],
	);

	useEffect(() => {
		const stored = readStoredLocale();
		const resolved = stored ?? detectBrowserLocale();

		if (!stored) {
			localStorage.setItem(STORAGE_KEY, resolved);
		}

		document.documentElement.lang = resolved;

		if (resolved === initialLocale) {
			return;
		}

		let cancelled = false;

		void getLocaleMessages(resolved).then((nextMessages) => {
			if (!cancelled) {
				applyLocale(resolved, nextMessages);
			}
		});

		return () => {
			cancelled = true;
		};
	}, [applyLocale, initialLocale]);

	const setLocale = useCallback(
		(nextLocale: string) => {
			if (!hasLocale(routing.locales, nextLocale) || nextLocale === locale) {
				return;
			}

			localStorage.setItem(STORAGE_KEY, nextLocale);

			void getLocaleMessages(nextLocale).then((nextMessages) => {
				applyLocale(nextLocale, nextMessages);
			});
		},
		[applyLocale, locale],
	);

	return (
		<LocaleContext.Provider value={{ setLocale }}>
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
		</LocaleContext.Provider>
	);
}

export function useSetLocale() {
	const context = useContext(LocaleContext);
	if (!context) {
		throw new Error("useSetLocale must be used within LocaleProvider");
	}
	return context.setLocale;
}
