"use client";

import { motion } from "framer-motion";
import TextAnimation from "./ui/AnimationText";
import { pageInfoConstants } from "@/lib/constants";

// --- Data ---

// --- Animation variants ---
const cardContainerVariants = {
	hidden: { opacity: 0 },
	visible: {
		opacity: 1,
		transition: { staggerChildren: 0.2 },
	},
};

const cardItemVariants = {
	hidden: { y: 30, opacity: 0 },
	visible: {
		y: 0,
		opacity: 1,
		transition: { duration: 0.5 },
	},
};

const Outsource: React.FC = () => {
	const { outsource } = pageInfoConstants.home;
	return (
		<div className="section-compact relative mt-8 bg-white font-sans">
			{/* CONTENT */}
			<section className="relative z-10 bg-white max-sm:-mt-44 md:-mt-8 text-gray-900 pt-6 pb-16 sm:pt-8">
				<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
					{/* Heading */}
					<div className="grid grid-cols-1 lg:grid-cols-2 gap-x-8 gap-y-10 items-start">
						<motion.div
							className="lg:pr-8"
							initial={{ opacity: 0, y: 20 }}
							whileInView={{ opacity: 1, y: 0 }}
							viewport={{ once: true, amount: 0.3 }}
							transition={{ duration: 0.6, delay: 0.1 }}
						>
							<TextAnimation
								as="h2"
								text={outsource.title}
								classname="mt-2 text-4xl sm:text-5xl font-bold leading-tight text-gray-900"
							/>
						</motion.div>

						<motion.div
							className="lg:pt-2"
							initial={{ opacity: 0, y: 20 }}
							whileInView={{ opacity: 1, y: 0 }}
							viewport={{ once: true, amount: 0.3 }}
							transition={{ duration: 0.6, delay: 0.2 }}
						>
							<TextAnimation
								as="p"
								text={outsource.description}
								classname="text-lg leading-8 text-gray-800"
							/>
						</motion.div>
					</div>

					{/* Features */}
					<motion.div
						className="mt-16 sm:mt-20"
						variants={cardContainerVariants}
						initial="hidden"
						whileInView="visible"
						viewport={{ once: true, amount: 0.3 }}
					>
						<div className="grid grid-cols-1 md:grid-cols-3 gap-x-8 gap-y-12">
							{outsource.list.map(({ id, icon: Icon, title, description }) => (
								<motion.div key={id} variants={cardItemVariants}>
									<div className="mb-4">
										<Icon
											className="h-8 w-8 text-[#0a61cb]"
											aria-hidden="true"
										/>
									</div>
									<TextAnimation
										as="h3"
										text={title}
										classname="text-lg font-bold font-sans leading-7 text-gray-900"
									/>
									<TextAnimation
										as="p"
										text={description}
										classname="mt-2 text-base leading-7 text-balance text-gray-800"
									/>
								</motion.div>
							))}
						</div>
					</motion.div>
				</div>
				<div className="mb-20"></div>
			</section>
		</div>
	);
};

export default Outsource;
