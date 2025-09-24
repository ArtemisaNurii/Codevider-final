// jobs.ts (or types.ts)

export interface Root {
    data: Job[];
    meta: Meta;
  }
  
  export interface Job {
    id: number;
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
    end_amount?: number; // Optional, as seen in your usage
    start_date: string;
    end_date: string;
    status: boolean;
    meta_details: string;
    is_photo_required: boolean;
    is_resume_required: boolean;
    is_dob_required: boolean;
    is_gender_required: boolean;
    addresses: Address[];
    department: Department;
    job_type: JobType;
  }
  
  export interface Address {
    id: number;
    created_at: string;
    updated_at: string;
    job_id: number;
    address_id: number;
    address: AddressDetail; // Note: 'address' here is an object of type AddressDetail
  }
  
  export interface AddressDetail {
    id: number;
    version: number;
    createdAt: string;
    updatedAt: string;
    location: string;
    address: string; // Note: 'address' here is a string, representing the actual address line
    is_default: boolean;
    tax_number: number;
    tax_name: string;
  }
  
  export interface Department {
    id: number;
    created_at: string;
    updated_at: string;
    name: string;
    parent_id: number;
  }
  
  export interface JobType {
    id: number;
    created_at: string;
    updated_at: string;
    job_type: string;
  }
  
  export interface Meta {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
    hasNextPage: boolean;
    hasPreviousPage: boolean;
  }
  
  // Interface for the response structure expected from getJobs function
  export interface GetJobsResponse {
    jobs: Job[];
    pagination: {
      currentPage: number;
      totalPages: number;
      totalCount: number;
      limit: number;
      hasNext: boolean;
      hasPrev: boolean;
    };
  }