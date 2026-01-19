"use client";
import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { BiLogoPostgresql } from "react-icons/bi";

import {
	FaReact,
	FaNodeJs,
	FaHtml5,
	FaCss3Alt,
	FaSass,
	FaVuejs,
	FaAngular,
	FaPhp,
	FaLaravel,
	FaDocker,
	FaGitAlt,
	FaJenkins,
	FaStripe,
	FaCloudflare,
} from "react-icons/fa";
import {
	SiNextdotjs,
	SiMongodb,
	SiTypescript,
	SiJavascript,
	SiJquery,
	SiNestjs,
	SiExpress,
	SiDjango,
	SiFlask,
	SiGraphql,
	SiSocketdotio,
	SiMysql,
	SiOpenai,
	SiKubernetes,
	SiVercel,
	SiCouchbase,
	SiGooglebigquery,
} from "react-icons/si";
import { DiMsqlServer } from "react-icons/di";
import { GrAndroid, GrApple } from "react-icons/gr";
import { CgArrowsExchange } from "react-icons/cg";
import { VscTerminal } from "react-icons/vsc";
import { RiFirebaseFill } from "react-icons/ri";
import { FaMeta } from "react-icons/fa6";
import { SiOllama } from "react-icons/si";
import Image from "next/image";

// --- TYPE DEFINITIONS ---
interface TechItemType {
	name: string;
	icon: React.ReactElement;
}

interface TechnologyCategoryType {
	category: string;
	items: TechItemType[];
}

// --- DATA ---
const iconProps = { size: 40 };
const imgProps = { className: "h-10 w-auto", width: 40, height: 40 };

const returnImageComponent = (src: string, iconName: string) => {
	return <Image src={src} {...imgProps} alt={`${iconName} icon`} />;
	// return <img src={src} {...imgProps} alt={`${iconName} icon`} />;
};

