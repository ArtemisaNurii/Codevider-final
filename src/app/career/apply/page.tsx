import { Suspense } from "react";
import { ApplyFormClient } from "./ApplyFormClient";
import { ApplyFormSkeleton } from "./ApplyFormSkeleton";

export default function ApplyPage() {
	return (
		<Suspense fallback={<ApplyFormSkeleton />}>
			<ApplyFormClient />
		</Suspense>
	);
}
