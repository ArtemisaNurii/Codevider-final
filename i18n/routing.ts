import { defineRouting } from "next-intl/routing";

export const routing = defineRouting({
	locales: ["en", "de", "fr", "es", "it", "zh", "sq"],
	defaultLocale: "en",
	// Default locale (en) has no prefix: `/about`. Other locales keep it: `/de/about`.
	// Static export can't rewrite via middleware, so English pages also live under
	// `app/(redirect)/` (see those routes) while `/en/*` 301s to the unprefixed URL.
	localePrefix: "as-needed",
});
