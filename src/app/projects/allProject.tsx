"use client"
import React, { useEffect, useRef, memo } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Image from 'next/image';
import Link from 'next/link';

// Register GSAP plugins
gsap.registerPlugin(ScrollTrigger);

export interface CaseStudyCardProps {
  tag: string;
  title: string;
  description: string;
  imageUrl: string;
  layout?: 'image-top' | 'text-top'; // Optional prop with a default
  bgColor: string;                   // e.g., 'bg-white'
  textColor: string;                 // e.g., 'text-gray-900'
  tagBgColor: string;                // e.g., 'bg-blue-500'
  tagTextColor: string;              // e.g., 'text-white'
  border: string;
}

// Extend the card props to include a unique ID for the data array
export interface CaseStudy extends CaseStudyCardProps {
  id: number;
}

// Static data to prevent recreation on each render
const leftColumnCases: CaseStudy[] = [
  {
    id: 1,
    tag: 'PRODUCT DESIGN',
    title: "Streamline remote hiring with Pangea.ai's marketplace",
    description: "Struggling to find the perfect software development partner? Pangea.ai cuts through the noise. The platform connects businesses with elite development firms, ensuring a perfect match for your project.",
    imageUrl: 'https://images.unsplash.com/photo-1589361580298-73eaccc5fd96?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D', // Using an exact crop from your image
    layout: 'image-top',
    bgColor: 'bg-cyan-900',
    textColor: 'text-white',
    tagBgColor: 'bg-sky-200',
    tagTextColor: 'text-cyan-900',
    border: 'border-md'
  },
  {
    id: 2,
    tag: 'PRODUCT DESIGN',
    title: 'Java SDK for Security-Sensitive Products',
    description: 'The project focused on the development of a specialized and security-sensitive Java Software Development Kit (SDK). The SDK\'s primary purpose was to expose APIs for various functions while...',
    imageUrl: 'https://images.unsplash.com/photo-1589361580298-73eaccc5fd96?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D', // Using an exact crop from your image
    layout: 'image-top',
    bgColor: 'bg-blue-200',
    textColor: 'text-gray-900',
    tagBgColor: 'bg-sky-900',
    tagTextColor: 'text-white',
    border: 'border-md'
  },
];

const rightColumnCases: CaseStudy[] = [
  {
    id: 4,
    tag: 'PRODUCT DESIGN',
    title: 'The Imperative of Security',
    description: 'A deep dive into the security protocols and measures essential for modern software applications, ensuring data integrity and user trust from the ground up.',
    imageUrl: 'https://images.unsplash.com/photo-1542744095-70fccefd4b65?q=80&w=1401&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D', // Cropped image, but a placeholder could work better
    layout: 'text-top',
    bgColor: 'bg-sky-200',
    textColor: 'text-cyan-800',
    tagBgColor: 'bg-green-100',
    tagTextColor: 'text-green-800',
    border: 'rounded-md'
  },
  {
    id: 3,
    tag: 'PRODUCT DESIGN',
    title: 'Empowering Access to Fresh Produce: Building a Mobile App for Source.ag',
    description: "Source.ag is an Amsterdam-based agtech startup that is revolutionizing access to fresh produce using cutting-edge AI-powered greenhouses. By enabling efficient operations for growers through pioneering...",
    imageUrl: 'https://images.unsplash.com/photo-1542744095-0d53267d353e?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D', // Using an exact crop from your image
    layout: 'text-top',
    bgColor: 'bg-emerald-200',
    textColor: 'text-green-800',
    tagBgColor: 'bg-sky-100',
    tagTextColor: 'text-green-800',
    border: 'border-md'
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

    // Simplified animation - only animate opacity and transform
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
          once: true, // Only animate once for performance
        }
      }
    );

    // Cleanup
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
        className={`inline-block text-xs font-bold  tracking-wider uppercase px-3 py-1 rounded-full mb-4 ${tagBgColor} ${tagTextColor}`}
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
        href="/projects/1" 
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

// Add display name for better debugging
CaseStudyCard.displayName = 'CaseStudyCard';

const ProjectPage: React.FC = memo(() => {
  const containerRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);

  useEffect(() => {
    // Scroll to top on mount
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, []);

  useEffect(() => {
    // Simplified animations for better performance
    if (titleRef.current && subtitleRef.current) {
      // Use a single timeline for better performance
      const tl = gsap.timeline({ delay: 0.1 });
      
      tl.fromTo(titleRef.current,
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 0.6, ease: "power2.out" }
      )
      .fromTo(subtitleRef.current,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.5, ease: "power2.out" },
        "-=0.3"
      );
    }

    // Cleanup
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
          className="text-5xl pt-10 font-bold text-gray-900 mb-16 sm:mb-24 will-change-transform"
        >
          Case Studies
        </h1>
        <p 
          ref={subtitleRef} 
          className="text-gray-700 pb-10 will-change-transform"
        >
          Dive into our case studies to see how we have tackled unique challenges, crafted tailored strategies, and delivered impactful results across industries. Each story highlights our process from insight and design to execution and measurable success.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
          {/* Left Column */}
          <div className="space-y-8 md:space-y-12">
            {leftColumnCases.map((study) => (
              <CaseStudyCard key={study.id} {...study} />
            ))}
          </div>

          {/* Right Column (Staggered to create the masonry effect) */}
          <div className="space-y-8 md:space-y-12 md:mt-24">
            {rightColumnCases.map((study) => (
              <CaseStudyCard key={study.id} {...study} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
});

// Add display name for better debugging
ProjectPage.displayName = 'ProjectPage';

export default ProjectPage;