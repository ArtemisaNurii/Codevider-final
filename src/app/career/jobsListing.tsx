"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { useSearchParams } from "next/navigation"
import { Button } from "@/components/ui/button"
import { useMountRevealAnimation } from "@/lib/hooks/useScrollRevealMode"
import { getJobs } from "./action"
import JobCard from "./JobCard"
import JobCardSkeleton from "./JobCardSkeleton"
import PaginationControls from "./PaginationControls"
import { Job } from "./jobs"
const jobListVariants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.1, delayChildren: 0.05 },
  },
}

const jobCardVariants = {
  hidden: { opacity: 0, y: 12, filter: "blur(4px)" },
  visible: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { type: "spring" as const, duration: 0.3, bounce: 0 },
  },
}

function CareersHeader() {
  return (
    <header className="border-b text-white bg-gradient-to-br from-black via-slate-900 to-sky-800 border-slate-200">
      <div className="site-container py-16 md:py-24 text-start">
        <p className="text-sm pt-10 sm:pt-20 font-semibold uppercase tracking-widest text-sky-300">
          Careers
        </p>
        <h1 className="text-balance mt-4 text-4xl font-bold tracking-tight md:text-5xl">
          Be part of our exceptional team
        </h1>
        <p className="text-pretty mt-4 text-start mx-auto text-lg leading-relaxed text-gray-300">
          Join our team and help us build the future of software development.
          <br />We are always looking for talented individuals to join our growing team.
        </p>
      </div>
    </header>
  )
}

function JobCardsSkeleton({ count }: { count: number }) {
  return (
    <div>
      <p className="mb-8 text-center text-sm font-medium uppercase tracking-widest text-gray-500 animate-pulse">
        Fetching jobs
      </p>
      <div className="grid gap-6 items-center sm:gap-8">
        {Array.from({ length: count }, (_, i) => (
          <JobCardSkeleton key={i} />
        ))}
      </div>
    </div>
  )
}

function EmailUsCta() {
  return (
    <div className="mt-16 pt-12 border-t border-slate-200 text-center">
      <h2 className="text-xl font-semibold text-gray-900 mb-2">
        Don&apos;t see the right role?
      </h2>
      <p className="text-gray-600 mb-6 max-w-xl mx-auto">
        We&apos;re always open to hearing from talented people. Send us your resume and we&apos;ll keep you in mind for future opportunities.
      </p>
      <Button
        asChild
        size="lg"
        className="rounded-md bg-slate-900 px-8 py-3 font-semibold text-white shadow-md transition-[background-color,box-shadow,transform] duration-150 ease-out hover:bg-slate-700 hover:shadow-lg active:scale-[0.96]"
      >
        <a href="mailto:info@codevider.com">Send Us an Email</a>
      </Button>
    </div>
  )
}

export function JobsListingFallback() {
  return (
    <>
      <CareersHeader />
      <section className="bg-white py-20">
        <div className="site-container">
          <JobCardsSkeleton count={3} />
        </div>
      </section>
    </>
  )
}

function JobListAnimated({ jobs }: { jobs: Job[] }) {
  const { ref, initial, animate, whileInView, viewport } = useMountRevealAnimation()

  return (
    <motion.div
      ref={ref}
      className="grid items-center gap-6 sm:gap-8"
      initial={initial}
      animate={animate}
      whileInView={whileInView}
      viewport={viewport}
      variants={jobListVariants}
    >
      {jobs.map((job: Job) => (
        <motion.div key={job.id} variants={jobCardVariants}>
          <JobCard job={job} />
        </motion.div>
      ))}
    </motion.div>
  )
}

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

  if (!isLoading && error) {
    return (
      <>
        <CareersHeader />
        <section className="site-container py-24 text-center">
          <h2 className="text-2xl font-bold text-red-600 mb-4">{error}</h2>
          <Button onClick={() => window.location.reload()} className="bg-slate-900 text-white">
            Retry
          </Button>
        </section>
      </>
    )
  }

  if (!isLoading && (!jobs || jobs.length === 0)) {
    if (pagination.totalCount === 0) {
      return (
        <>
          <header className="border-b text-white bg-gradient-to-br from-black via-slate-900 to-sky-800 border-slate-200">
            <div className="site-container py-16 md:py-24 text-start">
              <p className="text-sm pt-10 sm:pt-20 font-semibold uppercase tracking-widest text-sky-300">
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

          <section className="site-container py-20 text-start">
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
              className="rounded-md bg-slate-900 px-8 py-3 font-semibold text-white shadow-md transition-[background-color,box-shadow,transform] duration-150 ease-out hover:bg-slate-700 hover:shadow-lg active:scale-[0.96]"
            >
              <a href="mailto:info@codevider.com">Connect With Us</a>
            </Button>
          </section>
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

  return (
    <>
      <CareersHeader />

      <section className="bg-white py-20">
        {isLoading ? (
          <div className="site-container">
            <JobCardsSkeleton count={3} />
          </div>
        ) : (
          <div className="site-container">
            <JobListAnimated jobs={jobs} />

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

            <EmailUsCta />
          </div>
        )}
      </section>
    </>
  )
}
