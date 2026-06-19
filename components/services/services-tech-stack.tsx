"use client";

import {
	AnimatePresence,
	motion,
	useInView,
	useReducedMotion,
} from "motion/react";
import { useMemo, useRef, useState } from "react";
import { useTranslations } from "next-intl";
import SectionHead from "@/components/index/section-head";
import {
	TECH_STACK_CATEGORIES,
	TECH_STACK_ITEMS,
	type TechStackCategoryId,
} from "@/data/tech-stack";

type CategoryId = TechStackCategoryId;
type FilterId = "all" | CategoryId;

const springOpen = { type: "spring" as const, duration: 0.4, bounce: 0 };
const instantTransition = { duration: 0 };
const revealEase = [0.22, 1, 0.36, 1] as const;

function TechTile({
	name,
	index,
	sectionIndex,
	shouldReduceMotion,
}: {
	name: string;
	index: number;
	sectionIndex: number;
	shouldReduceMotion: boolean | null;
}) {
	const transition = shouldReduceMotion
		? instantTransition
		: { ...springOpen, delay: sectionIndex * 0.08 + index * 0.05 + 0.04 };

	return (
		<motion.div
			className="svc-tech-tile"
			initial={shouldReduceMotion ? false : { opacity: 0, y: 14, scale: 0.96 }}
			animate={{ opacity: 1, y: 0, scale: 1 }}
			transition={transition}
		>
			{name}
		</motion.div>
	);
}

function TechCategorySection({
	categoryId,
	sectionIndex,
	shouldReduceMotion,
}: {
	categoryId: CategoryId;
	sectionIndex: number;
	shouldReduceMotion: boolean | null;
}) {
	const t = useTranslations("services.tech");
	const items = TECH_STACK_ITEMS[categoryId];
	const titleId = `tech-section-${categoryId}`;

	const sectionTransition = shouldReduceMotion
		? instantTransition
		: { duration: 0.5, ease: revealEase, delay: sectionIndex * 0.08 };

	return (
		<motion.section
			className="svc-tech-group"
			aria-labelledby={titleId}
			initial={shouldReduceMotion ? false : { opacity: 0, y: 16 }}
			animate={{ opacity: 1, y: 0 }}
			transition={sectionTransition}
		>
			<h3 id={titleId} className="svc-tech-group__title">
				{t(`categories.${categoryId}.label`)}
			</h3>

			<div className="svc-tech-grid">
				{items.map((name, index) => (
					<TechTile
						key={name}
						name={name}
						index={index}
						sectionIndex={sectionIndex}
						shouldReduceMotion={shouldReduceMotion}
					/>
				))}
			</div>
		</motion.section>
	);
}

export default function ServicesTechStack() {
	const t = useTranslations("services.tech");
	const ref = useRef<HTMLElement>(null);
	const inView = useInView(ref, { once: true, margin: "-10% 0px" });
	const shouldReduceMotion = useReducedMotion();
	const [activeFilter, setActiveFilter] = useState<FilterId>("all");

	const visibleCategories = useMemo(
		() =>
			activeFilter === "all" ? [...TECH_STACK_CATEGORIES] : [activeFilter],
		[activeFilter],
	);

	const canAnimate = inView || shouldReduceMotion;

	const filters: { id: FilterId; label: string }[] = [
		{ id: "all", label: t("all") },
		...TECH_STACK_CATEGORIES.map((id) => ({
			id,
			label: t(`categories.${id}.label`),
		})),
	];

	return (
		<section ref={ref} className="home-section home-section--tight">
			<div className="home-wrap">
				<SectionHead
					eyebrow={t("eyebrow")}
					headline={t("headline")}
					description={t("description")}
					centered
				/>

				<div className="home-section-lead mx-auto max-w-[920px]">
					<div
						className="svc-tech-filters"
						role="tablist"
						aria-label={t("categories_aria")}
					>
						{filters.map((filter) => {
							const isActive = activeFilter === filter.id;

							return (
								<button
									key={filter.id}
									type="button"
									role="tab"
									aria-selected={isActive}
									className={`svc-tech-filter ${isActive ? "svc-tech-filter--active" : ""}`}
									onClick={() => setActiveFilter(filter.id)}
								>
									{filter.label}
								</button>
							);
						})}
					</div>

					<AnimatePresence mode="wait" initial={false}>
						{canAnimate ? (
							<motion.div
								key={activeFilter}
								role="tabpanel"
								aria-live="polite"
								className="svc-tech-groups"
								initial={shouldReduceMotion ? false : { opacity: 0 }}
								animate={{ opacity: 1 }}
								exit={
									shouldReduceMotion
										? undefined
										: {
												opacity: 0,
												transition: { duration: 0.12, ease: "easeIn" },
											}
								}
								transition={{ duration: 0.15 }}
							>
								{visibleCategories.map((categoryId, sectionIndex) => (
									<TechCategorySection
										key={categoryId}
										categoryId={categoryId}
										sectionIndex={sectionIndex}
										shouldReduceMotion={shouldReduceMotion}
									/>
								))}
							</motion.div>
						) : null}
					</AnimatePresence>
				</div>
			</div>
		</section>
	);
}
