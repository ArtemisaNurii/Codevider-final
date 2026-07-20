"use client";

import { ArrowRight, ArrowUpRight } from "lucide-react";
import { useReducedMotion } from "motion/react";
import dynamic from "next/dynamic";
import Link from "next/link";
import { useCopy } from "@/lib/copy";
import { useEffect, useState } from "react";
import HeroDashboard from "./hero-dashboard";
import RotatingWord from "./rotating-word";

const HERO_FINE_POINTER_QUERY = "(any-pointer: fine)";
const HERO_DESKTOP_VIEWPORT_QUERY = "(min-width: 1024px)";

const GradientBlinds = dynamic(() => import("@/components/ui/gradient-blinds"), {
	ssr: false,
});

/**
 * Hero section for the home page.
 *
 * Entrance animations use CSS @starting-style — triggers the transition when
 * elements first paint, requiring zero JS and producing zero layout shift.
 *
 * Background, veil, and copy stay on the dark hero palette regardless of site
 * theme — only the dashboard mockup follows light/dark mode.
 *
 * WebGL gradient blinds run on capable devices (desktop + mobile). Desktop uses
 * pointer tracking; mobile uses auto drift at a lower FPS/DPR. Reduced-motion,
 * Save-Data, and software-WebGL fallbacks stay on a static CSS gradient.
 */
const HERO_GRADIENT: string[] = ["#0e1624", "#3a5278", "#8499be", "#78a99e"];

function prefersSaveData(): boolean {
	const connection = (
		navigator as Navigator & { connection?: { saveData?: boolean } }
	).connection;
	return Boolean(connection?.saveData);
}

function hasHardwareWebGL(): boolean {
	try {
		const canvas = document.createElement("canvas");
		const options: WebGLContextAttributes = {
			failIfMajorPerformanceCaveat: true,
			alpha: true,
			antialias: false,
			depth: false,
			stencil: false,
			powerPreference: "low-power",
		};
		const gl =
			canvas.getContext("webgl", options) ||
			canvas.getContext("experimental-webgl", options);
		if (!gl || !(gl instanceof WebGLRenderingContext)) return false;
		const lose = gl.getExtension("WEBGL_lose_context");
		lose?.loseContext();
		return true;
	} catch {
		return false;
	}
}

function canUseWebGLHero(): boolean {
	if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
		return false;
	}
	if (prefersSaveData()) return false;
	return hasHardwareWebGL();
}

