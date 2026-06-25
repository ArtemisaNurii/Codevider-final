/** Type representing a job department. */
export type JobDepartment = {
	id: number;
	name: string;
	parent_id: number | null;
};

/** Type representing a job type (e.g., full-time, part-time). */
export type JobType = {
	id: number;
	job_type: string;
	created_at?: string;
	updated_at?: string;
};

/** Type representing an open job position for the public listing. */
export type OpenJob = {
	id: number;
	title: string;
	slug: string;
	job_description: string | null;
	total_positions: number;
	remaining_openings: number;
	pay_according_to: string;
	pay_type: string;
	start_amount: number | null;
	end_amount: number | null;
	start_date: string;
	end_date: string;
	status: boolean;
	is_photo_required: boolean;
	is_resume_required: boolean;
	is_dob_required: boolean;
	is_gender_required: boolean;
	department: JobDepartment;
	job_type: JobType;
};

/** Metadata for a paginated API response. */
export type PaginatedMeta = {
	page: number;
	limit: number;
	total: number;
	totalPages: number;
	hasNextPage: boolean;
	hasPreviousPage: boolean;
};

/** Response type for open jobs API endpoint. */
export type OpenJobsResponse = {
	data: OpenJob[];
	meta: PaginatedMeta;
};

/** Query parameters for open jobs API endpoint. */
export type OpenJobsQuery = {
	page?: number;
	limit?: number;
};

/** Parsed meta details for a job (title/description overrides). */
export type JobMetaDetails = {
	title?: string;
	description?: string;
};

/**
 * Safely parses a JSON string into JobMetaDetails.
 *
 * @param raw - Raw JSON string
 * @returns Parsed JobMetaDetails object or empty object on failure
 */
export function parseJobMetaDetails(raw: string): JobMetaDetails {
	try {
		const parsed = JSON.parse(raw) as JobMetaDetails;

		if (typeof parsed !== "object" || parsed === null) {
			return {};
		}

		return parsed;
	} catch {
		return {};
	}
}

/** Type representing a detailed job record from the API. */
export type JobDetail = {
	id: number;
	created_at: string;
	updated_at: string;
	deleted_at: string | null;
	version: number;
	added_by: number | null;
	updated_by: number | null;
	deleted_by: number | null;
	title: string;
	slug: string;
	job_description: string | null;
	total_positions: number;
	remaining_openings: number;
	department_id: number;
	job_type_id: number;
	pay_according_to: string;
	pay_type: string;
	start_amount: number | null;
	end_amount: number | null;
	start_date: string;
	end_date: string;
	status: boolean;
	meta_details: string;
	is_photo_required: boolean;
	is_resume_required: boolean;
	is_dob_required: boolean;
	is_gender_required: boolean;
	department?: JobDepartment;
	job_type?: JobType;
};
