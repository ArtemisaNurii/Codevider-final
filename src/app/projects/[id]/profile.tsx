"use client";
import React, { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  CheckCircleIcon,
  ChartPieIcon,
  UsersIcon,
  WrenchScrewdriverIcon,
} from "@heroicons/react/24/outline";

// Register GSAP plugin once globally
gsap.registerPlugin(ScrollTrigger);
 
// --- INTERFACES & DATA (No changes needed) ---
interface CaseStudyHeroProps {
    title: string;
    subtitle: string;
}

interface KeyMetric {
  icon: React.ElementType;
  value: string;
  label: string;
}

interface ProjectInfoData {
  client: string;
  industry: string;
  services: string[];
}

interface CaseStudyContentSectionData {
  title: string;
  id: "context" | "solution" | "results";
  paragraphs: string[];
  listItems?: string[];
}

interface CaseStudy {
  id: number;
  slug: string;
  heroImage: string;
  title: string;
  subtitle: string;
  keyMetrics: KeyMetric[];
  projectInfo: ProjectInfoData;
  content: CaseStudyContentSectionData[];
}

const caseStudyData: CaseStudy = {
  id: 2,
  slug: "platform-upgrade-nonprofit-education",
  title: "Platform upgrade for a nonprofit education & research organization",
  subtitle:
    "We helped the customer ensure their platform's stability to sustain 50% user base growth and minimize its maintenance costs by making it more future-proof.",
  heroImage:
    "https://images.unsplash.com/photo-1586936893354-362ad6ae47ba?q=80&w=1740&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  keyMetrics: [
    { icon: ChartPieIcon, value: "-60%", label: "Page Load Time" },
    { icon: UsersIcon, value: "+200%", label: "Concurrent User Capacity" },
    { icon: WrenchScrewdriverIcon, value: "-40%", label: "Maintenance Costs" },
  ],
  projectInfo: {
    client: "Global Sustainability Institute",
    industry: "Nonprofit & Education",
    services: ["Web App Modernization", "Cloud Migration (AWS)", "UI/UX Enhancements"],
  },
  content: [
    {
      title: "Context",
      id: "context",
      paragraphs: [
        "Our customer is an education and research-focused organization operating as a nonprofit. Their primary area of work centers on sustainable development, with an emphasis on planning and engineering within urban environments. Since its founding in 2007, the organization has provided tools, resources, and strategic guidance to help global communities build more resilient and sustainable infrastructures.",
        "To support these efforts, the customer has a platform designed to evaluate the sustainability and resilience of infrastructure systems. It also supports the company's other key activities, including:",
      ],
      listItems: [
        "Offering education and training on sustainability topics",
        "Evaluating and rating infrastructure initiatives",
        "Operating a membership program that provides access to resources, professional development, and project validation services",
      ],
    },
    {
      title: "Solution",
      id: "solution",
      paragraphs: [
        "As part of their growth strategy, the customer sought to upgrade their platform to support a larger user base and increasing system demands. They chose Itransition based on our expertise in web application development for education and nonprofit sectors to ensure the platform's scalability and reliable performance.",
        "Our team performed a comprehensive architectural review and proposed a migration to a modern, microservices-based architecture. We rebuilt the core application using Node.js and React, deploying it on AWS for enhanced scalability and reliability. This involved a phased rollout to minimize disruption for existing users.",
      ],
    },
    {
      title: "Results",
      id: "results",
      paragraphs: [
        "The newly architected platform successfully launched with zero downtime. The modern tech stack and scalable infrastructure immediately improved performance, with page load times decreasing by an average of 60%.",
        "The new system is now capable of handling a 200% increase in concurrent users, far exceeding the initial 50% growth target. The customer also reported a 40% reduction in maintenance overhead, allowing them to redirect resources towards new educational programs and community initiatives.",
      ],
    },
  ],
};


// --- REFACTORED COMPONENTS ---

