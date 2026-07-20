"use client";

import { motion, useReducedMotion } from "motion/react";
import { useCopy } from "@/lib/copy";
import {
	sectionItemTransition,
	sectionRevealItem,
	useSectionReveal,
} from "@/hooks/use-section-reveal";
import SectionHead from "./section-head";

const PILLARS = ["collaboration", "efficiency", "expertise"] as const;

export default function WhyChooseUs() {
	const t = useCopy("home.why_choose");
	const { ref, isRevealed, shouldAnimate } = useSectionReveal();
	const shouldReduceMotion = useReducedMotion();

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
		<section ref={ref} className="home-section">
			<div className="home-wrap">
				<motion.div {...motionProps(0)}>
					<SectionHead
						eyebrow={t("eyebrow")}
						headline={t("headline")}
						description={t("description")}
						className="max-w-160 max-sm:mx-0 max-sm:max-w-none [&_.home-eyebrow]:max-sm:justify-start"
						descriptionClassName="mt-5 text-[0.9375rem] sm:text-base"
					/>
				</motion.div>

				<div className="home-section-lead why-choose">
					<motion.aside
						{...motionProps(0.08)}
						className="why-choose-proof h-full"
					>
						<p className="why-choose-proof__label">{t("proof_label")}</p>
						<p className="why-choose-proof__year font-(family-name:--mono) tabular-nums">
							{t("proof_year")}
						</p>
						<p className="why-choose-proof__lede">{t("proof_description")}</p>
						<p className="why-choose-proof__aside">{t("proof_aside")}</p>
					</motion.aside>

					<div className="why-choose-pillars" role="list">
						{PILLARS.map((id, index) => (
							<motion.article
								key={id}
								role="listitem"
								{...motionProps(0.16 + index * 0.08)}
								className="why-choose-pillar"
							>
								<h3 className="text-balance">{t(`pillars.${id}.title`)}</h3>
								<p className="text-pretty">{t(`pillars.${id}.description`)}</p>
							</motion.article>
						))}
					</div>
				</div>
			</div>
		</section>
	);
}
