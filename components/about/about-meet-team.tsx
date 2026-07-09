"use client";

import { ChevronLeft, ChevronRight } from "lucide-react";
import { motion, useInView, useReducedMotion } from "motion/react";
import Image from "next/image";
import { useTranslations } from "next-intl";
import { useRef } from "react";
import SectionHead from "@/components/index/section-head";
import { teamMembers } from "@/data/team-members";

const revealEase = [0.22, 1, 0.36, 1] as const;

const cardVariants = {
	hidden: { opacity: 0, y: 28 },
	visible: (index: number) => ({
		opacity: 1,
		y: 0,
		transition: {
			duration: 0.5,
			ease: revealEase,
			delay: index * 0.06,
		},
	}),
};

function getCardStep(el: HTMLDivElement): number {
	const first = el.children[0] as HTMLElement | undefined;
	const second = el.children[1] as HTMLElement | undefined;

	if (!first) return el.clientWidth;
	if (!second) return first.offsetWidth;

	return second.offsetLeft - first.offsetLeft;
}

function getPageSize(el: HTMLDivElement): number {
	const cardStep = getCardStep(el);
	if (cardStep <= 0) return 1;

	return Math.max(1, Math.floor(el.clientWidth / cardStep));
}

function isAtStart(el: HTMLDivElement): boolean {
	return el.scrollLeft <= 1;
}

function isAtEnd(el: HTMLDivElement): boolean {
	return el.scrollLeft + el.clientWidth >= el.scrollWidth - 1;
}

function scrollByPage(el: HTMLDivElement, direction: "left" | "right"): void {
	if (direction === "right" && isAtEnd(el)) {
		el.scrollTo({ left: 0, behavior: "smooth" });
		return;
	}

	if (direction === "left" && isAtStart(el)) {
		el.scrollTo({ left: el.scrollWidth - el.clientWidth, behavior: "smooth" });
		return;
	}

	const pageSize = getPageSize(el);
	const scrollAmount = pageSize * getCardStep(el);

	el.scrollBy({
		left: direction === "right" ? scrollAmount : -scrollAmount,
		behavior: "smooth",
	});
}

export default function AboutMeetTeam() {
	const t = useTranslations("about.team");
	const sectionRef = useRef<HTMLElement>(null);
	const carouselRef = useRef<HTMLDivElement>(null);
	const inView = useInView(sectionRef, { once: true, margin: "-8% 0px" });
	const shouldReduceMotion = useReducedMotion();

	const scroll = (direction: "left" | "right") => {
		const el = carouselRef.current;
		if (!el) return;
		scrollByPage(el, direction);
	};

	const scrollToCard = (index: number) => {
		const el = carouselRef.current;
		if (!el) return;

		const card = el.children[index] as HTMLElement | undefined;
		if (!card) return;

		const containerRect = el.getBoundingClientRect();
		const cardRect = card.getBoundingClientRect();
		const scrollLeft =
			el.scrollLeft +
			(cardRect.left - containerRect.left) -
			(containerRect.width - cardRect.width) / 2;

		el.scrollTo({ left: scrollLeft, behavior: "smooth" });
	};

	return (
		<section
			ref={sectionRef}
			className="home-section home-section--tight home-feature-alt overflow-hidden"
		>
			<div className="home-wrap">
				<SectionHead
					eyebrow={t("eyebrow")}
					headline={t("headline")}
					description={t("description")}
					centered
				/>
			</div>

			<div className="relative mt-[var(--home-stack)]">
				<div className="pointer-events-none absolute inset-y-0 left-0 right-0 z-20 flex items-center justify-between px-[var(--home-inline)]">
					<button
						type="button"
						onClick={() => scroll("left")}
						aria-label={t("scroll_left")}
						className="about-team-carousel__nav pointer-events-auto"
					>
						<ChevronLeft className="size-4" aria-hidden />
					</button>
					<button
						type="button"
						onClick={() => scroll("right")}
						aria-label={t("scroll_right")}
						className="about-team-carousel__nav pointer-events-auto"
					>
						<ChevronRight className="size-4" aria-hidden />
					</button>
				</div>

				<div
					ref={carouselRef}
					className="about-team-carousel flex gap-4 overflow-x-auto scroll-smooth pb-4 md:gap-6 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
				>
					{teamMembers.map((member, index) => (
						<motion.div
							key={member.name}
							custom={index}
							initial={shouldReduceMotion ? false : "hidden"}
							animate={inView ? "visible" : "hidden"}
							variants={cardVariants}
							className="about-team-carousel__card shrink-0"
						>
							<button
								type="button"
								onClick={() => scrollToCard(index)}
								className="group block w-full text-left"
							>
								<div className="about-team-carousel__photo overflow-hidden">
									<Image
										src={member.image}
										alt={member.name}
										fill
										sizes="(max-width: 640px) 72vw, (max-width: 1024px) 40vw, 22vw"
										priority={index < 4}
										className="object-cover object-top transition-transform duration-500 ease-out group-hover:scale-[1.04]"
									/>
								</div>
								<div className="mt-4 text-center">
									<h3 className="text-[17px] font-semibold text-[var(--text-h)]">
										{member.name}
									</h3>
									<p className="mt-0.5 text-sm text-[var(--text)]">
										{member.role}
									</p>
								</div>
							</button>
						</motion.div>
					))}
				</div>
			</div>
		</section>
	);
}
