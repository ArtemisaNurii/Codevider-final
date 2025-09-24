"use client"

import { useRef } from "react"
import { TimelineContent } from "./animation"
import VerticalCutReveal from "./vertical"
import { ArrowRight, BookOpen, Globe, Handshake, Lightbulb } from "lucide-react"
import MeetTeamSection from "./meetTeam"
import Image from "next/image"

export default function AboutTeamCulture() {
  const sectionRef = useRef<HTMLDivElement>(null)

  const revealVariants = {
    visible: (i: number) => ({
      y: 0,
      opacity: 1,
      filter: "blur(0px)",
      transition: {
        delay: 1.0 + i * 0.2,
        duration: 0.5,
      },
    }),
    hidden: {
      filter: "blur(10px)",
      y: 20,
      opacity: 0,
    },
  }

  return (
    <section id="team-culture" className="py-28 px-6 bg-white" ref={sectionRef}>
      <div className="max-w-7xl mx-auto space-y-28">
        <div className="text-center px-10">
          <h1 className="sm:text-4xl md:text-5xl text-2xl leading-tight font-semibold text-gray-900  text-left md:text-left">
            <VerticalCutReveal
              splitBy="words"
              staggerDuration={0.1}
              staggerFrom="first"
              reverse={false}
              once={true}
              transition={{ type: "spring", stiffness: 250, damping: 30, delay: 1 }}
            >
              Our Team & Culture
            </VerticalCutReveal>
          </h1>
        </div>

        <div className="grid lg:grid-cols-2 gap-20 items-stretch">
          <TimelineContent
            as="div"
            animationNum={0}
            timelineRef={sectionRef}
            customVariants={revealVariants}
            once={true}
          >
            <div className="bg-transparent p-10 h-full flex flex-col justify-center space-y-8 ">
              <div className="flex items-center gap-4 mb-4">
                <div className="w-12 h-12 bg-slate-900 rounded-2xl flex items-center justify-center">
                  <Lightbulb className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-3xl font-bold text-gray-900">Culture That Inspires</h3>
              </div>
              <p className="text-lg leading-relaxed text-gray-600">
                At Codevider, culture is how we collaborate, innovate, and grow together. We foster an environment where creativity thrives, challenges are embraced, and every idea matters.
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4">
                <div className="flex items-center gap-3 p-4 bg-white rounded-xl shadow-sm">
                  <div className="w-10 h-10 bg-slate-100 rounded-xl flex items-center justify-center">
                    <Lightbulb className="w-5 h-5 text-slate-700" />
                  </div>
                  <span className="font-medium text-gray-800">Innovation at every level</span>
                </div>
                <div className="flex items-center gap-3 p-4 bg-white rounded-xl shadow-sm">
                  <div className="w-10 h-10 bg-slate-100 rounded-xl flex items-center justify-center">
                    <Handshake className="w-5 h-5 text-slate-700" />
                  </div>
                  <span className="font-medium text-gray-800">Collaboration across teams</span>
                </div>
                <div className="flex items-center gap-3 p-4 bg-white rounded-xl shadow-sm">
                  <div className="w-10 h-10 bg-slate-100 rounded-xl flex items-center justify-center">
                    <Globe className="w-5 h-5 text-slate-700" />
                  </div>
                  <span className="font-medium text-gray-800">Diversity and inclusion</span>
                </div>
                <div className="flex items-center gap-3 p-4 bg-white rounded-xl shadow-sm">
                  <div className="w-10 h-10 bg-slate-100 rounded-xl flex items-center justify-center">
                    <BookOpen className="w-5 h-5 text-slate-700" />
                  </div>
                  <span className="font-medium text-gray-800">Continuous learning</span>
                </div>
              </div>
            </div>
          </TimelineContent>

          <TimelineContent
            as="div"
            animationNum={1}
            timelineRef={sectionRef}
            customVariants={revealVariants}
            once={true}
          >
            <div className="bg-transparent p-10 h-full flex flex-col justify-center space-y-8 ">
              <div className="flex items-center gap-4 mb-4">
                <div className="w-12 h-12 bg-slate-900 rounded-2xl flex items-center justify-center">
                  <Handshake className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-3xl font-bold text-gray-900">The Codevider Team</h3>
              </div>
              <div className="space-y-6">
                <p className="text-lg leading-relaxed text-gray-600">
                  Our people are at the heart of every solution we build. With engineers, designers, and strategists from diverse backgrounds, we combine global expertise with local insight to deliver impactful software.
                </p>
                <div className="bg-white rounded-xl p-6 shadow-sm border-l-4 border-slate-900">
                  <p className="text-lg leading-relaxed text-gray-600">
                    From brainstorming sessions to weekly demos, we keep collaboration transparent and outcomes measurable. Together, we make software development a true team sport.
                  </p>
                </div>
              </div>
            </div>
          </TimelineContent>
        </div>

        <div className="grid lg:grid-cols-2 gap-20 items-center">
          <TimelineContent
            as="div"
            animationNum={2}
            timelineRef={sectionRef}
            customVariants={revealVariants}
            once={true}
          >
            <div className="space-y-8">
              <div className="space-y-6">
                <h3 className="text-4xl lg:text-4xl font-bold text-gray-900 leading-tight">
                  Open Communication & Culture of Freedom
                </h3>
                <p className="text-xl text-gray-600 leading-relaxed">
                  We maintain a flexible work environment focused on results. While we have our headquarters, we encourage harmony between remote work and in-person collaboration to foster creativity and well-being.
                </p>
              </div>
              <div className="bg-slate-50 rounded-2xl p-8 border-l-6 border-slate-900">
                <blockquote className="text-xl italic text-gray-700 leading-relaxed">
                  &ldquo;True innovation comes from giving brilliant people the freedom to be brilliant.&rdquo;
                </blockquote>
                <div className="mt-4 flex items-center gap-3">
                  <div className="w-2 h-2 bg-slate-900 rounded-full"></div>
                  <span className="text-sm font-medium text-slate-700">Company Philosophy</span>
                </div>
              </div>
            </div>
          </TimelineContent>

          <TimelineContent
            as="div"
            animationNum={3}
            timelineRef={sectionRef}
            customVariants={revealVariants}
            once={true}
          >
            <div className="relative">
              <div className="aspect-[4/3] rounded-3xl overflow-hidden ">
                <Image src="/images/teamMember/2member.jpg" alt="People talking at office" width={1000} height={1000} className="object-cover w-full h-full" />
              </div>
              <div className="absolute -bottom-6 -right-6 w-24 h-24 bg-slate-900 rounded-2xl "></div>
            </div>
          </TimelineContent>
        </div>

        <div className="grid lg:grid-cols-2 gap-20 items-center">
          <TimelineContent
            as="div"
            animationNum={4}
            timelineRef={sectionRef}
            customVariants={revealVariants}
            once={true}
            className="lg:order-1"
          >
            <div className="relative">
              <div className="aspect-[4/3] rounded-3xl overflow-hidden ">
                <Image src="/images/teamMember/member1.jpg" alt="People talking at office" width={1000} height={1000} className="object-cover w-full h-full" />
              </div>
              <div className="absolute -top-6 -right-6 w-16 h-16 bg-gray-200 rounded-2xl "></div>
            </div>
          </TimelineContent>

          <TimelineContent
            as="div"
            animationNum={5}
            timelineRef={sectionRef}
            customVariants={revealVariants}
            once={true}
            className="lg:order-2"
          >
            <div className="space-y-8">
              <div className="space-y-6">
                <h3 className="text-4xl lg:text-4xl font-bold text-gray-900 leading-tight">
                  Fostering Creativity and Driving Innovation
                </h3>
                <p className="text-xl text-gray-600 leading-relaxed">
                  Our process is built on trust and autonomy. We provide the tools and support our team needs to tackle complex challenges and push the boundaries of what&apos;s possible.
                </p>
              </div>
              <div className="bg-gradient-to-br from-slate-50 to-gray-100 rounded-2xl p-8 shadow-sm border border-gray-200">
                <div className="flex items-start space-x-6">
                  <div className="flex-shrink-0">
                    <div className="w-16 h-16 bg-slate-900 rounded-2xl flex items-center justify-center shadow-lg">
                      <span className="text-white font-bold text-2xl">P</span>
                    </div>
                  </div>
                  <div className="flex-1">
                    <blockquote className="text-lg text-gray-700 italic leading-relaxed mb-4">
                      &ldquo;We believe in empowering our team to think outside the box and challenge conventional approaches.&rdquo;
                    </blockquote>
                    <div className="flex items-center gap-3">
                      <div className="w-2 h-2 bg-slate-900 rounded-full"></div>
                      <p className="text-sm font-semibold text-slate-900">Pasho Toska, Founder & CEO</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </TimelineContent>
        </div>

        <MeetTeamSection />

        <div className="relative mt-32 bg-gradient-to-br from-black via-slate-900 to-sky-800 text-white rounded-3xl p-12 shadow-2xl overflow-hidden">
          <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full -translate-y-16 translate-x-16"></div>
          <div className="absolute bottom-0 left-0 w-24 h-24 bg-white/5 rounded-full translate-y-12 -translate-x-12"></div>
          <div className="relative z-10 grid md:grid-cols-3 gap-10 items-center">
            <div className="md:col-span-2 space-y-6 text-center md:text-left">
              <h3 className="text-4xl lg:text-5xl font-bold leading-tight">Join Our Journey</h3>
              <p className="max-w-2xl mx-auto md:mx-0 text-gray-300 leading-relaxed text-lg">
                We&apos;re always looking for passionate, talented people who want to shape the future of software with us. Explore open roles and become part of our growing team.
              </p>
            </div>
            <div className="md:col-span-1 flex justify-center md:justify-end">
              <a
                href="/career"
                className="group inline-flex items-center gap-3 bg-white text-gray-900 font-semibold px-8 py-4 rounded-2xl shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300"
              >
                See Open Roles 
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
