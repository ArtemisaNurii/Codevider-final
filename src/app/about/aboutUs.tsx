"use client";

import { pageInfoConstants } from "@/lib/constants";

export default function AboutSection3() {
	const { main, whoarewe } = pageInfoConstants.about;
	return (
		<section id="about" className=" bg-white mt-10 md:mt-10 ">
			<header className="border-b text-white bg-linear-to-br from-black via-slate-900 to-sky-800 border-slate-200">
				<div className="mx-auto max-w-7xl py-16 md:py-24 px-4   md:px-4 text-start">
					<p className="text-sm pt-10 sm:pt-20 font-semibold uppercase tracking-widest text-sky-300">
						{main.aboveTitle}
					</p>
					<h1 className="mt-4  text-4xl font-bold tracking-tight md:text-5xl">
						{main.title}
					</h1>
					<p className="mt-4  mx-auto text-lg leading-relaxed text-balance text-gray-300">
						{main.description}
					</p>
				</div>
			</header>
			<section className="bg-white font-sans">
				<div className="container mx-auto py-16">
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
								{whoarewe.map((paragraph, index) => (
									<p key={index} className="text-pretty">
										{paragraph}
									</p>
								))}
							</div>
						</div>

						{/* Right Side: CTA column */}
						<div className="space-y-8">
							<div>
								{/* <h3 className="text-2xl font-bold text-gray-900">CODEVIDER</h3>
              <p className="mt-1 text-gray-500">Albania-based software company</p> */}
							</div>

							<div className="sm:p-8 lg:p-6 xl:p-8">
								<p className="text-lg font-medium text-balance text-gray-800">
									Let&apos;s bring your roadmap to life with timely, shipped
									features.{" "}
								</p>

								<button
									onClick={() => {
										window.location.href = "/#contact";
									}}
									type="button"
									className="mt-6 flex w-full items-center justify-center gap-2.5 rounded-lg bg-linear-to-r from-black via-slate-900 to-sky-800 px-6 py-4 hover:gap-4 text-center font-semibold text-white transition focus:outline-none focus:ring-2 focus:ring-gray-900 focus:ring-offset-2"
								>
									<span>LETS BUILD TOGETHER</span>
									<svg
										xmlns="http://www.w3.org/2000/svg"
										className="h-5 w-5 stroke-1 md:stroke-2"
										fill="none"
										viewBox="0 0 24 24"
										stroke="currentColor"
									>
										<path
											strokeLinecap="round"
											strokeLinejoin="round"
											d="M13 7l5 5m0 0l-5 5m5-5H6"
										/>
									</svg>
								</button>
							</div>
						</div>
					</div>
				</div>
			</section>
		</section>
	);
}
