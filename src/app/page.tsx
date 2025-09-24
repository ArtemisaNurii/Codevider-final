'use client';

import CaseStudiesSection from "./components/CaseStudies";
import Faq from "./components/Faq";
import Hero from "./components/HeroSection";
import Industries from "./components/Industries";
import Header from "./components/navbar";
import Outsource from "./components/Outsource";
import ServicesPage from "./components/Services";
// import TestimonialsPage from "./components/Testimoonials";
import WorldMapDemo from "./components/WorldMap";
import ScrollReveal from "./components/ScrollReveal";
import Metrics from "./components/Metrics";
import Contact from './components/CTA';

export default function Home() {
  return (
    <div className="min-h-dvh bg-black">
      <Header />
      <main id="home">
        <Hero />
        <ScrollReveal delay={0.1}><Metrics /></ScrollReveal>
        <ScrollReveal delay={0.1}><ServicesPage /></ScrollReveal>
        <ScrollReveal delay={0.1}><Industries /></ScrollReveal>
        <ScrollReveal delay={0.1}><Outsource /></ScrollReveal>
        <ScrollReveal delay={0.1}><WorldMapDemo /></ScrollReveal>
        <ScrollReveal delay={0.1}><CaseStudiesSection /></ScrollReveal>
        {/* <ScrollReveal delay={0.1}><TestimonialsPage /></ScrollReveal> */}
        <ScrollReveal delay={0.1}><Faq /></ScrollReveal>
        <Contact />
      </main>
    </div>
  );
}