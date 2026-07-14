/** Supported locales — preference is stored in localStorage, not the URL. */
export const routing = {
	locales: ["en", "de", "fr", "es", "it", "zh", "sq"] as const,
	defaultLocale: "en" as const,
};
