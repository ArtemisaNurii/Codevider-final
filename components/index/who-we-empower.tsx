"use client";

import {
	Bot,
	Building2,
	ChevronLeft,
	ChevronRight,
	Code,
	CreditCard,
	Database,
	MessageSquare,
	PenLine,
	Smartphone,
} from "lucide-react";
import { motion, useReducedMotion } from "motion/react";
import { useRef, type KeyboardEvent } from "react";
import { useCopy } from "@/lib/copy";
import {
	sectionItemTransition,
	sectionRevealItem,
	useSectionReveal,
} from "@/hooks/use-section-reveal";
import SectionHead from "./section-head";

const CARDS = [
	{ id: "ai", icon: Bot },
	{ id: "startups", icon: PenLine },
	{ id: "enterprise", icon: Building2 },
	{ id: "crm", icon: MessageSquare },
	{ id: "fintech", icon: CreditCard },
	{ id: "data", icon: Database },
	{ id: "mobile", icon: Smartphone },
	{ id: "custom", icon: Code },
] as const;

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

	// Round so a full row (e.g. 4 cards) isn't floored to 3 from sub-pixel gap math.
	return Math.max(1, Math.round(el.clientWidth / cardStep));
}

function getPageCount(el: HTMLDivElement): number {
	const pageSize = getPageSize(el);
	const cardCount = el.children.length;
	return Math.max(1, Math.ceil(cardCount / pageSize));
}

function scrollByPage(el: HTMLDivElement, direction: "left" | "right"): void {
	const cardStep = getCardStep(el);
	const pageSize = getPageSize(el);
	const pageWidth = pageSize * cardStep;
	const pageCount = getPageCount(el);
	const currentPage = Math.round(el.scrollLeft / pageWidth);
	const nextPage =
		direction === "right"
			? (currentPage + 1) % pageCount
			: (currentPage - 1 + pageCount) % pageCount;

	el.scrollTo({
		left: nextPage * pageWidth,
		behavior: "smooth",
	});
}

export default function WhoWeEmpower() {
	const t = useCopy("home.empower");
	const { ref, isRevealed, shouldAnimate } = useSectionReveal();
	const shouldReduceMotion = useReducedMotion();
	const carouselRef = useRef<HTMLDivElement>(null);

	const scroll = (direction: "left" | "right") => {
		const el = carouselRef.current;
		if (!el) return;
		scrollByPage(el, direction);
	};

	const onCarouselKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
		if (event.key === "ArrowLeft") {
			event.preventDefault();
			scroll("left");
		} else if (event.key === "ArrowRight") {
			event.preventDefault();
			scroll("right");
		}
	};

	return (
		<section ref={ref} className="home-section home-section--tight home-feature-alt">
			<div className="home-wrap">
				<SectionHead
					eyebrow={t("eyebrow")}
					headline={t("headline")}
					description={t("description")}
					centered
				/>

				<div className="home-section-lead home-empower">
					<div className="home-empower-nav">
						<button
							type="button"
							onClick={() => scroll("left")}
							aria-label={t("scroll_left")}
							className="about-team-carousel__nav"
						>
							<ChevronLeft className="size-4" aria-hidden />
						</button>
						<button
							type="button"
							onClick={() => scroll("right")}
							aria-label={t("scroll_right")}
							className="about-team-carousel__nav"
						>
							<ChevronRight className="size-4" aria-hidden />
						</button>
					</div>

					<div
						ref={carouselRef}
						className="home-empower-carousel"
						role="region"
						aria-label={t("carousel_aria")}
						tabIndex={0}
						onKeyDown={onCarouselKeyDown}
					>
						{CARDS.map(({ id, icon: Icon }, index) => (
							<motion.article
								key={id}
								initial={
									shouldReduceMotion || !shouldAnimate
										? false
										: sectionRevealItem.hidden
								}
								animate={
									isRevealed
										? sectionRevealItem.visible
										: sectionRevealItem.hidden
								}
								transition={sectionItemTransition(
									shouldAnimate,
									index * 0.08,
									!!shouldReduceMotion,
								)}
								className="home-ecard"
							>
								<div className="home-ecard-head">
									<div className="home-ecard-icon">
										<Icon
											className="size-4"
											strokeWidth={1.75}
											aria-hidden
										/>
									</div>
									<h3>{t(`cards.${id}.title`)}</h3>
								</div>
								<p>{t(`cards.${id}.description`)}</p>
							</motion.article>
						))}
					</div>
				</div>
			</div>
		</section>
	);
}
