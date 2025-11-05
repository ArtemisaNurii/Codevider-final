// app/api/contact/route.ts
import { NextResponse } from "next/server";
import { z } from "zod";
import { Client } from "@notionhq/client";

export const runtime = "nodejs";          // Notion SDK needs Node
export const dynamic = "force-dynamic";   // don't cache writes

// ---- Input schema
const contactSchema = z.object({
  companies: z.string().min(2, { message: "Full name must be at least 2 characters." }),
  email: z.string().email({ message: "Please enter a valid email address." }),
  details: z.string().optional(),
  linkedin: z.string().optional(),
});

// ---- Helper: build safe error message
function getErrorMessage(e: unknown): string {
  if (e instanceof z.ZodError) {
    return e.errors[0]?.message ?? "Invalid input";
  }
  if (e instanceof Error) {
    return e.message;
  }
  return "Unknown error";
}

export async function POST(req: Request) {
  try {
    if (!process.env.NOTION_SECRET || !process.env.NOTION_DB_ID) {
      return NextResponse.json(
        { success: false, message: "Server configuration error. Please contact support." },
        { status: 500 }
      );
    }

    const json = (await req.json()) as unknown;
    const parsed = contactSchema.safeParse(json);
    if (!parsed.success) {
      // Let the helper format the first Zod error message
      return NextResponse.json(
        { success: false, message: getErrorMessage(parsed.error) },
        { status: 400 }
      );
    }

    const { companies, email, details = "", linkedin = "" } = parsed.data;

    const notion = new Client({ auth: process.env.NOTION_SECRET });

    await notion.pages.create({
      parent: { database_id: process.env.NOTION_DB_ID },
      properties: {
        Name: { title: [{ text: { content: companies } }] },
        Email: { email },
        Details: { rich_text: [{ text: { content: details } }] },
        LinkedIn: { url: linkedin || null },
      },
    });

    return NextResponse.json({
      success: true,
      message: "Thank you for your message! We'll be in touch soon.",
    });
  } catch (e: unknown) {
    // Typed catch: no `any`
    console.error("Notion API Error:", e);
    return NextResponse.json(
      { success: false, message: getErrorMessage(e) },
      { status: 500 }
    );
  }
}
