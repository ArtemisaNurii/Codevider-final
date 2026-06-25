"use client";

import { createDeferredHomeSection } from "@/components/index/deferred-home-section";

export const WhoWeAre = createDeferredHomeSection(
	() => import("@/components/index/who-we-are"),
	"55vh",
	"who-we-are",
);
export const CoreServices = createDeferredHomeSection(
	() => import("@/components/index/core-services"),
	"70vh",
	"services",
);
export const WhoWeEmpower = createDeferredHomeSection(
	() => import("@/components/index/who-we-empower"),
	"55vh",
	"who-we-empower",
);
export const WhyOutsource = createDeferredHomeSection(
	() => import("@/components/index/why-outsource"),
	"50vh",
	"why-outsource",
);
export const GlobalPartnerships = createDeferredHomeSection(
	() => import("@/components/index/global-partnerships"),
	"60vh",
	"global-partnerships",
);
export const WhyChooseUs = createDeferredHomeSection(
	() => import("@/components/index/why-choose-us"),
	"55vh",
	"why-choose-us",
);
export const Faq = createDeferredHomeSection(
	() => import("@/components/index/faq"),
	"50vh",
	"faq",
);
export const Contact = createDeferredHomeSection(
	() => import("@/components/index/contact"),
	"55vh",
	"contact",
);
