'use client';

import { useState, useEffect } from 'react';
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
import CodeviderLoader from "./components/Loader/loader";
import Contact from './components/CTA';

export default function Home() {
  const [isLoading, setIsLoading] = useState(true);
  const [showContent, setShowContent] = useState(false);

  const handleLoadingComplete = () => {
    setIsLoading(false);
    setShowContent(true);
  };

  useEffect(() => {
    if (isLoading) {
      document.body.style.overflow = 'hidden';
      document.body.style.backgroundColor = '#000000';
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isLoading]);

  return (
    <div className="min-h-screen bg-black">
      <CodeviderLoader 
        isLoading={isLoading} 
        onLoadingComplete={handleLoadingComplete} 
      />

      <AnimatePresence>
        {showContent && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.2, ease: 'easeOut' }}
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
