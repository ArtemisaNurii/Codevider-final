"use client";

import {
	type UseInViewOptions,
	useInView,
	useReducedMotion,
} from "motion/react";
import { useLayoutEffect, useRef, useState } from "react";

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
