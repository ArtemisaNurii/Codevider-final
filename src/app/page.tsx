'use client';

import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
// --- Import your components as before ---
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

  return (
    <div className="min-h-dvh bg-black">
      <AnimatePresence>
        {/* The Loader remains the same, it will exit gracefully */}
        {isLoading && (
          <motion.div key="loader">
            <Loader onLoadingComplete={() => setIsLoading(false)} />
          </motion.div>
        )}
      </AnimatePresence>
      
      {/* 
        Render the main content OUTSIDE the AnimatePresence logic for the loader.
        This content will mount instantly when `isLoading` becomes false.
        We pass a prop `isReady` to Hero to trigger its internal GSAP animation.
      */}
      {!isLoading && (
        <>
          <Header />
          <main id="home">
            <Hero isReady={!isLoading} /> {/* Pass the ready signal */}
            
            {/* The rest of your content remains the same */}
            <ScrollReveal delay={0.1}><Metrics /></ScrollReveal>
            <ScrollReveal delay={0.1}><ServicesPage /></ScrollReveal>
            <ScrollReveal delay={0.1}><Industries /></ScrollReveal>
            <ScrollReveal delay={0.1}><Outsource /></ScrollReveal>
            <ScrollReveal delay={0.1}><WorldMapDemo /></ScrollReveal>
            <ScrollReveal delay={0.1}><CaseStudiesSection /></ScrollReveal>
            <ScrollReveal delay={0.1}><TestimonialsPage /></ScrollReveal>
            <ScrollReveal delay={0.1}><Faq /></ScrollReveal>
            <Contact />
          </main>
        </>
      )}
    </div>
  );
}