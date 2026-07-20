"use client";

import { Moon, Sun } from "lucide-react";
import { useCopy } from "@/lib/copy";
import { useTheme } from "@/components/providers/ThemeProvider";

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
	const t = useCopy("navbar");
	const isDark = theme === "dark";
	const modeLabel = isDark ? t("light_mode") : t("dark_mode");

	const buttonClasses = `relative flex items-center rounded-full border active:scale-[0.96] disabled:pointer-events-none disabled:opacity-70 ${
		fullWidth
			? "min-w-0 w-full flex-1 justify-start gap-2 px-4 py-2.5"
			: "size-10 justify-center"
	} ${
		variant === "dark"
			? "border-white/10 bg-white/5 text-slate-300 hover:bg-white/10 hover:text-white"
			: "border-slate-200 bg-slate-900/5 text-slate-600 hover:bg-slate-900/10 hover:text-slate-900"
	} ${className}`;

	const handleToggle = (event: React.MouseEvent<HTMLButtonElement>) => {
		event.preventDefault();
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
