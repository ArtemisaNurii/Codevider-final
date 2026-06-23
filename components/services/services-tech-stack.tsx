"use client";

import {
	AnimatePresence,
	motion,
	useInView,
	useReducedMotion,
} from "motion/react";
import { useTranslations } from "next-intl";
import { useMemo, useRef, useState } from "react";
import SectionHead from "@/components/index/section-head";
import {
	getTechStackCategory,
	getTechStackInitials,
	TECH_STACK_CATEGORIES,
	type TechStackCategoryId,
	type TechStackItem,
} from "@/data/tech-stack";

type CategoryId = TechStackCategoryId;
type FilterId = "all" | CategoryId;

const springOpen = { type: "spring" as const, duration: 0.4, bounce: 0 };
const instantTransition = { duration: 0 };
const revealEase = [0.22, 1, 0.36, 1] as const;

function TechTile({
	item,
	index,
	sectionIndex,
	shouldReduceMotion,
	categoryId,
}: {
	item: TechStackItem;
	index: number;
	sectionIndex: number;
	shouldReduceMotion: boolean | null;
	categoryId: CategoryId;
}) {
	const transition = shouldReduceMotion
		? instantTransition
		: { ...springOpen, delay: sectionIndex * 0.08 + index * 0.05 + 0.04 };

	const iconHeight = item.iconDimensions?.height ?? 30;
	const iconMaxWidth = item.iconDimensions?.maxWidth ?? 34;
	const isWideIcon = iconMaxWidth > 34;

	return (
		<motion.div
			className="svc-tech-tile"
			initial={shouldReduceMotion ? false : { opacity: 0, y: 14, scale: 0.96 }}
			animate={{ opacity: 1, y: 0, scale: 1 }}
			transition={transition}
		>
			{item.icon ? (
				<span
					className={
						isWideIcon
							? "svc-tech-tile__icon svc-tech-tile__icon--wide"
							: "svc-tech-tile__icon"
					}
					aria-hidden
				>
					<span
						className="svc-tech-tile__icon-slot"
						style={{ width: iconMaxWidth, height: iconHeight }}
					>
						<img
							src={`/icons/technologies/${categoryId}/${item.icon}`}
							alt=""
							width={iconMaxWidth}
							height={iconHeight}
							className="svc-tech-tile__icon-img"
							style={{ height: iconHeight, maxWidth: iconMaxWidth }}
							loading="lazy"
							decoding="async"
						/>
					</span>
				</span>
			) : (
				<span className="svc-tech-tile__badge" aria-hidden>
					{getTechStackInitials(item.name)}
				</span>
			)}
			<span className="svc-tech-tile__label">{item.name}</span>
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
	const section = getTechStackCategory(categoryId);
	const titleId = `tech-section-${categoryId}`;

	if (!section) return null;

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
				{section.items.map((item, index) => (
					<TechTile
						key={item.name}
						item={item}
						index={index}
						categoryId={categoryId}
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
