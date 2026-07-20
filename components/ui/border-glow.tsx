"use client";

import {
	useCallback,
	useEffect,
	useRef,
	useState,
	type CSSProperties,
	type PointerEvent,
	type ReactNode,
} from "react";
import { useReducedMotion } from "motion/react";

interface BorderGlowProps {
	children?: ReactNode;
	className?: string;
	edgeSensitivity?: number;
	/** HSL channels without `hsl()` — e.g. `"221 100 57"`. */
	glowColor?: string;
	backgroundColor?: string;
	borderRadius?: number;
	glowRadius?: number;
	glowIntensity?: number;
	coneSpread?: number;
	colors?: string[];
	fillOpacity?: number;
	/** Keep the multicolor border + glow visible at rest (not only on hover). */
	alwaysOn?: boolean;
}

function parseHSL(hslStr: string): { h: number; s: number; l: number } {
	const match = hslStr.match(/([\d.]+)\s*([\d.]+)%?\s*([\d.]+)%?/);
	if (!match) return { h: 221, s: 100, l: 57 };
	return {
		h: parseFloat(match[1]),
		s: parseFloat(match[2]),
		l: parseFloat(match[3]),
	};
}

function buildBoxShadow(glowColor: string, intensity: number): string {
	const { h, s, l } = parseHSL(glowColor);
	const base = `${h}deg ${s}% ${l}%`;
	const layers: [number, number, number, number, number, boolean][] = [
		[0, 0, 0, 1, 100, true],
		[0, 0, 1, 0, 60, true],
		[0, 0, 3, 0, 50, true],
		[0, 0, 6, 0, 40, true],
		[0, 0, 15, 0, 30, true],
		[0, 0, 25, 2, 20, true],
		[0, 0, 50, 2, 10, true],
		[0, 0, 1, 0, 60, false],
		[0, 0, 3, 0, 50, false],
		[0, 0, 6, 0, 40, false],
		[0, 0, 15, 0, 30, false],
		[0, 0, 25, 2, 20, false],
		[0, 0, 50, 2, 10, false],
	];
	return layers
		.map(([x, y, blur, spread, alpha, inset]) => {
			const a = Math.min(alpha * intensity, 100);
			return `${inset ? "inset " : ""}${x}px ${y}px ${blur}px ${spread}px hsl(${base} / ${a}%)`;
		})
		.join(", ");
}

const GRADIENT_POSITIONS = [
	"80% 55%",
	"69% 34%",
	"8% 6%",
	"41% 38%",
	"86% 85%",
	"82% 18%",
	"51% 4%",
];
const COLOR_MAP = [0, 1, 2, 0, 1, 2, 1];

function buildMeshGradients(colors: string[]): string[] {
	const gradients: string[] = [];
	for (let i = 0; i < 7; i++) {
		const c = colors[Math.min(COLOR_MAP[i], colors.length - 1)];
		gradients.push(
			`radial-gradient(at ${GRADIENT_POSITIONS[i]}, ${c} 0px, transparent 50%)`,
		);
	}
	gradients.push(`linear-gradient(${colors[0]} 0 100%)`);
	return gradients;
}

function conicBorderMask(angleDeg: string, coneSpread: number): string {
	return `conic-gradient(from ${angleDeg} at center, black ${coneSpread}%, transparent ${coneSpread + 15}%, transparent ${100 - coneSpread - 15}%, black ${100 - coneSpread}%)`;
}

function conicFillMasks(angleDeg: string): string {
	return [
		"linear-gradient(to bottom, black, black)",
		"radial-gradient(ellipse at 50% 50%, black 40%, transparent 65%)",
		"radial-gradient(ellipse at 66% 66%, black 5%, transparent 40%)",
		"radial-gradient(ellipse at 33% 33%, black 5%, transparent 40%)",
		"radial-gradient(ellipse at 66% 33%, black 5%, transparent 40%)",
		"radial-gradient(ellipse at 33% 66%, black 5%, transparent 40%)",
		`conic-gradient(from ${angleDeg} at center, transparent 5%, black 15%, black 85%, transparent 95%)`,
	].join(", ");
}

function conicHaloMask(angleDeg: string): string {
	return `conic-gradient(from ${angleDeg} at center, black 2.5%, transparent 10%, transparent 90%, black 97.5%)`;
}

const BRAND_MESH = ["#2469ff", "#32fcb6", "#6b9bff"] as const;
/** Resting edge proximity so always-on glow clears sensitivity thresholds. */
const ALWAYS_ON_PROXIMITY = 0.92;
/** Degrees per second for the idle orbit. */
const IDLE_SWEEP_DEG_PER_SEC = 28;

