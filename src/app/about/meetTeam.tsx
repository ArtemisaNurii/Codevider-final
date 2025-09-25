"use client"

import { Button } from "@/components/ui/button"
import Image from "next/image"
import { useState, useRef, useEffect, useCallback } from "react"
import { ChevronLeft, ChevronRight } from "lucide-react"

const teamMembers = [
  { name: "Pasho Toska", role: "CEO and Founder", image: "/images/teamMember/pasho1.png" },
  { name: "Jul Kreshpaj", role: "Senior Software engineer", image: "/images/teamMember/juli.png" },
  { name: "Genci Likaj", role: "Senior Software engineer", image: "/images/teamMember/genci.png" },
  { name: "Elisabeta Guri", role: "HR Manager", image: "/images/teamMember/beta.png" },
  { name: "Ansel Nikaj", role: "Project Manager", image: "/images/teamMember/ansel.png" },
  { name: "Xhulio Balli", role: "Project Manager", image: "/images/teamMember/xhulio.png" },
  { name: "Ilvi  Cumani", role: "Frontend Developer", image: "/images/teamMember/ilvi.png" },
  { name: "Erald Plloha", role: "Backend Developer", image: "/images/teamMember/erald1.png" },
  { name: "Arlind Idrizi", role: "Frontend Developer", image: "/images/teamMember/arlind.png" },
  { name: "Vasjan Cupri", role: "Backend Developer", image: "/images/teamMember/vasjan1.png" },
  { name: "Armando Muco", role: "Backend Developer", image: "/images/teamMember/armandoo.png" },
  { name: "Eliana Kryeziu", role: "Frontend Developer", image: "/images/teamMember/eliana1.png" },
  { name: "Kejdi Balla", role: "UIUX Designer", image: "/images/teamMember/kejdii.png" },
  { name: "Kejsi Terolli", role: "Frontend Developer", image: "/images/teamMember/kejsi1.png" },
  { name: "Fjona Rira", role: "Frontend Developer", image: "/images/teamMember/fjona.png" },
  { name: "Besjana Fixha ", role: "Frontend Developer", image: "/images/teamMember/besa.png" },
  { name: "Geri Lluga", role: "Backend Developer", image: "/images/teamMember/geri.png" },
  { name: "Amanda ", role: "Backend Developer", image: "/images/teamMember/amanda.png" },
  { name: "Artenisa Nuri", role: "Frontend Developer", image: "/images/teamMember/artenisa.png" },
]

export default function MeetTeamSection() {
  const carouselRef = useRef<HTMLDivElement>(null)
  const [isAtStart, setIsAtStart] = useState(true)
  const [isAtEnd, setIsAtEnd] = useState(false)

  const checkScrollPosition = useCallback(() => {
    const el = carouselRef.current
    if (!el) return
    const { scrollLeft, scrollWidth, clientWidth } = el
    setIsAtStart(scrollLeft <= 1)
    setIsAtEnd(scrollLeft + clientWidth >= scrollWidth - 1)
  }, [])

  useEffect(() => {
    const el = carouselRef.current
    if (!el) return
    checkScrollPosition()
    el.addEventListener("scroll", checkScrollPosition, { passive: true })
    window.addEventListener("resize", checkScrollPosition)
    return () => {
      el.removeEventListener("scroll", checkScrollPosition)
      window.removeEventListener("resize", checkScrollPosition)
    }
  }, [checkScrollPosition])

  const scroll = (dir: "left" | "right") => {
    const el = carouselRef.current
    if (!el) return
    const page = Math.round(el.clientWidth * 0.9) // slightly overlapping pages feel smoother
    el.scrollBy({ left: dir === "left" ? -page : page, behavior: "smooth" })
  }

  return (
    <section className="py-16 px-4 bg-white max-w-7xl mx-auto">
      {/* Header */}
      <div className="text-center mb-12">
        <p className="text-sm font-medium text-muted-foreground mb-2">Behind The Codes</p>
        <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4">Meet the team</h2>
        <p className="text-lg text-muted-foreground mb-8 max-w-md mx-auto">
        Unleashing imagination and innovation, we elevate ordinary spaces into extraordinary experiences        </p>
      </div>

      {/* Carousel */}
      <div className="relative">
        {/* Floating arrows */}
        <div className="pointer-events-none absolute inset-y-0 left-0 right-0 flex items-center justify-between z-20">
          <Button
            variant="outline"
            size="icon"
            onClick={() => scroll("left")}
            disabled={isAtStart}
            aria-label="Scroll left"
            className={`pointer-events-auto mx-2 sm:mx-3 h-9 w-9 rounded-full border bg-white/80 backdrop-blur transition 
              ${isAtStart ? "opacity-0 scale-95" : "opacity-100 hover:bg-white"}`}
          >
            <ChevronLeft className="h-4 w-4" />
          </Button>
          <Button
            variant="outline"
            size="icon"
            onClick={() => scroll("right")}
            disabled={isAtEnd}
            aria-label="Scroll right"
            className={`pointer-events-auto mx-2 sm:mx-3 h-9 w-9 rounded-full border bg-white/80 backdrop-blur transition 
              ${isAtEnd ? "opacity-0 scale-95" : "opacity-100 hover:bg-white"}`}
          >
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>

        {/* Edge fades */}
        <div className="pointer-events-none absolute inset-y-0 left-0 w-10 sm:w-16 z-10 bg-gradient-to-r from-white/30 to-transparent" />
        <div className="pointer-events-none absolute inset-y-0 right-0 w-10 sm:w-16 z-10 bg-gradient-to-l from-white/30 to-transparent" />

        {/* Track */}
        <div
          ref={carouselRef}
          className="
            flex gap-4 md:gap-6 overflow-x-auto scroll-smooth snap-x snap-mandatory
            px-1 sm:px-2
            [scrollbar-width:none] [&::-webkit-scrollbar]:hidden
          "
        >
          {teamMembers.map((m, i) => (
            <div
              key={m.name + i}
              className="
                snap-center flex-shrink-0 w-[82%] xs:w-[70%] sm:w-[55%] md:w-[40%] lg:w-[28%]
                text-center
              "
            >
              <div
                className="
                  relative h-80 overflow-hidden rounded-2xl border border-gray-200 bg-gradient-to-b from-gray-50 to-white
                  shadow-sm transition-transform duration-300 ease-out will-change-transform hover:-translate-y-0.5 hover:shadow-md
                "
              >
                <Image
                  src={m.image || "/placeholder.svg"}
                  alt={m.name}
                  width={800}
                  height={800}
                  priority={i < 4}
                  className="
                    w-full h-full object-cover object-top   /* top-anchored: crops at the bottom */
                    select-none
                    transition-transform duration-500 ease-out will-change-transform
                    group-hover:scale-[1.02] hover:scale-[1.02]
                  "
                />
              </div>
              <h3 className="mt-3 font-semibold text-lg text-foreground">{m.name}</h3>
              <p className="text-muted-foreground text-sm">{m.role}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
