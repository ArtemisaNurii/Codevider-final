"use client";

import React from "react";
import { motion } from "framer-motion";
import { ArrowRight, Sparkles, Heart, Trophy } from "lucide-react";
import Image from "next/image";
import MeetTeamSection from "./meetTeam";
import Link from "next/link";
import { pageInfoConstants } from "@/lib/constants";

// ---- Helpers ----
const fadeUp = {
	hidden: { opacity: 0, y: 16 },
	show: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

const card =
	"rounded-2xl border bg-gradient-to-r from-black to-slate-800 border-slate-200  shadow-sm hover:shadow-md transition-shadow";

// ---- Component ----
export default function CodeviderCulturePage() {
	const { howWeBuildAtCodevider, pillars, workingAtCodevider } =
		pageInfoConstants.about;
	return (
		<main className="bg-white text-slate-900">
			{/* Hero */}
			<section className="relative overflow-hidden max-w-7xl mx-auto ">
				<div className="pointer-events-none absolute inset-0 max-w-7xl " />
				<div className="container mx-auto px-6 py-24 ">
					<motion.div
						initial={{ opacity: 0, y: 16 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ duration: 0.6 }}
						className="max-w-4xl"
					>
						<p className="text-xs font-semibold uppercase tracking-[0.2em] text-sky-600">
							Our Culture
						</p>
						<h1 className="mt-3 text-4xl font-bold leading-tight tracking-tight md:text-5xl">
							How we build at{" "}
							<span className="bg-linear-to-r from-sky-600 to-slate-900 bg-clip-text text-transparent">
								Codevider
							</span>
						</h1>
						<p className="mt-5 text-lg text-balance text-slate-600 md:text-xl">
							{howWeBuildAtCodevider}
						</p>
						<div className="mt-8 flex flex-wrap gap-3">
							<Link
								href="/career"
								className="inline-flex items-center gap-2 rounded-xl border hover:gap-4 px-5 py-3 text-black hover:bg-slate-950 hover:text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-sky-500"
								aria-label="Explore open roles"
							>
								Join the team
								<ArrowRight className="h-4 w-4" aria-hidden />
							</Link>
						</div>
					</motion.div>
				</div>
			</section>

			{/* Values / Pillars */}
			<section
				id="principles"
				className="container mx-auto max-w-7xl px-6 pb-8 "
			>
				<div className="mx-auto mb-10 max-w-2xl text-center max-sm:text-start">
					<h2 className="text-3xl font-bold  md:text-4xl">
						Principles we live by
					</h2>
					<p className="mt-3 text-slate-600">
						Clear Vision, Clean Code and Supportive Team
					</p>
				</div>
				<div className="grid grid-cols-1 gap-6 text-white sm:grid-cols-2 lg:grid-cols-3">
					{pillars.map((p, i) => (
						<motion.article
							key={p.title}
							className={`${card} p-6`}
							variants={fadeUp}
							initial="hidden"
							whileInView="show"
							viewport={{ once: true, amount: 0.2 }}
							transition={{ delay: i * 0.05 }}
						>
							<div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-xl  text-sky-700">
								{p.icon}
							</div>
							<h3 className="text-lg font-semibold">{p.title}</h3>
							<p className="mt-2 text-white text-balance">{p.description}</p>
						</motion.article>
					))}
				</div>
			</section>

			<section className="container max-w-7xl mx-auto px-6 py-16 md:py-24 ">
				<div className="grid items-start gap-10 lg:grid-cols-2">
					<motion.div
						variants={fadeUp}
						initial="hidden"
						whileInView="show"
						viewport={{ once: true }}
					>
						<h2 className="text-3xl font-semibold tracking-tight md:text-4xl">
							Working at Codevider
						</h2>
						<p className="mt-4 text-slate-600 text-balance">
							{workingAtCodevider.mainText}
						</p>
						<ul className="mt-6 space-y-3 text-slate-700">
							{workingAtCodevider.list.map((item, index) => (
								<li key={index} className="flex items-start gap-3">
									{item.icon} {item.text}
								</li>
							))}
						</ul>
					</motion.div>

					{/* Gallery Placeholder (drop your images) */}
					<div className="grid grid-cols-2 gap-4">
						{workingAtCodevider.gallery.map((imgSrc, index) => (
							<Image
								key={index}
								src={imgSrc}
								alt={`Image ${index + 1}`}
								width={500}
								height={500}
							/>
						))}
					</div>
				</div>
			</section>

			<MeetTeamSection />

			<section
				id="open-roles"
				className="relative overflow-hidden border-t border-slate-200"
			>
				<div className="container max-w-7xl mx-auto px-6 h-1/2 py-16 md:py-24">
					<div className="grid items-center gap-10 rounded-3xl bg-linear-to-br from-black via-slate-950 to-sky-800 p-8 text-white md:grid-cols-2 md:p-12">
						<div>
							<h2 className="text-3xl font-semibold tracking-tight md:text-4xl">
								Join Our Journey
							</h2>
							<p className="mt-3 text-sky-100 text-balance">
								{" "}
								We&apos;re always looking for passionate, talented people who
								want to shape the future of software with us. Explore open roles
								and become part of our growing team.
							</p>
						</div>
						<div className="flex flex-wrap gap-3 md:justify-end">
							<Link
								href="/career"
								className="inline-flex items-center gap-2 rounded-xl bg-white px-5 py-3 text-slate-900 hover:bg-slate-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-white"
								aria-label="See open roles"
							>
								See open roles
								<ArrowRight className="h-4 w-4" aria-hidden />
							</Link>
							{/* <a
                href="/about"
                className="inline-flex items-center gap-2 rounded-xl border border-white/30 bg-transparent px-5 py-3 text-white hover:bg-white/10 focus:outline-none focus-visible:ring-2 focus-visible:ring-white"
                aria-label="Learn more about Codevider"
              >
                Learn more
              </a> */}
						</div>
					</div>
				</div>
			</section>
		</main>
	);
}
