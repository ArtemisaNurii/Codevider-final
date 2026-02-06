"use client";

import { ArrowRight, MapPin, Briefcase, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function JobCard({ job }: { job: Job }) {
	const applyHref = `/career/apply?job_id=${job.id}`;
	const description =
		job.job_description
			?.replace(/<[^>]*>/g, " ")
			.replace(/\s+/g, " ")
			.trim() ?? "";

	// Helper function to create metadata tags - good for reusability and clean code
	const InfoTag = ({
		icon,
		text,
	}: {
		icon: React.ReactNode;
		text: string | undefined;
	}) => {
		if (!text) return null;
		return (
			<div className="flex items-center gap-1.5 rounded-full bg-slate-100 px-3 py-1 text-xs font-medium text-slate-700">
				{icon}
				<span>{text}</span>
			</div>
		);
	};

	return (
		<div className="group rounded-xl border bg-white shadow-sm transition-all duration-300 hover:shadow-lg">
			<div className="p-6">
				<div className="flex-1">
					<div className="grid gap-3 sm:grid-cols-[minmax(0,1fr)_auto] sm:items-center">
						<h3 className="text-lg font-semibold text-slate-900 group-hover:text-blue-900 sm:text-xl">
							{job.title}
						</h3>
						<div className="flex flex-wrap items-center gap-2 sm:justify-self-end">
							<InfoTag
								icon={<Briefcase className="h-3.5 w-3.5 stroke-1 md:stroke-2" />}
								text={job.department.name}
							/>
							<InfoTag
								icon={<MapPin className="h-3.5 w-3.5 stroke-1 md:stroke-2" />}
								text={job.addresses?.[0]?.address?.location}
							/>
							<InfoTag
								icon={<Clock className="h-3.5 w-3.5 stroke-1 md:stroke-2" />}
								text={job.job_type.job_type}
							/>
						</div>
					</div>
				</div>
				<div className="mt-4 flex flex-col gap-4 border-t pt-4 sm:flex-row sm:items-center sm:justify-between">
					<p className="text-sm leading-relaxed text-slate-600 line-clamp-2">
						{description}
					</p>
					<Button
						asChild
						className="group/button shrink-0 bg-slate-900 text-[#67c1dd] hover:bg-slate-800"
					>
						<a href={applyHref}>
							Apply Now
							<ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover/button:translate-x-1" />
						</a>
					</Button>
				</div>
			</div>
		</div>
	);
}
