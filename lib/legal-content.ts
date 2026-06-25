/** Paragraph block type for legal content. */
export type LegalParagraphBlock = {
	type: "p";
	text: string;
	variant?: "disclaimer";
};

/** Heading block type for legal content. */
export type LegalHeadingBlock = {
	type: "h3";
	text: string;
};

/** List block type for legal content (ordered or unordered). */
export type LegalListBlock = {
	type: "ul" | "ol";
	items: string[];
};

/** Contact information block type for legal content. */
export type LegalContactBlock = {
	type: "contact";
	name: string;
	address: string;
	email: string;
	phone?: string;
};

/** Union type for all possible legal content blocks. */
export type LegalBlock =
	| LegalParagraphBlock
	| LegalHeadingBlock
	| LegalListBlock
	| LegalContactBlock;

/**
 * Type guard to check if a value is an array of LegalBlock objects.
 *
 * @param value - Value to check
 * @returns True if value is LegalBlock[]
 */
export function isLegalBlockArray(value: unknown): value is LegalBlock[] {
	return (
		Array.isArray(value) &&
		value.every(
			(block) =>
				typeof block === "object" &&
				block !== null &&
				"type" in block &&
				typeof (block as LegalBlock).type === "string",
		)
	);
}
