"use client"

import { useState } from "react"
import { ArrowRight, ChevronDown } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Job } from "./jobs"

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

// Individual Job Card Component
function JobCard({ job }: { job: Job }) {
  const [open, setOpen] = useState(false)

  return (
    <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200 hover:shadow-md transition-shadow">
      <div className="flex items-start justify-between gap-6">
        <div className="flex-1">
          {job.tag && (
            <p className="text-sm text-slate-800 font-medium mb-2">{job.tag}</p>
          )}
          <h3 className="text-2xl font-semibold text-slate-800 mb-4">
            {job.title}
          </h3>

          <div className="flex flex-wrap items-center gap-4 text-sm text-gray-600">
            <span>{job.type}</span>
            <span>•</span>
            <span>{job.salaryRange ?? "Competitive"}</span>
            <span>•</span>
            <span>{job.location}</span>
            {job.department && (
              <>
                <span>•</span>
                <span>{job.department}</span>
              </>
            )}
          </div>

          {/* Collapsible content */}
          {open && job.description && (
            <div className="mt-4 text-gray-700 leading-relaxed">
              {job.description}
            </div>
          )}
        </div>

        <div className="flex items-center gap-2 shrink-0">
          <button
            aria-label={open ? "Collapse" : "Expand"}
            onClick={() => setOpen((s) => !s)}
            className={`transition-transform ${open ? "rotate-180" : ""}`}
          >
            <ChevronDown className="w-5 h-5 text-gray-400" />
          </button>

          <Button
            asChild
            className="bg-white text-gray-800 border border-gray-300 hover:bg-gray-50"
          >
                     <a
                href="/about"
                className="inline-flex items-center gap-2 bg-white text-gray-900 font-semibold px-6 py-3 rounded-lg shadow-md hover:gap-4 transition-all duration-300"
              >
               Apply Now <ArrowRight className="w-5 h-5" />
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
      <div className="max-w-4xl mx-auto px-4 py-16">
        <div className="text-center">
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">
            Sorry, there is no openings at the moment
          </h2>
          <p className="text-gray-600 mb-8">
            We don&apos;t have any open positions right now, but we&apos;re always interested in hearing from talented individuals.
          </p>
          <Button
            asChild
            className="bg-slate-800 text-white hover:bg-blue-700"
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
    <div className="max-w-4xl mx-auto px-4 py-16">
      <div className="mb-8">
        <h2 className="text-3xl font-bold text-gray-900 mb-4">
          Open Positions
        </h2>
        <p className="text-gray-600">
          Join our team and help us build the future of software development.
        </p>
      </div>

      <div className="space-y-6">
        {jobs.map((job) => (
          <JobCard key={job.id} job={job} />
        ))}
      </div>

    </div>
  )
}
