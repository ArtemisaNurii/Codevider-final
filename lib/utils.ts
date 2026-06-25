/**
 * Returns a new shuffled array using Fisher-Yates algorithm (immutable).
 *
 * @template T - Type of array elements
 * @param array - Array to shuffle
 * @returns New shuffled array
 */
export function shuffle<T>(array: readonly T[]): T[] {
	const result = [...array];
	for (let i = result.length - 1; i > 0; i--) {
		const j = Math.floor(Math.random() * (i + 1));
		[result[i], result[j]] = [result[j], result[i]];
	}
	return result;
}
