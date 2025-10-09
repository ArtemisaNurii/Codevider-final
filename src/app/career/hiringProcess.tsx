// app/careers/HiringProcess.tsx

import { Briefcase, FileText, Users, Award } from "lucide-react" // Using icons for better visuals

const processSteps = [
  {
    step: 1,
    icon: <FileText className="h-8 w-8 text-blue-900" />,
    title: "Application Review",
    description: "Our team carefully reviews your resume and portfolio to see how your skills and experience align with our needs. We look for potential, not just perfection.",
  },
  {
    step: 2,
    icon: <Users className="h-8 w-8 text-blue-900" />,
    title: "HR Interview",
    description: "A friendly chat with our HR team to get to know you, discuss your career goals, and ensure you align with our company culture. It's a two-way street!",
  },
  {
    step: 3,
    icon: <Briefcase className="h-8 w-8 text-blue-900" />,
    title: "Technical Review",
    description: "A practical, in-depth conversation with team leads. We'll dive into your technical expertise and problem-solving skills with real-world scenarios.",
  },
  {
    step: 4,
    icon: <Award className="h-8 w-8 text-blue-900" />,
    title: "The Offer",
    description: "If we're a great match, we'll extend a competitive offer to join our team. We'll walk you through the details and welcome you aboard!",
  },
]

interface HiringProcessProps {
  title?: string
}

export default function HiringProcess({ title = "What to Expect Next" }: HiringProcessProps) {
  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto text-center">
        <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl mb-12">
          {title}
        </h2>

        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
          {processSteps.map((item) => (
            <div
              key={item.step}
              className="flex flex-col items-start text-left bg-white p-8 rounded-2xl shadow-md border border-slate-200 hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
            >
              <div className="flex items-center gap-4 mb-4">
                <div className="flex-shrink-0 h-16 w-16 flex items-center justify-center rounded-full bg-slate-100">
                  {item.icon}
                </div>
                <span className="text-5xl font-bold text-slate-300">
                  {`0${item.step}`}
                </span>
              </div>
              <h3 className="text-lg font-semibold text-slate-900 mb-2">{item.title}</h3>
              <p className="text-slate-600 leading-relaxed text-sm">
                {item.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}