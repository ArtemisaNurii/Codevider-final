import { SiteDocument } from "@/components/layout/site-document";

export default function NotFound() {
	return (
		<SiteDocument locale="en">
			<div className="relative isolate flex min-h-screen flex-col items-center justify-center overflow-hidden px-6 text-center">
				<div className="home-hero__blobs" aria-hidden>
					<div className="home-hero__blob home-hero__blob--primary" />
					<div className="home-hero__blob home-hero__blob--secondary" />
					<div className="home-hero__blob home-hero__blob--accent home-hero__blob--violet" />
				</div>

				<div className="home-hero__veil" aria-hidden />

				<div className="relative z-10 flex flex-col items-center gap-4">
					<h1 className="text-4xl font-bold text-(--text-h)">
						404 - Page Not Found
					</h1>
					<p className="text-lg text-(--text)">
						The page you are looking for does not exist.
					</p>
					<a
						href="/en"
						className="text-[#3a53c9] transition-colors hover:text-[#2f46a8]"
					>
						Go back to the home page
					</a>
				</div>
			</div>
		</SiteDocument>
	);
}
