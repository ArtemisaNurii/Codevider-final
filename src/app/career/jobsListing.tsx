import { Button } from "@/components/ui/button"
import { getJobs } from "./action"
import JobCard from "./JobCard"
import PaginationControls from "./PaginationControls"
import { Job } from "./jobs"

interface JobsListingProps {
  page: number
  limit: number
}

export default async function JobsListing({ page, limit }: JobsListingProps) {
  const jobsResponse = await getJobs({ page, limit })
  const { jobs, pagination } = jobsResponse
  
  console.log("Jobs response:", jobsResponse)
  console.log("Pagination info:", pagination)

  if (!jobs || jobs.length === 0) {
    return (
      <div>
        <header className="border-b text-white bg-gradient-to-br from-black via-slate-900 to-sky-800 border-slate-200">
          <div className="mx-auto sm:pt-32 pt-32 max-w-7xl px-6 py-16 md:py-24 text-start">
            <p className="text-sm font-semibold uppercase tracking-widest text-sky-300">
              Careers
            </p>
            <h1 className="mt-4 text-4xl font-bold tracking-tight md:text-5xl">
              Join Our Team
            </h1>
            <p className="mt-4  mx-auto text-lg leading-relaxed text-gray-300">
              We&apos;re always looking for talented individuals to join our growing team. 
              Explore opportunities to work on cutting-edge projects and make a meaningful impact.
            </p>
          </div>
        </header>

        <section className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center">
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-4">
            {pagination.totalCount === 0 ? "No Open Positions at the Moment" : "No Jobs Found on This Page"}
          </h2>
          <p className="text-base sm:text-lg text-gray-600 mb-10">
            {pagination.totalCount === 0 
              ? "We may not have active openings right now, but we're always eager to connect with talented professionals. Share your resume with us, and we'll be in touch when a role that matches your skills and ambitions becomes available."
              : `Showing page ${pagination.currentPage} of ${pagination.totalPages}. Try going back to page 1 or adjusting your pagination settings.`
            }
          </p>
          
          {pagination.totalCount === 0 ? (
            <Button
              asChild
              size="lg"
              className="bg-white text-slate-900 hover:bg-slate-900 hover:text-white px-6 py-3 rounded-full font-medium shadow-md hover:shadow-lg transition"
            >
              <a href="mailto:hr@codevider.com">Send Us Your Resume</a>
            </Button>
          ) : (
            <div className="mt-8">
              <PaginationControls
                currentPage={pagination.currentPage}
                totalPages={pagination.totalPages}
                totalCount={pagination.totalCount}
                limit={pagination.limit}
                hasNext={pagination.hasNext}
                hasPrev={pagination.hasPrev}
              />
            </div>
          )}
        </section>
      </div>
    )
  }

  return (
    <div>
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
        <div className="grid gap-6 max-w-4xl mx-auto items-center sm:gap-8">
          {jobs.map((job: Job) => (
            <JobCard key={job.id} job={job} />
          ))}
        </div>
        
        {/* Pagination Controls */}
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
      <section className="bg-white py-10 px-4 sm:px-6 lg:px-8">
  <div className="max-w-5xl mx-auto text-center">
    <h2 className="text-3xl font-bold text-gray-900 mb-12">
      What to Expect Next
    </h2>

    <div className="grid md:grid-cols-3 gap-8">
      {/* Step 1 */}
      <div className="flex flex-col items-start text-left bg-slate-900 text-white rounded-2xl p-8 shadow-md hover:shadow-lg transition">
        <div className="mb-4">
          <div className="h-10 w-10 flex items-center justify-center rounded-full bg-white text-slate-900 font-bold">
            1
          </div>
        </div>
        <h3 className="text-lg font-semibold mb-3">Application Review</h3>
        <p className="text-slate-300 leading-relaxed">
          Our team carefully reviews your application to evaluate your skills and
          experience. If you’re a match, we’ll move you to the next stage.
        </p>
      </div>

      {/* Step 2 */}
      <div className="flex flex-col items-start text-left bg-slate-900 text-white rounded-2xl p-8 shadow-md hover:shadow-lg transition">
        <div className="mb-4">
          <div className="h-10 w-10 flex items-center justify-center rounded-full bg-white text-slate-900 font-bold">
            2
          </div>
        </div>
        <h3 className="text-lg font-semibold mb-3">First Interview</h3>
        <p className="text-slate-300 leading-relaxed">
          You’ll join a friendly conversation with our HR team to get to know you 
          and discuss your career goals, experience, and motivation.
        </p>
      </div>

      {/* Step 3 */}
      <div className="flex flex-col items-start text-left bg-slate-900 text-white rounded-2xl p-8 shadow-md hover:shadow-lg transition">
        <div className="mb-4">
          <div className="h-10 w-10 flex items-center justify-center rounded-full bg-white text-slate-900 font-bold">
            3
          </div>
        </div>
        <h3 className="text-lg font-semibold mb-3">Technical Interview</h3>
        <p className="text-slate-300 leading-relaxed">
          A deeper, technical conversation with our Project Managers, 
          focusing on real-world problem-solving and your technical expertise.
        </p>
      </div>
    </div>
  </div>
      </section>


    </div>
  )
}
