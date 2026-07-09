"use client";

import {
	ArrowUpRight,
	Bot,
	Check,
	ChevronLeft,
	ChevronRight,
	Cloud,
	Code2,
	FlaskConical,
	Loader2,
	Package,
	Play,
	Rocket,
	Users,
} from "lucide-react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { useTranslations } from "next-intl";
import type { CSSProperties } from "react";
import { Fragment, useCallback, useEffect, useRef, useState } from "react";
import dynamic from "next/dynamic";

const SyntaxHighlighter = dynamic(
	() => import("react-syntax-highlighter").then((mod) => mod.Prism),
	{ ssr: false },
);
import {
	ENGINEERING_DEMO_CODE,
	ENGINEERING_DEMO_TABS,
	type EngineeringDemoTab,
} from "@/data/engineering-demo-code";
import {
	appleRevealEase,
	sectionItemTransition,
	sectionRevealItem,
	useSectionReveal,
} from "@/hooks/use-section-reveal";
import { Link } from "@/i18n/navigation";
import SectionHead from "./section-head";

const ENGINEERING_CODE_LANGUAGES = {
	orders: "typescript",
	schema: "sql",
	deploy: "yaml",
} as const;

const engineeringCodeTheme: Record<string, CSSProperties> = {
	'code[class*="language-"]': {
		color: "#e6edf3",
		background: "none",
		fontFamily: "var(--mono)",
		textAlign: "left",
		whiteSpace: "pre",
		wordSpacing: "normal",
		wordBreak: "normal",
		wordWrap: "normal",
	},
	'pre[class*="language-"]': {
		color: "#e6edf3",
		background: "transparent",
		margin: 0,
		padding: 0,
		overflow: "visible",
	},
	comment: { color: "#6b7280", fontStyle: "italic" },
	prolog: { color: "#6b7280" },
	punctuation: { color: "#8b949e" },
	property: { color: "#79c0ff" },
	tag: { color: "#7ee787" },
	boolean: { color: "#ff7b72" },
	number: { color: "#f2cc60" },
	constant: { color: "#79c0ff" },
	symbol: { color: "#f2cc60" },
	selector: { color: "#7ee787" },
	"attr-name": { color: "#79c0ff" },
	string: { color: "#a5d6ff" },
	char: { color: "#a5d6ff" },
	builtin: { color: "#ffa657" },
	operator: { color: "#ff7b72" },
	entity: { color: "#79c0ff" },
	url: { color: "#a5d6ff" },
	variable: { color: "#e6edf3" },
	atrule: { color: "#c792ea" },
	"attr-value": { color: "#a5d6ff" },
	function: { color: "#d2a8ff" },
	"class-name": { color: "#ffa657" },
	keyword: { color: "#ff7b72" },
	regex: { color: "#a5d6ff" },
	important: { color: "#ff7b72", fontWeight: "bold" },
	bold: { fontWeight: "bold" },
	italic: { fontStyle: "italic" },
};

const reveal = sectionRevealItem;

const listReveal = {
	hidden: {},
	visible: {
		transition: { staggerChildren: 0.08 },
	},
} as const;

function FeatureCheckList({ items }: { items: string[] }) {
	return (
		<motion.ul className="grid gap-4" variants={listReveal}>
			{items.map((item) => (
				<motion.li
					key={item}
					variants={reveal}
					className="flex items-start gap-3.5 text-pretty text-[15px] leading-relaxed text-[var(--text-h)]/80"
				>
					<span className="home-check mt-0.5">
						<Check className="size-3.5" strokeWidth={3} aria-hidden />
					</span>
					{item}
				</motion.li>
			))}
		</motion.ul>
	);
}

