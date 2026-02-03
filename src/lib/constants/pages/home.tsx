import { Atom, Users, Code, Brain, Mail, Phone } from "lucide-react";
import { Blend, ChartSpline, ShieldCheck } from "lucide-react";

export const homePage = {
	hero: {
		heroTitle: "Your Strategic Partner in",
		phrases: [
			"Software Solutions",
			"Blockchain Apps",
			"Fintech",
			"AI Integrations",
			"A/B Startups",
			"Smart Automation",
		],
	},
	transformingIdeas: {
		title: (
			<>
				Transforming Ideas <br /> Into Trusted Digital Solutions
			</>
		),
		description:
			"From web and mobile apps to cloud platforms and enterprise systems, we craft reliable software tailored to your business needs. Our teams blend modern technologies, scalable architectures, and intuitive design to deliver secure, high-performance solutions that help organizations innovate and grow.",
		cards: {
			smallOnes: [
				{
					metric: "30+",
					title: "Global Partnerships",
					badge: "Network Expansion",
				},
				{
					metric: "60%",
					title: "Growth Rate",
					badge: "Faster Acquisition",
				},
			],
			largeOne: {
				metric: "25+",
				title: "Elite Talent",
				badge: "Developers with Deep Expertise",
			},
		},
	},
	ourCoreServices: {
		title: "Our Core Services",
		description:
			"We help enterprises and startups ship faster with scalable teams, modern stacks, and reliable delivery, without the overhead.",
		list: [
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
		],
	},
	industries: {
		title: "We Empower Tech Startups, SMEs & Global Brands",
		list: [
			{
				title: "Series A/B Startups",
				description:
					"We help fast-growing startups scale with agile teams and cloud-native solutions. From MVP acceleration to core system growth, we deliver technology that fuels sustainable success.",
			},
			{
				title: "Enterprise Modernization",
				description:
					"We modernize legacy systems with cloud-native,reducing technical debt, improving performance, and unlocking long-term innovation.",
			},
			{
				title: "CRM-Centric Organizations",
				description:
					"We design tailored CRM and HR platforms that streamline workflows, improve experiences, and centralize data for smarter decision-making.",
			},
			{
				title: "Custom Software Solutions",
				description:
					"Off-the-shelf tools don’t fit every need. We build scalable, flexible software solutions that evolve with your business and deliver measurable results.",
			},
			{
				title: "Fintech & Payments",
				description:
					"From digital wallets to trading platforms, we create secure, compliant fintech solutions that scale globally and deliver seamless user experiences.",
			},
			{
				title: "AI & Automation",
				description:
					"We implement AI-powered chatbots, predictive analytics, and automation systems that cut manual work, increase accuracy, and drive new revenue.",
			},
			{
				title: "Data & Analytics Platforms",
				description:
					"We transform raw data into actionable insights with BI dashboards, data warehouses, and real-time analytics built for smarter decisions.",
			},
			{
				title: "Mobile App Development",
				description:
					"We build high-performance iOS, Android, and cross-platform apps with seamless UX-keeping your brand connected to users anytime, anywhere.",
			},
		],
	},
	outsource: {
		title: "Outsource Engineering, Accelerate Growth",
		description:
			"Achieve cost efficiency and expert accuracy, scale with agile adaptability, and concentrate on your core strengths",
		list: [
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
		],
	},
	worldMap: {
		title: "Global Partnerships",
		description:
			"Building bridges across borders. We enable seamless collaboration on projects worldwide, empowering startups, enterprises, and innovators to grow together.",
		geolocationDots: [
			{
				start: { lat: 32.1533, lng: 17.1683 },
				end: { lat: 27.7128, lng: -77.006 },
			}, // → New York City
			{
				start: { lat: 32.1533, lng: 17.1683 },
				end: { lat: 41.8566, lng: 5.3522 },
			}, // → Paris
			{
				start: { lat: 32.1533, lng: 17.1683 },
				end: { lat: 29.7749, lng: -122.4194 },
			}, // → San Francisco
			{
				start: { lat: 32.1533, lng: 17.1683 },
				end: { lat: -58.8136, lng: 144.9631 },
			}, // → Melbourne
			{
				start: { lat: 32.1533, lng: 17.1683 },
				end: { lat: 46.5074, lng: -2.2978 },
			}, // → London
			{
				start: { lat: 32.1533, lng: 16.1683 },
				end: { lat: 5.2048, lng: 55.9708 },
			}, // → Dubai
		],
	},
	unlockYourPotential: {
		mainTitle: {
			part1: "Unlock Your",
			highlight: "Potential With",
			part2: "Our Expertise",
		},
		infoCard: {
			tag: "Our Value Proposition",
			features: ["Efficiency", "Flexibility", "Expertise"],
			subtitle:
				"We deliver more than code providing a strategic partnership designed for growth.",
		},
		metric1: {
			value: "100%",
			label: "Flexibility & Control",
			subtitle:
				"You can manage and be in control of your own project at all times.",
		},
		metric2: {
			value: "+6",
			label: "Years of Experience",
			subtitle: "Benefit from the innovative viewpoints our team brings.",
			// Repurposed 'countries' to 'skills' for the pills
			skills: ["USA", "Germany", "London", "Europe"],
		},
	},
	whyOurClientsChooseUs: {
		title: "Why Our Clients Choose Us",
		description:
			"Our partnership model is built on three pillars: efficiency, flexibility, and deep expertise.",
		list: [
			{
				tag: "Advantage 01",
				title: "Significant Cost & Time Savings",
				metric: { value: "", label: "Avg. Savings" },
				description:
					"Bypass expensive hiring and training. Our streamlined process gets you to market faster, saving crucial time and resources.",
			},
			{
				tag: "Advantage 02",
				title: "Total Flexibility & Control",
				metric: { value: "", label: "Platform Access" },
				description:
					"Scale your team on-demand for single or multiple projects, and monitor progress anytime through Slack, Jira, Github, etc.",
			},
			{
				tag: "Advantage 03",
				title: "Creative Expertise on Demand",
				metric: { value: "", label: "Perspectives" },
				description:
					"Instantly access a pool of highly motivated, creative professionals who bring fresh perspectives and innovative solutions to the table.",
			},
		],
	},

	faq: {
		title: "Frequently Asked Questions",
		list: [
			{
				title: "What types of software projects do you take on?",
				description:
					"We build everything from MVPs and mobile apps to large-scale SaaS platforms, internal tools, and complex cloud back-ends. If it involves custom code, we can probably handle it.",
			},
			{
				title: "Which technologies and frameworks do you specialize in?",
				description:
					"Our team specializes in modern web and mobile frameworks including React, Next.js, Node.js, Python, Tailwind CSS, and AWS Cloud services. We’re also flexible and learn new stacks quickly.",
			},
			{
				title: "How do you estimate project timelines and budgets?",
				description:
					"We start with a discovery session to understand your goals, then create a detailed scope with estimates. Our estimates balance speed and thoroughness to help you plan accurately.",
			},
			{
				title: "Will I own the source code and intellectual property?",
				description:
					"Yes, you retain full ownership of all source code and IP upon final payment. We make this clear in our contract for transparency and peace of mind.",
			},
			{
				title: "How will we communicate during the project?",
				description:
					"We use tools like Slack, Notion, and regular video calls to keep you updated. You’ll have a direct line to your project manager and developers.",
			},
			{
				title: "What is your quality-assurance process?",
				description:
					"Our QA process includes manual and automated testing, peer code reviews, staging environments, and performance monitoring to ensure everything works as intended.",
			},
			{
				title: "Do you provide post-launch support and maintenance?",
				description:
					"Yes. We offer flexible maintenance plans, including bug fixes, updates, performance monitoring, and new feature development.",
			},
			{
				title: "Can you work with an existing or legacy codebase?",
				description:
					"Absolutely. We’ve helped modernize and scale legacy systems across various tech stacks while preserving core functionality.",
			},
		],
	},
	contact: {
		aboveTitle: "Let's Connect",
		title: "Ready to Build Your Next Big Idea?",
		description:
			"Whether you have a specific project in mind or just want to explore possibilities, our team is here to help. Fill out the form, or reach out to us directly.",
		buttonList: [
			{
				icon: <Mail className="h-6 w-6 text-sky-300 stroke-1 md:stroke-2" />,
				href: "mailto:info@codevider.com",
				text: "Email Us Directly",
				detail: "info@codevider.com",
			},
			{
				icon: <Phone className="h-6 w-6 text-sky-300 stroke-1 md:stroke-2" />,
				href: "tel:+355695877742",
				text: "Call Us Now",
				detail: "+355 69 587 7742",
			},
		],
	},
};
