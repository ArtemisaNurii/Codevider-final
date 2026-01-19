// app/layout.tsx
import type { Metadata, Viewport } from "next";
import { Manrope, Spectral } from "next/font/google";
import { Toaster } from "@/components/ui/sonner";
import { WorkerProvider } from "@/components/providers/WorkerProvider";
import "./globals.css";

const manrope = Manrope({
	variable: "--font-manrope",
	subsets: ["latin"],
});

const spectral = Spectral({
	variable: "--font-spectral",
	subsets: ["latin"],
	weight: ["200", "300", "400", "500", "600", "700", "800"],
});

// 🚀 SEO STRATEGY: Define your base URL once and reuse it.
// IMPORTANT: Replace this with your actual domain.
const siteUrl = new URL("https://www.codevider.com"); // Use your REAL domain

export const metadata: Metadata = {
	metadataBase: siteUrl,

	// ✅ SEO HEADER 1: Title Tag - The most important on-page SEO factor.
	// We're leading with your primary keyword phrase. "Codevider" is for branding at the end.
	title: {
		default: "Codevider | Expert Software Development in Albania",
		template: "%s | Codevider",
	},

	// ✅ SEO HEADER 2: Meta Description - Your sales pitch on the SERP.
	// It's benefit-driven, includes primary and secondary keywords, and has a call to action.
	description:
		"Codevider is a leading Albanian software development company. We deliver scalable web, mobile & cloud solutions for startups and enterprises. Get a dedicated team of elite Albanian developers.",

	applicationName: "Codevider",
	authors: [{ name: "Codevider Team", url: siteUrl.toString() }],
	publisher: "Codevider",

	// ✅ SEO KEYWORDS: Expanded with high-intent, long-tail, and Albanian keywords.
	// While less critical now, it helps define context.
	keywords: [
		// --- English Keywords ---
		"albania software development",
		"software company tirana",
		"outsource to albania",
		"albanian developers",
		"nearshore development albania",
		"custom software solutions",
		"web development services",
		"mobile app development",
		"react developers albania",
		"next.js agency",
		"node.js experts",
		"aws cloud services",
		"ai integration",
		"ai development",
		"ai solutions",
		"ai services",
		"ai consulting",
		"ai implementation",
		"ai development company",
		"ai development services",
		"ai development company in albania",
		"ai development services in albania",
		"ai development company in albania",
		"ai development services in albania",
		"ai development company in albania",
		"IT outsourcing albania",
		// --- Albanian Keywords (for context and potential discovery) ---
		"zhvillim softueri Shqipëri", // Software Development Albania
		"kompani IT Tiranë", // IT Company Tirana
		"programues shqiptarë", // Albanian programmers
		"agjenci dixhitale", // Digital agency
		"zgjidhje softuerike", // Software solutions
		"sherbime programimi",
		"software development company in albania",
		"sherbime software në shqipëri",
		"programues shqiptarë",
		"agjenci dixhitale",
		"zgjidhje softuerike",
		"sherbime programimi",
		"software development company in albania",
		"sherbime software në shqipëri",
		"programues shqiptarë",
		"agjenci dixhitale",
		"zgjidhje softuerike",
		"sherbime programimi",
		"software development company in albania",
		"sherbime software në shqipëri",
		"programues shqiptarë",
		"agjenci dixhitale",
		"zgjidhje softuerike",
		"sherbime programimi",
		"website",
		"ai integration",
		"ai development",
		"ai solutions",
		"ai services",
		"ai consulting",
		"ai implementation",
		"ai development company",
		"ai development services",
		"ai development company in albania",
		"ai development services in albania",
		"ai development company in albania",
		"ai development services in albania",
	],

	// ✅ ROBOTS: Add a link to your sitemap. Crucial for crawlers.
	robots: {
		index: true,
		follow: true,
		nocache: false,
		googleBot: {
			index: true,
			follow: true,
			noimageindex: false,
			"max-video-preview": -1,
			"max-image-preview": "large",
			"max-snippet": -1,
		},
	},

	// ✅ INTERNATIONALIZATION: The RIGHT way to target different languages.
	// This tells Google that you have (or will have) an Albanian version of your site.
	// This is a massive SEO boost for both languages.
	alternates: {
		canonical: siteUrl.toString(),
	},

	// ✅ SOCIAL (OpenGraph for Facebook/LinkedIn, etc.)
	// Title and description are more direct and action-oriented for sharing.
	openGraph: {
		type: "website",
		url: siteUrl.toString(),
		siteName: "Codevider",
		title: "Codevider | Top-Tier Albanian Software Development Teams",
		description:
			"Partner with Albania's elite tech talent. Codevider delivers high-performance web, mobile, and AI solutions. Discover the power of nearshore development.",
		images: [
			{
				url: "/og/og-image.png", // Make sure this image is compelling!
				width: 1200,
				height: 630,
				alt: "Codevider - Albanian Software Development Company",
			},
		],
		locale: "en_US",
	},

	// ✅ SOCIAL (Twitter Card)
	twitter: {
		card: "summary_large_image",
		title: "Codevider — Elite Software Development in Albania",
		description:
			"Scale your business with dedicated teams from Albania's thriving tech hub. We build, you grow. outcome-focused delivery.",
		images: ["/og/og-image.png"], // Ensure this path is absolute or Next.js handles it
		site: "@codevider", // Replace with your actual Twitter handle
		creator: "@codevider", // Replace with your actual Twitter handle
	},

	icons: {
		icon: [
			{ url: "/favicon.ico" },
			{ url: "/icons/icon-32.png", sizes: "32x32", type: "image/png" },
			{ url: "/icons/icon-192.png", sizes: "192x192", type: "image/png" },
		],
		apple: [{ url: "/icons/apple-touch-icon.png", sizes: "180x180" }],
	},

	category: "technology",

	// 🚀 GOOGLE VERIFICATION: Add your GSC verification code here to prove ownership.
	verification: {
		google: "YOUR_GOOGLE_SEARCH_CONSOLE_VERIFICATION_CODE",
		// yandex: "...", // Add other verification if needed
		// bing: "...",
	},
};

