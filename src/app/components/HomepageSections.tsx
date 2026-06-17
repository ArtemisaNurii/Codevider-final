"use client";

import type { ComponentType } from "react";
import dynamic from "next/dynamic";
import ScrollReveal, { type AnimationVariant } from "./ScrollReveal";
import { LazySection, SectionSkeleton } from "./LazySection";

const Industries = dynamic(() => import("./Industries"), {
  ssr: false,
  loading: () => <SectionSkeleton minHeight="28rem" />,
});
const Outsource = dynamic(() => import("./Outsource"), {
  ssr: false,
  loading: () => <SectionSkeleton minHeight="24rem" />,
});
const WorldMapDemo = dynamic(() => import("./WorldMap"), {
  ssr: false,
  loading: () => <SectionSkeleton minHeight="32rem" />,
});
const CaseStudiesSection = dynamic(() => import("./CaseStudies"), {
  ssr: false,
  loading: () => <SectionSkeleton minHeight="40rem" />,
});
const Faq = dynamic(() => import("./Faq"), {
  ssr: false,
  loading: () => <SectionSkeleton minHeight="24rem" />,
});
const Contact = dynamic(() => import("./CTA"), {
  ssr: false,
  loading: () => <SectionSkeleton minHeight="28rem" />,
});

type HomepageSection = {
  id: string;
  Component: ComponentType;
  variant: AnimationVariant;
  amount?: number;
  delay?: number;
  minHeight?: string;
};

const HOMEPAGE_SECTIONS: HomepageSection[] = [
  { id: "industries", Component: Industries, variant: "fadeUp", delay: 0, minHeight: "28rem" },
  { id: "outsource", Component: Outsource, variant: "scaleUp", delay: 0.06, minHeight: "24rem" },
  { id: "world-map", Component: WorldMapDemo, variant: "fadeIn", amount: 0.05, delay: 0.04, minHeight: "32rem" },
  { id: "case-studies", Component: CaseStudiesSection, variant: "fadeUp", delay: 0.05, minHeight: "40rem" },
  { id: "faq", Component: Faq, variant: "fadeUp", delay: 0.04, minHeight: "24rem" },
  { id: "contact", Component: Contact, variant: "fadeUp", delay: 0.03, minHeight: "28rem" },
];

function HomepageSection({
  Component,
  variant,
  amount,
  delay = 0,
  minHeight,
}: Omit<HomepageSection, "id">) {
  return (
    <LazySection minHeight={minHeight}>
      <ScrollReveal
        variant={variant}
        amount={amount}
        delay={delay}
        className="homepage-section @container"
      >
        <Component />
      </ScrollReveal>
    </LazySection>
  );
}

export default function HomepageSections() {
  return (
    <>
      {HOMEPAGE_SECTIONS.map(({ id, ...section }) => (
        <HomepageSection key={id} {...section} />
      ))}
    </>
  );
}
