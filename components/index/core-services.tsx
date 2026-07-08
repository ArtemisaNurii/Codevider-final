"use client";

import {
	ArrowUpRight,
	Bot,
	Check,
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
					className="flex items-start gap-3.5 text-pretty text-[15px] leading-relaxed text-(--text-h)/80"
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
			className="home-demo home-demo--ai min-h-[340px] sm:min-h-[420px]"
		>
			<div className="home-demo-head home-demo-head--wrap min-w-0 overflow-hidden">
				<div
					className="home-demo-chip-list w-full min-w-0 max-w-full flex-nowrap overflow-x-auto overflow-y-hidden scrollbar-none [&::-webkit-scrollbar]:hidden"
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
			<div className="relative flex h-[360px] items-center justify-center px-8">
				<div className="relative mx-auto size-[260px]">
					<span className="home-pod-ring absolute inset-0 rounded-full border-[1.5px] border-dashed border-(--border)" />
					<span className="home-pod-ring home-pod-ring--reverse absolute inset-[55px] rounded-full border-[1.5px] border-dashed border-(--border)" />
					<div className="absolute inset-0 grid place-items-center">
						<div className="relative z-2 grid size-[108px] place-items-center rounded-full bg-(--dash-brand-solid) text-center text-sm font-semibold leading-tight whitespace-pre-line text-white shadow-[0_12px_30px_color-mix(in_srgb,var(--dash-brand-solid)_40%,transparent)]">
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
							className={`absolute z-3 flex min-h-11 items-center gap-2 rounded-full border bg-(--bg) px-3.5 py-2 text-[13.5px] font-semibold shadow-sm transition-[transform,box-shadow,border-color] duration-200 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-(--dash-brand) active:scale-[0.96] motion-reduce:transition-none motion-reduce:hover:scale-100 motion-reduce:active:scale-100 ${positions[role]} ${
								active === role
									? "scale-105 border-(--dash-brand) shadow-md"
									: "border-(--border) hover:scale-105 hover:border-(--dash-brand)"
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
			<p className="home-demo-body min-h-6 pt-0 text-center text-sm leading-relaxed text-(--text)">
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
											className={`grid size-10 place-items-center rounded-xl transition-[background-color,color,box-shadow] duration-300 ${
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
	reverse?: boolean;
	alt?: boolean;
	demo: React.ReactNode;
	href: string;
};

const HEADER_PEEK = 88; // px of each stacked header left visible (>= header height)
const STACK_TOP = 92; // px offset from viewport top (clears the 72px navbar)

function FeatureStackCard({
	feature,
	index,
	total,
}: {
	feature: FeatureConfig;
	index: number;
	total: number;
}) {
	const t = useTranslations(`home.features.${feature.id}`);
	const bullets = [t("bullet_1"), t("bullet_2"), t("bullet_3")];
	const headlineId = `${feature.id}-headline`;
	const cardRef = useRef<HTMLDivElement>(null);
	const shouldReduceMotion = useReducedMotion();

	// Rest position where this card pins in the stack.
	const restTop = STACK_TOP + index * HEADER_PEEK;

	const scrollToCard = useCallback(() => {
		cardRef.current?.scrollIntoView({
			behavior: shouldReduceMotion ? "auto" : "smooth",
			block: "start",
		});
	}, [shouldReduceMotion]);

	return (
		<div
			ref={cardRef}
			style={{
				position: "sticky",
				top: restTop,
				scrollMarginTop: restTop,
				zIndex: index + 1,
			}}
			className={`relative rounded-[26px] border border-(--border) bg-(--bg) shadow-[0_18px_44px_-26px_rgba(0,0,0,0.5)] transition-[border-color,box-shadow] duration-300 ease-out hover:border-[color-mix(in_srgb,var(--dash-brand)_25%,var(--border))] ${
				index === total - 1 ? "" : "mb-5"
			}`}
		>
			{/* Header — always visible; click scrolls this card into full view */}
			<button
				type="button"
				onClick={scrollToCard}
				className="flex w-full cursor-pointer items-center gap-4 px-[clamp(1.1rem,2.5vw,1.75rem)] py-[clamp(0.9rem,1.6vw,1.15rem)] text-left focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-(--dash-brand)"
			>
				<span className="home-feature-badge__icon">{feature.icon}</span>
				<span className="min-w-0 flex-1">
					<span className="block text-[11px] font-semibold uppercase tracking-[0.14em] text-(--dash-brand)">
						{t("badge")}
					</span>
					<span
						id={headlineId}
						className="block truncate text-[clamp(1.05rem,2.2vw,1.5rem)] font-semibold leading-tight tracking-[-0.01em] text-(--text-h)"
					>
						{t("headline")}
					</span>
				</span>
				<span
					className="grid size-9 shrink-0 place-items-center rounded-full border border-(--border) text-(--text)"
					aria-hidden
				>
					<ArrowUpRight className="size-4" />
				</span>
			</button>

			{/* Full content — always rendered; covered by the next card as you scroll */}
			<div
				className="grid items-center gap-[clamp(1.5rem,4vw,3rem)] border-t border-(--border) px-[clamp(1.1rem,2.5vw,1.75rem)] pb-[clamp(1.4rem,3vw,2.25rem)] pt-[clamp(1.2rem,2.4vw,1.75rem)] lg:grid-cols-2"
			>
				<div className="flex flex-col gap-6">
					<p className="max-w-[52ch] text-pretty text-[16px] leading-relaxed text-(--text)">
						{t("description")}
					</p>
					<FeatureCheckList items={bullets} />
					<div>
						<Link href={feature.href} className="home-link-arrow">
							{t("link")}
							<ArrowUpRight className="size-4" aria-hidden />
						</Link>
					</div>
				</div>
				<div className="relative min-w-0">{feature.demo}</div>
			</div>
		</div>
	);
}

export default function CoreServices() {
	const t = useTranslations("home.core_services");
	const { ref, isRevealed, shouldAnimate } = useSectionReveal();
	const shouldReduceMotion = useReducedMotion();

	const features: FeatureConfig[] = [
		{
			id: "ai",
			icon: <Bot className="size-[22px]" aria-hidden />,
			demo: <AiDemo />,
			href: "/services#ai",
		},
		{
			id: "engineering",
			icon: <Code2 className="size-[22px]" aria-hidden />,
			reverse: true,
			alt: true,
			demo: <CodeDemo />,
			href: "/services#custom",
		},
		{
			id: "pod",
			icon: <Users className="size-[22px]" aria-hidden />,
			demo: <PodDemo />,
			href: "/services#team",
		},
		{
			id: "devops",
			icon: <Cloud className="size-[22px]" aria-hidden />,
			reverse: true,
			alt: true,
			demo: <PipelineDemo />,
			href: "/services#cloud",
		},
	];

	return (
		<>
			<section
				ref={ref}
				id="services"
				className="home-section--tight pt-[clamp(72px,10vw,120px)] pb-[clamp(40px,6vw,64px)]"
			>
				<div className="home-wrap">
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
				</div>
			</section>

			<div className="home-wrap pb-[clamp(64px,12vh,140px)]">
				<div className="mx-auto max-w-248">
					{features.map((feature, index) => (
						<FeatureStackCard
							key={feature.id}
							feature={feature}
							index={index}
							total={features.length}
						/>
					))}
				</div>
			</div>
		</>
	);
}
