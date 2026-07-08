export function parseCareerApplyJobId(search: URLSearchParams): number | null {
	const id = search.get("id");
	if (!id || !/^\d+$/.test(id)) return null;
	const jobId = Number(id);
	return Number.isFinite(jobId) && jobId > 0 ? jobId : null;
}
