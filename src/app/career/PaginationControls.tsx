"use client";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { ChevronLeft, ChevronRight } from "lucide-react";

export default function PaginationControls({
	currentPage,
	totalPages,
	totalCount,
	limit,
	hasNext,
	hasPrev,
	onPageChange,
	onLimitChange,
}: PaginationControlsProps) {
	const handlePageChange = (page: number) => {
		onPageChange(page);
	};

	const handleLimitChange = (newLimit: number) => {
		onLimitChange(newLimit);
	};

	if (totalPages <= 1) return null;

	const startItem = (currentPage - 1) * limit + 1;
	const endItem = Math.min(currentPage * limit, totalCount);

	return (
		<div className="bg-white border-t border-gray-200 px-4 py-6 sm:px-6">
			<div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
				{/* Results info */}
				<div className="mb-4 sm:mb-0">
					<p className="text-sm text-gray-700">
						Showing <span className="font-medium">{startItem}</span> to{" "}
						<span className="font-medium">{endItem}</span> of{" "}
						<span className="font-medium">{totalCount}</span> results
					</p>
				</div>

				{/* Pagination controls */}
				<div className="flex items-center gap-2">
					{/* Items per page selector */}
					<div className="mr-4">
						<label htmlFor="per-page-select" className="sr-only">
							Items per page
						</label>
						<select
						id='per-page-select'
							value={limit}
							onChange={(e) => handleLimitChange(Number(e.target.value))}
							className="text-sm border border-gray-300 rounded-md px-2 py-1 bg-white"
						>
							<option value={5}>5 per page</option>
							<option value={10}>10 per page</option>
							<option value={20}>20 per page</option>
							<option value={50}>50 per page</option>
						</select>
					</div>

					{/* Previous button */}
					<Button
						variant="outline"
						size="sm"
						onClick={() => handlePageChange(currentPage - 1)}
						disabled={!hasPrev}
						className="flex items-center gap-1"
					>
						<ChevronLeft className="h-4 w-4" />
						Previous
					</Button>

					{/* Page numbers */}
					<div className="flex items-center gap-1">
						{Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
							let pageNum;
							if (totalPages <= 5) {
								pageNum = i + 1;
							} else if (currentPage <= 3) {
								pageNum = i + 1;
							} else if (currentPage >= totalPages - 2) {
								pageNum = totalPages - 4 + i;
							} else {
								pageNum = currentPage - 2 + i;
							}

							return (
								<Button
									key={pageNum}
									variant={currentPage === pageNum ? "default" : "outline"}
									size="sm"
									onClick={() => handlePageChange(pageNum)}
									className="w-10 h-8"
								>
									{pageNum}
								</Button>
							);
						})}
					</div>

					{/* Next button */}
					<Button
						variant="outline"
						size="sm"
						onClick={() => handlePageChange(currentPage + 1)}
						disabled={!hasNext}
						className="flex items-center gap-1"
					>
						Next
						<ChevronRight className="h-4 w-4" />
					</Button>
				</div>
			</div>
		</div>
	);
}

export function PaginationSkeleton() {
	return (
		<div className="bg-white border-t border-gray-200 px-4 py-6 sm:px-6">
			<div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
				<Skeleton className="h-4 w-56" />
				<div className="flex items-center gap-2">
					<Skeleton className="h-8 w-24" />
					<Skeleton className="h-8 w-24" />
					<div className="hidden sm:flex items-center gap-1">
						{Array.from({ length: 5 }, (_, i) => (
							<Skeleton key={i} className="h-8 w-10" />
						))}
					</div>
					<Skeleton className="h-8 w-24" />
				</div>
			</div>
		</div>
	);
}
