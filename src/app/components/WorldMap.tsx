"use client";
import { motion } from "motion/react";
import WorldMap from "./ui/world-map";
import { pageInfoConstants } from "@/lib/constants";

export default function WorldMapDemo() {
	const { worldMap } = pageInfoConstants.home;
	return (
		<div className="py-20 dark:bg-black bg-linear-to-br from-black via-slate-900 to-sky-800  w-full">
			<motion.div
				className="max-w-7xl mx-auto text-center"
				initial={{ opacity: 0, y: 50 }}
				whileInView={{ opacity: 1, y: 0 }}
				transition={{ duration: 0.8, ease: "easeOut" }}
				viewport={{ once: true, margin: "-100px" }}
			>
				<p className="font-bold font-sans text-4xl md:text-6xl dark:text-white text-white">
					{worldMap.title.split(" ")[0]}{" "}
					<span className="text-neutral-400">
						{worldMap.title
							.split(" ")[1]
							.split("")
							.map((word, idx) => (
								<motion.span
									key={idx}
									className="inline-block"
									initial={{ x: -10, opacity: 0 }}
									whileInView={{ x: 0, opacity: 1 }}
									transition={{ duration: 0.5, delay: idx * 0.04 }}
									viewport={{ once: true }}
								>
									{word}
								</motion.span>
							))}
					</span>
				</p>
				<motion.p
					className="text-sm md:text-lg text-neutral-200 max-w-2xl font-sans mx-auto max-sm:px-4 py-4"
					initial={{ opacity: 0, y: 30 }}
					whileInView={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.6, delay: 0.3 }}
					viewport={{ once: true }}
				>
					{worldMap.description}
				</motion.p>
			</motion.div>

			{/* Map wrapper: only fade in, no y/scale slide */}
			<motion.div
				initial={{ opacity: 0 }}
				whileInView={{ opacity: 1 }}
				transition={{ duration: 1.2, ease: "easeOut", delay: 0.2 }}
				viewport={{ once: true, margin: "0px", amount: 0.3 }}
			>
				<WorldMap dots={worldMap.geolocationDots} />
			</motion.div>
		</div>
	);
}
