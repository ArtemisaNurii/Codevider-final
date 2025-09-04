"use client"

import { useRef } from "react"
import { TimelineContent } from "./animation"
import VerticalCutReveal from "./vertical"
import { ArrowRight } from "lucide-react"
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
    <section id="team-culture" className="py-24 px-6 bg-white" ref={sectionRef}>
      <div className="max-w-6xl mx-auto space-y-24">
        <div className="text-center max-w-2xl mx-auto">
          <h2 className="sm:text-4xl md:text-5xl text-3xl font-bold text-gray-900">
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
          </h2>
        </div>

        <div className="grid md:grid-cols-2 gap-16 items-start">
          <TimelineContent
            as="div"
            animationNum={0}
            timelineRef={sectionRef}
            customVariants={revealVariants}
            once={true}
          >
            <div className="space-y-6">
              <h3 className="text-2xl font-bold text-gray-900">Culture That Inspires</h3>
              <p className="leading-relaxed">
                At Codevider, culture is how we collaborate, innovate, and grow together. We foster an environment where creativity thrives, challenges are embraced, and every idea matters.
              </p>
              <ul className="grid grid-cols-2 gap-x-6 gap-y-3 text-sm">
                <li>💡 Innovation at every level</li>
                <li>🤝 Collaboration across teams</li>
                <li>🌍 Diversity and inclusion as strengths</li>
                <li>📈 Continuous learning and growth</li>
              </ul>
            </div>
          </TimelineContent>

          <TimelineContent
            as="div"
            animationNum={1}
            timelineRef={sectionRef}
            customVariants={revealVariants}
            once={true}
          >
            <div className="space-y-6">
              <h3 className="text-2xl font-bold text-gray-900">The Codevider Team</h3>
              <p className="leading-relaxed">
                Our people are at the heart of every solution we build. With engineers, designers, and strategists from diverse backgrounds, we combine global expertise with local insight to deliver impactful software.
              </p>
              <p className="leading-relaxed">
                From brainstorming sessions to weekly demos, we keep collaboration transparent and outcomes measurable. Together, we make software development a true team sport.
              </p>
            </div>
          </TimelineContent>
        </div>

        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <TimelineContent
            as="div"
            animationNum={2}
            timelineRef={sectionRef}
            customVariants={revealVariants}
            once={true}
          >
            <div className="space-y-6">
              <h3 className="text-3xl lg:text-4xl font-bold text-gray-900">
                Open Communication & Culture of Freedom
              </h3>
              <p className="text-lg text-gray-600 leading-relaxed">
                We maintain a flexible work environment focused on results. While we have our headquarters, we encourage harmony between remote work and in-person collaboration to foster creativity and well-being.
              </p>
              <blockquote className="border-l-4 border-slate-900 pl-6 italic text-gray-700">
                &ldquo;True innovation comes from giving brilliant people the freedom to be brilliant.&rdquo;
              </blockquote>
            </div>
          </TimelineContent>

          <TimelineContent
            as="div"
            animationNum={3}
            timelineRef={sectionRef}
            customVariants={revealVariants}
            once={true}
          >
            <div className="aspect-[4/3] rounded-2xl overflow-hidden">
              <Image src="/images/teamMember/2member.jpg" alt="People talking at office" width={1000} height={1000} className="object-cover" />
            </div>
          </TimelineContent>
        </div>

        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <TimelineContent
            as="div"
            animationNum={4}
            timelineRef={sectionRef}
            customVariants={revealVariants}
            once={true}
            className="lg:order-1"
          >
            <div className="aspect-[4/3] rounded-2xl overflow-hidden">
              <Image src="/images/teamMember/member1.jpg" alt="People talking at office" width={1000} height={1000} className="object-cover" />
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
            <div className="space-y-6">
              <h3 className="text-3xl lg:text-4xl font-bold text-gray-900">
                Fostering Creativity and Driving Innovation
              </h3>
              <p className="text-lg text-gray-600 leading-relaxed">
                Our process is built on trust and autonomy. We provide the tools and support our team needs to tackle complex challenges and push the boundaries of what&apos;s possible.
              </p>
              <div className="flex items-start space-x-4 p-6 bg-slate-50 rounded-xl">
                <div className="w-12 h-12 bg-slate-900 rounded-full flex items-center justify-center">
                  <span className="text-white font-bold text-lg">P</span>
                </div>
                <div>
                  <p className="text-gray-600 italic mb-2">
                    &ldquo;We believe in empowering our team to think outside the box and challenge conventional approaches.&rdquo;
                  </p>
                  <p className="text-sm font-medium text-slate-900">Pasho Toska, Founder & CEO</p>
                </div>
              </div>
            </div>
          </TimelineContent>
        </div>

        <MeetTeamSection />

        <div className="mt-32 bg-gradient-to-br from-black via-slate-900 to-sky-800 text-white rounded-2xl p-10 shadow-2xl">
          <div className="grid md:grid-cols-3 gap-8 items-center">
            <div className="md:col-span-2 space-y-3 text-center md:text-left">
              <h3 className="text-3xl font-semibold">Join Our Journey</h3>
              <p className="max-w-xl mx-auto md:mx-0 text-gray-300 leading-relaxed">
                We’re always looking for passionate, talented people who want to shape the future of software with us. Explore open roles and become part of our growing team.
              </p>
            </div>
            <div className="md:col-span-1 flex justify-center md:justify-end">
              <a
                href="/career"
                className="inline-flex items-center gap-2 bg-white text-gray-900 font-semibold px-6 py-3 rounded-lg shadow-md hover:gap-4 transition-all duration-300"
              >
                See Open Roles <ArrowRight className="w-5 h-5" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
