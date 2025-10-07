'use client'

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Skeleton } from "@/components/ui/skeleton"
import { Briefcase, MapPin, FileText, BadgeDollarSign, Plus, X } from "lucide-react"
import Header from "../components/navbar"
import { Job } from "./jobs"
import { uploadFileAction, submitApplicationAction, CandidateData, FileUploadData } from "./apply/action"

const JobDetailItem = ({ icon: Icon, title, value }: { icon: React.ElementType, title: string, value: string }) => (
  <li className="flex items-start gap-4">
    <div className="flex-shrink-0 mt-1 text-slate-600"><Icon size={20} strokeWidth={1.5} /></div>
    <div><h4 className="font-semibold text-gray-800">{title}</h4><p className="text-gray-500 text-sm">{value}</p></div>
  </li>
)

const FormSkeleton = () => (
  <div className="space-y-6">
    <Skeleton className="h-10 w-full" />
    <Skeleton className="h-10 w-full" />
    <Skeleton className="h-10 w-full" />
    <Skeleton className="h-10 w-full" />
    <Skeleton className="h-10 w-full" />
    <Skeleton className="h-24 w-full" />
    
    {/* Experience Section */}
    <div className="space-y-4">
      <div className="flex items-center">
        <Skeleton className="h-6 w-32" />
      </div>
      <div className="p-4 border border-gray-200 rounded-md space-y-3">
        <div className="grid grid-cols-2 gap-3">
          <Skeleton className="h-10 w-full" />
          <Skeleton className="h-10 w-full" />
        </div>
        <Skeleton className="h-10 w-full" />
        <Skeleton className="h-10 w-full" />
        <Skeleton className="h-24 w-full" />
      </div>
    </div>
    
    {/* Education Section */}
    <div className="space-y-4">
      <div className="flex items-center">
        <Skeleton className="h-6 w-32" />
      </div>
      <div className="p-4 border border-gray-200 rounded-md space-y-3">
        <div className="grid grid-cols-2 gap-3">
          <Skeleton className="h-10 w-full" />
          <Skeleton className="h-10 w-full" />
        </div>
        <Skeleton className="h-10 w-full" />
        <Skeleton className="h-10 w-full" />
        <Skeleton className="h-10 w-full" />
        <Skeleton className="h-24 w-full" />
      </div>
    </div>
    
    {/* Skills Section */}
    <div className="space-y-4">
      <div className="flex items-center">
        <Skeleton className="h-6 w-32" />
      </div>
      <div className="flex flex-wrap gap-2">
        <Skeleton className="h-8 w-20 rounded-full" />
        <Skeleton className="h-8 w-24 rounded-full" />
        <Skeleton className="h-8 w-16 rounded-full" />
        <Skeleton className="h-8 w-28 rounded-full" />
      </div>
    </div>
  </div>
)

type JobApplicationPageProps = { job: Job }

// Using the same interfaces as in action.ts
import { CandidateExperience as Experience, CandidateEducation as Education, CandidateProject as Project } from "./apply/action"

interface JobApplicationFormData {
  full_name: string
  email: string
  phone: string
  gender?: string
  date_of_birth?: string
  bio?: string
  cover_letter?: string
  experiences?: Experience[]
  educations?: Education[]
  projects?: Project[]
  skills?: string[]
  job_id: number
  resume: File | null
}

