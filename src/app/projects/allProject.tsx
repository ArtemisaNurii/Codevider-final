"use client"
import React, { useEffect, useRef, memo, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Image from 'next/image';
import Link from 'next/link';
import { useDataProcessingWorker } from '@/lib/hooks/useWebWorker';

gsap.registerPlugin(ScrollTrigger);

export interface CaseStudyCardProps {
  tag: string;
  title: string;
  description: string;
  imageUrl: string;
  layout?: 'image-top' | 'text-top';
  bgColor: string;
  textColor: string;
  tagBgColor: string;
  tagTextColor: string;
  border: string;
}

export interface CaseStudy extends CaseStudyCardProps {
  id: number;
}

const allCaseStudies: CaseStudy[] = [
  {
    id: 1,
    tag: 'HRTech',
    title: 'Simplitime — User & Employment Management Platform',
    description:
      "Simplitime centralizes the employee lifecycle: onboarding, contracts, time tracking, leave, and role-based permissions. Built for growing teams that need clean workflows and audit-ready records.",
    imageUrl:
      'https://images.unsplash.com/photo-1551836022-d5d88e9218df?q=80&w=1470&auto=format&fit=crop',
    layout: 'image-top',
    bgColor: 'bg-blue-200',
    textColor: 'text-white',
    tagBgColor: 'bg-white/30',
    tagTextColor: 'text-blue-900',
    border: 'border-md',
  },
  {
    id: 2,
    tag: 'ClimateTech',
    title: 'Straatos — Forest Carbon (CO₂) Management Platform',
    description:
      "Straatos streamlines MRV for forest carbon projects: satellite data ingestion, biomass estimations, credit tracking, and verification dashboards—helping teams quantify, report, and reduce CO₂ at scale.",
    imageUrl:
      'https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?q=80&w=1470&auto=format&fit=crop',
    layout: 'text-top',
    bgColor: 'bg-emerald-100',
    textColor: 'text-gray-900',
    tagBgColor: 'bg-emerald-200',
    tagTextColor: 'text-emerald-900',
    border: 'border-md',
  },
  {
    id: 3,
    tag: 'Fintech',
    title: 'Memcoin — Investing & Portfolio Platform',
    description:
      "Memcoin gives retail investors pro-grade tools: curated portfolios, risk scoring, real-time performance, and simple funding/withdrawals—wrapped in a compliant, user-friendly experience.",
    imageUrl:
      'https://images.unsplash.com/photo-1554224155-6726b3ff858f?q=80&w=1470&auto=format&fit=crop',
    layout: 'text-top',
    bgColor: 'bg-slate-900',
    textColor: 'text-white',
    tagBgColor: 'bg-slate-200',
    tagTextColor: 'text-slate-900',
    border: 'border-md',
  },
  {
    id: 4,
    tag: 'Enterprise AI',
    title: 'Noname — AI Policy Compliance Assistant',
    description:
      "Noname parses internal policies, answers employee questions in natural language, and flags outdated or conflicting docs—reducing HR/legal workload and improving compliance clarity.",
    imageUrl:
      'https://images.unsplash.com/photo-1519337265831-281ec6cc8514?q=80&w=1470&auto=format&fit=crop',
    layout: 'image-top',
    bgColor: 'bg-sky-200',
    textColor: 'text-cyan-900',
    tagBgColor: 'bg-cyan-900',
    tagTextColor: 'text-white',
    border: 'rounded-md',
  },
];


const CaseStudyCard: React.FC<CaseStudyCardProps> = memo(({
  tag,
  title,
  description,
  imageUrl,
  layout = 'image-top',
  bgColor,
  textColor,
  tagBgColor,
  tagTextColor,
  border,
}) => {
  const cardRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const cardElement = cardRef.current;
    if (!cardElement) return;

    gsap.fromTo(cardElement,
      {
        opacity: 0,
        y: 40,
      },
      {
        opacity: 1,
        y: 0,
        duration: 0.6,
        ease: "power2.out",
        scrollTrigger: {
          trigger: cardElement,
          start: "top 90%",
          toggleActions: "play none none none",
          once: true,
        }
      }
    );

    return () => {
      ScrollTrigger.getAll().forEach(trigger => {
        if (trigger.trigger === cardElement) {
          trigger.kill();
        }
      });
    };
  }, []);

  const TextComponent = (
    <div className={`p-8 md:p-10 ${bgColor} ${textColor}`}>
      <span 
        className={`inline-block text-xs font-bold tracking-wider uppercase px-3 py-1 rounded-full mb-4 ${tagBgColor} ${tagTextColor}`}
      >
        {tag}
      </span>
      <h3 className="text-3xl font-sans font-bold mb-4">
        {title}
      </h3>
      <p className="text-base leading-relaxed opacity-90 mb-8">
        {description}
      </p>
      <Link 
        href={`/projects/${title.toLowerCase().replace(/\s+/g, '-')}`} 
        className={`font-bold text-sm tracking-widest group ${textColor}`}
      >
        READ MORE{' '}
        <span className="inline-block transition-transform duration-300 group-hover:translate-x-2">{'>'}</span>
      </Link>
    </div>
  );

  return (
    <article 
      ref={cardRef} 
      className={`flex flex-col shadow-md overflow-hidden rounded-2xl ${border} transform-gpu will-change-transform hover:shadow-xl hover:-translate-y-2 hover:scale-[1.02] transition-all duration-300 ease-out group`}
    >
      {layout === 'image-top' ? (
        <>
          <div className="overflow-hidden">
            <Image
              src={imageUrl} 
              alt={title} 
              width={400}
              height={288}
              className="w-full h-72 object-cover font-sans transition-transform duration-300 ease-out group-hover:scale-105"
              priority={false}
              loading="lazy"
              placeholder="blur"
              blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAAIAAoDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAhEAACAQMDBQAAAAAAAAAAAAABAgMABAUGIWGRkqGx0f/EABUBAQEAAAAAAAAAAAAAAAAAAAMF/8QAGhEAAgIDAAAAAAAAAAAAAAAAAAECEgMRkf/aAAwDAQACEQMRAD8AltJagyeH0AthI5xdrLcNM91BF5pX2HaH9bcfaSXWGaRmknyJckliyjqTzSlT54b6bk+h0R//2Q=="
            />
          </div>
          {TextComponent}
        </>
      ) : (
        <>
          {TextComponent}
          <div className="overflow-hidden">
            <Image
              src={imageUrl} 
              alt={title} 
              width={400}
              height={288}
              className="w-full h-72 object-cover transition-transform duration-300 font-sans ease-out group-hover:scale-105"
              priority={false}
              loading="lazy"
              placeholder="blur"
              blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAAIAAoDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAhEAACAQMDBQAAAAAAAAAAAAABAgMABAUGIWGRkqGx0f/EABUBAQEAAAAAAAAAAAAAAAAAAAMF/8QAGhEAAgIDAAAAAAAAAAAAAAAAAAECEgMRkf/aAAwDAQACEQMRAD8AltJagyeH0AthI5xdrLcNM91BF5pX2HaH9bcfaSXWGaRmknyJckliyjqTzSlT54b6bk+h0R//2Q=="
            />
          </div>
        </>
      )}
    </article>
  );
});

