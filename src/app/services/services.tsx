
'use client'

import React, { useEffect, useMemo, useState } from 'react'

// ---- Utility Functions ----
const slugify = (str: string): string => {
  return str
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, '') // Remove special characters
    .replace(/[\s_-]+/g, '-') // Replace spaces, underscores, and multiple hyphens with single hyphen
    .replace(/^-+|-+$/g, '') // Remove leading and trailing hyphens
}

// ---- Types ----
type ServiceItem = {
  title: string
  description: string
}
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

// ✅ Replace highlights & deliverables with value-oriented content
const whyItMattersMap: Record<string, string[]> = {
  'Custom Software Development': [
    'Turn complex ideas into working products',
    'Reduce manual processes and save costs',
    'Future-proof systems for long-term growth',
  ],
  'Web Application Development': [
    'Delight users with speed and responsiveness',
    'Work on any device with consistent quality',
    'Drive higher engagement and conversions',
  ],
  'Mobile Application Development': [
    'Reach customers directly on their phones',
    'Offer seamless offline & online experiences',
    'Build loyalty with intuitive mobile design',
  ],
  Automation: [
    'Cut down on repetitive tasks',
    'Improve accuracy and reliability',
    'Give teams more time for strategic work',
  ],
  'Systems Integration': [
    'Stop data silos from slowing your business',
    'Ensure real-time information across tools',
    'Boost collaboration with unified systems',
  ],
  'Software Prototyping': [
    'Validate concepts before heavy investment',
    'Gather user insights early',
    'Reduce risk of building the wrong product',
  ],
  'Cloud Infrastructure': [
    'Scale smoothly with business demand',
    'Cut costs by paying only for what you use',
    'Increase reliability with built-in redundancy',
  ],
  'Team Augmentation': [
    'Fill skill gaps quickly',
    'Stay flexible with team sizes',
    'Keep delivery on schedule without long hiring cycles',
  ],
}

const useCasesMap: Record<string, string[]> = {
  'Custom Software Development': [
    'ERP and workflow tools',
    'Customer-facing SaaS platforms',
    'Specialized industry software',
  ],
  'Web Application Development': [
    'E-commerce platforms',
    'Client dashboards',
    'Internal portals',
  ],
  'Mobile Application Development': [
    'Consumer lifestyle apps',
    'Enterprise mobile tools',
    'On-demand delivery apps',
  ],
  Automation: [
    'Continuous Integration pipelines',
    'Automated QA testing',
    'Robotic process automation for finance/HR',
  ],
  'Systems Integration': [
    'CRM + ERP connections',
    'Marketing automation syncs',
    'Data lakes and analytics hubs',
  ],
  'Software Prototyping': [
    'Clickable startup pitch demos',
    'MVPs for market validation',
    'Stakeholder concept approvals',
  ],
  'Cloud Infrastructure': [
    'Migration from on-prem to AWS/Azure/GCP',
    'High-traffic e-commerce platforms',
    'Secure fintech & health apps',
  ],
  'Team Augmentation': [
    'Scaling quickly during funding rounds',
    'Temporary specialist roles',
    'Extending in-house team capacity',
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
        whyItMatters: whyItMattersMap[s.title] || [],
        useCases: useCasesMap[s.title] || [],
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
      <header className="border-b text-white bg-gradient-to-br from-black via-slate-900 to-sky-800 border-slate-200">
        <div className="mx-auto max-w-7xl px-6 py-16 md:py-24">
          <p className="text-sm font-semibold uppercase tracking-widest mt-10 text-white">
            Our Capabilities
          </p>
          <h1 className="mt-4 text-4xl font-bold tracking-tight md:text-5xl">
            Services that Move Your Roadmap Forward
          </h1>
          <p className="mt-4 max-w-3xl text-lg leading-relaxed text-white">
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
                      Why It Matters
                    </h3>
                    <ul className="mt-3 space-y-2 text-base text-slate-700">
                      {it.whyItMatters.map((w, idx) => (
                        <li key={idx} className="flex items-start gap-3">
                          <span className="mt-2 block h-1.5 w-1.5 flex-shrink-0 rounded-full bg-[#0a61cb]" />
                          <span>{w}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <h3 className="text-base font-semibold tracking-wide">
                      Use Cases
                    </h3>
                    <ul className="mt-3 space-y-2 text-base text-slate-700">
                      {it.useCases.map((u, idx) => (
                        <li key={idx} className="flex items-start gap-3">
                          <span className="mt-2 block h-1.5 w-1.5 flex-shrink-0 rounded-full bg-[#0a61cb]" />
                          <span>{u}</span>
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
          </div>
        </div>
      </div>
    </main>
  )
}
