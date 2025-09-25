'use client';

import { lazy, Suspense } from "react"
import Hero from "./components/HeroSection";
import Header from "./components/navbar";
import ScrollReveal from "./components/ScrollReveal";

// Lazy load components that are below the fold
const Metrics = lazy(() => import("./components/Metrics"))
const ServicesPage = lazy(() => import("./components/Services"))
const Industries = lazy(() => import("./components/Industries"))
const Outsource = lazy(() => import("./components/Outsource"))
const WorldMapDemo = lazy(() => import("./components/WorldMap"))
const CaseStudiesSection = lazy(() => import("./components/CaseStudies"))
const Faq = lazy(() => import("./components/Faq"))
const Contact = lazy(() => import("./components/CTA"))

// Loading component for better UX
const SectionLoader = () => (
  <div className="min-h-[200px] flex items-center justify-center">
    <div className="w-6 h-6 border-2 border-blue-500 border-t-transparent rounded-full animate-spin" />
  </div>
)

export default function Home() {
  return (
    <div className="min-h-dvh bg-black">
      <Header />
      <main id="home">
        <Hero />
        <ScrollReveal delay={0.1}>
          <Suspense fallback={<SectionLoader />}>
            <Metrics />
          </Suspense>
        </ScrollReveal>
        <ScrollReveal delay={0.1}>
          <Suspense fallback={<SectionLoader />}>
            <ServicesPage />
          </Suspense>
        </ScrollReveal>
        <ScrollReveal delay={0.1}>
          <Suspense fallback={<SectionLoader />}>
            <Industries />
          </Suspense>
        </ScrollReveal>
        <ScrollReveal delay={0.1}>
          <Suspense fallback={<SectionLoader />}>
            <Outsource />
          </Suspense>
        </ScrollReveal>
        <ScrollReveal delay={0.1}>
          <Suspense fallback={<SectionLoader />}>
            <WorldMapDemo />
          </Suspense>
        </ScrollReveal>
        <ScrollReveal delay={0.1}>
          <Suspense fallback={<SectionLoader />}>
            <CaseStudiesSection />
          </Suspense>
        </ScrollReveal>
        <ScrollReveal delay={0.1}>
          <Suspense fallback={<SectionLoader />}>
            <Faq />
          </Suspense>
        </ScrollReveal>
        <Suspense fallback={<SectionLoader />}>
          <Contact />
        </Suspense>
      </main>
    </div>
  );
}