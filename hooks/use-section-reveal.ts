"use client";

import {
	type UseInViewOptions,
	useInView,
	useReducedMotion,
	useScroll,
	useTransform,
	useSpring,
} from "motion/react";
import { useEffect, useLayoutEffect, useRef, useState } from "react";

/**
 * Returns true only after the component has mounted on the client.
 * Use this to guard motion `initial` props so SSR HTML renders visible
 * (no opacity:0) and animations only start after hydration is complete,
 * eliminating the SSR→hydration layout shift.
 */
export function useMounted() {
	const [mounted, setMounted] = useState(false);
	useEffect(() => setMounted(true), []);
	return mounted;
}

type RevealMode = "pending" | "instant" | "animate" | "waiting";

export type SectionRevealOptions = {
	margin?: UseInViewOptions["margin"];
	amount?: UseInViewOptions["amount"];
};

const instantRevealTransition = { duration: 0 } as const;

/** Apple-like ease — cubic-bezier(0.2, 0, 0, 1) */
export const appleRevealEase = [0.2, 0, 0, 1] as const;

export const sectionRevealItem = {
	hidden: { opacity: 0, y: 12, filter: "blur(4px)" },
	visible: {
		opacity: 1,
		y: 0,
		filter: "blur(0px)",
		transition: { duration: 0.55, ease: appleRevealEase },
	},
} as const;

export const sectionRevealStagger = {
	hidden: {},
	visible: {
		transition: { staggerChildren: 0.1, delayChildren: 0.04 },
	},
} as const;

export const applePanelEase = {
	duration: 0.45,
	ease: appleRevealEase,
} as const;

function parseMargin(value: string, axis: "x" | "y") {
	if (value.endsWith("%")) {
		const size = axis === "y" ? window.innerHeight : window.innerWidth;
		return (parseFloat(value) / 100) * size;
	}

	return parseFloat(value) || 0;
}

function getIntersectionRoot(margin: string) {
	const parts = margin.trim().split(/\s+/);
	const [top, right = top, bottom = top, left = right] = parts;

	return {
		top: parseMargin(top, "y"),
		right: parseMargin(right, "x"),
		bottom: parseMargin(bottom, "y"),
		left: parseMargin(left, "x"),
	};
}

function getVisibleRatio(
	rect: DOMRectReadOnly,
	root: { top: number; right: number; bottom: number; left: number },
) {
	const intersectionWidth = Math.max(
		0,
		Math.min(rect.right, root.right) - Math.max(rect.left, root.left),
	);
	const intersectionHeight = Math.max(
		0,
		Math.min(rect.bottom, root.bottom) - Math.max(rect.top, root.top),
	);
	const elementArea = rect.width * rect.height;

	if (elementArea <= 0) return 0;

	return (intersectionWidth * intersectionHeight) / elementArea;
}

function getRevealMode(
	el: Element,
	margin: string,
	amount?: UseInViewOptions["amount"],
): Exclude<RevealMode, "pending"> {
	const rect = el.getBoundingClientRect();
	const margins = getIntersectionRoot(margin);
	const root = {
		top: margins.top,
		right: window.innerWidth + margins.right,
		bottom: window.innerHeight + margins.bottom,
		left: margins.left,
	};

	const visibleRatio = getVisibleRatio(rect, root);
	const threshold =
		amount === "all"
			? 1
			: amount === "some" || amount === undefined
				? 0
				: amount;
	const isIntersecting = visibleRatio > threshold;

	if (!isIntersecting) {
		return rect.bottom < root.top ? "instant" : "waiting";
	}

	return "animate";
}

export function useSectionReveal<T extends Element = HTMLElement>(
	options: SectionRevealOptions = {},
) {
	const ref = useRef<T>(null);
	const [mode, setMode] = useState<RevealMode>("pending");
	const margin = options.margin ?? "-10% 0px";
	const marginForMeasure = typeof margin === "string" ? margin : "-10% 0px";
	const inView = useInView(ref, {
		once: true,
		margin,
		amount: options.amount,
	});
	const shouldReduceMotion = useReducedMotion();

	useLayoutEffect(() => {
		let cancelled = false;

		const measure = () => {
			if (cancelled || !ref.current) return;
			setMode(getRevealMode(ref.current, marginForMeasure, options.amount));
		};

		// Measure before paint so above-viewport sections don't flash hidden.
		measure();

		// Re-measure after the browser finishes restoring scroll on refresh.
		requestAnimationFrame(() => {
			requestAnimationFrame(measure);
		});

		window.addEventListener("pageshow", measure);

		return () => {
			cancelled = true;
			window.removeEventListener("pageshow", measure);
		};
	}, [marginForMeasure, options.amount]);

	const isRevealed =
		shouldReduceMotion ||
		mode === "instant" ||
		mode === "animate" ||
		(mode === "waiting" && inView);

	const shouldAnimate =
		!shouldReduceMotion &&
		mode !== "pending" &&
		(mode === "animate" || (mode === "waiting" && inView));

	return { ref, isRevealed, shouldAnimate, mode };
}

