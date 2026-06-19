"use client";

import { ArrowRight } from "lucide-react";
import { motion, useInView, useReducedMotion } from "motion/react";
import { Link } from "@/i18n/navigation";
import { useRef } from "react";
import { useTranslations } from "next-intl";

const STAGGER = 0.1;

const containerVariants = {
	hidden: {},
	visible: {
		transition: {
			staggerChildren: STAGGER,
			delayChildren: 0.05,
		},
	},
};

const itemVariants = {
	hidden: { opacity: 0, y: 16 },
	visible: {
		opacity: 1,
		y: 0,
		transition: { type: "spring" as const, duration: 0.45, bounce: 0 },
	},
};

const statDescVariants = {
	hidden: { opacity: 0, y: 8 },
	visible: {
		opacity: 1,
		y: 0,
		transition: {
			type: "spring" as const,
			duration: 0.4,
			bounce: 0,
			delay: 0.12,
		},
	},
};

const STATS = [
	{
		valueKey: "stat_global_partnerships_value",
		labelKey: "stat_global_partnerships",
		wide: false,
		tone: "stat-card--partnerships",
	},
	{
		valueKey: "stat_delivery_velocity_value",
		labelKey: "stat_delivery_velocity",
		wide: false,
		tone: "stat-card--accent",
	},
	{
		valueKey: "stat_elite_engineers_value",
		labelKey: "stat_elite_engineers",
		wide: true,
		tone: "stat-card--engineers",
	},
] as const;

function StatCard({
	value,
	label,
	index,
	inView,
	shouldReduceMotion,
	wide,
	tone,
}: {
	value: string;
	label: string;
	index: number;
	inView: boolean;
	shouldReduceMotion: boolean | null;
	wide: boolean;
	tone: string;
}) {
	return (
		<motion.div
			className={`stat-card ${tone} flex h-full flex-col justify-between gap-6 rounded-2xl p-7 sm:p-9 ${wide ? "sm:col-span-2" : ""}`}
			initial={shouldReduceMotion ? false : "hidden"}
			animate={inView ? "visible" : "hidden"}
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
				className="font-[family-name:var(--mono)] text-[clamp(2rem,4vw,2.75rem)] font-medium tabular-nums tracking-tight text-white"
				variants={itemVariants}
			>
				{value}
			</motion.p>
			<motion.p
				className={`stat-card-cap text-pretty text-sm leading-relaxed text-blue-100/75 sm:text-base ${wide ? "max-w-2xl" : ""}`}
				variants={statDescVariants}
			>
				{label}
			</motion.p>
		</motion.div>
	);
}

export default function WhoWeAre() {
	const t = useTranslations("home");
	const sectionRef = useRef<HTMLElement>(null);
	const inView = useInView(sectionRef, {
		once: true,
		margin: "-10% 0px -10% 0px",
	});
	const shouldReduceMotion = useReducedMotion();

	return (
		<section
			ref={sectionRef}
			aria-labelledby="who-we-are-heading"
			className="home-section"
		>
			<div className="home-wrap grid w-full gap-14 lg:grid-cols-2 lg:gap-20 xl:gap-24">
				<motion.div
					initial={shouldReduceMotion ? false : "hidden"}
					animate={inView ? "visible" : "hidden"}
					variants={containerVariants}
				>
					<motion.p className="home-eyebrow mb-0" variants={itemVariants}>
						{t("who_we_are_eyebrow")}
					</motion.p>

					<motion.h2
						id="who-we-are-heading"
						className="mt-[clamp(1.125rem,2.5vw,1.5rem)] max-w-xl text-balance text-[clamp(1.75rem,3.5vw,2.5rem)] leading-[1.12] tracking-[-0.02em] text-[var(--text-h)]"
						variants={itemVariants}
					>
						{t("who_we_are_headline")}
					</motion.h2>

					<motion.p
						className="mt-8 max-w-xl text-pretty text-base leading-relaxed text-[var(--text)] sm:mt-10 sm:text-lg"
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
					{STATS.map(({ valueKey, labelKey, wide, tone }, index) => (
						<StatCard
							key={valueKey}
							value={t(valueKey)}
							label={t(labelKey)}
							index={index}
							inView={inView}
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
