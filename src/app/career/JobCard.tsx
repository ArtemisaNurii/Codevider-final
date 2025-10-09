"use client"

import { useState } from "react"
import { 
  ChevronDown, 
  ArrowRight,
  MapPin,
  Briefcase,
  Clock
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Job } from "./jobs"

export default function JobCard({ job }: { job: Job }) {
  const [isOpen, setIsOpen] = useState(false)
  const applyHref = `/career/apply/${job.id}`

  // Helper function to create metadata tags - good for reusability and clean code
  const InfoTag = ({ icon, text }: { icon: React.ReactNode, text: string | undefined }) => {
    if (!text) return null
    return (
      <div className="flex items-center gap-1.5 rounded-full bg-slate-100 px-3 py-1 text-xs font-medium text-slate-700">
        {icon}
        <span>{text}</span>
      </div>
    )
  }

  return (
    <div 
      // Using data attributes for state-based styling is a modern and clean approach
      data-state={isOpen ? "open" : "closed"}
      className="group rounded-xl border bg-white shadow-sm transition-all duration-300 hover:shadow-lg data-[state=open]:shadow-lg"
    >
      {/* This entire header is now a clickable button for better accessibility and UX */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        aria-expanded={isOpen}
        aria-controls={`job-description-${job.id}`}
        className="flex w-full items-start justify-between p-6 text-left"
      >
        <div className="flex-1">
          <h3 className="text-lg font-semibold text-slate-900 group-hover:text-blue-900 sm:text-xl">
            {job.title}
          </h3>
          <div className="mt-3 flex flex-wrap items-center gap-2">
            <InfoTag 
              icon={<Briefcase className="h-3.5 w-3.5" />} 
              text={job.department.name} 
            />
            <InfoTag 
              icon={<MapPin className="h-3.5 w-3.5" />} 
              text={job.addresses?.[0]?.address?.location}
            />
            <InfoTag 
              icon={<Clock className="h-3.5 w-3.5" />} 
              text={job.job_type.job_type}
            />
          </div>
        </div>

        <div className="ml-4 flex-shrink-0">
          <ChevronDown
            className={`h-5 w-5 text-slate-500 transition-transform duration-300 ${isOpen ? "rotate-180" : ""}`}
          />
        </div>
      </button>

      {/* Collapsible Content */}
      {isOpen && (
        <div id={`job-description-${job.id}`} className="px-6 pb-6">
          <div
            // The 'prose' class from Tailwind Typography is perfect for styling HTML content
            className="prose prose-slate max-w-none border-t pt-4 text-sm leading-relaxed"
            dangerouslySetInnerHTML={{ __html: job.job_description }}
          />

          <div className="mt-6 flex justify-end">
            <Button asChild className="group/button">
              <a href={applyHref}>
                Apply Now
                <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover/button:translate-x-1" />
              </a>
            </Button>
          </div>
        </div>
      )}
    </div>
  )
}