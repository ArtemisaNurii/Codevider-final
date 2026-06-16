"use client"

import { useState, useEffect } from "react"
import { useSearchParams } from "next/navigation"
import { Button } from "@/components/ui/button"
import { getJobs } from "./action"
import JobCard from "./JobCard"
import PaginationControls from "./PaginationControls"
import { Job } from "./jobs"
import HiringProcess from "./hiringProcess"

export default function JobsListing() {
  const searchParams = useSearchParams()
  const page = Number(searchParams.get("page")) || 1
  const limit = Number(searchParams.get("limit")) || 10

  const [jobs, setJobs] = useState<Job[]>([])
  const [pagination, setPagination] = useState({
    currentPage: page,
    totalPages: 0,
    totalCount: 0,
    limit: limit,
    hasNext: false,
    hasPrev: false,
  })
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    let active = true
    setIsLoading(true)
    setError(null)
    
    getJobs({ page, limit })
      .then((res) => {
        if (!active) return
        setJobs(res.jobs)
        setPagination({
          currentPage: res.pagination.currentPage,
          totalPages: res.pagination.totalPages,
          totalCount: res.pagination.totalCount,
          limit: res.pagination.limit,
          hasNext: res.pagination.hasNext,
          hasPrev: res.pagination.hasPrev,
        })
        setIsLoading(false)
      })
      .catch((err) => {
        if (!active) return
        console.error("Error in JobsListing fetch:", err)
        setError("Failed to load job openings. Please try again.")
        setIsLoading(false)
      })

    return () => {
      active = false
    }
  }, [page, limit])

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-slate-900"></div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="max-w-4xl mx-auto py-24 text-center">
        <h2 className="text-2xl font-bold text-red-600 mb-4">{error}</h2>
        <Button onClick={() => window.location.reload()} className="bg-slate-900 text-white">
          Retry
        </Button>
      </div>
    )
  }

  // --- THIS IS THE STATE FOR "NO JOBS" ---
  if (!jobs || jobs.length === 0) {
    if (pagination.totalCount === 0) {
      return (
        <>
          <header className="border-b text-white bg-gradient-to-br from-black via-slate-900 to-sky-800 border-slate-200">
            <div className="mx-auto sm:pt-32 pt-32 max-w-7xl px-6 py-20 md:py-24 text-start">
              <p className="text-sm font-semibold uppercase tracking-widest text-sky-300">
                Careers
              </p>
              <h1 className="mt-4 text-4xl font-bold tracking-tight md:text-5xl">
                Join Our Team
              </h1>
              <p className="mt-4 mx-auto text-lg leading-relaxed text-gray-300">
                We&apos;re always looking for talented individuals to join our growing team. 
                Explore opportunities to work on cutting-edge projects and make a meaningful impact.
              </p>
            </div>
          </header>

          <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-start">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              No Open Positions at the Moment
            </h2>
            <p className="text-lg text-start text-gray-600 mb-8 mx-auto">
              We may not have active openings right now, but we&apos;re always eager to connect with talented professionals.
              <br/> Feel free to send us your resume for future consideration.
            </p>
            <Button
              asChild
              size="lg"
              className="bg-slate-900 text-white hover:bg-slate-700 px-8 py-3 rounded-md font-semibold shadow-md hover:shadow-lg transition"
            >
              <a href="mailto:info@codevider.com">Connect With Us</a>
            </Button>
          </section>
          
          <HiringProcess title="Our Hiring Process" />
        </>
      )
    }

    return (
      <div className="max-w-4xl mx-auto py-24 text-center">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">No Jobs Found on This Page</h2>
        <p className="text-gray-600 mb-8">
          It looks like you&apos;ve gone past the last page of job listings.
        </p>
        <PaginationControls
          currentPage={pagination.currentPage}
          totalPages={pagination.totalPages}
          totalCount={pagination.totalCount}
          limit={pagination.limit}
          hasNext={pagination.hasNext}
          hasPrev={pagination.hasPrev}
        />
      </div>
    )
  }

  // --- THIS IS THE STATE WHEN JOBS ARE AVAILABLE ---
  return (
    <>
      <header className="border-b text-white bg-gradient-to-br from-black via-slate-900 to-sky-800 border-slate-200">
        <div className="mx-auto max-w-7xl px-6 py-16 md:py-24 text-start">
          <p className="text-sm pt-10 sm:pt-20 font-semibold uppercase tracking-widest text-sky-300">
            Careers
          </p>
          <h1 className="mt-4 text-4xl font-bold tracking-tight md:text-5xl">
            Be part of our exceptional team
          </h1>
          <p className="mt-4 text-start mx-auto text-lg leading-relaxed text-gray-300">
            Join our team and help us build the future of software development. 
            <br />We are always looking for talented individuals to join our growing team.
          </p>
        </div>
      </header>

      <section className="mx-auto items-center px-4 sm:px-6 bg-white lg:px-8 py-20">
        <div className="grid gap-6 max-w-7xl mx-auto items-center sm:gap-8">
          {jobs.map((job: Job) => (
            <JobCard key={job.id} job={job} />
          ))}
        </div>
        
        <div className="max-w-4xl mx-auto mt-8">
          <PaginationControls
            currentPage={pagination.currentPage}
            totalPages={pagination.totalPages}
            totalCount={pagination.totalCount}
            limit={pagination.limit}
            hasNext={pagination.hasNext}
            hasPrev={pagination.hasPrev}
          />
        </div>
      </section>

      <HiringProcess />
    </>
  )
}