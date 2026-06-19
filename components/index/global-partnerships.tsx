"use client";

import { motion, useInView, useReducedMotion } from "motion/react";
import { useRef } from "react";
import { useTranslations } from "next-intl";
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
	const ref = useRef<HTMLElement>(null);
	const inView = useInView(ref, { once: true, margin: "-10% 0px" });
	const shouldReduceMotion = useReducedMotion();

	return (
		<section ref={ref} className="home-section relative overflow-visible">
			<div
				className="pointer-events-none absolute inset-0 bg-[radial-gradient(60%_50%_at_50%_120%,rgba(58,83,201,0.18),transparent_60%)] dark:bg-[radial-gradient(60%_50%_at_50%_120%,rgba(58,83,201,0.5),transparent_60%)]"
				aria-hidden
			/>

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
				className="relative z-1 mt-[var(--home-stack)] w-full px-[var(--home-inline)]"
				initial={shouldReduceMotion ? false : { opacity: 0, y: 16 }}
				animate={
					inView || shouldReduceMotion
						? { opacity: 1, y: 0 }
						: { opacity: 0, y: 16 }
				}
				transition={{ type: "spring", duration: 0.45, bounce: 0, delay: 0.1 }}
			>
				<WorldMap dots={[...PARTNERSHIP_ROUTES]} />
			</motion.div>
		</section>
	);
}
