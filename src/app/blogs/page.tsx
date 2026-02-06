import { Suspense } from "react";
import { SearchSkeleton } from "./skeletons";
import BlogsPageClient from "./BlogsPageClient";

export default function Page() {
	return (
		<Suspense
			fallback={
				<div className="min-h-screen bg-white py-20">
					<SearchSkeleton />
				</div>
			}
		>
			<BlogsPageClient />
		</Suspense>
	);
}
