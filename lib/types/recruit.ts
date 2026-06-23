export type JobDepartment = {
	id: number;
	name: string;
	parent_id: number | null;
};

export type JobType = {
	id: number;
	job_type: string;
	created_at?: string;
	updated_at?: string;
};

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

export type PaginatedMeta = {
	page: number;
	limit: number;
	total: number;
	totalPages: number;
	hasNextPage: boolean;
	hasPreviousPage: boolean;
};

export type OpenJobsResponse = {
	data: OpenJob[];
	meta: PaginatedMeta;
};

export type OpenJobsQuery = {
	page?: number;
	limit?: number;
};

export type JobMetaDetails = {
	title?: string;
	description?: string;
};

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
