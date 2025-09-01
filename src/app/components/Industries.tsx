"use client"

import { useState } from "react"
import { ChevronLeft, ChevronRight, Cloud } from "lucide-react"

export default function Industries() {
  const [currentSlide, setCurrentSlide] = useState(0)
  const [hoveredCard, setHoveredCard] = useState<number | null>(null)

  const slides = [
    {
      title: "Series A/B Start‑ups",
      description:
        "Empowering Series A & B Startups You're growing fast and expectations are higher than ever. At CodeVider, we specialize in supporting Series A and B startups with agile, high-performance development teams that match your momentum. Whether you're launching new features, expanding platforms, or building MVPs into full-scale products, we help you scale without the growing pains. Fast delivery. Flexible teams. Proven tech expertise.",
    },
    {
      title: "Enterprise Modernisation",
      description:
        "Legacy systems are holding you back. At CodeVider, we help enterprises modernize with confidence, transforming outdated architectures into agile, cloud-native, AI-powered ecosystems that drive growth and innovation. Whether you need to refactor a monolith, migrate to the cloud, integrate intelligent automation, or revamp your user experience, we deliver scalable solutions that reduce technical debt, boost performance, and unlock new business value.",
    },
    {
      title: "CRM‑Centric Orgs",
      description:
        "Your business is unique, your software should be too. Our expertise lies in building powerful, tailor-made CRM and HR platforms that adapt to your operations, scale seamlessly, and drive performance. Whether you're a fast-growing company or an established enterprise, we create intelligent, user-centric platforms that streamline operations, improve employee and customer experiences, and centralize your data in one powerful system.",
    },
    {
      title: "Custom Solutions",
      description:
        "Customized solutions for your unique needs. Seamless scaling and integration. Scalable architecture to grow with your business. We build exactly what you need, when you need it, with the flexibility to evolve as your business grows.",
    },
  ]

  // Determine which card should be dark
  const getDarkCard = () => {
    return hoveredCard !== null ? hoveredCard : 0 // First card dark by default, or hovered card
  }

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length)
  }

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length)
  }

  const goToSlide = (index: number) => {
    setCurrentSlide(index)
  }

  return (
    <section className="bg-white py-16 md:px-24 max-sm:px-4">
      <div className="">
        {/* Header */}
        <div className="mb-12">
          <p className="text-[#0a61cb] font-medium text-sm mb-2 uppercase tracking-wide"></p>
          <h2 className="text-4xl md:text-5xl font-bold text-center font-sans text-gray-900 leading-tight ">
            We Empower Tech Startups, SMEs & Global Brands
          </h2>
        </div>

        <div className="relative">
          {/* Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {slides.map((slide, index) => {
              const isDark = getDarkCard() === index
              return (
                <div
                  key={index}
                  className={`p-8 rounded-3xl transition-all duration-300 cursor-pointer ${
                    isDark ? "bg-slate-900 text-white" : "bg-gray-100 text-gray-900"
                  } ${currentSlide === index ? "ring-2 ring-[#0a61cb] shadow-lg scale-105" : "hover:shadow-md"}`}
                  onClick={() => goToSlide(index)}
                  onMouseEnter={() => setHoveredCard(index)}
                  onMouseLeave={() => setHoveredCard(null)}
                >
                  {/* Icon */}
                  <div className="mb-6">
                    <Cloud className={`w-12 h-12 ${isDark ? "text-blue-400" : "text-[#0a61cb]"}`} />
                  </div>

                  {/* Title */}
                  <h3 className="text-xl font-bold mb-4">{slide.title}</h3>

                  {/* Description */}
                  <p className={`text-sm leading-relaxed mb-6 ${isDark ? "text-gray-300" : "text-gray-600"}`}>
                    {slide.description.length > 150 ? `${slide.description.substring(0, 150)}...` : slide.description}
                  </p>

         
                </div>
              )
            })}
          </div>

          {/* Navigation */}
          <div className="flex items-center justify-between">
            {/* Dots */}
            

         
          </div>
        </div>
        <div className="p-20" ></div>
      </div>
    </section>
  )
}
