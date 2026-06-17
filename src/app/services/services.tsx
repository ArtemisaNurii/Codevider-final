
'use client'

import React, { useEffect, useLayoutEffect, useMemo, useRef, useState } from 'react'

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
  // {
  //   title: 'Mobile Application Development',
  //   description:
  //     'iOS and Android apps users love,built native or cross-platform. Smooth UX, offline support, and seamless releases to App Store and Google Play.',
  // },
  {
    title: 'AI Integration',
    description:
      'We integrate AI into your existing workflows. From custom LLM-powered apps to intelligent chatbots and workflow automation, we make AI work for you.',
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
  // {
  //   title: 'Software Prototyping',
  //   description:
  //     'Validate ideas fast with clickable prototypes and an MVP. Get user feedback in weeks, de-risk scope, and secure stakeholder buy-in before full build.',
  // },
  {
    title: 'Cloud Infrastructure',
    description:
      'A secure, scalable cloud foundation,built with Infrastructure as Code. We optimize for performance, uptime, and cost so you only pay for what you use.',
  },
  {
    title: 'Team Augmentation',
    description:
      'Add vetted engineers and product talent that plug into your process. Scale up quickly, keep momentum, and deliver more,without long hiring cycles.',
  },
]

const solution: Record<string, string[]> = {
  'Custom Software Development': [
    'Tailored platforms built around your exact workflows',
    'Long-term scalability with clean, maintainable code',
    'Seamless integration with existing business systems',
  ],
  'Web Application Development': [
    'Responsive portals optimized for performance',
    'Real-time dashboards with actionable insights',
    'Secure and intuitive customer-facing web solutions',
  ],
  'AI Integration': [
    'Custom LLM-powered apps and intelligent chatbots',
    'Workflow automation and actionable insights',
    'Seamless integration into existing ecosystems',
  ],
  Automation: [
    'Fully automated deployment pipelines',
    'QA processes that run with zero human intervention',
    'Workflow automations tailored to business rules',
  ],
  'Systems Integration': [
    'Unified data across departments and platforms',
    'Seamless syncs between CRM, ERP, and third-party tools',
    'Centralized reporting for faster decision-making',
  ],
  // 'Software Prototyping': [
  //   'Clickable MVPs ready for user testing',
  //   'Rapid iteration with stakeholder feedback loops',
  //   'Validated features before investing in full builds',
  // ],
  'Cloud Infrastructure': [
    'Infrastructure as Code for repeatable deployments',
    'Optimized workloads with cost-efficient scaling',
    'High availability and disaster recovery setups',
  ],
  'Team Augmentation': [
    'Specialized engineers embedded in your workflow',
    'Flexible engagement-scale teams up or down',
    'Immediate capacity without long recruitment cycles',
  ],
}


const outcomes: Record<string, string[]> ={
  'Custom Software Development': [
    'Reduced operational overhead',
    'Higher employee productivity',
    'Future-proof technology aligned with growth plans',
  ],
  'Web Application Development': [
    'Improved customer engagement and conversions',
    'Lower bounce rates due to faster load times',
    'Streamlined internal processes via custom portals',
  ],
  'Mobile Application Development': [
    'Stronger brand presence on mobile devices',
    'Increased customer retention and loyalty',
    'Faster go-to-market with scalable mobile apps',
  ],
  'AI Integration': [
    'Faster response times with AI-powered chatbots',
    'Reduction in manual data entry and document processing',
    'Data-driven insights that improve decision accuracy',
  ],
  Automation: [
    'Fewer manual errors across departments',
    'Accelerated delivery timelines',
    'Increased focus on revenue-driving activities',
  ],
  'Systems Integration': [
    'Better collaboration with unified tools',
    'Real-time insights across business units',
    'Faster execution of company-wide initiatives',
  ],
  // 'Software Prototyping': [
  //   'Lower investment risk',
  //   'Quick validation of product-market fit',
  //   'Stakeholder confidence with tangible demos',
  // ],
  'Cloud Infrastructure': [
    'Reduced downtime with resilient systems',
    'Lower infrastructure costs through scaling',
    'Faster time-to-deploy for new products',
  ],
  'Team Augmentation': [
    'On-time delivery of critical projects',
    'Increased innovation with diverse skillsets',
    'Faster response to shifting business needs',
  ],
}