export default function JobApplicationPage({ job }: JobApplicationPageProps) {
  const [formData, setFormData] = useState<JobApplicationFormData>({
    full_name: "",
    email: "",
    phone: "",
    job_id: job.id,
    resume: null,
    cover_letter: "",
    bio: "",
    experiences: [],
    educations: [],
    projects: [],
    skills: []
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isProcessingResume, setIsProcessingResume] = useState(false)
  const [submitMessage, setSubmitMessage] = useState("")
  const [fileMetadata, setFileMetadata] = useState<FileUploadData | null>(null)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleExperienceChange = (index: number, field: keyof Experience, value: string) => {
    setFormData((prev) => {
      const updatedExperiences = [...(prev.experiences || [])]
      if (!updatedExperiences[index]) {
        updatedExperiences[index] = { start_date: '', end_date: '', company_name: '', position: '', description: '' }
      }
      updatedExperiences[index] = { ...updatedExperiences[index], [field]: value }
      return { ...prev, experiences: updatedExperiences }
    })
  }

  const addExperience = () => {
    setFormData((prev) => ({
      ...prev,
      experiences: [...(prev.experiences || []), { start_date: '', end_date: '', company_name: '', position: '', description: '' }]
    }))
  }

  const removeExperience = (index: number) => {
    setFormData((prev) => ({
      ...prev,
      experiences: prev.experiences?.filter((_, i) => i !== index) || []
    }))
  }

  const handleEducationChange = (index: number, field: keyof Education, value: string) => {
    setFormData((prev) => {
      const updatedEducations = [...(prev.educations || [])]
      if (!updatedEducations[index]) {
        updatedEducations[index] = { start_date: '', end_date: '', institution_name: '', degree: '', field_of_study: '', description: '' }
      }
      updatedEducations[index] = { ...updatedEducations[index], [field]: value }
      return { ...prev, educations: updatedEducations }
    })
  }

  const addEducation = () => {
    setFormData((prev) => ({
      ...prev,
      educations: [...(prev.educations || []), { start_date: '', end_date: '', institution_name: '', degree: '', field_of_study: '', description: '' }]
    }))
  }

  const removeEducation = (index: number) => {
    setFormData((prev) => ({
      ...prev,
      educations: prev.educations?.filter((_, i) => i !== index) || []
    }))
  }

  const addSkill = (skill: string) => {
    if (skill.trim() === '') return
    setFormData((prev) => ({
      ...prev,
      skills: [...new Set([...(prev.skills || []), skill.trim()])]
    }))
  }

  const removeSkill = (skill: string) => {
    setFormData((prev) => ({
      ...prev,
      skills: prev.skills?.filter(s => s !== skill) || []
    }))
  }

  const handleSkillInputKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' || e.key === ',') {
      e.preventDefault()
      const input = e.target as HTMLInputElement
      const value = input.value.trim()
      if (value) {
        addSkill(value)
        input.value = ''
      }
    }
  }

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const { files } = e.target
    if (files && files[0]) {
      setFormData((prev) => ({ ...prev, resume: files[0] }))
      setIsProcessingResume(true)
      setSubmitMessage("Uploading and processing resume...")
      try {
        // Extract job description to include with the resume
        const jobDescription = job.job_description || ""
        
        const fileFormData = new FormData()
        fileFormData.append('resume', files[0])
        fileFormData.append('jobDescription', jobDescription) // Add job description to form data
        const uploadResult = await uploadFileAction(fileFormData)
        if (!uploadResult.success) {
          setSubmitMessage(uploadResult.message)
          setIsProcessingResume(false)
          return
        }
        const uploadData = uploadResult.data as { fileMetadata: FileUploadData, candidateData: CandidateData } | undefined
        if (uploadData) {
          const { candidateData, fileMetadata } = uploadData
          setFileMetadata(fileMetadata)
          // Convert CandidateExperience[] to Experience[]
          const convertedExperiences = candidateData.experiences?.map(exp => ({
            start_date: exp.start_date,
            end_date: exp.end_date,
            company_name: exp.company_name, // Make sure this matches the interface
            position: exp.position,
            description: exp.description
          }));
          
          setFormData((prev) => ({
            ...prev,
            full_name: candidateData.name ?? prev.full_name,
            email: candidateData.email ?? prev.email,
            phone: candidateData.phone ?? prev.phone,
            date_of_birth: candidateData.date_of_birth ?? prev.date_of_birth,
            gender: candidateData.gender ?? prev.gender,
            bio: candidateData.summary ?? prev.bio,
            cover_letter: candidateData.cover_letter ?? prev.cover_letter,
            skills: candidateData.skills ?? prev.skills,
            experiences: convertedExperiences ?? prev.experiences,
            educations: candidateData.educations ?? prev.educations,
            projects: candidateData.projects ?? prev.projects,
          }))
          setSubmitMessage("Resume processed successfully! Fields auto-filled.")
        }
      } catch {
        setSubmitMessage("Error: Failed to process resume.")
      } finally {
        setIsProcessingResume(false)  
      }
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!formData.resume) {
      setSubmitMessage("Error: resume is required.")
      return
    }
    setIsSubmitting(true)
    setSubmitMessage("Submitting application...")
    try {
      const locationId = job.addresses?.[0]?.address_id ?? 0
      
      // Prepare experiences data ensuring it matches the backend expectations
      const formattedExperiences = formData.experiences?.map(exp => ({
        start_date: exp.start_date,
        end_date: exp.end_date,
        company_name: exp.company_name,
        position: exp.position,
        description: exp.description
      })) || []
      
      // Prepare educations data
      const formattedEducations = formData.educations?.map(edu => ({
        start_date: edu.start_date,
        end_date: edu.end_date,
        institution_name: edu.institution_name,
        degree: edu.degree,
        field_of_study: edu.field_of_study,
        description: edu.description
      })) || []
      
      // Prepare projects data
      const formattedProjects = formData.projects?.map(proj => ({
        name: proj.name,
        description: proj.description,
        repo: proj.repo,
        public_link: proj.public_link
      })) || []
      
      const applicationPayload = {
        job_id: job.id,
        full_name: formData.full_name,
        email: formData.email,
        phone: formData.phone,
        location_id: locationId,
        gender: formData.gender,
        bio: formData.bio,
        cover_letter: formData.cover_letter,
        date_of_birth: formData.date_of_birth,
        skills: formData.skills,
        experiences: formattedExperiences,
        educations: formattedEducations,
        projects: formattedProjects,
        // Include the resume file metadata if available
        resume: fileMetadata ? {
          filename: fileMetadata.filename,
          relativepath: fileMetadata.relativepath,
          hashname: fileMetadata.hashname,
          size: fileMetadata.size
        } : undefined
        }
      
      
      console.log('Submitting application data:', applicationPayload)
      const submissionResult = await submitApplicationAction(applicationPayload)
      
      if (submissionResult.success) {
        setSubmitMessage(submissionResult.message)
        // Reset form after successful submission
        setFormData({ 
          full_name: "", 
          email: "", 
          phone: "", 
          job_id: job.id, 
          resume: null, 
          cover_letter: "", 
          bio: "", 
          experiences: [], 
          educations: [], 
          projects: [], 
          skills: [] 
        })
        setFileMetadata(null)
        const fileInput = document.getElementById('resume') as HTMLInputElement
        if (fileInput) fileInput.value = ''
      } else {
        setSubmitMessage(`Error: ${submissionResult.message}`)
      }
    } catch (error) {
      console.error('Submission error:', error)
      setSubmitMessage("Error: Submission failed.")
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="bg-white font-sans">
      <Header />
      {/* Section Header with Gradient */}
      <div className="w-full bg-gradient-to-r from-black via-slate-700 to-sky-600 py-30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-bold text-white">{job.title}</h2>
          <p className="mt-2 text-lg text-gray-200">{job.job_type.job_type} • {job.addresses?.[0]?.address?.location || 'Remote'}</p>
        </div>
      </div>
      <main className="max-w-7xl mx-auto py-16 sm:py-24 px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          <div className="lg:col-span-2">
            <h3 className="text-3xl font-bold text-gray-900">Apply Now</h3>
{job.job_description && (
  <div
    className="mt-4 pt-4 border-t border-gray-100 text-gray-700 leading-relaxed"
    dangerouslySetInnerHTML={{ __html: job.job_description }}
  />
)}

            <form onSubmit={handleSubmit} className="mt-10 space-y-6">
              <label htmlFor="resume" className="block text-sm font-medium text-gray-700 mb-2">Upload Resume *</label>
              <Input id="resume" name="resume" type="file" accept=".pdf,.doc,.docx" required onChange={handleFileChange} className="block w-full text-sm mb-4" />
              {isProcessingResume && (
                <div className="my-4">
                  <div className="flex items-center space-x-2 mb-4">
                    <div className="animate-spin rounded-full h-4 w-4 border-t-2 border-b-2 border-blue-500"></div>
                    <p className="text-blue-600">Processing resume...</p>
                  </div>
                  <FormSkeleton />
                </div>
              )}
              
              {!isProcessingResume && (
                <>
              <div className=" flex flex-row gap-4"> <Input name="full_name" placeholder="Full Name*" required value={formData.full_name} onChange={handleChange} />
              <Input name="email" type="email" placeholder="Email*" required value={formData.email} onChange={handleChange} /></div>   
              <div className=" flex flex-row gap-4">   <Input name="phone" placeholder="Phone Number*" required value={formData.phone} onChange={handleChange} />
                  <Input name="date_of_birth" placeholder="Date of Birth" value={formData.date_of_birth || ""} onChange={handleChange} /> </div>
                  <Input name="gender" placeholder="Gender" value={formData.gender || ""} onChange={handleChange} />
                  <textarea name="bio" rows={4} placeholder="Bio" value={formData.bio || ""} onChange={handleChange} className="block w-full p-4 rounded-md border-gray-300 shadow-sm" />
                </>  
              )}
              {!isProcessingResume && (
                <>
                  <div className="space-y-4">
                    <h4 className="text-lg font-medium">Experience</h4>
                    {formData.experiences && formData.experiences.map((exp, index) => (
                      <div key={index} className="p-4 border border-gray-200 rounded-md space-y-3 relative">
                        <button 
                          type="button" 
                          onClick={() => removeExperience(index)} 
                          className="absolute top-2 right-2 text-gray-400 hover:text-red-500"
                        >
                          <X size={18} />
                        </button>
                        <div className="grid grid-cols-2 gap-3">
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Start Date</label>
                            <Input 
                              type="date" 
                              value={exp.start_date || ''} 
                              onChange={(e) => handleExperienceChange(index, 'start_date', e.target.value)}
                              className="w-full"
                            />
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">End Date</label>
                            <Input 
                              type="date" 
                              value={exp.end_date || ''} 
                              onChange={(e) => handleExperienceChange(index, 'end_date', e.target.value)}
                              className="w-full"
                            />
                          </div>
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">Company</label>
                          <Input 
                            value={exp.company_name || ''} 
                            onChange={(e) => handleExperienceChange(index, 'company_name', e.target.value)}
                            className="w-full"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">Position</label>
                          <Input 
                            value={exp.position || ''} 
                            onChange={(e) => handleExperienceChange(index, 'position', e.target.value)}
                            className="w-full"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                          <textarea 
                            value={exp.description || ''} 
                            onChange={(e) => handleExperienceChange(index, 'description', e.target.value)}
                            className="block w-full rounded-md border-gray-300 shadow-sm"
                            rows={3}
                          />
                        </div>
                      </div>
                    ))}
                    <Button 
                      type="button" 
                      onClick={addExperience} 
                      variant="outline" 
                      className="flex items-center gap-2 w-full justify-center"
                    >
                      <Plus size={16} /> Add Experience
                    </Button>
                  </div>
                  
                  <div className="space-y-4">
                    <h4 className="text-lg font-medium">Education</h4>
                    {formData.educations && formData.educations.map((edu, index) => (
                      <div key={index} className="p-4 border border-gray-200 rounded-md space-y-3 relative">
                        <button 
                          type="button" 
                          onClick={() => removeEducation(index)} 
                          className="absolute top-2 right-2 text-gray-400 hover:text-red-500"
                        >
                          <X size={18} />
                        </button>
                        <div className="grid grid-cols-2 gap-3">
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Start Date</label>
                            <Input 
                              type="date" 
                              value={edu.start_date || ''} 
                              onChange={(e) => handleEducationChange(index, 'start_date', e.target.value)}
                              className="w-full"
                            />
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">End Date</label>
                            <Input 
                              type="date" 
                              value={edu.end_date || ''} 
                              onChange={(e) => handleEducationChange(index, 'end_date', e.target.value)}
                              className="w-full"
                            />
                          </div>
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">Institution</label>
                          <Input 
                            value={edu.institution_name || ''} 
                            onChange={(e) => handleEducationChange(index, 'institution_name', e.target.value)}
                            className="w-full"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">Degree</label>
                          <Input 
                            value={edu.degree || ''} 
                            onChange={(e) => handleEducationChange(index, 'degree', e.target.value)}
                            className="w-full"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">Field of Study</label>
                          <Input 
                            value={edu.field_of_study || ''} 
                            onChange={(e) => handleEducationChange(index, 'field_of_study', e.target.value)}
                            className="w-full"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                          <textarea 
                            value={edu.description || ''} 
                            onChange={(e) => handleEducationChange(index, 'description', e.target.value)}
                            className="block w-full rounded-md border-gray-300 shadow-sm"
                            rows={3}
                          />
                        </div>
                      </div>
                    ))}
                    <Button 
                      type="button" 
                      onClick={addEducation} 
                      variant="outline" 
                      className="flex items-center gap-2 w-full justify-center"
                    >
                      <Plus size={16} /> Add Education
                    </Button>
                  </div>
                  
                  <div className="space-y-4">
                    <h4 className="text-lg font-medium">Skills</h4>
                    <div className="flex flex-wrap gap-2 mb-2">
                      {formData.skills && formData.skills.map((skill, index) => (
                        <div key={index} className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full flex items-center gap-1">
                          <span>{skill}</span>
                          <button 
                            type="button" 
                            onClick={() => removeSkill(skill)}
                            className="text-blue-600 hover:text-blue-800"
                          >
                            <X size={14} />
                          </button>
                        </div>
                      ))}
                    </div>
                    <div className="flex items-center gap-2">
                      <Input 
                        placeholder="Type a skill and press Enter" 
                        onKeyDown={handleSkillInputKeyDown}
                        className="flex-1"
                      />
                      <Button 
                        type="button" 
                        onClick={(e) => {
                          const input = e.currentTarget.previousElementSibling as HTMLInputElement
                          if (input && input.value.trim()) {
                            addSkill(input.value.trim())
                            input.value = ''
                          }
                        }}
                        variant="outline"
                      >
                        Add
                      </Button>
                    </div>
                  </div>
                </>
              )}
              {submitMessage && <div className={`p-2 ${submitMessage.includes("Error") ? "text-red-600" : "text-green-600"}`}>{submitMessage}</div>}
              <Button type="submit" disabled={isSubmitting || isProcessingResume} className="w-full">{isSubmitting ? "Submitting..." : "Apply Now"}</Button>
            </form>
          </div>
          <aside className="space-y-6">
            <div className="border border-gray-200 rounded-lg p-6">
              <h3 className="text-xl font-bold text-gray-900">Job Details</h3>
              <ul className="space-y-6 mt-4">
                <JobDetailItem icon={Briefcase} title="Position" value={job.title} />
                <JobDetailItem icon={MapPin} title="Location" value={job.addresses?.[0]?.address?.location || 'Not specified'} />
                <JobDetailItem icon={FileText} title="Job Type" value={job.job_type.job_type} />
                <JobDetailItem icon={BadgeDollarSign} title="Salary" value={job.start_amount && job.end_amount ? `${job.start_amount} - ${job.end_amount} ${job.pay_according_to}` : "Competitive"} />
              </ul>
            </div>
          </aside>
        </div>
      </main>
    </div>
  )
}
