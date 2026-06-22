"use client";

import { Minus, Plus } from "lucide-react";
import { motion, useReducedMotion } from "motion/react";
import { useState } from "react";
import { useTranslations } from "next-intl";
import {
	revealTransition,
	useSectionReveal,
} from "@/hooks/use-section-reveal";
import SectionHead from "./section-head";

const FAQ_IDS = [
	"projects",
	"technologies",
	"estimates",
	"ownership",
	"communication",
	"quality",
	"support",
	"legacy",
] as const;

const revealEase = [0.22, 1, 0.36, 1] as const;
const springOpen = { type: "spring" as const, duration: 0.45, bounce: 0 };
const instantTransition = { duration: 0 };

type FaqId = (typeof FAQ_IDS)[number];

type FaqItemProps = {
	id: FaqId;
	index: number;
	isOpen: boolean;
	onToggle: () => void;
	question: string;
	answer: string;
	shouldReduceMotion: boolean | null;
	isRevealed: boolean;
	shouldAnimate: boolean;
};

function FaqItem({
	id,
	index,
	isOpen,
	onToggle,
	question,
	answer,
	shouldReduceMotion,
	isRevealed,
	shouldAnimate,
}: FaqItemProps) {
	const panelId = `faq-panel-${id}`;
	const triggerId = `faq-trigger-${id}`;

	const itemTransition = revealTransition(shouldAnimate, {
		duration: 0.5,
		ease: revealEase,
		delay: shouldReduceMotion ? 0 : index * 0.06,
	});

	const panelTransition = shouldReduceMotion ? instantTransition : springOpen;

	const contentTransition = shouldReduceMotion
		? instantTransition
		: isOpen
			? { ...springOpen, delay: 0.04 }
			: { duration: 0.15, ease: "easeIn" as const };

	return (
		<motion.div
			className="home-faq-item"
			data-open={isOpen}
			initial={shouldReduceMotion || !shouldAnimate ? false : { opacity: 0, y: 12 }}
			animate={isRevealed ? { opacity: 1, y: 0 } : { opacity: 0, y: 12 }}
			transition={itemTransition}
		>
			<motion.button
				type="button"
				id={triggerId}
				className="home-faq-q"
				aria-expanded={isOpen}
				aria-controls={panelId}
				onClick={onToggle}
				whileTap={shouldReduceMotion ? undefined : { scale: 0.995 }}
			>
				{question}
				<span className="home-faq-icon" aria-hidden>
					{isOpen ? (
						<Minus className="size-3.5 stroke-[2.5]" />
					) : (
						<Plus className="size-3.5 stroke-[2.5]" />
					)}
				</span>
			</motion.button>

			<motion.div
				id={panelId}
				role="region"
				aria-labelledby={triggerId}
				aria-hidden={!isOpen}
				initial={false}
				animate={{ height: isOpen ? "auto" : 0 }}
				transition={panelTransition}
				className="overflow-hidden"
			>
				<motion.p
					className="max-w-[70ch] px-1 pb-8 pt-1 text-base leading-relaxed text-[var(--text)] text-pretty"
					initial={false}
					animate={
						isOpen
							? { opacity: 1, y: 0, filter: "blur(0px)" }
							: { opacity: 0, y: -8, filter: "blur(4px)" }
					}
					transition={contentTransition}
				>
					{answer}
				</motion.p>
			</motion.div>
		</motion.div>
	);
}

export default function Faq() {
	const t = useTranslations("home.faq");
	const { ref, isRevealed, shouldAnimate } = useSectionReveal();
	const shouldReduceMotion = useReducedMotion();
	const [openId, setOpenId] = useState<string | null>(null);

	return (
		<section ref={ref} className="home-section home-section--tight">
			<div className="home-wrap">
				<SectionHead eyebrow={t("eyebrow")} headline={t("headline")} centered />

				<div className="home-section-lead mx-auto max-w-[860px]">
					{FAQ_IDS.map((id, index) => {
						const isOpen = openId === id;

						return (
							<FaqItem
								key={id}
								id={id}
								index={index}
								isOpen={isOpen}
								onToggle={() => setOpenId(isOpen ? null : id)}
								question={t(`items.${id}.question`)}
								answer={t(`items.${id}.answer`)}
								shouldReduceMotion={shouldReduceMotion}
								isRevealed={isRevealed}
								shouldAnimate={shouldAnimate}
							/>
						);
					})}
				</div>
			</div>
		</section>
	);
}
