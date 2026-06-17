import { Briefcase, FileText, Users, Award } from "lucide-react"; // Using icons for better visuals

export const careerPage = {
	main: {
		aboveTitle: "Careers",
		title: "Be part of our exceptional team",
		description:
			"Join our team and help us build the future of software development. We are always looking for talented individuals to join our growing team.",
	},
	processSteps: [
		{
			step: 1,
			icon: <FileText className="h-8 w-8 text-sky-700 stroke-1 md:stroke-2" />,
			title: "Application Review",
			description:
				"Our team carefully reviews your resume and portfolio to assess how your skills and experience align with our needs. We look for potential, not just perfection, and we evaluate your capacity for growth, collaboration, and impact within our organization.",
		},
		{
			step: 2,
			icon: <Users className="h-8 w-8 text-sky-700 stroke-1 md:stroke-2" />,
			title: "HR Interview",
			description:
				"Our team of management and HR will conduct the first interview and understanding more about your experiences, your talents and your desire to expand in your field of interest. We will also discuss our work culture and the core ethical principles that drive our organization.",
		},
		{
			step: 3,
			icon: (
				<Briefcase className="h-8 w-8 text-sky-700 stroke-1 md:stroke-2" />
			),
			title: "Technical Review",
			description:
				"We conduct a technical assessment to evaluate your level of expertise, your analytical thinking, and the way you approach challenges. This process helps us build a full picture of your professional profile and identify whether it aligns with the requirements of our open positions.",
		},
		{
			step: 4,
			icon: <Award className="h-8 w-8 text-sky-700 stroke-1 md:stroke-2" />,
			title: "The Offer",
			description:
				"If we're a great match, we'll extend a competitive offer to join our team. We'll guide you through all the details, answer any questions you may have, and provide a structured onboarding process to ensure you step into your new role with confidence and clarity.",
		},
	],
};