/** Use as motion `initial` — avoids a visible→hidden flash while reveal mode is pending. */
export function sectionRevealInitial(
	shouldReduceMotion: boolean | null,
): false | "hidden" {
	return shouldReduceMotion ? false : "hidden";
}

export function revealTransition<T extends object>(
	shouldAnimate: boolean,
	transition: T,
) {
	return shouldAnimate ? transition : instantRevealTransition;
}

export function sectionItemTransition(
	shouldAnimate: boolean,
	delay = 0,
	shouldReduceMotion = false,
) {
	return revealTransition(shouldAnimate, {
		duration: 0.55,
		ease: appleRevealEase,
		delay: shouldReduceMotion ? 0 : delay,
	});
}

/** Above-the-fold hero reveal — animates on mount, no intersection observer delay. */
export const heroRevealEase = appleRevealEase;

/**
 * Scroll-driven hero progressive disclosure.
 *
 * The hero section occupies 2 × 100dvh of scroll space with a sticky inner
 * container. This hook tracks the section's scroll progress (0 → 1) and
 * returns per-element MotionValues so every transform is computed in a
 * rAF-synced compositor thread — zero JS layout triggers.
 *
 * On mount (including mid-page refreshes) we immediately synchronize the
 * MotionValue to the current scrollY so there's no "start from 0" flash.
 *
 * @param sectionRef - ref attached to the outer scroll-tunnel <section>
 */
export function useHeroScrollProgress(sectionRef: React.RefObject<HTMLElement | null>) {
	const shouldReduceMotion = useReducedMotion();

	// Track scroll progress over the full section (0 = top of section enters
	// viewport, 1 = bottom of section leaves viewport top).
	const { scrollYProgress } = useScroll({
		target: sectionRef,
		offset: ["start start", "end start"],
	});

	// Smoothed spring so fast-scroll still looks buttery. Low stiffness keeps
	// it responsive; mass 0.4 avoids overshoot.
	const smoothProgress = useSpring(scrollYProgress, {
		stiffness: 160,
		damping: 28,
		mass: 0.4,
		restDelta: 0.001,
	});

	// When reduced-motion is on, use a static 0 — all transforms resolve to
	// their "fully visible" state immediately.
	const progress = shouldReduceMotion ? scrollYProgress : smoothProgress;

	// --- Per-element transform maps ---

	// Heading: fully visible 0→0.15, then fades/lifts out by 0.4
	const headingOpacity = useTransform(progress, [0, 0.05, 0.35, 0.55], [1, 1, 0.35, 0]);
	const headingY = useTransform(progress, [0, 0.55], [0, -60]);

	// Lead: slightly behind heading
	const leadOpacity = useTransform(progress, [0, 0.08, 0.4, 0.58], [1, 1, 0.35, 0]);
	const leadY = useTransform(progress, [0, 0.58], [0, -50]);

	// CTAs
	const ctaOpacity = useTransform(progress, [0, 0.1, 0.45, 0.62], [1, 1, 0.35, 0]);
	const ctaY = useTransform(progress, [0, 0.62], [0, -40]);

	// Stats
	const statsOpacity = useTransform(progress, [0, 0.12, 0.5, 0.68], [1, 1, 0.3, 0]);
	const statsY = useTransform(progress, [0, 0.68], [0, -32]);

	// Dashboard: scales slightly and fades out later (feels "heavier")
	const dashOpacity = useTransform(progress, [0, 0.2, 0.6, 0.82], [1, 1, 0.4, 0]);
	const dashScale = useTransform(progress, [0, 0.82], [1, 0.93]);
	const dashY = useTransform(progress, [0, 0.82], [0, 20]);

	// Blobs parallax — opposite direction, slower
	const blobY = useTransform(progress, [0, 1], [0, -80]);
	const blobScale = useTransform(progress, [0, 1], [1, 1.12]);

	return {
		progress,
		headingOpacity,
		headingY,
		leadOpacity,
		leadY,
		ctaOpacity,
		ctaY,
		statsOpacity,
		statsY,
		dashOpacity,
		dashScale,
		dashY,
		blobY,
		blobScale,
		shouldReduceMotion,
	};
}

export function useHeroMountReveal() {
	const mounted = useMounted();
	const shouldReduceMotion = useReducedMotion();

	// Until mounted, initial=false so SSR HTML is fully visible.
	// After mount, animate from the hidden state — no hydration mismatch.
	const stagger = (index: number, y = 18, blur?: number) => {
		const useBlur = mounted && !shouldReduceMotion && blur !== undefined && blur > 0;
		const animate = !mounted || shouldReduceMotion;

		return {
			initial: animate
				? false
				: {
						opacity: 0,
						y,
						...(useBlur ? { filter: `blur(${blur}px)` } : {}),
					},
			animate: {
				opacity: 1,
				y: 0,
				...(useBlur ? { filter: "blur(0px)" } : {}),
			} as const,
			transition: animate
				? instantRevealTransition
				: { duration: 0.62, ease: heroRevealEase, delay: index * 0.08 },
		};
	};

	return { stagger, shouldReduceMotion };
}
