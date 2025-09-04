"use server"

import { RECRUIT_JOBS_ENDPOINT } from "@/constants/endpoint"


export async function getJobs() {
  try {
    const baseUrl = process.env.API_URL
    if (!baseUrl) {
      throw new Error("❌ API_URL is not defined in .env.local")
    }

    const res = await fetch(`${baseUrl}/${RECRUIT_JOBS_ENDPOINT}`, {
      method: "GET",
      cache: "no-store",
    })

    if (!res.ok) {
      throw new Error(`Failed to fetch jobs: ${res.status}`)
    }

    return await res.json()
  } catch (error) {
    console.error("Error fetching jobs:", error)
    return []
  }
}
