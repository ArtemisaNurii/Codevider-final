"use client";

import { Link, usePathname } from "@/i18n/navigation";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { ArrowUpRight, Menu, X } from "lucide-react";
import { CodeviderLogo } from "./CodeviderLogo";
import { useCallback, useEffect, useRef, useState } from "react";
import { useTranslations } from "next-intl";
import { LanguageSelector } from "./LanguageSelector";
import { ThemeToggle } from "./ThemeToggle";

const SCROLL_THRESHOLD = 50;

const navVariants = {
	initial: {
		x: "-50%",
		y: 0,
		width: "100vw",
		height: 72,
		borderRadius: 0,
		backgroundColor: "#1e293b",
		boxShadow: "0 0 0 rgba(0, 0, 0, 0)",
		backdropFilter: "blur(0px)",
	},
	scrolled: {
		x: "-50%",
		y: 10,
		width: "calc(100% - 1.5rem)",
		height: 60,
		borderRadius: 9999,
		backgroundColor: "rgba(15, 23, 42, 0.85)",
		boxShadow:
			"0 12px 40px rgba(0, 0, 0, 0.28), 0 4px 12px rgba(0, 0, 0, 0.16)",
		backdropFilter: "blur(12px)",
	},
} as const;

const springTransition = {
	type: "spring" as const,
	stiffness: 260,
	damping: 32,
	mass: 0.85,
};

const pillSpringTransition = {
	type: "spring" as const,
	stiffness: 380,
	damping: 34,
	mass: 0.75,
};

const instantTransition = { duration: 0 };

const navLinks = [
	{ href: "/", key: "home" as const },
	{ href: "/services", key: "services" as const },
	{ href: "/career", key: "career" as const },
	{ href: "/about", key: "about" as const },
];

function NavLink({
	href,
	label,
	isActive,
	onClick,
	className = "",
	linkRef,
	showStaticPill = false,
}: {
	href: string;
	label: string;
	isActive: boolean;
	onClick?: () => void;
	className?: string;
	linkRef?: (node: HTMLAnchorElement | null) => void;
	showStaticPill?: boolean;
}) {
	return (
		<Link
			ref={linkRef}
			href={href}
			onClick={onClick}
			className={`relative rounded-full px-3 py-1.5 text-sm font-medium transition-[color,transform] active:scale-[0.96] ${
				isActive
					? "text-white"
					: "text-slate-300 hover:bg-white/5 hover:text-white"
			} ${className}`}
		>
			{isActive && showStaticPill ? (
				<span
					className="absolute inset-0 rounded-full bg-white/12"
					aria-hidden
				/>
			) : null}
			<span className="relative z-10">{label}</span>
		</Link>
	);
}

type PillRect = {
	left: number;
	top: number;
	width: number;
	height: number;
	opacity: number;
};

function DesktopNavLinks({ isScrolled }: { isScrolled: boolean }) {
	const t = useTranslations("navbar");
	const pathname = usePathname();
	const shouldReduceMotion = useReducedMotion();
	const containerRef = useRef<HTMLDivElement>(null);
	const linkRefs = useRef<Record<string, HTMLAnchorElement | null>>({});
	const [pill, setPill] = useState<PillRect>({
		left: 0,
		top: 0,
		width: 0,
		height: 0,
		opacity: 0,
	});

	const updatePill = useCallback(() => {
		const container = containerRef.current;
		const activeLink = linkRefs.current[pathname];

		if (!container || !activeLink) {
			setPill((current) => ({ ...current, opacity: 0 }));
			return;
		}

		const containerRect = container.getBoundingClientRect();
		const linkRect = activeLink.getBoundingClientRect();

		setPill({
			left: linkRect.left - containerRect.left,
			top: linkRect.top - containerRect.top,
			width: linkRect.width,
			height: linkRect.height,
			opacity: 1,
		});
	}, [pathname]);

	useEffect(() => {
		updatePill();
	}, [updatePill, isScrolled]);

	useEffect(() => {
		const container = containerRef.current;
		if (!container) return;

		const observer = new ResizeObserver(() => updatePill());
		observer.observe(container);

		window.addEventListener("resize", updatePill);
		return () => {
			observer.disconnect();
			window.removeEventListener("resize", updatePill);
		};
	}, [updatePill]);

	useEffect(() => {
		const frame = requestAnimationFrame(() => {
			requestAnimationFrame(updatePill);
		});

		return () => cancelAnimationFrame(frame);
	}, [isScrolled, updatePill]);

	return (
		<div
			ref={containerRef}
			className="relative hidden items-center justify-center gap-1 navbar:flex"
		>
			<motion.span
				aria-hidden
				className="pointer-events-none absolute rounded-full bg-white/12"
				initial={false}
				animate={pill}
				transition={
					shouldReduceMotion ? instantTransition : pillSpringTransition
				}
			/>
			{navLinks.map(({ href, key }) => (
				<NavLink
					key={href}
					href={href}
					label={t(key)}
					isActive={pathname === href}
					linkRef={(node) => {
						linkRefs.current[href] = node;
					}}
				/>
			))}
		</div>
	);
}

