import { hasLocale } from "next-intl";
import { routing } from "./routing";

function normalizeLanguageTag(tag: string): string {
	return tag.toLowerCase().split("-")[0];
}

export function detectBrowserLocale(): (typeof routing.locales)[number] {
	if (typeof navigator === "undefined") {
		return routing.defaultLocale;
	}

	const candidates = [
		...(navigator.languages ?? []),
		navigator.language,
	].filter(Boolean);

	for (const tag of candidates) {
		const base = normalizeLanguageTag(tag);
		if (hasLocale(routing.locales, base)) {
			return base;
		}
	}

	return routing.defaultLocale;
}
