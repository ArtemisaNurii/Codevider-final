import Image from "next/image";
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

const iconProps = { size: 40 };
const imgProps = { className: "h-10 w-auto", width: 40, height: 40 };

export const returnImageComponent = (src: string, iconName: string) => {
	return (
		<>
			<Image src={src} {...imgProps} alt={`${iconName} icon`} />
		</>
	);
};

export const servicesPage = {
	main: {
		aboveTitle: "Our Capabilities",
		title: "Services that Move Your Roadmap Forward",
		description:
			"Explore how we design, build, and scale reliable products. We combine technical excellence with strategic oversight to deliver software that outperforms.",
	},
	services: [
		{
			title: "Custom Software Development",
			slug: "custom-software-development",
			description:
				"We design and build software tailored to your business. From discovery to launch, we focus on real outcomes: faster workflows, lower costs, and scalable tech that grows with you.",
			solutions: [
				"Tailored platforms built around your exact workflows",
				"Long-term scalability with clean, maintainable code",
				"Seamless integration with existing business systems",
			],
			outcomes: [
				"Reduced operational overhead",
				"Higher employee productivity",
				"Future-proof technology aligned with growth plans",
			],
		},
		{
			title: "Web Application Development",
			slug: "web-application-development",
			description:
				"High-performing web apps that load fast, look great on every device, and convert visitors into customers. Ideal for portals, dashboards, and data-heavy tools.",
			solutions: [
				"Responsive portals optimized for performance",
				"Real-time dashboards with actionable insights",
				"Secure and intuitive customer-facing web solutions",
			],
			outcomes: [
				"Improved customer engagement and conversions",
				"Lower bounce rates due to faster load times",
				"Streamlined internal processes via custom portals",
			],
		},
		// {
		//   title: 'Mobile Application Development',
		//   description:
		//     'iOS and Android apps users love,built native or cross-platform. Smooth UX, offline support, and seamless releases to App Store and Google Play.',
		// },
		{
			title: "AI Integration",
			slug: "ai-integration",
			description:
				"We integrate AI into your existing workflows. From custom LLM-powered apps to intelligent chatbots and workflow automation, we make AI work for you.",
			solutions: [
				"Custom LLM-powered apps and intelligent chatbots",
				"Workflow automation and actionable insights",
				"Seamless integration into existing ecosystems",
			],
			outcomes: [
				"Faster response times with AI-powered chatbots",
				"Reduction in manual data entry and document processing",
				"Data-driven insights that improve decision accuracy",
			],
		},
		{
			title: "Automation",
			slug: "automation",
			description:
				"Eliminate repetitive work and reduce errors. We automate deployments, testing, and operations so your team can focus on revenue-driving tasks.",
			solutions: [
				"Fully automated deployment pipelines",
				"QA processes that run with zero human intervention",
				"Workflow automations tailored to business rules",
			],
			outcomes: [
				"Fewer manual errors across departments",
				"Accelerated delivery timelines",
				"Increased focus on revenue-driving activities",
			],
		},
		{
			title: "Systems Integration",
			slug: "systems-integration",
			description:
				"Connect your tools into one reliable flow. We unify apps and data, remove silos, and make information available where your teams need it.",
			solutions: [
				"Unified data across departments and platforms",
				"Seamless syncs between CRM, ERP, and third-party tools",
				"Centralized reporting for faster decision-making",
			],
			outcomes: [
				"Better collaboration with unified tools",
				"Real-time insights across business units",
				"Faster execution of company-wide initiatives",
			],
		},
		{
			title: "Cloud Infrastructure",
			slug: "cloud-infrastructure",
			description:
				"A secure, scalable cloud foundation,built with Infrastructure as Code. We optimize for performance, uptime, and cost so you only pay for what you use.",
			solutions: [
				"Infrastructure as Code for repeatable deployments",
				"Optimized workloads with cost-efficient scaling",
				"High availability and disaster recovery setups",
			],
			outcomes: [
				"Reduced downtime with resilient systems",
				"Lower infrastructure costs through scaling",
				"Faster time-to-deploy for new products",
			],
		},
		{
			title: "Team Augmentation",
			slug: "team-augmentation",
			description:
				"Add vetted engineers and product talent that plug into your process. Scale up quickly, keep momentum, and deliver more,without long hiring cycles.",
			solutions: [
				"Specialized engineers embedded in your workflow",
				"Flexible engagement-scale teams up or down",
				"Immediate capacity without long recruitment cycles",
			],
			outcomes: [
				"On-time delivery of critical projects",
				"Increased innovation with diverse skillsets",
				"Faster response to shifting business needs",
			],
		},
	],
	processSteps: {
		1: {
			step: "Step 1",
			title: "Discovery & Needs",
			description:
				"We start by understanding your vision. Stakeholder interviews and product-vision canvas sessions align goals and metrics.",
		},
		2: {
			step: "Step 2",
			title: "Team Selection",
			description:
				"The perfect team, assembled for you. We match our developer skills and expertise directly to your project requirements.",
		},
		3: {
			step: "Step 3",
			title: "Development",
			description:
				"Engineering & Execution. Our developers build with precision, utilizing clean architecture and industry standards to ensure scalability.",
		},
		4: {
			step: "Step 4",
			title: "Agile Reporting",
			description:
				"Stay in the loop, always. We use CI/CD, code reviews, daily stand-ups, and weekly reports to ensure transparency.",
		},
		5: {
			step: "Step 5",
			title: "Deployment",
			description:
				"Going live, smoothly. We provide a staging server for testing and deploy clean, optimized code to your servers.",
		},
		6: {
			step: "Step 6",
			title: "Maintenance",
			description:
				"Long-Term Partnership. We provide post-launch support and iteration, allowing you to retain the same dedicated team for consistent knowledge retention.",
		},
	},
	techStack: [
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
					name: "OVHCloud",
					icon: returnImageComponent(
						"/images/stackIcons/cloudNDevops/ovhcloud.png",
						"OVHCloud"
					)
				},
				{
					name: "Cloudflare",
					icon: <FaCloudflare {...iconProps} className="text-orange-400" />,
				},

				{
					name: "Docker",
					icon: <FaDocker {...iconProps} className="text-blue-500" />,
				},
				{
					name: "Kubernetes",
					icon: <SiKubernetes {...iconProps} className="text-blue-500" />,
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
						"Anthropic",
					),
				},

				{
					name: "Gemini",
					icon: returnImageComponent(
						"/images/stackIcons/ai/gemini.png",
						"Gemini",
					),
				},
				{
					name: "Mistral",
					icon: returnImageComponent(
						"/images/stackIcons/ai/mistral.png",
						"Mistral",
					),
				},
				{
					name: "Huggingface",
					icon: returnImageComponent(
						"/images/stackIcons/ai/huggingface.png",
						"Huggingface",
					),
				},
				{
					name: "AI Agents",
					icon: returnImageComponent(
						"/images/stackIcons/ai/agents.svg",
						"AI Agents"
					)
				},
				{
					name: "MCP",
					icon: returnImageComponent(
						"/images/stackIcons/ai/mcp.svg",
						"MCP"
					)
				},
				{
					name: "Ollama",
					icon: <SiOllama {...iconProps} className="text-gray-800" />,
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
						"Figma",
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
					name: "Socket.IO",
					icon: <SiSocketdotio {...iconProps} className="text-gray-800" />,
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
					name: "Slack",
					icon: returnImageComponent(
						"/images/stackIcons/apiNCommunication/slack.png",
						"Slack",
					),
				},
				{
					name: "Jira",
					icon: returnImageComponent(
						"/images/stackIcons/apiNCommunication/jira.svg",
						"Jira",
					),
				},
			],
		},
	],
};
