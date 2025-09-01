"use client";
import type { NextPage } from "next";
import { PieChart, Atom, Users, Code } from "lucide-react";
import { motion } from "framer-motion"; // Import motion from Framer Motion
import { useState } from "react";

const serviceData = [
  {
    icon: Code,
    title: "Product Engineering",
    description:
      "Design, build, and ship robust web apps and microservices with modern MERN stacks, clean architecture, and rapid release cycles.",
    isHighlighted: true,
  },
  {
    icon: Users,
    title: "Dedicated Pod Teams",
    description:
      "Spin up cross-functional squads (PM, FE, BE, QA) in under two weeks. Scale capacity up or down with outcome-based SLAs.",
    isHighlighted: false,
  },
  {
    icon: Atom,
    title: "Cloud & DevOps",
    description:
      "CI/CD pipelines, containerization, and cloud infrastructure on AWS/Azure/GCP for secure, high-availability deployments.",
    isHighlighted: false,
  },
  {
    icon: PieChart,
    title: "UI/UX & Front-End",
    description:
      "High-performance interfaces with React, Next.js, Tailwind, and motion—optimized for accessibility, SEO, and conversions.",
    isHighlighted: false,
  },
];

// Define animation variants for the container of the cards
const gridContainerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15, // This will cause each child to animate 0.15s after the previous one
    },
  },
};

// Define animation variants for each individual card
const cardVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: { y: 0, opacity: 1 },
};

const Services: NextPage = () => {
  const [hoveredCard, setHoveredCard] = useState<number | null>(null);

  return (
    <section id='services' className="bg-white py-20 lg:py-24">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          variants={{
            hidden: { opacity: 0, y: 30 },
            visible: { opacity: 1, y: 0 },
          }}
          className="text-center max-w-3xl mx-auto mb-16" 
        >
          <p className="text-sky-500 font-semibold tracking-wider uppercase">
          </p>
          <h2 className="mt-2 text-4xl font-sans lg:text-5xl font-bold text-gray-800">
            Our Core Services
          </h2>
          <p className="mt-4 text-lg text-gray-600">
            We help startups and enterprises ship faster with scalable teams,
            modern stacks, and reliable delivery-without the overhead.
          </p>
        </motion.div>

        {/* Service Cards Grid */}
        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4  gap-8"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={gridContainerVariants} 
        >
          {serviceData.map((service, index) => {
            const Icon = service.icon;
            const isHovered = hoveredCard === index;
            const isAnyCardHovered = hoveredCard !== null;
            
            const getHighlightedIconBg = () => {
              if (isHovered) return "bg-slate-900"; // This card is hovered
              if (isAnyCardHovered && !isHovered) return "bg-gray-200"; // Another card is hovered
              return "bg-slate-900"; // Default state
            };
            
            const getHighlightedIconColor = () => {
              if (isHovered) return "text-white"; // This card is hovered
              if (isAnyCardHovered && !isHovered) return "text-[#0a61cb]"; // Another card is hovered
              return "text-[#0a61cb]"; // Default state
            };
            
            return (
              <motion.div
                key={index}
                className="bg-gray-50 p-8 rounded-2xl shadow-sm hover:shadow-xl transition-shadow duration-300 flex flex-col"
                variants={cardVariants} 
                transition={{
                  duration: 0.5,
                  ease: "easeOut",
                  type: "tween"
                }}
                onMouseEnter={() => setHoveredCard(index)}
                onMouseLeave={() => setHoveredCard(null)}
              >
                {service.isHighlighted ? (
                  <div className={`w-12 h-12 flex items-center justify-center ${getHighlightedIconBg()} rounded-lg transition-colors duration-300`}>
                    <Icon className={`${getHighlightedIconColor()} transition-colors duration-300`} size={28} aria-hidden="true" />
                  </div>
                ) : (
                  <div className={`w-12 h-12 flex items-center justify-center ${isHovered ? 'bg-slate-900' : 'bg-gray-200'} rounded-lg transition-colors duration-300`}>
                    <Icon className={`${isHovered ? 'text-white' : 'text-[#0a61cb]'} transition-colors duration-300`} size={28} aria-hidden="true" />
                  </div>
                )}

                <h3 className="mt-6 font-sans text-xl font-bold text-gray-800">
                  {service.title}
                </h3>
                <p className="mt-2 text-gray-600 flex-grow">{service.description}</p>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
};

export default Services;