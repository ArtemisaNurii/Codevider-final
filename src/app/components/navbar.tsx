"use client";

import { ArrowUpRight, X } from "lucide-react";
import { useState, useEffect, useCallback, useMemo } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import type { Route } from "next";
import NavbarCodeviderLogo from "./navbar-codevider-logo";

type NavLink = { name: string; href: Route };

export const navLinks = [
	{ name: "Home", href: "/" },
	{ name: "Services", href: "/services" },
	{ name: "Career", href: "/career" },
	{ name: "About", href: "/about" },
] as const satisfies readonly NavLink[];

const Header = () => {
	const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
	const pathname = usePathname();
	const router = useRouter();
	const isHomePage = pathname === "/";
	const [isSolid, setIsSolid] = useState(!isHomePage);

	const toggleMobileMenu = useCallback(() => setIsMobileMenuOpen((v) => !v), []);
	const closeMobileMenu = useCallback(() => setIsMobileMenuOpen(false), []);

	const handleLinkHover = useCallback(
		(href: Route) => {
			if (href !== pathname) router.prefetch(href);
		},
		[router, pathname]
	);

	// Lock page scroll when mobile menu is open
	useEffect(() => {
		document.documentElement.style.overflow = isMobileMenuOpen ? "hidden" : "";
		return () => {
			document.documentElement.style.overflow = "";
		};
	}, [isMobileMenuOpen]);

	// Scroll Handler
	useEffect(() => {
		if (!isHomePage) {
			setIsSolid(true);
			return;
		}

		const handleScroll = () => {
			const heroSection = document.getElementById("hero");
			const threshold = heroSection
				? heroSection.offsetTop + heroSection.offsetHeight - 80
				: window.innerHeight;
			setIsSolid(window.scrollY > threshold);
		};

		window.addEventListener("scroll", handleScroll, { passive: true });
		return () => window.removeEventListener("scroll", handleScroll);
	}, [isHomePage]);

	const year = useMemo(() => new Date().getFullYear(), []);
	const logoTextColor = useMemo(() => (isSolid ? "#1a1a1a" : "#fff"), [isSolid]);

	return (
		<header
			className={`fixed top-0 left-0 right-0 z-50 px-4 py-4 transition-all duration-500 ease-in-out ${isSolid
					? "bg-white/90 border-b border-gray-200/50 backdrop-blur-md py-3"
					: "bg-transparent border-transparent"
				}`}
		>
			<div className="max-w-7xl mx-auto flex justify-between items-center">
				{/* Logo */}
				<Link href="/" className="relative z-50">
					<NavbarCodeviderLogo logoTextColor={logoTextColor} />
				</Link>

				{/* Desktop Nav - Refined Pill Design */}
				<nav
					className={`hidden md:flex items-center justify-center backdrop-blur-xl rounded-full px-2 py-1.5 transition-colors duration-300 ${isSolid
							? "bg-gray-200/70 border border-gray-200/50"
							: "bg-white/10 border border-white/10"
						}`}
				>
					<ul className="flex items-center gap-1">
						{navLinks.map((link, index) => (
							<li key={link.name} className="flex items-center">
								<Link
									href={link.href}
									className="relative group px-5 py-2 text-sm font-medium transition-colors duration-300 rounded-full overflow-hidden"
									onMouseEnter={() => handleLinkHover(link.href)}
								>
									{/* The Background Pill (Absolute) */}
									<span
										className={`absolute inset-0 w-full h-full transition-all duration-300 ease-out opacity-0 scale-90 group-hover:scale-100 group-hover:opacity-100 rounded-full ${isSolid ? "bg-black" : "bg-white"
											}`}
									/>

									{/* The Text (Relative) */}
									<span
										className={`relative z-10 transition-colors duration-300 ${isSolid
												? "text-gray-600 group-hover:text-white"
												: "text-white/90 group-hover:text-black"
											}`}
									>
										{link.name}
									</span>
								</Link>

								{/* Separator (Outside the hover area) */}
								{index < navLinks.length - 1 && (
									<span
										className={`mx-1 text-xs select-none ${isSolid ? "text-gray-300" : "text-white/20"
											}`}
									>
										|
									</span>
								)}
							</li>
						))}
					</ul>
				</nav>

				{/* Desktop Book a Call */}
				<Link
					href="https://calendly.com/codevider/pasho"
					target="_blank"
					className={`hidden md:flex group pl-5 pr-1 py-3 rounded-full items-center gap-3 text-sm font-semibold transition-all duration-300 border ${isSolid
							? "bg-black text-white hover:bg-gray-800"

							: "bg-white text-black hover:bg-gray-100"
						}`}
				>
					<span>BOOK A CALL</span>
					<div

						className={`rounded-full p-1 ${isSolid ? "bg-white text-black" : "bg-black text-white"}`}

					>

						<ArrowUpRight size={14} />

					</div>
				</Link>

				<button
					onClick={toggleMobileMenu}
					className={`md:hidden backdrop-blur-md p-2 rounded-full transition-all duration-300 ${isSolid
							? "bg-transparent text-black hover:bg-black/20"
							: "bg-transparent text-white hover:bg-white/20"
						}`}
					aria-label="Toggle mobile menu"
					aria-expanded={isMobileMenuOpen}
				>
					<span className="relative block w-4 h-4">
						{/* top line */}
						<span
							className={`absolute left-0 top-0 h-px w-4 bg-current transition-all duration-300 ease-in-out ${isMobileMenuOpen
									? "translate-y-1.5 rotate-45"
									: "translate-y-0 rotate-0"
								}`}
						/>
						{/* middle line */}
						<span
							className={`absolute left-0 top-1/2 h-px w-4 bg-current transition-all duration-300 ease-in-out -translate-y-1/2 ${isMobileMenuOpen ? "opacity-0" : "opacity-100"
								}`}
						/>
						{/* bottom line */}
						<span
							className={`absolute left-0 bottom-0 h-px w-4 bg-current transition-all duration-300 ease-in-out ${isMobileMenuOpen
									? "-translate-y-1.5 -rotate-45"
									: "translate-y-0 rotate-0"
								}`}
						/>
					</span>
				</button>
			</div>

			{/* --- MOBILE OVERLAY (Original Code) --- */}
			<div
				className={`fixed inset-0 md:hidden z-60 bg-black/95 backdrop-blur-lg transition-all duration-700 ease-in-out ${isMobileMenuOpen
						? "opacity-100 visible translate-y-0"
						: "opacity-0 invisible -translate-y-full"
					}`}
				style={{ height: "100dvh" }}
				onClick={(e) => {
					if (e.currentTarget === e.target) closeMobileMenu();
				}}
			>
				{/* Close button INSIDE overlay (always visible) */}
				<button
					onClick={(e) => {
						e.stopPropagation();
						closeMobileMenu();
					}}
					className="absolute top-4 right-4 p-3 rounded-full bg-white/10 text-white hover:bg-white/20 transition z-10"
					aria-label="Close menu"
				>
					<X size={20} />
				</button>

				{/* Content */}
				<div
					className={`flex flex-col items-center justify-center h-full space-y-8 px-6 transition-all duration-500 ease-out ${isMobileMenuOpen
							? "translate-y-0 opacity-100"
							: "translate-y-12 opacity-0"
						}`}
				>
					<nav className="flex flex-col items-start space-y-6">
						{navLinks.map((link) => (
							<Link
								key={link.name}
								href={link.href}
								className="text-2xl font-medium text-white hover:text-gray-300"
								onClick={closeMobileMenu}
								onMouseEnter={() => handleLinkHover(link.href)}
								prefetch={true}
							>
								{link.name}
							</Link>
						))}
					</nav>
					<Link
						href="https://calendly.com/codevider/pasho"
						target="_blank"
						rel="noopener noreferrer"
						className="bg-white text-black px-8 py-3 rounded-full flex items-center gap-3 text-lg font-semibold hover:bg-gray-100 mt-8"
						onClick={() => setIsMobileMenuOpen(false)}
					>
						BOOK A CALL
						<div className="bg-black text-white rounded-full p-2">
							<ArrowUpRight size={18} className="stroke-1 md:stroke-2" />
						</div>
					</Link>
				</div>

				{/* Bottom divider + rights reserved (mobile only) */}
				<div className="absolute bottom-0 left-0 right-0">
					<div className="h-px w-full bg-white/15" />
					<p className="text-center text-xs text-white/60 py-4">
						© {year} Codevider — All rights reserved.
					</p>
				</div>
			</div>
		</header>
	);
};

export default Header;