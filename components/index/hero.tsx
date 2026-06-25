"use client";

import Link from "next/link";
import { motion, useReducedMotion } from "motion/react";
import { useTranslations } from "next-intl";
import { useEffect, useState } from "react";
import HeroDashboard from "./hero-dashboard";
import RotatingWord from "./rotating-word";

const revealEase = [0.22, 1, 0.36, 1] as const;

export default function Hero() {
	const t = useTranslations("home");
	const shouldReduceMotion = useReducedMotion();
	const yearsDelivering = new Date().getFullYear() - 2019;

	/*
	 * animationKey increments on every mount (including page refreshes)
	 * so motion re-runs the entrance sequence even when the browser
	 * restores scroll position back to this section.
	 */
	const [animationKey, setAnimationKey] = useState(0);

	useEffect(() => {
		setAnimationKey((k) => k + 1);
	}, []);

	const stagger = (index: number) =>
		shouldReduceMotion
			? { duration: 0 }
			: { duration: 0.55, ease: revealEase, delay: index * 0.09 };

	const stats = [
		{ value: `${yearsDelivering}+`, label: t("years_delivering") },
		{ value: "45+", label: t("global_projects") },
		{ value: "25+", label: t("engineers") },
	];

	// SSR: render fully visible (no opacity:0 flash on hydration).
	// Client: after mount animationKey > 0 triggers the entrance sequence.
	const hidden = animationKey > 0 && !shouldReduceMotion;

	return (
		<section className="home-hero relative isolate min-h-[100dvh] overflow-hidden">
			<div className="home-hero__blobs" aria-hidden>
				<div className="home-hero__blob home-hero__blob--primary" />
				<div className="home-hero__blob home-hero__blob--secondary" />
				<div className="home-hero__blob home-hero__blob--accent home-hero__blob--teal" />
				<div className="home-hero__blob home-hero__blob--accent home-hero__blob--violet" />
			</div>

			<div className="home-hero__veil" aria-hidden />

			<div className="home-wrap relative z-10 flex min-h-[100dvh] flex-col justify-center pb-[clamp(5rem,10vw,8rem)] pt-[clamp(6rem,12vw,9rem)]">
				<div className="grid w-full items-center gap-12 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.3fr)] lg:gap-14 xl:gap-16">
					<div className="flex flex-col items-center lg:items-start pt-8 lg:pt-0">
						<motion.h1
							key={`h1-${animationKey}`}
							className="mb-8 max-w-2xl text-balance text-center lg:text-left text-[clamp(2.25rem,5vw,3.5rem)] leading-[1.05] tracking-[-0.03em] text-(--hero-text-h)"
							initial={hidden ? { opacity: 0, y: 20 } : false}
							animate={{ opacity: 1, y: 0 }}
							transition={stagger(0)}
						>
							<span className="block font-sans">
								{t("your_strategic_partner_in")}
							</span>
							<RotatingWord />
						</motion.h1>

						<motion.p
							key={`lead-${animationKey}`}
							className="max-w-xl text-pretty text-center lg:text-left font-sans text-lg leading-relaxed text-(--hero-text-lead) sm:text-xl sm:leading-8"
							initial={hidden ? { opacity: 0, y: 20 } : false}
							animate={{ opacity: 1, y: 0 }}
							transition={stagger(1)}
						>
							<span className="font-medium text-(--hero-text-h)">
								{t("hero_lead_emphasis")}
							</span>{" "}
							{t("hero_lead_rest")}
						</motion.p>

						<motion.div
							key={`cta-${animationKey}`}
							className="mb-10 mt-14 flex flex-wrap items-center justify-center lg:justify-start gap-4 sm:mb-14 sm:mt-16 sm:gap-5"
							initial={hidden ? { opacity: 0, y: 20 } : false}
							animate={{ opacity: 1, y: 0 }}
							transition={stagger(2)}
						>
							<Link
								href="#contact"
								className="home-brand-btn min-h-11 px-7 py-3.5 text-sm"
							>
								{t("start_your_project")}
							</Link>
							<Link
								href="#services"
								className="inline-flex min-h-11 items-center justify-center rounded-full border border-(--border) bg-(--bg)/80 px-7 py-3.5 text-sm font-medium text-(--hero-text-h) backdrop-blur-sm transition-[background-color,border-color,transform] hover:border-(--accent-border) hover:bg-(--accent-bg) active:scale-[0.96] focus-visible:outline focus-visible:outline-offset-2 focus-visible:outline-(--focus-ring)"
							>
								{t("explore_services")}
							</Link>
						</motion.div>

						<motion.div
							key={`stats-${animationKey}`}
							className="grid grid-cols-3 gap-5 border-t border-(--border) pt-10 sm:gap-10 sm:pt-12 w-full"
							initial={hidden ? { opacity: 0, y: 20 } : false}
							animate={{ opacity: 1, y: 0 }}
							transition={stagger(3)}
						>
							{stats.map(({ value, label }) => (
								<div key={label} className="text-center lg:text-left">
									<p className="font-(family-name:--mono) text-2xl font-medium tabular-nums tracking-tight text-(--hero-text-h) sm:text-3xl">
										{value}
									</p>
									<p className="mt-1 text-xs text-(--hero-text-lead) sm:text-sm">
										{label}
									</p>
								</div>
							))}
						</motion.div>
					</div>

					<motion.div
						key={`dash-${animationKey}`}
						className="hero-dash-bleed relative w-full min-w-0 lg:min-w-[28rem] xl:min-w-[32rem]"
						initial={hidden ? { opacity: 0, y: 28 } : false}
						animate={{ opacity: 1, y: 0 }}
						transition={stagger(1.5)}
					>
						<HeroDashboard />
					</motion.div>
				</div>
			</div>
		</section>
	);
}
