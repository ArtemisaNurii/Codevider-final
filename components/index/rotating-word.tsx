"use client";

import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { useEffect, useState } from "react";

const INDUSTRIES = ["SaaS", "AI", "Commerce", "Fintech", "Healthcare"] as const;
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
			className="relative mt-1 inline-grid font-sans text-[#3a53c9]"
			aria-live="polite"
		>
			<span className="invisible col-start-1 row-start-1" aria-hidden>
				Healthcare
			</span>

			<span className="col-start-1 row-start-1 overflow-hidden">
				<AnimatePresence mode="wait" initial={false}>
					<motion.span
						key={word}
						className="block"
						initial={
							shouldReduceMotion
								? { opacity: 0 }
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
						<em>{word}</em>
					</motion.span>
				</AnimatePresence>
			</span>
		</span>
	);
}
