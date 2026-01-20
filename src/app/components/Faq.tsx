"use client";

import React, { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { Plus } from "lucide-react";
import { pageInfoConstants } from "@/lib/constants";

export default function Faq() {
	const [activeIndex, setActiveIndex] = useState<number | null>(null);
	const { faq } = pageInfoConstants.home;

	const handleClick = (index: number) => {
		setActiveIndex(activeIndex === index ? null : index);
	};

	return (
		<section className="bg-white py-16">
			<div className="container max-w-7xl mx-auto px-4">
				<h1 className="text-center text-4xl font-semibold uppercase text-black mb-10">
					{faq.title}
				</h1>
				<div className="rounded-lg border border-gray-200 bg-white p-4 shadow-sm">
					{faq.list.map((tab, index) => (
						<motion.div
							key={index}
							className={`overflow-hidden ${index !== faq.list.length - 1 ? "border-b border-gray-200" : ""}`}
							onClick={() => handleClick(index)}
						>
							<button className="flex w-full items-center gap-2 px-2 py-4 text-left text-gray-800 font-semibold transition-all sm:text-base text-sm">
								<Plus
									className={`h-5 w-5 transform transition-transform text-gray-700 ${activeIndex === index ? "rotate-45" : "rotate-0"}`}
								/>
								{tab.title}
							</button>
							<AnimatePresence mode="sync">
								{activeIndex === index && (
									<motion.div
										initial={{ height: 0, opacity: 0 }}
										animate={{ height: "auto", opacity: 1 }}
										exit={{ height: 0, opacity: 0 }}
										transition={{
											duration: 0.3,
											ease: "easeInOut",
											delay: 0.14,
										}}
									>
										<p className="px-8 pb-4 pt-0 text-black text-balance text-sm sm:text-base">
											{tab.description}
										</p>
									</motion.div>
								)}
							</AnimatePresence>
						</motion.div>
					))}
				</div>
			</div>
		</section>
	);
}
