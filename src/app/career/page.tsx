"use client"

import { Suspense } from "react"
import JobsListing, { JobsListingFallback } from "./jobsListing"
import HiringProcess from "./hiringProcess"

export default function CareerPage() {
  return (
    <main>
      <section>
        <Suspense fallback={<JobsListingFallback />}>
          <JobsListing />
        </Suspense>
      </section>
      <HiringProcess title="What to Expect After Contacting Us" />
    </main>
  )
}
