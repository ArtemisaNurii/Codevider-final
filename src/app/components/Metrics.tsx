import type { NextPage } from "next"
import { ArrowRight } from "lucide-react"

const Metrics: NextPage = () => {
  return (
    <section id="about" className="bg-white section-py">
      <div className="site-container">

        <div className="grid grid-cols-1 gap-12 lg:grid-cols-2 lg:gap-16">
          <div className="flex flex-col justify-center">
            <h1 className="text-balance text-fluid-heading font-bold tracking-tight text-gray-900">
              Transforming Ideas <br className="hidden sm:block" /> Into Trusted Digital Solutions
            </h1>
            <p className="text-pretty mt-6 text-base sm:text-lg leading-relaxed text-gray-600 max-w-prose">
              From web and mobile apps to cloud platforms and enterprise systems, we craft reliable software tailored to
              your business needs. Our teams blend modern technologies, scalable architectures, and intuitive design to
              deliver secure, high-performance solutions that help organizations innovate and grow.
            </p>

            <div className="mt-10">
              <a
                href="/about"
                className="inline-flex items-center gap-2 bg-white text-gray-900 font-semibold px-6 py-3 min-h-11 rounded-xl surface-elevated hover:gap-4 active:scale-[0.96] transition-[gap,transform] duration-300"
              >
                Read More <ArrowRight className="w-5 h-5" aria-hidden />
              </a>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
            <div className="flex flex-col justify-between rounded-3xl bg-linear-to-br from-black via-slate-900 to-sky-800 p-6 sm:p-8 text-white surface-elevated-dark">
              <div>
                <p className="text-4xl sm:text-5xl font-bold tabular-nums bg-linear-to-r from-white to-slate-300 bg-clip-text text-transparent">
                  30+
                </p>
                <p className="mt-2 text-slate-300 font-medium text-pretty">Global Partnerships</p>
              </div>
              <div className="mt-6">
                <span className="inline-block rounded-full bg-white/15 px-4 py-2 text-sm font-medium text-blue-200 shadow-[0_1px_0_rgba(255,255,255,0.08)_inset]">
                  Network Expansion
                </span>
              </div>
            </div>

            <div className="flex flex-col justify-between rounded-3xl bg-linear-to-br from-black via-slate-900 to-sky-800 p-6 sm:p-8 text-white surface-elevated-dark">
              <div>
                <p className="text-4xl sm:text-5xl font-bold tabular-nums bg-linear-to-r from-white to-slate-300 bg-clip-text text-transparent">
                  60%
                </p>
                <p className="mt-2 text-slate-300 font-medium text-pretty">Growth Rate</p>
              </div>
              <div className="mt-6">
                <span className="inline-block rounded-full bg-white/15 px-4 py-2 text-sm font-medium text-blue-200 shadow-[0_1px_0_rgba(255,255,255,0.08)_inset]">
                  Faster Acquisition
                </span>
              </div>
            </div>

            <div className="sm:col-span-2 flex flex-col justify-between rounded-3xl bg-linear-to-br from-black via-slate-900 to-sky-800 p-6 sm:p-8 text-white surface-elevated-dark">
              <div>
                <p className="text-4xl sm:text-5xl font-bold tabular-nums bg-linear-to-r from-white to-slate-300 bg-clip-text text-transparent">
                  25+
                </p>
                <p className="mt-2 text-slate-300 font-medium text-pretty">Elite Talent</p>
              </div>
              <div className="mt-6">
                <span className="inline-block rounded-full bg-white/15 px-4 py-2 text-sm font-medium text-blue-200 shadow-[0_1px_0_rgba(255,255,255,0.08)_inset]">
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
