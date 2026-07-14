const TURNSTILE_VERIFY_URL =
	"https://challenges.cloudflare.com/turnstile/v0/siteverify";

const ALLOWED_HOSTNAMES = [
	"localhost",
	"127.0.0.1",
	"codevider.pages.dev",
	"www.codevider.com",
	"codevider.com",
] as const;

type TurnstileVerifyResponse = {
	success: boolean;
	hostname?: string;
	"error-codes"?: string[];
};

/**
 * Gets the Cloudflare Turnstile site key from environment variables.
 *
 * @returns Turnstile site key
 * @throws If NEXT_PUBLIC_TURNSTILE_SITE_KEY is not set
 */
export function getTurnstileSiteKey(): string {
	const siteKey = process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY;

	if (!siteKey) {
		throw new Error("NEXT_PUBLIC_TURNSTILE_SITE_KEY is not configured");
	}

	return siteKey;
}

/**
 * Verifies a Cloudflare Turnstile token with the siteverify API.
 *
 * @param token - Turnstile response token from the widget
 * @param remoteIp - Optional client IP for additional validation
 * @throws If the secret is missing, the token is missing, or verification fails
 */
export async function verifyTurnstileToken(
	token: string,
	remoteIp?: string,
): Promise<void> {
	const secret = process.env.TURNSTILE_SECRET_KEY;

	if (!secret) {
		throw new Error("TURNSTILE_SECRET_KEY is not configured");
	}

	if (!token) {
		throw new TurnstileVerifyError("Missing turnstile token", 400);
	}

	const response = await fetch(TURNSTILE_VERIFY_URL, {
		method: "POST",
		headers: { "Content-Type": "application/json" },
		body: JSON.stringify({
			secret,
			response: token,
			...(remoteIp ? { remoteip: remoteIp } : {}),
		}),
	});

	const result = (await response.json()) as TurnstileVerifyResponse;

	if (!result.success) {
		throw new TurnstileVerifyError("Turnstile verification failed", 403);
	}

	if (result.hostname && !isAllowedHostname(result.hostname)) {
		throw new TurnstileVerifyError("Turnstile hostname not allowed", 403);
	}
}

function isAllowedHostname(hostname: string): boolean {
	if (
		ALLOWED_HOSTNAMES.includes(hostname as (typeof ALLOWED_HOSTNAMES)[number])
	) {
		return true;
	}

	// Preview deployments: <hash>.codevider.pages.dev
	return hostname.endsWith(".pages.dev");
}

export class TurnstileVerifyError extends Error {
	readonly status: number;

	constructor(message: string, status: number) {
		super(message);
		this.name = "TurnstileVerifyError";
		this.status = status;
	}
}
