import { z } from "zod";

/** Translated messages for contact form validation errors. */
export type ContactFormMessages = {
	nameRequired: string;
	nameMax: string;
	emailRequired: string;
	emailInvalid: string;
	detailsRequired: string;
	detailsMax: string;
};

/**
 * Creates a Zod validation schema for the contact form.
 *
 * @param messages - Translated validation messages
 * @returns Zod schema for contact form values
 */
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

/** Type representing validated contact form values. */
export type ContactFormValues = z.infer<ReturnType<typeof createContactSchema>>;
