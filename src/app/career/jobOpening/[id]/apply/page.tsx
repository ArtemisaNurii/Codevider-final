"use client";

import { Footer } from "@/app/components/CTA";
import Header from "@/app/components/navbar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Skeleton } from "@/components/ui/skeleton";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import { Plus, X } from "lucide-react";
import { formatPayment } from "@/lib/utils";
import { Suspense, useEffect, useState } from "react";
import { useForm, useFieldArray, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { RESUME_AI, RESUME_AI_UPLOAD } from "@/constants/endpoint";

// Types
interface FileDto {
	filename: string;
	relativepath: string;
	hashname: string;
	size: number;
	type?: string;
}

interface Experience {
	start_date: string;
	end_date?: string | null;
	company_name: string;
	position: string;
	description?: string | null;
}

interface Education {
	start_date: string;
	end_date?: string | null;
	institution_name: string;
	degree: string;
	field_of_study?: string | null;
	description?: string | null;
}

interface Project {
	name: string;
	description?: string | null;
	repo: string;
	public_link?: string | null;
}

// Create dynamic Zod schema based on job requirements
const createJobApplicationSchema = (job: Job | null) => {
	const experienceSchema = z.object({
		start_date: z.string().min(1, "Start date is required"),
		end_date: z.string().optional().nullable(),
		company_name: z.string().min(1, "Company name is required"),
		position: z.string().min(1, "Position is required"),
		description: z.string().optional().nullable(),
	});

	const educationSchema = z.object({
		start_date: z.string().min(1, "Start date is required"),
		end_date: z.string().optional().nullable(),
		institution_name: z.string().min(1, "Institution name is required"),
		degree: z.string().min(1, "Degree is required"),
		field_of_study: z.string().optional().nullable(),
		description: z.string().optional().nullable(),
	});

	const projectSchema = z.object({
		name: z.string().min(1, "Project name is required"),
		description: z.string().optional().nullable(),
		repo: z.string().min(1, "Repository is required"),
		public_link: z.string().optional().nullable(),
	});

	// Base schema with all common fields
	const baseSchema = {
		full_name: z.string().min(1, "Full name is required"),
		email: z.string().email("Please enter a valid email address"),
		phone: z.string().min(1, "Phone number is required"),
		bio: z.string().optional(),
		cover_letter: z.string().optional(),
		experiences: z.array(experienceSchema).optional(),
		educations: z.array(educationSchema).optional(),
		projects: z.array(projectSchema).optional(),
		skills: z.array(z.string()).optional(),
		job_id: z.number(),
		gender:
			job?.is_gender_required === true
				? z
						.string()
						.refine((val) => ["male", "female", "others"].includes(val), {
							message:
								"gender must be one of the following values: male, female, others",
						})
				: z
						.string()
						.refine(
							(val) => !val || ["male", "female", "others"].includes(val),
							{
								message:
									"gender must be one of the following values: male, female, others",
							},
						)
						.optional(),
		date_of_birth:
			job?.is_dob_required === true
				? z.string().min(1, "Date of birth is required")
				: z.string().optional(),
		resume:
			job?.is_resume_required === false
				? z
						.custom<File | null>((val) => val instanceof File || val === null)
						.optional()
				: z
						.custom<File | null>((val) => val instanceof File || val === null)
						.refine((val) => val !== null, { message: "Resume is required" }),
		profile_image:
			job?.is_photo_required === true
				? z
						.custom<File | null>((val) => val instanceof File || val === null)
						.refine((val) => val !== null, {
							message: "Profile image is required",
						})
				: z
						.custom<File | null>((val) => val instanceof File || val === null)
						.optional(),
	};

	return z.object(baseSchema);
};

type JobApplicationFormData = z.infer<
	ReturnType<typeof createJobApplicationSchema>
>;

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
);

