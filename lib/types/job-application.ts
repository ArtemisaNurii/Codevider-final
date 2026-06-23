export type UploadedFile = {
	filename: string;
	relativepath: string;
	hashname: string;
	size: number;
};

export type JobApplicationUploadResponse = {
	profile_image: UploadedFile;
	resume: UploadedFile;
};

export type JobApplicationExperience = {
	start_date: string;
	end_date: string | null;
	company_name: string;
	position: string;
	description: string;
};

export type JobApplicationEducation = {
	start_date: string;
	end_date: string;
	institution_name: string;
	degree: string;
	field_of_study: string;
};

export type JobApplicationProject = {
	name: string;
	repo: string;
	public_link: string;
};

export type JobApplicationPayload = {
	full_name: string;
	email: string;
	job_id: number;
	phone?: string;
	date_of_birth?: string;
	gender?: string;
	photo: UploadedFile;
	resume: UploadedFile;
	bio?: string;
	cover_letter?: string;
	skills?: string[];
	experiences: JobApplicationExperience[];
	educations: JobApplicationEducation[];
	projects: JobApplicationProject[];
};
