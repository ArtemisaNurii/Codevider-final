"use client";
import { pageInfoConstants } from "@/lib/constants/index";
import React, { useState, useEffect, useRef } from "react";

const useIntersectionObserver = (options: IntersectionObserverOptions = {}) => {
	const [hasAnimated, setHasAnimated] = useState(false);
	const ref = useRef<HTMLDivElement>(null);

	useEffect(() => {
		const observer = new IntersectionObserver(
			([entry]) => {
				if (entry.isIntersecting && !hasAnimated) {
					setHasAnimated(true);
				}
			},
			{
				threshold: 0.1,
				rootMargin: "0px 0px -50px 0px",
				...options,
			},
		);

		const currentRef = ref.current;
		if (currentRef) {
			observer.observe(currentRef);
		}

		return () => {
			if (currentRef) {
				observer.unobserve(currentRef);
			}
		};
	}, [hasAnimated, options]);

	return { ref, hasAnimated };
};

// Define the data for the steps.
const { processSteps } = pageInfoConstants.services;
// A reusable component for each individual process step
const ProcessStep: React.FC<ProcessStepProps> = ({
	step,
	title,
	description,
	delay = 0,
}) => {
	const { ref: stepRef, hasAnimated } = useIntersectionObserver();

	return (
		<div
			ref={stepRef}
			className={`transition-all duration-700   font-semiboldtransform ${
				hasAnimated ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
			}`}
			style={{
				transitionDelay: hasAnimated ? `${delay}ms` : "0ms",
			}}
		>
			<p className="text-sm  lg:text-lg font-bold text-sky-700 tracking-[0.2em] uppercase">
				{step}
			</p>
			<h3 className="text-base md:text-lg lg:text-lg font-bold text-gray-900 uppercase tracking-wider mt-4 mb-3">
				{title}
			</h3>
			{/* The short blue divider line */}
			<div className="border-b border-[#38bdf8] w-1/4 mb-4"></div>
			<p className="text-gray-700 text-sm md:text-base text-balance lg:text-md leading-relaxed">
				{description}
			</p>
		</div>
	);
};

const Processes = () => {
	return (
		<section
			id="process"
			className="font-sans  text-gray-900 p-6  bg-white max-sm:pt-10  pb-20"
		>
			<div className="p-10 max-sm:p-0"></div>
			<div className="container mx-auto  max-w-7xl">
				{/* Header Section (03 Removed) */}
				<div className="grid grid-cols-1 lg:grid-cols-5 gap-12 items-start mb-20">
					<div className="lg:col-span-2">
						<h2 className="text-4xl sm:text-5xl font-semibold">Process</h2>
					</div>
					<div className="lg:col-span-3 text-gray-700 text-balance text-base md:text-lg lg:text-xl leading-relaxed space-y-4 pt-2">
						<p>
							Our clients’needs guide every step. We begin with a hands‑on
							discovery phase-aligning on goals, defining the product vision,
							and documenting core assumptions in a shared worksheet.
						</p>
					</div>
				</div>

				<div className="grid grid-cols-1 lg:grid-cols-3 gap-x-8 gap-y-16">
					{/* Column 1: Step 1 */}
					<div className="space-y-16">
						<ProcessStep {...processSteps[1]} />
					</div>

					{/* Column 2: Step 2 and Step 4 */}
					<div className="space-y-16">
						<ProcessStep {...processSteps[2]} />
						<ProcessStep {...processSteps[4]} />
					</div>

					{/* Column 3: Step 3, Step 5, and Step 6 */}
					<div className="space-y-16">
						<ProcessStep {...processSteps[3]} />
						<ProcessStep {...processSteps[5]} />
						<ProcessStep {...processSteps[6]} />
					</div>
				</div>
			</div>
			<div className="p-12"></div>
		</section>
	);
};

export default Processes;
