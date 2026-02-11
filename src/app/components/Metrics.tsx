/* eslint-disable @typescript-eslint/no-unused-vars */
// components/Metrics.tsx
"use client";
import type { NextPage } from "next";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { pageInfoConstants } from "@/lib/constants";
import Link from "next/link";

// Data for the logo cloud with actual client logos
const logos = [
	{ name: "Acron", src: "/images/logo/clients/Acron.svg" },
	{ name: "Ascend", src: "/images/logo/clients/Ascend.png" },
	{ name: "Createape", src: "/images/logo/clients/Create_APE.png" },
	{ name: "Datastake", src: "/images/logo/clients/Datastake.svg" },
	{ name: "Evolvet", src: "/images/logo/clients/Evolvet.png" },
	// { name: "", src: "/images/logo/clients/Daimon.svg" },
	{ name: "Allcot", src: "/images/logo/clients/Allcot.png" },
	{ name: "Beauty Books", src: "/images/logo/clients/Beauty_Books.png" },
];

const Metrics: NextPage = () => {
	const router = useRouter();
	const { transformingIdeas } = pageInfoConstants.home;

	return (
		<section id="about" className="bg-white">
			<div className="container mx-auto px-4 py-16 sm:px-6 lg:px-8 lg:py-24 max-w-7xl ">
				{/* Trusted By Section */}
				{/* <div className="text-center mb-16">
          <p className="text-sm font-semibold text-gray-600 tracking-wide">Trusted by Clients Worldwide</p>
          <div className="mt-8 relative overflow-hidden">
            <div className="flex animate-marquee whitespace-nowrap">
              {/* First set of logos */}
				{/* {logos.map((logo, index) => (
                <div key={index} className="flex flex-col items-center justify-center mx-8 flex-shrink-0">
                  <Image
                    src={logo.src}
                    alt={logo.name}
                    width={120}
                    height={60}
                    className="h-12 w-auto object-contain  hover:grayscale-0 transition-all duration-300"
                  />
                  <span className="text-sm font-medium text-black mt-2">{logo.name}</span>
                </div>
              ))} */}
				{/* Duplicate set for seamless loop */}
				{/*{logos.map((logo, index) => (
                <div key={`duplicate-${index}`} className="flex flex-col items-center justify-center mx-8 flex-shrink-0">
                  <Image
                    src={logo.src}
                    alt={logo.name}
                    width={120}
                    height={60}
                    className="h-12 w-auto object-contain  hover:grayscale-0 transition-all duration-300"
                  />
                  <span className="text-sm font-medium text-black mt-2">{logo.name}</span>
                </div>
              ))}
            </div>
          </div>
        </div> */}

				{/* Main Content Grid */}
				<div className="grid grid-cols-1 gap-16 lg:grid-cols-2 lg:gap-8">
					{/* Left Column: Text Content */}
					<div className="flex flex-col justify-center">
						<h1 className="text-4xl font-bold tracking-tight lg:leading-16 text-gray-900 sm:text-5xl lg:text-6xl">
							{transformingIdeas.title}
						</h1>
						<p className="mt-6 text-lg leading-8 text-gray-600">
							{transformingIdeas.description}
						</p>

						<div className="mt-10">
							<a
								href="/about"
								className="inline-flex items-center gap-2 bg-white border border-gray-300 text-gray-900 font-semibold px-6 py-3 rounded-lg shadow-md hover:gap-4 transition-all duration-300"
							>
								Read More{" "}
								<ArrowRight className="w-5 h-5 stroke-1 md:stroke-2" />
							</a>
						</div>
					</div>

					{/* Right Column: Stats Cards */}
					<div className="grid grid-cols-2 gap-6">
						{transformingIdeas.cards.smallOnes.map((card, index) => (
							<div
								key={index}
								className="col-span-2 sm:col-span-1 flex flex-col justify-between rounded-3xl bg-linear-to-br from-black via-slate-900 to-sky-800  p-8 text-white shadow-xl border border-slate-700/50"
							>
								<div>
									<p className="text-5xl font-bold bg-linear-to-r from-white to-slate-300 bg-clip-text text-transparent">
										{card.metric}
									</p>
									<p className="mt-2 text-slate-300 font-medium">
										{card.title}
									</p>
								</div>
								<div className="mt-6">
									<span className="inline-block rounded-full bg-white/20  border border-blue-400/30 px-4 py-2 text-sm font-medium text-blue-200">
										{card.badge}
									</span>
								</div>
							</div>
						))}

						<div className="col-span-2 flex flex-col justify-between rounded-3xl bg-linear-to-br from-black via-slate-900 to-sky-800 p-8 text-white shadow-xl border border-slate-700/50">
							<div>
								<p className="text-5xl font-bold bg-linear-to-r from-white to-slate-300 bg-clip-text text-transparent">
									{transformingIdeas.cards.largeOne.metric}
								</p>
								<p className="mt-2 text-slate-300 font-medium">
									{transformingIdeas.cards.largeOne.title}
								</p>
							</div>
							<div className="mt-6">
								<span className="inline-block rounded-full  bg-white/20  border border-blue-400/30 px-4 py-2 text-sm font-medium text-blue-200">
									{transformingIdeas.cards.largeOne.badge}
								</span>
							</div>
						</div>
					</div>
				</div>
			</div>
		</section>
	);
};

export default Metrics;
