import z from "zod";

export const createJobApplicationSchema = (job: Job | null) => {
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

export const createJobApplicationDefaultValues = {
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
};
