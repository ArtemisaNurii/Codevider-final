"use client"

import { useState } from "react"
import { AnimatePresence, motion } from "framer-motion"
import {
  ChevronDown,
  ArrowRight,
  MapPin,
  Briefcase,
  Clock,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Job } from "./jobs"

const cardShadow =
  "shadow-[0px_0px_0px_1px_rgba(0,0,0,0.06),0px_1px_2px_-1px_rgba(0,0,0,0.06),0px_2px_4px_0px_rgba(0,0,0,0.04)]"
const cardShadowElevated =
  "hover:shadow-[0px_0px_0px_1px_rgba(0,0,0,0.08),0px_1px_2px_-1px_rgba(0,0,0,0.08),0px_2px_4px_0px_rgba(0,0,0,0.06)] data-[state=open]:shadow-[0px_0px_0px_1px_rgba(0,0,0,0.08),0px_1px_2px_-1px_rgba(0,0,0,0.08),0px_2px_4px_0px_rgba(0,0,0,0.06)]"

const panelVariants = {
  hidden: { opacity: 0, y: 12 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { type: "spring" as const, duration: 0.3, bounce: 0 },
  },
  exit: {
    opacity: 0,
    y: -12,
    transition: { duration: 0.15, ease: "easeIn" as const },
  },
}

export default function JobCard({ job }: { job: Job }) {
  const [isOpen, setIsOpen] = useState(false)
  const applyHref = `/career/apply?jobId=${job.id}`

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
      data-state={isOpen ? "open" : "closed"}
      className={`group rounded-xl bg-white ${cardShadow} ${cardShadowElevated} transition-shadow duration-150 ease-out`}
    >
      <button
        onClick={() => setIsOpen(!isOpen)}
        aria-expanded={isOpen}
        aria-controls={`job-description-${job.id}`}
        className="flex w-full items-start justify-between p-6 text-left"
      >
        <div className="flex-1">
          <h3 className="text-balance text-lg font-semibold text-slate-900 transition-colors duration-150 group-hover:text-blue-900 sm:text-xl">
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

        <div className="relative ml-4 size-5 shrink-0 self-center">
          <ChevronDown
            className={`size-5 text-slate-500 transition-transform duration-300 ease-out ${isOpen ? "rotate-180" : ""}`}
          />
        </div>
      </button>

      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            id={`job-description-${job.id}`}
            className="overflow-hidden px-6 pb-6"
            variants={panelVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
          >
            <div
              className="prose prose-slate max-w-none border-t border-slate-100 pt-4 text-pretty text-sm leading-relaxed"
              dangerouslySetInnerHTML={{ __html: job.job_description }}
            />

            <div className="mt-6 flex justify-end">
              <Button
                asChild
                className="group/button transition-transform duration-150 ease-out active:scale-[0.96]"
              >
                <a href={applyHref}>
                  Apply Now
                  <ArrowRight className="ml-2 h-4 w-4 transition-transform duration-150 group-hover/button:translate-x-1" />
                </a>
              </Button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}