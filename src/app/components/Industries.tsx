import { Cloud } from "lucide-react"
import { homePage } from "@/lib/constants/pages/home"
import { StaggerContainer, StaggerItem } from "./ScrollReveal"

const cardShadow =
  "shadow-[0px_0px_0px_1px_rgba(0,0,0,0.06),0px_1px_2px_-1px_rgba(0,0,0,0.06),0px_2px_4px_0px_rgba(0,0,0,0.04)]"

export default function Industries() {
  const slides = homePage.industries.list

  return (
    <section className="bg-white section-py">
      <div className="site-container">
        <div className="mb-8 md:mb-12">
          <h2 className="text-balance text-fluid-heading font-bold text-center max-sm:text-start text-gray-900 leading-tight">
            {homePage.industries.title}
          </h2>
        </div>

        <StaggerContainer
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-5"
          staggerDelay={0.06}
        >
          {slides.map((slide) => (
            <StaggerItem key={slide.title} variant="fadeUp" className="h-full">
              <article
                className={`group flex h-full min-h-[280px] flex-col rounded-2xl bg-white p-5 sm:min-h-[300px] md:p-6 ${cardShadow}`}
              >
                <div className="mb-4 flex size-12 shrink-0 items-center justify-center rounded-xl bg-gray-50 shadow-[inset_0_0_0_1px_rgba(0,0,0,0.06)] transition-[background-color,box-shadow] duration-300 ease-[cubic-bezier(0.2,0,0,1)] group-hover:bg-[#0a61cb] group-hover:shadow-none">
                  <Cloud
                    className="size-5 text-gray-500 transition-colors duration-300 ease-[cubic-bezier(0.2,0,0,1)] group-hover:text-white"
                    aria-hidden
                  />
                </div>

                <h3 className="mb-2 text-lg font-bold leading-snug text-balance text-gray-900 md:text-xl">
                  {slide.title}
                </h3>

                <p
                  className="flex-1 text-base leading-relaxed text-pretty text-gray-600"
                  style={{
                    display: "-webkit-box",
                    WebkitLineClamp: 6,
                    WebkitBoxOrient: "vertical",
                    overflow: "hidden",
                  }}
                >
                  {slide.description}
                </p>
              </article>
            </StaggerItem>
          ))}
        </StaggerContainer>
      </div>
    </section>
  )
}
