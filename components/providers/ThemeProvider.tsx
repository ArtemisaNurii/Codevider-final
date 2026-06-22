"use client";

import {
	createContext,
	useCallback,
	useContext,
	useEffect,
	useRef,
	useState,
} from "react";
import { flushSync } from "react-dom";

export type Theme = "light" | "dark";

type ThemeCoords = { x: number; y: number };

interface ThemeContextType {
	theme: Theme;
	isThemeTransitioning: boolean;
	setTheme: (theme: Theme) => void;
	toggleTheme: (coords?: ThemeCoords) => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

const STORAGE_KEY = "theme";
const THEME_TRANSITION_MS = 750;
const THEME_TRANSITION_EASING = "cubic-bezier(0.22, 1, 0.36, 1)";

function supportsRadialViewTransition(): boolean {
	if (typeof document.startViewTransition !== "function") {
		return false;
	}

	// Firefox exposes the API but not pseudo-element WAAPI — causes a double-flash.
	return !/Firefox\//i.test(navigator.userAgent);
}

function getStoredTheme(): Theme | null {
	const stored = localStorage.getItem(STORAGE_KEY);
	return stored === "light" || stored === "dark" ? stored : null;
}

function getSystemTheme(): Theme {
	return window.matchMedia("(prefers-color-scheme: dark)").matches
		? "dark"
		: "light";
}

function applyTheme(theme: Theme, options?: { holdTransitions?: boolean }) {
	const root = document.documentElement;
	root.classList.add("theme-switching");
	root.classList.toggle("dark", theme === "dark");

	if (!options?.holdTransitions) {
		requestAnimationFrame(() => {
			requestAnimationFrame(() => {
				root.classList.remove("theme-switching");
			});
		});
	}
}

function releaseThemeSwitching() {
	document.documentElement.classList.remove("theme-switching");
}

function getRevealRadius(x: number, y: number) {
	return Math.hypot(
		Math.max(x, window.innerWidth - x),
		Math.max(y, window.innerHeight - y),
	);
}

export function ThemeProvider({ children }: { children: React.ReactNode }) {
	const [theme, setThemeState] = useState<Theme>("light");
	const [isThemeTransitioning, setIsThemeTransitioning] = useState(false);
	const themeRef = useRef(theme);
	const isTransitioning = useRef(false);
	themeRef.current = theme;

	useEffect(() => {
		const initial = getStoredTheme() ?? getSystemTheme();
		setThemeState(initial);
		applyTheme(initial);
	}, []);

	const setTheme = useCallback((nextTheme: Theme) => {
		setThemeState(nextTheme);
		localStorage.setItem(STORAGE_KEY, nextTheme);
		applyTheme(nextTheme);
	}, []);

	const toggleTheme = useCallback((coords?: ThemeCoords) => {
		if (isTransitioning.current) return;

		const nextTheme = themeRef.current === "dark" ? "light" : "dark";
		const prefersReducedMotion = window.matchMedia(
			"(prefers-reduced-motion: reduce)",
		).matches;
		const canAnimate = supportsRadialViewTransition() && !prefersReducedMotion;

		const updateTheme = (holdTransitions = false) => {
			flushSync(() => {
				setThemeState(nextTheme);
				localStorage.setItem(STORAGE_KEY, nextTheme);
				applyTheme(nextTheme, { holdTransitions });
			});
		};

		if (!canAnimate) {
			updateTheme();
			return;
		}

		isTransitioning.current = true;
		setIsThemeTransitioning(true);

		const finish = () => {
			releaseThemeSwitching();
			isTransitioning.current = false;
			setIsThemeTransitioning(false);
		};

		const transition = document.startViewTransition(() => {
			updateTheme(true);
		});

		const x = coords?.x ?? window.innerWidth / 2;
		const y = coords?.y ?? window.innerHeight / 2;
		const endRadius = getRevealRadius(x, y);

		transition.ready
			.then(() => {
				requestAnimationFrame(() => {
					document.documentElement.animate(
						{
							clipPath: [
								`circle(0px at ${x}px ${y}px)`,
								`circle(${endRadius}px at ${x}px ${y}px)`,
							],
						},
						{
							duration: THEME_TRANSITION_MS,
							easing: THEME_TRANSITION_EASING,
							pseudoElement: "::view-transition-new(root)",
						},
					);
				});
			})
			.catch(finish);

		void transition.finished.finally(finish);
	}, []);

	return (
		<ThemeContext.Provider
			value={{ theme, isThemeTransitioning, setTheme, toggleTheme }}
		>
			{children}
		</ThemeContext.Provider>
	);
}

export function useTheme() {
	const context = useContext(ThemeContext);
	if (!context) {
		throw new Error("useTheme must be used within ThemeProvider");
	}
	return context;
}
