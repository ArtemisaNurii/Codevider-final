"use client"
import { ArrowRight } from "lucide-react"
import VerticalCutReveal from "./vertical"

export default function AboutSection3() {

  return (
    <section id="about" className=" bg-white md:mt-10 ">
             <header className="border-b text-white bg-gradient-to-br from-black via-slate-900 to-sky-800 border-slate-200">
        <div className="mx-auto max-w-7xl py-16 md:py-24 px-4   md:px-4 text-start">
          <p className="text-sm pt-10 sm:pt-20 font-semibold uppercase tracking-widest text-sky-300">
              About Us
          </p>
          <h1 className="mt-4  text-4xl font-bold tracking-tight md:text-5xl">
          Crafting Software That Means Business         </h1>
          <p className="mt-4  mx-auto text-lg leading-relaxed text-gray-300">
          Strategy, design, and engineering working in harmony to drive your roadmap forward.        </p>
        </div>
      </header>
      <section className="bg-white font-sans">
      <div className="container mx-auto py-16 px-6">
        
        {/* Top highlights section */}
        <div className="mb-12 flex max-w-7xl mx-auto flex-wrap items-center gap-x-2 gap-y-2 text-sm px-6 text-gray-700 sm:text-base max-sm:flex-row max-sm:hidden">
          <span>+6 years delivering software</span>
          <div className="h-4 w-px bg-gray-300" aria-hidden="true"></div>
          <span>+45 enterprise global projects</span>
        </div>

        {/* Main grid for the content */}
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-3 lg:gap-8 max-w-7xl mx-auto">
          
          {/* Left Side: Heading and two text paragraphs */}
          <div className="lg:col-span-2 ">
            <h2 className="text-4xl font-bold px-6 tracking-tight text-gray-900 sm:text-5xl">
              Who Are We
            </h2>
            
            {/* Grid for the two paragraphs to sit side-by-side on medium screens and up */}
            <div className="mt-8 grid grid-cols-1 max-sm:px-4 gap-8 md:grid-cols-2 text-base text-gray-600 px-6 leading-relaxed">
              <p>
                Founded in 2019 in Tirana, Albania, CodeVider delivers high-performance,
                cost-efficient software development solutions for startups, SMEs, and
                enterprises across Europe and beyond. We specialize in web and
                mobile development, cloud-native microservices, and AI-powered
                integrations, helping you accelerate time-to-market and cut development
                costs by up to 60%.
              </p>
              <p>
                Our team of 25+  developers excels in today&apos;s most advanced tech
                stacks. We integrate directly into your workflow using agile, sprint-based
                methodologies that keep you informed and in control, every step of the
                way. With a focus on quality, agility, and long-term partnership, we turn your
                ideas into scalable, future-ready digital products.
              </p>
            </div>
          </div>

          {/* Right Side: CTA column */}
          <div className="space-y-8">
            <div>
              {/* <h3 className="text-2xl font-bold text-gray-900">CODEVIDER</h3>
              <p className="mt-1 text-gray-500">Albania-based software company</p> */}
            </div>

            <div className="sm:p-8 lg:p-6 xl:p-8">
              <p className="text-lg font-medium text-gray-800">
              Let&apos;s bring your roadmap to life with timely, shipped features.              </p>

              <button
              onClick={() => {
                window.location.href = "/#contact"
              }}
                type="button"
                className="mt-6 flex w-full items-center justify-center gap-2.5 rounded-lg bg-gradient-to-r from-black via-slate-900 to-sky-800 px-6 py-4 hover:gap-4 text-center font-semibold text-white transition focus:outline-none focus:ring-2 focus:ring-gray-900 focus:ring-offset-2"
              >
                <span>LETS BUILD TOGETHER</span>
                <svg 
                  xmlns="http://www.w3.org/2000/svg" 
                  className="h-5 w-5" 
                  fill="none" 
                  viewBox="0 0 24 24" 
                  stroke="currentColor" 
                  strokeWidth={2}
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
    </section>
  )
}
