"use client";

import { motion, useReducedMotion } from "motion/react";
import { useTranslations } from "next-intl";
import {
	revealTransition,
	useSectionReveal,
} from "@/hooks/use-section-reveal";
import WorldMap from "@/components/ui/world-map";
import SectionHead from "./section-head";

const PARTNERSHIP_HUB = { lat: 32.1533, lng: 17.1683 } as const;

const PARTNERSHIP_ROUTES = [
	{ start: PARTNERSHIP_HUB, end: { lat: 27.7128, lng: -77.006 } },
	{ start: PARTNERSHIP_HUB, end: { lat: 41.8566, lng: 5.3522 } },
	{ start: PARTNERSHIP_HUB, end: { lat: 29.7749, lng: -122.4194 } },
	{ start: PARTNERSHIP_HUB, end: { lat: -58.8136, lng: 144.9631 } },
	{ start: PARTNERSHIP_HUB, end: { lat: 46.5074, lng: -2.2978 } },
	{ start: PARTNERSHIP_HUB, end: { lat: 5.2048, lng: 55.9708 } },
] as const;

export default function GlobalPartnerships() {
	const t = useTranslations("home.global");
	const { ref, isRevealed, shouldAnimate } = useSectionReveal();
	const shouldReduceMotion = useReducedMotion();

	return (
		<section
			ref={ref}
			className="home-section home-section--tight relative overflow-visible max-md:pb-10"
		>
			<div className="home-wrap relative z-1">
				<SectionHead
					eyebrow={t("eyebrow")}
					headline={t("headline")}
					description={t("description")}
					centered
					className="dark:[&_.home-eyebrow]:text-[#00bcff] dark:[&_.home-eyebrow]:before:bg-[#00bcff]"
				/>
			</div>

			<motion.div
				className="relative z-1 mt-[var(--home-stack)] w-full px-[var(--home-inline)] max-md:mt-[var(--home-stack-sm)]"
				initial={shouldReduceMotion || !shouldAnimate ? false : { opacity: 0, y: 16 }}
				animate={isRevealed ? { opacity: 1, y: 0 } : { opacity: 0, y: 16 }}
				transition={revealTransition(shouldAnimate, {
					type: "spring" as const,
					duration: 0.45,
					bounce: 0,
					delay: 0.1,
				})}
			>
				<div
					className="pointer-events-none absolute inset-x-0 -bottom-6 top-1/3 bg-[radial-gradient(70%_55%_at_50%_100%,rgba(58,83,201,0.18),transparent_65%)] dark:bg-[radial-gradient(70%_55%_at_50%_100%,rgba(58,83,201,0.5),transparent_65%)] max-md:-bottom-2 max-md:top-1/2"
					aria-hidden
				/>
				<WorldMap dots={[...PARTNERSHIP_ROUTES]} />
			</motion.div>
		</section>
	);
}
