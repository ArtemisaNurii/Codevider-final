"use client"

import { useState } from "react"
import { Cloud } from "lucide-react"

export default function Industries() {
  const [hoveredCard, setHoveredCard] = useState<number | null>(null)

  const slides = [
    {
      title: "Series A/B Start-ups",
      description:
        "Empowering Series A & B Startups. You're growing fast and expectations are higher than ever. At CodeVider, we support Series A and B startups with agile, high-performance teams that match your momentum. Launch features faster, scale platforms, and turn MVPs into full-scale products—without the growing pains.",
    },
    {
      title: "Enterprise Modernisation",
      description:
        "Legacy systems slow you down. We modernize with cloud-native, AI-ready architectures. From monolith refactors and cloud migrations to automation and UX revamps, we reduce tech debt, boost performance, and unlock new business value.",
    },
    {
      title: "CRM-Centric Orgs",
      description:
        "Your operations are unique—your platform should be too. We build tailored CRM/HR systems that streamline workflows, improve employee and customer experiences, and centralize data for scale and performance.",
    },
    {
      title: "Custom Solutions",
      description:
        "We deliver exactly what you need—scalable, integrated solutions that evolve with your business. Flexible scopes, clean architecture, and measurable outcomes.",
    },
  ]

  const getDarkCard = () => (hoveredCard !== null ? hoveredCard : 0)

  return (
    <section className="bg-white py-12 md:py-16 md:px-20 max-sm:px-4">
      <div>
        <div className="mb-8 md:mb-12">
          <h2 className="text-3xl md:text-5xl font-bold text-center text-gray-900 leading-tight">
            We Empower Tech Startups, SMEs & Global Brands
          </h2>
        </div>

        <div className="relative">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 xl:max-w-7xl xl:mx-auto mb-6">
            {slides.map((slide, index) => {
              const isDark = getDarkCard() === index
              return (
                <div
                  key={index}
                  className={`flex flex-col p-4 md:p-5 rounded-2xl transition-all duration-300 h-full ${
                    isDark ? "bg-slate-900 text-white" : "bg-gray-100 text-gray-900"
                  } ${hoveredCard === index ? "ring-2 ring-[#0a61cb] shadow-md md:shadow-lg scale-[1.02]" : "hover:shadow-md"}`}
                  onMouseEnter={() => setHoveredCard(index)}
                  onMouseLeave={() => setHoveredCard(null)}
                >
                  <div className="mb-4">
                    <Cloud className={`w-9 h-9 md:w-10 md:h-10 ${isDark ? "text-blue-400" : "text-[#0a61cb]"}`} />
                  </div>

                  <h3 className="text-lg md:text-xl font-bold mb-2 leading-snug">{slide.title}</h3>

                  <p
                    className={`text-xs md:text-sm leading-relaxed ${
                      isDark ? "text-gray-300" : "text-gray-600"
                    }`}
                    style={{
                      display: "-webkit-box",
                      WebkitLineClamp: 6, // clamp to keep content inside the card
                      WebkitBoxOrient: "vertical",
                      overflow: "hidden",
                    }}
                    title={slide.description}
                  >
                    {slide.description}
                  </p>
                </div>
              )
            })}
          </div>
        </div>
        <div className="py-10" />
      </div>
    </section>
  )
}
