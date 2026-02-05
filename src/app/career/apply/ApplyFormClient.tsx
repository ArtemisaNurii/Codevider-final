/* eslint-disable @next/next/no-img-element */
"use client";

import { Footer } from "@/app/components/CTA";
import Header from "@/app/components/navbar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
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
import { APPLICATION, APPLICATION_BLOBS_UPLOAD, RECRUIT_JOBS_ENDPOINT } from "@/constants/endpoint";
import { z } from "zod";
import {
	createJobApplicationDefaultValues,
	createJobApplicationSchema,
} from "./schemas";
import { useSearchParams, notFound } from "next/navigation";

type JobApplicationFormData = z.infer<
	ReturnType<typeof createJobApplicationSchema>
>;

const SUBMIT_ERROR_MESSAGE =
	"Error: An error happened. Try again or send an email at info@codevider.com";

function parseJobIdFromQuery(value: string | null): number {
	if (value == null || value.trim() === "") return 0;
	const n = parseInt(value.trim(), 10);
	return Number.isNaN(n) || n < 1 ? 0 : n;
}

function validateJobForApplication(job: {
	status?: boolean;
	remaining_openings?: number;
	end_date?: string | null;
}): { valid: true } | { valid: false; message: string } {
	if (job.status !== true) {
		return { valid: false, message: "This position is no longer active." };
	}
	const openings = job.remaining_openings;
	if (typeof openings !== "number" || openings < 1) {
		return { valid: false, message: "This position has no available spots." };
	}
	const endDate = job.end_date;
	if (endDate) {
		const deadline = new Date(endDate);
		if (Number.isNaN(deadline.getTime()) || deadline.getTime() < Date.now()) {
			return {
				valid: false,
				message: "The application deadline for this position has passed.",
			};
		}
	}
	return { valid: true };
}