// 1. Case Study Hero - Improved responsiveness with fixed heights
const CaseStudyHero: React.FC<CaseStudyHeroProps> = ({ title, subtitle }) => (
    <header className="relative flex h-[400px] md:h-[450px] flex-col justify-end p-6 md:p-8 lg:p-12 text-white">
      <div className="absolute inset-0 bg-gradient-to-br from-black via-slate-900 to-sky-800" />
      <div className="absolute inset-0 bg-black/40" />
  
      <div className="relative z-10 max-w-4xl mx-auto w-full">
        <span className="mb-2 block text-sm font-semibold uppercase tracking-widest text-sky-400">
          Case Study
        </span>
        <h1 className="font-sans text-2xl sm:text-3xl md:text-4xl font-semibold leading-tight">
          {title}
        </h1>
        <p className="mt-4 max-w-2xl text-base sm:text-lg text-sky-200">
          {subtitle}
        </p>
      </div>
    </header>
  );
  
// 2. Key Metrics Bar - Better spacing on mid-size screens
const KeyMetricsBar = ({ metrics }: { metrics: KeyMetric[] }) => (
  <div className="bg-slate-50 border-b border-slate-200">
    {/* Use justify-around for more even spacing that adapts better */}
    <div className="mx-auto flex max-w-7xl justify-around gap-4 px-4 py-6 sm:py-8 lg:px-8">
      {metrics.map((metric) => (
        <div key={metric.label} className="text-center flex-1 min-w-[100px] lg:flex-none">
          <metric.icon className="mx-auto h-7 w-7 sm:h-8 sm:w-8 text-sky-500" aria-hidden="true" />
          <p className="mt-2 text-xl sm:text-2xl font-bold tracking-tight text-sky-800">{metric.value}</p>
          <p className="text-xs sm:text-sm font-medium text-gray-700">{metric.label}</p>
        </div>
      ))}
    </div>
  </div>
);

// 3. Project Info Card
const ProjectInfo = ({ info }: { info: ProjectInfoData }) => (
  <div className="rounded-lg border border-slate-200 bg-white p-6">
    <h3 className="text-lg font-semibold text-sky-800">Project at a Glance</h3>
    <dl className="mt-4 space-y-4 text-sm">
      <div>
        <dt className="font-medium text-gray-700">Client</dt>
        <dd className="mt-1 text-gray-700">{info.client}</dd>
      </div>
      <div>
        <dt className="font-medium text-gray-700">Industry</dt>
        <dd className="mt-1 text-gray-700">{info.industry}</dd>
      </div>
      <div>
        <dt className="font-medium text-gray-700">Services</dt>
        <dd className="mt-1 text-gray-700">{info.services.join(", ")}</dd>
      </div>
    </dl>
  </div>
);

// 4. Table of Contents (Desktop)
const TableOfContents = ({ sections, activeSection }: { sections: { id: string; title: string }[]; activeSection: string }) => (
  <aside className="sticky top-24 h-fit">
    <h3 className="mb-3 text-sm font-semibold uppercase tracking-wider text-gray-700">
      On This Page
    </h3>
    <ul className="space-y-2">
      {sections.map((section) => (
        <li key={section.id}>
          <a
            href={`#${section.id}`}
            className={`flex items-center rounded-md px-3 py-2 text-sm transition-all duration-200 ${
              activeSection === section.id
                ? "bg-sky-50 font-semibold text-sky-700"
                : "text-gray-700 hover:bg-slate-100 hover:text-sky-700"
            }`}
          >
            {section.title}
          </a>
        </li>
      ))}
    </ul>
  </aside>
);