function AiDemo() {
	const t = useTranslations("home.features.ai.demo");
	const chips = useRef([
		{ id: "tickets" as const, qKey: "chip_tickets_q", aKey: "chip_tickets_a" },
		{ id: "leads" as const, qKey: "chip_leads_q", aKey: "chip_leads_a" },
		{
			id: "schedule" as const,
			qKey: "chip_schedule_q",
			aKey: "chip_schedule_a",
		},
	]);
	const [active, setActive] =
		useState<(typeof chips.current)[number]["id"]>("tickets");
	const [answer, setAnswer] = useState("");
	const typeTimerRef = useRef<number | null>(null);
	const { ref, isRevealed } = useSectionReveal<HTMLDivElement>();
	const started = useRef(false);
	const shouldReduceMotion = useReducedMotion();

	const typeAnswer = useCallback(
		(text: string) => {
			if (typeTimerRef.current) {
				window.clearTimeout(typeTimerRef.current);
				typeTimerRef.current = null;
			}

			if (shouldReduceMotion) {
				setAnswer(text);
				return;
			}

			setAnswer("");
			let i = 0;
			const tick = () => {
				i += 1;
				setAnswer(text.slice(0, i));
				if (i < text.length) {
					typeTimerRef.current = window.setTimeout(tick, 16);
				}
			};
			tick();
		},
		[shouldReduceMotion],
	);

	const selectChip = useCallback(
		(chip: (typeof chips.current)[number]) => {
			setActive(chip.id);
			typeAnswer(t(chip.aKey));
		},
		[t, typeAnswer],
	);

	useEffect(() => {
		if (isRevealed && !started.current) {
			started.current = true;
			selectChip(chips.current[0]);
		}
	}, [isRevealed, selectChip]);

	useEffect(
		() => () => {
			if (typeTimerRef.current) {
				window.clearTimeout(typeTimerRef.current);
			}
		},
		[],
	);

	const activeChip =
		chips.current.find((c) => c.id === active) ?? chips.current[0];

	return (
		<div
			ref={ref}
			className="home-demo home-demo--ai"
		>
			<div className="home-demo-head home-demo-head--wrap min-w-0 overflow-hidden">
				<div
					className="home-demo-chip-list w-full min-w-0 max-w-full flex-nowrap overflow-x-auto overflow-y-hidden [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
					role="group"
					aria-label={t("title")}
				>
					{chips.current.map((chip) => (
						<button
							key={chip.id}
							type="button"
							aria-pressed={active === chip.id}
							onClick={() => selectChip(chip)}
							className={`home-demo-chip cursor-pointer ${active === chip.id ? "home-demo-chip--active" : ""}`}
						>
							{t(`chip_${chip.id}_label`)}
						</button>
					))}
				</div>
			</div>
			<div className="home-demo-body home-demo-body--chat">
				<div className="home-demo-chat-bubble home-demo-chat-bubble--user">
					{t(activeChip.qKey)}
				</div>
				<div
					className="home-demo-chat-bubble home-demo-chat-bubble--assistant"
					aria-live="polite"
					aria-atomic="true"
				>
					{answer}
				</div>
			</div>
			<div className="home-code-editor__status">
				<span className="grid size-5 place-items-center rounded-full bg-emerald-500/15 text-emerald-600">
					<Check className="size-3" strokeWidth={3} aria-hidden />
				</span>
				{t("status")}
			</div>
		</div>
	);
}

