import de from "./de.json";
import en from "./en.json";
import es from "./es.json";
import fr from "./fr.json";
import it from "./it.json";
import sq from "./sq.json";
import zh from "./zh.json";

export const dictionaries = {
	en,
	sq,
	de,
	fr,
	it,
	es,
	zh,
};

export type Locale = keyof typeof dictionaries;
export const SUPPORTED_LOCALES: Locale[] = [
	"en",
	"es",
	"sq",
	"de",
	"fr",
	"it",
	"zh",
];

export const DEFAULT_LOCALE: Locale = "en";
export const DEFAULT_TIME_ZONE = "Europe/Tirane";
