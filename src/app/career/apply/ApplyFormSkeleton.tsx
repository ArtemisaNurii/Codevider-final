import { Skeleton } from "@/components/ui/skeleton";

export function ApplyFormSkeleton() {
	return (
		<div className="min-h-screen flex items-center justify-center">
			<div className="w-full max-w-4xl p-8">
				<Skeleton className="h-12 w-3/4 mb-4" />
				<Skeleton className="h-6 w-full mb-8" />
				<div className="space-y-4">
					<Skeleton className="h-10 w-full" />
					<Skeleton className="h-10 w-full" />
					<Skeleton className="h-32 w-full" />
					<Skeleton className="h-10 w-full" />
				</div>
			</div>
		</div>
	);
}
