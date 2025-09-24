import { notFound } from "next/navigation"
import { getJobs } from "../../action"
import JobApplicationPage from "../../form"
import { Footer } from "@/app/components/CTA"
import { Job } from "../../jobs"

type ApplyPageProps = {
  params: {
    jobId: string
  }
}

export default async function ApplyPage({ params }: ApplyPageProps) {
  const { jobId } = await params
  const jobsResponse = await getJobs()
  const jobs: Job[] = Array.isArray(jobsResponse) ? jobsResponse : jobsResponse.jobs
  const job = jobs.find(j => j.id === parseInt(jobId, 10))

  if (!job) {
    notFound()
  }

  return (
    <>
      <JobApplicationPage job={job} />
      <Footer />
    </>
  )
}
