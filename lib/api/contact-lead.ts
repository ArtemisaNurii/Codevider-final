import { getBackendUrl } from "@/lib/api/backend";
import type { ContactFormValues } from "@/lib/schemas/contact";

/**
 * Submits a contact form lead directly to the Nest backend.
 * Validation is handled client-side with Zod + react-hook-form.
 *
 * @param data - Validated contact form values
 * @throws If submission fails
 */
export async function submitContactLead(data: ContactFormValues): Promise<void> {
	const response = await fetch(`${getBackendUrl()}/landing-page/leads/contact`, {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify({
			name: data.name,
			email: data.email,
			details: data.details,
		}),
	});

	if (!response.ok) {
		throw new Error(`Contact lead submission failed (${response.status})`);
	}
}
