import { defineRouting } from "next-intl/routing";

export const routing = defineRouting({
	locales: ["en", "es", "sq", "de", "fr", "it"],
	defaultLocale: "en",
	localePrefix: "always",
});