export default function Page({ params }: { params: Promise<{ id: string }> }) {
	const [id, setId] = useState<string | null>(null);
	const [job, setJob] = useState<Job | null>(null);
	const [isLoadingJob, setIsLoadingJob] = useState(true);
	const [isSubmitting, setIsSubmitting] = useState(false);
	const [submitMessage, setSubmitMessage] = useState("");
	const [profileImagePreview, setProfileImagePreview] = useState<string | null>(
		null,
	);

	// Create schema when job is loaded
	const schema = job ? createJobApplicationSchema(job) : null;

	// Initialize form with react-hook-form
	const {
		register,
		handleSubmit,
		formState: { errors },
		watch,
		setValue,
		reset,
		control,
	} = useForm<JobApplicationFormData>({
		resolver: schema ? zodResolver(schema) : undefined,
		defaultValues: {
			full_name: "",
			email: "",
			phone: "",
			job_id: 0,
			resume: null,
			profile_image: null,
			cover_letter: "",
			bio: "",
			gender: "",
			date_of_birth: "",
			experiences: [],
			educations: [],
			projects: [],
			skills: [],
		},
		mode: "onChange",
	});

	// Update resolver when job changes
	useEffect(() => {
		if (job) {
			const newSchema = createJobApplicationSchema(job);
			// Note: react-hook-form doesn't support changing resolver dynamically
			// We'll rely on the initial resolver or manual validation
		}
	}, [job]);

	// Use field arrays for dynamic fields
	const {
		fields: experienceFields,
		append: appendExperience,
		remove: removeExperience,
	} = useFieldArray({
		control,
		name: "experiences",
	});

	const {
		fields: educationFields,
		append: appendEducation,
		remove: removeEducation,
	} = useFieldArray({
		control,
		name: "educations",
	});

	const {
		fields: projectFields,
		append: appendProject,
		remove: removeProject,
	} = useFieldArray({
		control,
		name: "projects",
	});

	// Watch form values
	const formData = watch() as JobApplicationFormData;

	useEffect(() => {
		const fetchJobData = async (): Promise<void> => {
			setIsLoadingJob(true);
			try {
				const { id } = await params;
				const res = await fetch(
					`${process.env.NEXT_PUBLIC_BACKEND_API_URL}/recruit/jobs/${id}`,
				);
				const data = await res.json();
				console.log("data", data);
				setJob(data);
				if (data?.id) {
					setValue("job_id", data.id);
				}
				console.log("useEffect triggered", id);
				setId(id);
			} catch (error) {
				console.error("Error fetching job:", error);
				setJob(null);
			} finally {
				setIsLoadingJob(false);
			}
		};
		fetchJobData();
	}, [params, setValue]);

	const addExperience = () => {
		appendExperience({
			start_date: "",
			end_date: "",
			company_name: "",
			position: "",
			description: "",
		});
	};

	const addEducation = () => {
		appendEducation({
			start_date: "",
			end_date: "",
			institution_name: "",
			degree: "",
			field_of_study: "",
			description: "",
		});
	};

	const addSkill = (skill: string) => {
		if (skill.trim() === "") return;
		const currentSkills = formData.skills || [];
		setValue("skills", [...new Set([...currentSkills, skill.trim()])]);
	};

	const removeSkill = (skill: string) => {
		const currentSkills = formData.skills || [];
		setValue(
			"skills",
			currentSkills.filter((s) => s !== skill),
		);
	};

	const handleSkillInputKeyDown = (
		e: React.KeyboardEvent<HTMLInputElement>,
	) => {
		if (e.key === "Enter" || e.key === ",") {
			e.preventDefault();
			const input = e.target as HTMLInputElement;
			const value = input.value.trim();
			if (value) {
				addSkill(value);
				input.value = "";
			}
		}
	};

	const handleProfileImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const { files } = e.target;
		if (files && files[0]) {
			const file = files[0];
			// Validate file type
			if (!file.type.startsWith("image/")) {
				setSubmitMessage("Error: Please upload an image file.");
				return;
			}
			// Validate file size (max 5MB)
			if (file.size > 5 * 1024 * 1024) {
				setSubmitMessage("Error: Image size must be less than 5MB.");
				return;
			}
			setValue("profile_image", file, { shouldValidate: true });
			// Create preview
			const reader = new FileReader();
			reader.onloadend = () => {
				setProfileImagePreview(reader.result as string);
			};
			reader.readAsDataURL(file);
		}
	};

	const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const { files } = e.target;
		if (files && files[0]) {
			setValue("resume", files[0], { shouldValidate: true });
		}
	};

	const onSubmit = async (data: JobApplicationFormData) => {
		if (!job) {
			setSubmitMessage("Error: Job information is missing.");
			return;
		}

		// Additional validation for resume
		if (
			(job.is_resume_required === true ||
				job.is_resume_required === undefined) &&
			!data.resume
		) {
			setSubmitMessage("Error: Resume is required.");
			return;
		}

		setIsSubmitting(true);
		setSubmitMessage("Uploading files...");
		try {
			const locationId = job.addresses?.[0]?.address_id ?? 0;

			// Step 1: Upload files first
			let uploadedFiles: { resume?: FileDto; photo?: FileDto } = {};

			// Check if we have files to upload
			const hasResume = data.resume && data.resume instanceof File;
			const hasProfileImage =
				data.profile_image && data.profile_image instanceof File;

			if (hasResume || hasProfileImage) {
				const baseUrl = process.env.NEXT_PUBLIC_BACKEND_API_URL;
				if (!baseUrl) {
					setSubmitMessage("Error: Backend API URL not configured");
					setIsSubmitting(false);
					return;
				}

				const fileFormData = new FormData();

				if (hasResume && data.resume instanceof File) {
					fileFormData.append("resume", data.resume);
				}

				if (hasProfileImage && data.profile_image instanceof File) {
					fileFormData.append("profile_image", data.profile_image);
				}

				// Upload files to the backend
				const uploadEndpoint = `${baseUrl}/${RESUME_AI_UPLOAD}`;
				const uploadResponse = await fetch(uploadEndpoint, {
					method: "POST",
					body: fileFormData,
				});

				if (!uploadResponse.ok) {
					const errorData = await uploadResponse.json();
					setSubmitMessage(errorData.message || "File upload failed");
					setIsSubmitting(false);
					return;
				}

				// The backend returns { resume: {...}, photo: {...} }
				const uploadData = await uploadResponse.json();
				uploadedFiles = {
					resume: uploadData.resume || undefined,
					photo: uploadData.photo || undefined,
				};
			}

			// Step 2: Prepare form data
			const formattedExperiences = (
				Array.isArray(data.experiences) ? data.experiences : []
			).map((exp: Experience) => ({
				start_date: exp.start_date,
				end_date: exp.end_date,
				company_name: exp.company_name,
				position: exp.position,
				description: exp.description,
			}));

			const formattedEducations = (
				Array.isArray(data.educations) ? data.educations : []
			).map((edu: Education) => ({
				start_date: edu.start_date,
				end_date: edu.end_date,
				institution_name: edu.institution_name,
				degree: edu.degree,
				field_of_study: edu.field_of_study,
				description: edu.description,
			}));

			const formattedProjects = (
				Array.isArray(data.projects) ? data.projects : []
			).map((proj: Project) => ({
				name: proj.name,
				description: proj.description,
				repo: proj.repo,
				public_link: proj.public_link,
			}));

			// Step 3: Build payload and merge with uploaded files
			setSubmitMessage("Submitting application...");
			const applicationPayload: any = {
				job_id: job.id,
				full_name: data.full_name,
				email: data.email,
				phone: data.phone || null,
				location_id: locationId,
				gender: data.gender || undefined,
				bio: data.bio || null,
				cover_letter: data.cover_letter || null,
				date_of_birth: data.date_of_birth || null,
				skills: data.skills || null,
				experiences:
					formattedExperiences.length > 0 ? formattedExperiences : null,
				educations: formattedEducations.length > 0 ? formattedEducations : null,
				projects: formattedProjects.length > 0 ? formattedProjects : null,
				// Append uploaded files to the payload
				...(uploadedFiles.resume && { resume: uploadedFiles.resume }),
				...(uploadedFiles.photo && { photo: uploadedFiles.photo }),
			};

			console.log("Submitting application data:", applicationPayload);

			// Submit application to the backend
			const baseUrl = process.env.NEXT_PUBLIC_BACKEND_API_URL;
			if (!baseUrl) {
				setSubmitMessage("Error: Backend API URL not configured");
				setIsSubmitting(false);
				return;
			}

			const submitEndpoint = `${baseUrl}/${RESUME_AI}`;
			const submitResponse = await fetch(submitEndpoint, {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify(applicationPayload),
			});

			const responseData = await submitResponse.json();

			if (submitResponse.ok) {
				setSubmitMessage("Application submitted successfully!");
				// Reset form after successful submission
				reset({
					full_name: "",
					email: "",
					phone: "",
					job_id: job.id,
					resume: null,
					profile_image: null,
					cover_letter: "",
					bio: "",
					gender: "",
					date_of_birth: "",
					experiences: [],
					educations: [],
					projects: [],
					skills: [],
				});
				setProfileImagePreview(null);
				const fileInput = document.getElementById("resume") as HTMLInputElement;
				if (fileInput) fileInput.value = "";
				const profileInput = document.getElementById(
					"profile_image",
				) as HTMLInputElement;
				if (profileInput) profileInput.value = "";
			} else {
				setSubmitMessage(
					`Error: ${responseData.message || "Application submission failed"}`,
				);
			}
		} catch (error) {
			console.error("Submission error:", error);
			setSubmitMessage("Error: Submission failed.");
		} finally {
			setIsSubmitting(false);
		}
	};

	return (
		<div>
			<Suspense
				fallback={
					<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
						<div className="text-center">Loading job details...</div>
					</div>
				}
			>
				<Header />
				{/* Section Header with Gradient */}
				<div className="w-full bg-linear-to-r from-black via-slate-700 to-sky-600 pt-20 pb-10 ">
					<div className="max-w-7xl mx-auto px-4 sm:px-6 pt-12 lg:px-8">
						<h2 className="text-5xl font-bold text-white">{job?.title}</h2>
						<p className="mt-4 text-gray-200 text-sm">{job?.job_description}</p>
						<div className="flex flex-wrap gap-2 mt-3">
							{[
								job?.job_type?.job_type || "N/A",
								formatPayment(
									job?.start_amount,
									job?.end_amount,
									job?.pay_type,
									job?.pay_according_to as
										| "hour"
										| "day"
										| "week"
										| "month"
										| "year"
										| undefined,
								),
								`${job?.addresses[0].address.name} • ${job?.addresses[0].address.address1}`,
							]
								.filter(Boolean)
								.map((info, index) => (
									<span
										key={index}
										className="inline-flex items-center rounded-full bg-white/10 px-3 py-1 text-xs font-medium text-white backdrop-blur"
									>
										{info}
									</span>
								))}
						</div>
					</div>
				</div>
				<main className="max-w-7xl mx-auto py-10 px-4 sm:px-6 lg:px-8">
					{isLoadingJob ? (
						<div className="text-center py-20">
							<div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500 mx-auto"></div>
							<p className="mt-4 text-gray-600">Loading job details...</p>
						</div>
					) : !job ? (
						<div className="text-center py-20">
							<h3 className="text-3xl font-bold text-gray-900 mb-4">404</h3>
							<p className="text-gray-600">this was not found</p>
						</div>
					) : (
						<>
							<form onSubmit={handleSubmit(onSubmit)} className="">
								<>
									{/* Profile Image Upload */}
									<div className="space-y-2 mb-10">
										<label
											htmlFor="profile_image"
											className="block text-sm font-medium text-gray-700 mb-2"
										>
											Profile Image{job?.is_photo_required === true && " *"}
										</label>
										{errors.profile_image && (
											<p className="text-red-600 text-sm mb-2">
												{errors.profile_image.message}
											</p>
										)}
										<div className="flex items-center gap-4">
											{profileImagePreview ? (
												<div className="relative inline-block">
													<img
														src={profileImagePreview}
														alt="Profile preview"
														className="w-24 h-24 rounded-full object-cover border-2 border-gray-300 shadow-sm"
													/>
													<button
														type="button"
														onClick={() => {
															setProfileImagePreview(null);
															setValue("profile_image", null);
															const input = document.getElementById(
																"profile_image",
															) as HTMLInputElement;
															if (input) input.value = "";
														}}
														className="absolute top-0 right-0 bg-red-500 text-white rounded-full p-1.5 hover:bg-red-600 shadow-md transform translate-x-1/2 -translate-y-1/2 transition-all hover:scale-110"
														aria-label="Remove image"
													>
														<X size={12} />
													</button>
												</div>
											) : (
												<div className="w-24 h-24 rounded-full bg-gray-200 flex items-center justify-center border-2 border-dashed border-gray-300">
													<span className="text-gray-400 text-xs text-center px-2">
														No image
													</span>
												</div>
											)}
											<div className="flex-1">
												<Input
													id="profile_image"
													name="profile_image"
													type="file"
													accept="image/*"
													onChange={handleProfileImageChange}
													className="block w-full text-sm"
												/>
												<p className="text-xs text-gray-500 mt-1">
													Upload a profile image (max 5MB, JPG, PNG, etc.)
												</p>
											</div>
										</div>
									</div>

									{/* Personal Information */}
									<div className="mb-10 space-y-4">
										<div className="flex flex-row gap-4">
											<div className="flex-1">
												<Input
													placeholder="Full Name*"
													{...register("full_name")}
												/>
												{errors.full_name && (
													<p className="text-red-600 text-sm mt-1">
														{errors.full_name.message}
													</p>
												)}
											</div>
											<div className="flex-1">
												<Input
													type="email"
													placeholder="Email*"
													{...register("email")}
												/>
												{errors.email && (
													<p className="text-red-600 text-sm mt-1">
														{errors.email.message}
													</p>
												)}
											</div>
										</div>
										<div className="flex flex-row gap-4">
											<div className="flex-1">
												<Input
													placeholder="Phone Number*"
													{...register("phone")}
												/>
												{errors.phone && (
													<p className="text-red-600 text-sm mt-1">
														{errors.phone.message}
													</p>
												)}
											</div>
											<div className="flex-1">
												<Input
													type="date"
													placeholder={`Date of Birth${job?.is_dob_required ? " *" : ""}`}
													{...register("date_of_birth")}
												/>
												{errors.date_of_birth && (
													<p className="text-red-600 text-sm mt-1">
														{errors.date_of_birth.message}
													</p>
												)}
											</div>
										</div>
										<div>
											<Controller
												name="gender"
												control={control}
												render={({ field }) => (
													<Select
														value={field.value || ""}
														onValueChange={field.onChange}
													>
														<SelectTrigger className="w-full">
															<SelectValue
																placeholder={`Gender${job?.is_gender_required ? " *" : ""}`}
															/>
														</SelectTrigger>
														<SelectContent>
															<SelectItem value="male">Male</SelectItem>
															<SelectItem value="female">Female</SelectItem>
															<SelectItem value="others">Others</SelectItem>
														</SelectContent>
													</Select>
												)}
											/>
											{errors.gender && (
												<p className="text-red-600 text-sm mt-1">
													{errors.gender.message}
												</p>
											)}
										</div>
										<textarea
											rows={4}
											placeholder="Bio"
											{...register("bio")}
											className="block w-full p-4 rounded-md border-gray-300 shadow-sm"
										/>

										{/* Resume Upload - Moved to end of main info */}
										<div className="space-y-2">
											<label
												htmlFor="resume"
												className="block text-sm font-medium text-gray-700 mb-2"
											>
												Upload Resume{" "}
												{(job?.is_resume_required === true ||
													job?.is_resume_required === undefined) &&
													"*"}
											</label>
											{errors.resume && (
												<p className="text-red-600 text-sm mb-2">
													{errors.resume.message}
												</p>
											)}
											<Input
												id="resume"
												type="file"
												accept=".pdf,.doc,.docx"
												onChange={handleFileChange}
												className="block w-full text-sm"
											/>
											<p className="text-xs text-gray-500 mt-1">
												Upload your resume (PDF, DOC, or DOCX)
											</p>
										</div>
									</div>

									{/* Experience Section */}
									<div className="space-y-4 mb-10">
										<h4 className="text-lg font-medium">Experience</h4>
										{experienceFields.map((field, index) => (
											<div
												key={field.id}
												className="p-4 border border-gray-200 rounded-md space-y-3 relative"
											>
												<button
													type="button"
													onClick={() => removeExperience(index)}
													className="absolute top-2 right-2 text-gray-400 hover:text-red-500"
												>
													<X size={18} />
												</button>
												<div className="grid grid-cols-2 gap-3">
													<div>
														<label className="block text-sm font-medium text-gray-700 mb-1">
															Start Date
														</label>
														<Input
															type="date"
															{...register(`experiences.${index}.start_date`)}
															className="w-full"
														/>
														{errors.experiences &&
															Array.isArray(errors.experiences) &&
															errors.experiences[index]?.start_date && (
																<p className="text-red-600 text-sm mt-1">
																	{
																		errors.experiences[index]?.start_date
																			?.message
																	}
																</p>
															)}
													</div>
													<div>
														<label className="block text-sm font-medium text-gray-700 mb-1">
															End Date
														</label>
														<Input
															type="date"
															{...register(`experiences.${index}.end_date`)}
															className="w-full"
														/>
													</div>
												</div>
												<div>
													<label className="block text-sm font-medium text-gray-700 mb-1">
														Company
													</label>
													<Input
														{...register(`experiences.${index}.company_name`)}
														className="w-full"
													/>
													{errors.experiences &&
														Array.isArray(errors.experiences) &&
														errors.experiences[index]?.company_name && (
															<p className="text-red-600 text-sm mt-1">
																{
																	errors.experiences[index]?.company_name
																		?.message
																}
															</p>
														)}
												</div>
												<div>
													<label className="block text-sm font-medium text-gray-700 mb-1">
														Position
													</label>
													<Input
														{...register(`experiences.${index}.position`)}
														className="w-full"
													/>
													{errors.experiences &&
														Array.isArray(errors.experiences) &&
														errors.experiences[index]?.position && (
															<p className="text-red-600 text-sm mt-1">
																{errors.experiences[index]?.position?.message}
															</p>
														)}
												</div>
												<div>
													<label className="block text-sm font-medium text-gray-700 mb-1">
														Description
													</label>
													<textarea
														{...register(`experiences.${index}.description`)}
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

									{/* Education Section */}
									<div className="space-y-4 mb-10">
										<h4 className="text-lg font-medium">Education</h4>
										{educationFields.map((field, index) => (
											<div
												key={field.id}
												className="p-4 border border-gray-200 rounded-md space-y-3 relative"
											>
												<button
													type="button"
													onClick={() => removeEducation(index)}
													className="absolute top-2 right-2 text-gray-400 hover:text-red-500"
												>
													<X size={18} />
												</button>
												<div className="grid grid-cols-2 gap-3">
													<div>
														<label className="block text-sm font-medium text-gray-700 mb-1">
															Start Date
														</label>
														<Input
															type="date"
															{...register(`educations.${index}.start_date`)}
															className="w-full"
														/>
														{errors.educations &&
															Array.isArray(errors.educations) &&
															errors.educations[index]?.start_date && (
																<p className="text-red-600 text-sm mt-1">
																	{
																		errors.educations[index]?.start_date
																			?.message
																	}
																</p>
															)}
													</div>
													<div>
														<label className="block text-sm font-medium text-gray-700 mb-1">
															End Date
														</label>
														<Input
															type="date"
															{...register(`educations.${index}.end_date`)}
															className="w-full"
														/>
													</div>
												</div>
												<div>
													<label className="block text-sm font-medium text-gray-700 mb-1">
														Institution
													</label>
													<Input
														{...register(
															`educations.${index}.institution_name`,
														)}
														className="w-full"
													/>
													{errors.educations &&
														Array.isArray(errors.educations) &&
														errors.educations[index]?.institution_name && (
															<p className="text-red-600 text-sm mt-1">
																{
																	errors.educations[index]?.institution_name
																		?.message
																}
															</p>
														)}
												</div>
												<div>
													<label className="block text-sm font-medium text-gray-700 mb-1">
														Degree
													</label>
													<Input
														{...register(`educations.${index}.degree`)}
														className="w-full"
													/>
													{errors.educations &&
														Array.isArray(errors.educations) &&
														errors.educations[index]?.degree && (
															<p className="text-red-600 text-sm mt-1">
																{errors.educations[index]?.degree?.message}
															</p>
														)}
												</div>
												<div>
													<label className="block text-sm font-medium text-gray-700 mb-1">
														Field of Study
													</label>
													<Input
														{...register(`educations.${index}.field_of_study`)}
														className="w-full"
													/>
												</div>
												<div>
													<label className="block text-sm font-medium text-gray-700 mb-1">
														Description
													</label>
													<textarea
														{...register(`educations.${index}.description`)}
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

									{/* Skills Section */}
									<div className="space-y-4 mb-10">
										<h4 className="text-lg font-medium">Skills</h4>
										<div className="flex flex-wrap gap-2 mb-2">
											{Array.isArray(formData.skills) &&
												formData.skills.map((skill: string, index: number) => (
													<div
														key={index}
														className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full flex items-center gap-1"
													>
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
													const input = e.currentTarget
														.previousElementSibling as HTMLInputElement;
													if (input && input.value.trim()) {
														addSkill(input.value.trim());
														input.value = "";
													}
												}}
												variant="outline"
											>
												Add
											</Button>
										</div>
									</div>
									{submitMessage && (
										<div
											className={`p-2 ${
												submitMessage.includes("Error")
													? "text-red-600"
													: "text-green-600"
											}`}
										>
											{submitMessage}
										</div>
									)}
									<Button
										type="submit"
										disabled={isSubmitting}
										className="w-full"
									>
										{isSubmitting ? "Submitting..." : "Apply Now"}
									</Button>
								</>
							</form>
						</>
					)}
				</main>
				<Footer />
			</Suspense>
		</div>
	);
}
