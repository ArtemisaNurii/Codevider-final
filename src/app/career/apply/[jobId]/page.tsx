import { notFound } from "next/navigation"
import { getJobs } from "../../action"
import JobApplicationPage from "../../form"
import { Job } from "../../jobs"
import { Footer } from "@/app/components/CTA"

type ApplyPageProps = {
  params: {
    jobId: string
  }
}

export default async function ApplyPage({ params }: ApplyPageProps) {
  const jobs: Job[] = await getJobs()
  const job = jobs.find(j => j.id === parseInt(params.jobId))
  
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
