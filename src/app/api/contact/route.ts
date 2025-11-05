// app/api/contact/route.ts
import { NextResponse } from "next/server";
import { z } from "zod";
import { Client } from "@notionhq/client";

export const runtime = "nodejs";          // Notion SDK needs Node, not Edge
export const dynamic = "force-dynamic";   // no caching for writes

const contactSchema = z.object({
  companies: z.string().min(2, { message: "Full name must be at least 2 characters." }),
  email: z.string().email({ message: "Please enter a valid email address." }),
  details: z.string().optional(),
  linkedin: z.string().optional(),
});

export async function POST(req: Request) {
  try {
    if (!process.env.NOTION_SECRET || !process.env.NOTION_DB_ID) {
      return NextResponse.json(
        { success: false, message: "Server configuration error. Please contact support." },
        { status: 500 }
      );
    }

    const body = await req.json();
    const parsed = contactSchema.safeParse(body);
    if (!parsed.success) {
      const msg = parsed.error.errors[0]?.message ?? "Invalid input";
      return NextResponse.json({ success: false, message: msg }, { status: 400 });
    }

    const { companies, email, details = "", linkedin = "" } = parsed.data;

    const notion = new Client({ auth: process.env.NOTION_SECRET });
    await notion.pages.create({
      parent: { database_id: process.env.NOTION_DB_ID! },
      properties: {
        Name: { title: [{ text: { content: companies } }] },
        Email: { email },
        Details: { rich_text: [{ text: { content: details } }] },
        LinkedIn: { url: linkedin || null },
      },
    });

    return NextResponse.json({ success: true, message: "Thank you for your message! We'll be in touch soon." });
  } catch (err: any) {
    console.error("Notion API Error:", err);
    return NextResponse.json(
      { success: false, message: "Something went wrong. Please try again later." },
      { status: 500 }
    );
  }
}
