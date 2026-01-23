import { Users, Sparkles, Heart, Target, Trophy, Code2 } from "lucide-react";

const workingAtCodeviderIconStyling = {
	className: "mt-1 h-5 w-5 text-sky-600 stroke-1 md:stroke-2",
};
export const aboutPage = {
	main: {
		aboveTitle: "About Us",
		title: "Crafting Software That Means Business",
		description:
			"Strategy, design, and engineering working in harmony to drive your roadmap forward.",
	},
	whoarewe: [
		"Founded in 2019 in Tirana, Albania, CodeVider delivers high-performance, cost-efficient software development solutions for startups, SMEs, and enterprises across Europe and beyond. We specialize in web and mobile development, cloud-native microservices, and AI-powered integrations, helping you accelerate time-to-market and cut development costs by up to 60%.",
		"Our team of 25+ developers excels in today's most advanced tech stacks. We integrate directly into your workflow using agile, sprint-based methodologies that keep you informed and in control, every step of the way. With a focus on quality, agility, and long-term partnership, we turn your ideas into scalable, future-ready digital products.",
	],
	howWeBuildAtCodevider:
		"At the heart of our company is a culture built on collaboration, creativity, and accountability. We value open communication, celebrate diverse perspectives, and empower every team member to take ownership of their work. Growth and learning are part of our daily journey, and we believe success comes from working together with passion and purpose.",
	pillars: [
		{
			icon: <Target className="h-6 w-6 stroke-1 md:stroke-2" aria-hidden />,
			title: "Clear Vision",
			description:
				"With a clear vision, we define priorities, align on outcomes, and focus on what truly drives impact",
		},
		{
			icon: <Code2 className="h-6 w-6 stroke-1 md:stroke-2" aria-hidden />,
			title: "Clean Code",
			description:
				"Readable, tested, and maintainable code—peer reviews, standards, and refactors that keep velocity high.",
		},
		{
			icon: <Users className="h-6 w-6 stroke-1 md:stroke-2" aria-hidden />,
			title: "Supportive Team",
			description:
				"A culture of kindness, mentorship, knowledge-sharing, and support whenever it’s needed.",
		},
	],

	workingAtCodevider: {
		mainText:
			"We balance independence with guidance, and a culture of integrity, respect, and teamwork ensures an environment where we grow, collaborate, and achieve excellence together. At Codevider, we build with purpose and grow with intention.",
		list: [
			{
				icon: <Sparkles {...workingAtCodeviderIconStyling} />,
				text: "Dedicated focus time instead of endless meetings.",
			},
			{
				icon: <Trophy {...workingAtCodeviderIconStyling} />,
				text: "Goal-oriented roadmaps with clear performance metrics",
			},
			{
				icon: <Heart {...workingAtCodeviderIconStyling} />,
				text: "Wellness benefits, training budgets, and flexible time",
			},
		],
		gallery: [
			"/images/members/members1.jpg",
			"/images/members/members2.jpg",
			"/images/office/zyra10.jpg",
			"/images/office/zyra9.jpg",
		],
	},
	teamMembers: [
		{ name: "Pasho Toska", role: "Co-Founder", image: "pasho_toska.png" },
		{ name: "Ervin Ziko", role: "Co-Founder", image: "ervin_ziko.png" },
		{ name: "Altin Luli", role: "Co-Founder", image: "altin_luli.png" },

		{ name: "Erion Domi", role: "Co-Founder", image: "erion_domi.png" },
		{
			name: "Genci Likaj",
			role: "Senior Software engineer",
			image: "genci_likaj.png",
		},
		{
			name: "Jul Kreshpaj",
			role: "Senior Software engineer",
			image: "jul_kreshpaj.png",
		},
		{
			name: "Elisabeta Guri",
			role: "HR Manager",
			image: "elisabeta_guri.png",
		},
		{
			name: "Ansel Nikaj",
			role: "Project Manager",
			image: "ansel_nikaj.png",
		},
		{
			name: "Xhulio Balli",
			role: "Project Manager",
			image: "xhulio_balli.png",
		},

		{
			name: "Besjana Fixha ",
			role: "Fullstack Developer",
			image: "besiana_fixha.png",
		},
		{
			name: "Erald Plloha",
			role: "Backend Developer",
			image: "erald_plloha.png",
		},
		{
			name: "Arlind Idrizi",
			role: "Frontend Developer",
			image: "arlind_idrizi.png",
		},
		{
			name: "Eliana Kryeziu",
			role: "Frontend Developer",
			image: "eliana_kryeziu.png",
		},

		{
			name: "Geri Lluga",
			role: "Backend Developer",
			image: "geri_lluga.png",
		},
		{
			name: "Fjona Rira",
			role: "Frontend Developer",
			image: "fjona_rira.png",
		},
		{
			name: "Armando Muco",
			role: "Backend Developer",
			image: "armando_muco.png",
		},
		{ name: "Kejdi Balla", role: "UIUX Designer", image: "kejdi_balla.png" },
		{
			name: "Amanda Oshafi",
			role: "Backend Developer",
			image: "amanda_oshafi.png",
		},
		{
			name: "Artemisa Nuri",
			role: "Frontend Developer",
			image: "artemisa_nuri.png",
		},
		{
			name: "Kejsi Terolli",
			role: "Frontend Developer",
			image: "kejsi_terolli.png",
		},
		{
			name: "Vasjan Çupri",
			role: "Backend Developer",
			image: "vasjan_cupri.png",
		},
	],
};