function CodeDemo() {
	const t = useTranslations("home.features.engineering.demo");
	const tabs = Object.keys(ENGINEERING_DEMO_TABS) as EngineeringDemoTab[];
	const [active, setActive] = useState<EngineeringDemoTab>("orders");
	const shouldReduceMotion = useReducedMotion();
	const code = ENGINEERING_DEMO_CODE[active];

	return (
		<div className="home-demo home-code-editor">
			<div className="home-code-editor__chrome">
				<div className="home-code-editor__lights" aria-hidden>
					<span className="home-code-editor__light home-code-editor__light--close" />
					<span className="home-code-editor__light home-code-editor__light--minimize" />
					<span className="home-code-editor__light home-code-editor__light--maximize" />
				</div>
				<div
					className="home-code-editor__tabs"
					role="tablist"
					aria-label={t("tabs_aria")}
				>
					{tabs.map((tab) => (
						<button
							key={tab}
							type="button"
							role="tab"
							id={`engineering-tab-${tab}`}
							aria-controls={`engineering-panel-${tab}`}
							aria-selected={active === tab}
							tabIndex={active === tab ? 0 : -1}
							onClick={() => setActive(tab)}
							className={`home-code-editor__tab cursor-pointer ${active === tab ? "home-code-editor__tab--active" : ""}`}
						>
							{ENGINEERING_DEMO_TABS[tab]}
						</button>
					))}
				</div>
			</div>
			<div
				className="home-code-editor__viewport"
				role="tabpanel"
				id={`engineering-panel-${active}`}
				aria-labelledby={`engineering-tab-${active}`}
			>
				<AnimatePresence mode="wait" initial={false}>
					<motion.div
						key={active}
						initial={shouldReduceMotion ? false : { opacity: 0, y: 8 }}
						animate={{ opacity: 1, y: 0 }}
						exit={shouldReduceMotion ? undefined : { opacity: 0, y: -6 }}
						transition={{ type: "spring", duration: 0.35, bounce: 0 }}
					>
						<SyntaxHighlighter
							language={ENGINEERING_CODE_LANGUAGES[active]}
							style={engineeringCodeTheme}
							wrapLongLines={false}
							customStyle={{
								margin: 0,
								padding: 0,
								background: "transparent",
							}}
						>
							{code.trimEnd()}
						</SyntaxHighlighter>
					</motion.div>
				</AnimatePresence>
			</div>
			<div className="home-code-editor__status">
				<span className="grid size-5 place-items-center rounded-full bg-emerald-500/15 text-emerald-600">
					<Check className="size-3" strokeWidth={3} aria-hidden />
				</span>
				{t("status")}
			</div>
		</div>
	);
}

const POD_ROLES = ["frontend", "backend", "qa", "pm"] as const;

function PodDemo() {
	const t = useTranslations("home.features.pod.demo");
	const [active, setActive] = useState<(typeof POD_ROLES)[number]>("frontend");

	const positions: Record<(typeof POD_ROLES)[number], string> = {
		frontend: "top-0 left-1/2 -translate-x-1/2 -translate-y-1/2",
		backend: "bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2",
		qa: "right-0 top-1/2 translate-x-1/2 -translate-y-1/2",
		pm: "left-0 top-1/2 -translate-x-1/2 -translate-y-1/2",
	};

	const avatars: Record<(typeof POD_ROLES)[number], string> = {
		frontend: "FE",
		backend: "BE",
		qa: "QA",
		pm: "PM",
	};

	const colors: Record<(typeof POD_ROLES)[number], string> = {
		frontend: "bg-(--pod-fe)",
		backend: "bg-(--pod-be)",
		qa: "bg-(--pod-qa)",
		pm: "bg-(--pod-pm)",
	};

	const titleColors: Record<(typeof POD_ROLES)[number], string> = {
		frontend: "text-(--pod-fe)",
		backend: "text-(--pod-be)",
		qa: "text-(--pod-qa)",
		pm: "text-(--pod-pm)",
	};

	return (
		<div className="home-demo">
			<div className="home-demo-head">
				<span className="flex items-center gap-2">{t("title")}</span>
				<span className="text-xs font-medium text-(--text)">
					{t("subtitle")}
				</span>
			</div>
			<div className="home-demo-pod-stage relative flex min-h-0 flex-1 items-center justify-center px-6">
				<div className="relative mx-auto size-[280px]">
					<span className="home-pod-ring absolute inset-0 rounded-full border-[1.5px] border-dashed border-(--border)" />
					<span className="home-pod-ring home-pod-ring--reverse absolute inset-[58px] rounded-full border-[1.5px] border-dashed border-(--border)" />
					<div className="absolute inset-0 grid place-items-center">
						<div className="relative z-[2] grid size-[110px] place-items-center rounded-full bg-(--dash-brand-solid) text-center text-sm font-semibold leading-tight whitespace-pre-line text-white shadow-[0_12px_30px_color-mix(in_srgb,var(--dash-brand-solid)_40%,transparent)]">
							{t("center")}
						</div>
					</div>
					{POD_ROLES.map((role) => (
						<button
							key={role}
							type="button"
							aria-pressed={active === role}
							onMouseEnter={() => setActive(role)}
							onFocus={() => setActive(role)}
							onClick={() => setActive(role)}
							className={`absolute z-[3] flex min-h-11 items-center gap-2 rounded-full border bg-(--bg) px-3.5 py-2 text-[13.5px] font-semibold shadow-sm transition-[transform,box-shadow,border-color] duration-200 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-(--dash-brand) active:scale-[0.96] motion-reduce:transition-none motion-reduce:hover:scale-100 motion-reduce:active:scale-100 ${positions[role]} ${
								active === role
									? "scale-105 border-[var(--dash-brand)] shadow-md"
									: "border-(--border) hover:scale-105 hover:border-[var(--dash-brand)]"
							}`}
						>
							<span
								className={`grid size-7 place-items-center rounded-full text-[11px] text-white ${colors[role]}`}
							>
								{avatars[role]}
							</span>
							{t(`role_${role}`)}
						</button>
					))}
				</div>
			</div>
			<p className="home-demo-body min-h-6 pt-0 text-center text-sm leading-relaxed text-[var(--text)]">
				<span className={`font-semibold ${titleColors[active]}`}>
					{t(`role_${active}`)}
				</span>
				{" — "}
				{t(`role_${active}_desc`)}
			</p>
		</div>
	);
}

