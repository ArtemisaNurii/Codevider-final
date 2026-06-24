"use client";

import { Activity, Target, TrendingUp, Users } from "lucide-react";
import { motion, useReducedMotion } from "motion/react";
import { useTranslations } from "next-intl";
import {
	appleRevealEase,
	revealTransition,
	sectionRevealInitial,
	sectionRevealItem,
} from "@/hooks/use-section-reveal";

const REVENUE_BARS = [38, 52, 44, 58, 49, 64, 55, 71, 63, 77, 68, 84];
const PEAK_BAR_INDEX = REVENUE_BARS.indexOf(Math.max(...REVENUE_BARS));
const LATEST_BAR_INDEX = REVENUE_BARS.length - 1;

const cardReveal = {
	hidden: sectionRevealItem.hidden,
	visible: (delay: number) => ({
		...sectionRevealItem.visible,
		transition: {
			duration: 0.55,
			ease: appleRevealEase,
			delay,
		},
	}),
};

function MetricCard({
	label,
	value,
	delta,
	icon: Icon,
	delay,
	isRevealed,
	shouldAnimate,
}: {
	label: string;
	value: string;
	delta: string;
	icon: React.ElementType;
	delay: number;
	isRevealed: boolean;
	shouldAnimate: boolean;
}) {
	const shouldReduceMotion = useReducedMotion();

	return (
		<motion.div
			className="hero-dash-surface rounded-xl p-4 sm:p-5"
			initial={sectionRevealInitial(shouldReduceMotion)}
			animate={isRevealed ? "visible" : "hidden"}
			variants={cardReveal}
			custom={shouldReduceMotion || !shouldAnimate ? 0 : delay}
		>
			<div className="mb-3 flex items-center justify-between gap-2">
				<span className="text-xs font-medium uppercase tracking-wide text-[var(--dash-muted)]">
					{label}
				</span>
				<Icon
					className="size-3.5 shrink-0 text-[var(--dash-brand)]"
					aria-hidden
				/>
			</div>
			<p className="font-[family-name:var(--mono)] text-xl font-medium tabular-nums tracking-tight text-[var(--dash-text)] sm:text-2xl">
				{value}
			</p>
			<p className="mt-1.5 text-xs text-[var(--dash-success)]">{delta}</p>
		</motion.div>
	);
}

export default function HeroDashboard({
	isRevealed,
	shouldAnimate,
}: {
	isRevealed: boolean;
	shouldAnimate: boolean;
}) {
	const t = useTranslations("home.dashboard");
	const shouldReduceMotion = useReducedMotion();

	return (
		<motion.div
			className="hero-dash-window relative w-full overflow-hidden rounded-2xl border border-[var(--dash-border)] bg-[var(--dash-canvas)] shadow-[var(--dash-shadow)]"
			initial={shouldReduceMotion ? false : sectionRevealItem.hidden}
			animate={
				isRevealed ? sectionRevealItem.visible : sectionRevealItem.hidden
			}
			transition={revealTransition(shouldAnimate, {
				duration: 0.55,
				ease: appleRevealEase,
				delay: 0.15,
			})}
		>
			<div className="hero-dash-titlebar flex items-center gap-3 border-b border-[var(--dash-border)] px-4 py-3 sm:px-5">
				<div className="flex items-center gap-1.5" aria-hidden>
					<span className="size-2.5 rounded-full bg-[#ff5f57]" />
					<span className="size-2.5 rounded-full bg-[#febc2e]" />
					<span className="size-2.5 rounded-full bg-[#28c840]" />
				</div>
				<div className="min-w-0 flex-1 truncate rounded-md bg-[var(--dash-surface)] px-2.5 py-1 text-center text-xs text-[var(--dash-muted)]">
					{t("window_url")}
				</div>
			</div>

			<div className="space-y-4 p-4 sm:space-y-5 sm:p-5">
				<div className="grid grid-cols-2 gap-3 sm:gap-4">
					<MetricCard
						label={t("performance")}
						value="$284K"
						delta={t("performance_delta")}
						icon={TrendingUp}
						delay={0.2}
						isRevealed={isRevealed}
						shouldAnimate={shouldAnimate}
					/>
					<MetricCard
						label={t("growth")}
						value="12.4K"
						delta={t("growth_delta")}
						icon={Users}
						delay={0.3}
						isRevealed={isRevealed}
						shouldAnimate={shouldAnimate}
					/>
					<MetricCard
						label={t("system_health")}
						value="99.9%"
						delta={t("system_health_delta")}
						icon={Activity}
						delay={0.4}
						isRevealed={isRevealed}
						shouldAnimate={shouldAnimate}
					/>
					<MetricCard
						label={t("leads")}
						value="68%"
						delta={t("leads_delta")}
						icon={Target}
						delay={0.5}
						isRevealed={isRevealed}
						shouldAnimate={shouldAnimate}
					/>
				</div>

				<motion.div
					className="hero-dash-surface rounded-xl p-4 sm:p-5"
					initial={sectionRevealInitial(shouldReduceMotion)}
					animate={isRevealed ? "visible" : "hidden"}
					variants={cardReveal}
					custom={shouldReduceMotion || !shouldAnimate ? 0 : 0.55}
				>
					<div className="mb-4 flex items-end justify-between gap-2">
						<div>
							<p className="text-xs font-medium uppercase tracking-wide text-[var(--dash-muted)]">
								{t("revenue_overview")}
							</p>
							<p className="mt-0.5 font-[family-name:var(--mono)] text-lg font-medium tabular-nums text-[var(--dash-text)]">
								$1.2M
							</p>
						</div>
						<span className="text-xs text-[var(--dash-warning)]">
							{t("revenue_period")}
						</span>
					</div>

					<div
						className="grid h-28 grid-cols-12 gap-1 sm:h-32 sm:gap-1.5"
						role="img"
						aria-label={t("revenue_chart_label")}
					>
						{REVENUE_BARS.map((height, index) => (
							<div
								key={index}
								className="flex h-full flex-col justify-end rounded-sm bg-[var(--dash-bar-track)] p-0.5 sm:rounded-md sm:p-1"
							>
								<div
									className={`hero-dash-bar w-full rounded-[3px] sm:rounded-sm${
										index === PEAK_BAR_INDEX ? " hero-dash-bar--peak" : ""
									}${index === LATEST_BAR_INDEX ? " hero-dash-bar--latest" : ""}`}
									style={{ height: `${height}%`, minHeight: "10px" }}
								/>
							</div>
						))}
					</div>

					<div className="mt-2 flex justify-between text-xs text-[var(--dash-muted)]">
						<span>{t("week_1")}</span>
						<span>{t("week_6")}</span>
						<span>{t("week_12")}</span>
					</div>
				</motion.div>
			</div>
		</motion.div>
	);
}
