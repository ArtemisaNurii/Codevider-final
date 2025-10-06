'use server'

import {  RESUME_AI, RESUME_AI_UPLOAD } from '@/constants/endpoint'

export interface ActionResponse {
  success: boolean
  message: string
  data?: unknown
}

export interface FileUploadData {
  filename: string
  relativepath: string
  hashname: string
  size: number
}
export interface CandidateExperience {
  start_date: string;
  end_date?: string | null;
  company_name: string;
  position: string;
  description?: string | null;
}

export interface CandidateEducation {
  start_date: string;
  end_date?: string | null;
  institution_name: string;
  degree: string;
  field_of_study?: string | null;
  description?: string | null;
}

export interface CandidateProject {
  name: string;
  description?: string | null;
  repo: string;
  public_link?: string | null;
}
export interface CandidateData {
  name?: string
  email?: string
  phone?: string
  date_of_birth?: string
  gender?: "male" | "female" | "other" | "prefer_not_to_say"
  location?: string
  experience_years?: number
  skills?: string[]
  education?: string
  summary?: string
  cover_letter?: string
  experiences?: CandidateExperience[] | null;
  educations?: CandidateEducation[] | null;
  projects?: CandidateProject[] | null;
}

export async function uploadFileAction(fileFormData: FormData): Promise<ActionResponse> {
  const baseUrl = process.env.BACKEND_API_URL
  if (!baseUrl) {
    return { success: false, message: "BACKEND_API_URL not set" }
  }
  try {
    const apiEndpoint = `${baseUrl}/${RESUME_AI_UPLOAD}`
    const response = await fetch(apiEndpoint, { method: 'POST', body: fileFormData })
    const responseData = await response.json()
    if (response.ok) {
      let fileMetadata: FileUploadData
      if (responseData.filename && responseData.relativepath && responseData.hashname) {
        fileMetadata = responseData as FileUploadData
      } else if (responseData.file && typeof responseData.file === 'object') {
        fileMetadata = responseData.file as FileUploadData
      } else {
        fileMetadata = {
          filename: "resume.pdf",
          relativepath: "/upload/resume.pdf",
          hashname: "resume_" + Date.now(),
          size: 0
        }
      }
      const candidateData: CandidateData = extractCandidateData(responseData)
      return {
        success: true,
        message: 'File uploaded and resume processed successfully.',
        data: { fileMetadata, candidateData }
      }
    } else {
      return { success: false, message: responseData.message || "File upload failed" }
    }
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Unknown error'
    return { success: false, message: `Network error: ${errorMessage}` }
  }
}
function extractCandidateData(responseData: Record<string, unknown>): CandidateData {
  const candidateData: CandidateData = {}

  // Top-level flat keys (your backend case)
  if (typeof responseData.full_name === 'string') candidateData.name = responseData.full_name
  if (typeof responseData.email === 'string') candidateData.email = responseData.email
  if (typeof responseData.phone === 'string') candidateData.phone = responseData.phone
  if (typeof responseData.date_of_birth === 'string') candidateData.date_of_birth = responseData.date_of_birth
  if (typeof responseData.gender === 'string') candidateData.gender = responseData.gender as "male" | "female" | "other" | "prefer_not_to_say"
  if (typeof responseData.bio === 'string') candidateData.summary = responseData.bio
  if (typeof responseData.cover_letter === 'string') candidateData.cover_letter = responseData.cover_letter

  if (Array.isArray(responseData.skills)) {
    candidateData.skills = responseData.skills.filter((s: string) => typeof s === 'string')
  }
   if (Array.isArray(responseData.experiences)) {
     candidateData.experiences = responseData.experiences.map((exp: CandidateExperience) => ({
       start_date: exp.start_date || '',
       end_date: exp.end_date || null,
       company_name: exp.company_name || '',
       position: exp.position || '',
       description: exp.description || null
     }))
   }
  if (Array.isArray(responseData.educations)) {
    candidateData.educations = responseData.educations.map((edu: CandidateEducation) => ({
      start_date: edu.start_date || '',
      end_date: edu.end_date || null,
      institution_name: edu.institution_name || '',
      degree: edu.degree || '',
      field_of_study: edu.field_of_study || null,
      description: edu.description || null
    }))
  }
  if (Array.isArray(responseData.projects)) {
    candidateData.projects = responseData.projects.map((proj: CandidateProject) => ({
      name: proj.name || '',
      description: proj.description || null,
      repo: proj.repo || '',
      public_link: proj.public_link || null
    }))
  }

   // Fallback: nested `candidate` object (old shape)
   const candidate = responseData.candidate as Record<string, unknown> | undefined
   if (candidate && typeof candidate === 'object') {
     if (!candidateData.name && typeof candidate.full_name === 'string') candidateData.name = candidate.full_name
     if (!candidateData.email && typeof candidate.email === 'string') candidateData.email = candidate.email
     if (!candidateData.phone && typeof candidate.phone === 'string') candidateData.phone = candidate.phone
     if (!candidateData.summary && typeof candidate.summary === 'string') candidateData.summary = candidate.summary
     if (!candidateData.skills && Array.isArray(candidate.skills)) {
       candidateData.skills = candidate.skills.filter((s: unknown) => typeof s === 'string') as string[]
     }
   }

  return candidateData
}

export async function submitApplicationAction(applicationData: object): Promise<ActionResponse> {
  console.log('Server action: submitApplicationAction called with data', JSON.stringify(applicationData))
  const baseUrl = process.env.BACKEND_API_URL
  if (!baseUrl) {
    console.error('Server action: BACKEND_API_URL not set')
    return { success: false, message: "BACKEND_API_URL not set" }
  }
  try {
    const apiEndpoint = `${baseUrl}/${RESUME_AI}`
    console.log('Server action: Submitting to endpoint', apiEndpoint)
    
    // Add timeout to prevent hanging requests
    const controller = new AbortController()
    const timeoutId = setTimeout(() => controller.abort(), 30000) // 30 second timeout
    
    const response = await fetch(apiEndpoint, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(applicationData),
      signal: controller.signal
    })
    
    clearTimeout(timeoutId) // Clear the timeout since request completed
    
    console.log('Server action: Response status:', response.status)
    const responseData = await response.json()
    console.log('Server action: Response data:', JSON.stringify(responseData))
    
    if (response.ok) {
      return { success: true, message: 'Application submitted successfully!', data: responseData }
    } else {
      return { success: false, message: responseData.message || "Application submission failed" }
    }
  } catch (error) {
    console.error('Server action: Error during submission:', error)
    const errorMessage = error instanceof Error ? error.message : 'Unknown error'
    if (errorMessage === 'The operation was aborted' || errorMessage.includes('abort')) {
      return { success: false, message: 'Request timed out. Please try again.' }
    }
    return { success: false, message: `Network error: ${errorMessage}` }
  }
}
