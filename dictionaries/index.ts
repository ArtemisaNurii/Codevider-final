import en from "./en.json";

export const dictionaries = {
	en,
};

export type Locale = keyof typeof dictionaries;
export const DEFAULT_LOCALE: Locale = "en";
