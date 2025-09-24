"use client"

import { Button } from "@/components/ui/button"
import Image from "next/image"
import { useState, useRef, useEffect } from "react"
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
    role: "Frontend Developer",
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
    role: "Backend Developer",
    image: "/images/teamMember/amanda.png",
  },

  {
    name: "Artenisa Nuri",
    role: "Frontend Developer",
    image: "/images/teamMember/artenisa.png",
  },

]

// const companyLogos = [
//   { name: "Logoipsum", color: "bg-purple-100", icon: "⚡" },
//   { name: "Logoipsum", color: "bg-blue-100", icon: "〰️" },
//   { name: "Logoipsum", color: "bg-red-100", icon: "⚡" },
//   { name: "Logoipsum", color: "bg-orange-100", icon: "✦" },
// ]

export default function MeetTeamSection() {
  const [loadedImages, setLoadedImages] = useState(0)
  const [currentIndex, setCurrentIndex] = useState(0)
  const [cardsPerView, setCardsPerView] = useState(1)
  const carouselRef = useRef<HTMLDivElement>(null)

  // Calculate cards per view based on screen size
  const updateCardsPerView = () => {
    const width = window.innerWidth
    if (width >= 1024) setCardsPerView(4)      // Desktop: 4 cards
    else if (width >= 768) setCardsPerView(3)  // Tablet: 3 cards  
    else if (width >= 640) setCardsPerView(2)  // Small tablet: 2 cards
    else setCardsPerView(1)                    // Mobile: 1 card
  }

  // Set up responsive behavior
  useEffect(() => {
    updateCardsPerView()
    window.addEventListener('resize', updateCardsPerView)
    return () => window.removeEventListener('resize', updateCardsPerView)
  }, [])

  const imagesLoaded = loadedImages >= Math.min(8, teamMembers.length) // Wait for first 8 images

  const scrollToIndex = (index: number) => {
    if (carouselRef.current && imagesLoaded) {
      // Calculate card width based on screen size and gap
      const gap = window.innerWidth >= 768 ? 24 : 16 // md:gap-6 vs gap-4
      const cardWidth = window.innerWidth >= 640 ? 256 + gap : 288 + gap // sm:w-64 vs w-72
      carouselRef.current.scrollTo({
        left: index * cardWidth,
        behavior: "smooth",
      })
      setCurrentIndex(index)
    }
  }

  const nextSlide = () => {
    if (!imagesLoaded) return // Don't allow navigation until images load
    const maxIndex = Math.max(0, teamMembers.length - cardsPerView)
    const newIndex = Math.min(currentIndex + 1, maxIndex)
    scrollToIndex(newIndex)
  }

  const prevSlide = () => {
    if (!imagesLoaded) return // Don't allow navigation until images load
    const newIndex = Math.max(currentIndex - 1, 0)
    scrollToIndex(newIndex)
  }

  const handleImageLoad = () => {
    setLoadedImages(prev => prev + 1)
  }

  return (
    <section className="py-16 px-4 bg-white max-w-7xl mx-auto">
      {/* Header Section */}
      <div className="text-center mb-12">
        <p className="text-sm font-medium text-muted-foreground mb-2">Behind The Codes</p>
        <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4">Meet the team</h2>
        <p className="text-lg text-muted-foreground mb-8 max-w-md mx-auto">
          Unleashing creativity, our team of design visionaries turns ordinary spaces into extraordinary experiences
        </p>

       

       
      </div>

      <div className="relative">
        {/* Navigation Buttons */}
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-xl font-semibold">
            Our Team 
            {!imagesLoaded && (
              <span className="text-sm text-gray-500 ml-2">Loading...</span>
            )}
          </h3>
          <div className="flex gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={prevSlide}
              disabled={!imagesLoaded || currentIndex === 0}
              className="p-2 bg-transparent"
            >
              <ChevronLeft className="w-4 h-4" />
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={nextSlide}
              disabled={!imagesLoaded || currentIndex >= teamMembers.length - cardsPerView}
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
            className="flex gap-4 md:gap-6 overflow-x-auto scrollbar-hide scroll-smooth"
            style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
          >
            {teamMembers.map((member, index) => (
              <div
                key={index}
                className={`flex-shrink-0 w-72 sm:w-64text-center transition-opacity duration-500 ${
                  imagesLoaded ? "opacity-100" : "opacity-0"
                }`}
                style={{ transitionDelay: `${(index % cardsPerView) * 100}ms` }}
              >
                <div className="relative  mb-4 overflow-hidden rounded-lg bg-gray-100">
                  <Image
                    src={member.image || "/placeholder.svg"}
                    alt={member.name}
                    width={400}
                    height={400}
                    className="w-full h-80 object-cover"
                    onLoad={handleImageLoad}
                    priority={index < 8}
                  />
                </div>
                <h3 className="font-semibold text-lg text-foreground mb-1">{member.name}</h3>
                <p className="text-muted-foreground text-sm">{member.role}</p>
              </div>
            ))}
          </div>
        </div>



        {/* Progress indicator */}
        <div className="text-center mt-4 text-sm text-gray-500">
          {currentIndex + 1} - {Math.min(currentIndex + cardsPerView, teamMembers.length)} of {teamMembers.length} team members
        </div>
      </div>
    </section>
  )
}
