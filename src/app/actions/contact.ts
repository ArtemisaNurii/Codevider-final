"use server";
import { LEAD_CONTACTS_ENDPOINT } from "@/constants/endpoint";
import { z } from "zod";

// Define a schema for validation using Zod (highly recommended)
const contactSchema = z.object({
  full_name: z.string().min(2, { message: "Full name must be at least 2 characters." }),
  email: z.string().email({ message: "Please enter a valid email address." }),
  details: z.string().min(10, { message: "Details must be at least 10 characters." }),
  budget: z.string().optional(), // Budget is optional as it might not always be selected
});

// The main server action function
export async function contactSubmit(formData: FormData) {
  // 1. Extract data from the form
  const rawData = {
    full_name: formData.get("full_name"),
    email: formData.get("email"),
    details: formData.get("details"),
    budget: formData.get("budget"),
  };

  // 2. Validate the data
  const validationResult = contactSchema.safeParse(rawData);

  if (!validationResult.success) {
    const firstError = validationResult.error.errors[0].message;
    return {
      success: false,
      message: firstError,
    };
  }


  const payload = {
    full_name: validationResult.data.full_name,
    email: validationResult.data.email,
    details: validationResult.data.details,
    budget: validationResult.data.budget || "Not specified", // Use the validated data
  };

  const apiEndpoint = process.env.BACKEND_API_URL + '/' + LEAD_CONTACTS_ENDPOINT; 
  
  if (!process.env.BACKEND_API_URL) {
    console.error("BACKEND_API_URL is not defined in environment variables.");
    return {
      success: false,
      message: "Server configuration error. Please contact support.",
    };
  }

  try {
    // 5. Make the POST request to your backend
    if (!apiEndpoint) {
      throw new Error("API endpoint is undefined.");
    }
    const response = await fetch(apiEndpoint, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
       
      },
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      // If the backend returns an error (e.g., 400, 500)
      const errorData = await response.json().catch(() => ({ message: "An unknown error occurred." }));
      console.error("Backend API Error:", errorData);
      return {
        success: false,
        message: errorData.message || "Failed to submit form. Please try again.",
      };
    }

    // If the submission was successful
    return {
      success: true,
      message: "Thank you for your message! We'll be in touch soon.",
    };

  } catch (error) {
    console.error("Fetch Error:", error);
    return {
      success: false,
      message: "Something went wrong. Please check your connection and try again.",
    };
  }
}