"use client";

import { ArrowRight } from "lucide-react";
import { motion, useReducedMotion } from "motion/react";
import { useTranslations } from "next-intl";
import {
	sectionRevealItem,
	sectionRevealStagger,
	useSectionReveal,
} from "@/hooks/use-section-reveal";
import { Link } from "@/i18n/navigation";

const STAGGER = 0.1;

const itemVariants = sectionRevealItem;

const statDescVariants = {
	hidden: { opacity: 0, y: 8, filter: "blur(4px)" },
	visible: {
		opacity: 1,
		y: 0,
		filter: "blur(0px)",
		transition: {
			duration: 0.5,
			ease: [0.2, 0, 0, 1] as const,
			delay: 0.12,
		},
	},
};

const STATS = [
	{
		valueKey: "stat_global_partnerships_value", // {value}+
		labelKey: "stat_global_partnerships",
		wide: false,
		tone: "stat-card--partnerships",
		value: 30,
	},
	{
		valueKey: "stat_delivery_velocity_value", // {value}%
		labelKey: "stat_delivery_velocity",
		wide: false,
		tone: "stat-card--accent",
		value: 60,
	},
	{
		valueKey: "stat_elite_engineers_value", // {value}+
		labelKey: "stat_elite_engineers",
		wide: true,
		tone: "stat-card--engineers",
		value: 25,
	},
] as const;

function StatCard({
	value,
	label,
	index,
	isRevealed,
	shouldAnimate,
	shouldReduceMotion,
	wide,
	tone,
}: {
	value: string;
	label: string;
	index: number;
	isRevealed: boolean;
	shouldAnimate: boolean;
	shouldReduceMotion: boolean | null;
	wide: boolean;
	tone: string;
}) {
	return (
		<motion.div
			className={`stat-card ${tone} flex h-full flex-col justify-between wrap-break-word gap-6 rounded-2xl p-7 sm:p-9 ${wide ? "sm:col-span-2" : ""}`}
			initial={shouldReduceMotion || !shouldAnimate ? false : "hidden"}
			animate={isRevealed ? "visible" : "hidden"}
			variants={{
				hidden: {},
				visible: {
					transition: {
						staggerChildren: 0.08,
						delayChildren: 0.35 + index * STAGGER,
					},
				},
			}}
		>
			<motion.p
				className="stat-card-value font-(family-name:--mono) text-[clamp(2rem,4vw,2.75rem)] font-medium tabular-nums tracking-tight"
				variants={itemVariants}
			>
				{value}
			</motion.p>
			<motion.p
				className={`stat-card-cap text-pretty text-sm leading-relaxed sm:text-base ${wide ? "max-w-2xl" : ""}`}
				variants={statDescVariants}
			>
				{label}
			</motion.p>
		</motion.div>
	);
}

export default function WhoWeAre() {
	const t = useTranslations("home");
	const {
		ref: sectionRef,
		isRevealed,
		shouldAnimate,
	} = useSectionReveal({
		margin: "-10% 0px -10% 0px",
	});
	const shouldReduceMotion = useReducedMotion();

	return (
		<section
			ref={sectionRef}
			aria-labelledby="who-we-are-heading"
			className="home-section home-feature-alt"
		>
			<div className="home-wrap grid w-full gap-14 lg:grid-cols-2 lg:gap-20 xl:gap-24">
				<motion.div
					initial={shouldReduceMotion || !shouldAnimate ? false : "hidden"}
					animate={isRevealed ? "visible" : "hidden"}
					variants={sectionRevealStagger}
				>
					<motion.p className="home-eyebrow" variants={itemVariants}>
						{t("who_we_are_eyebrow")}
					</motion.p>

					<motion.h2
						id="who-we-are-heading"
						className="mt-[clamp(1.125rem,2.5vw,1.5rem)] max-w-xl text-balance text-[clamp(1.75rem,3.5vw,2.5rem)] leading-[1.12] tracking-[-0.02em] text-(--text-h)"
						variants={itemVariants}
					>
						{t("who_we_are_headline")}
					</motion.h2>

					<motion.p
						className="mt-8  text-pretty text-base leading-relaxed text-[var(--text)] sm:mt-10 sm:text-lg"
						variants={itemVariants}
					>
						{t("who_we_are_description")}
					</motion.p>

					<motion.div variants={itemVariants} className="mt-10 sm:mt-12">
						<Link href="/about" className="home-ghost-btn">
							{t("read_more_about_us")}
							<ArrowRight className="size-4" aria-hidden />
						</Link>
					</motion.div>
				</motion.div>

				<div className="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-5 lg:pl-6">
					{STATS.map(({ valueKey, labelKey, wide, tone, value }, index) => (
						<StatCard
							key={valueKey}
							value={t(valueKey, { value })}
							label={t(labelKey, { value })}
							index={index}
							isRevealed={isRevealed}
							shouldAnimate={shouldAnimate}
							shouldReduceMotion={shouldReduceMotion}
							wide={wide}
							tone={tone}
						/>
					))}
				</div>
			</div>
		</section>
	);
}
