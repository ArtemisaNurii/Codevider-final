"use client";

import { pageInfoConstants } from "@/lib/constants/index";
import { useEffect, useMemo, useState } from "react";
// Make sure to adjust this path to where you saved the file above

export default function ServicesPage() {
	const [active, setActive] = useState<string>("");
	const { main } = pageInfoConstants.services;

	// We map over the constants to add the index 'idx' for numbering (01, 02, etc.)
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
			{/* Header */}
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
						<nav aria-label="Services index" className="flex flex-col gap-y-1">
							{items.map((it) => {
								// If no active state set yet, default to first item
								const isActive = active ? active === it.slug : it.idx === 1;
								return (
									<button
										key={it.slug}
										onClick={() => scrollTo(it.slug)}
										className={`group flex w-full items-center gap-x-3 rounded-md p-2 text-left transition-colors duration-150 ${
											isActive
												? "bg-slate-100 text-[#0a61cb]"
												: "text-slate-600 hover:bg-slate-50 hover:text-slate-900"
										}`}
										aria-current={isActive ? "true" : undefined}
									>
										<span className="text-sm tabular-nums text-slate-500">
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

				{/* Mobile Jump Menu */}
				<div className="hidden">
					<label htmlFor="jump" className="sr-only">
						Jump to a service
					</label>
					<select
						id="jump"
						className="w-full rounded-md border-slate-300 bg-white px-3 py-2 text-base shadow-sm focus:border-blue-500 focus:ring-blue-500"
						onChange={(e) => scrollTo(e.target.value)}
						defaultValue={items[0]?.slug}
					>
						{items.map((it) => (
							<option key={it.slug} value={it.slug}>
								{String(it.idx).padStart(2, "0")} — {it.title}
							</option>
						))}
					</select>
				</div>

				{/* Sections */}
				<div className="mt-8 md:col-span-8 md:mt-0 lg:col-span-9">
					<div className="space-y-16">
						{items.map((it) => (
							<section key={it.slug} id={it.slug} className="scroll-mt-24">
								<header className="max-w-3xl">
									<p className="text-sm font-semibold uppercase tracking-widest text-slate-500">
										{String(it.idx).padStart(2, "0")}
									</p>
									<h2 className="mt-2 text-3xl font-bold tracking-tight md:text-4xl">
										{it.title}
									</h2>
									<p className="mt-3 text-lg leading-relaxed text-balance text-slate-600">
										{it.description}
									</p>
								</header>

								<div className="mt-8 grid grid-cols-1 gap-x-8 gap-y-6 md:grid-cols-2">
									<div>
										<h3 className="text-base font-semibold tracking-wide">
											Our Solutions{" "}
										</h3>
										<ul className="mt-3 space-y-2 text-base text-slate-700">
											{it.solutions.map((w, idx) => (
												<li key={idx} className="flex items-start gap-3">
													<span className="mt-2 block h-1.5 w-1.5 shrink-0 rounded-full bg-[#0a61cb]" />
													<span>{w}</span>
												</li>
											))}
										</ul>
									</div>
									<div>
										<h3 className="text-base font-semibold tracking-wide">
											Outcomes
										</h3>
										<ul className="mt-3 space-y-2 text-base text-slate-700">
											{it.outcomes.map((u, idx) => (
												<li key={idx} className="flex items-start gap-3">
													<span className="mt-2 block h-1.5 w-1.5 shrink-0 rounded-full bg-[#0a61cb]" />
													<span>{u}</span>
												</li>
											))}
										</ul>
									</div>
								</div>
							</section>
						))}
					</div>

					{/* CTA */}
					<div className="mt-16 border-t border-slate-200 pt-10">
						<h3 className="text-2xl font-semibold">
							Not seeing a perfect match?
						</h3>
						<p className="mt-2 max-w-2xl text-lg text-balance text-slate-600">
							We tailor engagements to fit your roadmap. Tell us about your use
							case and we’ll suggest the most effective path forward.
						</p>
					</div>
				</div>
			</div>
		</main>
	);
}
