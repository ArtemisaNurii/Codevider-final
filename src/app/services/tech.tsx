"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { pageInfoConstants } from "@/lib/constants/index";

const { techStack: technologies } = pageInfoConstants.services;

const TechItem: React.FC<TechItemType> = ({ name, icon }) => (
	<div className="group flex flex-col items-center justify-center gap-2 p-4 bg-gray-50 border border-gray-200 rounded-lg shadow-sm transition-all duration-300 ease-in-out hover:shadow-md hover:-translate-y-1">
		<div className="w-16 h-16 flex items-center justify-center transition-transform duration-300 group-hover:scale-110">
			{icon}
		</div>
		<p className="text-sm font-medium text-slate-600 transition-colors duration-300 group-hover:text-slate-900">
			{name}
		</p>
	</div>
);

const TechCategory: React.FC<TechCategoryProps> = ({ title, items }) => (
	<motion.section
		layout
		initial={{ opacity: 0, y: 20 }}
		animate={{ opacity: 1, y: 0 }}
		exit={{ opacity: 0, y: -20 }}
		transition={{ duration: 0.3, ease: "easeInOut" }}
		className="mb-12"
	>
		<h2 className="text-2xl md:text-3xl font-bold text-slate-800 text-center mb-8">
			{title}
		</h2>
		<div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4 md:gap-6">
			{items.map((tech) => (
				<TechItem key={tech.name} name={tech.name} icon={tech.icon} />
			))}
		</div>
	</motion.section>
);

// --- MAIN EXPORTED COMPONENT ---

const TechStack: React.FC = () => {
	const [selectedCategory, setSelectedCategory] = useState<string>("All");

	const categories = ["All", ...technologies.map((tech) => tech.category)];

	const filteredTechnologies =
		selectedCategory === "All"
			? technologies
			: technologies.filter((tech) => tech.category === selectedCategory);

	return (
		<div className="bg-white font-sans">
			<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
				<header className="text-center mb-12">
					<h1 className="text-4xl md:text-5xl font-bold text-slate-900 tracking-tight">
						Our Technology Stack
					</h1>
					<p className="mt-4 text-lg text-balance text-slate-600 max-w-3xl mx-auto">
						A showcase of the tools, frameworks, and languages I use to build
						modern, high-performance web and mobile applications.
					</p>
				</header>

				{/* Filter Badges */}
				<div className="flex justify-center items-center flex-wrap gap-2 md:gap-4 mb-12">
					{categories.map((category) => (
						<button
							key={category}
							onClick={() => setSelectedCategory(category)}
							className={`px-4 py-2 text-sm font-semibold rounded-full transition-colors duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-slate-500
                ${
									selectedCategory === category
										? "bg-slate-900 text-white shadow"
										: "bg-white text-slate-600 border border-slate-200 hover:bg-slate-100"
								}`}
						>
							{category}
						</button>
					))}
				</div>

				<main className="mt-12">
					<AnimatePresence mode="wait">
						{filteredTechnologies.map((category) => (
							<TechCategory
								key={category.category}
								title={category.category}
								items={category.items}
							/>
						))}
					</AnimatePresence>
				</main>
			</div>
		</div>
	);
};

export default TechStack;
