"use client";

import { DollarSign, Link2, ShieldCheck } from "lucide-react";
import { motion, useReducedMotion } from "motion/react";
import { useTranslations } from "next-intl";
import { revealTransition, useSectionReveal } from "@/hooks/use-section-reveal";
import SectionHead from "./section-head";

const PILLARS = [
	{ id: "collaboration", icon: Link2 },
	{ id: "legal", icon: ShieldCheck },
	{ id: "cost", icon: DollarSign },
] as const;

const revealEase = [0.22, 1, 0.36, 1] as const;

export default function WhyOutsource() {
	const t = useTranslations("home.outsource");
	const { ref, isRevealed, shouldAnimate } = useSectionReveal();
	const shouldReduceMotion = useReducedMotion();

	const cardTransition = (delay: number) =>
		revealTransition(shouldAnimate, {
			duration: 0.5,
			ease: revealEase,
			delay: shouldReduceMotion ? 0 : delay,
		});

	return (
		<section ref={ref} className="home-section home-feature-alt">
			<div className="home-wrap">
				<motion.div
					initial={shouldReduceMotion || !shouldAnimate ? false : { y: 18 }}
					animate={isRevealed ? { y: 0 } : { y: 18 }}
					transition={cardTransition(0)}
				>
					<SectionHead
						eyebrow={t("eyebrow")}
						headline={t("headline")}
						description={t("description")}
						centered
					/>
				</motion.div>

				<div className="home-section-lead grid gap-[clamp(1.75rem,4vw,2.5rem)] lg:grid-cols-3">
					{PILLARS.map(({ id, icon: Icon }, index) => (
						<motion.article
							key={id}
							initial={shouldReduceMotion || !shouldAnimate ? false : { y: 18 }}
							animate={isRevealed ? { y: 0 } : { y: 18 }}
							transition={cardTransition(0.1 + index * 0.08)}
							className="flex gap-3.5"
						>
							<div className="home-ecard-icon shrink-0">
								<Icon className="size-[22px]" aria-hidden />
							</div>
							<div className="min-w-0 flex-1">
								<h3 className="text-[19px] font-semibold text-balance tracking-[-0.01em] text-[var(--text-h)]">
									{t(`pillars.${id}.title`)}
								</h3>
								<p className="mt-3 text-pretty text-[15px] leading-relaxed text-[var(--text)]">
									{t(`pillars.${id}.description`)}
								</p>
							</div>
						</motion.article>
					))}
				</div>
			</div>
		</section>
	);
}
