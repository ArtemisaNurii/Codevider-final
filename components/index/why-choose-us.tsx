"use client";

import { Clock, Lightbulb, Percent, SlidersHorizontal } from "lucide-react";
import { motion, useInView, useReducedMotion } from "motion/react";
import { useRef } from "react";
import { useTranslations } from "next-intl";
import SectionHead from "./section-head";

const BOTTOM_CARDS = [
	{ id: "savings", icon: Clock },
	{ id: "flex", icon: Percent, flexKeys: true },
	{ id: "control", icon: SlidersHorizontal },
	{ id: "expertise", icon: Lightbulb },
] as const;

const revealEase = [0.22, 1, 0.36, 1] as const;

export default function WhyChooseUs() {
	const t = useTranslations("home.why_choose");
	const ref = useRef<HTMLElement>(null);
	const inView = useInView(ref, { once: true, margin: "-10% 0px" });
	const shouldReduceMotion = useReducedMotion();

	const cardTransition = (delay: number) =>
		shouldReduceMotion
			? { duration: 0 }
			: { duration: 0.5, ease: revealEase, delay };

	const motionProps = (delay: number) => ({
		initial: shouldReduceMotion ? false : { y: 18 },
		animate: inView || shouldReduceMotion ? { y: 0 } : { y: 18 },
		transition: cardTransition(delay),
	});

	return (
		<section ref={ref} className="home-section">
			<div className="home-wrap">
				<SectionHead
					eyebrow={t("eyebrow")}
					headline={t("headline")}
					description={t("description")}
					centered
				/>

				<div className="home-section-lead grid items-stretch gap-5 lg:grid-cols-4">
					<motion.article
						{...motionProps(0)}
						className="home-vp-card home-vp-card--tint home-card-body lg:col-span-3"
					>
						<span className="inline-block w-fit rounded-full bg-[var(--text-h)] px-3.5 py-1.5 text-[13px] font-semibold text-[var(--bg)]">
							{t("value_badge")}
						</span>
						<p className="text-balance text-[17px] font-semibold text-[var(--dash-brand)]">
							{t("value_flow")}
						</p>
						<p className="text-pretty text-[15px] leading-relaxed text-[var(--text-h)]/80">
							{t("value_description")}
						</p>
					</motion.article>

					<motion.article
						{...motionProps(0.08)}
						className="home-vp-card home-vp-card--dark home-card-body lg:col-span-1"
					>
						<p className="font-[family-name:var(--mono)] text-[clamp(2rem,4vw,2.75rem)] font-semibold tabular-nums tracking-[-0.03em] text-white">
							{`${new Date().getFullYear() - 2019}+`}
						</p>
						<p className="font-semibold text-balance text-white">
							{t("years_title")}
						</p>
						<p className="text-pretty text-sm leading-relaxed text-blue-100/70">
							{t("years_description")}
						</p>
					</motion.article>
				</div>

				<div className="mt-6 grid items-stretch gap-5 sm:grid-cols-2 lg:grid-cols-4">
					{BOTTOM_CARDS.map(({ id, icon: Icon, ...rest }, index) => {
						const flexKeys = "flexKeys" in rest;
						const pin = flexKeys ? t("flex_value") : t(`cards.${id}.pin`);
						const title = flexKeys ? t("flex_title") : t(`cards.${id}.title`);
						const description = flexKeys
							? t("flex_description")
							: t(`cards.${id}.description`);

						return (
							<motion.article
								key={id}
								{...motionProps(0.16 + index * 0.08)}
								className="home-ecard home-card-body"
							>
								<div className="home-ecard-icon">
									<Icon className="size-[22px]" aria-hidden />
								</div>
								<p className="text-xs font-semibold tabular-nums text-[var(--dash-brand)]">
									{pin}
								</p>
								<h3 className="text-xl font-semibold text-balance tracking-[-0.01em] text-[var(--text-h)]">
									{title}
								</h3>
								<p className="text-pretty text-[15px] leading-relaxed text-[var(--text)]">
									{description}
								</p>
							</motion.article>
						);
					})}
				</div>
			</div>
		</section>
	);
}