// ---- Component ----
export default function ServicesPage() {
  const [active, setActive] = useState<string>('')
  const mobileNavRef = useRef<HTMLDivElement>(null)
  const mobileStickyNavRef = useRef<HTMLElement>(null)
  const isJumpScrollingRef = useRef(false)

  const items = useMemo(
    () =>
      services.map((s, i) => ({
        ...s,
        slug: `${String(i + 1).padStart(2, '0')}-${slugify(s.title)}`,
        idx: i + 1,
        whyItMatters: solution[s.title] || [],
        useCases: outcomes[s.title] || [],
      })),
    []
  )

  const activeItem = useMemo(
    () => items.find((it) => it.slug === active) ?? items[0],
    [active, items]
  )

  const getStickyOffset = () => {
    const root = document.documentElement
    const styles = getComputedStyle(root)
    const headerHeight =
      Number.parseFloat(styles.getPropertyValue('--site-header-height')) || 72

    if (window.matchMedia('(min-width: 1024px)').matches) {
      return headerHeight
    }

    const mobileNavHeight =
      Number.parseFloat(styles.getPropertyValue('--services-mobile-nav-height')) ||
      mobileStickyNavRef.current?.getBoundingClientRect().height ||
      0

    return headerHeight + mobileNavHeight
  }

  const getScrollTopForSlug = (slug: string) => {
    const index = items.findIndex((it) => it.slug === slug)
    if (index < 0) return 0

    const offset = getStickyOffset()

    if (index > 0) {
      const prevEl = document.getElementById(items[index - 1].slug)
      if (prevEl) {
        return prevEl.getBoundingClientRect().bottom + window.scrollY - offset
      }
    }

    const el = document.getElementById(slug)
    if (!el) return 0

    return el.getBoundingClientRect().top + window.scrollY - offset
  }

  useEffect(() => {
    const sectionEls = items
      .map((it) => document.getElementById(it.slug))
      .filter((el): el is HTMLElement => el !== null)

    if (!sectionEls.length) return

    const updateActive = () => {
      if (isJumpScrollingRef.current) return

      const line = getStickyOffset()
      let current = items[0].slug

      for (let i = 0; i < sectionEls.length; i++) {
        const el = sectionEls[i]

        if (i === 0) {
          if (el.getBoundingClientRect().top <= line) {
            current = el.id
          }
          continue
        }

        const prevBottom = sectionEls[i - 1].getBoundingClientRect().bottom
        if (prevBottom <= line) {
          current = el.id
        }
      }

      setActive((prev) => (prev === current ? prev : current))
    }

    let ticking = false
    const onScroll = () => {
      if (ticking) return
      ticking = true
      requestAnimationFrame(() => {
        updateActive()
        ticking = false
      })
    }

    updateActive()
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll, { passive: true })

    return () => {
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
    }
  }, [items])

  useLayoutEffect(() => {
    const nav = mobileStickyNavRef.current
    if (!nav) return

    const syncMobileNavHeight = () => {
      document.documentElement.style.setProperty(
        '--services-mobile-nav-height',
        `${nav.getBoundingClientRect().height}px`
      )
    }

    syncMobileNavHeight()
    const observer = new ResizeObserver(syncMobileNavHeight)
    observer.observe(nav)
    window.addEventListener('resize', syncMobileNavHeight, { passive: true })

    return () => {
      observer.disconnect()
      window.removeEventListener('resize', syncMobileNavHeight)
    }
  }, [])

  useEffect(() => {
    const nav = mobileNavRef.current
    if (!nav || !active) return

    const activeButton = nav.querySelector<HTMLButtonElement>(
      `[data-slug="${active}"]`
    )
    if (!activeButton) return

    const targetLeft =
      activeButton.offsetLeft -
      (nav.clientWidth - activeButton.clientWidth) / 2

    nav.scrollTo({
      left: Math.max(0, targetLeft),
      behavior: 'smooth',
    })
  }, [active])

  const scrollTo = (slug: string) => {
    const el = document.getElementById(slug)
    if (!el) return

    setActive(slug)
    isJumpScrollingRef.current = true

    const top = Math.max(0, getScrollTopForSlug(slug))
    window.scrollTo({ top, behavior: 'smooth' })

    window.setTimeout(() => {
      isJumpScrollingRef.current = false
    }, 700)
  }

  return (
    <main className="bg-white text-slate-900">
      {/* Header */}
      <header className="border-b text-white bg-linear-to-br from-black via-slate-900 to-sky-800 border-slate-200">
        <div className="site-container py-16 md:py-24 text-start">
          <p className="text-sm pt-10 sm:pt-20 font-semibold uppercase tracking-widest text-sky-300">
            Our Capabilities
          </p>
          <h1 className="mt-4 text-4xl font-bold tracking-tight md:text-5xl">
            Services that Move Your Roadmap Forward
          </h1>
          <p className="mt-4 max-w-3xl text-lg leading-relaxed text-gray-300">
            Explore how we design, build, and scale reliable products. We focus
            on clean typography, clear sections, and an index you can scan at a
            glance.
          </p>
        </div>
      </header>

      {/* Content */}
      <div className="site-container grid grid-cols-1 gap-x-12 py-16 lg:grid-cols-12">
        {/* Sticky Index (Desktop) */}
        <aside className="hidden lg:col-span-4 lg:block xl:col-span-3">
          <div className="sticky top-(--site-header-height)">
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

        {/* Mobile Sticky Navigation */}
        <nav
          ref={mobileStickyNavRef}
          aria-label="Services index"
          className="sticky top-(--site-header-height) z-40 -mx-4 border-b border-slate-200/80 bg-white px-4 py-3 backdrop-blur-md [box-shadow:0_4px_12px_-6px_rgba(0,0,0,0.06)] sm:-mx-6 sm:px-6 lg:hidden"
        >
          <div className="flex min-w-0 items-baseline gap-x-2">
            <span className="shrink-0 text-sm font-semibold tabular-nums text-[#0a61cb]">
              {String(activeItem.idx).padStart(2, '0')}
            </span>
            <p className="min-w-0 truncate text-sm font-semibold text-slate-900 text-balance">
              {activeItem.title}
            </p>
            <span className="ml-auto shrink-0 text-xs tabular-nums text-slate-400">
              {String(activeItem.idx).padStart(2, '0')}/{String(items.length).padStart(2, '0')}
            </span>
          </div>

          <div
            ref={mobileNavRef}
            className="mt-3 flex gap-1.5 overflow-x-auto overscroll-x-contain [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
          >
            {items.map((it) => {
              const isActive = active ? active === it.slug : it.idx === 1
              return (
                <button
                  key={it.slug}
                  type="button"
                  data-slug={it.slug}
                  onClick={() => scrollTo(it.slug)}
                  aria-current={isActive ? 'true' : undefined}
                  aria-label={it.title}
                  className={`shrink-0 rounded-full px-3 py-2 text-xs font-medium tabular-nums transition-[color,background-color,transform] duration-150 active:scale-[0.96] ${
                    isActive
                      ? 'bg-[#0a61cb] text-white'
                      : 'bg-slate-100 text-slate-600'
                  }`}
                >
                  {String(it.idx).padStart(2, '0')}
                </button>
              )
            })}
          </div>

          <div
            className="mt-3 h-0.5 overflow-hidden rounded-full bg-slate-100"
            role="progressbar"
            aria-valuenow={activeItem.idx}
            aria-valuemin={1}
            aria-valuemax={items.length}
            aria-label="Service progress"
          >
            <div
              className="h-full rounded-full bg-[#0a61cb] transition-[width] duration-300 ease-out"
              style={{ width: `${(activeItem.idx / items.length) * 100}%` }}
            />
          </div>
        </nav>

        {/* Sections */}
        <div className="mt-6 lg:col-span-8 lg:mt-0 xl:col-span-9">
          <div className="space-y-16">
            {items.map((it) => (
              <section
                key={it.slug}
                id={it.slug}
                className="scroll-mt-[calc(var(--site-header-height)+var(--services-mobile-nav-height))] lg:scroll-mt-(--site-header-height)"
              >
                <header className="max-w-3xl">
                  <p className="text-sm font-semibold uppercase tracking-widest text-slate-500">
                     {String(it.idx).padStart(2, '0')}
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
Our Solutions                    </h3>
                    <ul className="mt-3 space-y-2 text-base text-slate-700">
                      {it.whyItMatters.map((w, idx) => (
                        <li key={idx} className="flex items-start gap-3">
                          <span className="mt-2 block h-1.5 w-1.5 shrink-0 rounded-full bg-[#0a61cb]" />
                          <span>{w}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <h3 className="text-base font-semibold tracking-wide">
                        Outcomes
                    </h3>
                    <ul className="mt-3 space-y-2 text-base text-slate-700">
                      {it.useCases.map((u, idx) => (
                        <li key={idx} className="flex items-start gap-3">
                          <span className="mt-2 block h-1.5 w-1.5 shrink-0 rounded-full bg-[#0a61cb]" />
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
