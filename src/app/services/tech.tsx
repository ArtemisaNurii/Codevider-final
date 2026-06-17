"use client"
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  FaReact, FaNodeJs, FaHtml5, FaCss3Alt, FaSass, FaVuejs, FaAngular, FaPython,
  FaPhp, FaLaravel, FaDocker, FaAws, FaGitAlt, FaJenkins, FaSlack, FaPaypal, FaStripe,FaMicrosoft,FaCloudflare, 
} from 'react-icons/fa';
import {
  SiNextdotjs, SiMongodb, SiPostgresql, SiTypescript, SiJavascript, SiJquery,SiNestjs,
  SiExpress, SiDjango, SiFlask, SiGraphql, SiSocketdotio,
  SiMysql, SiFigma, SiOpenai, SiKubernetes, SiVercel
} from 'react-icons/si';
import { GrAndroid, GrApple } from 'react-icons/gr';
import { CgArrowsExchange } from 'react-icons/cg';
import { VscTerminal } from 'react-icons/vsc';
import { SiAnthropic } from "react-icons/si";
import { RiMixtralFill } from "react-icons/ri";
import { FaMeta } from "react-icons/fa6";
import { SiHuggingface } from "react-icons/si";
import { SiOllama } from "react-icons/si";
import { RiGeminiFill } from "react-icons/ri";
import { SiGooglecloud } from "react-icons/si";
import { VscAzure } from "react-icons/vsc";
interface TechItemType {
  name: string;
  icon: React.ReactElement;
}

interface TechnologyCategoryType {
  category: string;
  items: TechItemType[];
}

const iconProps = { size: 36 };

const cardShadow =
  'shadow-[0px_0px_0px_1px_rgba(0,0,0,0.06),0px_1px_2px_-1px_rgba(0,0,0,0.06),0px_2px_4px_0px_rgba(0,0,0,0.04)]';
const cardShadowHover =
  'hover:shadow-[0px_0px_0px_1px_rgba(0,0,0,0.08),0px_1px_2px_-1px_rgba(0,0,0,0.08),0px_2px_4px_0px_rgba(0,0,0,0.06)]';

const gridContainerVariants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.05 },
  },
};

const gridItemVariants = {
  hidden: { opacity: 0, y: 12, filter: 'blur(4px)' },
  visible: {
    opacity: 1,
    y: 0,
    filter: 'blur(0px)',
    transition: { type: 'spring' as const, duration: 0.3, bounce: 0 },
  },
};

