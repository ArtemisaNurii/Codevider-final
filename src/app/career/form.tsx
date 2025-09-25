'use client'

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Briefcase, MapPin, FileText, BadgeDollarSign, Upload } from "lucide-react"
import Header from "../components/navbar"
import { Job } from "./jobs"
// Import both new actions
import { uploadFileAction, submitApplicationAction } from "./apply/action"

// ... (JobDetailItem component remains the same) ...

const JobDetailItem = ({ icon: Icon, title, value }: { icon: React.ElementType, title: string, value: string }) => (
  <li className="flex items-start gap-4">
    <div className="flex-shrink-0 mt-1 text-slate-600">
      <Icon size={20} strokeWidth={1.5} />
    </div>
    <div>
      <h4 className="font-semibold text-gray-800">{title}</h4>
      <p className="text-gray-500 text-sm">{value}</p>
    </div>
  </li>
)

type JobApplicationPageProps = {
  job: Job
}

interface JobApplicationFormData {
  name: string
  email: string
  phone: string
  job_id: number
  resume: File | null
  // Add other optional fields you might have in your form
  gender?: "male" | "female" | "other" | "prefer_not_to_say"
  date_of_birth?: string
  cover_letter?: string
}

export default function JobApplicationPage({ job }: JobApplicationPageProps) {
  const [formData, setFormData] = useState<JobApplicationFormData>({
    name: "",
    email: "",
    phone: "",
    job_id: job.id,
    resume: null,
    cover_letter: "", // Example: add cover letter to state
  })

  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitMessage, setSubmitMessage] = useState("")

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, files } = e.target
    if (files && files[0]) {
      setFormData((prev) => ({ ...prev, [name]: files[0] }))
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!formData.resume) {
        setSubmitMessage("Error: resume/Resume is required.")
        return
    }

    setIsSubmitting(true)
    setSubmitMessage("Uploading resume...")

    try {
      // STEP 1: Upload the resume file first
      const fileFormData = new FormData()
      // The key 'file' should match what your backend upload endpoint expects
      fileFormData.append('resume', formData.resume) 
      const uploadResult = await uploadFileAction(fileFormData)

      if (!uploadResult.success) {
        setSubmitMessage(`Error: ${uploadResult.message}`)
        setIsSubmitting(false)
        return
      }
      
      setSubmitMessage("Submitting application...")
      
      // The data returned from the successful upload
      const resumeMetadata = uploadResult.data

      // STEP 2: Construct the final JSON payload
      const locationId = job.addresses?.[0]?.address_id ?? 0
      const applicationPayload = {
        job_id: job.id,
        full_name: formData.name,
        email: formData.email,
        phone: formData.phone,
        location_id: locationId,
        resume: resumeMetadata, // Add the metadata object from the upload response
        // Add other optional fields if they exist
        ...(formData.cover_letter && { cover_letter: formData.cover_letter }),
        ...(formData.gender && { gender: formData.gender }),
        ...(formData.date_of_birth && { date_of_birth: formData.date_of_birth }),
      }

      // STEP 3: Submit the final JSON payload
      const submissionResult = await submitApplicationAction(applicationPayload)

      if (submissionResult.success) {
        setSubmitMessage(submissionResult.message)
        // Reset form
        setFormData({
          name: "", email: "", phone: "", job_id: job.id, resume: null, cover_letter: ""
        })
        const fileInput = document.getElementById('resume') as HTMLInputElement
        if (fileInput) fileInput.value = ''
      } else {
        setSubmitMessage(`Error: ${submissionResult.message}`)
      }

    } catch (error) {
      console.error('Submission process error:', error)
      setSubmitMessage("Error: A critical error occurred. Please try again.")
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="bg-white font-sans">
      <Header />
      <header className="border-b text-white bg-gradient-to-br from-black via-slate-900 to-sky-800 border-slate-200">
        <div className="mx-auto max-w-7xl max-md:px-4 py-16 md:py-24 text-start">

          <h1 className="mt-4 text-4xl font-bold tracking-tight md:text-5xl">
          {job.title}     </h1>
          <p className="mt-4  mx-auto text-lg leading-relaxed text-gray-300">
            Please fill out the form below to apply for the {job.title} position.        </p>
        </div>
      </header>
      {/* ... (Header and Job Details JSX remains the same) ... */}
      <main className="max-w-7xl mx-auto py-16 sm:py-24 px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          <div className="lg:col-span-2">
            <h3 className="text-3xl font-bold text-gray-900">Apply Now</h3>
            <p className="mt-4 text-gray-600 leading-relaxed">
              Please fill out the form below to apply for the {job.title} position.
            </p>
            {job.job_description && <div className="mt-4 text-gray-600 leading-relaxed" dangerouslySetInnerHTML={{ __html: job.job_description }} />}
            <form onSubmit={handleSubmit} className="mt-10 space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <Input name="name" placeholder="Name*" required value={formData.name} onChange={handleChange} />
                <Input name="email" type="email" placeholder="Email*" required value={formData.email} onChange={handleChange} />
              </div>
              <div>
                <Input name="phone" placeholder="Phone Number*" required value={formData.phone} onChange={handleChange} />
              </div>
              {/* You can add a cover letter field if needed */}
              {/* <Textarea name="cover_letter" placeholder="Cover Letter (Optional)" value={formData.cover_letter} onChange={handleChange} /> */}
              <div>
                 <label htmlFor="position" className="block text-sm font-medium text-gray-700 mb-2">
                   Position Applied For
                 </label>
                 <Input
                   id="position"
                   name="position"
                   value={job.title}
                   readOnly
                   className="bg-gray-50 text-gray-600 cursor-not-allowed"
                   placeholder="Position title"
                 />
               </div>
              <div>
                <label htmlFor="resume" className="block text-sm font-medium text-gray-700 mb-2">
                  Upload resume/Resume *
                </label>
                <div className="flex items-center gap-3 p-3 border border-gray-300 rounded-md hover:border-gray-400 transition-colors">
                  <Upload className="w-5 h-5 text-gray-400" />
                  <input
                    id="resume"
                    name="resume"
                    type="file"
                    accept=".pdf,.doc,.docx"
                    required
                    onChange={handleFileChange}
                    className="flex-1 text-sm text-gray-600 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-medium file:bg-gray-50 file:text-gray-700 hover:file:bg-gray-100"
                  />
                </div>
                {formData.resume && (
                  <p className="mt-1 text-sm text-green-600">
                    Selected: {formData.resume.name}
                  </p>
                )}
              </div>
              {submitMessage && (
                <div className={`p-4 rounded-md ${submitMessage.includes('Error') ? 'bg-red-50 text-red-700 border border-red-200' : 'bg-green-50 text-green-700 border border-green-200'}`}>
                  {submitMessage}
                </div>
              )}
              <Button 
                type="submit" 
                disabled={isSubmitting}
                className="w-full !mt-8 bg-gradient-to-br from-black via-slate-900 to-sky-700 text-white hover:gap-4 disabled:bg-slate-400 disabled:cursor-not-allowed py-3 text-lg font-semibold rounded-md transition-colors"
              >
                {isSubmitting ? 'Submitting...' : 'Apply Now'}
              </Button>
            </form>
          </div>
        {/* ... (Aside with Job Details JSX remains the same) ... */}
        <aside className="space-y-6">
            <div className="border border-gray-200 rounded-lg p-6">
              <h3 className="text-xl font-bold text-gray-900">Job Details</h3>
              <hr className="my-4" />
              <ul className="space-y-6">
                <JobDetailItem icon={Briefcase} title="Position" value={job.title} />
                <JobDetailItem icon={MapPin} title="Location" value={job.addresses?.[0]?.address?.location || 'Location not specified'} />
                <JobDetailItem icon={FileText} title="Job Type" value={job.job_type.job_type} />
                <JobDetailItem 
                  icon={BadgeDollarSign} 
                  title="Offered Salary" 
                  value={
                    job.start_amount && job.end_amount 
                      ? `${job.start_amount} - ${job.end_amount} ${job.pay_according_to}` 
                      : job.start_amount 
                      ? `${job.start_amount} ${job.pay_according_to}` 
                      : "Competitive"
                  } 
                />
              </ul>
            </div>
          </aside>
        </div>
      </main>
    </div>
  )
}