import { getBackendUrl } from "@/lib/api/backend";
import type {
	JobDetail,
	OpenJobsQuery,
	OpenJobsResponse,
} from "@/lib/types/recruit";

export async function fetchOpenJobs(
	query: OpenJobsQuery = {},
): Promise<OpenJobsResponse> {
	const params = new URLSearchParams();

	if (query.page !== undefined) {
		params.set("page", String(query.page));
	}

	if (query.limit !== undefined) {
		params.set("limit", String(query.limit));
	}

	const search = params.toString();
	const response = await fetch(
		`${getBackendUrl()}/landing-page/recruit/jobs/open${search ? `?${search}` : ""}`,
	);

	if (!response.ok) {
		throw new Error(`Failed to fetch open jobs (${response.status})`);
	}

	return response.json() as Promise<OpenJobsResponse>;
}

export async function fetchJobById(id: number): Promise<JobDetail> {
	const response = await fetch(
		`${getBackendUrl()}/landing-page/recruit/jobs/${id}`,
	);

	if (!response.ok) {
		throw new Error(`Failed to fetch job (${response.status})`);
	}

	return response.json() as Promise<JobDetail>;
}
