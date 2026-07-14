"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { detectBrowserLocale } from "@/i18n/detect-locale";
import { routing } from "@/i18n/routing";

type Props = {
	path?: string;
};

/**
 * Client redirect for non-default locales only.
 * English (default) stays on unprefixed paths — never sends users to `/en`.
 */
export function LocaleRedirect({ path }: Props) {
	const router = useRouter();

	useEffect(() => {
		const locale = detectBrowserLocale();

		if (locale === routing.defaultLocale) {
			const target = path ? `/${path}` : "/";
			if (window.location.pathname !== target.split("?")[0]) {
				router.replace(target);
			}
			return;
		}

		const target = path ? `/${locale}/${path}` : `/${locale}`;
		router.replace(target);
	}, [router, path]);

	return null;
}
