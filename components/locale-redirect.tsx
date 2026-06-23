"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { detectBrowserLocale } from "@/i18n/detect-locale";

type Props = {
	path?: string;
};

export function LocaleRedirect({ path }: Props) {
	const router = useRouter();

	useEffect(() => {
		const locale = detectBrowserLocale();
		const target = path ? `/${locale}/${path}` : `/${locale}`;
		router.replace(target);
	}, [router, path]);

	return null;
}
