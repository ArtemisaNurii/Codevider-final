"use client"

import React from 'react'
import { motion } from "framer-motion";
import { Blend, ChartSpline, ShieldCheck } from "lucide-react";
import TextAnimation from './ui/AnimationText';

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
    title: "Scalable Resourcing",
    description:
      "Tap into our vetted global talent pool to scale your engineering capacity up or down on demand—delivering specialized expertise and cost-efficient staffing exactly when you need it.",
  },
  {
    id: 3,
    icon: ShieldCheck,
    title: "Secure Development",
    description:
      "We apply industry-leading security protocols, strict access controls, and compliance standards to safeguard your codebase and sensitive data throughout our outsourced engagement.",
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

const Outsource: React.FC = () => {
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
                text="Outsource Engineering, Accelerate Growth"
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
                text="Achieve cost efficiency and expert accuracy, scale with agile adaptability, and concentrate on your core strengths"
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
              {featuresData.map(({ id, icon: Icon, title, description }) => (
                <motion.div key={id} variants={cardItemVariants}>
                  <div className="mb-4">
                    <Icon className="h-8 w-8 text-[#0a61cb]" aria-hidden="true" />
                  </div>
                  <TextAnimation
                    as="h3"
                    text={title}
                    classname="text-lg font-bold font-sans leading-7 text-gray-900"
                  />
                  <TextAnimation
                    as="p"
                    text={description}
                    classname="mt-2 text-base leading-7 text-gray-800"
                  />
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