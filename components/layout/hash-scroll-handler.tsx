"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

/**
 * Component that handles smooth scrolling to hash fragments on page navigation.
 *
 * @returns Null (renders nothing)
 */
export function HashScrollHandler() {
	const pathname = usePathname();

	useEffect(() => {
		const hash = window.location.hash;
		if (!hash) return;

		const id = hash.slice(1);

		/**
		 * Attempts to scroll to the target element.
		 *
		 * @returns True if element found and scrolled to
		 */
		const scrollToTarget = (): boolean => {
			const el = document.getElementById(id);
			if (el) {
				el.scrollIntoView({ behavior: "smooth", block: "start" });
				return true;
			}
			return false;
		};

		if (scrollToTarget()) return;

		const interval = setInterval(() => {
			if (scrollToTarget()) clearInterval(interval);
		}, 100);

		const timeout = setTimeout(() => clearInterval(interval), 5000);

		return () => {
			clearInterval(interval);
			clearTimeout(timeout);
		};
	}, [pathname]);

	return null;
}