const technologies: TechnologyCategoryType[] = [
  {
    category: "Frontend Development",
    items: [
      { name: "React", icon: <FaReact {...iconProps} className="text-cyan-500" /> },
      { name: "Next.js", icon: <SiNextdotjs {...iconProps} className="text-black" /> },
      { name: "Vue.js", icon: <FaVuejs {...iconProps} className="text-green-500" /> },
      { name: "Angular", icon: <FaAngular {...iconProps} className="text-red-600" /> },
      { name: "TypeScript", icon: <SiTypescript {...iconProps} className="text-blue-500" /> },
      { name: "JavaScript", icon: <SiJavascript {...iconProps} className="text-yellow-500" /> },
      { name: "HTML5", icon: <FaHtml5 {...iconProps} className="text-orange-600" /> },
      { name: "CSS3", icon: <FaCss3Alt {...iconProps} className="text-blue-500" /> },
      { name: "Sass", icon: <FaSass {...iconProps} className="text-pink-500" /> },
      { name: "jQuery", icon: <SiJquery {...iconProps} className="text-blue-700" /> },
    ]
  },
  {
    category: "Backend Development",
    items: [
      { name: "Node.js", icon: <FaNodeJs {...iconProps} className="text-green-600" /> },
      { name: "Express", icon: <SiExpress {...iconProps} className="text-gray-800" /> },
      { name: "Python", icon: <FaPython {...iconProps} className="text-blue-500" /> },
      { name: "Django", icon: <SiDjango {...iconProps} className="text-green-800" /> },
      { name: "Flask", icon: <SiFlask {...iconProps} className="text-gray-800" /> },
      { name: "PHP", icon: <FaPhp {...iconProps} className="text-indigo-500" /> },
      { name: "Laravel", icon: <FaLaravel {...iconProps} className="text-red-500" /> },
   
      { name: "NestJS", icon: <SiNestjs {...iconProps} className="text-red-500" /> },
    ]
  },
  {
    category: "Databases",
    items: [
      { name: "MongoDB", icon: <SiMongodb {...iconProps} className="text-green-500" /> },
      { name: "PostgreSQL", icon: <SiPostgresql {...iconProps} className="text-blue-600" /> },
      { name: "MySQL", icon: <SiMysql {...iconProps} className="text-blue-700" /> },
    ]
  },
  {
    category: "Cloud & DevOps",
    items: [
      { name: "AWS", icon: <FaAws {...iconProps} className="text-orange-500" /> },
      { name: "Docker", icon: <FaDocker {...iconProps} className="text-blue-500" /> },
      { name: "Jenkins", icon: <FaJenkins {...iconProps} className="text-gray-600" /> },
      { name: "Git", icon: <FaGitAlt {...iconProps} className="text-orange-600" /> },
      { name: "Microservices", icon: <VscTerminal {...iconProps} className="text-gray-700" /> },
      { name: "Vercel", icon: <SiVercel {...iconProps} className="" /> },
      { name: "Microsoft", icon: <FaMicrosoft {...iconProps} className="" /> },
      { name: "Cloudflare", icon: <FaCloudflare {...iconProps} className="text-orange-400" /> },
      { name: 'Google Cloud', icon: <SiGooglecloud {...iconProps} className="text-blue-500" /> },
      { name: 'Azure', icon: <VscAzure {...iconProps} className="text-blue-500" /> },
      { name: 'Kubernetes', icon: <SiKubernetes {...iconProps} className="text-blue-500" /> },
    ]
  },
  {
    category: "Mobile, AI & Design",
    items: [
      { name: "iOS", icon: <GrApple {...iconProps} className="text-gray-700" /> },
      { name: "Android", icon: <GrAndroid {...iconProps} className="text-green-500" /> },
      { name: "OpenAI", icon: <SiOpenai {...iconProps} className="text-teal-500" /> },
      { name: "Figma", icon: <SiFigma {...iconProps} className="text-purple-500" /> },
      { name: "Anthropic", icon: <SiAnthropic {...iconProps} className="text-orange-600" /> },
      { name: "Mixtral", icon: <RiMixtralFill {...iconProps} className="text-orange-500" /> },
      { name: "Meta", icon: <FaMeta {...iconProps} className="text-blue-600" /> },
      { name: "Huggingface", icon: <SiHuggingface {...iconProps} className="text-yellow-500" /> },
      { name: "Ollama", icon: <SiOllama {...iconProps} className="text-gray-800" /> },
      { name: "Gemini", icon: <RiGeminiFill {...iconProps} className="text-blue-600" /> },
    ]
  },
  {
    category: "APIs & Communication",
    items: [
      { name: "REST API", icon: <CgArrowsExchange {...iconProps} className="text-green-600" /> },
      { name: "GraphQL", icon: <SiGraphql {...iconProps} className="text-pink-500" /> },
      { name: "Stripe", icon: <FaStripe {...iconProps} className="text-indigo-600" /> },
      { name: "PayPal", icon: <FaPaypal {...iconProps} className="text-blue-600" /> },
      { name: "Socket.IO", icon: <SiSocketdotio {...iconProps} className="text-gray-800" /> },
      { name: 'Slack', icon: <FaSlack {...iconProps} className="text-purple-600" /> },
    ]
  }
];

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
    initial={{ opacity: 0, y: 12, filter: 'blur(4px)' }}
    animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
    exit={{ opacity: 0, y: -12, filter: 'blur(4px)', transition: { duration: 0.15, ease: 'easeIn' } }}
    transition={{ type: 'spring', duration: 0.3, bounce: 0 }}
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
  const [selectedCategory, setSelectedCategory] = useState<string>('All');

  const categories = ['All', ...technologies.map(tech => tech.category)];

  const filteredTechnologies = selectedCategory === 'All'
    ? technologies
    : technologies.filter(tech => tech.category === selectedCategory);

  return (
    <section className="border-t border-slate-100 font-sans">
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 md:py-24 lg:px-8">
        <header className="mb-12 text-center">
          <h1 className="text-balance text-4xl font-bold tracking-tight text-slate-900 md:text-5xl">
            Our Technology Stack
          </h1>
          <p className="text-pretty mx-auto mt-4 max-w-3xl text-lg text-slate-600">
            A showcase of the tools, frameworks, and languages we use to build modern, high-performance web and mobile applications.
          </p>
        </header>

        {/* Filter Badges */}
        <div className="mb-12 flex flex-wrap items-center justify-center gap-2 md:gap-3">
          {categories.map((category) => {
            const isSelected = selectedCategory === category;
            return (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`min-h-11 rounded-full px-4 py-2.5 text-sm font-semibold transition-[background-color,box-shadow,color,transform] duration-150 ease-out focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-slate-500 active:scale-[0.96] ${
                  isSelected
                    ? 'bg-slate-900 text-white shadow-[0px_1px_2px_rgba(0,0,0,0.12)]'
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
