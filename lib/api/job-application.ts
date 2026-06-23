import { getBackendUrl } from "@/lib/api/backend";
import type {
	JobApplicationPayload,
	JobApplicationUploadResponse,
} from "@/lib/types/job-application";

export class JobApplicationError extends Error {
	status: number;

	constructor(message: string, status: number) {
		super(message);
		this.name = "JobApplicationError";
		this.status = status;
	}
}

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

export async function submitJobApplication(
	payload: JobApplicationPayload,
	turnstileToken: string,
): Promise<void> {
	const response = await fetch(
		`${getBackendUrl()}/landing-page/recruit/candidate/job-application`,
		{
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({
				...payload,
				turnstileToken,
			}),
		},
	);

	if (!response.ok) {
		throw new JobApplicationError("submit_failed", response.status);
	}
}
