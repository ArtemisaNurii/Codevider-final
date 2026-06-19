import { getRequestConfig } from "next-intl/server";
import { hasLocale } from "next-intl";
import { routing } from "./routing";
import { DEFAULT_TIME_ZONE } from "@/dictionaries";
import {
	englishMessages,
	getLocaleMessages,
	getMessageByPath,
} from "./get-locale-messages";

export default getRequestConfig(async ({ requestLocale }) => {
	const requested = await requestLocale;
	const locale = hasLocale(routing.locales, requested)
		? requested
		: routing.defaultLocale;

	const messages = await getLocaleMessages(locale);

	return {
		locale,
		messages,
		timeZone: DEFAULT_TIME_ZONE,
		getMessageFallback: ({ namespace, key }) =>
			getMessageByPath(englishMessages, namespace, key) ?? key,
	};
});
