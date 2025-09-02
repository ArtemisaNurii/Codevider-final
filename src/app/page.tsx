'use client';

import { useState, useEffect, useRef } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import CaseStudiesSection from "./components/CaseStudies";
import Faq from "./components/Faq";
import Hero from "./components/HeroSection";
import Industries from "./components/Industries";
import Header from "./components/navbar";
import Outsource from "./components/Outsource";
import ServicesPage from "./components/Services";
import TestimonialsPage from "./components/Testimoonials";
import WorldMapDemo from "./components/WorldMap";
import ScrollReveal from "./components/ScrollReveal";
import Metrics from "./components/Metrics";
import Contact from './components/CTA';
import Loader from './components/Loader/loader';

export default function Home() {
  const [isLoading, setIsLoading] = useState(true);
  const [showContent, setShowContent] = useState(false);

  // keep this in sync with Loader's exit duration (500ms there)
  const EXIT_DELAY_MS = 550;
  const exitTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const handleLoadingComplete = () => {
    // 1) trigger loader exit
    setIsLoading(false);
    // 2) wait for the exit animation to finish, THEN reveal the page
    if (exitTimerRef.current) clearTimeout(exitTimerRef.current);
    exitTimerRef.current = setTimeout(() => setShowContent(true), EXIT_DELAY_MS);
  };

  // lock scrolling & keep black bg until content is visible
  useEffect(() => {
    const lock = !showContent; // locked while loader is on OR fading out
    const html = document.documentElement;
    const body = document.body;

    if (lock) {
      html.style.overflow = 'hidden';
      body.style.overflow = 'hidden';
      body.style.backgroundColor = '#000000';
    } else {
      html.style.overflow = '';
      body.style.overflow = '';
      body.style.backgroundColor = '';
    }

    return () => {
      html.style.overflow = '';
      body.style.overflow = '';
    };
  }, [showContent]);

  useEffect(() => {
    return () => {
      if (exitTimerRef.current) clearTimeout(exitTimerRef.current);
    };
  }, []);

  return (
    <div className="min-h-dvh bg-black">
      <Loader
        isLoading={isLoading}
        onLoadingComplete={handleLoadingComplete}
      />

      <AnimatePresence initial={false} mode="wait">
        {showContent && (
          <motion.div
            key="content"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }} // (not used here but nice to keep)
            transition={{ duration: 0, ease: 'easeOut' }}
          >
            <Header />
            <main id="home">
              <Hero />

              <ScrollReveal delay={0.1}>
                <Metrics />
              </ScrollReveal>

              <ScrollReveal delay={0.1}>
                <ServicesPage />
              </ScrollReveal>

              <ScrollReveal delay={0.1}>
                <Industries />
              </ScrollReveal>

              <ScrollReveal delay={0.1}>
                <Outsource />
              </ScrollReveal>

              <ScrollReveal delay={0.1}>
                <WorldMapDemo />
              </ScrollReveal>

              <ScrollReveal delay={0.1}>
                <CaseStudiesSection />
              </ScrollReveal>

              <ScrollReveal delay={0.1}>
                <TestimonialsPage />
              </ScrollReveal>

              <ScrollReveal delay={0.1}>
                <Faq />
              </ScrollReveal>

              <Contact />
            </main>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
