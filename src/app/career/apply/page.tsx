import { Suspense } from "react";
import { ApplyFormClient } from "./ApplyFormClient";

export default function ApplyPage() {
	return (
		<Suspense
			fallback={
				<div className="min-h-screen flex items-center justify-center">
					Loading...
				</div>
			}
		>
			<ApplyFormClient />
		</Suspense>
	);
}
