"use client"


import React, { useState, useEffect, useRef } from 'react';

// Type definitions
interface IntersectionObserverOptions {
  threshold?: number;
  rootMargin?: string;
  root?: Element | null;
}

interface ProcessStepProps {
  step: string;
  title: string;
  description: string;
  delay?: number;
}

interface StepData {
  step: string;
  title: string;
  description: string;
}

const useIntersectionObserver = (options: IntersectionObserverOptions = {}) => {
  const [hasAnimated, setHasAnimated] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting && !hasAnimated) {
        setHasAnimated(true);
      }
    }, {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px',
      ...options,
    });

    const currentRef = ref.current;
    if (currentRef) {
      observer.observe(currentRef);
    }

    return () => {
      if (currentRef) {
        observer.unobserve(currentRef);
      }
    };
  }, [hasAnimated, options]);

  return { ref, hasAnimated };
};

// Define the data for the steps.
const stepsData: Record<number, StepData> = {
  1: {
    step: "Step 1",
    title: "Discovery & Needs",
    description: "We start by understanding your vision. Stakeholder interviews and product-vision canvas sessions align goals and metrics.",
  },
  2: {
    step: "Step 2",
    title: "Team Selection",
    description: "The perfect team, assembled for you. We match our developer skills and expertise directly to your project requirements.",
  },
  3: {
    step: "Step 3",
    title: "Development",
    description: "Where the magic happens. Our developers work diligently, crafting high-quality, clean code for your project.",
  },
  4: {
    step: "Step 4",
    title: "Agile Reporting",
    description: "Stay in the loop, always. We use CI/CD, code reviews, daily stand-ups, and weekly reports to ensure transparency.",
  },
  5: {
    step: "Step 5",
    title: "Deployment",
    description: "Going live, smoothly. We provide a staging server for testing and deploy clean, optimized code to your servers.",
  },
  6: {
    step: "Step 6",
    title: "Maintenance",
    description: "We’re with you for the long haul. You can continue with the same team for consistent productivity and support.",
  },
};

// A reusable component for each individual process step
const ProcessStep: React.FC<ProcessStepProps> = ({ step, title, description, delay = 0 }) => {
  const { ref: stepRef, hasAnimated } = useIntersectionObserver();

  return (
    <div 
      ref={stepRef}
      className={`transition-all duration-700 transform ${
        hasAnimated 
          ? 'translate-y-0 opacity-100' 
          : 'translate-y-8 opacity-0'
      }`}
      style={{ 
        transitionDelay: hasAnimated ? `${delay}ms` : '0ms',
      }}
    >
      <p className="text-sm md:text-base lg:text-lg font-semibold text-sky-700 tracking-[0.2em] uppercase">{step}</p>
      <h3 className="text-base md:text-lg lg:text-lg font-semibold text-gray-700 uppercase tracking-wider mt-4 mb-3">{title}</h3>
      {/* The short blue divider line */}
      <div className="border-b border-[#38bdf8] w-1/4 mb-4"></div>
      <p className="text-gray-700 text-sm md:text-base lg:text-md leading-relaxed">{description}</p>
    </div>
  );
};

const Processes = () => {
  return (
    <section id="process" className="font-sans  text-gray-900  bg-white max-sm:pt-10  pb-20">
      <div className='p-10 max-sm:p-0'></div>
      <div className="container mx-auto  max-w-7xl">
        
        {/* Header Section (03 Removed) */}
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-12 items-start mb-20">
          <div className="lg:col-span-2">
            <h2 className="text-4xl sm:text-5xl  font-semibold  leading-tight">
              Process
            </h2>
          </div>
          <div className="lg:col-span-3 text-gray-700 text-base md:text-lg lg:text-xl leading-relaxed space-y-4 pt-2">
          <p>
  Our clients’ needs guide every step. We begin with a hands‑on discovery phase-aligning on goals, defining the product vision, and documenting core assumptions in a shared worksheet.
</p>


          </div>
        </div>

        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-x-8 gap-y-16">
          
          {/* Column 1: Step 1 */}
          <div className="space-y-16">
            <ProcessStep {...stepsData[1]} />
          </div>

          {/* Column 2: Step 2 and Step 4 */}
          <div className="space-y-16">
            <ProcessStep {...stepsData[2]} />
            <ProcessStep {...stepsData[4]} />
          </div>

          {/* Column 3: Step 3, Step 5, and Step 6 */}
          <div className="space-y-16">
            <ProcessStep {...stepsData[3]} />
            <ProcessStep {...stepsData[5]} />
            <ProcessStep {...stepsData[6]} />
          </div>

        </div>
      </div>
      <div className='p-12'></div>
    </section>
  );
};

export default Processes;