// 5. Main Content Section - Now accepts an `isLast` prop
const ContentSection = React.forwardRef<HTMLElement, { section: CaseStudyContentSectionData, isLast?: boolean }>(
    ({ section, isLast = false }, ref) => (
      <section ref={ref} id={section.id} className="scroll-mt-24 content-section">
        <h2 className="font-serif text-2xl md:text-3xl font-bold text-gray-700">{section.title}</h2>
        <div className="prose prose-slate mt-4 max-w-none prose-p:text-slate-700 prose-li:my-1">
          {section.paragraphs.map((p, i) => <p key={i}>{p}</p>)}
          {section.listItems && (
            <ul className="mt-5">
              {section.listItems.map((item, i) => (
                <li key={i} className="flex items-start mb-2">
                  <CheckCircleIcon className="mr-3 mt-1 h-5 w-5 flex-shrink-0 text-sky-500" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          )}
        </div>
        {/* KEY CHANGE: Only render the divider if it's NOT the last section */}
        {!isLast && <hr className="my-10 sm:my-12 lg:my-16 border-slate-200" />}
      </section>
    )
);
ContentSection.displayName = "ContentSection";

// 6. Call To Action
const CallToAction = () => (
    <div className="bg-white">
        <div className="mx-auto max-w-4xl py-12 px-6 text-center sm:py-16 lg:py-20">
            <h2 className="font-serif text-2xl sm:text-3xl font-bold tracking-tight text-gray-700">
                Have a similar challenge?
            </h2>
            <p className="mt-4 text-base sm:text-lg leading-7 text-gray-700 max-w-2xl mx-auto">
                Lets discuss how we can apply our expertise to elevate your project. We specialize in creating robust, scalable, and user-friendly digital solutions.
            </p>
            <div className="mt-8">
            <button 
              className="inline-flex items-center justify-center rounded-md border  bg-inherit px-8 py-3 text-base font-medium text-black border-slate-700 shadow-sm hover:bg-slate-900  hover:text-white transition-colors"
              onClick={() => (window.location.href = "mailto:hr@codevider.com")}
            >
              Lets Talk
            </button>
            </div>
        </div>
    </div>
);


// --- MAIN PAGE COMPONENT ---
const ProjectProfile: React.FC = () => {
  const [activeSection, setActiveSection] = useState<string>(caseStudyData.content[0].id);
  const sectionRefs = useRef<(HTMLElement | null)[]>([]);

  useEffect(() => {
    const triggers = sectionRefs.current.map((section, index) => {
      if (!section) return null;
      return ScrollTrigger.create({
        trigger: section,
        start: "top 50%",
        end: "bottom 50%",
        onEnter: () => setActiveSection(caseStudyData.content[index].id),
        onEnterBack: () => setActiveSection(caseStudyData.content[index].id),
      });
    });

    gsap.fromTo(
      ".content-section",
      { autoAlpha: 0, y: 50 },
      {
        autoAlpha: 1, y: 0, duration: 0.8, ease: "power3.out", stagger: 0.2,
        scrollTrigger: { trigger: ".main-content-area", start: "top 80%", toggleActions: "play none none none" }
      }
    );

    return () => {
        triggers.forEach(trigger => trigger?.kill());
    }
  }, []);

  return (
    <main className="bg-white font-sans">
      <CaseStudyHero
        title={caseStudyData.title}
        subtitle={caseStudyData.subtitle}
      />
      <KeyMetricsBar metrics={caseStudyData.keyMetrics} />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pt-10 pb-12 sm:pt-12 sm:pb-16 lg:pt-16 lg:pb-20">
        <div className="flex flex-col lg:flex-row lg:gap-12">

          {/* Sidebar: Appears second on mobile (using order), first on desktop */}
          <aside className="w-full lg:w-1/4 lg:order-1">
              <ProjectInfo info={caseStudyData.projectInfo} />
              <div className="hidden lg:block mt-8">
                <TableOfContents sections={caseStudyData.content} activeSection={activeSection} />
              </div>
          </aside>
          
          <article className="w-full lg:w-3/4 main-content-area mt-10 lg:mt-0 lg:order-2">
            {caseStudyData.content.map((section, index) => (
              <ContentSection
                key={section.id}
                section={section}
                // Pass the isLast prop to conditionally render the <hr>
                isLast={index === caseStudyData.content.length - 1}
                ref={(el) => { sectionRefs.current[index] = el; }}
              />
            ))}
          </article>

        </div>
      </div>
      <CallToAction />
    </main>
  );
};

export default ProjectProfile;