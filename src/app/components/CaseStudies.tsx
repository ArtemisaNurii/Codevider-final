"use client";

import React, { useRef, useLayoutEffect } from "react";
import { AlignEndHorizontal, ArrowRight } from "lucide-react";
import { useRouter } from "next/navigation";
import { shouldSkipScrollAnimation } from "@/lib/hooks/useScrollRevealMode";
import { StaggerContainer, StaggerItem } from "./ScrollReveal";

const splitTextIntoWords = (text: string) => {
  return text.split(" ").map((word, index) => (
    <span
      key={index}
      className="word-animate inline-block"
      style={{ marginRight: "0.25em" }}
    >
      {word}
    </span>
  ));
};

const ArrowIcon = ({ className = "stroke-black" }: { className?: string }) => (
  <svg
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
  >
    <path
      d="M7 17L17 7"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M8 7H17V16"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const Pill = ({ text }: { text: string }) => (
  <span className="bg-sky-200 text-black px-5 py-2 rounded-full font-semibold text-sm">
    {text}
  </span>
);

const ViewAllButton = () => {
  const router = useRouter();

  return (
    <div className="flex justify-center mt-10 md:mt-24">
      <button
        onClick={() => router.push("/services")}
        className="group flex items-center gap-3 px-8 py-4 min-h-11 border-2 border-gray-700 rounded-full text-gray-900 font-semibold text-lg hover:bg-linear-to-br hover:from-black hover:to-sky-900 hover:text-white active:scale-[0.96] transition-[transform,background-color,color,gap] duration-300 hover:gap-4"
      >
        <span>View More of Our Services</span>
        <ArrowRight className="text-xl transition-transform duration-300 group-hover:translate-x-2" />
      </button>
    </div>
  );
};

const InfoCard = ({
  tag,
  features,
  subtitle,
}: {
  tag: string;
  features: readonly string[];
  subtitle: string;
}) => (
  <div className="cardBlu info-card-container relative bg-sky-200 p-8 rounded-3xl flex-grow flex flex-col justify-between min-h-[300px] transform-gpu">
    <div>
      <div className="info-tag bg-gradient-to-br from-black to-sky-900 text-white text-lg font-semibold px-6 py-2 rounded-full inline-block">
        {tag}
      </div>
    </div>
    <div className="mt-16">
      <div className="text-xl font-medium info-features">
        {splitTextIntoWords(features.join(" → "))}
      </div>
      <div className="text-xl font-medium mt-2 info-subtitle">
        {splitTextIntoWords(subtitle)}
      </div>
    </div>
    <div className="arrow-icon max-sm:hidden absolute top-6 right-6 w-16 h-16 bg-[#f8f7f4] text-gray-900 rounded-full flex items-center justify-center cursor-pointer shadow-md hover:scale-105 transition-transform transform-gpu">
      <ArrowIcon className="" />
    </div>
  </div>
);

const MetricCard = ({
  value,
  label,
  bgColor = "bg-white",
  textColor = "text-black",
  children,
}: {
  value: string;
  label: string;
  bgColor?: string;
  textColor?: string;
  children?: React.ReactNode;
}) => (
  <div
    className={`${bgColor} ${textColor} rounded-3xl flex flex-col p-8 shadow-md overflow-hidden h-full transform-gpu`}
  >
    <div className="text-center flex-shrink-0">
      <p className="metric-value text-5xl sm:text-7xl font-light tabular-nums">{value}</p>
      <div className="text-xl mt-2 metric-label">{splitTextIntoWords(label)}</div>
    </div>
    <div className="flex-grow flex flex-col justify-center items-center mt-8">
      {children}
    </div>
  </div>
);

const MiniCaseStudyCard = ({
  title,
  metric,
  description,
}: {
  title: string;
  metric: { value: string; label: string };
  description: string;
}) => (
  <div className="h-full bg-slate-50 p-6 rounded-3xl surface-elevated hover:-translate-y-1 hover:shadow-[0_16px_40px_rgba(0,0,0,0.12)] transition-[transform,box-shadow] duration-300 flex flex-col group cursor-pointer transform-gpu">
    <div className="flex justify-between items-start mb-4">
      <span aria-hidden="true" />
      <div className="text-right flex-shrink-0 ml-4">
        <p className="text-sm text-gray-700">{metric.label}</p>
      </div>
    </div>
    <h3 className="text-xl font-semibold text-gray-700 text-balance">
      {title}
    </h3>
    <p className="text-gray-700 leading-relaxed mt-2 flex-grow text-pretty">
      {description}
    </p>
    <div className="flex justify-end mt-6">
      <div className="w-12 h-12 bg-linear-to-br from-black to-sky-900 rounded-full flex items-center justify-center">
        <AlignEndHorizontal className="stroke-white text-white" />
      </div>
    </div>
  </div>
);

