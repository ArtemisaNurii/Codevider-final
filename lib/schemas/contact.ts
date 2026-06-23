import { z } from "zod";

export type ContactFormMessages = {
	nameRequired: string;
	nameMax: string;
	emailRequired: string;
	emailInvalid: string;
	detailsRequired: string;
	detailsMax: string;
};

export function createContactSchema(messages: ContactFormMessages) {
	return z.object({
		name: z
			.string()
			.trim()
			.min(1, messages.nameRequired)
			.max(100, messages.nameMax),
		email: z
			.string()
			.trim()
			.min(1, messages.emailRequired)
			.email(messages.emailInvalid),
		details: z
			.string()
			.trim()
			.min(1, messages.detailsRequired)
			.max(1000, messages.detailsMax),
	});
}

export type ContactFormValues = z.infer<ReturnType<typeof createContactSchema>>;