function PipelineDemo() {
	const t = useTranslations("home.features.devops.demo");
	const stages = ["build", "test", "deploy"] as const;
	const stageIcons: Record<(typeof stages)[number], typeof Package> = {
		build: Package,
		test: FlaskConical,
		deploy: Rocket,
	};
	const [running, setRunning] = useState(false);
	const [doneCount, setDoneCount] = useState(0);
	const [activeStage, setActiveStage] = useState(-1);
	const [status, setStatus] = useState(t("idle"));
	const [live, setLive] = useState(false);
	const { ref, isRevealed } = useSectionReveal<HTMLDivElement>();
	const started = useRef(false);
	const shouldReduceMotion = useReducedMotion();

	const run = useCallback(() => {
		if (running) return;
		setRunning(true);
		setDoneCount(0);
		setActiveStage(0);
		setLive(false);

		if (shouldReduceMotion) {
			setDoneCount(stages.length);
			setActiveStage(-1);
			setLive(true);
			setRunning(false);
			return;
		}

		let step = 0;
		const next = () => {
			if (step > 0) {
				setDoneCount(step);
			}
			if (step < stages.length) {
				setActiveStage(step);
				setStatus(t(`status_${stages[step]}`));
				step += 1;
				window.setTimeout(next, 800);
			} else {
				setActiveStage(-1);
				setDoneCount(stages.length);
				setLive(true);
				setRunning(false);
			}
		};

		next();
	}, [running, shouldReduceMotion, t]);

	useEffect(() => {
		if (isRevealed && !started.current && !shouldReduceMotion) {
			started.current = true;
			run();
		}
	}, [isRevealed, run, shouldReduceMotion]);

	return (
		<div ref={ref} className="home-demo home-demo--pipeline">
			<div className="home-demo-head home-demo-head--pipeline">
				<div className="home-pipeline-head__row">
					<span className="flex items-center gap-2">
						<Cloud className="size-4 text-(--dash-brand)" aria-hidden />
						{t("title")}
					</span>
					{live ? (
						<div className="home-live-badge" role="status">
							<span className="home-live-badge__dot" aria-hidden />
							<span>{t("status_live_label")}</span>
						</div>
					) : (
						<span className="rounded-full bg-(--home-surface-muted) px-2.5 py-1 text-[11px] font-medium tracking-wide text-(--text) uppercase">
							{t("subtitle")}
						</span>
					)}
				</div>
				{live ? (
					<div className="home-pipeline-head__meta">
						<span className="rounded-full bg-(--home-surface-muted) px-2.5 py-1 text-[11px] font-medium tracking-wide text-(--text) uppercase">
							{t("subtitle")}
						</span>
					</div>
				) : null}
			</div>
			<div className="home-demo-body">
				<div className="home-pipeline-stages">
					<div className="home-pipeline-track">
						{stages.map((stage, i) => {
							const StageIcon = stageIcons[stage];

							return (
								<Fragment key={stage}>
									<div className="home-pipeline-track__cell">
										<div
											className={`grid size-11 place-items-center rounded-xl transition-[background-color,color,box-shadow] duration-300 ${
												doneCount > i
													? "bg-emerald-500/12 text-emerald-600 shadow-[0_1px_2px_rgba(16,185,129,0.12)]"
													: activeStage === i
														? "bg-(--dash-brand-bg) text-(--dash-brand) shadow-[0_1px_2px_color-mix(in_srgb,var(--dash-brand)_12%,transparent)]"
														: "bg-(--bg) text-(--text) shadow-[0_1px_2px_color-mix(in_srgb,var(--text-h)_6%,transparent)]"
											}`}
										>
											{doneCount > i ? (
												<Check
													className="size-5"
													strokeWidth={2.5}
													aria-hidden
												/>
											) : activeStage === i ? (
												<Loader2
													className="size-5 motion-reduce:animate-none animate-spin"
													aria-hidden
												/>
											) : (
												<StageIcon className="size-5" aria-hidden />
											)}
										</div>
									</div>
									{i < stages.length - 1 ? (
										<div
											className={`home-pipeline-track__connector ${
												doneCount > i
													? "home-pipeline-track__connector--done"
													: ""
											}`}
										/>
									) : null}
								</Fragment>
							);
						})}
						{stages.map((stage, i) => (
							<Fragment key={`label-${stage}`}>
								<span className="home-pipeline-track__label">
									{t(`stage_${stage}`)}
								</span>
								{i < stages.length - 1 ? (
									<span className="home-pipeline-track__gap" aria-hidden />
								) : null}
							</Fragment>
						))}
					</div>
				</div>
				<div className="home-pipeline-foot">
					<button
						type="button"
						onClick={run}
						disabled={running}
						className={`inline-flex min-h-11 items-center gap-2 rounded-full bg-(--text-h) px-[18px] py-2.5 text-sm font-semibold text-(--bg) transition-transform duration-200 hover:-translate-y-0.5 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-(--dash-brand) disabled:cursor-default disabled:opacity-50 disabled:transform-none active:scale-[0.96] motion-reduce:transition-none motion-reduce:hover:translate-y-0 motion-reduce:active:scale-100 ${running ? "cursor-not-allowed" : "cursor-pointer"}`}
					>
						<Play className="size-4 fill-current" aria-hidden />
						{running
							? t("running")
							: doneCount === stages.length
								? t("run_again")
								: t("run")}
					</button>
					{live ? (
						<p className="home-pipeline-status" role="status">
							{t("status_live_label")}
						</p>
					) : (
						<p className="home-pipeline-status" role="status">
							{status}
						</p>
					)}
				</div>
			</div>
		</div>
	);
}

