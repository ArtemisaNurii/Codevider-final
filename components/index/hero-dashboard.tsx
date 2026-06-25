"use client";

import { Activity, Target, TrendingUp, Users } from "lucide-react";
import { motion, useReducedMotion } from "motion/react";
import { useTranslations } from "next-intl";
import { appleRevealEase, useMounted } from "@/hooks/use-section-reveal";

const REVENUE_BARS = [38, 52, 44, 58, 49, 64, 55, 71, 63, 77, 68, 84] as const;
const PEAK_BAR_INDEX = REVENUE_BARS.findIndex((bar) => bar === 84);
const LATEST_BAR_INDEX = REVENUE_BARS.length - 1;
const CHART_HEIGHT_PX = 112;
const CHART_HEIGHT_PX_SM = 128;
const BAR_MIN_HEIGHT_PX = 10;

const instantTransition = { duration: 0 } as const;

function barHeightPx(value: number) {
	return Math.max(
		BAR_MIN_HEIGHT_PX,
		Math.round((value / 100) * CHART_HEIGHT_PX),
	);
}

function barHeightPxSm(value: number) {
	return Math.max(
		BAR_MIN_HEIGHT_PX,
		Math.round((value / 100) * CHART_HEIGHT_PX_SM),
	);
}

const METRICS_BASE = [
	{
		key: "performance",
		amount: "284K",
		useCurrency: true,
		deltaKey: "performance_delta",
		icon: TrendingUp,
	},
	{ key: "growth", amount: "12.4K", useCurrency: false, deltaKey: "growth_delta", icon: Users },
	{
		key: "system_health",
		amount: "99.9%",
		useCurrency: false,
		deltaKey: "system_health_delta",
		icon: Activity,
	},
	{ key: "leads", amount: "68%", useCurrency: false, deltaKey: "leads_delta", icon: Target },
] as const;

function MetricCard({
	label,
	value,
	delta,
	icon: Icon,
}: {
	label: string;
	value: string;
	delta: string;
	icon: React.ElementType;
}) {
	return (
		<>
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
		</>
	);
}

export default function HeroDashboard() {
	const t = useTranslations("home.dashboard");
	const tHome = useTranslations("home");
	const currency = tHome("base_currency");
	const currencyAfter = tHome("base_currency_position") === "after";
	const fmt = (amount: string) =>
		currencyAfter ? `${amount}${currency}` : `${currency}${amount}`;
	const mounted = useMounted();
	const shouldReduceMotion = useReducedMotion();

	// Before mount: initial=false so SSR HTML is fully visible, no opacity:0 mismatch.
	// After mount: animate normally.
	const animate = mounted && !shouldReduceMotion;

	const shellTransition = animate
		? { duration: 0.65, ease: appleRevealEase, delay: 0.36 }
		: instantTransition;

	const cardTransition = (index: number) =>
		animate
			? { duration: 0.45, ease: appleRevealEase, delay: 0.5 + index * 0.06 }
			: instantTransition;

	const chartTransition = animate
		? { duration: 0.45, ease: appleRevealEase, delay: 0.74 }
		: instantTransition;

	const barTransition = (index: number) =>
		animate
			? { duration: 0.5, ease: appleRevealEase, delay: 0.82 + index * 0.03 }
			: instantTransition;

	return (
		<motion.div
			className="hero-dash-window relative w-full overflow-hidden rounded-2xl border border-[var(--dash-border)] bg-[var(--dash-canvas)] shadow-[var(--dash-shadow)]"
			initial={animate ? { opacity: 0 } : false}
			animate={{ opacity: 1 }}
			transition={shellTransition}
		>
			<div className="hero-dash-titlebar flex h-12 items-center gap-3 border-b border-[var(--dash-border)] px-4 sm:px-5">
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
					{METRICS_BASE.map(({ key, amount, useCurrency, deltaKey, icon }, index) => {
					const value = useCurrency ? fmt(amount) : amount;
					return (
						<motion.div
							key={key}
							className="hero-dash-surface rounded-xl p-4 sm:p-5"
							initial={animate ? { opacity: 0 } : false}
							animate={{ opacity: 1 }}
							transition={cardTransition(index)}
							style={{ willChange: "opacity" }}
						>
							<MetricCard
								label={t(key)}
								value={value}
								delta={t(deltaKey)}
								icon={icon}
							/>
						</motion.div>
					);
					})}
				</div>

				<motion.div
					className="hero-dash-surface rounded-xl p-4 sm:p-5"
					initial={animate ? { opacity: 0, y: 12 } : false}
					animate={{ opacity: 1, y: 0 }}
					transition={chartTransition}
					style={{ willChange: "opacity, transform" }}
				>
					<div className="mb-4 flex items-end justify-between gap-2">
						<div>
							<p className="text-xs font-medium uppercase tracking-wide text-[var(--dash-muted)]">
								{t("revenue_overview")}
							</p>
							<p className="mt-0.5 font-[family-name:var(--mono)] text-lg font-medium tabular-nums text-[var(--dash-text)]">
								{fmt("1.2M")}
							</p>
						</div>
						<span className="text-xs text-[var(--dash-warning)]">
							{t("revenue_period")}
						</span>
					</div>

					<div
						className="hero-dash-chart grid grid-cols-12 gap-1 sm:gap-1.5"
						style={
							{
								"--hero-dash-chart-h": `${CHART_HEIGHT_PX}px`,
								"--hero-dash-chart-h-sm": `${CHART_HEIGHT_PX_SM}px`,
							} as React.CSSProperties
						}
						role="img"
						aria-label={t("revenue_chart_label")}
					>
						{REVENUE_BARS.map((value, index) => (
							<div
								key={index}
								className="flex h-[var(--hero-dash-chart-h)] flex-col justify-end rounded-sm bg-[var(--dash-bar-track)] p-0.5 sm:h-[var(--hero-dash-chart-h-sm)] sm:rounded-md sm:p-1"
							>
								<motion.div
									className={`hero-dash-bar w-full origin-bottom rounded-[3px] sm:rounded-sm${
										index === PEAK_BAR_INDEX ? " hero-dash-bar--peak" : ""
									}${index === LATEST_BAR_INDEX ? " hero-dash-bar--latest" : ""}`}
									style={
										{
											"--hero-dash-bar-h": `${barHeightPx(value)}px`,
											"--hero-dash-bar-h-sm": `${barHeightPxSm(value)}px`,
											willChange: "transform",
										} as React.CSSProperties
									}
									initial={animate ? { scaleY: 0 } : false}
									animate={{ scaleY: 1 }}
									transition={barTransition(index)}
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
