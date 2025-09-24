"use server"

import { RECRUIT_JOBS_ENDPOINT } from "@/constants/endpoint"
import { Job } from "./jobs"

interface PaginationParams {
  page?: number
  limit?: number
  offset?: number
  useOffset?: boolean
}

interface JobsResponse {
  jobs: Job[]
  pagination: {
    currentPage: number
    totalPages: number
    totalCount: number
    limit: number
    hasNext: boolean
    hasPrev: boolean
  }
}

export async function getJobs(params: PaginationParams = {}): Promise<JobsResponse> {
  const baseUrl = process.env.BACKEND_API_URL
  if (!baseUrl) {
    throw new Error("❌ BACKEND_API_URL is not defined in .env.local")
  }

  // Defaults
  const page = params.page ?? 1
  const limit = params.limit ?? 10

  // Build URL (send page & limit by default)
  const url = new URL(`${baseUrl}/${RECRUIT_JOBS_ENDPOINT}`)
  url.searchParams.set("page", String(page))
  url.searchParams.set("limit", String(limit))

  // Only send offset if explicitly requested
  if (params.useOffset) {
    const offset = params.offset ?? (page - 1) * limit
    url.searchParams.set("offset", String(offset))
  }

  try {
    const res = await fetch(url.toString(), {
      method: "GET",
      headers: { Accept: "application/json" },
      cache: "no-store",
    })

    if (!res.ok) {
      // Try to read server message for diagnostics
      let serverMsg = ""
      try {
        const text = await res.text()
        serverMsg = text
        try {
          const asJson = JSON.parse(text)
          serverMsg = JSON.stringify(asJson)
        } catch {
          /* keep raw text */
        }
      } catch {
        /* ignore */
      }

      console.error(
        `❌ Jobs request failed: HTTP ${res.status} ${res.statusText}. URL=${url.toString()} Body=${serverMsg}`
      )

      // Graceful fallback for 4xx/5xx
      return {
        jobs: [],
        pagination: {
          currentPage: page,
          totalPages: 0,
          totalCount: 0,
          limit,
          hasNext: false,
          hasPrev: false,
        },
      }
    }

    const json = await res.json()

    // Handle different API response formats
    if (json.data && Array.isArray(json.data)) {
      // Format: { data: Job[], meta: Meta }
      const jobs = json.data
      const meta = json.meta || {}
      
      return {
        jobs,
        pagination: {
          currentPage: meta.page || page,
          totalPages: meta.totalPages || Math.ceil((meta.total || 0) / limit),
          totalCount: meta.total || 0,
          limit: meta.limit || limit,
          hasNext: meta.hasNextPage || false,
          hasPrev: meta.hasPreviousPage || false,
        },
      }
    } else if (Array.isArray(json)) {
      // Simple array format
      return {
        jobs: json,
        pagination: {
          currentPage: page,
          totalPages: 1,
          totalCount: json.length,
          limit,
          hasNext: false,
          hasPrev: false,
        },
      }
    } else {
      // Unknown format
      console.warn("Unexpected API response format:", json)
      return {
        jobs: [],
        pagination: {
          currentPage: page,
          totalPages: 0,
          totalCount: 0,
          limit,
          hasNext: false,
          hasPrev: false,
        },
      }
    }
  } catch (error) {
    console.error("Error fetching jobs:", error)
    return {
      jobs: [],
      pagination: {
        currentPage: page,
        totalPages: 0,
        totalCount: 0,
        limit,
        hasNext: false,
        hasPrev: false,
      },
    }
  }
}
