"use client";

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
		<section className="home-hero relative isolate min-h-dvh overflow-hidden">
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

			<div className="home-wrap relative z-10 flex min-h-dvh flex-col justify-center pb-[clamp(5rem,10vw,8rem)] pt-[clamp(6rem,12vw,9rem)]">
				<div className="grid w-full items-center gap-12 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.3fr)] lg:gap-14 xl:gap-16">
					<div className="flex flex-col items-center lg:items-start pt-8 lg:pt-0">
						<h1 className="hero-reveal hero-reveal-1 mb-8 max-w-2xl text-balance text-center lg:text-left text-[clamp(2.25rem,5vw,3.5rem)] leading-[1.05] tracking-[-0.03em] text-(--hero-text-h)">
							<span className="block font-sans">
								{t("your_strategic_partner_in")}
							</span>
							<RotatingWord words={rotatingWords} staticMode={liteMotion} />
						</h1>

						<p className="hero-reveal hero-reveal-2 max-w-xl text-pretty text-center lg:text-left font-sans text-lg leading-relaxed text-(--hero-text-lead) sm:text-xl sm:leading-8">
							<span className="font-medium text-(--hero-text-h)">
								{t("hero_lead_emphasis")}
							</span>{" "}
							{t("hero_lead_rest")}
						</p>

						<div className="hero-reveal hero-reveal-3 mb-10 mt-14 flex flex-wrap items-center justify-center lg:justify-start gap-4 sm:mb-14 sm:mt-16 sm:gap-5">
							<Link
								href="#contact"
								className="home-brand-btn min-h-11 px-7 py-3.5 text-sm"
							>
								{t("start_your_project")}
							</Link>
							<Link
								href="#services"
								className="inline-flex min-h-11 items-center justify-center rounded-full border border-(--hero-border) bg-(--hero-surface) px-7 py-3.5 text-sm font-medium text-(--hero-text-h) backdrop-blur-sm transition-[background-color,border-color,transform] hover:border-(--hero-accent-border) hover:bg-(--hero-accent-bg) active:scale-[0.96] focus-visible:outline focus-visible:outline-offset-2 focus-visible:outline-(--hero-focus-ring)"
							>
								{t("explore_services")}
							</Link>
						</div>

						<div className="hero-reveal hero-reveal-4 grid grid-cols-3 gap-5 border-t border-(--hero-border) pt-10 sm:gap-10 sm:pt-12 w-full">
							{stats.map(({ value, label }) => (
								<div key={label} className="text-center lg:text-left">
									<p className="font-(family-name:--mono) text-2xl font-medium tabular-nums tracking-tight text-(--hero-text-h) sm:text-3xl">
										{value}
									</p>
									<p className="mt-1 text-xs text-(--hero-text-lead) sm:text-sm">
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
