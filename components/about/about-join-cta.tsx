"use client";

import { ArrowRight } from "lucide-react";
import { motion, useInView, useReducedMotion } from "motion/react";
import { useTranslations } from "next-intl";
import { useRef } from "react";
import { Link } from "@/i18n/navigation";

const revealEase = [0.22, 1, 0.36, 1] as const;

export default function AboutJoinCta() {
	const t = useTranslations("about.join");
	const ref = useRef<HTMLElement>(null);
	const inView = useInView(ref, { once: true, margin: "-10% 0px" });
	const shouldReduceMotion = useReducedMotion();

	return (
		<section ref={ref} className="home-section home-section--tight">
			<div className="home-wrap">
				<motion.div
					className="about-join-cta"
					initial={shouldReduceMotion ? false : { opacity: 0, y: 24 }}
					animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 24 }}
					transition={
						shouldReduceMotion
							? { duration: 0 }
							: { duration: 0.6, ease: revealEase }
					}
				>
					<p className="home-eyebrow home-eyebrow--center about-join-cta__eyebrow">
						{t("eyebrow")}
					</p>
					<h2 className="about-join-cta__title">{t("headline")}</h2>
					<p className="about-join-cta__description">{t("description")}</p>
					<Link href="/career" className="about-join-cta__btn">
						{t("cta")}
						<ArrowRight className="size-4" aria-hidden />
					</Link>
				</motion.div>
			</div>
		</section>
	);
}
