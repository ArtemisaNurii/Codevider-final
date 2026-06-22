"use client";

import { Moon, Sun } from "lucide-react";
import { useTranslations } from "next-intl";
import { useTheme } from "../providers/ThemeProvider";

type ThemeToggleProps = {
	variant?: "light" | "dark";
	fullWidth?: boolean;
	className?: string;
};

export function ThemeToggle({
	variant = "light",
	fullWidth = false,
	className = "",
}: ThemeToggleProps) {
	const { theme, isThemeTransitioning, toggleTheme } = useTheme();
	const t = useTranslations("navbar");
	const isDark = theme === "dark";
	const modeLabel = isDark ? t("light_mode") : t("dark_mode");

	const buttonClasses = `relative flex items-center rounded-full border active:scale-[0.96] disabled:pointer-events-none disabled:opacity-70 ${
		fullWidth
			? "min-w-0 w-full flex-1 justify-start gap-2 px-4 py-2.5"
			: "size-9 justify-center"
	} ${
		variant === "dark"
			? "border-white/10 bg-white/5 text-slate-300 hover:bg-white/10 hover:text-white"
			: "border-[var(--border)] bg-[var(--social-bg)] text-[var(--text)] hover:bg-[var(--accent-bg)] hover:text-[var(--text-h)]"
	} ${className}`;

	const handleToggle = (event: React.MouseEvent<HTMLButtonElement>) => {
		event.preventDefault();
		if (isThemeTransitioning) return;

		const rect = event.currentTarget.getBoundingClientRect();
		toggleTheme({
			x: rect.left + rect.width / 2,
			y: rect.top + rect.height / 2,
		});
	};

	return (
		<div className={fullWidth ? "min-w-0 flex-1" : ""}>
			<button
				type="button"
				onClick={handleToggle}
				disabled={isThemeTransitioning}
				aria-busy={isThemeTransitioning}
				aria-label={
					isDark ? t("switch_to_light_mode") : t("switch_to_dark_mode")
				}
				className={buttonClasses}
			>
				<span
					className={`flex items-center gap-2 ${
						fullWidth ? "min-w-0 truncate text-sm font-medium" : ""
					}`}
				>
					<span
						className="flex shrink-0 items-center justify-center"
						aria-hidden
					>
						{isDark ? <Sun className="size-4" /> : <Moon className="size-4" />}
					</span>
					{fullWidth ? <span className="truncate">{modeLabel}</span> : null}
				</span>
			</button>
		</div>
	);
}
