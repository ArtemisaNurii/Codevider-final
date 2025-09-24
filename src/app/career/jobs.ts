export interface JobAddress {
  id: number;
  created_at: string;
  updated_at: string;
  job_id: number;
  address_id: number;
  address: {
    id: number;
    deletedAt: string | null;
    createdBy: string | null;
    updatedBy: string | null;
    deletedBy: string | null;
    version: number;
    createdAt: string;
    updatedAt: string;
    location: string;
    address: string;
    is_default: boolean;
    tax_number: string | null;
    tax_name: string | null;
  };
}

export interface Department {
  id: number;
  created_at: string;
  updated_at: string;
  name: string;
  parent_id: number | null;
}

export interface JobType {
  id: number;
  created_at: string;
  updated_at: string;
  job_type: string;
}

export interface Job {
  id: number;
  created_at: string;
  updated_at: string;
  deleted_at: string | null;
  title: string;
  slug: string;
  job_description: string;
  total_positions: number;
  remaining_openings: number;
  department_id: number;
  job_type_id: number;
  pay_according_to: string;
  pay_type: string;
  start_amount: number;
  end_amount: number | null;
  start_date: string;
  end_date: string;
  status: boolean;
  meta_details: string;
  is_photo_required: boolean;
  is_resume_required: boolean;
  is_dob_required: boolean;
  is_gender_required: boolean;
  addresses: JobAddress[];
  department: Department;
  job_type: JobType;
  resume?: File;
}

export interface JobsMeta {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
  hasNextPage: boolean;
  hasPreviousPage: boolean;
}

export interface JobsResponse {
  data: Job[];
  meta: JobsMeta;
}
export interface WebsiteApplication {
  job_id: number;
  full_name: string;
  email: string;
  phone: string;
  gender?: "male" | "female" | "other" | "prefer_not_to_say";
  location_id: number;
  photo?: File;
  date_of_birth?: string;
  recruit_candidate_id?: number;
  cover_letter?: string;
  resume?: File;
}