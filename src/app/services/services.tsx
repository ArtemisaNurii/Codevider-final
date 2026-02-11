"use client";

import { pageInfoConstants } from "@/lib/constants/index";
import { useEffect, useMemo, useState } from "react";

export default function ServicesPage() {
	const [active, setActive] = useState<string>("");
	const { main } = pageInfoConstants.services;

	const items = useMemo(
		() =>
			pageInfoConstants.services.services.map((s, i) => ({
				...s,
				idx: i + 1,
			})),
		[],
	);

	useEffect(() => {
		const observer = new IntersectionObserver(
			(entries) => {
				const visibleEntry = entries.find((e) => e.isIntersecting);
				if (visibleEntry) {
					setActive(visibleEntry.target.getAttribute("id") || "");
				}
			},
			{
				rootMargin: "-25% 0px -40% 0px",
				threshold: 0,
			},
		);

		items.forEach((it) => {
			const el = document.getElementById(it.slug);
			if (el) observer.observe(el);
		});

		return () => observer.disconnect();
	}, [items]);

	const scrollTo = (slug: string) => {
		const el = document.getElementById(slug);
		if (!el) return;
		el.scrollIntoView({ behavior: "smooth", block: "start" });
	};

	return (
		<main className="bg-white text-slate-900">
			{/* Header - UNCHANGED */}
			<header className="border-b text-white bg-linear-to-br from-black via-slate-900 to-sky-800 border-slate-200">
				<div className="mx-auto max-w-7xl px-6 py-16 md:py-20 mt-10 md:mt-20 ">
					<p className="text-sm font-semibold uppercase tracking-widest mt-10 text-sky-300">
						{main.aboveTitle}
					</p>
					<h1 className="mt-4 text-4xl font-bold tracking-tight md:text-5xl">
						{main.title}
					</h1>
					<p className="mt-4 max-w-3xl text-lg text-balance leading-relaxed text-gray-300">
						{main.description}
					</p>
				</div>
			</header>

			{/* Content */}
			<div className="mx-auto grid max-w-7xl grid-cols-1 gap-x-12 px-6 py-16 md:grid-cols-12">
				{/* Sticky Index (Desktop) */}
				<aside className="hidden md:col-span-4 md:block lg:col-span-3">
					<div className="sticky top-24">
						<nav aria-label="Services index" className="flex flex-col gap-y-4 ">
							{items.map((it) => {
								const isActive = active ? active === it.slug : it.idx === 1;
								return (
									<button
										key={it.slug}
										onClick={() => scrollTo(it.slug)}
										className={`group flex w-full items-center cursor-pointer gap-x-3 rounded-md p-2 text-left transition-all duration-200 ${
											isActive
												? "bg-slate-100 text-[#0a61cb]"
												: "text-slate-600 hover:bg-slate-50 hover:text-slate-900"
										}`}
										aria-current={isActive ? "true" : undefined}
									>
										<span className="text-sm tabular-nums text-slate-400">
											{String(it.idx).padStart(2, "0")}
										</span>
										<span
											className={`text-base ${isActive ? "font-semibold" : "font-medium"}`}
										>
											{it.title}
										</span>
									</button>
								);
							})}
						</nav>
					</div>
				</aside>

				{/* Sections */}
				<div className="mt-8 md:col-span-8 md:mt-0 lg:col-span-9">
					<div className="space-y-12">
						{items.map((it) => (
							<section
								key={it.slug}
								id={it.slug}
								className="scroll-mt-24 border border-slate-200 rounded-2xl bg-white p-8 md:p-10 shadow-sm transition-shadow hover:shadow-md"
							>
								<header className="max-w-3xl">
									<div className="flex items-center gap-3 mb-2">
										<span className="text-xs font-bold uppercase tracking-widest text-[#0a61cb] bg-blue-50 px-2 py-1 rounded">
											Service {String(it.idx).padStart(2, "0")}
										</span>
									</div>
									<h2 className="text-3xl font-bold tracking-tight text-slate-900 md:text-4xl">
										{it.title}
									</h2>
									<p className="mt-4 text-lg leading-relaxed text-slate-600">
										{it.description}
									</p>
								</header>

								<div className="mt-10 grid grid-cols-1 gap-x-12 gap-y-8 border-t border-slate-100 pt-8 md:grid-cols-2">
									<div>
										<h3 className="text-sm font-bold uppercase tracking-wider text-slate-900">
											Our Solutions
										</h3>
										<ul className="mt-4 space-y-3 text-base text-slate-700">
											{it.solutions.map((w, idx) => (
												<li key={idx} className="flex items-start gap-3">
													<span className="mt-2 block h-1.5 w-1.5 shrink-0 rounded-full bg-[#0a61cb]" />
													<span className="leading-snug">{w}</span>
												</li>
											))}
										</ul>
									</div>
									<div>
										<h3 className="text-sm font-bold uppercase tracking-wider text-slate-900">
											Outcomes
										</h3>
										<ul className="mt-4 space-y-3 text-base text-slate-700">
											{it.outcomes.map((u, idx) => (
												<li key={idx} className="flex items-start gap-3">
													<span className="mt-2 block h-1.5 w-1.5 shrink-0 rounded-full bg-[#0a61cb]" />
													<span className="leading-snug">{u}</span>
												</li>
											))}
										</ul>
									</div>
								</div>
							</section>
						))}
					</div>

					{/* Blue CTA Card */}
					<div className="mt-16 rounded-3xl bg-linear-to-br from-black via-slate-900 to-sky-800 border-slate-200 p-8 md:p-12 text-white shadow-xl shadow-blue-900/10">
						<div className="max-w-2xl">
							<h3 className="text-3xl font-bold">
								Not seeing a perfect match?
							</h3>
							<p className="mt-4 text-lg text-blue-50 leading-relaxed opacity-90">
								We tailor engagements to fit your roadmap. Tell us about your
								use case and we’ll suggest the most effective path forward.
							</p>
							<div className="mt-8">
								<button
									onClick={() =>
										(window.location.href = "mailto:info@codevider.com")
									}
									className="rounded-full bg-white px-8 py-3 text-base font-bold text-[#0a61cb] transition-transform hover:scale-105 active:scale-95"
								>
									Get in Touch
								</button>
							</div>
						</div>
					</div>
				</div>
			</div>
		</main>
	);
}
