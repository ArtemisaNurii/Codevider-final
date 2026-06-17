"use client"

import React from 'react'
import { motion } from "motion/react";
import { Blend, ChartSpline, ShieldCheck } from "lucide-react";
import { useRevealInView, useScrollRevealAnimation } from '@/lib/hooks/useScrollRevealMode';

// --- Data ---
const featuresData = [
  {
    id: 1,
    icon: Blend,
    title: "Transparent Collaboration",
    description:
      "As your outsourced development partner, we integrate seamlessly with your in-house teams through open communication, prioritized roadmaps, and full visibility into every stage of our remote workflow.",
  },
  {
    id: 2,
    icon: ChartSpline,
    title: "Legal Protection",
    description:
      "Our developers build applications for clients only. This guarantees that clients always own the intellectual property rights to their software 100% of the time. We also sign non-disclosure and non-competition agreements for full legal protection..",
  },
  {
    id: 3,
    icon: ShieldCheck,
    title: "Cost-Effective Development",
    description:
      "Outsourcing Projects and development tasks to Eastern Europe saves you cash, without sacrificing code quality. CodeVider is headquartered in Tirana-Albania, which is a well-known hub for finding talented web app developers at budget-friendly prices",
  },
] as const;

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

const headingHidden = { opacity: 0, y: 20 };
const headingVisible = { opacity: 1, y: 0 };
const headingViewport = { once: true, amount: 0.3 };

const Outsource: React.FC = () => {
  const leftHeading = useRevealInView(headingHidden, headingVisible, headingViewport);
  const rightHeading = useRevealInView(headingHidden, headingVisible, headingViewport);
  const features = useScrollRevealAnimation({ once: true, amount: 0.3 });

  return (
    <div className="relative bg-white font-sans">
      <section className="relative z-10 bg-white text-gray-900 section-py max-sm:pt-4">
        <div className="site-container">
          {/* Heading */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-x-8 gap-y-8 lg:gap-y-10 items-start">
            <motion.div
              ref={leftHeading.ref}
              className="lg:pr-8"
              initial={leftHeading.initial}
              animate={leftHeading.animate}
              whileInView={leftHeading.whileInView}
              viewport={leftHeading.viewport}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              <h2 className="mt-2 text-fluid-heading font-bold leading-tight text-gray-900 text-balance">
                Outsource Engineering, Accelerate Growth
              </h2>
            </motion.div>

            <motion.div
              ref={rightHeading.ref}
              className="lg:pt-2"
              initial={rightHeading.initial}
              animate={rightHeading.animate}
              whileInView={rightHeading.whileInView}
              viewport={rightHeading.viewport}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <p className="text-base sm:text-lg leading-relaxed text-gray-800 text-pretty">
                Achieve cost efficiency and expert accuracy, scale with agile adaptability, and concentrate on your core strengths
              </p>
            </motion.div>
          </div>

          {/* Features */}
          <motion.div
            ref={features.ref}
            className="mt-12 sm:mt-16 lg:mt-20"
            variants={cardContainerVariants}
            initial={features.initial}
            animate={features.animate}
            whileInView={features.whileInView}
            viewport={features.viewport}
          >
            <div className="grid grid-cols-1 md:grid-cols-3 gap-x-8 gap-y-10 md:gap-y-12">
              {featuresData.map(({ id, icon: Icon, title, description }) => (
                <motion.div key={id} variants={cardItemVariants}>
                  <div className="mb-4">
                    <Icon className="h-8 w-8 text-[#0a61cb]" aria-hidden="true" />
                  </div>
                  <h3 className="text-lg font-bold font-sans leading-7 text-gray-900 text-balance">
                    {title}
                  </h3>
                  <p className="mt-2 text-base leading-7 text-gray-800 text-pretty">
                    {description}
                  </p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Outsource;