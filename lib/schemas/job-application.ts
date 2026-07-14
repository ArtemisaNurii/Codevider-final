import { z } from "zod";

/** Translated messages for job application form validation errors. */
export type JobApplicationFormMessages = {
	fullNameRequired: string;
	fullNameMax: string;
	emailRequired: string;
	emailInvalid: string;
	phoneMax: string;
	dobRequired: string;
	genderRequired: string;
	profileImageRequired: string;
	resumeRequired: string;
	bioMax: string;
	coverLetterMax: string;
	skillsMax: string;
};

/** Flags indicating which optional fields are required for a specific job. */
type JobRequirementFlags = {
	isDobRequired: boolean;
	isGenderRequired: boolean;
};

/**
 * Creates a Zod validation schema for the job application form.
 *
 * @param flags - Job-specific requirement flags
 * @param messages - Translated validation messages
 * @returns Zod schema for job application form values
 */
export function createJobApplicationSchema(
	flags: JobRequirementFlags,
	messages: JobApplicationFormMessages,
) {
	return z
		.object({
			full_name: z
				.string()
				.trim()
				.min(1, messages.fullNameRequired)
				.max(100, messages.fullNameMax),
			email: z
				.string()
				.trim()
				.min(1, messages.emailRequired)
				.email(messages.emailInvalid),
			phone: z.string().trim().max(30, messages.phoneMax).optional(),
			date_of_birth: z.string().optional(),
			gender: z.string().optional(),
			bio: z.string().trim().max(2000, messages.bioMax).optional(),
			cover_letter: z
				.string()
				.trim()
				.max(5000, messages.coverLetterMax)
				.optional(),
			skills: z.string().trim().max(500, messages.skillsMax).optional(),
			profile_image: z
				.custom<File>(
					(value) => value instanceof File && value.size > 0,
					messages.profileImageRequired,
				)
				.optional(),
			resume: z
				.custom<File>(
					(value) => value instanceof File && value.size > 0,
					messages.resumeRequired,
				)
				.optional(),
		})
		.superRefine((data, ctx) => {
			if (!data.profile_image) {
				ctx.addIssue({
					code: "custom",
					path: ["profile_image"],
					message: messages.profileImageRequired,
				});
			}

			if (!data.resume) {
				ctx.addIssue({
					code: "custom",
					path: ["resume"],
					message: messages.resumeRequired,
				});
			}

			if (flags.isDobRequired && !data.date_of_birth?.trim()) {
				ctx.addIssue({
					code: "custom",
					path: ["date_of_birth"],
					message: messages.dobRequired,
				});
			}

			if (flags.isGenderRequired && !data.gender?.trim()) {
				ctx.addIssue({
					code: "custom",
					path: ["gender"],
					message: messages.genderRequired,
				});
			}
		});
}

/** Type representing validated job application form values. */
export type JobApplicationFormValues = z.infer<
	ReturnType<typeof createJobApplicationSchema>
>;

const optionalText = (max: number) =>
	z
		.string()
		.trim()
		.max(max)
		.nullish()
		.transform((value) => (value ? value : undefined));

const uploadedFileSchema = z.object({
	filename: z.string().min(1),
	relativepath: z.string().min(1),
	hashname: z.string().min(1),
	size: z.number().nonnegative(),
});

const experienceSchema = z.object({
	start_date: z.string().min(1),
	end_date: z.string().nullable(),
	company_name: z.string().min(1),
	position: z.string().min(1),
	description: z.string(),
});

const educationSchema = z.object({
	start_date: z.string().min(1),
	end_date: z.string().min(1),
	institution_name: z.string().min(1),
	degree: z.string().min(1),
	field_of_study: z.string().min(1),
});

const projectSchema = z.object({
	name: z.string().min(1),
	repo: z.string(),
	public_link: z.string(),
});

/** Server-side schema for career apply API requests (includes Turnstile token). */
export const careerApiSchema = z.object({
	full_name: z.string().trim().min(1).max(100),
	email: z.string().trim().email().max(255),
	job_id: z.number().int().positive(),
	phone: optionalText(30),
	date_of_birth: optionalText(32),
	gender: optionalText(64),
	photo: uploadedFileSchema,
	resume: uploadedFileSchema,
	bio: optionalText(2000),
	cover_letter: optionalText(5000),
	skills: z.array(z.string().trim().min(1)).max(50).optional(),
	experiences: z.array(experienceSchema).default([]),
	educations: z.array(educationSchema).default([]),
	projects: z.array(projectSchema).default([]),
	turnstileToken: z.string().min(1),
});

export type CareerApiBody = z.infer<typeof careerApiSchema>;
