"use client"
import { ArrowRight } from "lucide-react"
import { useRef } from "react"
import { TimelineContent } from "./animation"
import VerticalCutReveal from "./vertical"

export default function AboutSection3() {
  const heroRef = useRef<HTMLDivElement>(null)
  const revealVariants = {
    visible: (i: number) => ({
      y: 0,
      opacity: 1,
      filter: "blur(0px)",
      transition: {
        delay: i * 0.1,
        duration: 0.5,
      },
    }),
    hidden: {
      filter: "blur(10px)",
      y: -20,
      opacity: 0,
    },
  }
  const scaleVariants = {
    visible: (i: number) => ({
      opacity: 1,
      filter: "blur(0px)",
      transition: {
        delay: i * 0.1,
        duration: 0.5,
      },
    }),
    hidden: {
      filter: "blur(10px)",
      opacity: 0,
    },
  }

  return (
    <section id="about" className="py-8 px-4 bg-white" ref={heroRef}>
      <div className="max-w-6xl mx-auto">
        <div className="relative">
          {/* Hero Image */}
          <TimelineContent
            as="figure"
            animationNum={1}
            timelineRef={heroRef}
            customVariants={scaleVariants}
            className="relative group"
            once={true}
          >
            <svg className="w-full" width={"100%"} height={"100%"} viewBox="0 0 100 40">
              <defs>
                <clipPath id="clip-inverted" clipPathUnits={"objectBoundingBox"}>
                  <path
                    d="M0.0998072 1H0.422076H0.749756C0.767072 1 0.774207 0.961783 0.77561 0.942675V0.807325C0.777053 0.743631 0.791844 0.731953 0.799059 0.734076H0.969813C0.996268 0.730255 1.00088 0.693206 0.999875 0.675159V0.0700637C0.999875 0.0254777 0.985045 0.00477707 0.977629 0H0.902473C0.854975 0 0.890448 0.138535 0.850165 0.138535H0.0204424C0.00408849 0.142357 0 0.180467 0 0.199045V0.410828C0 0.449045 0.0136283 0.46603 0.0204424 0.469745H0.0523086C0.0696245 0.471019 0.0735527 0.497877 0.0733523 0.511146V0.915605C0.0723903 0.983121 0.090588 1 0.0998072 1Z"
                    fill="#D9D9D9"
                  />
                </clipPath>
              </defs>
              <image
                clipPath="url(#clip-inverted)"
                preserveAspectRatio="xMidYMid slice"
                width={"100%"}
                height={"100%"}
                xlinkHref="https://images.unsplash.com/photo-1718601980986-0ce75101d52d?w=1200&auto=format&fit=crop"
              ></image>
            </svg>
          </TimelineContent>

          <div className="flex flex-wrap items-center py-3 text-sm justify-start md:justify-between lg:justify-start">
            <TimelineContent
              as="div"
              animationNum={5}
              timelineRef={heroRef}
              customVariants={revealVariants}
              className="flex gap-4 justify-start"
              once={true}
            >
              <div className="flex items-center gap-2 mb-2 sm:text-base text-xs text-left">
                <span className="text-slate-900 font-bold">10+</span>
                <span className="text-gray-600">years delivering software</span>
                <span className="text-gray-300">|</span>
              </div>
              <div className="flex items-center gap-2 mb-2 sm:text-base text-xs text-left">
                <span className="text-slate-900 font-bold">50+</span>
                <span className="text-gray-600">enterprise projects</span>
              </div>
            </TimelineContent>

            <div className="lg:absolute right-0 bottom-16 flex lg:flex-col flex-row-reverse lg:gap-0 gap-4 items-start">
              <TimelineContent
                as="div"
                animationNum={6}
                timelineRef={heroRef}
                customVariants={revealVariants}
                className="flex lg:text-4xl sm:text-base text-xs items-center gap-2 mb-2 text-left"
                once={true}
              >
                <span className="text-slate-900 font-semibold">10+</span>
                <span className="text-gray-600 uppercase">clients</span>
              </TimelineContent>
              <TimelineContent
                as="div"
                animationNum={7}
                timelineRef={heroRef}
                customVariants={revealVariants}
                className="flex items-center gap-2 mb-2 sm:text-base text-xs text-left"
                once={true}
              >
                <span className="text-slate-900 font-bold"></span>
                <span className="text-gray-600">Global Partners</span>
                <span className="text-gray-300 lg:hidden block">|</span>
              </TimelineContent>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="grid md:grid-cols-3 gap-8">
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
                  delay: 0.8,
                }}
              >
                Who Are We
              </VerticalCutReveal>
            </h1>

            <TimelineContent
              as="div"
              animationNum={8}
              timelineRef={heroRef}
              customVariants={revealVariants}
              className="grid md:grid-cols-2 gap-8 text-gray-600"
              once={true}
            >
              <TimelineContent
                as="div"
                animationNum={9}
                timelineRef={heroRef}
                customVariants={revealVariants}
                className="sm:text-base text-xs text-left md:text-justify"
                once={true}
              >
                <p className="leading-relaxed">
                Founded in 2019 in Tirana, Albania, CodeVider delivers high-performance, cost-efficient software development solutions for startups, SMEs, and enterprises across Europe and beyond. We specialize in nearshore web and mobile development, cloud-native microservices, and AI-powered integrations, helping you accelerate time-to-market and cut development costs by up to 60%.



                </p>
              </TimelineContent>
              <TimelineContent
                as="div"
                animationNum={10}
                timelineRef={heroRef}
                customVariants={revealVariants}
                className="sm:text-base text-xs text-left md:text-justify"
                once={true}
              >
                <p className="leading-relaxed">
               Our team of 25+ senior developers excels in today’s most advanced tech stacks. We integrate directly into your workflow using agile, sprint-based methodologies that keep you informed and in control, every step of the way.With a focus on quality, agility, and long-term partnership, we turn your ideas into scalable, future-ready digital products.

                </p>
              </TimelineContent>
            </TimelineContent>
          </div>

          <div className="md:col-span-1">
            <div className="text-left md:text-right">
              <TimelineContent
                as="div"
                animationNum={11}
                timelineRef={heroRef}
                customVariants={revealVariants}
                className="text-slate-900 text-2xl font-bold mb-2 text-left md:text-right"
                once={true}
              >
                CODEVIDER
              </TimelineContent>
              <TimelineContent
                as="div"
                animationNum={12}
                timelineRef={heroRef}
                customVariants={revealVariants}
                className="text-gray-600 text-sm mb-8 text-left md:text-right"
                once={true}
              >
                Albania-based software company
              </TimelineContent>

              <TimelineContent
                as="div"
                animationNum={13}
                timelineRef={heroRef}
                customVariants={revealVariants}
                className="mb-6 text-left md:text-right"
                once={true}
              >
                <p className="text-gray-900 font-medium mb-4">
                  Let’s turn your roadmap into shipped features-on time.
                </p>
              </TimelineContent>

              <TimelineContent
                as="button"
                onClick={() => {
                  window.location.href = "mailto:info@codevider.com";
                }}
                animationNum={14}
                timelineRef={heroRef}
                customVariants={revealVariants}
                className="bg-neutral-900 hover:bg-neutral-950 shadow-lg shadow-neutral-900 border border-neutral-700 flex w-fit md:ml-auto ml-0 gap-2 hover:gap-4 transition-all duration-300 ease-in-out text-white px-5 py-3 rounded-lg cursor-pointer font-semibold"
                once={true}
              >
                LETS BUILD TOGETHER <ArrowRight />
              </TimelineContent>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
