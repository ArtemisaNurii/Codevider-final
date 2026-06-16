import { z } from "zod";
import { LEAD_CONTACTS_ENDPOINT } from "@/constants/endpoint";

const contactSchema = z.object({
  companies: z.string().min(2, { message: "Full name must be at least 2 characters." }),
  email: z.string().email({ message: "Please enter a valid email address." }),
  details: z.string().optional(),
});

export async function contactSubmit(formData: FormData) {
  const rawData = {
    companies: formData.get("companies")?.toString() || "",
    email: formData.get("email")?.toString() || "",
    details: formData.get("details")?.toString() || "",
  };

  const validationResult = contactSchema.safeParse(rawData);

  if (!validationResult.success) {
    const firstError = validationResult.error.issues[0]?.message || "Please check the form and try again.";
    return {
      success: false,
      message: firstError,
    };
  }

  const baseUrl = process.env.NEXT_PUBLIC_BACKEND_API_URL;
  if (!baseUrl) {
    console.error("NEXT_PUBLIC_BACKEND_API_URL is not defined in environment variables.");
    return {
      success: false,
      message: "Configuration error. Please try again later.",
    };
  }

  const apiEndpoint = `${baseUrl}/${LEAD_CONTACTS_ENDPOINT}`;

  try {
    const res = await fetch(apiEndpoint, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify(validationResult.data),
    });

    if (!res.ok) {
      const text = await res.text();
      console.error(`Contact request failed: HTTP ${res.status}. Body: ${text}`);
      return {
        success: false,
        message: "Failed to submit. Please try again.",
      };
    }

    return {
      success: true,
      message: "Thank you for your message! We'll be in touch soon.",
    };

  } catch (error) {
    console.error("Contact API Error:", error);
    return {
      success: false,
      message: "Something went wrong. Please check your connection and try again.",
    };
  }
}
