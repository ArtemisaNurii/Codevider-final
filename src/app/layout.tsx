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

// Set this to your production origin
const siteUrl = new URL("https://www.example.com");

export const metadata: Metadata = {
  metadataBase: siteUrl,
  title: {
    default: "Codevider — Software Development Company",
    template: "%s | Codevider",
  },
  description:
    "Codevider builds fast, reliable software for startups and enterprises — web, mobile, and cloud. Flexible teams, clear roadmaps, outcome-focused delivery.",
  keywords: [
    "software development",
    "web development",
    "react",
    "next.js",
    "node.js",
    "microservices",
    "outsourcing",
    "nearshore",
    "Codevider",
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
    canonical: "/",
  },
  openGraph: {
    type: "website",
    url: siteUrl.toString(),
    siteName: "Codevider",
    title: "Codevider — Software Development Company",
    description:
      "Outcome-driven engineering teams for web, mobile, and cloud. Ship faster with Codevider.",
    images: [
      {
        url: "/og/og-image.jpg", // place at public/og/og-image.jpg
        width: 1200,
        height: 630,
        alt: "Codevider — Software Development Company",
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
    site: "@your_twitter", // optional
    creator: "@your_twitter", // optional
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
  // Google-specific meta (as discussed in your chapter)
  other: {
    google: ["nositelinkssearchbox", "notranslate"], // renders two <meta name="google" ...>
  },
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
      <body
        className={`${manrope.variable} ${spectral.variable} antialiased bg-black`}
        suppressHydrationWarning
      >
        {children}
        <Toaster position="top-right" />
      </body>
    </html>
  );
}
