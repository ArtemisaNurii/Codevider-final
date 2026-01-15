"use client"

import { Suspense } from "react"
import { useSearchParams } from "next/navigation"
import ProjectProfile from "./profile"
import ProjectPage from "./allProject"

function ProjectsPageContent() {
  const searchParams = useSearchParams()
  const id = searchParams.get("id")

  // If id is provided, show project detail page
  if (id) {
    // Validate id is a number
    const projectId = parseInt(id, 10)
    if (isNaN(projectId)) {
      return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="text-center">
            <h1 className="text-2xl font-bold mb-4">Project Not Found</h1>
            <p className="text-gray-600">The project you&apos;re looking for doesn&apos;t exist or has been removed.</p>
          </div>
        </div>
      )
    }
    return <ProjectProfile />
  }

  // Otherwise, show projects listing
  return <ProjectPage />
}

export default function ProjectsPage() {
  return (
    <Suspense fallback={
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center">Loading projects...</div>
      </div>
    }>
      <ProjectsPageContent />
    </Suspense>
  )
}