"use client";

import dynamic from "next/dynamic";
import { useInView } from "motion/react";
import { useRef, type ComponentType } from "react";

type SectionLoader = () => Promise<{ default: ComponentType }>;

export function createDeferredHomeSection(
	loader: SectionLoader,
	placeholderMinHeight = "40vh",
) {
	const Section = dynamic(loader, { ssr: false });

	return function DeferredHomeSection() {
		const ref = useRef<HTMLDivElement>(null);
		const shouldMount = useInView(ref, {
			once: true,
			margin: "250px 0px",
		});

		return (
			<div
				ref={ref}
				style={shouldMount ? undefined : { minHeight: placeholderMinHeight }}
			>
				{shouldMount ? <Section /> : null}
			</div>
		);
	};
}
