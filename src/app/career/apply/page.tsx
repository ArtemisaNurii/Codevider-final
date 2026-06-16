"use client"

import { useState, useEffect, Suspense } from "react"
import { useSearchParams, useRouter } from "next/navigation"
import { getJobs } from "../action"
import JobApplicationPage from "../form"
import { Footer } from "@/app/components/CTA"
import { Job } from "../jobs"

function ApplyContent() {
  const searchParams = useSearchParams()
  const jobIdStr = searchParams.get("jobId")
  const router = useRouter()

  const [job, setJob] = useState<Job | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (!jobIdStr) {
      setError("No job specified.")
      setIsLoading(false)
      return
    }

    const jobId = parseInt(jobIdStr, 10)
    if (isNaN(jobId)) {
      setError("Invalid job ID.")
      setIsLoading(false)
      return
    }

    let active = true
    setIsLoading(true)
    setError(null)

    getJobs()
      .then((res) => {
        if (!active) return
        const jobsList: Job[] = Array.isArray(res) ? res : res.jobs
        const foundJob = jobsList.find((j) => j.id === jobId)
        if (foundJob) {
          setJob(foundJob)
        } else {
          setError("Job position not found.")
        }
        setIsLoading(false)
      })
      .catch((err) => {
        if (!active) return
        console.error("Error fetching job details:", err)
        setError("Failed to load job details. Please try again.")
        setIsLoading(false)
      })

    return () => {
      active = false
    }
  }, [jobIdStr])

  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-white">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-slate-900 mb-4"></div>
        <p className="text-gray-600 font-medium">Loading position details...</p>
      </div>
    )
  }

  if (error || !job) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 px-4">
        <div className="text-center max-w-md bg-white p-8 rounded-lg shadow-sm border">
          <h2 className="text-2xl font-bold text-red-600 mb-4">Position Not Found</h2>
          <p className="text-gray-600 mb-6">{error || "The requested job position could not be found or has been closed."}</p>
          <button
            onClick={() => router.push("/career")}
            className="w-full bg-slate-900 text-white font-semibold py-3 px-6 rounded-md hover:bg-slate-800 transition"
          >
            Back to Careers
          </button>
        </div>
      </div>
    )
  }

  return (
    <>
      <JobApplicationPage job={job} />
      <Footer />
    </>
  )
}

export default function ApplyPage() {
  return (
    <Suspense fallback={
      <div className="flex flex-col items-center justify-center min-h-screen bg-white">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-slate-900 mb-4"></div>
        <p className="text-gray-600 font-medium">Loading...</p>
      </div>
    }>
      <ApplyContent />
    </Suspense>
  )
}
