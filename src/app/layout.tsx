// app/layout.tsx
import type { Metadata, Viewport } from "next";
import { Manrope, Spectral } from "next/font/google";
import { Toaster } from "@/components/ui/sonner";
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

const siteUrl = new URL("https://www.example.com");

export const metadata: Metadata = {
  metadataBase: siteUrl,
  title: {
    default: "Codevider",
    template: "%s | Codevider",
  },
  description:
    "Codevider builds fast, reliable software for startups and enterprises — web, mobile, and cloud. Flexible teams, clear roadmaps, outcome-focused delivery.",
  applicationName: "Codevider",
  authors: [{ name: "Codevider Team", url: siteUrl.toString() }],
  publisher: "Codevider",
  keywords: [
    "software development",
    "web development",
    "react",
    "next.js",
    "node.js",
    "microservices",
    "outsourcing",
    "ai integrations",
    "Codevider",
    "Albania Software Development Company",
    "startups",
    "enterprises",
    "aws",
  ],
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
  alternates: {
    canonical: siteUrl.toString(), // ✅ absolute canonical
  },
  openGraph: {
    type: "website",
    url: siteUrl.toString(),
    siteName: "Codevider",
    title: "Codevider - Software Development Company",
    description:
      "Outcome-driven engineering teams for web, mobile, and cloud. Ship faster with Codevider.",
    images: [
      {
        url: "/og/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Codevider - Software Development Company",
      },
    ],
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "Codevider — Software Development Company",
    description:
      "Outcome-driven engineering teams for web, mobile, and cloud. Ship faster with Codevider.",
    images: ["/og/og-image.jpg"],
    site: "@your_twitter",
    creator: "@your_twitter",
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
};

export const viewport: Viewport = {
  themeColor: "#000000",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <head>
        {/* ✅ Structured Data for SEO */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              name: "Codevider",
              url: siteUrl.toString(),
              logo: "https://www.example.com/icons/icon-192.png",
              sameAs: [
                "https://www.linkedin.com/company/codevider",
                "https://twitter.com/your_twitter",
              ],
            }),
          }}
        />
      </head>
      <body
        className={`${manrope.variable} ${spectral.variable} antialiased bg-white`}
        suppressHydrationWarning
      >
        {children}
        <Toaster position="top-right" />
      </body>
    </html>
  );
}
