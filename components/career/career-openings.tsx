"use client";

import { ArrowRight } from "lucide-react";
import { motion, useInView, useReducedMotion } from "motion/react";
import { useRef } from "react";
import { useTranslations } from "next-intl";

const revealEase = [0.22, 1, 0.36, 1] as const;

export default function CareerOpenings() {
	const t = useTranslations("career.openings");
	const ref = useRef<HTMLElement>(null);
	const inView = useInView(ref, { once: true, margin: "-10% 0px" });
	const shouldReduceMotion = useReducedMotion();

	const emailHref = `mailto:info@codevider.com?subject=${encodeURIComponent(t("email_subject"))}`;

	return (
		<section ref={ref} className="home-section">
			<div className="home-wrap">
				<motion.div
					className="career-empty"
					initial={shouldReduceMotion ? false : { opacity: 0, y: 20 }}
					animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
					transition={
						shouldReduceMotion
							? { duration: 0 }
							: { duration: 0.55, ease: revealEase }
					}
				>
					<p className="home-eyebrow home-eyebrow--center">{t("eyebrow")}</p>
					<h2 className="mt-[clamp(0.875rem,2vw,1.125rem)] text-balance text-[clamp(1.75rem,4.6vw,2.75rem)] leading-[1.08] tracking-[-0.02em] text-[var(--text-h)]">
						{t("headline")}
					</h2>
					<p className="mx-auto mt-[clamp(1rem,2vw,1.25rem)] max-w-[54ch] text-pretty text-[clamp(1rem,1.4vw,1.125rem)] leading-relaxed text-[var(--text)]">
						{t("description")}
					</p>
					<a
						href={emailHref}
						className="svc-cta__btn mt-[clamp(1.75rem,3vw,2.25rem)]"
					>
						{t("cta")}
						<ArrowRight className="size-4" aria-hidden />
					</a>
				</motion.div>
			</div>
		</section>
	);
}
