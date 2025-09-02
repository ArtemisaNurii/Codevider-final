'use client'

import React, { useEffect, useMemo, useState } from 'react'

// ---- Types ----
type ServiceItem = {
  title: string
  description: string
}
// ✨ Client-friendly, SEO-optimized service copy
const services: ServiceItem[] = [
  {
    title: 'Custom Software Development',
    description:
      'We design and build software tailored to your business. From discovery to launch, we focus on real outcomes: faster workflows, lower costs, and scalable tech that grows with you.',
  },
  {
    title: 'Web Application Development',
    description:
      'High-performing web apps that load fast, look great on every device, and convert visitors into customers. Ideal for portals, dashboards, and data-heavy tools.',
  },
  {
    title: 'Mobile Application Development',
    description:
      'iOS and Android apps your users love—built native or cross-platform. Smooth UX, offline support, and seamless releases to App Store and Google Play.',
  },
  {
    title: 'Automation',
    description:
      'Eliminate repetitive work and reduce errors. We automate deployments, testing, and operations so your team can focus on revenue-driving tasks.',
  },
  {
    title: 'Systems Integration',
    description:
      'Connect your tools into one reliable flow. We unify apps and data, remove silos, and make information available where your teams need it.',
  },
  {
    title: 'Software Prototyping',
    description:
      'Validate ideas fast with clickable prototypes and an MVP. Get user feedback in weeks, de-risk scope, and secure stakeholder buy-in before full build.',
  },
  {
    title: 'Cloud Infrastructure',
    description:
      'A secure, scalable cloud foundation—built with Infrastructure as Code. We optimize for performance, uptime, and cost so you only pay for what you use.',
  },
  {
    title: 'Team Augmentation',
    description:
      'Add vetted engineers and product talent that plug into your process. Scale up quickly, keep momentum, and deliver more—without long hiring cycles.',
  },
]

// keep your slugify as-is
const slugify = (s: string) =>
  s
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, '')
    .trim()
    .replace(/\s+/g, '-')

// ✅ Aligned keys with `services` titles. Language simplified for non-technical readers.
const highlightsMap: Record<string, string[]> = {
  'Custom Software Development': [
    'Clear plan: discovery → roadmap & milestones',
    'Built to scale with your growth',
    'Security-first, compliance-ready',
  ],
  'Web Application Development': [
    'Fast single-page apps or server-rendered sites',
    'Accessible for all users (WCAG AA)',
    'Built-in monitoring & error tracking',
  ],
  'Mobile Application Development': [
    'Native (Swift/Kotlin) or cross-platform',
    'Offline-first with reliable sync & push',
    'App Store / Play submission & CI/CD',
  ],
  Automation: [
    'Deployment pipelines that prevent regressions',
    'Automated tests you can trust',
    'RPA for repetitive back-office tasks',
  ],
  'Systems Integration': [
    'Unified APIs & workflow orchestration',
    'Reliable data syncs with clear contracts',
    'Single Sign-On & role-based access',
  ],
  'Software Prototyping': [
    'Wireframes → clickable demo',
    'MVP in weeks with real user feedback',
    'Validate scope & reduce risk early',
  ],
  'Cloud Infrastructure': [
    'Infrastructure as Code & GitOps',
    'Kubernetes/Serverless ready',
    'Proactive security & policy as code',
  ],
  'Team Augmentation': [
    'Dedicated team that feels in-house',
    'Onboard in days, not months',
    'Timezone overlap & weekly demos',
  ],
}

// ✅ Deliverables written as tangible outcomes clients expect at handoff
const deliverablesMap: Record<string, string[]> = {
  'Custom Software Development': [
    'Product spec, technical design & roadmap',
    'Incremental releases with acceptance criteria',
    'Production rollout with monitoring',
  ],
  'Web Application Development': [
    'Responsive UI and reusable design system',
    'API layer, state management & docs',
    'Performance & accessibility reports',
  ],
  'Mobile Application Development': [
    'Signed app binaries & store listings',
    'Crash reporting & analytics in place',
    'Release plan with staged rollouts',
  ],
  Automation: [
    'Reusable CI/CD templates',
    'Automated test suites & coverage report',
    'RPA bots with step-by-step SOPs',
  ],
  'Systems Integration': [
    'Integration diagrams & flow contracts',
    'Data maps with sync schedules',
    'SSO/IAM configuration documentation',
  ],
  'Software Prototyping': [
    'Clickable prototype & MVP backlog',
    'User test insights and metrics',
    'Go/No-Go plan with next steps',
  ],
  'Cloud Infrastructure': [
    'IaC repo (Terraform/CDK) with modules',
    'K8s/Serverless deployment guides',
    'Security & compliance checklist',
  ],
  'Team Augmentation': [
    'Skill matrix & team charter',
    'Sprint cadence and reporting pack',
    'Shared roadmap & demo notes',
  ],
}