export default function BorderGlow({
	children,
	className = "",
	edgeSensitivity = 30,
	glowColor = "221 100 57",
	backgroundColor = "var(--bg)",
	borderRadius = 20,
	glowRadius = 36,
	glowIntensity = 0.9,
	coneSpread = 25,
	colors = [...BRAND_MESH],
	fillOpacity = 0.45,
	alwaysOn = false,
}: BorderGlowProps) {
	const cardRef = useRef<HTMLDivElement>(null);
	const borderRef = useRef<HTMLDivElement>(null);
	const fillRef = useRef<HTMLDivElement>(null);
	const haloRef = useRef<HTMLSpanElement>(null);
	const shouldReduceMotion = useReducedMotion();
	const [isHovered, setIsHovered] = useState(false);
	const [cursorAngle, setCursorAngle] = useState(45);
	const [edgeProximity, setEdgeProximity] = useState(
		alwaysOn ? ALWAYS_ON_PROXIMITY : 0,
	);
	const angleRef = useRef(45);
	const isHoveredRef = useRef(false);
	const coneSpreadRef = useRef(coneSpread);
	coneSpreadRef.current = coneSpread;

	const applyAngleMasks = useCallback((degrees: number) => {
		const angleDeg = `${degrees.toFixed(3)}deg`;
		const border = borderRef.current;
		const fill = fillRef.current;
		const halo = haloRef.current;
		const spread = coneSpreadRef.current;
		const borderMask = conicBorderMask(angleDeg, spread);
		const fillMask = conicFillMasks(angleDeg);
		const haloMask = conicHaloMask(angleDeg);

		if (border) {
			border.style.maskImage = borderMask;
			border.style.webkitMaskImage = borderMask;
		}
		if (fill) {
			fill.style.maskImage = fillMask;
			fill.style.webkitMaskImage = fillMask;
		}
		if (halo) {
			halo.style.maskImage = haloMask;
			halo.style.webkitMaskImage = haloMask;
		}
	}, []);

	const getCenterOfElement = useCallback((el: HTMLElement) => {
		const { width, height } = el.getBoundingClientRect();
		return [width / 2, height / 2] as const;
	}, []);

	const getEdgeProximity = useCallback(
		(el: HTMLElement, x: number, y: number) => {
			const [cx, cy] = getCenterOfElement(el);
			const dx = x - cx;
			const dy = y - cy;
			let kx = Infinity;
			let ky = Infinity;
			if (dx !== 0) kx = cx / Math.abs(dx);
			if (dy !== 0) ky = cy / Math.abs(dy);
			return Math.min(Math.max(1 / Math.min(kx, ky), 0), 1);
		},
		[getCenterOfElement],
	);

	const getCursorAngle = useCallback(
		(el: HTMLElement, x: number, y: number) => {
			const [cx, cy] = getCenterOfElement(el);
			const dx = x - cx;
			const dy = y - cy;
			if (dx === 0 && dy === 0) return 0;
			const radians = Math.atan2(dy, dx);
			let degrees = radians * (180 / Math.PI) + 90;
			if (degrees < 0) degrees += 360;
			return degrees;
		},
		[getCenterOfElement],
	);

	const handlePointerMove = useCallback(
		(e: PointerEvent<HTMLDivElement>) => {
			if (shouldReduceMotion) return;
			const card = cardRef.current;
			if (!card) return;
			const rect = card.getBoundingClientRect();
			const x = e.clientX - rect.left;
			const y = e.clientY - rect.top;
			const nextAngle = getCursorAngle(card, x, y);
			angleRef.current = nextAngle;
			setEdgeProximity(getEdgeProximity(card, x, y));
			setCursorAngle(nextAngle);
			applyAngleMasks(nextAngle);
		},
		[getEdgeProximity, getCursorAngle, shouldReduceMotion, applyAngleMasks],
	);

	const handlePointerEnter = useCallback(() => {
		isHoveredRef.current = true;
		setIsHovered(true);
		if (shouldReduceMotion) {
			setEdgeProximity(ALWAYS_ON_PROXIMITY);
		}
	}, [shouldReduceMotion]);

	const handlePointerLeave = useCallback(() => {
		isHoveredRef.current = false;
		setIsHovered(false);
		setCursorAngle(angleRef.current);
		setEdgeProximity(alwaysOn ? ALWAYS_ON_PROXIMITY : 0);
	}, [alwaysOn]);

	useEffect(() => {
		if (!alwaysOn) return;
		setEdgeProximity(ALWAYS_ON_PROXIMITY);
	}, [alwaysOn]);

	useEffect(() => {
		if (!shouldReduceMotion) return;
		setEdgeProximity(alwaysOn || isHovered ? ALWAYS_ON_PROXIMITY : 0);
	}, [shouldReduceMotion, alwaysOn, isHovered]);

	// Idle orbit: drift the cone when always-on and not hovered (DOM-only, no React churn).
	useEffect(() => {
		if (!alwaysOn || shouldReduceMotion) return;

		let frame = 0;
		let last = performance.now();

		const tick = (now: number) => {
			const dt = Math.min((now - last) / 1000, 0.05);
			last = now;

			if (!isHoveredRef.current) {
				angleRef.current =
					(angleRef.current + IDLE_SWEEP_DEG_PER_SEC * dt) % 360;
				applyAngleMasks(angleRef.current);
			}

			frame = requestAnimationFrame(tick);
		};

		frame = requestAnimationFrame(tick);
		return () => cancelAnimationFrame(frame);
	}, [alwaysOn, shouldReduceMotion, applyAngleMasks]);

	const colorSensitivity = edgeSensitivity + 20;
	const isVisible = alwaysOn || isHovered;
	const borderOpacity = isVisible
		? Math.max(
				0,
				(edgeProximity * 100 - colorSensitivity) / (100 - colorSensitivity),
			)
		: 0;
	const glowOpacity = isVisible
		? Math.max(
				0,
				(edgeProximity * 100 - edgeSensitivity) / (100 - edgeSensitivity),
			)
		: 0;

	const meshGradients = buildMeshGradients(colors);
	const borderBg = meshGradients.map((g) => `${g} border-box`);
	const fillBg = meshGradients.map((g) => `${g} padding-box`);
	const angleDeg = `${cursorAngle.toFixed(3)}deg`;
	const fade = isVisible
		? "opacity 0.25s cubic-bezier(0.2, 0, 0, 1)"
		: "opacity 0.75s cubic-bezier(0.2, 0, 0, 1)";

	const borderLayerStyle: CSSProperties = {
		border: "1px solid transparent",
		background: [
			`linear-gradient(${backgroundColor} 0 100%) padding-box`,
			"linear-gradient(rgb(255 255 255 / 0%) 0% 100%) border-box",
			...borderBg,
		].join(", "),
		opacity: borderOpacity,
		maskImage: conicBorderMask(angleDeg, coneSpread),
		WebkitMaskImage: conicBorderMask(angleDeg, coneSpread),
		transition: fade,
	};

	const fillLayerStyle: CSSProperties = {
		border: "1px solid transparent",
		background: fillBg.join(", "),
		maskImage: conicFillMasks(angleDeg),
		WebkitMaskImage: conicFillMasks(angleDeg),
		maskComposite: "subtract, add, add, add, add, add",
		WebkitMaskComposite:
			"source-out, source-over, source-over, source-over, source-over, source-over",
		opacity: borderOpacity * fillOpacity,
		mixBlendMode: "soft-light",
		transition: fade,
	};

	const haloStyle: CSSProperties = {
		inset: `${-glowRadius}px`,
		maskImage: conicHaloMask(angleDeg),
		WebkitMaskImage: conicHaloMask(angleDeg),
		opacity: glowOpacity,
		transition: fade,
	};

	return (
		<div
			ref={cardRef}
			onPointerMove={handlePointerMove}
			onPointerEnter={handlePointerEnter}
			onPointerLeave={handlePointerLeave}
			className={`border-glow ${className}`.trim()}
			style={{
				background: backgroundColor,
				borderRadius: `${borderRadius}px`,
			}}
		>
			<div
				ref={borderRef}
				className="border-glow__border"
				style={borderLayerStyle}
				aria-hidden
			/>
			<div
				ref={fillRef}
				className="border-glow__fill"
				style={fillLayerStyle}
				aria-hidden
			/>
			<span
				ref={haloRef}
				className="border-glow__halo"
				style={haloStyle}
				aria-hidden
			>
				<span
					className="border-glow__halo-inner"
					style={{
						inset: `${glowRadius}px`,
						boxShadow: buildBoxShadow(glowColor, glowIntensity),
					}}
				/>
			</span>
			<div className="border-glow__content">{children}</div>
		</div>
	);
}
