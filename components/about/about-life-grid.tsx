"use client";

import { motion, useInView, useReducedMotion } from "motion/react";
import Image from "next/image";
import { useTranslations } from "next-intl";
import { useRef } from "react";
import SectionHead from "@/components/index/section-head";

type LifeGridPhoto = {
	src: string;
	altKey: string;
	variant: "human" | "office";
	span: 2 | 3;
};

const PHOTOS: LifeGridPhoto[] = [
	{
		src: "/images/members/members1.jpg",
		altKey: "photo_alt_1",
		variant: "human",
		span: 3,
	},
	{
		src: "/images/office/zyra9.jpg",
		altKey: "office_alt_1",
		variant: "office",
		span: 2,
	},
	{
		src: "/images/office/zyra10.jpg",
		altKey: "office_alt_2",
		variant: "office",
		span: 2,
	},
	{
		src: "/images/members/members2.jpg",
		altKey: "photo_alt_2",
		variant: "human",
		span: 3,
	},
];

const revealEase = [0.22, 1, 0.36, 1] as const;

export default function AboutLifeGrid() {
	const t = useTranslations("about.life");
	const ref = useRef<HTMLElement>(null);
	const inView = useInView(ref, { once: true, margin: "-10% 0px" });
	const shouldReduceMotion = useReducedMotion();

	return (
		<section ref={ref} className="home-section">
			<div className="home-wrap">
				<SectionHead
					eyebrow={t("eyebrow")}
					headline={t("headline")}
					description={t("description")}
					centered
				/>

				<div className="about-life-grid home-section-lead">
					{PHOTOS.map(({ src, altKey, variant, span }, index) => (
						<motion.div
							key={src}
							className={`about-life-grid__item about-life-grid__item--${variant} about-life-grid__item--span-${span}`}
							initial={shouldReduceMotion ? false : { opacity: 0, y: 24 }}
							animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 24 }}
							transition={
								shouldReduceMotion
									? { duration: 0 }
									: { duration: 0.55, ease: revealEase, delay: index * 0.1 }
							}
						>
							<Image
								src={src}
								alt={t(altKey)}
								fill
								sizes={
									span === 3
										? "(max-width: 768px) 100vw, 60vw"
										: "(max-width: 768px) 100vw, 40vw"
								}
								className="object-cover"
							/>
						</motion.div>
					))}
				</div>
			</div>
		</section>
	);
}
