import { getRequestConfig } from "next-intl/server";
import { DEFAULT_TIME_ZONE } from "@/dictionaries";
import {
	englishMessages,
	getLocaleMessages,
	getMessageByPath,
} from "./get-locale-messages";
import { routing } from "./routing";

/** Server always serves the default locale; client LocaleProvider applies the user’s stored preference. */
export default getRequestConfig(async () => {
	const locale = routing.defaultLocale;
	const messages = await getLocaleMessages(locale);

	return {
		locale,
		messages,
		timeZone: DEFAULT_TIME_ZONE,
		getMessageFallback: ({ namespace, key }) =>
			getMessageByPath(englishMessages, namespace, key) ?? key,
	};
});
