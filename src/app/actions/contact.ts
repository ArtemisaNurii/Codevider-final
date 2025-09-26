"use server";
import { Client } from "@notionhq/client";
import { z } from "zod";

// Initialize Notion client
const notion = new Client({ auth: process.env.NOTION_SECRET });

// Define a schema for validation using Zod (highly recommended)
const contactSchema = z.object({
  full_name: z.string().min(2, { message: "Full name must be at least 2 characters." }),
  email: z.string().email({ message: "Please enter a valid email address." }),
  details: z.string().min(10, { message: "Details must be at least 10 characters." }),
  budget: z.string().optional(), // Budget is optional as it might not always be selected
});

// Function to save lead to Notion database
async function saveLeadToNotion(
  name: string,
  email: string,
  details: string,
  budget: string
) {
  await notion.pages.create({
    parent: { database_id: process.env.NOTION_DB_ID! },
    properties: {
      Name: {
        title: [
          {
            text: {
              content: name,
            },
          },
        ],
      },
      Email: {
        email: email,
      },
      "Project Details": {
        rich_text: [
          {
            text: {
              content: details,
            },
          },
        ],
      },
      Budget: {
        select: { name: budget },
      },
    },
  });
}

// The main server action function
export async function contactSubmit(formData: FormData) {
  // 1. Extract data from the form and handle null values
  const rawData = {
    full_name: formData.get("name")?.toString() || "",
    email: formData.get("email")?.toString() || "",
    details: formData.get("details")?.toString() || "",
    budget: formData.get("budget")?.toString() || "",
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

  // 3. Check if Notion environment variables are set
  if (!process.env.NOTION_SECRET || !process.env.NOTION_DB_ID) {
    console.error("NOTION_SECRET or NOTION_DB_ID is not defined in environment variables.");
    return {
      success: false,
      message: "Server configuration error. Please contact support.",
    };
  }

  try {
    // 4. Save the lead to Notion database
    await saveLeadToNotion(
      validationResult.data.full_name,
      validationResult.data.email,
      validationResult.data.details,
      validationResult.data.budget || "Not specified"
    );

    // If the submission was successful
    return {
      success: true,
      message: "Thank you for your message! We'll be in touch soon.",
      
    };

  } catch (error) {
    console.error("Notion API Error:", error);
    return {
      success: false,
      message: "Something went wrong. Please check your connection and try again.",
    };
  }
}