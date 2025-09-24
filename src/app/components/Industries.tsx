"use client"

import { useState } from "react"
import { Cloud } from "lucide-react"

export default function Industries() {
  const [hoveredCard, setHoveredCard] = useState<number | null>(null)
  const slides = [
    {
      title: "Series A/B Startups",
      description:
        "We help fast-growing startups scale with agile teams and cloud-native solutions. From MVP acceleration to core system growth, we deliver technology that fuels sustainable success.",
    },
    {
      title: "Enterprise Modernization",
      description:
        "We modernize legacy systems with cloud-native,reducing technical debt, improving performance, and unlocking long-term innovation.",
    },
    {
      title: "CRM-Centric Organizations",
      description:
        "We design tailored CRM and HR platforms that streamline workflows, improve experiences, and centralize data for smarter decision-making.",
    },
    {
      title: "Custom Software Solutions",
      description:
        "Off-the-shelf tools don’t fit every need. We build scalable, flexible software solutions that evolve with your business and deliver measurable results.",
    },
    {
      title: "Fintech & Payments",
      description:
        "From digital wallets to trading platforms, we create secure, compliant fintech solutions that scale globally and deliver seamless user experiences.",
    },
    {
      title: "AI & Automation",
      description:
        "We implement AI-powered chatbots, predictive analytics, and automation systems that cut manual work, increase accuracy, and drive new revenue.",
    },
    {
      title: "Data & Analytics Platforms",
      description:
        "We transform raw data into actionable insights with BI dashboards, data warehouses, and real-time analytics built for smarter decisions.",
    },
    {
      title: "Mobile App Development",
      description:
        "We build high-performance iOS, Android, and cross-platform apps with seamless UX-keeping your brand connected to users anytime, anywhere.",
    },
  ];
  
  
  

  const getDarkCard = () => (hoveredCard !== null ? hoveredCard : 0)

  return (
    <section className="bg-white py-12 md:py-16 md:px-20 max-sm:px-4">
      <div>
        <div className="mb-8 md:mb-12">
          <h2 className="text-3xl md:text-5xl font-bold text-center text-gray-900 leading-tight">
            We Empower Tech Startups, SMEs & Global Brands
          </h2>
        </div>
<div className="p-4"></div>
        <div className="relative">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 xl:max-w-7xl xl:mx-auto mb-6">
            {slides.map((slide, index) => {
              const isDark = getDarkCard() === index
              return (
                <div
                  key={index}
                  className={`flex flex-col p-4 md:p-5 rounded-2xl transition-all duration-300 h-100px min-h-[300px] ${
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
                    className={`text-md leading-relaxed ${
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