CaseStudyCard.displayName = 'CaseStudyCard';

const ProjectPage: React.FC = memo(() => {
  const containerRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const categoriesRef = useRef<HTMLDivElement>(null);

  const [selectedCategory, setSelectedCategory] = useState('All');
  const [filteredStudies, setFilteredStudies] = useState<CaseStudy[]>(allCaseStudies);
  const [categories, setCategories] = useState<string[]>(['All']);
  
  const { filterProjects, processCategories, isLoading: isProcessing } = useDataProcessingWorker();

  // Process categories with Web Worker
  useEffect(() => {
    const loadCategories = async () => {
      try {
        const result = await processCategories(allCaseStudies) as { categories: string[] };
        setCategories(result.categories);
      } catch (error) {
        console.error('Category processing failed:', error);
        // Fallback to synchronous processing
        setCategories(['All', ...Array.from(new Set(allCaseStudies.map(c => c.tag)))]);
      }
    };

    loadCategories();
  }, [processCategories]);

  // Filter studies with Web Worker when category changes
  useEffect(() => {
    const filterStudies = async () => {
      try {
        if (selectedCategory === 'All') {
          setFilteredStudies(allCaseStudies);
        } else {
          const result = await filterProjects(allCaseStudies, { category: selectedCategory });
          setFilteredStudies(result as CaseStudy[]);
        }
      } catch (error) {
        console.error('Filtering failed:', error);
        // Fallback to synchronous filtering
        const filtered = selectedCategory === 'All'
          ? allCaseStudies
          : allCaseStudies.filter(study => study.tag === selectedCategory);
        setFilteredStudies(filtered);
      }
    };

    filterStudies();
  }, [selectedCategory, filterProjects]);
  
  const leftColumnCases = filteredStudies.filter((_, index) => index % 2 === 0);
  const rightColumnCases = filteredStudies.filter((_, index) => index % 2 !== 0);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, []);

  useEffect(() => {
    if (titleRef.current && subtitleRef.current && categoriesRef.current) {
      const tl = gsap.timeline({ delay: 0.1 });
      
      tl.fromTo(titleRef.current,
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 0.6, ease: "power2.out" }
      )
      .fromTo(subtitleRef.current,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.5, ease: "power2.out" },
        "-=0.4"
      )
      .fromTo(categoriesRef.current.children,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.5, ease: "power2.out", stagger: 0.1 },
        "-=0.3"
      );
    }

    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);

  return (
    <div className="bg-white font-sans will-change-scroll"> 
      <div className="p-6" />
      <div ref={containerRef} className="container mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24">
        <h1 
          ref={titleRef} 
          className="text-5xl pt-10 font-bold text-gray-900 mb-6 will-change-transform"
        >
          Case Studies
        </h1>
        <p 
          ref={subtitleRef} 
          className="text-gray-700 max-w-3xl will-change-transform"
        >
          Dive into our case studies to see how we have tackled unique challenges, crafted tailored strategies, and delivered impactful results across industries. Each story highlights our process from insight and design to execution and measurable success.
        </p>

        <div ref={categoriesRef} className="flex flex-wrap gap-3 my-12">
          {categories.map(category => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-4 py-2 text-sm font-semibold rounded-full transition-all duration-300 ease-out border-2 ${
                selectedCategory === category
                  ? 'bg-gray-900 text-white border-gray-900'
                  : 'bg-white text-gray-700 border-gray-200 hover:border-gray-900 hover:text-gray-900'
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
          <div className="space-y-8 md:space-y-12">
            {leftColumnCases.map((study) => (
              <CaseStudyCard key={study.id} {...study} />
            ))}
          </div>

          <div className="space-y-8 md:space-y-12 md:mt-0 lg:mt-24">
            {rightColumnCases.map((study) => (
              <CaseStudyCard key={study.id} {...study} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
});

ProjectPage.displayName = 'ProjectPage';

export default ProjectPage;