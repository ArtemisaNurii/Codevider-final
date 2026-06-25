import { getBackendUrl } from "@/lib/api/backend";
import type {
	JobDetail,
	OpenJobsQuery,
	OpenJobsResponse,
} from "@/lib/types/recruit";

/**
 * Fetches open job positions from the backend API.
 *
 * @param query - Pagination query parameters
 * @returns Paginated open jobs response
 * @throws If request fails
 */
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

/**
 * Fetches a single job detail by ID from the backend API.
 *
 * @param id - Job ID
 * @returns Job detail
 * @throws If request fails
 */
export async function fetchJobById(id: number): Promise<JobDetail> {
	const response = await fetch(
		`${getBackendUrl()}/landing-page/recruit/jobs/${id}`,
	);

	if (!response.ok) {
		throw new Error(`Failed to fetch job (${response.status})`);
	}

	return response.json() as Promise<JobDetail>;
}
