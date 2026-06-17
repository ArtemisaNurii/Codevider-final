'use client';

import { lazy, Suspense, type ComponentType } from "react"
import Hero from "./components/HeroSection";
import ScrollReveal, { type AnimationVariant } from "./components/ScrollReveal";

const Metrics = lazy(() => import("./components/Metrics"))
const Industries = lazy(() => import("./components/Industries"))
const Outsource = lazy(() => import("./components/Outsource"))
const WorldMapDemo = lazy(() => import("./components/WorldMap"))
const CaseStudiesSection = lazy(() => import("./components/CaseStudies"))
const Faq = lazy(() => import("./components/Faq"))
const Contact = lazy(() => import("./components/CTA"))

type HomepageSection = {
  id: string
  Component: ComponentType
  variant: AnimationVariant
  amount?: number
}

const HOMEPAGE_SECTIONS: HomepageSection[] = [
  { id: "metrics", Component: Metrics, variant: "fadeUp" },
  { id: "industries", Component: Industries, variant: "fadeUp" },
  { id: "outsource", Component: Outsource, variant: "scaleUp" },
  { id: "world-map", Component: WorldMapDemo, variant: "fadeIn", amount: 0.05 },
  { id: "case-studies", Component: CaseStudiesSection, variant: "fadeUp" },
  { id: "faq", Component: Faq, variant: "fadeUp" },
  { id: "contact", Component: Contact, variant: "fadeUp" },
]

const SectionLoader = () => (
  <div
    className="flex min-h-[clamp(12rem,35vh,20rem)] items-center justify-center"
    role="status"
    aria-label="Loading section"
  >
    <div className="size-6 animate-spin rounded-full border-2 border-blue-500 border-t-transparent motion-reduce:animate-none" />
  </div>
)

function LazySection({ Component, variant, amount }: Omit<HomepageSection, "id">) {
  return (
    <ScrollReveal variant={variant} amount={amount}>
      <Suspense fallback={<SectionLoader />}>
        <Component />
      </Suspense>
    </ScrollReveal>
  )
}

export default function Home() {
  return (
    <div className="min-h-dvh">
      <main id="home">
        <Hero />
        {HOMEPAGE_SECTIONS.map(({ id, ...section }) => (
          <LazySection key={id} {...section} />
        ))}
      </main>
    </div>
  );
}
