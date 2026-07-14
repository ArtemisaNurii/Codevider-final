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
