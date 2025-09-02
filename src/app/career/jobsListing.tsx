"use client"

import { useState } from "react"
import { ArrowRight, ChevronDown } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Job } from "./jobs" // Assuming your Job type is defined here

const jobs: Job[] = [
  {
    id: "fe-001",
    title: "Frontend Developer (React/Next.js)",
    type: "Full Time",
    salaryRange: "€1,200 – €1,800 /month",
    location: "Tirana, Albania",
    department: "Engineering",
    tag: "OPEN ROLES",
    description:
      "We are looking for a skilled Frontend Developer with strong knowledge of React, Next.js, and Tailwind CSS. You will work on building modern, responsive web applications and collaborate closely with our design and backend teams.",
    applyUrl: "mailto:hr@codevider.com?subject=Application%20-%20Frontend%20Developer",
  },
  {
    id: "be-002",
    title: "Backend Developer (Node.js/NestJS)",
    type: "Full Time",
    salaryRange: "€1,300 – €2,000 /month",
    location: "Remote (Albania preferred)",
    department: "Engineering",
    tag: "OPEN ROLES",
    description:
      "Join our backend team to design and implement APIs and scalable microservices using Node.js and NestJS. Experience with SQL/NoSQL databases and cloud platforms (AWS/GCP/Azure) is a plus.",
    applyUrl: "mailto:hr@codevider.com?subject=Application%20-%20Backend%20Developer",
  },
  {
    id: "ai-003",
    title: "AI Integration Engineer",
    type: "Full Time",
    salaryRange: "€1,500 – €2,200 /month",
    location: "Hybrid – Tirana, Albania",
    department: "AI & Innovation",
    tag: "OPEN ROLES",
    description:
      "We’re seeking an AI Integration Engineer to help integrate LLMs and machine learning models into client applications. Responsibilities include API integration, fine-tuning models, and ensuring AI-driven features are production-ready.",
    applyUrl: "mailto:hr@codevider.com?subject=Application%20-%20AI%20Integration%20Engineer",
  },
  {
    id: "uiux-004",
    title: "Junior UI/UX Designer",
    type: "Internship",
    salaryRange: "€400 – €600 /month",
    location: "Tirana, Albania",
    department: "Design",
    tag: "OPEN ROLES",
    description:
      "As a junior UI/UX designer, you’ll support our design team with wireframes, prototypes, and Figma assets. This role is perfect for someone passionate about clean interfaces and eager to grow in a fast-moving software company.",
    applyUrl: "mailto:hr@codevider.com?subject=Application%20-%20Junior%20UI%2FUX%20Designer",
  },
];

// Individual Job Card Component - NOW RESPONSIVE
function JobCard({ job }: { job: Job }) {
  const [open, setOpen] = useState(false)

  return (
    // CHANGE: Added responsive padding (p-4 on small, sm:p-6 on larger)
    <div className="bg-white rounded-lg p-4 sm:p-6 shadow-sm border border-gray-200 hover:shadow-md transition-shadow">
      {/* 
        CHANGE: Main container stacks vertically on mobile and becomes a row on medium screens up.
        This is the core of the responsive change.
      */}
      <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
        
        {/* Left side: Job Details */}
        <div className="flex-1">
          {job.tag && (
            <p className="text-sm text-slate-800 font-medium mb-2">{job.tag}</p>
          )}
          {/* CHANGE: Responsive font size for the title */}
          <h3 className="text-xl md:text-2xl font-semibold text-slate-800 mb-3">
            {job.title}
          </h3>

          {/* 
            Meta info like type, salary. `flex-wrap` is great for responsiveness as it wraps
            items to the next line on smaller screens.
            CHANGE: Added vertical gap (gap-y-1) for better spacing when wrapped.
          */}
          <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-sm text-gray-600">
            <span>{job.type}</span>
            <span className="text-gray-300">•</span>
            <span>{job.salaryRange ?? "Competitive"}</span>
            <span className="text-gray-300">•</span>
            <span>{job.location}</span>
            {job.department && (
              <>
                <span className="text-gray-300">•</span>
                <span>{job.department}</span>
              </>
            )}
          </div>

          {/* Collapsible description */}
          {open && job.description && (
            // CHANGE: Added a border-top for visual separation when expanded.
            <div className="mt-4 pt-4 border-t border-gray-100 text-gray-700 leading-relaxed">
              {job.description}
            </div>
          )}
        </div>

        {/* 
          Right side: Action Buttons. 
          CHANGE: Aligns to the end of the card on mobile (`self-end`) and resets on desktop.
        */}
        <div className="flex items-center gap-2 shrink-0 self-end md:self-auto">
          <button
            aria-label={open ? "Collapse description" : "Expand description"}
            onClick={() => setOpen((s) => !s)}
            // CHANGE: Improved styling and added smooth rotation transition.
            className={`p-2 rounded-full hover:bg-gray-100 transition-transform duration-300 ${open ? "rotate-180" : ""}`}
          >
            <ChevronDown className="w-5 h-5 text-gray-500" />
          </button>

          {/* 
            CHANGE: This button was fixed. 
            - It now correctly uses the `job.applyUrl`.
            - It uses standard `variant` and `size` props for clean styling.
            - The text "Apply" is hidden on small screens to save space.
          */}
          <Button
            asChild
            variant="outline"
            size="sm"
          >
            <a href={job.applyUrl} className="flex items-center gap-2">
              <span className="hidden sm:inline">Apply</span>
              <ArrowRight className="w-4 h-4" />
            </a>
          </Button>
        </div>
      </div>
    </div>
  )
}

export default function JobsListing() {
  if (jobs.length === 0) {
    return (
      // CHANGE: Added responsive padding and vertical spacing
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24">
        <div className="text-center">
          {/* CHANGE: Responsive font size */}
          <h2 className="text-2xl sm:text-3xl font-semibold text-gray-900 mb-4">
            Sorry, there are no openings at the moment
          </h2>
          <p className="text-gray-600 mb-8">
            We don&apos;t have any open positions right now, but we&apos;re always interested in hearing from talented individuals.
          </p>
          <Button
            asChild
            className="bg-slate-800 text-white hover:bg-slate-700"
          >
            <a href="mailto:hr@codevider.com">
              Send Us Your Resume
            </a>
          </Button>
        </div>
      </div>
    )
  }

  return (
    // CHANGE: Added responsive padding and vertical spacing
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24">
      {/* CHANGE: Added responsive bottom margin */}
      <div className="mb-10 sm:mb-12">
        {/* CHANGE: Responsive font size */}
        <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
          Open Positions
        </h2>
        <p className="text-lg text-gray-600">
          Join our team and help us build the future of software development.
        </p>
      </div>

      {/* CHANGE: Responsive vertical spacing between job cards */}
      <div className="space-y-4 sm:space-y-6">
        {jobs.map((job) => (
          <JobCard key={job.id} job={job} />
        ))}
      </div>

    </div>
  )
}