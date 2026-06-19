"use client";

import {
	ArrowRight,
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
import {
	motion,
	useInView,
	useReducedMotion,
	AnimatePresence,
} from "motion/react";
import { Link } from "@/i18n/navigation";
import { useCallback, useEffect, useRef, useState } from "react";
import { useTranslations } from "next-intl";
import type { CSSProperties } from "react";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
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

const reveal = {
	hidden: { opacity: 0, y: 16 },
	visible: {
		opacity: 1,
		y: 0,
		transition: { type: "spring" as const, duration: 0.45, bounce: 0 },
	},
};

function FeatureCheckList({ items }: { items: string[] }) {
	return (
		<ul className="mt-8 grid gap-4">
			{items.map((item) => (
				<li
					key={item}
					className="flex items-start gap-3.5 text-[15px] leading-relaxed text-[var(--text-h)]/80"
				>
					<span className="home-check mt-0.5">
						<Check className="size-3.5" strokeWidth={3} aria-hidden />
					</span>
					{item}
				</li>
			))}
		</ul>
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
	const ref = useRef<HTMLDivElement>(null);
	const typeTimerRef = useRef<number | null>(null);
	const inView = useInView(ref, { once: true, margin: "-10% 0px" });
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
		if (inView && !started.current) {
			started.current = true;
			selectChip(chips.current[0]);
		}
	}, [inView, selectChip]);

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
		<div ref={ref} className="home-demo min-h-[420px]">
			<div className="home-demo-head home-demo-head--wrap">
				<div
					className="flex flex-wrap justify-start gap-1.5"
					role="group"
					aria-label={t("title")}
				>
					{chips.current.map((chip) => (
						<button
							key={chip.id}
							type="button"
							aria-pressed={active === chip.id}
							onClick={() => selectChip(chip)}
							className={`home-demo-chip ${active === chip.id ? "home-demo-chip--active" : ""}`}
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
	const tabs = ["orders", "schema", "deploy"] as const;
	const [active, setActive] = useState<(typeof tabs)[number]>("orders");
	const shouldReduceMotion = useReducedMotion();
	const code = t.raw(`code_${active}`) as string;

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
							className={`home-code-editor__tab ${active === tab ? "home-code-editor__tab--active" : ""}`}
						>
							{t(`tab_${tab}`)}
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
							showLineNumbers
							wrapLongLines={false}
							lineNumberStyle={{
								color: "#4b5563",
							}}
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
		frontend: "bg-[#3a53c9]",
		backend: "bg-violet-500",
		qa: "bg-emerald-500",
		pm: "bg-sky-500",
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
						<div className="relative z-[2] grid size-[108px] place-items-center rounded-full bg-[#3a53c9] text-center text-sm font-semibold leading-tight whitespace-pre-line text-white shadow-[0_12px_30px_rgba(58,83,201,0.4)]">
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
							className={`absolute z-[3] flex min-h-11 items-center gap-2 rounded-full border bg-(--bg) px-3.5 py-2 text-[13.5px] font-semibold shadow-sm transition-[transform,box-shadow,border-color] duration-200 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-(--dash-brand) motion-reduce:transition-none motion-reduce:hover:scale-100 ${positions[role]} ${
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
				<span className="font-semibold text-(--text-h)">
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
	const ref = useRef<HTMLDivElement>(null);
	const inView = useInView(ref, { once: true, margin: "-10% 0px" });
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
		if (inView && !started.current && !shouldReduceMotion) {
			started.current = true;
			run();
		}
	}, [inView, run, shouldReduceMotion]);

	return (
		<div ref={ref} className="home-demo">
			<div className="home-demo-head">
				<span className="flex items-center gap-2">
					<Cloud className="size-4 text-[#3a53c9]" aria-hidden />
					{t("title")}
				</span>
				<span className="rounded-full bg-(--home-surface-muted) px-2.5 py-1 text-[11px] font-medium tracking-wide text-(--text) uppercase">
					{t("subtitle")}
				</span>
			</div>
			<div className="home-demo-body">
				<div className="home-pipeline-stages">
					<div className="flex items-center">
						{stages.map((stage, i) => {
							const StageIcon = stageIcons[stage];

							return (
								<div key={stage} className="contents">
									<div className="flex flex-1 flex-col items-center gap-2 text-center">
										<div
											className={`grid size-10 place-items-center rounded-xl transition-[background-color,color,box-shadow] duration-300 ${
												doneCount > i
													? "bg-emerald-500/12 text-emerald-600 shadow-[0_1px_2px_rgba(16,185,129,0.12)]"
													: activeStage === i
														? "bg-[#3a53c9]/10 text-[#3a53c9] shadow-[0_1px_2px_rgba(58,83,201,0.12)]"
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
										<span className="text-[13px] font-semibold text-(--text-h)/80">
											{t(`stage_${stage}`)}
										</span>
									</div>
									{i < stages.length - 1 ? (
										<div
											className={`h-[3px] w-[clamp(20px,5vw,60px)] overflow-hidden rounded-full bg-(--border) transition-[background] duration-500 ${
												doneCount > i
													? "bg-linear-to-r from-[#3a53c9] to-[#00bcff]"
													: ""
											}`}
										/>
									) : null}
								</div>
							);
						})}
					</div>
				</div>
				<div className="home-pipeline-foot">
					<button
						type="button"
						onClick={run}
						disabled={running}
						className="inline-flex min-h-11 items-center gap-2 rounded-full bg-(--text-h) px-[18px] py-2.5 text-sm font-semibold text-(--bg) transition-transform duration-200 hover:-translate-y-0.5 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-(--dash-brand) disabled:cursor-default disabled:opacity-50 disabled:transform-none active:scale-[0.96] motion-reduce:transition-none motion-reduce:hover:translate-y-0 motion-reduce:active:scale-100"
					>
						<Play className="size-4 fill-current" aria-hidden />
						{running
							? t("running")
							: doneCount === stages.length
								? t("run_again")
								: t("run")}
					</button>
					{live ? (
						<div className="home-live-badge" role="status">
							<span className="home-live-badge__dot" aria-hidden />
							<span>{t("status_live_label")}</span>
							<span className="home-live-badge__uptime tabular-nums">
								{t("status_live_uptime")}
							</span>
						</div>
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

type FeatureConfig = {
	id: string;
	icon: React.ReactNode;
	reverse?: boolean;
	alt?: boolean;
	demo: React.ReactNode;
	href: string;
};

function FeatureSection({
	feature,
	index,
}: {
	feature: FeatureConfig;
	index: number;
}) {
	const t = useTranslations(`home.features.${feature.id}`);
	const ref = useRef<HTMLElement>(null);
	const inView = useInView(ref, { once: true, margin: "-10% 0px" });
	const shouldReduceMotion = useReducedMotion();

	const bullets = [t("bullet_1"), t("bullet_2"), t("bullet_3")];
	const headlineId = `${feature.id}-headline`;

	return (
		<section
			ref={ref}
			aria-labelledby={headlineId}
			className={`relative overflow-hidden py-[clamp(64px,9vw,112px)] ${feature.alt ? "home-feature-alt" : ""}`}
		>
			<div className="home-wrap grid items-center gap-[clamp(2.5rem,6vw,5.5rem)] lg:grid-cols-2">
				<motion.div
					className={`flex flex-col gap-7 sm:gap-8 ${feature.reverse ? "lg:order-2" : ""}`}
					initial={shouldReduceMotion ? false : "hidden"}
					animate={inView ? "visible" : "hidden"}
					variants={reveal}
				>
					<span className="inline-flex w-fit items-center gap-3.5 text-sm font-semibold text-[#3a53c9]">
						<span className="grid size-11 shrink-0 place-items-center rounded-[11px] bg-[#3a53c9]/10 text-[#3a53c9]">
							{feature.icon}
						</span>
						{t("badge")}
					</span>
					<div>
						<h2
							id={headlineId}
							className="m-0 text-balance text-[clamp(1.75rem,3.7vw,2.875rem)] leading-[1.08] tracking-[-0.02em] text-[var(--text-h)]"
						>
							{t("headline")}
						</h2>
						<p className="mt-5 max-w-[52ch] text-pretty text-[17px] leading-relaxed text-[var(--text)]">
							{t("description")}
						</p>
						<FeatureCheckList items={bullets} />
						<Link href={feature.href} className="home-link-arrow mt-8">
							{t("link")}
							<ArrowRight className="size-4" aria-hidden />
						</Link>
					</div>
				</motion.div>

				<motion.div
					className={`relative ${feature.reverse ? "lg:order-1" : ""}`}
					initial={shouldReduceMotion ? false : "hidden"}
					animate={inView ? "visible" : "hidden"}
					variants={{
						...reveal,
						visible: {
							...reveal.visible,
							transition: { ...reveal.visible.transition, delay: 0.1 * index },
						},
					}}
				>
					<div
						className="pointer-events-none absolute inset-[12%_8%_-6%] -z-10 blur-[48px]"
						style={{
							background:
								"radial-gradient(60% 60% at 50% 50%, rgba(58, 83, 201, 0.22), transparent 70%)",
						}}
						aria-hidden
					/>
					{feature.demo}
				</motion.div>
			</div>
		</section>
	);
}

export default function CoreServices() {
	const t = useTranslations("home.core_services");

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
				id="services"
				className="home-section--tight pt-[clamp(72px,10vw,120px)] pb-[clamp(40px,6vw,64px)]"
			>
				<div className="home-wrap">
					<SectionHead
						eyebrow={t("eyebrow")}
						headline={t("headline")}
						description={t("description")}
						centered
					/>
				</div>
			</section>

			{features.map((feature, index) => (
				<FeatureSection key={feature.id} feature={feature} index={index} />
			))}
		</>
	);
}
