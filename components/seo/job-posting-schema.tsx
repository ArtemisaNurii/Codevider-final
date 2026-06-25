import type { JobDetail } from "@/lib/types/recruit";
import { getSiteUrl } from "@/lib/site";

type Props = {
	job: JobDetail;
	locale: string;
};

export function JobPostingSchema({ job, locale }: Props) {
	const schema = {
		"@context": "https://schema.org",
		"@type": "JobPosting",
		title: job.title,
		description: job.job_description ?? job.title,
		datePosted: job.start_date,
		validThrough: job.end_date,
		hiringOrganization: {
			"@type": "Organization",
			name: "Codevider",
			sameAs: getSiteUrl(),
		},
		jobLocation: {
			"@type": "Place",
			address: {
				"@type": "PostalAddress",
				streetAddress: "Barrikada Street",
				addressLocality: "Tirana",
				postalCode: "1001",
				addressCountry: "AL",
			},
		},
		employmentType: job.job_type?.job_type ?? "FULL_TIME",
		url: `${getSiteUrl()}/${locale}/career/apply/${job.id}`,
	};

	return (
		<script
			type="application/ld+json"
			dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
		/>
	);
}
