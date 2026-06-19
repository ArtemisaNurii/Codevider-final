import en from "@/dictionaries/en.json";
import { routing } from "./routing";

type MessageTree = Record<string, unknown>;

function isUsableTranslation(value: unknown): value is string {
	return typeof value === "string" && value.trim().length > 0;
}

function isMessageTree(value: unknown): value is MessageTree {
	return typeof value === "object" && value !== null && !Array.isArray(value);
}

export function mergeWithEnglishFallback(
	base: MessageTree,
	override: MessageTree,
): MessageTree {
	const result: MessageTree = { ...base };

	for (const key of Object.keys(override)) {
		const baseValue = base[key];
		const overrideValue = override[key];

		if (isMessageTree(baseValue) && isMessageTree(overrideValue)) {
			result[key] = mergeWithEnglishFallback(baseValue, overrideValue);
			continue;
		}

		if (isUsableTranslation(overrideValue)) {
			result[key] = overrideValue;
			continue;
		}

		if (baseValue !== undefined) {
			result[key] = baseValue;
		}
	}

	return result;
}

export function getMessageByPath(
	messages: MessageTree,
	namespace: string | undefined,
	key: string,
): string | undefined {
	const path = namespace ? `${namespace}.${key}` : key;

	const value = path.split(".").reduce<unknown>((current, segment) => {
		if (!isMessageTree(current)) return undefined;
		return current[segment];
	}, messages);

	return isUsableTranslation(value) ? value : undefined;
}

export async function getLocaleMessages(locale: string): Promise<MessageTree> {
	if (locale === routing.defaultLocale) {
		return en;
	}

	try {
		const localeMessages = (await import(`@/dictionaries/${locale}.json`))
			.default as MessageTree;

		if (!isMessageTree(localeMessages)) {
			return en;
		}

		return mergeWithEnglishFallback(en, localeMessages);
	} catch {
		return en;
	}
}

export const englishMessages = en;