export function ApplyFormClient() {
	const searchParams = useSearchParams();
	const initialJobId = parseJobIdFromQuery(searchParams.get("job_id"));
	const hasValidJobId = initialJobId >= 1;

	const [job, setJob] = useState<Job | null>(null);
	const [showNotFound, setShowNotFound] = useState(false);
	const [isLoadingJob, setIsLoadingJob] = useState(false);
	const [isSubmitting, setIsSubmitting] = useState(false);
	const [submitMessage, setSubmitMessage] = useState("");
	const [profileImagePreview, setProfileImagePreview] = useState<string | null>(
		null,
	);

	const schema = createJobApplicationSchema(job);

	const {
		register,
		handleSubmit,
		formState: { errors },
		watch,
		setValue,
		reset,
		control,
	} = useForm<JobApplicationFormData>({
		resolver: zodResolver(schema),
		defaultValues: {
			...createJobApplicationDefaultValues,
			job_id: initialJobId || 0,
		},
		mode: "onChange",
	});

	const jobIdFromForm = watch("job_id");

	useEffect(() => {
		const id =
			typeof jobIdFromForm === "number"
				? jobIdFromForm
				: parseInt(String(jobIdFromForm || "0"), 10);
		if (!id || id < 1) {
			setJob(null);
			return;
		}
		let cancelled = false;
		setShowNotFound(false);
		setIsLoadingJob(true);
		fetch(`${process.env.NEXT_PUBLIC_BACKEND_API_URL}/${RECRUIT_JOBS_ENDPOINT}/${id}`)
			.then((res) => res.json())
			.then((data) => {
				if (cancelled) return;
				if (!data?.id) {
					setShowNotFound(true);
					setJob(null);
					return;
				}
				const validation = validateJobForApplication(data);
				if (!validation.valid) {
					setShowNotFound(true);
					setJob(null);
					return;
				}
				setJob(data);
				setValue("job_id", data.id);
			})
			.catch(() => {
				if (!cancelled) {
					setShowNotFound(true);
					setJob(null);
				}
			})
			.finally(() => {
				if (!cancelled) setIsLoadingJob(false);
			});
		return () => {
			cancelled = true;
		};
	}, [jobIdFromForm, setValue]);

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

	const formData = watch() as JobApplicationFormData;

	if (!hasValidJobId || showNotFound) notFound();

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
			if (!file.type.startsWith("image/")) {
				setSubmitMessage(SUBMIT_ERROR_MESSAGE);
				return;
			}
			if (file.size > 5 * 1024 * 1024) {
				setSubmitMessage(SUBMIT_ERROR_MESSAGE);
				return;
			}
			setValue("profile_image", file, { shouldValidate: true });
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
		const jobId =
			typeof data.job_id === "number" ? data.job_id : Number(data.job_id);
		if (!jobId || jobId < 1) {
			setSubmitMessage(SUBMIT_ERROR_MESSAGE);
			return;
		}

		if (
			job &&
			(job.is_resume_required === true ||
				job.is_resume_required === undefined) &&
			!data.resume
		) {
			setSubmitMessage(SUBMIT_ERROR_MESSAGE);
			return;
		}

		setIsSubmitting(true);
		setSubmitMessage("Uploading files...");
		try {
			const locationId = job?.addresses?.[0]?.address_id;

			let uploadedFiles: { resume?: FileDto; photo?: FileDto } = {};

			const hasResume = data.resume && data.resume instanceof File;
			const hasProfileImage =
				data.profile_image && data.profile_image instanceof File;

			if (hasResume || hasProfileImage) {
				const baseUrl = process.env.NEXT_PUBLIC_BACKEND_API_URL;
				if (!baseUrl) {
					setSubmitMessage(SUBMIT_ERROR_MESSAGE);
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

				const uploadResponse = await fetch(
					`${baseUrl}/${APPLICATION_BLOBS_UPLOAD}`,
					{ method: "POST", body: fileFormData },
				);

				if (!uploadResponse.ok) {
					setSubmitMessage(SUBMIT_ERROR_MESSAGE);
					setIsSubmitting(false);
					return;
				}

				const uploadData = await uploadResponse.json();
				uploadedFiles = {
					resume: uploadData.resume || undefined,
					photo: uploadData.photo ?? uploadData.profile_image ?? undefined,
				};
			}

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
			).map((proj) => ({
				name: proj.name,
				description: proj.description,
				repo: proj.repo,
				public_link: proj.public_link,
			}));

			setSubmitMessage("Submitting application...");
			const applicationPayload = {
				job_id: jobId,
				full_name: data.full_name,
				email: data.email,
				phone: data.phone || null,
				...(locationId != null &&
					locationId !== 0 && { location_id: locationId }),
				gender: data.gender || undefined,
				bio: data.bio || null,
				cover_letter: data.cover_letter || null,
				date_of_birth: data.date_of_birth || null,
				skills: data.skills || null,
				experiences:
					formattedExperiences.length > 0 ? formattedExperiences : null,
				educations: formattedEducations.length > 0 ? formattedEducations : null,
				projects: formattedProjects.length > 0 ? formattedProjects : null,
				...(uploadedFiles.resume && { resume: uploadedFiles.resume }),
				...(uploadedFiles.photo && { photo: uploadedFiles.photo }),
			};

			const baseUrl = process.env.NEXT_PUBLIC_BACKEND_API_URL;
			if (!baseUrl) {
				setSubmitMessage(SUBMIT_ERROR_MESSAGE);
				setIsSubmitting(false);
				return;
			}

			const submitResponse = await fetch(`${baseUrl}/${APPLICATION}`, {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify(applicationPayload),
			});

			const responseData = await submitResponse.json();

			if (submitResponse.ok) {
				setSubmitMessage("Application submitted successfully!");
				reset({
					full_name: "",
					email: "",
					phone: "",
					job_id: jobId,
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
				setSubmitMessage(SUBMIT_ERROR_MESSAGE);
			}
		} catch (error) {
			console.error("Submission error:", error);
			setSubmitMessage(SUBMIT_ERROR_MESSAGE);
		} finally {
			setIsSubmitting(false);
		}
	};

	return (
		<div>
			<Suspense
				fallback={
					<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
						<div className="text-center">Loading...</div>
					</div>
				}
			>
				<Header />
				<div className="w-full bg-linear-to-r from-black via-slate-700 to-sky-600 pt-20 pb-10 ">
					<div className="max-w-7xl mx-auto px-4 sm:px-6 pt-12 lg:px-8">
						<h2 className="text-5xl font-bold text-white">
							{job?.title ?? "Apply for a position"}
						</h2>
						{job?.job_description && (
							<p className="mt-4 text-gray-200 text-sm">
								{job.job_description}
							</p>
						)}
						{job && (
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
									`${job?.addresses?.[0]?.address?.name ?? ""} • ${job?.addresses?.[0]?.address?.address1 ?? ""}`,
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
						)}
					</div>
				</div>
				<main className="max-w-7xl mx-auto py-10 px-4 sm:px-6 lg:px-8">
					{isLoadingJob ? (
						<div className="text-center py-10">
							<div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-blue-500 mx-auto" />
							<p className="mt-2 text-gray-600">Loading job details...</p>
						</div>
					) : null}

					<form onSubmit={handleSubmit(onSubmit)} className="">
						{/* Job id from query param – kept in form for submit, hidden and disabled */}
						<input
							type="hidden"
							{...register("job_id", {
								setValueAs: (v) =>
									v === "" || Number.isNaN(Number(v)) ? 0 : Number(v),
							})}
							disabled
							aria-hidden
						/>

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
											className="absolute top-0 right-0 bg-red-500 text-white rounded-full p-1.5 hover:bg-red-600"
											aria-label="Remove image"
										>
											<X size={12} />
										</button>
									</div>
								) : (
									<div className="w-24 h-24 rounded-full bg-gray-200 flex items-center justify-center border-2 border-dashed border-gray-300">
										<span className="text-gray-400 text-xs px-2">No image</span>
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
										Max 5MB, JPG, PNG, etc.
									</p>
								</div>
							</div>
						</div>

						<div className="mb-10 space-y-4">
							<div className="flex flex-row gap-4">
								<div className="flex-1">
									<Input placeholder="Full Name*" {...register("full_name")} />
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
									<Input placeholder="Phone Number*" {...register("phone")} />
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
								className="block w-full p-4 rounded-md border border-gray-300 shadow-sm"
							/>

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
								<p className="text-xs text-gray-500 mt-1">PDF, DOC, or DOCX</p>
							</div>
						</div>

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
											{errors.experiences?.[index]?.start_date && (
												<p className="text-red-600 text-sm mt-1">
													{errors.experiences[index]?.start_date?.message}
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
										{errors.experiences?.[index]?.company_name && (
											<p className="text-red-600 text-sm mt-1">
												{errors.experiences[index]?.company_name?.message}
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
										{errors.experiences?.[index]?.position && (
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
											className="block w-full rounded-md border border-gray-300 shadow-sm"
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
											{errors.educations?.[index]?.start_date && (
												<p className="text-red-600 text-sm mt-1">
													{errors.educations[index]?.start_date?.message}
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
											{...register(`educations.${index}.institution_name`)}
											className="w-full"
										/>
										{errors.educations?.[index]?.institution_name && (
											<p className="text-red-600 text-sm mt-1">
												{errors.educations[index]?.institution_name?.message}
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
										{errors.educations?.[index]?.degree && (
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
											className="block w-full rounded-md border border-gray-300 shadow-sm"
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
										if (input?.value?.trim()) {
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
								className={`p-2 mb-4 ${submitMessage.includes("Error")
										? "text-red-600"
										: "text-green-600"
									}`}
							>
								{submitMessage}
							</div>
						)}
						<Button
							type="submit"
							disabled={isSubmitting || !hasValidJobId}
							className="w-full"
						>
							{isSubmitting ? "Submitting..." : "Apply Now"}
						</Button>
					</form>
				</main>
				<Footer />
			</Suspense>
		</div>
	);
}
