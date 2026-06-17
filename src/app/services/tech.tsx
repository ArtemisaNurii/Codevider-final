"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { servicesPage } from "@/lib/constants/pages/services";

interface TechItemType {
  name: string;
  icon: React.ReactElement;
}

interface TechnologyCategoryType {
  category: string;
  items: TechItemType[];
}

const technologies = servicesPage.techStack as TechnologyCategoryType[];

const cardShadow =
  "shadow-[0px_0px_0px_1px_rgba(0,0,0,0.06),0px_1px_2px_-1px_rgba(0,0,0,0.06),0px_2px_4px_0px_rgba(0,0,0,0.04)]";
const cardShadowHover =
  "hover:shadow-[0px_0px_0px_1px_rgba(0,0,0,0.08),0px_1px_2px_-1px_rgba(0,0,0,0.08),0px_2px_4px_0px_rgba(0,0,0,0.06)]";

const gridContainerVariants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.05 },
  },
};

const gridItemVariants = {
  hidden: { opacity: 0, y: 12, filter: "blur(4px)" },
  visible: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { type: "spring" as const, duration: 0.3, bounce: 0 },
  },
};

const TechItem: React.FC<TechItemType> = ({ name, icon }) => (
  <motion.div
    variants={gridItemVariants}
    className={`group flex min-h-30 flex-col items-center justify-center gap-3 rounded-2xl bg-white p-4 sm:min-h-32 ${cardShadow} ${cardShadowHover} transition-shadow duration-150 ease-out`}
  >
    <div className="flex size-10 items-center justify-center transition-transform duration-150 ease-out group-hover:scale-[1.04] sm:size-11">
      {icon}
    </div>
    <p className="text-pretty text-center text-sm font-medium text-slate-600 transition-colors duration-150 group-hover:text-slate-900">
      {name}
    </p>
  </motion.div>
);

interface TechCategoryProps {
  title: string;
  items: TechItemType[];
}

const TechCategory: React.FC<TechCategoryProps> = ({ title, items }) => (
  <motion.section
    layout
    initial={{ opacity: 0, y: 12, filter: "blur(4px)" }}
    animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
    exit={{
      opacity: 0,
      y: -12,
      filter: "blur(4px)",
      transition: { duration: 0.15, ease: "easeIn" },
    }}
    transition={{ type: "spring", duration: 0.3, bounce: 0 }}
    className="mb-12"
  >
    <h2 className="text-balance mb-8 text-center text-2xl font-bold text-slate-800 md:text-3xl">
      {title}
    </h2>
    <motion.div
      variants={gridContainerVariants}
      initial="hidden"
      animate="visible"
      className="grid grid-cols-2 gap-[clamp(0.75rem,2vw,1.25rem)] sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6"
    >
      {items.map((tech) => (
        <TechItem key={tech.name} name={tech.name} icon={tech.icon} />
      ))}
    </motion.div>
  </motion.section>
);

const TechStack: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState("All");

  const categories = ["All", ...technologies.map((tech) => tech.category)];

  const filteredTechnologies =
    selectedCategory === "All"
      ? technologies
      : technologies.filter((tech) => tech.category === selectedCategory);

  return (
    <section className="border-t border-slate-100 font-sans">
      <div className="site-container py-16 md:py-24">
        <header className="mb-12 text-center">
          <h1 className="text-balance text-4xl font-bold tracking-tight text-slate-900 md:text-5xl">
            Our Technology Stack
          </h1>
          <p className="text-pretty mx-auto mt-4 max-w-3xl text-lg text-slate-600">
            A showcase of the tools, frameworks, and languages we use to build
            modern, high-performance web and mobile applications.
          </p>
        </header>

        <div className="mb-12 flex flex-wrap items-center justify-center gap-2 md:gap-3">
          {categories.map((category) => {
            const isSelected = selectedCategory === category;
            return (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`min-h-11 rounded-full px-4 py-2.5 text-sm font-semibold transition-[background-color,box-shadow,color,transform] duration-150 ease-out focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-slate-500 active:scale-[0.96] ${
                  isSelected
                    ? "bg-slate-900 text-white shadow-[0px_1px_2px_rgba(0,0,0,0.12)]"
                    : `bg-white text-slate-600 ${cardShadow} hover:bg-slate-50 ${cardShadowHover}`
                }`}
              >
                {category}
              </button>
            );
          })}
        </div>

        <main className="mt-12">
          <AnimatePresence mode="wait" initial={false}>
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
    </section>
  );
};

export default TechStack;
