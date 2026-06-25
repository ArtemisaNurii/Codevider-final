import { defineRouting } from "next-intl/routing";

export const routing = defineRouting({
	locales: ["en", "de", "fr", "es", "it", "zh", "sq"],
	defaultLocale: "en",
	localePrefix: "always",
});