const SolutionPillars: React.FC = () => {
  const mainRef = useRef<HTMLDivElement | null>(null);

  const pageData = {
    mainTitle: {
      part1: "Unlock Your",
      highlight: "Potential With",
      part2: "Our Expertise",
    },
    infoCard: {
      tag: "Our Value Proposition",
      features: ["Efficiency", "Flexibility", "Expertise"],
      subtitle:
        "We deliver more than code providing a strategic partnership designed for growth.",
    },
    metric1: { value: "100%", label: "Flexibility & Control" },
    metric2: {
      value: `${new Date().getFullYear() - 2019}+`,
      label: "Years of Experience",
      skills: ["USA", "Germany","London", "Europe"],
    },
  } as const;

  const whyUsData = [
    {
      title: "Significant Cost & Time Savings",
      metric: { value: "", label: "Avg. Savings" },
      description:
        "Bypass expensive hiring and training. Our streamlined process gets you to market faster, saving crucial time and resources.",
    },
    {
      title: "Total Flexibility & Control",
      metric: { value: "", label: "Platform Access" },
      description:
        "Scale your team on-demand for single or multiple projects, and monitor progress anytime through Slack, Jira, Github, etc.",
    },
    {
      title: "Creative Expertise on Demand",
      metric: { value: "", label: "Perspectives" },
      description:
        "Instantly access a pool of highly motivated, creative professionals who bring fresh perspectives and innovative solutions to the table.",
    },
  ] as const;

  useLayoutEffect(() => {
    if (!mainRef.current) return;

    let cancelled = false;
    let ctx: { revert: () => void } | undefined;

    void (async () => {
      const [{ gsap }, { ScrollTrigger }, { TextPlugin }] = await Promise.all([
        import("gsap"),
        import("gsap/ScrollTrigger"),
        import("gsap/TextPlugin"),
      ]);

      if (cancelled || !mainRef.current) return;

      gsap.registerPlugin(ScrollTrigger, TextPlugin);

      ctx = gsap.context(() => {
      const animateWords = (elem: Element | null, delay = 0) => {
        if (!elem) return;
        const words = elem.querySelectorAll(".word-animate");
        if (words.length === 0) return;

        if (shouldSkipScrollAnimation(elem)) {
          gsap.set(words, { opacity: 1, y: 0, rotationX: 0 });
          return;
        }

        gsap.set(words, { opacity: 0, y: 30, rotationX: -90 });
        gsap.to(words, {
          opacity: 1,
          y: 0,
          rotationX: 0,
          duration: 0.8,
          ease: "back.out(1.7)",
          stagger: 0.1,
          delay,
          scrollTrigger: {
            trigger: elem as HTMLElement,
            start: "top 85%",
            once: true,
          },
        });
      };

      const animateBlock = (elem: Element | null, delay = 0) => {
        if (!elem) return;
        if (shouldSkipScrollAnimation(elem)) return;

        gsap.from(elem, {
          opacity: 0,
          y: 40,
          filter: "blur(8px)",
          duration: 1,
          ease: "power3.out",
          delay,
          scrollTrigger: {
            trigger: elem as HTMLElement,
            start: "top 90%",
            once: true,
          },
        });
      };

      gsap.utils
        .toArray<HTMLElement>(".main-title .word-animate-parent")
        .forEach((el, i) => {
          animateWords(el, i * 0.3);
        });

      const infoCard = mainRef.current!.querySelector(
        ".info-card-container"
      ) as HTMLElement;
      if (shouldSkipScrollAnimation(infoCard)) {
        gsap.set(infoCard, { opacity: 1, y: 0, scale: 1 });
        const arrowIcon = infoCard.querySelector(".arrow-icon") as HTMLElement | null;
        if (arrowIcon) gsap.set(arrowIcon, { opacity: 1, scale: 1, rotation: 0 });
      } else {
      gsap.from(infoCard, {
        opacity: 0,
        y: 50,
        scale: 0.95,
        duration: 0.8,
        ease: "back.out(1.7)",
        scrollTrigger: {
          trigger: infoCard,
          start: "top 85%",
          once: true,
        },
      });
      gsap.from(infoCard.querySelector(".arrow-icon") as HTMLElement, {
        opacity: 0,
        scale: 0,
        rotation: -180,
        duration: 0.8,
        ease: "back.out(1.7)",
        delay: 0.3,
        scrollTrigger: {
          trigger: infoCard,
          start: "top 85%",
          once: true,
        },
      });
      }

      gsap.utils.toArray<HTMLElement>(".metric-card").forEach((card, i) => {
        if (shouldSkipScrollAnimation(card)) {
          gsap.set(card, { opacity: 1, y: 0, scale: 1 });
          const valueEl = card.querySelector(".metric-value") as HTMLElement | null;
          if (valueEl) gsap.set(valueEl, { textContent: valueEl.textContent });
          const label = card.querySelector(".metric-label");
          if (label) animateWords(label, 0);
          return;
        }

        gsap.from(card, {
          opacity: 0,
          y: 50,
          scale: 0.9,
          duration: 0.8,
          ease: "back.out(1.7)",
          delay: i * 0.1,
          scrollTrigger: {
            trigger: card,
            start: "top 90%",
            once: true,
          },
        });

        const valueEl = card.querySelector(".metric-value") as HTMLElement | null;
        const numMatch = valueEl?.textContent?.match(/(\d+)/);
        if (valueEl && numMatch) {
          gsap.from(valueEl, {
            textContent: valueEl.textContent!.replace(numMatch[1], "0"),
            duration: 2,
            ease: "power2.out",
            snap: { textContent: 1 },
            delay: 0.5,
            scrollTrigger: {
              trigger: card,
              start: "top 90%",
              once: true,
            },
          });
        }
        animateWords(card.querySelector(".metric-label"), 0.8);
      });

      const viewAllButton = mainRef.current!.querySelector(
        ".view-all-button-container"
      ) as HTMLElement;
      animateBlock(viewAllButton);
    }, mainRef);
    })();

    return () => {
      cancelled = true;
      ctx?.revert();
    };
  }, []);

  return (
    <div
      ref={mainRef}
      className="bg-white text-gray-900 min-h-screen font-sans"
    >
      <div className="site-container py-6 sm:py-8 lg:py-12">
      <main className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        <div className="lg:col-span-6 flex flex-col gap-8">
          <div className="main-title">
            <div className="text-5xl max-sm:text-3xl pl-2 font-semibold leading-tight tracking-tighter word-animate-parent transform-gpu">
              {splitTextIntoWords(pageData.mainTitle.part1)}
            </div>
            <div className="text-5xl pl-2 max-sm:text-3xl font-semibold leading-tight tracking-tighter word-animate-parent transform-gpu">
              {splitTextIntoWords(pageData.mainTitle.highlight)}
            </div>
            <div className="text-5xl max-sm:text-3xl pl-2 font-semibold leading-tight tracking-tighter word-animate-parent transform-gpu">
              {splitTextIntoWords(pageData.mainTitle.part2)}
            </div>
          </div>
          <InfoCard {...pageData.infoCard} />
        </div>

        <div className="lg:col-span-3 metric-card ">
          <MetricCard {...pageData.metric1}>
            <div className="w-full h-full min-h-[250px] flex items-center justify-center rounded-lg">
              <p className="text-gray-700 font-medium text-xl pt-20 text-start p-4">
                You can manage and be in control of your own project at all times.
              </p>
            </div>
          </MetricCard>
        </div>

        <div className="lg:col-span-3 metric-card">
          <MetricCard
            value={pageData.metric2.value}
            label={pageData.metric2.label}
            bgColor="bg-gradient-to-br from-black to-sky-900"
            textColor="text-white"
          >
            <div className="grid grid-cols-2 gap-3 mb-6">
              {pageData.metric2.skills.map((skill) => (
                <Pill key={skill} text={skill} />
              ))}
            </div>
            <div className="w-full h-full min-h-[150px]  flex items-center justify-center rounded-lg">
              <p className="text-white text-2xl font-medium text-start p-4">
              Benefit from the innovative viewpoints our team brings              </p>
            </div>
          </MetricCard>
        </div>
      </main>

      <section className="section-py">
        <div className="text-center mb-12">
          <h2 className="text-fluid-heading font-semibold leading-tight tracking-tighter text-balance">
            Why Our Clients Choose Us
          </h2>
          <p className="mt-4 text-base sm:text-lg text-gray-700 max-w-2xl mx-auto text-pretty leading-relaxed">
            Our partnership model is built on three pillars: efficiency, flexibility, and deep expertise.
          </p>
        </div>
        <StaggerContainer
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          staggerDelay={0.06}
        >
          {whyUsData.map((item, index) => (
            <StaggerItem
              key={index}
              variant="fadeUp"
              className={
                index === whyUsData.length - 1
                  ? "md:col-span-2 lg:col-span-1 h-full"
                  : "h-full"
              }
            >
              <MiniCaseStudyCard {...item} />
            </StaggerItem>
          ))}
        </StaggerContainer>
      </section>

      <div className="view-all-button-container transform-gpu">
        <ViewAllButton />
      </div>
      <div className="m-22"></div>
      </div>
    </div>
  );
};

export default SolutionPillars;
