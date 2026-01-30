"use client";

import { Button } from "@/components/ui/button";
import Image from "next/image";
import { useState, useRef, useEffect, useCallback } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { pageInfoConstants } from "@/lib/constants/index";

export default function MeetTeamSection() {
    const carouselRef = useRef<HTMLDivElement>(null);
    const [canScrollLeft, setCanScrollLeft] = useState(false);
    const [canScrollRight, setCanScrollRight] = useState(true);

    const checkScrollability = useCallback(() => {
        const el = carouselRef.current;
        if (!el) return;

        const isScrollable = el.scrollWidth > el.clientWidth;
        if (!isScrollable) {
            setCanScrollLeft(false);
            setCanScrollRight(false);
            return;
        }

        const { scrollLeft, scrollWidth, clientWidth } = el;
        // Adjusted precision buffer
        setCanScrollLeft(scrollLeft > 2); 
        setCanScrollRight(scrollLeft + clientWidth < scrollWidth - 2);
    }, []);

    useEffect(() => {
        const el = carouselRef.current;
        if (!el) return;

        checkScrollability();
        const resizeObserver = new ResizeObserver(() => checkScrollability());
        resizeObserver.observe(el);
        el.addEventListener("scroll", checkScrollability, { passive: true });

        return () => {
            resizeObserver.unobserve(el);
            el.removeEventListener("scroll", checkScrollability);
        };
    }, [checkScrollability]);

    const scroll = (direction: "left" | "right") => {
        const el = carouselRef.current;
        if (!el) return;

        // Scroll by one card width + gap for better precision than arbitrary percentage
        const firstCard = el.firstElementChild as HTMLElement;
        const cardWidth = firstCard ? firstCard.offsetWidth + 24 : el.clientWidth * 0.8; 

        if (direction === "right") {
            if (!canScrollRight) {
                el.scrollTo({ left: 0, behavior: "smooth" });
            } else {
                el.scrollBy({ left: cardWidth, behavior: "smooth" });
            }
        } else {
            if (!canScrollLeft) {
                el.scrollTo({ left: el.scrollWidth, behavior: "smooth" });
            } else {
                el.scrollBy({ left: -cardWidth, behavior: "smooth" });
            }
        }
    };

    const scrollToCard = (index: number) => {
        const el = carouselRef.current;
        if (!el) return;

        const cards = el.children;
        if (index >= 0 && index < cards.length) {
            const targetCard = cards[index] as HTMLElement;
            
            // Layout agnostic centering calculation
            const containerCenter = el.clientWidth / 2;
            const cardCenter = targetCard.offsetLeft + targetCard.offsetWidth / 2;
            
            el.scrollTo({
                left: cardCenter - containerCenter,
                behavior: "smooth"
            });
        }
    };

    return (
        <section className="py-16 bg-white overflow-hidden">
            <div className="max-w-7xl mx-auto px-6">
                <div className="text-center max-sm:text-start mb-12">
                    <p className="text-sm font-medium text-muted-foreground mb-2">
                        Behind The Codes
                    </p>
                    <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
                        Meet the team
                    </h2>
                    <p className="text-lg text-muted-foreground text-balance mb-8 max-w-2xl mx-auto max-sm:mx-0">
                        Unleashing imagination and innovation, we elevate ordinary spaces
                        into extraordinary experiences
                    </p>
                </div>
            </div>

            {/* Carousel Wrapper */}
            <div className="relative max-w-7xl mx-auto px-6">
                {/* Navigation Buttons (Hidden on mobile to reduce clutter, visible desktop) */}
                <div className="hidden md:flex absolute inset-y-0 left-0 right-0 items-center justify-between z-20 pointer-events-none -mx-4 lg:-mx-12">
                    <Button
                        variant="outline"
                        size="icon"
                        onClick={() => scroll("left")}
                        disabled={!canScrollLeft}
                        aria-label="Scroll left"
                        className={`pointer-events-auto h-12 w-12 rounded-full border-gray-200 bg-white shadow-lg hover:bg-gray-50 hover:scale-105 transition-all duration-300 ${!canScrollLeft ? 'opacity-0 cursor-default' : 'opacity-100'}`}
                    >
                        <ChevronLeft className="h-5 w-5 text-gray-700" />
                    </Button>
                    <Button
                        variant="outline"
                        size="icon"
                        onClick={() => scroll("right")}
                        aria-label="Scroll right"
                        className="pointer-events-auto h-12 w-12 rounded-full border-gray-200 bg-white shadow-lg hover:bg-gray-50 hover:scale-105 transition-all duration-300"
                    >
                        <ChevronRight className="h-5 w-5 text-gray-700" />
                    </Button>
                </div>

                {/* The Carousel Track */}
                <div
                    ref={carouselRef}
                    className="flex gap-4 md:gap-6 overflow-x-auto scroll-smooth snap-x snap-mandatory 
                     [scrollbar-width:none] [&::-webkit-scrollbar]:hidden -mb-4 pb-4
                     
                     /* MOBILE FIXES: */
                     /* 1. Break out of parent padding (-mx-6) to touch screen edges */
                     -mx-6 md:mx-0
                     
                     /* 2. Add symmetric padding so the card sits perfectly in center */
                     px-[14vw] md:px-1
                     "
                >
                    {pageInfoConstants.about.teamMembers.map((member, i) => (
                        <div
                            key={`${member.name}-${i}`}
                            // Changed width logic for perfect centering
                            className="shrink-0 snap-center group
                                       w-[72vw]         /* Mobile: 72% of screen width */
                                       sm:w-[42%]       /* Tablet: 2 itemsish */
                                       md:w-[28%]       /* Desktop small */
                                       lg:w-[21%]       /* Desktop large */
                                       "
                        >
                            <div
                                onClick={() => scrollToCard(i)}
                                className="relative overflow-hidden rounded-2xl border border-gray-100 bg-gray-50
                           shadow-sm transition-all duration-300 ease-in-out will-change-transform 
                           group-hover:-translate-y-2 group-hover:shadow-lg cursor-pointer"
                            >
                                <div className="aspect-[3/4] relative">
                                    <Image
                                        src={
                                            `/images/members/headshots/${member.image}` ||
                                            "/placeholder.svg"
                                        }
                                        alt={member.name}
                                        fill
                                        sizes="(max-width: 640px) 72vw, (max-width: 768px) 42vw, 25vw"
                                        priority={i < 3}
                                        className="object-cover object-top select-none transition-transform duration-700 ease-out group-hover:scale-105"
                                        draggable={false}
                                    />
                                    
                                    {/* Optional: Subtle gradient overlay for better text contrast if you ever add text overlay */}
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"/>
                                </div>
                            </div>
                            <div className="mt-4 text-center">
                                <h3 className="font-semibold text-lg text-foreground tracking-tight">
                                    {member.name}
                                </h3>
                                <p className="text-muted-foreground text-sm font-medium">{member.role}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}