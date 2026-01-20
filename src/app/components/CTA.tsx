"use client";
import { useRef } from "react";
import Link from "next/link";
import { Instagram, Facebook, Linkedin } from "lucide-react";

import ContactForm from "./ContactForm";
import NavbarCodeviderLogo from "./navbar-codevider-logo";
import { pageInfoConstants } from "@/lib/constants";

// Reusable Footer Component
export const Footer: React.FC = () => {
	return (
		<footer
			id="contact"
			className="relative z-10 py-8 sm:py-12 lg:py-16 px-4 sm:px-6 lg:px-8 bg-slate-50 text-gray-900"
		>
			<div className="max-w-7xl mx-auto">
				<div className="grid grid-cols-1 sm:grid-cols-2 md:flex md:justify-between gap-x-6 gap-y-8 text-left">
					<div className="space-y-4">
						<p className="font-bold text-lg sm:text-base text-gray-900">
							Company
						</p>
						<ul className="text-gray-700 space-y-1">
							<li>
								<Link
									href="/about"
									className="hover:text-blue-600 transition-colors text-base sm:text-sm block py-1"
								>
									About Us
								</Link>
							</li>
							<li>
								<Link
									href="/services"
									className="hover:text-blue-600 transition-colors text-base sm:text-sm block py-1"
								>
									Services
								</Link>
							</li>
							<li>
								{/* <Link href="/projects" className="hover:text-blue-600 transition-colors text-base sm:text-sm block py-1">
                Projects
              </Link> */}
							</li>
							<li>
								<Link
									href="/career"
									className="hover:text-blue-600 transition-colors text-base sm:text-sm block py-1"
								>
									Careers
								</Link>
							</li>
						</ul>
					</div>

					{/* Column 2 (DESKTOP ONLY): Address */}
					<div className="hidden md:block space-y-4">
						<p className="font-bold text-base text-gray-900">Address</p>
						<address className="text-gray-700 text-sm not-italic leading-7">
							Codevider <br />
							Barrikada Street <br />
							Tirana, Albania 1001
						</address>
					</div>

					{/* Column 3: Contact */}
					<div className="space-y-4 sm:col-span-2 md:col-span-1">
						<p className="font-bold text-lg sm:text-base text-gray-900">
							Contact
						</p>
						<ul className="space-y-1 text-gray-700">
							<li>
								<a
									href="mailto:hr@codevider.com"
									className="hover:text-blue-600 transition-colors wrap-break-word text-base sm:text-sm block py-1 font-medium"
								>
									info@codevider.com
								</a>
							</li>
							<li>
								<a
									href="tel:+355695877742"
									className="hover:text-blue-600 transition-colors text-base sm:text-sm block py-1 font-medium"
								>
									+355 69 587 7742
								</a>
							</li>
							<li>
								{/* <a
                href="tel:+12247880689"
                className="hover:text-blue-600 transition-colors text-base sm:text-sm block py-1 font-medium"
              >
                +1 224 788 0689
              </a> */}
							</li>
						</ul>
					</div>
				</div>

				{/* --- Bottom Section --- */}
				<div className="mt-10 pt-6 border-t border-gray-200">
					<div className="flex flex-col md:flex-row md:justify-between md:items-start gap-6">
						{/* Left: Logo, Tagline, and Mobile-Only Address */}
						<div className="text-left">
							{NavbarCodeviderLogo({
								logoTextColor: "fff",
							})}
							<p className="mt-4 text-gray-600 text-sm sm:text-xs max-w-md justify-self-center leading-relaxed">
								Stay updated on our latest developments, insights, and
								opportunities.
							</p>

							{/* Address for MOBILE VIEW ONLY */}
							<address className="mt-4 text-sm sm:text-xs text-gray-500 not-italic md:hidden leading-relaxed">
								<strong>Codevider</strong>
								<br />
								Barrikada Street
								<br />
								Tirana, Albania 1001
							</address>
						</div>

						{/* Right: Social Icons */}
						<div className="flex items-center justify-center md:justify-end gap-4 mt-4 md:mt-0">
							<p className="text-sm text-gray-600 mr-2 hidden sm:block">
								Follow us:
							</p>
							<Link
								href="https://www.instagram.com/codevider/"
								target="_blank"
								rel="noopener noreferrer"
								aria-label="Instagram"
								className="text-gray-500 hover:text-blue-600 transition-colors p-2 hover:bg-blue-50 rounded-full"
							>
								<Instagram className="w-6 h-6" />
							</Link>
							<Link
								href="https://linkedin.com/company/codevider"
								target="_blank"
								rel="noopener noreferrer"
								aria-label="LinkedIn"
								className="text-gray-500 hover:text-blue-600 transition-colors p-2 hover:bg-blue-50 rounded-full"
							>
								<Linkedin className="w-6 h-6" />
							</Link>
							<Link
								href="https://www.facebook.com/codevider/"
								target="_blank"
								rel="noopener noreferrer"
								aria-label="Facebook"
								className="text-gray-500 hover:text-blue-600 transition-colors p-2 hover:bg-blue-50 rounded-full"
							>
								<Facebook className="w-6 h-6" />
							</Link>
						</div>
					</div>

					{/* Copyright */}
					<p className="mt-6 pt-4 border-t border-gray-100 text-xs text-gray-500 text-center">
						© {new Date().getFullYear()} Codevider. All rights reserved.
					</p>
				</div>
			</div>
		</footer>
	);
};

const Contact: React.FC = () => {
	const sectionRef = useRef<HTMLElement | null>(null);
	const { contact } = pageInfoConstants.home;

	return (
		<>
			<div id="contact" className="relative overflow-hidden text-white">
				<section
					ref={sectionRef}
					className="relative z-10 px-4 py-20 sm:py-28 bg-linear-to-br from-black via-slate-900 to-sky-800 "
				>
					<div className="max-w-7xl mx-auto grid lg:grid-cols-2 lg:gap-16 items-stretch">
						<div className="text-center lg:text-left mb-12 lg:mb-0 flex flex-col justify-center">
							<p className="text-sm font-semibold uppercase tracking-wider text-gray-400 mb-3">
								{contact.aboveTitle}
							</p>
							<h2 className="text-4xl sm:text-5xl font-semibold leading-tight text-white mb-6">
								{contact.title}
							</h2>
							<p className="text-lg text-gray-300 max-w-lg text-balance mx-auto lg:mx-0 mb-8">
								{contact.description}
							</p>

							<div className="flex flex-col sm:flex-row gap-6 justify-center lg:justify-start">
								{contact.buttonList.map((button, index) => (
									<a
										key={index}
										href={button.href}
										className="group flex items-center gap-3 text-left"
									>
										<div className="rounded-full bg-white/10 p-3 transition-colors group-hover:bg-sky-400/20">
											{button.icon}
										</div>

										<div>
											<p className="font-semibold">{button.text}</p>
											<p className="text-sm text-gray-400">{button.detail}</p>
										</div>
									</a>
								))}
							</div>
						</div>

						<div className="w-full flex flex-col justify-center">
							<ContactForm />
						</div>
					</div>
				</section>

				<Footer />
			</div>
		</>
	);
};

export default Contact;
