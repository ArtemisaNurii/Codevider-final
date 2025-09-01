// app/api/jobs/route.ts
import { NextResponse } from "next/server";

export type Job = {
  id: string;
  title: string;
  type: "Full Time" | "Part Time" | "Contract" | "Internship";
  salaryRange?: string;        // e.g. "$3k–$5k/mo" or "$60k–$90k"
  location: string;            // e.g. "Remote" or "Tirana, Albania"
  department?: string;         // e.g. "Engineering", "Design"
  tag?: string;                // e.g. "OPEN ROLES"
  description?: string;        // long text for the accordion
  applyUrl?: string;           // link or mailto
};

const jobs: Job[] = [
  {
    id: "fe-001",
    title: "Frontend Developer (React/Next.js)",
    type: "Full Time",
    salaryRange: "€1,200 – €1,800 /month",
    location: "Tirana, Albania",
    department: "Engineering",
    tag: "OPEN ROLES",
    description:
      "We are looking for a skilled Frontend Developer with strong knowledge of React, Next.js, and Tailwind CSS. You will work on building modern, responsive web applications and collaborate closely with our design and backend teams.",
    applyUrl: "mailto:hr@codevider.com?subject=Application%20-%20Frontend%20Developer",
  },
  {
    id: "be-002",
    title: "Backend Developer (Node.js/NestJS)",
    type: "Full Time",
    salaryRange: "€1,300 – €2,000 /month",
    location: "Remote (Albania preferred)",
    department: "Engineering",
    tag: "OPEN ROLES",
    description:
      "Join our backend team to design and implement APIs and scalable microservices using Node.js and NestJS. Experience with SQL/NoSQL databases and cloud platforms (AWS/GCP/Azure) is a plus.",
    applyUrl: "mailto:hr@codevider.com?subject=Application%20-%20Backend%20Developer",
  },
  {
    id: "ai-003",
    title: "AI Integration Engineer",
    type: "Full Time",
    salaryRange: "€1,500 – €2,200 /month",
    location: "Hybrid – Tirana, Albania",
    department: "AI & Innovation",
    tag: "OPEN ROLES",
    description:
      "We’re seeking an AI Integration Engineer to help integrate LLMs and machine learning models into client applications. Responsibilities include API integration, fine-tuning models, and ensuring AI-driven features are production-ready.",
    applyUrl: "mailto:hr@codevider.com?subject=Application%20-%20AI%20Integration%20Engineer",
  },
  {
    id: "uiux-004",
    title: "Junior UI/UX Designer",
    type: "Internship",
    salaryRange: "€400 – €600 /month",
    location: "Tirana, Albania",
    department: "Design",
    tag: "OPEN ROLES",
    description:
      "As a junior UI/UX designer, you’ll support our design team with wireframes, prototypes, and Figma assets. This role is perfect for someone passionate about clean interfaces and eager to grow in a fast-moving software company.",
    applyUrl: "mailto:hr@codevider.com?subject=Application%20-%20Junior%20UI%2FUX%20Designer",
  },
];

export async function GET() {
  return NextResponse.json({ jobs });
}
