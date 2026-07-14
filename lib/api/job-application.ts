import { getBackendUrl } from "@/lib/api/backend";
import type {
	JobApplicationPayload,
	JobApplicationUploadResponse,
} from "@/lib/types/job-application";

/**
 * Custom error class for job application-related errors.
 * Includes HTTP status code for handling different failure scenarios.
 */
export class JobApplicationError extends Error {
	status: number;

	constructor(message: string, status: number) {
		super(message);
		this.name = "JobApplicationError";
		this.status = status;
	}
}

/**
 * Uploads job application files (profile image and resume) to the backend.
 *
 * @param profileImage - Profile image file
 * @param resume - Resume file
 * @returns Uploaded file metadata
 * @throws JobApplicationError If upload fails
 */
export async function uploadJobApplicationFiles(
	profileImage: File,
	resume: File,
): Promise<JobApplicationUploadResponse> {
	const formData = new FormData();
	formData.append("profile_image", profileImage);
	formData.append("resume", resume);

	const response = await fetch(
		`${getBackendUrl()}/landing-page/recruit/candidate/job-application/upload`,
		{
			method: "POST",
			body: formData,
		},
	);

	if (!response.ok) {
		throw new JobApplicationError("upload_failed", response.status);
	}

	return response.json() as Promise<JobApplicationUploadResponse>;
}

/**
 * Submits a complete job application via `/api/career`.
 * The API route verifies Turnstile and forwards to the backend without the token.
 *
 * @param payload - Full job application payload with uploaded file metadata
 * @param turnstileToken - Cloudflare Turnstile verification token
 * @throws JobApplicationError If submission fails
 */
export async function submitJobApplication(
	payload: JobApplicationPayload,
	turnstileToken: string,
): Promise<void> {
	const response = await fetch("/api/career", {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify({
			...payload,
			turnstileToken,
		}),
	});

	if (!response.ok) {
		throw new JobApplicationError("submit_failed", response.status);
	}
}
