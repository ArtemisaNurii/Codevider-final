import { Briefcase, FileText, Users, Award } from "lucide-react"; // Using icons for better visuals

export const careerPage = {
	processSteps: [
		{
			step: 1,
			icon: <FileText className="h-8 w-8 text-blue-900" />,
			title: "Application Review",
			description:
				"Our team carefully reviews your resume and portfolio to assess how your skills and experience align with our needs. We look for potential, not just perfection, and we evaluate your capacity for growth, collaboration, and impact within our organization.",
		},
		{
			step: 2,
			icon: <Users className="h-8 w-8 text-blue-900" />,
			title: "HR Interview",
			description:
				"Our team of management and HR will conduct the first interview and understanding more about your experiences, your talents and your desire to expand in your field of interest. Also let you know more about our culture of work and our principal ethical issues in which we believe",
		},
		{
			step: 3,
			icon: <Briefcase className="h-8 w-8 text-blue-900" />,
			title: "Technical Review",
			description:
				"We conduct a technical assessment to evaluate your level of expertise, your analytical thinking, and the way you approach challenges. This process helps us build a full picture of your professional profile and identify whether it aligns with the requirements of our open positions",
		},
		{
			step: 4,
			icon: <Award className="h-8 w-8 text-blue-900" />,
			title: "The Offer",
			description:
				"If we're a great match, we'll extend a competitive offer to join our team. We'll guide you through all the details, answer any questions you may have, and support you through the onboarding process so you can step into your new role with confidence",
		},
	],
};