export function Navbar() {
	const t = useTranslations("navbar");
	const pathname = usePathname();
	const shouldReduceMotion = useReducedMotion();
	const [isScrolled, setIsScrolled] = useState(false);
	const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

	useEffect(() => {
		const onScroll = () => {
			setIsScrolled(window.scrollY > SCROLL_THRESHOLD);
		};

		onScroll();
		window.addEventListener("scroll", onScroll, { passive: true });
		return () => window.removeEventListener("scroll", onScroll);
	}, []);

	useEffect(() => {
		setMobileMenuOpen(false);
	}, [pathname]);

	useEffect(() => {
		const mediaQuery = window.matchMedia("(min-width: 936px)");

		const handleViewportChange = (event: MediaQueryListEvent) => {
			if (event.matches) setMobileMenuOpen(false);
		};

		mediaQuery.addEventListener("change", handleViewportChange);
		return () => mediaQuery.removeEventListener("change", handleViewportChange);
	}, []);

	useEffect(() => {
		if (!mobileMenuOpen) return;

		document.body.style.overflow = "hidden";
		const handleEscape = (event: KeyboardEvent) => {
			if (event.key === "Escape") setMobileMenuOpen(false);
		};

		document.addEventListener("keydown", handleEscape);
		return () => {
			document.body.style.overflow = "";
			document.removeEventListener("keydown", handleEscape);
		};
	}, [mobileMenuOpen]);

	const closeMobileMenu = () => setMobileMenuOpen(false);

	return (
		<>
			<motion.nav
				aria-label="Main navigation"
				className={`fixed left-1/2 top-0 z-50 border border-transparent ${
					isScrolled ? "w-full max-w-6xl" : "w-screen max-w-none"
				}`}
				initial={false}
				animate={isScrolled ? "scrolled" : "initial"}
				variants={navVariants}
				transition={shouldReduceMotion ? instantTransition : springTransition}
			>
				<div
					className={`flex h-full w-full items-center justify-between gap-4 px-4 ${
						isScrolled ? "" : "mx-auto max-w-6xl"
					}`}
				>
					<Link
						href="/"
						aria-label="Codevider"
						className="shrink-0 transition-opacity hover:opacity-90 active:scale-[0.96]"
					>
						<CodeviderLogo compact={isScrolled} />
					</Link>

					<DesktopNavLinks isScrolled={isScrolled} />

					<div className="flex shrink-0 items-center justify-end gap-2 sm:gap-3">
						<div className="hidden items-center gap-2 navbar:flex">
							<LanguageSelector variant="dark" />
							<ThemeToggle variant="dark" />
						</div>

						<Link
							href="/about"
							className="inline-flex items-center justify-center gap-1.5 rounded-full bg-[#3a53c9] px-4 py-2 text-sm font-medium text-white transition hover:bg-[#2f46a8] active:scale-[0.96] sm:px-5"
						>
							{t("book_a_call")}
							<ArrowUpRight className="size-4 shrink-0" aria-hidden />
						</Link>

						<button
							type="button"
							className="relative flex size-9 items-center justify-center rounded-full border border-white/10 bg-white/5 text-slate-200 transition-[background-color,color] hover:bg-white/10 hover:text-white active:scale-[0.96] navbar:hidden"
							aria-expanded={mobileMenuOpen}
							aria-controls="mobile-nav-menu"
							aria-label={mobileMenuOpen ? t("close_menu") : t("open_menu")}
							onClick={() => setMobileMenuOpen((open) => !open)}
						>
							<motion.span
								key={mobileMenuOpen ? "close" : "open"}
								initial={
									shouldReduceMotion
										? false
										: { opacity: 0, scale: 0.25, filter: "blur(4px)" }
								}
								animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
								transition={{ type: "spring", duration: 0.3, bounce: 0 }}
								className="absolute flex items-center justify-center"
							>
								{mobileMenuOpen ? (
									<X className="size-5" aria-hidden />
								) : (
									<Menu className="size-5" aria-hidden />
								)}
							</motion.span>
						</button>
					</div>
				</div>
			</motion.nav>

			<AnimatePresence initial={false}>
				{mobileMenuOpen ? (
					<>
						<motion.button
							type="button"
							aria-label={t("close_menu")}
							className="fixed inset-0 z-40 bg-slate-950/60 backdrop-blur-sm navbar:hidden"
							initial={{ opacity: 0 }}
							animate={{ opacity: 1 }}
							exit={{ opacity: 0 }}
							transition={{ duration: 0.2 }}
							onClick={closeMobileMenu}
						/>

						<motion.div
							id="mobile-nav-menu"
							role="dialog"
							aria-modal="true"
							aria-label={t("open_menu")}
							className="fixed inset-x-0 top-[72px] z-40 flex min-h-[calc(100svh-72px)] flex-col border-t border-white/10 bg-slate-900/95 px-4 pb-6 pt-6 shadow-[0_12px_40px_rgba(0,0,0,0.28)] backdrop-blur-xl sm:px-6 navbar:hidden"
							initial={shouldReduceMotion ? false : { opacity: 0, y: -8 }}
							animate={{ opacity: 1, y: 0 }}
							exit={{ opacity: 0, y: -8 }}
							transition={
								shouldReduceMotion
									? instantTransition
									: { type: "spring", duration: 0.35, bounce: 0 }
							}
						>
							<nav
								aria-label="Mobile navigation"
								className="flex w-full flex-1 flex-col overflow-visible"
							>
								<ul className="flex flex-col gap-1">
									{navLinks.map(({ href, key }, index) => (
										<motion.li
											key={href}
											initial={
												shouldReduceMotion ? false : { opacity: 0, y: 8 }
											}
											animate={{ opacity: 1, y: 0 }}
											transition={{
												delay: shouldReduceMotion ? 0 : index * 0.05,
												duration: 0.25,
											}}
										>
											<NavLink
												href={href}
												label={t(key)}
												isActive={pathname === href}
												onClick={closeMobileMenu}
												className="block w-full px-4 py-3 text-base"
												showStaticPill
											/>
										</motion.li>
									))}
								</ul>

								<div className="mt-auto flex items-stretch gap-2 overflow-visible border-t border-white/10 pt-4">
									<LanguageSelector variant="dark" fullWidth />
									<ThemeToggle variant="dark" fullWidth />
								</div>
							</nav>
						</motion.div>
					</>
				) : null}
			</AnimatePresence>
		</>
	);
}
