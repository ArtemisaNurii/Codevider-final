'use client'

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Briefcase, MapPin, FileText, CheckSquare, Trophy, BadgeDollarSign, Upload } from "lucide-react"
import Header from "../components/navbar"
import { Job } from "./jobs"

// A reusable component for the job detail items to keep the code DRY and clean.
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

export default function JobApplicationPage({ job }: JobApplicationPageProps) {
  // State to manage form inputs
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    country: "",
    title: job.title, // Auto-populate with the job title
    cv: null as File | null,
  })

  // Handler for text-based input changes
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  // Handler for select/dropdown changes
  const handleSelectChange = (name: string, value: string) => {
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  // Handler for file uploads
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, files } = e.target
    if (files && files[0]) {
      setFormData((prev) => ({ ...prev, [name]: files[0] }))
    }
  }

  // Form submission handler
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log("Submitting application:", formData)
    // TODO: Add API call to submit form data to the backend
    alert("Application submitted successfully! (Check console for data)")
  }

  return (
    <div className="bg-white font-sans">
      <Header />
      <header className="pt-24 bg-gradient-to-br from-black via-slate-900 to-sky-800  text-white" >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
   

          <div className="py-20 md:py-28 text-center">
            <h2 className="text-5xl md:text-7xl font-extrabold">{job.title}</h2>
            <p className="mt-4 text-lg text-gray-300">
              <a href="/career" className="text-slate-500 hover:underline">Careers</a> / {job.title}
            </p>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto py-16 sm:py-24 px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          
          {/* --- Form --- */}
          <div className="lg:col-span-2">
            <h3 className="text-3xl font-bold text-gray-900">Apply Now</h3>
            <p className="mt-4 text-gray-600 leading-relaxed">
              Please fill out the form below to apply for the {job.title} position.
            </p>
{job.job_description && <div className="mt-4 text-gray-600 leading-relaxed" dangerouslySetInnerHTML={{ __html: job.job_description }} />}
            <form onSubmit={handleSubmit} className="mt-10 space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <Input name="name" placeholder="Name*" required value={formData.name} onChange={handleChange} />
                <Input name="email" type="email" placeholder="Email" required value={formData.email} onChange={handleChange} />
              </div>
              <div>
                <Input name="phone" placeholder="Phone Number" required value={formData.phone} onChange={handleChange} />
              </div>
              <div>
                <Textarea name="address" placeholder="Address, City, State, Zip Code" className="min-h-[140px]" value={formData.address} onChange={handleChange} />
              </div>
              <div>
                 <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-2">
                   Position Applied For
                 </label>
                 <Input
                   id="title"
                   name="title"
                   value={formData.title}
                   readOnly
                   className="bg-gray-50 text-gray-600 cursor-not-allowed"
                   placeholder="Position title"
                 />
               </div>
              {/* CV Upload Field */}
              <div>
                <label htmlFor="cv" className="block text-sm font-medium text-gray-700 mb-2">
                  Upload CV/Resume *
                </label>
                <div className="flex items-center gap-3 p-3 border border-gray-300 rounded-md hover:border-gray-400 transition-colors">
                  <Upload className="w-5 h-5 text-gray-400" />
                  <input
                    id="cv"
                    name="cv"
                    type="file"
                    accept=".pdf,.doc,.docx"
                    required
                    onChange={handleFileChange}
                    className="flex-1 text-sm text-gray-600 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-medium file:bg-gray-50 file:text-gray-700 hover:file:bg-gray-100"
                  />
                </div>
                {formData.cv && (
                  <p className="mt-1 text-sm text-green-600">
                    Selected: {formData.cv.name}
                  </p>
                )}
              </div>
              
              {/* Using shadcn/ui Select for dropdowns */}
              <Select name="country" onValueChange={(value) => handleSelectChange('country', value)}>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="United States" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="us">United States</SelectItem>
                  <SelectItem value="uk">United Kingdom</SelectItem>
                  <SelectItem value="ca">Canada</SelectItem>
                </SelectContent>
              </Select>
         
              <Button type="submit" className="w-full !mt-8 bg-slate-600 text-white hover:bg-slate-700 py-3 text-lg font-semibold rounded-md transition-colors">
                Apply Now
              </Button>
            </form>
          </div>

          {/* --- Job Details Sidebar --- */}
          <aside className="space-y-6">
            <div className="border border-gray-200 rounded-lg p-6">
              <h3 className="text-xl font-bold text-gray-900">Job Details</h3>
              <hr className="my-4" />
              <ul className="space-y-6">
                <JobDetailItem icon={Briefcase} title="Position" value={job.title} />
                <JobDetailItem icon={MapPin} title="Location" value={`Location #${job.location_id}`} />
                <JobDetailItem icon={FileText} title="Job Type" value={job.job_type} />
                <JobDetailItem icon={CheckSquare} title="Qualifications" value={job.qualifications || "See description"} />
                <JobDetailItem icon={Trophy} title="Experience" value={job.experience || "See description"} />
                <JobDetailItem 
                  icon={BadgeDollarSign} 
                  title="Offered Salary" 
                  value={
                    job.start_amount && job.end_amount 
                      ? `${job.start_amount} - ${job.end_amount} ${job.pay_according}` 
                      : job.start_amount 
                      ? `${job.start_amount} ${job.pay_according}` 
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