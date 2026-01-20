"use client";

import { useState, useEffect, useRef } from "react";
import { Cloud } from "lucide-react";
import { pageInfoConstants } from "@/lib/constants";

export default function Industries() {
	const [hoveredCard, setHoveredCard] = useState<number | null>(null);
	const [isMobile, setIsMobile] = useState(false);
	const cardRefs = useRef<(HTMLDivElement | null)[]>([]);
	const { industries } = pageInfoConstants.home;

	// Detect if device is mobile/tablet
	useEffect(() => {
		const checkMobile = () => {
			setIsMobile(window.innerWidth < 1024); // lg breakpoint
		};

		checkMobile();
		window.addEventListener("resize", checkMobile);
		return () => window.removeEventListener("resize", checkMobile);
	}, []);

	// Intersection Observer for mobile scroll hover effect
	useEffect(() => {
		if (!isMobile) return;

		const observers: IntersectionObserver[] = [];

		cardRefs.current.forEach((card, index) => {
			if (!card) return;

			const observer = new IntersectionObserver(
				(entries) => {
					entries.forEach((entry) => {
						if (entry.isIntersecting && entry.intersectionRatio > 0.5) {
							setHoveredCard(index);
						}
					});
				},
				{
					threshold: [0.5],
					rootMargin: "-20% 0px -20% 0px",
				},
			);

			observer.observe(card);
			observers.push(observer);
		});

		return () => {
			observers.forEach((observer) => observer.disconnect());
		};
	}, [isMobile]);
	const getDarkCard = () => (hoveredCard !== null ? hoveredCard : 0);

	return (
		<section className="bg-white py-12 md:py-16 max-md:px-10 max-sm:px-4">
			<div>
				<div className="mb-8 md:mb-12">
					<h2 className="text-3xl md:text-5xl font-bold text-center max-sm:text-start text-gray-900 leading-tight">
						{industries.title}
					</h2>
				</div>
				<div className="p-4"></div>
				<div className="relative">
					<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 lg:px-6 xl:max-w-7xl xl:mx-auto mb-6">
						{industries.list.map((slide, index) => {
							const isDark = getDarkCard() === index;
							return (
								<div
									key={index}
									ref={(el) => {
										cardRefs.current[index] = el;
									}}
									className={`flex flex-col p-4 md:p-5 rounded-2xl transition-all duration-300 h-100px min-h-75 ${
										isDark
											? "bg-slate-900 text-white"
											: "bg-gray-100 text-gray-900"
									} ${hoveredCard === index ? "ring-2 ring-[#0a61cb] shadow-md md:shadow-lg scale-[1.02]" : "hover:shadow-md"}`}
									onMouseEnter={() => !isMobile && setHoveredCard(index)}
									onMouseLeave={() => !isMobile && setHoveredCard(null)}
								>
									<div className="mb-4">
										<Cloud
											className={`w-9 h-9 md:w-10 md:h-10 ${isDark ? "text-blue-400" : "text-[#0a61cb]"}`}
										/>
									</div>

									<h3 className="text-lg md:text-xl font-bold mb-2 leading-snug">
										{slide.title}
									</h3>

									<p
										className={`text-md leading-relaxed text-balance ${
											isDark ? "text-gray-300" : "text-gray-600"
										}`}
										style={{
											display: "-webkit-box",
											WebkitLineClamp: 6, // clamp to keep content inside the card
											WebkitBoxOrient: "vertical",
											overflow: "hidden",
										}}
										title={slide.description}
									>
										{slide.description}
									</p>
								</div>
							);
						})}
					</div>
				</div>
				<div className="py-10" />
			</div>
		</section>
	);
}
