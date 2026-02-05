import Header from "@/app/components/navbar";
import { Footer } from "@/app/components/CTA";

export function ApplyFormSkeleton() {
	return (
		<div>
			<Header />
			{/* Header Section */}
			<div className="w-full bg-linear-to-r from-black via-slate-700 to-sky-600 pt-20 pb-10">
				<div className="max-w-7xl mx-auto px-4 sm:px-6 pt-12 lg:px-8">
					<div className="h-14 w-2/3 mb-4 bg-slate-200 rounded-lg animate-pulse" />
					<div className="h-5 w-full mb-2 bg-slate-200 rounded animate-pulse" />
					<div className="h-5 w-5/6 mb-6 bg-slate-200 rounded animate-pulse" />
					<div className="flex flex-wrap gap-2 mt-3">
						<div className="h-10 w-32 bg-slate-200 rounded-full animate-pulse" />
						<div className="h-10 w-40 bg-slate-200 rounded-full animate-pulse" />
						<div className="h-10 w-48 bg-slate-200 rounded-full animate-pulse" />
					</div>
				</div>
			</div>

			{/* Main Form Section */}
			<main className="max-w-7xl mx-auto py-10 px-4 sm:px-6 lg:px-8">
				{/* Profile Image Section */}
				<div className="space-y-2 mb-10">
					<div className="h-5 w-32 mb-2 bg-slate-200 rounded animate-pulse" />
					<div className="flex items-center gap-4">
						<div className="w-24 h-24 rounded-full bg-slate-200 shrink-0 animate-pulse" />
						<div className="flex-1 space-y-2">
							<div className="h-11 w-full bg-slate-200 rounded-lg animate-pulse" />
							<div className="h-3 w-40 bg-slate-200 rounded animate-pulse" />
						</div>
					</div>
				</div>

				{/* Basic Info Section */}
				<div className="mb-10 space-y-4">
					{/* Name and Email */}
					<div className="flex flex-row gap-4">
						<div className="flex-1">
							<div className="h-11 w-full bg-slate-200 rounded-lg animate-pulse" />
						</div>
						<div className="flex-1">
							<div className="h-11 w-full bg-slate-200 rounded-lg animate-pulse" />
						</div>
					</div>

					{/* Phone and DOB */}
					<div className="flex flex-row gap-4">
						<div className="flex-1">
							<div className="h-11 w-full bg-slate-200 rounded-lg animate-pulse" />
						</div>
						<div className="flex-1">
							<div className="h-11 w-full bg-slate-200 rounded-lg animate-pulse" />
						</div>
					</div>

					{/* Gender */}
					<div className="h-11 w-full bg-slate-200 rounded-lg animate-pulse" />

					{/* Bio */}
					<div className="h-24 w-full bg-slate-200 rounded-lg animate-pulse" />

					{/* Resume */}
					<div>
						<div className="h-5 w-40 mb-2 bg-slate-200 rounded animate-pulse" />
						<div className="h-11 w-full bg-slate-200 rounded-lg animate-pulse" />
						<div className="h-3 w-32 mt-1 bg-slate-200 rounded animate-pulse" />
					</div>
				</div>

				{/* Submit Button */}
				<div className="h-11 w-full bg-slate-200 rounded-lg animate-pulse" />
			</main>
			<Footer />
		</div>
	);
}
