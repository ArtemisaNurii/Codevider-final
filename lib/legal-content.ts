export type LegalParagraphBlock = {
	type: "p";
	text: string;
	variant?: "disclaimer";
};

export type LegalHeadingBlock = {
	type: "h3";
	text: string;
};

export type LegalListBlock = {
	type: "ul" | "ol";
	items: string[];
};

export type LegalContactBlock = {
	type: "contact";
	name: string;
	address: string;
	email: string;
	phone?: string;
};

export type LegalBlock =
	| LegalParagraphBlock
	| LegalHeadingBlock
	| LegalListBlock
	| LegalContactBlock;

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
