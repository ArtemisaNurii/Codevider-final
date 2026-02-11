import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
	return twMerge(clsx(inputs));
}

export function extractFullDate(dateString: string) {
	const date = new Date(dateString);
	const year = date.getFullYear();
	const month = String(date.getMonth() + 1).padStart(2, "0"); // Months are zero-based
	const day = String(date.getDate()).padStart(2, "0");

	return `${year}-${month}-${day}`;
}
type PayAccordingTo = "hour" | "day" | "week" | "month" | "year";

export function formatPayment(
	start_amount: number | undefined,
	end_amount: number | null | undefined,
	pay_type: string | undefined,
	pay_according_to: PayAccordingTo | undefined,
): string {
	// Handle undefined/null values
	if (!start_amount || !pay_type || !pay_according_to) {
		return "N/A";
	}

	const unitMap: Record<PayAccordingTo, string> = {
		hour: "hr",
		day: "day",
		week: "week",
		month: "mo",
		year: "yr",
	};

	// Format number with commas for thousands
	const formatNumber = (num: number): string => {
		return num.toLocaleString("en-US");
	};

	const unit = unitMap[pay_according_to];
	// Capitalize first letter of pay type
	const type =
		pay_type.charAt(0).toUpperCase() + pay_type.slice(1).toLowerCase();

	if (end_amount && end_amount > start_amount) {
		return `$${formatNumber(start_amount)} - ${formatNumber(end_amount)}/${unit} • ${type}`;
	}

	return `$${formatNumber(start_amount)}/${unit} • ${type}`;
}
