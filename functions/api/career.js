/**
 * Production career apply API for Cloudflare Pages.
 * Mirrors `app/api/career.ts` — Zod validates the body, Turnstile is verified,
 * then the application is forwarded to the backend.
 *
 * Required secrets / vars (Pages → Settings → Variables and Secrets):
 * - TURNSTILE_SECRET_KEY (secret)
 * - BACKEND_URL or NEXT_PUBLIC_BACKEND_URL
 */

import { formatZodError } from "../../lib/schemas/api";
import { careerApiSchema } from "../../lib/schemas/job-application";

const TURNSTILE_VERIFY_URL =
	"https://challenges.cloudflare.com/turnstile/v0/siteverify";

const ALLOWED_HOSTNAMES = [
	"localhost",
	"127.0.0.1",
	"codevider.pages.dev",
	"www.codevider.com",
	"codevider.com",
];

export async function onRequestPost(context) {
	const { request, env } = context;

	let raw;
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

	const secret = env.TURNSTILE_SECRET_KEY;
	if (!secret) {
		return jsonError("TURNSTILE_SECRET_KEY is not configured", 500);
	}

	const remoteIp =
		request.headers.get("cf-connecting-ip") ??
		request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ??
		undefined;

	const verifyResponse = await fetch(TURNSTILE_VERIFY_URL, {
		method: "POST",
		headers: { "Content-Type": "application/json" },
		body: JSON.stringify({
			secret,
			response: turnstileToken,
			...(remoteIp ? { remoteip: remoteIp } : {}),
		}),
	});

	const result = await verifyResponse.json();

	if (!result.success) {
		return jsonError("Turnstile verification failed", 403);
	}

	if (result.hostname && !isAllowedHostname(result.hostname)) {
		return jsonError("Turnstile hostname not allowed", 403);
	}

	const backendBase = (
		env.BACKEND_URL ||
		env.NEXT_PUBLIC_BACKEND_URL ||
		""
	).replace(/\/$/, "");

	if (!backendBase) {
		return jsonError("BACKEND_URL is not configured", 500);
	}

	const backendResponse = await fetch(
		`${backendBase}/landing-page/recruit/candidate/job-application`,
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

function isAllowedHostname(hostname) {
	if (ALLOWED_HOSTNAMES.includes(hostname)) return true;
	return hostname.endsWith(".pages.dev");
}

function jsonError(message, status) {
	return Response.json({ error: message }, { status });
}
