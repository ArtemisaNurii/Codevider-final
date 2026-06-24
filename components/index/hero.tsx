"use client";

import Link from "next/link";
import { motion, useReducedMotion } from "motion/react";
import { useTranslations } from "next-intl";
import {
	appleRevealEase,
	sectionRevealInitial,
	sectionRevealItem,
	useSectionReveal,
} from "@/hooks/use-section-reveal";
import HeroDashboard from "./hero-dashboard";
import RotatingWord from "./rotating-word";

const heroStagger = {
	hidden: {},
	visible: {
		transition: {
			staggerChildren: 0.1,
			delayChildren: 0.05,
		},
	},
};

const heroItemReveal = sectionRevealItem;

const statReveal = {
	hidden: { opacity: 0, y: 12 },
	visible: (delay: number) => ({
		opacity: 1,
		y: 0,
		transition: {
			duration: 0.55,
			ease: appleRevealEase,
			delay,
		},
	}),
};

export default function Hero() {
	const t = useTranslations("home");
	const { ref, isRevealed, shouldAnimate } = useSectionReveal<HTMLElement>({
		margin: "-10% 0px",
	});
	const shouldReduceMotion = useReducedMotion();
	const yearsDelivering = new Date().getFullYear() - 2019;

	const stats = [
		{ value: `${yearsDelivering}+`, label: t("years_delivering") },
		{ value: "45+", label: t("global_projects") },
		{ value: "25+", label: t("engineers") },
	];

	return (
		<section
			ref={ref}
			className="home-hero relative isolate min-h-svh overflow-hidden"
		>
			<div className="home-hero__blobs" aria-hidden>
				<div className="home-hero__blob home-hero__blob--primary" />
				<div className="home-hero__blob home-hero__blob--secondary" />
				<div className="home-hero__blob home-hero__blob--accent home-hero__blob--teal" />
				<div className="home-hero__blob home-hero__blob--accent home-hero__blob--violet" />
			</div>

			<div className="home-hero__veil" aria-hidden />

			<div className="home-wrap relative z-10 flex min-h-svh flex-col justify-center pb-[clamp(5rem,10vw,8rem)] pt-[clamp(6rem,12vw,9rem)]">
				<div className="grid w-full items-center gap-12 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.3fr)] lg:gap-14 xl:gap-16">
					<motion.div
						initial={sectionRevealInitial(shouldReduceMotion)}
						animate={isRevealed ? "visible" : "hidden"}
						variants={heroStagger}
					>
						<motion.h1
							className="mb-8 max-w-2xl text-balance text-left text-[clamp(2.25rem,5vw,3.5rem)] leading-[1.05] tracking-[-0.03em] text-(--hero-text-h)"
							variants={heroItemReveal}
						>
							<span className="block font-sans">
								{t("your_strategic_partner_in")}
							</span>
							<RotatingWord />
						</motion.h1>

						<motion.p
							className="max-w-xl text-pretty text-left font-sans text-lg leading-relaxed text-(--hero-text-lead) sm:text-xl sm:leading-8"
							variants={heroItemReveal}
						>
							<span className="font-medium text-(--hero-text-h)">
								{t("hero_lead_emphasis")}
							</span>{" "}
							{t("hero_lead_rest")}
						</motion.p>

						<motion.div
							className="mb-10 mt-14 flex flex-wrap items-center justify-start gap-4 sm:mb-14 sm:mt-16 sm:gap-5"
							variants={heroItemReveal}
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

						<div className="grid grid-cols-3 gap-5 border-t border-(--border) pt-10 sm:gap-10 sm:pt-12">
							{stats.map(({ value, label }, index) => (
								<motion.div
									key={label}
									className="text-left"
									initial={sectionRevealInitial(shouldReduceMotion)}
									animate={isRevealed ? "visible" : "hidden"}
									variants={statReveal}
									custom={
										shouldReduceMotion || !shouldAnimate ? 0 : index * 0.1
									}
								>
									<p className="font-(family-name:--mono) text-2xl font-medium tabular-nums tracking-tight text-(--hero-text-h) sm:text-3xl">
										{value}
									</p>
									<p className="mt-1 text-xs text-(--hero-text-lead) sm:text-sm">
										{label}
									</p>
								</motion.div>
							))}
						</div>
					</motion.div>

					<div className="hero-dash-bleed relative w-full min-w-0 lg:min-w-[28rem] xl:min-w-[32rem]">
						<HeroDashboard
							isRevealed={isRevealed}
							shouldAnimate={shouldAnimate}
						/>
					</div>
				</div>
			</div>
		</section>
	);
}
