/** Static-export shell route — real job IDs are resolved at runtime from the URL. */
export const CAREER_APPLY_PLACEHOLDER_ID = "_";

const CAREER_APPLY_ID_PATTERN = /\/career\/apply\/(\d+)/;

export function parseCareerApplyJobId(pathname: string): number | null {
	const match = pathname.match(CAREER_APPLY_ID_PATTERN);
	if (!match) return null;

	const jobId = Number(match[1]);
	return Number.isFinite(jobId) && jobId > 0 ? jobId : null;
}

export function isCareerApplyPath(pathname: string): boolean {
	return CAREER_APPLY_ID_PATTERN.test(pathname);
}

export function rewriteCareerApplyPath(pathname: string): string | null {
	if (!isCareerApplyPath(pathname)) return null;

	return pathname.replace(/\/\d+\/?$/, `/${CAREER_APPLY_PLACEHOLDER_ID}`);
}

/** Open jobs fetched at build time for sitemap and static params. */
export async function getOpenJobsForBuild() {
	try {
		const { fetchOpenJobs } = await import("@/lib/api/recruit-jobs");
		const jobs = [];
		let page = 1;

		for (;;) {
			const response = await fetchOpenJobs({ page, limit: 100 });

			jobs.push(...response.data);

			if (!response.meta.hasNextPage) break;
			page += 1;
		}

		return jobs;
	} catch {
		return [];
	}
}

/** Only the placeholder shell is pre-rendered; specific job pages are handled via edge rewrite. */
export async function getCareerApplyJobIds(): Promise<string[]> {
	return [CAREER_APPLY_PLACEHOLDER_ID];
}
