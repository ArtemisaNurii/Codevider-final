"use client";

import { Clock, Lightbulb, Percent, SlidersHorizontal } from "lucide-react";
import { motion, useReducedMotion } from "motion/react";
import { useTranslations } from "next-intl";
import {
	sectionItemTransition,
	sectionRevealItem,
	useSectionReveal,
} from "@/hooks/use-section-reveal";
import SectionHead from "./section-head";

const BOTTOM_CARDS = [
	{ id: "savings", icon: Clock },
	{ id: "flex", icon: Percent, flexKeys: true },
	{ id: "control", icon: SlidersHorizontal },
	{ id: "expertise", icon: Lightbulb },
] as const;

export default function WhyChooseUs() {
	const t = useTranslations("home.why_choose");
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
		<section ref={ref} className="home-section home-feature-alt">
			<div className="home-wrap">
				<SectionHead
					eyebrow={t("eyebrow")}
					headline={t("headline")}
					description={t("description")}
					centered
				/>

				<div className="home-section-lead grid items-stretch gap-5 sm:grid-cols-2 lg:grid-cols-4">
					<motion.article
						{...motionProps(0)}
						className="home-vp-card home-vp-card--tint home-card-body order-1 sm:col-span-2 lg:order-0 lg:col-span-3"
					>
						<span className="inline-block w-fit rounded-full bg-(--text-h) px-3.5 py-1.5 text-[13px] font-semibold text-(--bg)">
							{t("value_badge")}
						</span>
						<p className="text-balance text-[17px] font-semibold text-(--dash-brand)">
							{t("value_flow")}
						</p>
						<p className="max-w-[58ch] text-pretty text-[15px] leading-relaxed text-(--text-h)/80">
							{t("value_description")}
						</p>
					</motion.article>

					<motion.article
						{...motionProps(0.08)}
						className="home-vp-card home-vp-card--dark home-card-body order-last sm:col-span-2 lg:order-0 lg:col-span-1"
					>
						<p className="font-(family-name:--mono) text-[clamp(2rem,4vw,2.75rem)] font-semibold tabular-nums tracking-[-0.03em] text-(--on-brand)">
							{`${new Date().getFullYear() - 2019}+`}
						</p>
						<p className="font-semibold text-balance text-(--on-brand)">
							{t("years_title")}
						</p>
						<p className="text-pretty text-sm leading-relaxed text-(--on-brand)/70">
							{t("years_description")}
						</p>
					</motion.article>

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
								className="home-ecard home-card-body order-2 lg:order-0"
							>
								<div className="home-ecard-icon">
									<Icon className="size-5.5" aria-hidden />
								</div>
								<p className="text-xs font-semibold tabular-nums text-(--dash-brand)">
									{pin}
								</p>
								<h3 className="text-xl font-semibold text-balance tracking-[-0.01em] text-(--text-h)">
									{title}
								</h3>
								<p className="text-pretty text-sm leading-relaxed text-(--text)">
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
