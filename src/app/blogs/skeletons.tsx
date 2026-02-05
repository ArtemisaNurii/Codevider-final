import { ArrowLeft } from "lucide-react";

export function SearchSkeleton() {
	return (
		<div className="flex flex-col md:flex-row gap-4 mb-10 w-full max-w-4xl mx-auto">
			{/* Search Input Skeleton */}
			<div className="flex-1 relative">
				<div className="w-full h-[52px] bg-slate-200 rounded-2xl animate-pulse" />
			</div>
			{/* Tags Dropdown Skeleton */}
			<div className="shrink-0">
				<div className="w-full md:w-[140px] h-[52px] bg-slate-200 rounded-2xl animate-pulse" />
			</div>
		</div>
	);
}

export function BlogDetailSkeleton({ onBack }: { onBack?: () => void }) {
	return (
		<article className="w-full animate-pulse">
			{/* Back Button */}
			{onBack && (
				<div className="flex items-center gap-2 mb-8" onClick={onBack}>
					<div className="w-8 h-8 rounded-full bg-slate-200" />
					<div className="h-4 w-32 bg-slate-200 rounded" />
				</div>
			)}

			{/* Cover Image */}
			<div className="relative aspect-[21/9] rounded-3xl bg-slate-200 mb-12 shadow-sm ring-1 ring-slate-900/5" />

			<header className="mb-12 text-center max-w-2xl mx-auto">
				{/* Tags */}
				<div className="flex flex-wrap justify-center gap-2 mb-6">
					<div className="h-6 w-20 bg-slate-200 rounded-full" />
					<div className="h-6 w-24 bg-slate-200 rounded-full" />
				</div>

				{/* Title */}
				<div className="h-10 bg-slate-200 rounded-lg w-full mb-3" />
				<div className="h-10 bg-slate-200 rounded-lg w-2/3 mx-auto mb-6" />

				{/* Description */}
				<div className="h-5 bg-slate-200 rounded w-full mb-2" />
				<div className="h-5 bg-slate-200 rounded w-full mb-2" />
				<div className="h-5 bg-slate-200 rounded w-3/4 mx-auto mb-8" />

				{/* Meta */}
				<div className="flex items-center justify-center gap-8 border-y border-slate-100 py-4">
					<div className="h-5 w-32 bg-slate-200 rounded" />
					<div className="h-5 w-24 bg-slate-200 rounded" />
				</div>
			</header>

			<div className="grid grid-cols-1 lg:grid-cols-[250px_1fr] gap-12 items-start">
				{/* Sidebar */}
				<aside className="hidden lg:block sticky top-24">
					<div className="h-4 w-40 bg-slate-200 rounded mb-4" />
					<div className="space-y-3">
						<div className="h-4 w-full bg-slate-200 rounded" />
						<div className="h-4 w-full bg-slate-200 rounded" />
						<div className="h-4 w-3/4 bg-slate-200 rounded" />
					</div>
				</aside>

				{/* Content */}
				<div className="w-full">
					<BlogContentSkeleton />
				</div>
			</div>
		</article>
	);
}
// Reusable Content Skeleton
function BlogContentSkeleton() {
	return (
		<div className="space-y-6 animate-pulse">
			<div className="h-4 w-full bg-slate-200 rounded" />
			<div className="h-4 w-full bg-slate-200 rounded" />
			<div className="h-4 w-5/6 bg-slate-200 rounded" />
			<div className="h-40 w-full bg-slate-200 rounded-xl my-8" />
			<div className="h-4 w-full bg-slate-200 rounded" />
			<div className="h-4 w-full bg-slate-200 rounded" />
			<div className="h-4 w-3/4 bg-slate-200 rounded" />
			<div className="h-4 w-full bg-slate-200 rounded" />
		</div>
	);
}

// Export it so we can use it elsewhere
export { BlogContentSkeleton };

// Blog post card component skeleton
export function BlogCardSkeleton() {
	return (
		<div className="bg-white rounded-2xl overflow-hidden border border-slate-200/60 shadow-sm h-full flex flex-col">
			<div className="aspect-[16/9] bg-slate-200 animate-pulse" />
			<div className="p-6 flex-1 flex flex-col">
				<div className="flex gap-2 mb-4">
					<div className="h-5 w-16 bg-slate-200 rounded-full animate-pulse" />
					<div className="h-5 w-20 bg-slate-200 rounded-full animate-pulse" />
				</div>
				<div className="h-7 w-3/4 bg-slate-200 rounded animate-pulse mb-3" />
				<div className="h-4 w-full bg-slate-200 rounded animate-pulse mb-2" />
				<div className="h-4 w-2/3 bg-slate-200 rounded animate-pulse mb-auto" />
				<div className="pt-5 mt-6 border-t border-slate-100 flex justify-between">
					<div className="h-4 w-32 bg-slate-200 rounded animate-pulse" />
				</div>
			</div>
		</div>
	);
}
