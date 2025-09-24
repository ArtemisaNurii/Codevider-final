'use server'

import { APPLY_JOB_ENDPOINT, UPLOAD_FILE } from '@/constants/endpoint'

// Interface for the response from this server action
export interface ActionResponse {
  success: boolean
  message: string
  data?: unknown // Can hold response data from the API
}

// Interface for the expected file metadata from the UPLOAD_FILE endpoint
interface FileUploadData {
  filename: string
  relativepath: string
  hashname: string
  size: number
}

/**
 * ACTION 1: Uploads a single file to the dedicated file upload endpoint.
 * @param fileFormData FormData containing just the file to upload.
 * @returns A promise that resolves with the file metadata on success.
 */
export async function uploadFileAction(fileFormData: FormData): Promise<ActionResponse> {
  const baseUrl = process.env.BACKEND_API_URL
  if (!baseUrl) {
    return { success: false, message: "Server configuration error: BACKEND_API_URL is not defined. Please set it in your .env.local file." }
  }

  try {
    const apiEndpoint = `${baseUrl}/${UPLOAD_FILE}`
    console.log(`[File Upload] Uploading to: ${apiEndpoint}`)

    const response = await fetch(apiEndpoint, {
      method: 'POST',
      body: fileFormData,
    })

    const responseData = await response.json()

    if (response.ok) {
      console.log("[File Upload] Success:", responseData);
      return {
        success: true,
        message: 'File uploaded successfully.',
        data: responseData as FileUploadData, // The backend should return the metadata object
      }
    } else {
      console.error('[File Upload] Backend Error:', responseData)
      return {
        success: false,
        message: responseData.message || `File upload failed. HTTP ${response.status}: ${response.statusText}`,
      }
    }
  } catch (error) {
    console.error('[File Upload] Exception:', error)
    const errorMessage = error instanceof Error ? error.message : 'Unknown error'
    return { 
      success: false, 
      message: `Network error during file upload: ${errorMessage}. Please check if the backend server is running.` 
    }
  }
}

/**
 * ACTION 2: Submits the final job application as a JSON payload.
 * @param applicationData The complete application object, including file metadata.
 * @returns A promise that resolves with the final submission status.
 */
export async function submitApplicationAction(applicationData: object): Promise<ActionResponse> {
  const baseUrl = process.env.BACKEND_API_URL
  if (!baseUrl) {
    return { success: false, message: "Server configuration error: BACKEND_API_URL is not defined. Please set it in your .env.local file." }
  }
  
  try {
    const apiEndpoint = `${baseUrl}/${APPLY_JOB_ENDPOINT}`
    console.log(`[Application Submit] Submitting JSON to: ${apiEndpoint}`)
    console.log(`[Application Submit] Payload:`, JSON.stringify(applicationData, null, 2))


    const response = await fetch(apiEndpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(applicationData),
    })

    const responseData = await response.json()

    if (response.ok) {
      return {
        success: true,
        message: 'Application submitted successfully! We\'ll be in touch soon.',
        data: responseData,
      }
    } else {
      console.error('[Application Submit] Backend Error:', responseData)
      return {
        success: false,
        message: responseData.message || `Application submission failed. HTTP ${response.status}: ${response.statusText}`,
      }
    }
  } catch (error) {
    console.error('[Application Submit] Exception:', error)
    const errorMessage = error instanceof Error ? error.message : 'Unknown error'
    return { 
      success: false, 
      message: `Network error during application submission: ${errorMessage}. Please check if the backend server is running.` 
    }
  }
}