"use client";

import { useInView } from "motion/react";
import dynamic from "next/dynamic";
import { type ComponentType, useLayoutEffect, useRef, useState } from "react";

type SectionLoader = () => Promise<{ default: ComponentType }>;

function shouldForceMountOnLoad(): boolean {
	if (typeof window === "undefined") return false;

	if (window.location.hash.length > 1) return true;

	const navEntries = performance.getEntriesByType("navigation");
	if (navEntries.length === 0) return false;

	const navEntry = navEntries[0] as PerformanceNavigationTiming;
	return navEntry.type === "reload" || navEntry.type === "back_forward";
}

export function createDeferredHomeSection(
	loader: SectionLoader,
	placeholderMinHeight = "40vh",
	id?: string,
) {
	const Section = dynamic(loader, { ssr: false });

	return function DeferredHomeSection() {
		const ref = useRef<HTMLDivElement>(null);
		const isInView = useInView(ref, {
			once: true,
			margin: "250px 0px",
		});
		const [forceMount, setForceMount] = useState(false);

		useLayoutEffect(() => {
			if (shouldForceMountOnLoad()) {
				setForceMount(true);
			}
		}, []);

		return (
			<div
				id={id}
				ref={ref}
				className={forceMount ? "deferred-section--active" : undefined}
				style={
					isInView || forceMount
						? undefined
						: { minHeight: placeholderMinHeight }
				}
			>
				{(isInView || forceMount) && <Section />}
			</div>
		);
	};
}
