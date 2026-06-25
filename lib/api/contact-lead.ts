import { getBackendUrl } from "@/lib/api/backend";
import type { ContactFormValues } from "@/lib/schemas/contact";

/**
 * Submits a contact form lead to the backend API.
 *
 * @param data - Validated contact form values
 * @param turnstileToken - Cloudflare Turnstile verification token
 * @throws If submission fails
 */
export async function submitContactLead(
	data: ContactFormValues,
	turnstileToken: string,
): Promise<void> {
	const response = await fetch(
		`${getBackendUrl()}/landing-page/leads/contact`,
		{
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
		},
	);

	if (!response.ok) {
		throw new Error(`Contact lead submission failed (${response.status})`);
	}
}
