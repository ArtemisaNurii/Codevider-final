"use client"

import { useState } from "react"
import { ChevronDown, ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Job } from "./jobs"

export default function JobCard({ job }: { job: Job }) {
  const [open, setOpen] = useState(false)
  const applyHref = `/career/apply/${job.id}`

  return (
    <div className="bg-white rounded-lg p-4 sm:p-6 shadow-sm border border-gray-200 hover:shadow-md transition-shadow">
      <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
        <div className="flex-1">
          <h3 className="text-xl md:text-2xl font-semibold text-slate-800 mb-3">
            {job.title}
          </h3>

          <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-sm text-gray-600">
            <span className="capitalize">{job.job_type.job_type}</span>
            <span className="text-gray-300">•</span>
            <span>{job.addresses?.[0]?.address?.location || "Location not specified"}</span>
            <span className="text-gray-300">•</span>
            <span>{job.department.name}</span>
          </div>

          {open && job.job_description && (
            <div
              className="mt-4 pt-4 border-t border-gray-100 text-gray-700 leading-relaxed"
              dangerouslySetInnerHTML={{ __html: job.job_description }}
            />
          )}
        </div>

        <div className="flex items-center gap-2 shrink-0 self-end md:self-auto">
          <button
            aria-label={open ? "Collapse description" : "Expand description"}
            onClick={() => setOpen((s) => !s)}
            className={`p-2 rounded-full hover:bg-gray-100 transition-transform duration-300 ${open ? "rotate-180" : ""}`}
          >
            <ChevronDown className="w-5 h-5 text-gray-500" />
          </button>

          <Button asChild variant="outline" size="sm">
            <a href={applyHref} className="flex items-center gap-2">
              <span className="hidden sm:inline">Apply</span>
              <ArrowRight className="w-4 h-4" />
            </a>
          </Button>
        </div>
      </div>
    </div>
  )
}
