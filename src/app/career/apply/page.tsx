"use client";

import { Suspense, useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { getJobs } from "../action";
import JobApplicationPage from "../form";
import { Footer } from "@/app/components/CTA";
function ApplyPageContent() {
	const searchParams = useSearchParams();
	const jobId = searchParams.get("jobId");
	const [job, setJob] = useState<Job | null>(null);
	const [isLoading, setIsLoading] = useState(true);
	const [notFound, setNotFound] = useState(false);

	useEffect(() => {
		async function fetchJob() {
			if (!jobId) {
				setNotFound(true);
				setIsLoading(false);
				return;
			}

			setIsLoading(true);
			try {
				const jobsResponse = await getJobs();
				const jobs: Job[] = jobsResponse.jobs;
				const foundJob = jobs.find((j) => j.id === parseInt(jobId, 10));

				if (!foundJob) {
					setNotFound(true);
				} else {
					setJob(foundJob);
				}
			} catch (error) {
				console.error("Error fetching job:", error);
				setNotFound(true);
			} finally {
				setIsLoading(false);
			}
		}
		fetchJob();
	}, [jobId]);

	if (isLoading) {
		return (
			<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
				<div className="text-center">Loading job details...</div>
			</div>
		);
	}

	if (notFound || !job) {
		return (
			<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
				<div className="text-center">
					<h1 className="text-2xl font-bold mb-4">Job Not Found</h1>
					<p className="text-gray-600">
						The job you&apos;re looking for doesn&apos;t exist or has been
						removed.
					</p>
				</div>
			</div>
		);
	}

	return (
		<>
			<JobApplicationPage job={job} />
			<Footer />
		</>
	);
}

export default function ApplyPage() {
	return (
		<Suspense
			fallback={
				<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
					<div className="text-center">Loading job details...</div>
				</div>
			}
		>
			<ApplyPageContent />
		</Suspense>
	);
}
