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
import { motion, useInView, useReducedMotion } from "motion/react";
import { useRef } from "react";
import { useTranslations } from "next-intl";
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

const revealEase = [0.22, 1, 0.36, 1] as const;

export default function WhoWeEmpower() {
	const t = useTranslations("home.empower");
	const ref = useRef<HTMLElement>(null);
	const inView = useInView(ref, { once: true, margin: "-10% 0px" });
	const shouldReduceMotion = useReducedMotion();

	const cardTransition = (delay: number) =>
		shouldReduceMotion
			? { duration: 0 }
			: { duration: 0.5, ease: revealEase, delay };

	return (
		<section ref={ref} className="home-section home-section--tight">
			<div className="home-wrap">
				<SectionHead
					eyebrow={t("eyebrow")}
					headline={t("headline")}
					description={t("description")}
					centered
				/>

				<div className="home-section-lead grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
					{CARDS.map(({ id, icon: Icon }, index) => (
						<motion.article
							key={id}
							initial={shouldReduceMotion ? false : { y: 18 }}
							animate={inView || shouldReduceMotion ? { y: 0 } : { y: 18 }}
							transition={cardTransition(index * 0.05)}
							className="home-ecard home-card-body"
						>
							<div className="home-ecard-icon">
								<Icon className="size-[22px]" aria-hidden />
							</div>
							<h3 className="text-[17px] font-semibold text-balance leading-snug tracking-[-0.01em] text-[var(--text-h)]">
								{t(`cards.${id}.title`)}
							</h3>
							<p className="text-sm leading-relaxed text-balance text-[var(--text)]">
								{t(`cards.${id}.description`)}
							</p>
						</motion.article>
					))}
				</div>
			</div>
		</section>
	);
}
