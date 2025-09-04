// app/api/jobs/route.ts
import { NextResponse } from "next/server";

export interface Job {
  id: number
  created_at: string
  updated_at: string
  deleted_at: string | null
  title: string
  slug: string | null
  job_description: string
  total_positions: number
  department_id: number
  location_id: number
  recruiter_id: number
  job_type: string
  work_experience_id: number
  pay_type: string
  start_amount: number
  end_amount: number | null
  pay_according: string
  start_date: string
  end_date: string
  status: boolean
  meta_title: string
  meta_description: string | null
  is_photo_require: boolean
  is_resume_require: boolean
  is_dob_require: boolean
  is_gender_require: boolean
  remaining_openings: number
  job_type_id: number
  qualifications?: string
  experience?: string
  salary?: string
  
}


export enum ApplicationSourceEnum {
  careerWebsite = 'careerWebsite',
  addedByUser = 'addedByUser',
}

export interface JobApplication {
  full_name: string
  email: string
  phone: string
  resume?: File[]
  application_sources: ApplicationSourceEnum
  date_of_birth: string
  gender: string
  photo?: File[]
  cover_letter: string
  column_priority?: number
  source_id: number
  status_id: number
  job_id: number
  location_id: number
}