type FeatureId = "ai" | "engineering" | "pod" | "devops";

type FeatureConfig = {
	id: FeatureId;
	icon: React.ReactNode;
	shortLabel: string;
	demo: React.ReactNode;
	href: string;
};

const AUTOPLAY_MS = 6500;

function ActiveIconRail({ feature }: { feature: FeatureConfig }) {
	const t = useTranslations(`home.features.${feature.id}`);

	return (
		<>
			<div className="services-accordion__header-start">
				<span className="services-accordion__strip-icon">{feature.icon}</span>
				<span className="services-accordion__service-label">{t("badge")}</span>
			</div>
			<Link
				href={feature.href}
				className="home-link-arrow services-accordion__header-link shrink-0 whitespace-nowrap"
			>
				{t("link")}
				<ArrowUpRight className="size-4" aria-hidden />
			</Link>
		</>
	);
}

function ActivePanelContent({
	feature,
	headlineId,
}: {
	feature: FeatureConfig;
	headlineId: string;
}) {
	const t = useTranslations(`home.features.${feature.id}`);
	const bullets = [t("bullet_1"), t("bullet_2"), t("bullet_3")];

	return (
		<div className="services-accordion__active-grid">
			<div className="services-accordion__top-bar">
				<span className="services-accordion__service-label">{t("badge")}</span>
				<Link
					href={feature.href}
					className="home-link-arrow shrink-0 whitespace-nowrap"
				>
					{t("link")}
					<ArrowUpRight className="size-4" aria-hidden />
				</Link>
			</div>

			<div className="services-accordion__copy">
				<h3
					id={headlineId}
					className="m-0 text-balance text-[clamp(1.5rem,2.8vw,2.25rem)] leading-[1.1] tracking-[-0.02em] text-[var(--text-h)]"
				>
					{t("headline")}
				</h3>
				<p className="max-w-[62ch] text-pretty text-[16px] leading-relaxed text-[var(--text)] sm:text-[17px]">
					{t("description")}
				</p>
				<FeatureCheckList items={bullets} />
			</div>

			<div className="services-accordion__demo">{feature.demo}</div>
		</div>
	);
}

