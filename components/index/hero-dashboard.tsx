"use client";

import { Activity, Rocket, Target, TrendingUp, Users } from "lucide-react";
import { motion } from "motion/react";
import { useTranslations } from "next-intl";

const REVENUE_BARS = [38, 52, 44, 58, 49, 64, 55, 71, 63, 77, 68, 84];

const TRANSACTION_KEYS = ["tx_1", "tx_2", "tx_3"] as const;

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
		<div className="hero-dash-surface rounded-xl p-4 sm:p-5">
			<div className="mb-3 flex items-center justify-between gap-2">
				<span className="text-[11px] font-medium uppercase tracking-wide text-[var(--dash-muted)]">
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
		</div>
	);
}

export default function HeroDashboard() {
	const t = useTranslations("home.dashboard");

	return (
		<motion.div
			className="hero-dash-window relative w-full overflow-hidden rounded-2xl border border-[var(--dash-border)] bg-[var(--dash-canvas)] shadow-[var(--dash-shadow)]"
			initial={false}
		>
			<div className="flex items-center gap-3 border-b border-[var(--dash-border)] px-4 py-3 sm:px-5">
				<div className="flex items-center gap-1.5" aria-hidden>
					<span className="size-2.5 rounded-full bg-[#ff5f57]" />
					<span className="size-2.5 rounded-full bg-[#febc2e]" />
					<span className="size-2.5 rounded-full bg-[#28c840]" />
				</div>
				<div className="min-w-0 flex-1 truncate rounded-md bg-[var(--dash-surface)] px-2.5 py-1 text-center text-[10px] text-[var(--dash-muted)] sm:text-[11px]">
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
					/>
					<MetricCard
						label={t("growth")}
						value="12.4K"
						delta={t("growth_delta")}
						icon={Users}
					/>
					<MetricCard
						label={t("system_health")}
						value="99.9%"
						delta={t("system_health_delta")}
						icon={Activity}
					/>
					<MetricCard
						label={t("leads")}
						value="68%"
						delta={t("leads_delta")}
						icon={Target}
					/>
				</div>

				<div className="hero-dash-surface rounded-xl p-4 sm:p-5">
					<div className="mb-4 flex items-end justify-between gap-2">
						<div>
							<p className="text-[11px] font-medium uppercase tracking-wide text-[var(--dash-muted)]">
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
									className="hero-dash-bar w-full rounded-[3px] sm:rounded-sm"
									style={{ height: `${height}%`, minHeight: "10px" }}
								/>
							</div>
						))}
					</div>

					<div className="mt-2 flex justify-between text-[9px] text-[var(--dash-muted)] sm:text-[10px]">
						<span>{t("week_1")}</span>
						<span>{t("week_6")}</span>
						<span>{t("week_12")}</span>
					</div>
				</div>

				<div className="relative pb-2 sm:pb-3">
					<div className="hero-dash-surface rounded-xl p-4 sm:p-5">
						<p className="mb-3 text-[11px] font-medium uppercase tracking-wide text-[var(--dash-muted)]">
							{t("transactions")}
						</p>
						<ul className="space-y-3">
							{TRANSACTION_KEYS.map((key) => (
								<li
									key={key}
									className="flex items-center justify-between gap-3 border-b border-[var(--dash-border)] pb-3 last:border-0 last:pb-0"
								>
									<div className="min-w-0">
										<p className="truncate text-xs font-medium text-[var(--dash-text)]">
											{t(`${key}_title`)}
										</p>
										<p className="text-[10px] text-[var(--dash-muted)]">
											{t(`${key}_meta`)}
										</p>
									</div>
									<span
										className={`shrink-0 font-[family-name:var(--mono)] text-xs tabular-nums ${
											key === "tx_3"
												? "text-[var(--dash-warning)]"
												: "text-[var(--dash-success)]"
										}`}
									>
										{t(`${key}_amount`)}
									</span>
								</li>
							))}
						</ul>
					</div>

					<div
						className="absolute -bottom-1 right-0 z-10 max-w-[85%] rounded-xl border border-[var(--dash-border)] bg-[var(--dash-surface)] p-4 shadow-[var(--dash-toast-shadow)] sm:-bottom-2 sm:max-w-[72%]"
						role="status"
						aria-live="polite"
					>
						<div className="flex items-start gap-2.5">
							<span className="flex size-7 shrink-0 items-center justify-center rounded-lg bg-[var(--dash-brand-bg)] text-[var(--dash-brand)]">
								<Rocket className="size-3.5" aria-hidden />
							</span>
							<div className="min-w-0">
								<p className="text-xs font-medium text-[var(--dash-text)]">
									{t("toast_title")}
								</p>
								<p className="mt-0.5 text-[10px] leading-snug text-[var(--dash-muted)]">
									{t("toast_message")}
								</p>
							</div>
						</div>
					</div>
				</div>
			</div>
		</motion.div>
	);
}
