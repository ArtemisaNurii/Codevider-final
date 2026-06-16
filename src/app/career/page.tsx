"use client"

import { Suspense } from "react"
import { Footer } from "../components/CTA"
import SiteNavbar from "../components/navbar"
import JobsListing from "./jobsListing"

export default function CareerPage() {
  return (
    <main>
      <SiteNavbar/>
      <section>
        <Suspense fallback={
          <div className="flex items-center justify-center min-h-[400px]">
            <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-slate-900"></div>
          </div>
        }>
          <JobsListing />
        </Suspense>
      </section>
      <Footer/>
    </main>
  )
}
