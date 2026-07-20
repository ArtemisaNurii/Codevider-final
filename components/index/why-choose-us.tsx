"use client";

import { BadgeCheck, Gauge, Layers } from "lucide-react";
import { motion, useReducedMotion } from "motion/react";
import { useCopy } from "@/lib/copy";
import {
	sectionItemTransition,
	sectionRevealItem,
	useSectionReveal,
} from "@/hooks/use-section-reveal";
import SectionHead from "./section-head";

const PILLARS = [
	{ id: "efficiency", icon: Gauge },
	{ id: "flexibility", icon: Layers },
	{ id: "expertise", icon: BadgeCheck },
] as const;

const YEARS_SINCE = 2019;

export default function WhyChooseUs() {
	const t = useCopy("home.why_choose");
	const { ref, isRevealed, shouldAnimate } = useSectionReveal();
	const shouldReduceMotion = useReducedMotion();
	const yearsValue = `${new Date().getFullYear() - YEARS_SINCE}+`;

	const motionProps = (delay: number) => ({
		initial:
			shouldReduceMotion || !shouldAnimate ? false : sectionRevealItem.hidden,
		animate: isRevealed ? sectionRevealItem.visible : sectionRevealItem.hidden,
		transition: sectionItemTransition(
			shouldAnimate,
			delay,
			!!shouldReduceMotion,
		),
	});

	return (
		<section ref={ref} className="home-section home-feature-alt">
			<div className="home-wrap">
				<motion.div {...motionProps(0)}>
					<SectionHead
						eyebrow={t("eyebrow")}
						headline={t("headline")}
						description={t("description")}
						centered
						className="max-sm:mx-0 max-sm:max-w-none max-sm:text-left [&_.home-eyebrow]:max-sm:justify-start [&_p]:max-sm:mx-0"
						descriptionClassName="text-[0.9375rem] sm:text-base"
					/>
				</motion.div>

				<div className="home-section-lead why-choose-pillars">
					{PILLARS.map(({ id, icon: Icon }, index) => (
						<motion.article
							key={id}
							{...motionProps(0.08 + index * 0.08)}
							className="why-choose-pillar"
						>
							<div className="home-ecard-icon shrink-0">
								<Icon className="size-[18px]" aria-hidden />
							</div>
							<div className="min-w-0">
								<h3>{t(`pillars.${id}.title`)}</h3>
								<p>{t(`pillars.${id}.description`)}</p>
							</div>
						</motion.article>
					))}
				</div>

				<motion.div {...motionProps(0.36)} className="why-choose-foot">
					<div className="why-choose-stat">
						<span className="why-choose-stat__value font-(family-name:--mono) tabular-nums">
							{yearsValue}
						</span>
						<div className="min-w-0">
							<p className="why-choose-stat__title">{t("years_title")}</p>
							<p className="why-choose-stat__desc">{t("years_description")}</p>
						</div>
					</div>
					<div className="why-choose-stat">
						<span className="why-choose-stat__value font-(family-name:--mono) tabular-nums">
							{t("projects_value")}
						</span>
						<div className="min-w-0">
							<p className="why-choose-stat__title">{t("projects_title")}</p>
							<p className="why-choose-stat__desc">
								{t("projects_description")}
							</p>
						</div>
					</div>
				</motion.div>
			</div>
		</section>
	);
}
