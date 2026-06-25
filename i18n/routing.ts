import { defineRouting } from "next-intl/routing";

export const routing = defineRouting({
	locales: ["en", "de", "fr", "es", "it", "sq", "zh"],
	defaultLocale: "en",
	localePrefix: "always",
});