const panelContentTransition = {
	duration: 0.22,
	ease: appleRevealEase,
} as const;

function ServicesAccordion({ features }: { features: FeatureConfig[] }) {
	const tSection = useTranslations("home.core_services");
	const shouldReduceMotion = useReducedMotion();
	const [activeIndex, setActiveIndex] = useState(0);
	const [progressKey, setProgressKey] = useState(0);
	const [isPaused, setIsPaused] = useState(false);
	const timerRef = useRef<number | null>(null);
	const activeFeature = features[activeIndex] ?? features[0];
	const headlineId = `${activeFeature.id}-headline`;

	const clearTimer = useCallback(() => {
		if (timerRef.current) {
			window.clearInterval(timerRef.current);
			timerRef.current = null;
		}
	}, []);

	const selectIndex = useCallback(
		(index: number) => {
			const normalized =
				((index % features.length) + features.length) % features.length;
			setActiveIndex(normalized);
			setProgressKey((key) => key + 1);
		},
		[features.length],
	);

	const goNext = useCallback(() => {
		selectIndex(activeIndex + 1);
	}, [activeIndex, selectIndex]);

	const goPrev = useCallback(() => {
		selectIndex(activeIndex - 1);
	}, [activeIndex, selectIndex]);

	const handleSelect = useCallback(
		(index: number) => {
			if (index === activeIndex) return;
			selectIndex(index);
			setIsPaused(true);
		},
		[activeIndex, selectIndex],
	);

	useEffect(() => {
		clearTimer();
		if (shouldReduceMotion || isPaused) return;

		timerRef.current = window.setInterval(() => {
			setActiveIndex((current) => (current + 1) % features.length);
			setProgressKey((key) => key + 1);
		}, AUTOPLAY_MS);

		return clearTimer;
	}, [
		activeIndex,
		clearTimer,
		features.length,
		isPaused,
		shouldReduceMotion,
	]);

	useEffect(() => clearTimer, [clearTimer]);

	const handlePointerLeave = useCallback(() => {
		setIsPaused(false);
		setProgressKey((key) => key + 1);
	}, []);

	return (
		<div
			className="services-accordion"
			onMouseEnter={() => setIsPaused(true)}
			onMouseLeave={handlePointerLeave}
			onFocusCapture={() => setIsPaused(true)}
			onBlurCapture={(event) => {
				if (!event.currentTarget.contains(event.relatedTarget as Node | null)) {
					handlePointerLeave();
				}
			}}
		>
			<div
				className="services-accordion__track"
				role="tablist"
				aria-label={tSection("accordion_aria")}
			>
				{features.map((feature, index) => {
					const isActive = index === activeIndex;
					const panelHeadlineId = `${feature.id}-headline`;

					return (
						<article
							key={feature.id}
							data-service={feature.id}
							role="tab"
							aria-selected={isActive}
							aria-controls={`service-panel-${feature.id}`}
							id={`service-tab-${feature.id}`}
							className={
								isActive
									? "services-accordion__panel services-accordion__panel--active"
									: "services-accordion__panel services-accordion__panel--collapsed"
							}
							onClick={
								isActive
									? undefined
									: () => handleSelect(index)
							}
							onKeyDown={(event) => {
								if (isActive) return;
								if (event.key === "Enter" || event.key === " ") {
									event.preventDefault();
									handleSelect(index);
								}
							}}
							tabIndex={isActive ? -1 : 0}
						>
							<div
								className={
									isActive
										? "services-accordion__icon-rail services-accordion__icon-rail--active"
										: "services-accordion__icon-rail"
								}
							>
								{isActive ? (
									<ActiveIconRail feature={feature} />
								) : (
									<span className="services-accordion__strip-icon">
										{feature.icon}
									</span>
								)}
							</div>

							{isActive ? (
								<div
									id={`service-panel-${feature.id}`}
									role="tabpanel"
									aria-labelledby={panelHeadlineId}
									className="services-accordion__active"
								>
									<AnimatePresence mode="wait" initial={false}>
										<motion.div
											key={feature.id}
											className="services-accordion__active-body"
											initial={
												shouldReduceMotion ? false : { opacity: 0 }
											}
											animate={{ opacity: 1 }}
											exit={
												shouldReduceMotion ? undefined : { opacity: 0 }
											}
											transition={panelContentTransition}
										>
											<ActivePanelContent
												feature={feature}
												headlineId={panelHeadlineId}
											/>
										</motion.div>
									</AnimatePresence>

									<div className="services-accordion__nav">
										<button
											type="button"
											className="services-accordion__nav-btn"
											onClick={goPrev}
											aria-label={tSection("prev_service")}
										>
											<ChevronLeft className="size-4" aria-hidden />
										</button>
										<button
											type="button"
											className="services-accordion__nav-btn"
											onClick={goNext}
											aria-label={tSection("next_service")}
										>
											<ChevronRight className="size-4" aria-hidden />
										</button>
									</div>

									{!shouldReduceMotion && !isPaused ? (
										<div
											className="services-accordion__progress"
											aria-hidden
										>
											<motion.div
												key={progressKey}
												className="services-accordion__progress-bar"
												initial={{ scaleX: 0 }}
												animate={{ scaleX: 1 }}
												transition={{
													duration: AUTOPLAY_MS / 1000,
													ease: "linear",
												}}
											/>
										</div>
									) : null}
								</div>
							) : (
								<div
									className="services-accordion__strip"
									aria-label={tSection("select_service", {
										service: feature.shortLabel,
									})}
								>
									<span className="services-accordion__strip-label">
										{feature.shortLabel}
									</span>
								</div>
							)}
						</article>
					);
				})}
			</div>

			<div className="services-accordion__mobile flex flex-col gap-4">
				<div
					className="services-accordion__mobile-tabs"
					role="tablist"
					aria-label={tSection("accordion_aria")}
				>
					{features.map((feature, index) => (
						<button
							key={feature.id}
							type="button"
							role="tab"
							data-service={feature.id}
							aria-selected={index === activeIndex}
							aria-controls={`service-mobile-panel-${feature.id}`}
							id={`service-mobile-tab-${feature.id}`}
							className="services-accordion__mobile-tab"
							onClick={() => selectIndex(index)}
						>
							<span className="grid size-7 place-items-center rounded-lg bg-(--home-surface-muted) text-(--panel-accent)">
								{feature.icon}
							</span>
							{feature.shortLabel}
						</button>
					))}
				</div>

				<article
					data-service={activeFeature.id}
					className="services-accordion__panel services-accordion__panel--active overflow-hidden"
					role="tabpanel"
					id={`service-mobile-panel-${activeFeature.id}`}
					aria-labelledby={`service-mobile-tab-${activeFeature.id}`}
				>
					<div className="services-accordion__active">
						<AnimatePresence mode="wait" initial={false}>
							<motion.div
								key={activeFeature.id}
								className="services-accordion__active-body"
								initial={shouldReduceMotion ? false : { opacity: 0 }}
								animate={{ opacity: 1 }}
								exit={shouldReduceMotion ? undefined : { opacity: 0 }}
								transition={panelContentTransition}
							>
								<ActivePanelContent
									feature={activeFeature}
									headlineId={headlineId}
								/>
							</motion.div>
						</AnimatePresence>

						<div className="services-accordion__nav">
							<button
								type="button"
								className="services-accordion__nav-btn"
								onClick={goPrev}
								aria-label={tSection("prev_service")}
							>
								<ChevronLeft className="size-4" aria-hidden />
							</button>
							<button
								type="button"
								className="services-accordion__nav-btn"
								onClick={goNext}
								aria-label={tSection("next_service")}
							>
								<ChevronRight className="size-4" aria-hidden />
							</button>
						</div>
					</div>
				</article>
			</div>
		</div>
	);
}

