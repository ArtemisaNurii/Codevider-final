import en from "./en.json";
import sq from "./sq.json";
import de from "./de.json";
import fr from "./fr.json";
import it from "./it.json";
import es from "./es.json";

export const dictionaries = {
	en,
	sq,
	de,
	fr,
	it,
	es,
};

export type Locale = keyof typeof dictionaries;
export const SUPPORTED_LOCALES: Locale[] = ["en", "es", "sq", "de", "fr", "it"];

export const DEFAULT_LOCALE: Locale = "en";
export const DEFAULT_TIME_ZONE = "Europe/Tirane";