const technologies: TechnologyCategoryType[] = [
	{
		category: "Frontend Development",
		items: [
			{
				name: "React",
				icon: <FaReact {...iconProps} className="text-cyan-500" />,
			},
			{
				name: "Vue.js",
				icon: <FaVuejs {...iconProps} className="text-green-500" />,
			},
			{
				name: "Angular",
				icon: <FaAngular {...iconProps} className="text-red-600" />,
			},
			{
				name: "Next.js",
				icon: <SiNextdotjs {...iconProps} className="text-black" />,
			},
			{
				name: "TypeScript",
				icon: <SiTypescript {...iconProps} className="text-blue-500" />,
			},
			{
				name: "JavaScript",
				icon: <SiJavascript {...iconProps} className="text-yellow-500" />,
			},
			{
				name: "HTML5",
				icon: <FaHtml5 {...iconProps} className="text-orange-600" />,
			},
			{
				name: "CSS3",
				icon: <FaCss3Alt {...iconProps} className="text-blue-500" />,
			},
			{
				name: "Sass",
				icon: <FaSass {...iconProps} className="text-pink-500" />,
			},
			{
				name: "jQuery",
				icon: <SiJquery {...iconProps} className="text-blue-700" />,
			},
		],
	},
	{
		category: "Backend Development",
		items: [
			{
				name: "Node.js",
				icon: <FaNodeJs {...iconProps} className="text-green-600" />,
			},
			{
				name: "Express",
				icon: <SiExpress {...iconProps} className="text-gray-800" />,
			},
			{
				name: "Python",
				icon: returnImageComponent(
					"/images/stackIcons/backend/python.png",
					"Python",
				),
			},
			{
				name: "Django",
				icon: <SiDjango {...iconProps} className="text-green-800" />,
			},
			{
				name: "Flask",
				icon: <SiFlask {...iconProps} className="text-gray-800" />,
			},
			{
				name: "FastAPI",
				icon: returnImageComponent(
					"/images/stackIcons/backend/fastapi.svg",
					"FastAPI",
				),
			},
			{
				name: "PHP",
				icon: <FaPhp {...iconProps} className="text-indigo-500" />,
			},
			{
				name: "Laravel",
				icon: <FaLaravel {...iconProps} className="text-red-500" />,
			},

			{
				name: "NestJS",
				icon: <SiNestjs {...iconProps} className="text-red-500" />,
			},
		],
	},
	{
		category: "Databases",
		items: [
			{
				name: "PostgreSQL",
				icon: <BiLogoPostgresql {...iconProps} className="text-blue-600" />,
			},
			{
				name: "MySQL",
				icon: <SiMysql {...iconProps} className="text-blue-700" />,
			},
			{
				name: "MongoDB",
				icon: <SiMongodb {...iconProps} className="text-green-500" />,
			},
			{
				name: "Redis",
				icon: returnImageComponent(
					"/images/stackIcons/databases/redis.png",
					"Redis",
				),
			},
			{
				name: "SQL Server",
				icon: <DiMsqlServer {...iconProps} className="text-red-700" />,
			},
			{
				name: "DynamoDB",
				icon: returnImageComponent(
					"/images/stackIcons/databases/dynamodb.png",
					"DynamoDB",
				),
			},
			{
				name: "Firebase",
				icon: <RiFirebaseFill {...iconProps} className="text-yellow-500" />,
			},
			{
				name: "Elastic Search",
				icon: returnImageComponent(
					"/images/stackIcons/databases/elasticsearch.png",
					"Elastic Search",
				),
			},
			{
				name: "BigQuery",
				icon: <SiGooglebigquery {...iconProps} className="text-blue-500" />,
			},
			{
				name: "ClickHouse",
				icon: returnImageComponent(
					"/images/stackIcons/databases/clickhouse.png",
					"ClickHouse",
				),
			},
			{
				name: "Neo4j",
				icon: returnImageComponent(
					"/images/stackIcons/databases/neo4j.png",
					"Neo4j",
				),
			},
			{
				name: "RabbitMQ",
				icon: returnImageComponent(
					"/images/stackIcons/databases/rabbitmq.png",
					"RabbitMQ",
				),
			},
			{
				name: "Kafka",
				icon: returnImageComponent(
					"/images/stackIcons/databases/kafka.png",
					"Kafka",
				),
			},
			{
				name: "Couchbase",
				icon: <SiCouchbase {...iconProps} className="text-red-500" />,
			},
			{
				name: "Chroma",
				icon: returnImageComponent(
					"/images/stackIcons/databases/chroma.png",
					"Chroma",
				),
			},
			{
				name: "Pinecone",
				icon: returnImageComponent(
					"/images/stackIcons/databases/pinecone.png",
					"Pinecone",
				),
			},
			{
				name: "Qdrant",
				icon: returnImageComponent(
					"/images/stackIcons/databases/qdrant.png",
					"Qdrant",
				),
			},
			{
				name: "Weaviate",
				icon: returnImageComponent(
					"/images/stackIcons/databases/weaviate.png",
					"Weaviate",
				),
			},
		],
	},
	// vector dbs
	{
		category: "Cloud & DevOps",
		items: [
			{
				name: "AWS",
				icon: returnImageComponent(
					"/images/stackIcons/cloudNDevops/aws.png",
					"AWS",
				),
			},
			{
				name: "Google Cloud",
				icon: returnImageComponent(
					"/images/stackIcons/cloudNDevops/googleCloud.png",
					"Google Cloud",
				),
			},
			{
				name: "Azure",
				icon: returnImageComponent(
					"/images/stackIcons/cloudNDevops/microsoftAzure.svg",
					"Microsoft Azure",
				),
			},
			{
				name: "Hetzner",
				icon: returnImageComponent(
					"/images/stackIcons/cloudNDevops/hetzner.png",
					"Hetzner",
				),
			},
			{
				name: "Docker",
				icon: <FaDocker {...iconProps} className="text-blue-500" />,
			},
			{
				name: "Jenkins",
				icon: <FaJenkins {...iconProps} className="text-gray-600" />,
			},
			{
				name: "Git",
				icon: <FaGitAlt {...iconProps} className="text-orange-600" />,
			},
			{
				name: "GitHub",
				icon: returnImageComponent(
					"/images/stackIcons/cloudNDevops/github.svg",
					"GitHub",
				),
			},
			{
				name: "Gitlab",
				icon: returnImageComponent(
					"/images/stackIcons/cloudNDevops/gitlab.png",
					"Gitlab",
				),
			},

			{
				name: "Microservices",
				icon: <VscTerminal {...iconProps} className="text-gray-700" />,
			},
			{ name: "Vercel", icon: <SiVercel {...iconProps} className="" /> },
			{
				name: "Microsoft",
				icon: returnImageComponent(
					"/images/stackIcons/cloudNDevops/microsoft.png",
					"Microsoft",
				),
			},
			{
				name: "Cloudflare",
				icon: <FaCloudflare {...iconProps} className="text-orange-400" />,
			},
			{
				name: "Kubernetes",
				icon: <SiKubernetes {...iconProps} className="text-blue-500" />,
			},
		],
	},
	{
		category: "AI",
		items: [
			{
				name: "OpenAI",
				icon: <SiOpenai {...iconProps} className="text-teal-500" />,
			},
			{
				name: "Anthropic",
				icon: returnImageComponent(
					"/images/stackIcons/ai/anthropic.png",
					"Anthropic icon",
				),
			},
			{
				name: "Ollama",
				icon: <SiOllama {...iconProps} className="text-gray-800" />,
			},
			{
				name: "Gemini",
				icon: returnImageComponent(
					"/images/stackIcons/ai/gemini.png",
					"Gemini icon",
				),
			},
			{
				name: "Mistral",
				icon: returnImageComponent(
					"/images/stackIcons/ai/mistral.png",
					"Mistral icon",
				),
			},
			{
				name: "Huggingface",
				icon: returnImageComponent(
					"/images/stackIcons/ai/huggingface.png",
					"Huggingface icon",
				),
			},
		],
	},

	{
		category: "Mobile & Design",
		items: [
			{
				name: "iOS",
				icon: <GrApple {...iconProps} className="text-gray-700" />,
			},
			{
				name: "Android",
				icon: <GrAndroid {...iconProps} className="text-green-500" />,
			},
			{
				name: "Figma",
				icon: returnImageComponent(
					"/images/stackIcons/mobileNDesign/figma.png",
					"Figma icon",
				),
			},
			{
				name: "Meta",
				icon: <FaMeta {...iconProps} className="text-blue-600" />,
			},
		],
	},
	{
		category: "APIs & Communication",
		items: [
			{
				name: "REST API",
				icon: <CgArrowsExchange {...iconProps} className="text-green-600" />,
			},
			{
				name: "GraphQL",
				icon: <SiGraphql {...iconProps} className="text-pink-500" />,
			},
			{
				name: "Stripe",
				icon: <FaStripe {...iconProps} className="text-indigo-600" />,
			},
			{
				name: "PayPal",
				icon: returnImageComponent(
					"/images/stackIcons/apiNCommunication/paypal.svg",
					"PayPal",
				),
			},
			{
				name: "Socket.IO",
				icon: <SiSocketdotio {...iconProps} className="text-gray-800" />,
			},
			{
				name: "Slack",
				icon: returnImageComponent(
					"/images/stackIcons/apiNCommunication/slack.png",
					"Slack icon",
				),
			},
			{
				name: "Jira",
				icon: returnImageComponent(
					"/images/stackIcons/apiNCommunication/jira.svg",
					"Jira icon",
				),
			},
		],
	},
];

// --- CHILD COMPONENTS ---

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

interface TechCategoryProps {
	title: string;
	items: TechItemType[];
}

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
					<p className="mt-4 text-lg text-slate-600 max-w-3xl mx-auto">
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
