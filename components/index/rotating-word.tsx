"use client";

import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { useEffect, useState } from "react";
import { useMounted } from "@/hooks/use-section-reveal";

const INDUSTRIES = ["SaaS", "AI", "Commerce", "Fintech", "Healthcare"];
const INTERVAL_MS = 3200;

const enterTransition = {
	type: "spring" as const,
	stiffness: 120,
	damping: 18,
	mass: 0.85,
};

const exitTransition = {
	duration: 0.35,
	ease: [0.4, 0, 0.2, 1] as const,
};

export default function RotatingWord() {
	const [index, setIndex] = useState(0);
	const mounted = useMounted();
	const shouldReduceMotion = useReducedMotion();

	useEffect(() => {
		if (shouldReduceMotion) return;

		const interval = window.setInterval(() => {
			setIndex((current) => (current + 1) % INDUSTRIES.length);
		}, INTERVAL_MS);

		return () => window.clearInterval(interval);
	}, [shouldReduceMotion]);

	const word = INDUSTRIES[index];

	return (
		<span
			className="relative mt-1 inline-grid font-sans text-(--brand-accent-text)"
			aria-live="polite"
		>
			{/*
			 * Sizer: all words stacked in the same grid cell, invisible.
			 * The container always reserves the width of the longest word,
			 * preventing h1 reflow as the visible word changes.
			 */}
			<span className="col-start-1 row-start-1 inline-grid px-2" aria-hidden>
				{INDUSTRIES.map((w) => (
					<span
						key={w}
						className="invisible col-start-1 row-start-1 italic font-serif font-bold"
					>
						{w}
					</span>
				))}
			</span>

			{/* Visible animated word, absolutely positioned over the sizer */}
			<span className="col-start-1 row-start-1 overflow-hidden px-2">
				<AnimatePresence mode="wait" initial={false}>
					<motion.span
						key={word}
						className="block italic font-serif font-bold"
						initial={
							!mounted || shouldReduceMotion
								? false
								: index === 0
									? false
									: { y: "100%", opacity: 0, filter: "blur(8px)" }
						}
						animate={{ y: 0, opacity: 1, filter: "blur(0px)" }}
						exit={
							shouldReduceMotion
								? { opacity: 0, transition: { duration: 0.15 } }
								: {
										y: "-100%",
										opacity: 0,
										filter: "blur(8px)",
										transition: exitTransition,
									}
						}
						transition={
							shouldReduceMotion ? { duration: 0.15 } : enterTransition
						}
					>
						{word}
					</motion.span>
				</AnimatePresence>
			</span>
		</span>
	);
}