export default function CoreServices() {
	const t = useTranslations("home.core_services");
	const { ref, isRevealed, shouldAnimate } = useSectionReveal();
	const shouldReduceMotion = useReducedMotion();

	const tFeatures = useTranslations("home.features");

	const features: FeatureConfig[] = [
		{
			id: "ai",
			shortLabel: tFeatures("ai.short_label"),
			icon: <Bot className="size-5" aria-hidden />,
			demo: <AiDemo />,
			href: "/services#ai",
		},
		{
			id: "engineering",
			shortLabel: tFeatures("engineering.short_label"),
			icon: <Code2 className="size-5" aria-hidden />,
			demo: <CodeDemo />,
			href: "/services#custom",
		},
		{
			id: "pod",
			shortLabel: tFeatures("pod.short_label"),
			icon: <Users className="size-5" aria-hidden />,
			demo: <PodDemo />,
			href: "/services#team",
		},
		{
			id: "devops",
			shortLabel: tFeatures("devops.short_label"),
			icon: <Cloud className="size-5" aria-hidden />,
			demo: <PipelineDemo />,
			href: "/services#cloud",
		},
	];

	return (
		<section
			ref={ref}
			id="services"
			className="home-section--tight pt-[clamp(56px,8vw,96px)] pb-[clamp(48px,6vw,80px)]"
		>
			<div className="home-wrap flex flex-col gap-[clamp(2rem,5vw,3.5rem)]">
				<motion.div
					initial={
						shouldReduceMotion || !shouldAnimate
							? false
							: sectionRevealItem.hidden
					}
					animate={
						isRevealed ? sectionRevealItem.visible : sectionRevealItem.hidden
					}
					transition={sectionItemTransition(
						shouldAnimate,
						0,
						!!shouldReduceMotion,
					)}
				>
					<SectionHead
						eyebrow={t("eyebrow")}
						headline={t("headline")}
						description={t("description")}
						centered
					/>
				</motion.div>

				<motion.div
					initial={
						shouldReduceMotion || !shouldAnimate
							? false
							: sectionRevealItem.hidden
					}
					animate={
						isRevealed ? sectionRevealItem.visible : sectionRevealItem.hidden
					}
					transition={sectionItemTransition(
						shouldAnimate,
						0.08,
						!!shouldReduceMotion,
					)}
				>
					<ServicesAccordion features={features} />
				</motion.div>
			</div>
		</section>
	);
}
