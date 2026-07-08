"use client";

import {
	Bot,
	Building2,
	Code,
	CreditCard,
	Database,
	MessageSquare,
	PenLine,
	Smartphone,
} from "lucide-react";
import { motion, useReducedMotion } from "motion/react";
import { useTranslations } from "next-intl";
import {
	sectionItemTransition,
	sectionRevealItem,
	useSectionReveal,
} from "@/hooks/use-section-reveal";
import SectionHead from "./section-head";

const CARDS = [
	{ id: "startups", icon: PenLine },
	{ id: "enterprise", icon: Building2 },
	{ id: "crm", icon: MessageSquare },
	{ id: "custom", icon: Code },
	{ id: "fintech", icon: CreditCard },
	{ id: "ai", icon: Bot },
	{ id: "data", icon: Database },
	{ id: "mobile", icon: Smartphone },
] as const;

export default function WhoWeEmpower() {
	const t = useTranslations("home.empower");
	const { ref, isRevealed, shouldAnimate } = useSectionReveal();
	const shouldReduceMotion = useReducedMotion();

	return (
		<section ref={ref} className="home-section home-section--tight">
			<div className="home-wrap">
				<SectionHead
					eyebrow={t("eyebrow")}
					headline={t("headline")}
					description={t("description")}
					centered
					className="max-md:mx-0 max-md:text-left max-md:[&_.home-eyebrow--center]:justify-start"
				/>

				<div className="home-section-lead grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
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
							className="home-ecard home-card-body"
						>
							<div className="home-ecard-icon">
								<Icon className="size-[22px]" aria-hidden />
							</div>
							<h3 className="text-[17px] font-semibold text-balance leading-snug tracking-[-0.01em] text-(--text-h)">
								{t(`cards.${id}.title`)}
							</h3>
							<p className="text-sm leading-relaxed text-balance text-(--text)">
								{t(`cards.${id}.description`)}
							</p>
						</motion.article>
					))}
				</div>
			</div>
		</section>
	);
}
