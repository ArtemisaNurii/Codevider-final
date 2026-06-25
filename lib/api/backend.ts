/**
 * Gets the backend API URL from environment variables.
 *
 * @returns Backend URL without trailing slash
 * @throws If NEXT_PUBLIC_BACKEND_URL is not set
 */
export function getBackendUrl(): string {
	const url = process.env.NEXT_PUBLIC_BACKEND_URL;

	if (!url) {
		throw new Error("NEXT_PUBLIC_BACKEND_URL is not configured");
	}

	return url.replace(/\/$/, "");
}
