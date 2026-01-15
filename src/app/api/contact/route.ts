import { Client } from "@notionhq/client";
import { z } from "zod";
import { NextRequest, NextResponse } from "next/server";

// Initialize Notion client
const notion = new Client({ auth: process.env.NEXT_PUBLIC_NOTION_SECRET });

// Define a schema for validation using Zod (highly recommended)
const contactSchema = z.object({
  companies: z.string().min(2, { message: "Full name must be at least 2 characters." }),
  email: z.string().email({ message: "Please enter a valid email address." }),
  details: z.string().optional(),
});

// Function to save lead to Notion database
async function saveLeadToNotion(
  companies: string,
  email: string,
  details: string,
) {
  await notion.pages.create({
    parent: { database_id: process.env.NEXT_PUBLIC_NOTION_DB_ID! },
    properties: {
      Name: {
        title: [
          {
            text: {
              content: companies,
            },
          },
        ],
      },
      Email: {
        email: email,
      },
      "Details": {
        rich_text: [
          {
            text: {
              content: details,
            },
          },
        ],
      },
    },
  });
}

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    
    // Extract data from the form and handle null values
    const rawData = {
      companies: formData.get("companies")?.toString() || "",
      email: formData.get("email")?.toString() || "",
      details: formData.get("details")?.toString() || "",
    };

    // Validate the data
    const validationResult = contactSchema.safeParse(rawData);

    if (!validationResult.success) {
      const firstError = validationResult.error.errors[0].message;
      return NextResponse.json(
        {
          success: false,
          message: firstError,
        },
        { status: 400 }
      );
    }

    // Check if Notion environment variables are set
    if (!process.env.NEXT_PUBLIC_NOTION_SECRET || !process.env.NEXT_PUBLIC_NOTION_DB_ID) {
      console.error("NEXT_PUBLIC_NOTION_SECRET or NEXT_PUBLIC_NOTION_DB_ID is not defined in environment variables.");
      return NextResponse.json(
        {
          success: false,
          message: "Server configuration error. Please contact support.",
        },
        { status: 500 }
      );
    }

    // Save the lead to Notion database
    await saveLeadToNotion(
      validationResult.data.companies,
      validationResult.data.email,
      validationResult.data.details || "",
    );

    // If the submission was successful
    return NextResponse.json({
      success: true,
      message: "Thank you for your message! We'll be in touch soon.",
    });

  } catch (error) {
    console.error("Notion API Error:", error);
    return NextResponse.json(
      {
        success: false,
        message: "Something went wrong. Please check your connection and try again.",
      },
      { status: 500 }
    );
  }
}
