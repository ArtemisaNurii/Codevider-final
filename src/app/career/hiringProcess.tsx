"use client"

import { StaggerContainer, StaggerItem } from "@/app/components/ScrollReveal"
import { careerPage } from "@/lib/constants/pages/career"

const cardShadow =
  "shadow-[0px_0px_0px_1px_rgba(0,0,0,0.06),0px_1px_2px_-1px_rgba(0,0,0,0.06),0px_2px_4px_0px_rgba(0,0,0,0.04)]"
const cardShadowHover =
  "hover:shadow-[0px_0px_0px_1px_rgba(0,0,0,0.08),0px_1px_2px_-1px_rgba(0,0,0,0.08),0px_2px_4px_0px_rgba(0,0,0,0.06)]"

interface HiringProcessProps {
  title?: string
}

export default function HiringProcess({
  title = "What to Expect Next",
}: HiringProcessProps) {
  return (
    <section className="bg-linear-to-b from-white via-white to-sky-50/60 py-20">
      <div className="site-container text-center">
        <h2 className="text-balance mb-12 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
          {title}
        </h2>

        <StaggerContainer
          className="grid grid-cols-1 gap-6 md:grid-cols-2 md:gap-8 lg:grid-cols-4"
          staggerDelay={0.1}
        >
          {careerPage.processSteps.map((item) => (
            <StaggerItem key={item.step} className="h-full">
              <article
                className={`group flex h-full flex-col items-start rounded-2xl bg-white p-6 text-left sm:p-8 ${cardShadow} ${cardShadowHover} transition-[box-shadow,background-color] duration-150 ease-out hover:bg-sky-50/50`}
              >
                <div className="mb-5 flex w-full items-start justify-between gap-4">
                  <div className="flex size-14 shrink-0 items-center justify-center rounded-xl bg-linear-to-br from-sky-50 to-sky-100/90 shadow-[inset_0_0_0_1px_rgba(14,165,233,0.14)] transition-[background-image,transform,box-shadow] duration-150 ease-out group-hover:scale-[1.03] group-hover:from-sky-100 group-hover:to-sky-50 group-hover:shadow-[inset_0_0_0_1px_rgba(14,165,233,0.22)]">
                    {item.icon}
                  </div>
                  <span
                    aria-hidden
                    className="tabular-nums rounded-lg bg-sky-50 px-2.5 py-1 text-sm font-bold tracking-tight text-sky-700 shadow-[inset_0_0_0_1px_rgba(14,165,233,0.16)] transition-[background-color,color,box-shadow] duration-150 group-hover:bg-sky-100 group-hover:text-sky-800"
                  >
                    {String(item.step).padStart(2, "0")}
                  </span>
                </div>
                <h3 className="text-balance mb-2 text-lg font-semibold text-gray-900 transition-colors duration-150 group-hover:text-blue-900">
                  {item.title}
                </h3>
                <p className="text-pretty text-sm leading-relaxed text-gray-700">
                  {item.description}
                </p>
              </article>
            </StaggerItem>
          ))}
        </StaggerContainer>
      </div>
    </section>
  )
}
