"use client";

import { Check, ChevronDown } from "lucide-react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { useLocale, useTranslations } from "next-intl";
import {
	useCallback,
	useEffect,
	useLayoutEffect,
	useRef,
	useState,
} from "react";
import { usePathname, useRouter } from "@/i18n/navigation";
import { routing } from "@/i18n/routing";

type LanguageSelectorProps = {
	variant?: "light" | "dark";
	fullWidth?: boolean;
	className?: string;
};

const instantTransition = { duration: 0 };
const LOCALE_SWITCH_SCROLL_KEY = "locale-switch-scroll";

const LOCALE_FLAGS: Record<(typeof routing.locales)[number], string> = {
	en: "🇬🇧",
	de: "🇩🇪",
	fr: "🇫🇷",
	es: "🇪🇸",
	it: "🇮🇹",
	zh: "🇨🇳",
	sq: "🇦🇱",
};

export function LanguageSelector({
	variant = "light",
	fullWidth = false,
	className = "",
}: LanguageSelectorProps) {
	const locale = useLocale();
	const router = useRouter();
	const pathname = usePathname();
	const t = useTranslations("navbar");
	const shouldReduceMotion = useReducedMotion();
	const [open, setOpen] = useState(false);
	const containerRef = useRef<HTMLDivElement>(null);

	const handleSelect = useCallback(
		(nextLocale: string) => {
			if (nextLocale === locale) {
				setOpen(false);
				return;
			}

			sessionStorage.setItem(LOCALE_SWITCH_SCROLL_KEY, String(window.scrollY));
			router.replace(pathname, { locale: nextLocale, scroll: false });
			setOpen(false);
		},
		[locale, pathname, router],
	);

	useLayoutEffect(() => {
		const savedScroll = sessionStorage.getItem(LOCALE_SWITCH_SCROLL_KEY);
		if (savedScroll === null) return;

		sessionStorage.removeItem(LOCALE_SWITCH_SCROLL_KEY);
		const scrollY = Number(savedScroll);

		window.scrollTo(0, scrollY);
		requestAnimationFrame(() => {
			window.scrollTo(0, scrollY);
		});
	}, [locale]);

	useEffect(() => {
		if (!open) return;

		const handlePointerDown = (event: PointerEvent) => {
			if (!containerRef.current?.contains(event.target as Node)) {
				setOpen(false);
			}
		};

		const handleEscape = (event: KeyboardEvent) => {
			if (event.key === "Escape") setOpen(false);
		};

		document.addEventListener("pointerdown", handlePointerDown);
		document.addEventListener("keydown", handleEscape);
		return () => {
			document.removeEventListener("pointerdown", handlePointerDown);
			document.removeEventListener("keydown", handleEscape);
		};
	}, [open]);

	const opensUpward = fullWidth;
	const menuPositionClasses = opensUpward
		? "bottom-full mb-2"
		: "top-full mt-2";

	const triggerClasses = `relative flex items-center rounded-full border active:scale-[0.96] ${
		fullWidth
			? "min-w-0 w-full flex-1 justify-between gap-2 px-4 py-2.5"
			: "h-9 justify-center gap-1 px-2.5"
	} ${
		variant === "dark"
			? "border-white/10 bg-white/5 text-slate-300 hover:bg-white/10 hover:text-white"
			: "border-slate-200 bg-slate-900/5 text-slate-600 hover:bg-slate-900/10 hover:text-slate-900"
	} ${className}`;

	return (
		<div
			ref={containerRef}
			className={`relative ${fullWidth ? "min-w-0 flex-1" : ""}`}
		>
			<button
				type="button"
				onClick={() => setOpen((current) => !current)}
				aria-label={t("select_language")}
				aria-expanded={open}
				aria-haspopup="listbox"
				className={triggerClasses}
			>
				<span className="flex min-w-0 items-center gap-2">
					<span className="text-base leading-none" aria-hidden>
						{LOCALE_FLAGS[locale as (typeof routing.locales)[number]]}
					</span>
					<span
						className={
							fullWidth
								? "min-w-0 truncate text-sm font-medium normal-case tracking-normal"
								: "text-xs font-semibold uppercase tracking-wide"
						}
					>
						{fullWidth ? t(`languages.${locale}`) : locale}
					</span>
				</span>
				<ChevronDown
					className={`size-3.5 shrink-0 transition-transform ${
						open ? "rotate-180" : ""
					}`}
					aria-hidden
				/>
			</button>

			<AnimatePresence initial={false}>
				{open ? (
					<motion.ul
						role="listbox"
						aria-label={t("language_options")}
						className={`absolute z-50 min-w-[10.5rem] overflow-hidden rounded-2xl border p-1 shadow-[0_12px_40px_rgba(0,0,0,0.28)] ${menuPositionClasses} ${
							fullWidth ? "inset-x-0 w-full" : "right-0"
						} ${
							variant === "dark"
								? "border-white/10 bg-slate-900/95 text-slate-200 backdrop-blur-xl"
								: "border-slate-200 bg-white/95 text-slate-700 backdrop-blur-xl"
						}`}
						initial={
							shouldReduceMotion
								? false
								: { opacity: 0, y: opensUpward ? 6 : -6, scale: 0.98 }
						}
						animate={{ opacity: 1, y: 0, scale: 1 }}
						exit={
							shouldReduceMotion
								? { opacity: 0 }
								: { opacity: 0, y: opensUpward ? 4 : -4, scale: 0.98 }
						}
						transition={
							shouldReduceMotion
								? instantTransition
								: { type: "spring", duration: 0.28, bounce: 0 }
						}
					>
						{routing.locales.map((code) => {
							const isActive = code === locale;

							return (
								<li key={code} role="none">
									<button
										type="button"
										role="option"
										aria-selected={isActive}
										onClick={() => handleSelect(code)}
										className={`flex w-full items-center justify-between gap-3 rounded-xl px-3 py-2 text-left text-sm transition-[background-color,color] active:scale-[0.98] ${
											isActive
												? variant === "dark"
													? "bg-white/10 text-white"
													: "bg-slate-900/8 text-slate-900"
												: variant === "dark"
													? "text-slate-300 hover:bg-white/5 hover:text-white"
													: "text-slate-600 hover:bg-slate-900/5 hover:text-slate-900"
										}`}
									>
										<span className="flex min-w-0 items-center gap-2.5">
											<span className="text-base leading-none" aria-hidden>
												{LOCALE_FLAGS[code]}
											</span>
											<span className="truncate">{t(`languages.${code}`)}</span>
										</span>
										{isActive ? (
											<Check className="size-4 shrink-0" aria-hidden />
										) : null}
									</button>
								</li>
							);
						})}
					</motion.ul>
				) : null}
			</AnimatePresence>
		</div>
	);
}
