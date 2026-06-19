"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { detectBrowserLocale } from "@/i18n/detect-locale";

export default function RootPage() {
	const router = useRouter();

	useEffect(() => {
		router.replace(`/${detectBrowserLocale()}`);
	}, [router]);

	return null;
}