export default function Hero() {
	const t = useCopy("home");
	const reducedMotion = useReducedMotion();
	const [mouseMotion, setMouseMotion] = useState(false);
	const [useWebGL, setUseWebGL] = useState(false);
	const [liteMotion, setLiteMotion] = useState(true);
	const [mobileBlinds, setMobileBlinds] = useState(true);

	useEffect(() => {
		const finePointerMq = window.matchMedia(HERO_FINE_POINTER_QUERY);
		const desktopMq = window.matchMedia(HERO_DESKTOP_VIEWPORT_QUERY);

		const syncCapabilities = () => {
			const webgl = canUseWebGLHero();
			const desktop = desktopMq.matches;
			setUseWebGL(webgl);
			// Keep dashboard / rotating-word lite below desktop; blinds can still run.
			setLiteMotion(!desktop);
			setMobileBlinds(!desktop);
			setMouseMotion(finePointerMq.matches && desktop && webgl);
		};

		const enableOnFirstMouseMove = () => {
			if (
				canUseWebGLHero() &&
				window.matchMedia(HERO_DESKTOP_VIEWPORT_QUERY).matches &&
				window.matchMedia(HERO_FINE_POINTER_QUERY).matches
			) {
				setMouseMotion(true);
			}
		};

		syncCapabilities();
		finePointerMq.addEventListener("change", syncCapabilities);
		desktopMq.addEventListener("change", syncCapabilities);
		window.addEventListener("mousemove", enableOnFirstMouseMove, {
			once: true,
		});

		return () => {
			finePointerMq.removeEventListener("change", syncCapabilities);
			desktopMq.removeEventListener("change", syncCapabilities);
			window.removeEventListener("mousemove", enableOnFirstMouseMove);
		};
	}, []);

	const yearsDelivering = new Date().getFullYear() - 2019;
	const rotatingWords = [
		t("rotating_word.saas"),
		t("rotating_word.ai"),
		t("rotating_word.commerce"),
		t("rotating_word.fintech"),
		t("rotating_word.healthcare"),
	];

	const stats = [
		{ value: `${yearsDelivering}+`, label: t("years_delivering") },
		{ value: "45+", label: t("global_projects") },
		{ value: "25+", label: t("engineers") },
	];

	return (
		<section className="home-hero relative isolate flex min-h-svh items-center overflow-hidden py-28 lg:py-32">
			<div className="home-hero__gradient-blinds" aria-hidden>
				{useWebGL ? (
					<GradientBlinds
						className="home-hero__gradient-blinds-canvas"
						gradientColors={HERO_GRADIENT}
						spotlightMotion={mouseMotion ? "mouse" : "auto"}
						trackPointer="section"
						mouseDampening={0.24}
						autoMotionSpeed={mobileBlinds ? 0.55 : 0.68}
						angle={33}
						noise={mobileBlinds ? 0 : 0.05}
						blindCount={5}
						blindMinWidth={14}
						mirrorGradient
						spotlightRadius={0.28}
						spotlightSoftness={2}
						spotlightOpacity={0.1}
						distortAmount={mobileBlinds ? 0 : 0.2}
						shineDirection="right"
						mixBlendMode=""
						dpr={mobileBlinds ? 1 : undefined}
						antialias={!mobileBlinds}
						targetFps={mobileBlinds ? 28 : 60}
						paused={reducedMotion ?? false}
					/>
				) : (
					<div
						className="home-hero__gradient-static home-hero__gradient-blinds-canvas"
						style={
							{
								"--hero-static-c1": HERO_GRADIENT[0],
								"--hero-static-c2": HERO_GRADIENT[1],
								"--hero-static-c3": HERO_GRADIENT[2],
								"--hero-static-c4": HERO_GRADIENT[3],
							} as React.CSSProperties
						}
					/>
				)}
			</div>

			<div className="home-hero__veil" aria-hidden />

			<div className="home-wrap relative z-10">
				<div className="grid w-full items-center gap-16 lg:grid-cols-[1.02fr_0.98fr]">
					<div className="flex flex-col items-center lg:items-start">
						<h1 className="hero-reveal hero-reveal-1 max-w-2xl text-balance text-center text-[clamp(2.5rem,5.5vw,4.2rem)] leading-[1.04] tracking-[-0.03em] text-(--hero-text-h) lg:text-left">
							<span className="font-sans">
								{t("your_strategic_partner_in")}{" "}
							</span>
							<RotatingWord words={rotatingWords} staticMode={liteMotion} />
						</h1>

						<p className="hero-reveal hero-reveal-2 mt-6 max-w-xl text-pretty text-center font-sans text-base leading-relaxed text-(--hero-text-lead) sm:text-lg lg:text-left">
							<span className="font-medium text-(--hero-text-h)">
								{t("hero_lead_emphasis")}
							</span>{" "}
							{t("hero_lead_rest")}
						</p>

						<div className="hero-reveal hero-reveal-3 mt-9 flex flex-wrap items-center justify-center gap-3.5 lg:justify-start">
							<Link
								href="#contact"
								className="home-brand-btn group inline-flex min-h-11 items-center gap-2 px-7 py-3.5 text-sm"
							>
								{t("start_your_project")}
								<ArrowRight
									className="size-4 transition-transform duration-300 group-hover:translate-x-0.5"
									aria-hidden
								/>
							</Link>
							<Link
								href="#services"
								className="inline-flex min-h-11 items-center justify-center gap-2 rounded-full border border-(--hero-border) bg-(--hero-surface) px-7 py-3.5 text-sm font-medium text-(--hero-text-h) backdrop-blur-sm transition-[background-color,border-color,transform] hover:border-(--hero-accent-border) hover:bg-(--hero-accent-bg) active:scale-[0.96] focus-visible:outline focus-visible:outline-offset-2 focus-visible:outline-(--hero-focus-ring)"
							>
								{t("explore_services")}
								<ArrowUpRight className="size-4" aria-hidden />
							</Link>
						</div>

						<div className="hero-reveal hero-reveal-4 mt-12 grid w-full grid-cols-3 gap-6 border-t border-(--hero-border) pt-8">
							{stats.map(({ value, label }) => (
								<div key={label} className="text-center lg:text-left">
									<p className="font-(family-name:--mono) text-3xl font-medium tabular-nums tracking-tight text-(--hero-accent-text) sm:text-4xl">
										{value}
									</p>
									<p className="mt-1 text-[0.8rem] font-medium text-(--hero-text-muted)">
										{label}
									</p>
								</div>
							))}
						</div>
					</div>

					<div className="hero-reveal hero-reveal-5 hero-dash-bleed relative w-full min-w-0 lg:min-w-md xl:min-w-lg">
						<HeroDashboard lite={liteMotion} />
					</div>
				</div>
			</div>
		</section>
	);
}
