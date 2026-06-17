"use client";

import React from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

const services = [
  {
    idx: "01",
    title: "Custom Software Development",
    description:
      "We design and build software tailored to your business. From discovery to launch, we focus on real outcomes: faster workflows, lower costs, and scalable tech that grows with you.",
  },
  {
    idx: "02",
    title: "Web Application Development",
    description:
      "High-performing web apps that load fast, look great on every device, and convert visitors into customers. Ideal for portals, dashboards, and data-heavy tools.",
  },
  {
    idx: "03",
    title: "AI Integration",
    description:
      "We integrate AI into your existing workflows. From custom LLM-powered apps to intelligent chatbots and workflow automation, we make AI work for you.",
  },
  {
    idx: "04",
    title: "Automation",
    description:
      "Eliminate repetitive work and reduce errors. We automate deployments, testing, and operations so your team can focus on revenue-driving tasks.",
  },
  {
    idx: "05",
    title: "Cloud Infrastructure",
    description:
      "A secure, scalable cloud foundation built with Infrastructure as Code. We optimize for performance, uptime, and cost so you only pay for what you use.",
  },
  {
    idx: "06",
    title: "Team Augmentation",
    description:
      "Add vetted engineers and product talent that plug into your process. Scale up quickly, keep momentum, and deliver more without long hiring cycles.",
  },
];

export default function ServicesSection() {
  return (
    <section id="services" className="bg-white py-16 md:py-24">
      <div className="site-container">
        {/* Header */}
        <div className="mb-12 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="text-sm font-semibold uppercase tracking-widest text-sky-600">
              What We Do
            </p>
            <h2 className="text-balance mt-3 text-4xl font-bold tracking-tight text-slate-900 md:text-5xl">
              Services that Move Your Roadmap Forward
            </h2>
          </div>
          <Link
            href="/services"
            className="inline-flex shrink-0 items-center gap-2 rounded-full border border-slate-300 px-5 py-2.5 text-sm font-semibold text-slate-700 transition-[gap,box-shadow] duration-200 hover:gap-3 hover:border-slate-900 hover:text-slate-900 active:scale-[0.96]"
          >
            See all services
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 gap-px border border-slate-100 bg-slate-100 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((s) => (
            <div
              key={s.idx}
              className="group flex flex-col gap-4 bg-white p-8 transition-colors duration-200 hover:bg-slate-50"
            >
              <span className="tabular-nums text-sm font-semibold text-slate-400">
                {s.idx}
              </span>
              <h3 className="text-lg font-semibold text-slate-900">{s.title}</h3>
              <p className="text-pretty text-sm leading-relaxed text-slate-600">
                {s.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
