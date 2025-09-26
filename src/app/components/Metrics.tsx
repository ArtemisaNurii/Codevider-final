// components/Metrics.tsx
"use client"
import type { NextPage } from "next"
import { ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useRouter } from "next/navigation"
import Image from "next/image"

// Data for the logo cloud with actual client logos
const logos = [
  { name: "", src: "/images/logo/clients/ACRON-dark.svg" },
  { name: "", src: "/images/logo/clients/ascend.png" },
  { name: "", src: "/images/logo/clients/createAPE.png" },
  { name: "", src: "/images/logo/clients/datastake.svg" },
  { name: "", src: "/images/logo/clients/Evolvet-Logo-dark.png" },
  // { name: "", src: "/images/logo/clients/logo-DAIMON-dark.svg" },
  { name: "", src: "/images/logo/clients/logo-footer.png" },
  { name: " ", src: "/images/logo/clients/beauty-books-dark.svg" },


]

const Metrics: NextPage = () => {
  const router = useRouter()
  
  return (
    <section id="about" className="bg-white">
      <div className="container mx-auto px-4 py-16 sm:px-6 lg:px-8 lg:py-24 max-w-7xl ">
        {/* Trusted By Section */}
        <div className="text-center mb-16">
          <p className="text-sm font-semibold text-gray-600 tracking-wide">Trusted by Clients Worldwide</p>
          <div className="mt-8 relative overflow-hidden">
            <div className="flex animate-marquee whitespace-nowrap">
              {/* First set of logos */}
              {logos.map((logo, index) => (
                <div key={index} className="flex flex-col items-center justify-center mx-8 flex-shrink-0">
                  <Image
                    src={logo.src}
                    alt={logo.name}
                    width={120}
                    height={60}
                    className="h-12 w-auto object-contain  hover:grayscale-0 transition-all duration-300"
                  />
                  <span className="text-sm font-medium text-black mt-2">{logo.name}</span>
                </div>
              ))}
              {/* Duplicate set for seamless loop */}
              {logos.map((logo, index) => (
                <div key={`duplicate-${index}`} className="flex flex-col items-center justify-center mx-8 flex-shrink-0">
                  <Image
                    src={logo.src}
                    alt={logo.name}
                    width={120}
                    height={60}
                    className="h-12 w-auto object-contain  hover:grayscale-0 transition-all duration-300"
                  />
                  <span className="text-sm font-medium text-black mt-2">{logo.name}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 gap-16 lg:grid-cols-2 lg:gap-8">
          {/* Left Column: Text Content */}
          <div className="flex flex-col justify-center">
            <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl lg:text-6xl">
              Transforming Ideas  <br /> Into Trusted Digital Solutions
            </h1>
            <p className="mt-6 text-lg leading-8 text-gray-600">
              From web and mobile apps to cloud platforms and enterprise systems, we craft reliable software tailored to
              your business needs. Our teams blend modern technologies, scalable architectures, and intuitive design to
              deliver secure, high-performance solutions that help organizations innovate and grow.
            </p>

            <div className="mt-10">
              <a
                href="/about"
                className="inline-flex items-center gap-2 bg-white text-gray-900 font-semibold px-6 py-3 rounded-lg shadow-md hover:gap-4 transition-all duration-300"
              >
               Read  More <ArrowRight className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Right Column: Stats Cards */}
          <div className="grid grid-cols-2 gap-6">
            <div className="col-span-2 sm:col-span-1 flex flex-col justify-between rounded-3xl bg-gradient-to-br from-black via-slate-900 to-sky-800  p-8 text-white shadow-xl border border-slate-700/50">
              <div>
                <p className="text-5xl font-bold bg-gradient-to-r from-white to-slate-300 bg-clip-text text-transparent">
                  30+
                </p>
                <p className="mt-2 text-slate-300 font-medium">Global Partnerships</p>
              </div>
              <div className="mt-6">
                <span className="inline-block rounded-full bg-white/20  border border-blue-400/30 px-4 py-2 text-sm font-medium text-blue-200">
                  Network Expansion
                </span>
              </div>
            </div>

            <div className="col-span-2 sm:col-span-1 flex flex-col justify-between rounded-3xl bg-gradient-to-br from-black via-slate-900 to-sky-800  p-8 text-white shadow-xl border border-slate-700/50">
              <div>
                <p className="text-5xl font-bold bg-gradient-to-r from-white to-slate-300 bg-clip-text text-transparent">
                  60%
                </p>
                <p className="mt-2 text-slate-300 font-medium">Growth Rate</p>
              </div>
              <div className="mt-6">
                <span className="inline-block rounded-full bg-white/20 border border-blue-400/30 px-4 py-2 text-sm font-medium text-blue-200">
                  Faster Acquisition
                </span>
              </div>
            </div>

            <div className="col-span-2 flex flex-col justify-between rounded-3xl bg-gradient-to-br from-black via-slate-900 to-sky-800 p-8 text-white shadow-xl border border-slate-700/50">
              <div>
                <p className="text-5xl font-bold bg-gradient-to-r from-white to-slate-300 bg-clip-text text-transparent">
                  25+
                </p>
                <p className="mt-2 text-slate-300 font-medium">Elite Talent</p>
              </div>
              <div className="mt-6">
                <span className="inline-block rounded-full  bg-white/20  border border-blue-400/30 px-4 py-2 text-sm font-medium text-blue-200">
                   Developers with Deep Expertise
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Metrics