export const viewport: Viewport = {
	themeColor: "#000000",
	width: "device-width",
	initialScale: 1,
};

// 🚀 ENHANCED STRUCTURED DATA (JSON-LD)
// This is your digital business card for Google. We are combining multiple schemas
// to give a complete picture of your organization and website.
const structuredData = {
	"@context": "https://schema.org",
	"@graph": [
		{
			"@type": "Organization",
			name: "Codevider",
			url: siteUrl.toString(),
			logo: `${siteUrl.toString()}/icons/icon-192.png`,
			description:
				"Codevider is a premier software development company based in Tirana, Albania, specializing in web, mobile, and cloud solutions for a global clientele.",
			// ✅ LOCAL SEO & TRUST: Add address and contact info. This is critical for E-E-A-T.
			address: {
				"@type": "PostalAddress",
				streetAddress: "Rruga e Barrikadave 17-3",
				addressLocality: "Tirana",
				postalCode: "1010",
				addressCountry: "AL",
			},
			contactPoint: {
				"@type": "ContactPoint",
				telephone: "+355 69 587 7742", // Use a real phone number
				contactType: "customer service",
				email: "info@codevider.com", // Use a real email
				areaServed: "Worldwide",
			},
			sameAs: [
				"https://www.linkedin.com/company/codevider",
				"https://www.facebook.com/codevider",
				"https://github.com/codevider",
			],
			foundingDate: "2019-01-01", // Add your founding date
		},
		{
			"@type": "WebSite",
			url: siteUrl.toString(),
			name: "Codevider",
			publisher: {
				"@id": `${siteUrl.toString()}#organization`,
			},
			// ✅ RICH RESULT: This can give you a sitelinks search box in the SERP.
			potentialAction: {
				"@type": "SearchAction",
				target: {
					"@type": "EntryPoint",
					urlTemplate: `${siteUrl.toString()}/search?q={search_term_string}`,
				},
				"query-input": "required name=search_term_string",
			},
		},
	],
};

export default function RootLayout({
	children,
}: Readonly<{ children: React.ReactNode }>) {
	return (
		<html lang="en">
			<head>
				{/* ✅ STRUCTURED DATA: Injecting our enhanced JSON-LD */}
				<script
					type="application/ld+json"
					dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
				/>
			</head>
			<body
				className={`${manrope.variable} ${spectral.variable} antialiased bg-white`}
				suppressHydrationWarning
			>
				<WorkerProvider>
					{children}
					<Toaster />
				</WorkerProvider>
			</body>
		</html>
	);
}