// ---- Component ----
export default function ServicesPage() {
  const [active, setActive] = useState<string>('')

  const items = useMemo(
    () =>
      services.map((s, i) => ({
        ...s,
        slug: `${String(i + 1).padStart(2, '0')}-${slugify(s.title)}`,
        idx: i + 1,
        highlights: highlightsMap[s.title] || [],
        deliverables: deliverablesMap[s.title] || [],
      })),
    []
  )

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const visibleEntry = entries.find((e) => e.isIntersecting)
        if (visibleEntry) {
          setActive(visibleEntry.target.getAttribute('id') || '')
        }
      },
      {
  
        rootMargin: '-25% 0px -40% 0px',
        threshold: 0,
      }
    )

    items.forEach((it) => {
      const el = document.getElementById(it.slug)
      if (el) observer.observe(el)
    })

    return () => observer.disconnect()
  }, [items])

  const scrollTo = (slug: string) => {
    const el = document.getElementById(slug)
    if (!el) return
    el.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  return (
    <main className="bg-white text-slate-900">
      {/* Header */}
      <header className="border-b border-slate-200">
        <div className="mx-auto max-w-7xl px-6 py-16 md:py-24">
          <p className="text-sm font-semibold uppercase tracking-widest mt-10 text-slate-500">
            Our Capabilities
          </p>
          <h1 className="mt-4 text-4xl font-bold tracking-tight md:text-5xl">
            Services that Move Your Roadmap Forward
          </h1>
          <p className="mt-4 max-w-3xl text-lg leading-relaxed text-slate-600">
            Explore how we design, build, and scale reliable products. We focus
            on clean typography, clear sections, and an index you can scan at a
            glance.
          </p>
        </div>
      </header>

      {/* Content */}
      <div className="mx-auto grid max-w-7xl grid-cols-1 gap-x-12 px-6 py-16 md:grid-cols-12">
        {/* Sticky Index (Desktop) */}
        <aside className="hidden md:col-span-4 md:block lg:col-span-3">
          <div className="sticky top-24">
            <nav aria-label="Services index" className="flex flex-col gap-y-1">
              {items.map((it) => {
                const isActive = active ? active === it.slug : it.idx === 1
                return (
                  <button
                    key={it.slug}
                    onClick={() => scrollTo(it.slug)}
                    className={`group flex w-full items-center gap-x-3 rounded-md p-2 text-left transition-colors duration-150 ${
                      isActive
                        ? 'bg-slate-100 text-[#0a61cb]'
                        : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
                    }`}
                    aria-current={isActive ? 'true' : undefined}
                  >
                    <span className="text-sm tabular-nums text-slate-500">
                      {String(it.idx).padStart(2, '0')}
                    </span>
                    <span
                      className={`text-base ${isActive ? 'font-semibold' : 'font-medium'}`}
                    >
                      {it.title}
                    </span>
                  </button>
                )
              })}
            </nav>
          </div>
        </aside>

        {/* Mobile Jump Menu */}
        <div className="md:hidden">
          <label htmlFor="jump" className="sr-only">
            Jump to a service
          </label>
          <select
            id="jump"
            className="w-full rounded-md border-slate-300 bg-white px-3 py-2 text-base shadow-sm focus:border-blue-500 focus:ring-blue-500"
            onChange={(e) => scrollTo(e.target.value)}
            defaultValue={items[0]?.slug}
          >
            {items.map((it) => (
              <option key={it.slug} value={it.slug}>
                {String(it.idx).padStart(2, '0')} — {it.title}
              </option>
            ))}
          </select>
        </div>

        {/* Sections */}
        <div className="mt-8 md:col-span-8 md:mt-0 lg:col-span-9">
          <div className="space-y-16">
            {items.map((it) => (
              <section
                key={it.slug}
                id={it.slug}
                // Offsets scrolling to account for a sticky header
                className="scroll-mt-24"
              >
                <header className="max-w-3xl">
                  <p className="text-sm font-semibold uppercase tracking-widest text-slate-500">
                    Service / {String(it.idx).padStart(2, '0')}
                  </p>
                  <h2 className="mt-2 text-3xl font-bold tracking-tight md:text-4xl">
                    {it.title}
                  </h2>
                  <p className="mt-3 text-lg leading-relaxed text-slate-600">
                    {it.description}
                  </p>
                </header>

                <div className="mt-8 grid grid-cols-1 gap-x-8 gap-y-6 md:grid-cols-2">
                  <div>
                    <h3 className="text-base font-semibold tracking-wide">
                      Highlights
                    </h3>
                    <ul className="mt-3 space-y-2 text-base text-slate-700">
                      {it.highlights.map((h, idx) => (
                        <li key={idx} className="flex items-start gap-3">
                          <span className="mt-2 block h-1.5 w-1.5 flex-shrink-0 rounded-full bg-[#0a61cb]" />
                          <span>{h}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <h3 className="text-base font-semibold tracking-wide">
                      Deliverables
                    </h3>
                    <ul className="mt-3 space-y-2 text-base text-slate-700">
                      {it.deliverables.map((d, idx) => (
                        <li key={idx} className="flex items-start gap-3">
                          <span className="mt-2 block h-1.5 w-1.5 flex-shrink-0 rounded-full bg-[#0a61cb]" />
                          <span>{d}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </section>
            ))}
          </div>

          {/* CTA */}
          <div className="mt-16 border-t border-slate-200 pt-10">
            <h3 className="text-2xl font-semibold">Not seeing a perfect match?</h3>
            <p className="mt-2 max-w-2xl text-lg text-slate-600">
              We tailor engagements to fit your roadmap. Tell us about your use
              case and we’ll suggest the most effective path forward.
            </p>
            <div className="mt-6 flex flex-wrap items-center gap-x-6 gap-y-3">
     
        
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}