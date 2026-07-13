"use client";

import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { scrollToHashTargetWhenReady } from "@/lib/wait-for-stable-layout";

/**
 * Scrolls to a hash target after deferred sections mount and layout settles.
 */
export function HashScrollHandler() {
	const pathname = usePathname();
	const [locationHash, setLocationHash] = useState("");

	useEffect(() => {
		const syncHash = () => setLocationHash(window.location.hash);

		syncHash();
		window.addEventListener("hashchange", syncHash);

		return () => window.removeEventListener("hashchange", syncHash);
	}, [pathname]);

	useEffect(() => {
		if (!locationHash) return;

		const id = locationHash.slice(1);
		if (!id) return;

		const controller = new AbortController();

		void scrollToHashTargetWhenReady(id, controller.signal);

		return () => controller.abort();
	}, [pathname, locationHash]);

	return null;
}
