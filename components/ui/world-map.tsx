"use client";

import Image from "next/image";
import { motion, useInView, useReducedMotion } from "motion/react";
import { useEffect, useRef, useState } from "react";
import { useTheme } from "@/components/providers/ThemeProvider";

type MapDot = {
	start: { lat: number; lng: number; label?: string };
	end: { lat: number; lng: number; label?: string };
};

type WorldMapProps = {
	dots?: MapDot[];
};

const MAP_STYLES = {
	light: {
		dots: "#1e3280",
		line: "#2563eb",
		dotRadius: 0.3,
		strokeWidth: 2,
		pointRadius: 4,
	},
	dark: {
		dots: "#ffffffd9",
		line: "#38d4ff",
		dotRadius: 0.24,
		strokeWidth: 1.4,
		pointRadius: 3.5,
	},
} as const;

const MAP_GRID_HEIGHT = {
	compact: 55,
	default: 100,
} as const;

const COMPACT_MAP_MEDIA_QUERY = "(max-width: 767px)";

function useCompactViewport() {
	const [isCompact, setIsCompact] = useState(false);

	useEffect(() => {
		const mediaQuery = window.matchMedia(COMPACT_MAP_MEDIA_QUERY);
		const sync = () => setIsCompact(mediaQuery.matches);

		sync();
		mediaQuery.addEventListener("change", sync);
		return () => mediaQuery.removeEventListener("change", sync);
	}, []);

	return isCompact;
}

function projectPoint(lat: number, lng: number) {
	const x = (lng + 180) * (800 / 360);
	const y = (90 - lat) * (400 / 180);
	return { x, y };
}

function createCurvedPath(
	start: { x: number; y: number },
	end: { x: number; y: number },
) {
	const midX = (start.x + end.x) / 2;
	const midY = Math.min(start.y, end.y) - 50;
	return `M ${start.x} ${start.y} Q ${midX} ${midY} ${end.x} ${end.y}`;
}

function AnimatedPath({
	d,
	index,
	inView,
	shouldReduceMotion,
	strokeWidth,
}: {
	d: string;
	index: number;
	inView: boolean;
	shouldReduceMotion: boolean | null;
	strokeWidth: number;
}) {
	return (
		<motion.path
			d={d}
			fill="none"
			stroke="url(#world-map-path-gradient)"
			strokeWidth={strokeWidth}
			initial={shouldReduceMotion ? false : { pathLength: 0 }}
			animate={
				inView || shouldReduceMotion ? { pathLength: 1 } : { pathLength: 0 }
			}
			transition={{
				duration: 1.5,
				delay: 0.3 * index,
				ease: "easeOut",
			}}
		/>
	);
}

export default function WorldMap({ dots = [] }: WorldMapProps) {
	const { theme } = useTheme();
	const isCompact = useCompactViewport();
	const ref = useRef<HTMLDivElement>(null);
	const inView = useInView(ref, { once: true, margin: "0px", amount: 0.3 });
	const shouldReduceMotion = useReducedMotion();
	const [svgMaps, setSvgMaps] = useState<{
		light: string;
		dark: string;
	} | null>(null);
	const styles = MAP_STYLES[theme];
	const svgMap = svgMaps?.[theme] ?? null;
	const gridHeight = isCompact
		? MAP_GRID_HEIGHT.compact
		: MAP_GRID_HEIGHT.default;

	useEffect(() => {
		let cancelled = false;

		void import("dotted-map").then(({ default: DottedMap }) => {
			if (cancelled) return;

			const map = new DottedMap({ height: gridHeight, grid: "diagonal" });
			setSvgMaps({
				light: map.getSVG({
					radius: MAP_STYLES.light.dotRadius,
					color: MAP_STYLES.light.dots,
					shape: "circle",
					backgroundColor: "transparent",
				}),
				dark: map.getSVG({
					radius: MAP_STYLES.dark.dotRadius,
					color: MAP_STYLES.dark.dots,
					shape: "circle",
					backgroundColor: "transparent",
				}),
			});
		});

		return () => {
			cancelled = true;
		};
	}, [gridHeight]);

	const mapShellClassName =
		"relative mx-auto w-full min-h-[clamp(300px,44vw,560px)] aspect-[2/1] max-w-[min(100%,96rem)]";

	if (!svgMap) {
		return (
			<div
				ref={ref}
				aria-hidden
				className={`${mapShellClassName} animate-pulse rounded-lg bg-black/5 dark:bg-white/8`}
			/>
		);
	}

	return (
		<div ref={ref} className={mapShellClassName}>
			<Image
				src={`data:image/svg+xml;utf8,${encodeURIComponent(svgMap)}`}
				className="pointer-events-none h-full w-full select-none object-contain"
				alt=""
				height={560}
				width={1120}
				draggable={false}
				unoptimized
				aria-hidden
			/>
			<svg
				viewBox="0 0 800 400"
				className="pointer-events-none absolute inset-0 size-full select-none"
				preserveAspectRatio="xMidYMid meet"
				aria-hidden
			>
				<defs>
					<linearGradient
						id="world-map-path-gradient"
						x1="0%"
						y1="0%"
						x2="100%"
						y2="0%"
					>
						<stop offset="0%" stopColor={styles.line} stopOpacity="0" />
						<stop offset="8%" stopColor={styles.line} stopOpacity="1" />
						<stop offset="92%" stopColor={styles.line} stopOpacity="1" />
						<stop offset="100%" stopColor={styles.line} stopOpacity="0" />
					</linearGradient>
				</defs>

				{dots.map((dot, i) => {
					const startPoint = projectPoint(dot.start.lat, dot.start.lng);
					const endPoint = projectPoint(dot.end.lat, dot.end.lng);

					return (
						<AnimatedPath
							key={`path-${i}`}
							d={createCurvedPath(startPoint, endPoint)}
							index={i}
							inView={inView}
							shouldReduceMotion={shouldReduceMotion}
							strokeWidth={styles.strokeWidth}
						/>
					);
				})}

				{dots.map((dot, i) => {
					const startPoint = projectPoint(dot.start.lat, dot.start.lng);
					const endPoint = projectPoint(dot.end.lat, dot.end.lng);

					return (
						<g key={`points-${i}`}>
							{[startPoint, endPoint].map((point, pointIndex) => (
								<g key={pointIndex}>
									<circle
										cx={point.x}
										cy={point.y}
										r={styles.pointRadius}
										fill={styles.line}
									/>
									<circle
										cx={point.x}
										cy={point.y}
										r={styles.pointRadius}
										fill={styles.line}
										opacity="0.45"
									>
										<animate
											attributeName="r"
											from={styles.pointRadius}
											to={styles.pointRadius + 7}
											dur="1.5s"
											begin="0s"
											repeatCount="indefinite"
										/>
										<animate
											attributeName="opacity"
											from="0.45"
											to="0"
											dur="1.5s"
											begin="0s"
											repeatCount="indefinite"
										/>
									</circle>
								</g>
							))}
						</g>
					);
				})}
			</svg>
		</div>
	);
}
