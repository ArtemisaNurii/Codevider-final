"use client";

import dynamic from "next/dynamic";
import { useInView } from "motion/react";
import { useRef, useState, useEffect, type ComponentType } from "react";

type SectionLoader = () => Promise<{ default: ComponentType }>;

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

		useEffect(() => {
			// Mount section if hash matches id
			if (id && window.location.hash.slice(1) === id) {
				setForceMount(true);
				return;
			}

			// Mount all sections on reload/back/forward for proper scroll restoration
			const navEntries = performance.getEntriesByType("navigation");
			if (navEntries.length > 0) {
				const navEntry = navEntries[0] as PerformanceNavigationTiming;
				if (navEntry.type === "reload" || navEntry.type === "back_forward") {
					setForceMount(true);
				}
			}
		}, [id]);

		return (
			<div
				id={id}
				ref={ref}
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
