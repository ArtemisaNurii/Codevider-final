"use client"

import { Button } from "@/components/ui/button"
import Image from "next/image"
import { useState, useRef } from "react"
import { ChevronLeft, ChevronRight } from "lucide-react"

const teamMembers = [
  {
    name: "Pasho Toska",
    role: "CEO and Founder",
    image: "/images/teamMember/pasho1.png",
  },
  {
    name: "Jul Kreshpaj",
    role: "Senior Software engineer",
    image: "/images/teamMember/juli.png",
  },

  {
    name: "Genci Likaj",
    role: "Senior Software engineer",
    image: "/images/teamMember/genci.png",
  },

  {
    name: "Elisabeta Guri",
    role: "HR Manager",
    image: "/images/teamMember/beta.png",
  },
  {
    name: "Ansel Nikaj",
    role: "Project Manager",
    image: "/images/teamMember/ansel.png",
  },
  {
    name: "Xhulio Balli",
    role: "Project Manager",
    image: "/images/teamMember/xhulio.png",
  },
  {
    name: "Ilvi  Cumani",
    role: "Frontend Developer",
    image: "/images/teamMember/ilvi.png",
  },
  {
    name: "Erald Plloha",
    role: "Backend Developer",
    image: "/images/teamMember/erald1.png",
  },
  {
    name: "Arlind Idrizi",
    role: "Frontend Developer",
    image: "/images/teamMember/arlind.png",
  },
  {
    name: "Vasjan Cupri",
    role: "Backend Developer",
    image: "/images/teamMember/vasjan1.png",
  },
  {
    name: "Armando Muco",
    role: "Backend Developer",
    image: "/images/teamMember/armandoo.png",
  },
  {
    name: "Eliana Kryeziu",
    role: "Frontend Developer",
    image: "/images/teamMember/eliana1.png",
  },
  {
    name: "Kejdi Balla",
    role: "UIUX Designer",
    image: "/images/teamMember/kejdii.png",
  },
  {
    name: "Kejsi Terolli",
    role: "Frontend Developer",
    image: "/images/teamMember/kejsi1.png",
  },

  {
    name: "Fjona Rira",
    role: "Data Analyst",
    image: "/images/teamMember/fjona.png",
  },
  {
    name: "Besjana Fixha ",
    role: "Frontend Developer",
    image: "/images/teamMember/besa.png",
  },
  {
    name: "Geri Lluga",
    role: "Backend Developer",
    image: "/images/teamMember/geri.png",
  },

  {
    name: "Amanda ",
    role: "Quality Assurance",
    image: "/images/teamMember/amanda.png",
  },

  {
    name: "Artenisa Nuri",
    role: "Frontend Developer",
    image: "/images/teamMember/artenisa.png",
  },

]

const companyLogos = [
  { name: "Logoipsum", color: "bg-purple-100", icon: "⚡" },
  { name: "Logoipsum", color: "bg-blue-100", icon: "〰️" },
  { name: "Logoipsum", color: "bg-red-100", icon: "⚡" },
  { name: "Logoipsum", color: "bg-orange-100", icon: "✦" },
]

export default function MeetTeamSection() {
  const [imagesLoaded, setImagesLoaded] = useState(false)
  const [currentIndex, setCurrentIndex] = useState(0)
  const carouselRef = useRef<HTMLDivElement>(null)

  const scrollToIndex = (index: number) => {
    if (carouselRef.current) {
      const cardWidth = 280 // Card width + gap
      carouselRef.current.scrollTo({
        left: index * cardWidth,
        behavior: "smooth",
      })
      setCurrentIndex(index)
    }
  }

  const nextSlide = () => {
    const maxIndex = Math.max(0, teamMembers.length - 4) // Show 4 cards at once
    const newIndex = Math.min(currentIndex + 1, maxIndex)
    scrollToIndex(newIndex)
  }

  const prevSlide = () => {
    const newIndex = Math.max(currentIndex - 1, 0)
    scrollToIndex(newIndex)
  }

  return (
    <section className="py-16 px-4 bg-white max-w-7xl mx-auto">
      {/* Header Section */}
      <div className="text-center mb-12">
        <p className="text-sm font-medium text-muted-foreground mb-2">Behind The Codes</p>
        <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4">Meet our team</h2>
        <p className="text-lg text-muted-foreground mb-8 max-w-md mx-auto">
          Unleashing creativity, our team of design visionaries turns ordinary spaces into extraordinary experiences
        </p>

       

       
      </div>

      <div className="relative">
        {/* Navigation Buttons */}
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-xl font-semibold">Our Team</h3>
          <div className="flex gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={prevSlide}
              disabled={currentIndex === 0}
              className="p-2 bg-transparent"
            >
              <ChevronLeft className="w-4 h-4" />
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={nextSlide}
              disabled={currentIndex >= teamMembers.length - 4}
              className="p-2"
            >
              <ChevronRight className="w-4 h-4" />
            </Button>
          </div>
        </div>

        {/* Carousel Container */}
        <div className="overflow-hidden">
          <div
            ref={carouselRef}
            className="flex gap-6 overflow-x-auto scrollbar-hide scroll-smooth"
            style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
          >
            {teamMembers.map((member, index) => (
              <div
                key={index}
                className={`flex-shrink-0 w-64 text-center transition-opacity duration-500 ${
                  imagesLoaded ? "opacity-100" : "opacity-0"
                }`}
                style={{ transitionDelay: `${(index % 4) * 100}ms` }}
              >
                <div className="relative mb-4 overflow-hidden rounded-lg bg-gray-100">
                  <Image
                    src={member.image || "/placeholder.svg"}
                    alt={member.name}
                    width={400}
                    height={400}
                    className="w-full h-80 object-cover"
                    onLoad={() => {
                      if (index === 0) setImagesLoaded(true)
                    }}
                    priority={index < 4}
                  />
                </div>
                <h3 className="font-semibold text-lg text-foreground mb-1">{member.name}</h3>
                <p className="text-muted-foreground text-sm">{member.role}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Carousel Indicators */}
        <div className="flex justify-center mt-6 gap-2">
          {Array.from({ length: Math.ceil(teamMembers.length / 4) }).map((_, index) => (
            <button
              key={index}
              onClick={() => scrollToIndex(index * 4)}
              className={`w-2 h-2 rounded-full transition-colors ${
                Math.floor(currentIndex / 4) === index ? "bg-blue-500/20" : "bg-gray-300"
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  )
}
