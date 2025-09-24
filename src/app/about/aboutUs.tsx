"use client"
import { ArrowRight } from "lucide-react"
import VerticalCutReveal from "./vertical"

export default function AboutSection3() {

  return (
    <section id="about" className=" bg-white md:mt-10 ">
             <header className="border-b text-white bg-gradient-to-br from-black via-slate-900 to-sky-800 border-slate-200">
        <div className="mx-auto max-w-7xl  py-16 md:py-24 text-start">
          <p className="text-sm pt-10 sm:pt-20 font-semibold uppercase tracking-widest text-sky-300">
              About Us
          </p>
          <h1 className="mt-4 text-4xl font-bold tracking-tight md:text-5xl">
          Crafting Software That Means Business         </h1>
          <p className="mt-4  mx-auto text-lg leading-relaxed text-gray-300">
          Strategy, design, and engineering under one roof to move your roadmap forward.          </p>
        </div>
      </header>
      <div className="max-w-[80%] mx-auto">
        <div className="relative">
 
          <div className="flex flex-wrap items-center py-3  mt-6 text-sm justify-start md:justify-between  lg:justify-start">
            <div className="flex gap-4 justify-start">
              <div className="flex items-center gap-2 mb-2 sm:text-base text-xs text-left">
                <span className="text-slate-900 font-bold">10+</span>
                <span className="text-gray-600">years delivering software</span>
                <span className="text-gray-300">|</span>
              </div>
              <div className="flex items-center gap-2 mb-2 sm:text-base text-xs text-left">
                <span className="text-slate-900 font-bold">10+</span>
                <span className="text-gray-600">enterprise global projects</span>
              </div>
            </div>

            <div className="lg:absolute right-0 bottom-16 flex lg:flex-col flex-row-reverse lg:gap-0 gap-4 items-start">
              <div className="flex lg:text-4xl sm:text-base text-xs items-center gap-2 mb-2 text-left">
                {/* <span className="text-slate-900 font-semibold">10+</span>
                <span className="text-gray-600 uppercase">clients</span> */}
              </div>
              <div className="flex items-center gap-2 mb-2 sm:text-base text-xs text-left">
                <span className="text-slate-900 font-bold"></span>
                {/* <span className="text-gray-600">Global Partners</span> */}
                <span className="text-gray-300 lg:hidden block">|</span>
              </div>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="grid md:grid-cols-3  gap-8">
          <div className="md:col-span-2">
            <h1 className="sm:text-4xl md:text-5xl text-2xl !leading-[110%] font-semibold text-gray-900 mb-8 text-left md:text-left">
              <VerticalCutReveal
                splitBy="words"
                staggerDuration={0.1}
                staggerFrom="first"
                reverse={true}
                once={true}
                transition={{
                  type: "spring",
                  stiffness: 250,
                  damping: 30,
                  delay: 0.1,
                }}
              >
                Who Are We
              </VerticalCutReveal>
            </h1>

            <div className="grid md:grid-cols-2 gap-8 text-gray-800">
              <div className="sm:text-md text-md text-left md:text-justify">
                <p className="leading-relaxed">
                Founded in 2019 in Tirana, Albania, CodeVider delivers high-performance, cost-efficient software development solutions for startups, SMEs, and enterprises across Europe and beyond. We specialize in nearshore web and mobile development, cloud-native microservices, and AI-powered integrations, helping you accelerate time-to-market and cut development costs by up to 60%.



                </p>
              </div>
              <div className="sm:text-md text-md text-left md:text-justify">
                <p className="leading-relaxed">
               Our team of 25+ senior developers excels in today&apos;s most advanced tech stacks. We integrate directly into your workflow using agile, sprint-based methodologies that keep you informed and in control, every step of the way.With a focus on quality, agility, and long-term partnership, we turn your ideas into scalable, future-ready digital products.

                </p>
              </div>
            </div>
          </div>

          <div className="md:col-span-1">
            <div className="text-left md:text-right">
              <div className="text-slate-900 text-2xl font-bold mb-2 text-left md:text-right">
                CODEVIDER
              </div>
              <div className="text-gray-600 text-sm mb-8 text-left md:text-right">
                Albania-based software company
              </div>

              <div className="mb-6 text-left md:text-right">
                <p className="text-gray-900 font-medium mb-4">
                  Let&apos;s turn your roadmap into shipped features-on time.
                </p>
              </div>

              <button
                onClick={() => {
                  window.location.href = "mailto:info@codevider.com";
                }}
                className="bg-neutral-900 hover:bg-neutral-950 border border-neutral-700 flex w-fit md:ml-auto ml-0 gap-2 hover:gap-4 transition-all duration-300 ease-in-out text-white px-5 py-3 rounded-lg cursor-pointer font-semibold"
              >
                LETS BUILD TOGETHER <ArrowRight />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
