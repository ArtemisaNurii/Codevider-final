"use client"

import { Button } from "@/components/ui/button"
import Image from "next/image"
import { useState, useRef, useEffect, useCallback } from "react"
import { ChevronLeft, ChevronRight } from "lucide-react"

// No changes to the teamMembers array
const teamMembers = [
    { name: "Pasho Toska", role: "CEO and Founder", image: "/images/teamMember/pasho1.png" },
    { name: "Ervin Ziko", role: "Co-Founder", image: "/images/teamMember/ervinziko.png" },
    { name: "Jul Kreshpaj", role: "Senior Software engineer", image: "/images/teamMember/juli.png" },
    { name: "Genci Likaj", role: "Senior Software engineer", image: "/images/teamMember/genci.png" },
    { name: "Elisabeta Guri", role: "HR Manager", image: "/images/teamMember/eg.png" },
    { name: "Ansel Nikaj", role: "Project Manager", image: "/images/teamMember/ansel.png" },
    { name: "Xhulio Balli", role: "Project Manager", image: "/images/teamMember/xhulio.png" },
    { name: "Besjana Fixha ", role: "Fullstack Developer", image: "/images/teamMember/bfixha.png" },
    { name: "Erald Plloha", role: "Backend Developer", image: "/images/teamMember/erald1.png" },
    { name: "Arlind Idrizi", role: "Frontend Developer", image: "/images/teamMember/arlind.png" },
    { name: "Eliana Kryeziu", role: "Frontend Developer", image: "/images/teamMember/eliana1.png" },
    { name: "Geri Lluga", role: "Backend Developer", image: "/images/teamMember/geri.png" },
    { name: "Fjona Rira", role: "Frontend Developer", image: "/images/teamMember/fjona.png" },
    { name: "Armando Muco", role: "Backend Developer", image: "/images/teamMember/armandoo.png" },
    { name: "Kejdi Balla", role: "UIUX Designer", image: "/images/teamMember/kejdii.png" },
    { name: "Amanda Oshafi", role: "Backend Developer", image: "/images/teamMember/amanda.png" },
    { name: "Artemisa Nuri", role: "Frontend Developer", image: "/images/teamMember/art.png" },
    { name: "Kejsi Terolli", role: "Frontend Developer", image: "/images/teamMember/kejsi1.png" },
    { name: "Vasjan Çupri", role: "Backend Developer", image: "/images/teamMember/vsjn.png" },
];

export default function MeetTeamSection() {
  const carouselRef = useRef<HTMLDivElement>(null)
  const [canScrollLeft, setCanScrollLeft] = useState(false)
  const [canScrollRight, setCanScrollRight] = useState(true)

  // A more robust check for scroll position
  const checkScrollability = useCallback(() => {
    const el = carouselRef.current
    if (!el) return
    
    // Check if the content is wider than the container
    const isScrollable = el.scrollWidth > el.clientWidth
    if (!isScrollable) {
      setCanScrollLeft(false)
      setCanScrollRight(false)
      return
    }

    const { scrollLeft, scrollWidth, clientWidth } = el
    setCanScrollLeft(scrollLeft > 1) // A small buffer for precision
    setCanScrollRight(scrollLeft + clientWidth < scrollWidth - 1)
  }, [])

  useEffect(() => {
    const el = carouselRef.current
    if (!el) return
    
    checkScrollability()
    
    // We use a ResizeObserver for better performance and accuracy on element resize
    const resizeObserver = new ResizeObserver(() => checkScrollability())
    resizeObserver.observe(el)
    
    el.addEventListener("scroll", checkScrollability, { passive: true })
    
    return () => {
      resizeObserver.unobserve(el)
      el.removeEventListener("scroll", checkScrollability)
    }
  }, [checkScrollability])

  // Enhanced scroll function with looping behavior
  const scroll = (direction: "left" | "right") => {
    const el = carouselRef.current
    if (!el) return

    const scrollAmount = el.clientWidth * 0.9 // Scroll by 90% of the visible width
    
    if (direction === 'right') {
        if (!canScrollRight) {
            // If at the end, loop to the beginning
            el.scrollTo({ left: 0, behavior: "smooth" })
        } else {
            el.scrollBy({ left: scrollAmount, behavior: "smooth" })
        }
    } else {
        if (!canScrollLeft) {
            // If at the beginning, loop to the end
            el.scrollTo({ left: el.scrollWidth, behavior: "smooth" })
        } else {
            el.scrollBy({ left: -scrollAmount, behavior: "smooth" })
        }
    }
  }

  return (
    <section className="py-16 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <div className="text-center max-sm:text-start mb-12">
            <p className="text-sm font-medium text-muted-foreground mb-2">Behind The Codes</p>
            <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4">Meet the team</h2>
            <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto max-sm:mx-0">
                Unleashing imagination and innovation, we elevate ordinary spaces into extraordinary experiences
            </p>
        </div>
      </div>

      {/* Carousel Wrapper */}
      <div className="relative max-w-7xl mx-auto px-6">
        {/* Navigation Buttons */}
        <div className="absolute inset-y-0 left-0 right-0 flex items-center justify-between z-20 pointer-events-none max-w-7xl mx-auto px-2 sm:px-4">
          <Button
            variant="outline"
            size="icon"
            onClick={() => scroll("left")}
            aria-label="Scroll left"
            className="pointer-events-auto h-9 w-9 rounded-full bg-white/80 backdrop-blur-sm shadow-md hover:bg-white transition-opacity"
          >
            <ChevronLeft className="h-4 w-4" />
          </Button>
          <Button
            variant="outline"
            size="icon"
            onClick={() => scroll("right")}
            aria-label="Scroll right"
            className="pointer-events-auto h-9 w-9 rounded-full bg-white/80 backdrop-blur-sm shadow-md hover:bg-white transition-opacity"
          >
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>

        {/* The Carousel Track */}
        <div
          ref={carouselRef}
          className="flex gap-4 md:gap-6 overflow-x-auto scroll-smooth snap-x snap-mandatory px-6
                     [scrollbar-width:none] [&::-webkit-scrollbar]:hidden -mb-4 pb-4" // Padding for box-shadow
        >
          {teamMembers.map((member, i) => (
            <div
              key={`${member.name}-${i}`}
              className="flex-shrink-0 snap-center w-full max-w-xs sm:w-[45%] md:w-[30%] lg:w-[23%] group"
            >
              <div
                className="relative overflow-hidden rounded-2xl border border-gray-100 bg-gray-50
                           shadow-sm transition-all duration-300 ease-in-out will-change-transform 
                           group-hover:-translate-y-1 group-hover:shadow-xl"
              >
                <div className="aspect-[3/4]">
                  <Image
                    src={member.image || "/placeholder.svg"}
                    alt={member.name}
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, 33vw"
                    priority={i < 5}
                    className="object-cover object-top select-none transition-transform duration-500 ease-out group-hover:scale-105"
                  />
                </div>
              </div>
              <div className="mt-4 text-center">
                <h3 className="font-semibold text-lg text-foreground">{member.name}</h3>
                <p className="text-muted-foreground text-sm">{member.role}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}