import type { ContactFormValues } from "@/lib/schemas/contact";

/**
 * Submits a contact form lead via `/api/contact`.
 * The API route verifies Turnstile and forwards to the backend without the token.
 *
 * @param data - Validated contact form values
 * @param turnstileToken - Cloudflare Turnstile verification token
 * @throws If submission fails
 */
export async function submitContactLead(
	data: ContactFormValues,
	turnstileToken: string,
): Promise<void> {
	const response = await fetch("/api/contact", {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify({
			name: data.name,
			email: data.email,
			details: data.details,
			turnstileToken,
		}),
	});

	if (!response.ok) {
		throw new Error(`Contact lead submission failed (${response.status})`);
	}
}
