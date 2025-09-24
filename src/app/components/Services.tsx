

"use client";
import type { NextPage } from "next";
import Link from "next/link";
import { PieChart, Atom, Users, Code, Brain } from "lucide-react";
import { motion } from "framer-motion";
import { useState } from "react";

const serviceData = [
  {
    icon: Code,
    title: "Product Engineering",
    description:
      "We design and develop scalable web applications and microservices using modern stacks, clean architecture, and agile release cycles, ensuring faster time-to-market and long-term maintainability.",
    isHighlighted: true,
  },
  {
    icon: Users,
    title: "Dedicated Pod Teams",
    description:
      "Quickly launch cross-functional squads, PM, frontend, backend, and QA, within two weeks. Scale effortlessly with flexible, outcome-focused SLAs tailored to your needs.",
    isHighlighted: false,
  },
  {
    icon: Atom,
    title: "Cloud & DevOps",
    description:
      "Streamline deployments with CI/CD pipelines, containerization, and secure cloud infrastructure on AWS, delivering high availability and operational efficiency.",
    isHighlighted: false,
  },
  {
    icon: Brain, // <- Lucide-react Brain icon for AI
    title: "AI Integrations",
    description:
      "Enhance your products with AI: from custom LLM-powered apps and intelligent chatbots to workflow automation and actionable insights-seamlessly embedded into your ecosystem.",
    isHighlighted: false,
  },
];

// Map “Read more” to Services page anchors (matching the stepper page slugs)
const readMoreHref: Record<string, string> = {
  "Product Engineering": "/services#01-custom-software-development",
  "Dedicated Pod Teams": "/services#09-team-augmentation",
  "Cloud & DevOps": "/services#04-cloud-computing",
  "AI Integrations": "/services#10-ai-integration",
};


const gridContainerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.15 },
  },
};

const cardVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: { y: 0, opacity: 1 },
};

const Services: NextPage = () => {
  const [hoveredCard, setHoveredCard] = useState<number | null>(null);

  return (
    <section id="services" className="bg-white py-20 lg:py-24">
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
          <p className="text-sky-500 font-semibold tracking-wider uppercase"></p>
          <h2 className="text-4xl md:text-5xl font-bold text-center font-sans text-gray-900 leading-tight mt-2">
            Our Core Services
          </h2>
          <p className="mt-4 text-lg text-gray-600">
            We help enterprises and startups ship faster with scalable teams,
            modern stacks, and reliable delivery,without the overhead.
          </p>
        </motion.div>

        {/* Service Cards Grid */}
        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 lg:max-w-7xl mx-auto"
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
              if (isHovered) return "bg-slate-900";
              if (isAnyCardHovered && !isHovered) return "bg-gray-200";
              return "bg-slate-900";
            };

            const getHighlightedIconColor = () => {
              if (isHovered) return "text-white";
              if (isAnyCardHovered && !isHovered) return "text-[#0a61cb]";
              return "text-[#0a61cb]";
            };

            return (
              <motion.div
                key={index}
                className="bg-gray-50  p-8 rounded-2xl shadow-sm hover:shadow-xl transition-shadow duration-300 flex flex-col"
                variants={cardVariants}
                transition={{ duration: 0.5, ease: "easeOut", type: "tween" }}
                onMouseEnter={() => setHoveredCard(index)}
                onMouseLeave={() => setHoveredCard(null)}
              >
                {service.isHighlighted ? (
                  <div
                    className={`w-12 h-12 flex items-center justify-center bg-slate-900 rounded-lg transition-colors duration-300`}
                  >
                    <Icon
                      className={`text-blue-400 bg-slate-900 duration-300`}
                      size={28}
                      aria-hidden="true"
                    />
                  </div>
                ) : (
                  <div
                    className={`w-12 h-12 flex items-center justify-center bg-slate-900 rounded-lg transition-colors duration-300`}
                  >
                    <Icon
                      className={`text-blue-400 transition-colors duration-300`}
                      size={28}
                      aria-hidden="true"
                    />
                  </div>
                )}

                <h3 className="mt-6 font-sans text-xl font-bold text-gray-800">
                  {service.title}
                </h3>
                <p className="mt-2 text-gray-600 flex-grow">
                  {service.description}
                </p>

                {/* Read more (aligned with Services page CTA style) */}
                <div className="mt-6">
                  <Link
                  href={( "/services") }
                    className="inline-flex items-center underline decoration-gray-300 underline-offset-4 text-gray-900 hover:decoration-gray-900 text-sm font-medium"
                    aria-label={`Read more about ${service.title}`}
                  >
                    Read more →
                  </Link>
                </div>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
};

export default Services;
