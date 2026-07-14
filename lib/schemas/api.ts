import type { z } from "zod";

/**
 * Formats the first Zod issue into a concise API error message.
 */
export function formatZodError(error: z.ZodError): string {
	const issue = error.issues[0];
	if (!issue) return "Invalid request body";

	const path = issue.path.length > 0 ? issue.path.join(".") : "body";
	return `${path}: ${issue.message}`;
}
