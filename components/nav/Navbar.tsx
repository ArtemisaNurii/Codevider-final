"use client";

import { ArrowUpRight, Menu, X } from "lucide-react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { useTranslations } from "next-intl";
import { useEffect, useRef, useState } from "react";
import { Link, usePathname } from "@/i18n/navigation";
import { useTheme } from "../providers/ThemeProvider";
import { CodeviderLogo } from "./CodeviderLogo";
import { LanguageSelector } from "./LanguageSelector";
import { ThemeToggle } from "./ThemeToggle";

const SCROLL_ON = 56;
const SCROLL_OFF = 24;
const NAV_MAX_WIDTH = 1152;
const NAV_FLOAT_INSET = 12;

type NavAppearance = "dark" | "light";

const navScrollTransition = {
	duration: 0.5,
	ease: [0.22, 1, 0.36, 1] as const,
};

const instantTransition = { duration: 0 };

function navShellClass(appearance: NavAppearance, isScrolled: boolean): string {
	if (appearance === "dark") {
		return isScrolled ? "nav-shell--scrolled-dark" : "nav-shell--surface-dark";
	}
	return isScrolled ? "nav-shell--scrolled-light" : "nav-shell--surface-light";
}

function getNavAppearance(theme: "light" | "dark"): NavAppearance {
	return theme === "dark" ? "light" : "dark";
}

const navTransition = navScrollTransition;

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
	appearance = "dark",
}: {
	href: string;
	label: string;
	isActive: boolean;
	onClick?: () => void;
	className?: string;
	linkRef?: (node: HTMLAnchorElement | null) => void;
	showStaticPill?: boolean;
	appearance?: NavAppearance;
}) {
	const isDarkNav = appearance === "dark";

	return (
		<Link
			ref={linkRef}
			href={href}
			onClick={onClick}
			className={`relative overflow-hidden rounded-full px-3 py-1.5 text-sm font-medium transition-[color,background-color,transform] active:scale-[0.96] ${
				isActive
					? isDarkNav
						? "text-white"
						: "text-slate-900"
					: isDarkNav
						? "text-slate-300 hover:bg-white/5 hover:text-white"
						: "text-slate-600 hover:bg-slate-900/5 hover:text-slate-900"
			} ${className}`}
		>
			{isActive && showStaticPill ? (
				<span
					className={`absolute inset-0 rounded-full ${
						isDarkNav ? "bg-white/12" : "bg-slate-900/8"
					}`}
					aria-hidden
				/>
			) : null}
			<span className="relative z-10">{label}</span>
		</Link>
	);
}

function DesktopNavLinks({ appearance }: { appearance: NavAppearance }) {
	const t = useTranslations("navbar");
	const pathname = usePathname();

	return (
		<div className="relative isolate hidden items-center justify-center gap-1 navbar:flex">
			{navLinks.map(({ href, key }) => (
				<NavLink
					key={href}
					href={href}
					label={t(key)}
					isActive={pathname === href}
					appearance={appearance}
					showStaticPill
				/>
			))}
		</div>
	);
}

export function Navbar() {
	const t = useTranslations("navbar");
	const pathname = usePathname();
	const { theme } = useTheme();
	const shouldReduceMotion = useReducedMotion();
	const [isScrolled, setIsScrolled] = useState(false);
	const isScrolledRef = useRef(false);
	const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
	const navAppearance = getNavAppearance(theme);
	const isDarkNav = navAppearance === "dark";

	useEffect(() => {
		const onScroll = () => {
			const scrollY = window.scrollY;
			const nextIsScrolled = isScrolledRef.current
				? scrollY > SCROLL_OFF
				: scrollY > SCROLL_ON;

			if (nextIsScrolled === isScrolledRef.current) return;

			isScrolledRef.current = nextIsScrolled;
			setIsScrolled(nextIsScrolled);
		};

		onScroll();
		window.addEventListener("scroll", onScroll, { passive: true });
		return () => window.removeEventListener("scroll", onScroll);
	}, []);

	useEffect(() => {
		if (!pathname) return;
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
			<motion.div
				className="fixed inset-x-0 top-0 z-50"
				initial={false}
				animate={{
					paddingTop: isScrolled ? 10 : 0,
					paddingLeft: isScrolled ? NAV_FLOAT_INSET : 0,
					paddingRight: isScrolled ? NAV_FLOAT_INSET : 0,
				}}
				transition={shouldReduceMotion ? instantTransition : navTransition}
			>
				<motion.nav
					aria-label="Main navigation"
					className={`mx-auto w-full border border-transparent ${navShellClass(navAppearance, isScrolled)}`}
					initial={false}
					animate={{
						height: isScrolled ? 60 : 72,
						borderRadius: isScrolled ? 20 : 0,
						maxWidth: isScrolled ? NAV_MAX_WIDTH : 10000,
					}}
					transition={shouldReduceMotion ? instantTransition : navTransition}
				>
					<div className="mx-auto flex h-full w-full max-w-6xl items-center justify-between gap-4 px-4">
						<Link
							href="/"
							aria-label="Codevider"
							className="shrink-0 transition-opacity hover:opacity-90 active:scale-[0.96]"
						>
							<CodeviderLogo
								compact={isScrolled}
								variant={navAppearance}
								stableLayout
							/>
						</Link>

						<DesktopNavLinks appearance={navAppearance} />

						<div className="flex shrink-0 items-center justify-end gap-2 sm:gap-3">
							<div className="hidden items-center gap-2 navbar:flex">
								<LanguageSelector variant={navAppearance} />
								<ThemeToggle variant={navAppearance} />
							</div>

							<Link
								href="https://calendly.com/codevider/pasho"
								className="home-brand-btn gap-1.5 px-4 py-2 text-sm sm:px-5"
							>
								{t("book_a_call")}
								<ArrowUpRight className="size-4 shrink-0" aria-hidden />
							</Link>

							<button
								type="button"
								className={`relative flex size-9 items-center justify-center rounded-full border transition-[background-color,color] active:scale-[0.96] navbar:hidden ${
									isDarkNav
										? "border-white/10 bg-white/5 text-slate-200 hover:bg-white/10 hover:text-white"
										: "border-slate-200 bg-slate-900/5 text-slate-600 hover:bg-slate-900/10 hover:text-slate-900"
								}`}
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
			</motion.div>

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
							className={`fixed inset-x-0 top-[72px] z-40 flex min-h-[calc(100svh-72px)] flex-col px-4 pb-6 pt-6 backdrop-blur-xl sm:px-6 navbar:hidden ${
								isDarkNav
									? "border-t border-white/10 bg-slate-900/95 shadow-[0_12px_40px_rgba(0,0,0,0.28)]"
									: "border-t border-slate-200 bg-white/95 shadow-[0_12px_40px_rgba(0,0,0,0.08)]"
							}`}
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
												appearance={navAppearance}
												onClick={closeMobileMenu}
												className="block w-full px-4 py-3 text-base"
												showStaticPill
											/>
										</motion.li>
									))}
								</ul>

								<div
									className={`mt-auto flex items-stretch gap-2 overflow-visible border-t pt-4 ${
										isDarkNav ? "border-white/10" : "border-slate-200"
									}`}
								>
									<LanguageSelector variant={navAppearance} fullWidth />
									<ThemeToggle variant={navAppearance} fullWidth />
								</div>
							</nav>
						</motion.div>
					</>
				) : null}
			</AnimatePresence>
		</>
	);
}
