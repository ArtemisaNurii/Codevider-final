import messages from "@/dictionaries/en.json";

type MessageTree = Record<string, unknown>;
type Values = Record<
	string,
	string | number | boolean | Date | null | undefined
>;

function getAtPath(tree: unknown, path: string): unknown {
	if (!path) return tree;

	let current: unknown = tree;
	for (const segment of path.split(".")) {
		if (
			current === null ||
			current === undefined ||
			typeof current !== "object"
		) {
			return undefined;
		}
		current = (current as MessageTree)[segment];
	}
	return current;
}

function interpolate(template: string, values?: Values): string {
	if (!values) return template;

	return template.replace(/\{(\w+)\}/g, (match, key: string) => {
		const value = values[key];
		if (value === null || value === undefined) return match;
		if (value instanceof Date) return value.toISOString();
		return String(value);
	});
}

export type CopyTranslator = {
	(key: string, values?: Values): string;
	has: (key: string) => boolean;
	raw: (key: string) => unknown;
};

/**
 * Builds a translator scoped to a namespace in the English copy dictionary.
 */
export function createCopy(namespace = ""): CopyTranslator {
	const root = namespace
		? getAtPath(messages, namespace)
		: (messages as MessageTree);

	const translate = ((key: string, values?: Values) => {
		const value = getAtPath(root, key);
		if (typeof value === "string") {
			return interpolate(value, values);
		}
		return key;
	}) as CopyTranslator;

	translate.has = (key: string) => {
		const value = getAtPath(root, key);
		return typeof value === "string" || value !== undefined;
	};

	translate.raw = (key: string) => getAtPath(root, key);

	return translate;
}

/** Client-side English copy helper. */
export function useCopy(namespace = ""): CopyTranslator {
	return createCopy(namespace);
}

/** Server-side English copy helper. */
export function getCopy(namespace = ""): CopyTranslator {
	return createCopy(namespace);
}

export { messages as englishCopy };
