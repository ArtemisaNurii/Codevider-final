// app/careers/HiringProcess.tsx

import { pageInfoConstants } from "@/lib/constants";

interface HiringProcessProps {
	title?: string;
}

export default function HiringProcess({
	title = "What to Expect Next",
}: HiringProcessProps) {
	return (
		<section className="py-20 px-4 sm:px-6 lg:px-8">
			<div className="max-w-7xl mx-auto text-center">
				<h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl mb-12">
					{title}
				</h2>

				<div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
					{pageInfoConstants.career.processSteps.map((item) => (
						<div
							key={item.step}
							className="flex flex-col items-start text-left bg-white p-8 rounded-2xl shadow-md border border-slate-200 hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
						>
							<div className="flex items-center gap-4 mb-4">
								<div className="shrink-0 h-16 w-16 flex items-center justify-center rounded-full bg-slate-100">
									{item.icon}
								</div>
								<span className="text-5xl font-bold text-slate-300">
									{`0${item.step}`}
								</span>
							</div>
							<h3 className="text-lg font-semibold text-slate-900 mb-2">
								{item.title}
							</h3>
							<p className="text-slate-600 text-pretty leading-relaxed text-sm">
								{item.description}
							</p>
						</div>
					))}
				</div>
			</div>
		</section>
	);
}
