"use client";

import {
	motion,
	useMotionValue,
	useReducedMotion,
} from "motion/react";
import {
	useEffect,
	useRef,
	type RefObject,
} from "react";

const BLOBS = [
	{
		className: "home-hero__blob home-hero__blob--primary",
		speedX: 0.22,
		speedY: -0.18,
	},
	{
		className: "home-hero__blob home-hero__blob--secondary",
		speedX: -0.2,
		speedY: 0.16,
	},
	{
		className: "home-hero__blob home-hero__blob--accent home-hero__blob--teal",
		speedX: 0.17,
		speedY: 0.19,
	},
	{
		className: "home-hero__blob home-hero__blob--accent home-hero__blob--violet",
		speedX: -0.19,
		speedY: -0.15,
	},
] as const;

type BlobBounds = {
	baseLeft: number;
	baseTop: number;
	width: number;
	height: number;
};

type BouncingBlobProps = {
	className: string;
	speedX: number;
	speedY: number;
	containerRef: RefObject<HTMLDivElement | null>;
	enabled: boolean;
};

function measureBlob(
	container: HTMLDivElement,
	blob: HTMLDivElement,
): BlobBounds {
	const containerRect = container.getBoundingClientRect();
	const blobRect = blob.getBoundingClientRect();

	return {
		baseLeft: blobRect.left - containerRect.left,
		baseTop: blobRect.top - containerRect.top,
		width: blobRect.width,
		height: blobRect.height,
	};
}

function BouncingBlob({
	className,
	speedX,
	speedY,
	containerRef,
	enabled,
}: BouncingBlobProps) {
	const blobRef = useRef<HTMLDivElement>(null);
	const boundsRef = useRef<BlobBounds | null>(null);
	const velocityRef = useRef({ x: speedX, y: speedY });
	const x = useMotionValue(0);
	const y = useMotionValue(0);

	useEffect(() => {
		const container = containerRef.current;
		const blob = blobRef.current;
		if (!container || !blob) return;

		const syncBounds = () => {
			x.set(0);
			y.set(0);
			boundsRef.current = measureBlob(container, blob);
		};

		syncBounds();

		const observer = new ResizeObserver(syncBounds);
		observer.observe(container);

		return () => observer.disconnect();
	}, [containerRef, x, y]);

	useEffect(() => {
		if (!enabled) return;

		let frameId = 0;
		let lastTime = performance.now();

		const tick = (time: number) => {
			const container = containerRef.current;
			const bounds = boundsRef.current;

			if (container && bounds) {
				const delta = Math.min((time - lastTime) / 16.667, 2.5);
				const containerWidth = container.clientWidth;
				const containerHeight = container.clientHeight;

				let nextX = x.get() + velocityRef.current.x * delta;
				let nextY = y.get() + velocityRef.current.y * delta;

				const left = bounds.baseLeft + nextX;
				const top = bounds.baseTop + nextY;
				const right = left + bounds.width;
				const bottom = top + bounds.height;

				if (left <= 0) {
					nextX = -bounds.baseLeft;
					velocityRef.current.x = Math.abs(velocityRef.current.x);
				} else if (right >= containerWidth) {
					nextX = containerWidth - bounds.width - bounds.baseLeft;
					velocityRef.current.x = -Math.abs(velocityRef.current.x);
				}

				if (top <= 0) {
					nextY = -bounds.baseTop;
					velocityRef.current.y = Math.abs(velocityRef.current.y);
				} else if (bottom >= containerHeight) {
					nextY = containerHeight - bounds.height - bounds.baseTop;
					velocityRef.current.y = -Math.abs(velocityRef.current.y);
				}

				x.set(nextX);
				y.set(nextY);
			}

			lastTime = time;
			frameId = requestAnimationFrame(tick);
		};

		frameId = requestAnimationFrame(tick);

		return () => cancelAnimationFrame(frameId);
	}, [containerRef, enabled, x, y]);

	return (
		<motion.div
			ref={blobRef}
			className={className}
			style={{ x, y, animation: "none" }}
		/>
	);
}

export default function HeroBlobs() {
	const containerRef = useRef<HTMLDivElement>(null);
	const shouldReduceMotion = useReducedMotion();

	return (
		<div ref={containerRef} className="home-hero__blobs" aria-hidden>
			{BLOBS.map(({ className, speedX, speedY }) => (
				<BouncingBlob
					key={className}
					className={className}
					speedX={speedX}
					speedY={speedY}
					containerRef={containerRef}
					enabled={!shouldReduceMotion}
				/>
			))}
		</div>
	);
}
