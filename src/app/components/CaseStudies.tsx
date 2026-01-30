"use client";

import { useRef, useLayoutEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { TextPlugin } from "gsap/TextPlugin";
import { AlignEndHorizontal, ArrowRight } from "lucide-react";
import { useRouter } from "next/navigation";
import { pageInfoConstants } from "@/lib/constants";

// Register GSAP plugins (safe on client)
if (typeof window !== "undefined") {
	gsap.registerPlugin(ScrollTrigger, TextPlugin);
}

// --- UTILITY FUNCTIONS ---
const splitTextIntoWords = (text: string) => {
	return text.split(" ").map((word, index) => (
		<span
			key={index}
			className="word-animate inline-block"
			style={{ marginRight: "0.25em" }}
		>
			{word}
		</span>
	));
};

// --- PRESENTATIONAL COMPONENTS (NO ANIMATION LOGIC) ---
const ArrowIcon = ({ className = "stroke-black" }: { className?: string }) => (
	<svg
		width="24"
		height="24"
		viewBox="0 0 24 24"
		fill="none"
		xmlns="http://www.w3.org/2000/svg"
		className={className}
	>
		<path
			d="M7 17L17 7"
			stroke="currentColor"
			strokeWidth="2"
			strokeLinecap="round"
			strokeLinejoin="round"
		/>
		<path
			d="M8 7H17V16"
			stroke="currentColor"
			strokeWidth="2"
			strokeLinecap="round"
			strokeLinejoin="round"
		/>
	</svg>
);

const Pill = ({ text }: { text: string }) => (
	<span className="bg-sky-200 text-black px-5 py-2 rounded-full font-semibold text-sm">
		{text}
	</span>
);

const ViewAllButton = () => {
	const router = useRouter();
	const buttonRef = useRef<HTMLButtonElement | null>(null);
	const arrowRef = useRef<HTMLSpanElement | null>(null);

	const handleMouseEnter = () => {
		gsap.to(buttonRef.current, {
			scale: 1.05,
			backgroundColor: "#374151",
			color: "#FFFFFF",
			duration: 0.3,
			ease: "power2.out",
		});
		gsap.to(arrowRef.current, { x: 8, duration: 0.3, ease: "power2.out" });
	};

	const handleMouseLeave = () => {
		gsap.to(buttonRef.current, {
			scale: 1,
			backgroundColor: "transparent",
			color: "#374151",
			duration: 0.3,
			ease: "power2.out",
		});
		gsap.to(arrowRef.current, { x: 0, duration: 0.3, ease: "power2.out" });
	};

	return (
		<div className="flex justify-center my-10">
			<button
				ref={buttonRef}
				onClick={() => router.push("/services")} // Changed to a relevant route
				onMouseEnter={handleMouseEnter}
				onMouseLeave={handleMouseLeave}
				className="group flex items-center gap-3 px-8 py-4 border-2 border-gray-700 rounded-full text-gray-900 font-semibold text-lg  hover:bg-linear-to-br from-black to-sky-900 hover:text-white"
			>
				{/* UPDATED BUTTON TEXT */}
				<span>View More of Our Services</span>
				<span ref={arrowRef} className=" ">
					<ArrowRight className="text-xl " />
				</span>
			</button>
		</div>
	);
};

const InfoCard = ({
	tag,
	features,
	subtitle,
}: {
	tag: string;
	features: readonly string[];
	subtitle: string;
}) => (
	<div className="cardBlu info-card-container relative bg-sky-200 p-8 rounded-3xl grow flex flex-col justify-between min-h-75 transform-gpu">
		<div>
			<div className="info-tag bg-linear-to-br from-black to-sky-900 text-white text-lg font-semibold px-6 py-2 rounded-full inline-block">
				{tag}
			</div>
		</div>
		<div className="mt-16">
			<div className="text-xl font-medium info-features">
				{splitTextIntoWords(features.join(" → "))}
			</div>
			<div className="text-xl font-medium mt-2 info-subtitle">
				{splitTextIntoWords(subtitle)}
			</div>
		</div>
		<div className="arrow-icon max-sm:hidden absolute top-6 right-6 w-16 h-16 bg-[#f8f7f4] text-gray-900 rounded-full flex items-center justify-center cursor-pointer shadow-md hover:scale-105 transition-transform transform-gpu">
			<ArrowIcon className="" />
		</div>
	</div>
);

const MetricCard = ({
	value,
	label,
	bgColor = "bg-white",
	textColor = "text-black",
	children,
}: {
	value: string;
	label: string;
	bgColor?: string;
	textColor?: string;
	children?: React.ReactNode;
}) => (
	<div
		className={`${bgColor} ${textColor} rounded-3xl flex flex-col p-8 shadow-md overflow-hidden h-full transform-gpu`}
	>
		<div className="text-center shrink-0">
			<p className="metric-value text-7xl font-light">{value}</p>
			<div className="text-xl mt-2 metric-label">
				{splitTextIntoWords(label)}
			</div>
		</div>
		<div className="grow flex flex-col justify-center items-center mt-8">
			{children}
		</div>
	</div>
);

const MiniCaseStudyCard = ({
	title,
	metric,
	description,
}: {
	tag: string;
	title: string;
	metric: { value: string; label: string };
	description: string;
}) => (
	<div className="mini-case-study bg-slate-50 p-6 rounded-3xl shadow-md hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 flex flex-col group cursor-pointer transform-gpu">
		<div className="flex justify-between items-start mb-4">
			<span className="text-gray-700 px-4 py-1 rounded-full sky font-semibold text-xs uppercase tracking-wider"></span>
			<div className="text-right shrink-0 ml-4">
				<p className="metric-number text-4xl font-semibold text-[#0a61cb]"></p>
				<p className="text-sm text-gray-700">{metric.label}</p>
			</div>
		</div>
		<div className="case-study-title text-xl font-semibold text-gray-700">
			{splitTextIntoWords(title)}
		</div>
		<p className="case-study-desc text-balance text-gray-700 leading-relaxed mt-2 grow">
			{description}
		</p>
		<div className="flex justify-end mt-6">
			<div className="w-12 h-12 bg-linear-to-br from-black to-sky-900 rounded-full flex items-center justify-center transform group-hover:scale-110 group-hover:bg-gray-800 transition-all duration-300">
				<AlignEndHorizontal className="stroke-white text-white stroke-1 md:stroke-2" />
			</div>
		</div>
	</div>
);

// --- MAIN COMPONENT (ORCHESTRATOR) ---
const SolutionPillars: React.FC = () => {
	const mainRef = useRef<HTMLDivElement | null>(null);

	// REPURPOSED 'caseStudiesData' to 'whyUsData' for your new content
	const { unlockYourPotential } = pageInfoConstants.home;

	// --- MASTER ANIMATION LOGIC (UNCHANGED) ---
	useLayoutEffect(() => {
		if (!mainRef.current) return;

		const ctx = gsap.context(() => {
			// Helper for word animations
			const animateWords = (elem: Element | null, delay = 0) => {
				if (!elem) return;
				const words = elem.querySelectorAll(".word-animate");
				if (words.length === 0) return;

				gsap.set(words, { opacity: 0, y: 30, rotationX: -90 });
				gsap.to(words, {
					opacity: 1,
					y: 0,
					rotationX: 0,
					duration: 0.8,
					ease: "back.out(1.7)",
					stagger: 0.1,
					delay,
					scrollTrigger: {
						trigger: elem as HTMLElement,
						start: "top 85%",
						once: true,
					},
				});
			};

			// Helper for paragraph/block animations
			const animateBlock = (elem: Element | null, delay = 0) => {
				if (!elem) return;
				gsap.from(elem, {
					opacity: 0,
					y: 40,
					filter: "blur(8px)",
					duration: 1,
					ease: "power3.out",
					delay,
					scrollTrigger: {
						trigger: elem as HTMLElement,
						start: "top 90%",
						once: true,
					},
				});
			};

			// 1. Main Title Animation
			gsap.utils
				.toArray<HTMLElement>(".main-title .word-animate-parent")
				.forEach((el, i) => {
					animateWords(el, i * 0.3);
				});

			// 2. InfoCard Animation
			const infoCard = mainRef.current!.querySelector(
				".info-card-container",
			) as HTMLElement;
			gsap.from(infoCard, {
				opacity: 0,
				y: 50,
				scale: 0.95,
				duration: 0.8,
				ease: "back.out(1.7)",
				scrollTrigger: {
					trigger: infoCard,
					start: "top 85%",
					once: true,
				},
			});
			// animateWords(infoCard.querySelector(".info-features"), 0.4);
			// animateWords(infoCard.querySelector(".info-subtitle"), 0.2);
			gsap.from(infoCard.querySelector(".arrow-icon") as HTMLElement, {
				opacity: 0,
				scale: 0,
				rotation: -180,
				duration: 0.8,
				ease: "back.out(1.7)",
				delay: 0.3,
				scrollTrigger: {
					trigger: infoCard,
					start: "top 85%",
					once: true,
				},
			});

			// 3. Metric Cards Animation
			gsap.utils.toArray<HTMLElement>(".metric-card").forEach((card, i) => {
				gsap.from(card, {
					opacity: 0,
					y: 50,
					scale: 0.9,
					duration: 0.8,
					ease: "back.out(1.7)",
					delay: i * 0.1,
					scrollTrigger: {
						trigger: card,
						start: "top 90%",
						once: true,
					},
				});

				const valueEl = card.querySelector(
					".metric-value",
				) as HTMLElement | null;
				const numMatch = valueEl?.textContent?.match(/(\d+)/);
				if (valueEl && numMatch) {
					gsap.from(valueEl, {
						textContent: valueEl.textContent!.replace(numMatch[1], "0"),
						duration: 2,
						ease: "power2.out",
						snap: { textContent: 1 },
						delay: 0.5,
						scrollTrigger: {
							trigger: card,
							start: "top 90%",
							once: true,
						},
					});
				}
				animateWords(card.querySelector(".metric-label"), 0.8);
			});

			// 4. Mini Case Studies Animation
			gsap.utils.toArray<HTMLElement>(".mini-case-study").forEach((card, i) => {
				gsap.from(card, {
					opacity: 0,
					y: 60,
					scale: 0.9,
					duration: 0.6,
					ease: "back.out(1.7)",
					delay: i * 0.1,
					scrollTrigger: {
						trigger: card,
						start: "top 90%",
						once: true,
					},
				});

				const metricNum = card.querySelector(
					".metric-number",
				) as HTMLElement | null;
				if (metricNum && /\d+/.test(metricNum.textContent || "")) {
					gsap.from(metricNum, {
						textContent: metricNum.textContent!.replace(/\d+/, "0"),
						duration: 1,
						ease: "power2.out",
						snap: { textContent: 1 },
						scrollTrigger: {
							trigger: card,
							start: "top 90%",
							once: true,
						},
					});
				}
				animateWords(card.querySelector(".case-study-title"), 0.3);
				animateBlock(card.querySelector(".case-study-desc"));
			});

			// 5. "View All" Button
			const viewAllButton = mainRef.current!.querySelector(
				".view-all-button-container",
			) as HTMLElement;
			animateBlock(viewAllButton);
		}, mainRef);

		return () => ctx.revert();
	}, []);

	const { whyOurClientsChooseUs } = pageInfoConstants.home;
	return (
		<div
			ref={mainRef}
			className="bg-white text-gray-900 min-h-screen p-6 sm:p-8 lg:p-12 font-sans"
		>
			<div className="p-4"></div>
			<main className="grid grid-cols-1 max-w-7xl mx-auto lg:grid-cols-10 gap-8">
				<div className="lg:col-span-5 flex flex-col gap-8">
					<div className="main-title">
						<div className="text-5xl max-sm:text-3xl pl-2 font-semibold leading-tight tracking-tighter word-animate-parent transform-gpu">
							{splitTextIntoWords(unlockYourPotential.mainTitle.part1)}
						</div>
						<div className="text-5xl pl-2 max-sm:text-3xl font-semibold leading-tight tracking-tighter word-animate-parent transform-gpu">
							{splitTextIntoWords(unlockYourPotential.mainTitle.highlight)}
						</div>
						<div className="text-5xl max-sm:text-3xl pl-2 font-semibold leading-tight tracking-tighter word-animate-parent transform-gpu">
							{splitTextIntoWords(unlockYourPotential.mainTitle.part2)}
						</div>
					</div>
					<InfoCard {...unlockYourPotential.infoCard} />
				</div>

				<div className="lg:col-span-2 metric-card max-md:hidden  ">
					<MetricCard {...unlockYourPotential.metric1}>
						<div className="w-full h-full min-h-62.5 flex items-center  justify-start rounded-lg">
							<p className="text-gray-700 font-medium text-xl text-balance pt-20 text-start p-4">
								{unlockYourPotential.metric1.subtitle}
							</p>
						</div>
					</MetricCard>
				</div>

				<div className="lg:col-span-3 metric-card">
					<MetricCard
						value={unlockYourPotential.metric2.value}
						label={unlockYourPotential.metric2.label}
						bgColor="bg-gradient-to-br from-black to-sky-900"
						textColor="text-white"
					>
						<div className="grid grid-cols-2 gap-3 mb-6">
							{unlockYourPotential.metric2.skills.map((skill) => (
								<Pill key={skill} text={skill} />
							))}
						</div>
						<div className="w-full h-full min-h-37.5  flex items-center justify-center rounded-lg">
							<p className="text-white text-2xl font-medium text-start p-4">
								{unlockYourPotential.metric2.subtitle}
							</p>
						</div>
					</MetricCard>
				</div>
			</main>

			<section className="py-16 max-w-7xl mx-auto md:pt-24">
				<div className="text-center mb-12">
					{/* UPDATED SECTION TITLE */}
					<div className="text-4xl md:text-5xl font-semibold leading-tight tracking-tighter word-animate-parent max-md:text-start transform-gpu">
						{splitTextIntoWords(whyOurClientsChooseUs.title)}
					</div>
					{/* UPDATED SECTION DESCRIPTION */}
					<p className="mt-4 text-lg text-gray-700 text-balance max-w-2xl mx-auto case-study-desc max-md:text-start transform-gpu">
						{whyOurClientsChooseUs.description}
					</p>
				</div>
				<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
					{/* Mapped the new "Why Us" data */}
					{whyOurClientsChooseUs.list.map((item, index) => (
						<MiniCaseStudyCard key={index} {...item} />
					))}
				</div>
			</section>

			<div className="view-all-button-container transform-gpu">
				<ViewAllButton />
			</div>
		</div>
	);
};

export default SolutionPillars;
