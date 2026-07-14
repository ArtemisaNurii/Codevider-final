import { getBackendUrl } from "@/lib/api/backend";
import { formatZodError } from "@/lib/schemas/api";
import { careerApiSchema } from "@/lib/schemas/job-application";
import { TurnstileVerifyError, verifyTurnstileToken } from "@/lib/turnstile";

/**
 * Verifies Turnstile, then forwards the job application to the Nest backend
 * without the turnstile token.
 */
export async function POST(request: Request): Promise<Response> {
	let raw: unknown;

	try {
		raw = await request.json();
	} catch {
		return jsonError("Invalid JSON body", 400);
	}

	const parsed = careerApiSchema.safeParse(raw);
	if (!parsed.success) {
		return jsonError(formatZodError(parsed.error), 400);
	}

	const { turnstileToken, ...application } = parsed.data;

	const remoteIp =
		request.headers.get("cf-connecting-ip") ??
		request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ??
		undefined;

	try {
		await verifyTurnstileToken(turnstileToken, remoteIp);
	} catch (error) {
		if (error instanceof TurnstileVerifyError) {
			return jsonError(error.message, error.status);
		}

		if (
			error instanceof Error &&
			error.message === "TURNSTILE_SECRET_KEY is not configured"
		) {
			return jsonError("Turnstile is not configured", 500);
		}

		return jsonError("Turnstile verification failed", 403);
	}

	const backendResponse = await fetch(
		`${getBackendUrl()}/landing-page/recruit/candidate/job-application`,
		{
			method: "POST",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify(application),
		},
	);

	if (!backendResponse.ok) {
		return jsonError(
			`Job application submission failed (${backendResponse.status})`,
			backendResponse.status >= 400 && backendResponse.status < 600
				? backendResponse.status
				: 502,
		);
	}

	return Response.json({ ok: true }, { status: 200 });
}

function jsonError(message: string, status: number): Response {
	return Response.json({ error: message }, { status });
}
