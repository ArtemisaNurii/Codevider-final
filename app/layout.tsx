import type { Metadata } from "next";
import { Alexandria, Libre_Baskerville } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/providers/ThemeProvider";
import { getSiteUrl } from "@/lib/site";

const themeInitScript = `(function(){try{var t=localStorage.getItem('theme');if(t==='dark'||(!t&&window.matchMedia('(prefers-color-scheme: dark)').matches)){document.documentElement.classList.add('dark')}}catch(e){}})();`;

const alexandria = Alexandria({
	variable: "--font-sans",
	subsets: ["latin"],
});

const libreBaskerville = Libre_Baskerville({
	variable: "--font-heading",
	subsets: ["latin"],
	weight: ["400", "700"],
});

export const metadata: Metadata = {
	metadataBase: new URL(getSiteUrl()),
	title: "Codevider",
	description: "Your strategic partner in software development",
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html
			lang="en"
			suppressHydrationWarning
			className={`${alexandria.variable} ${libreBaskerville.variable} h-full antialiased`}
		>
			<head>
				<meta name="apple-mobile-web-app-title" content="Codevider" />
				<script dangerouslySetInnerHTML={{ __html: themeInitScript }} />
			</head>
			<body className="min-h-full flex flex-col">
				<ThemeProvider>{children}</ThemeProvider>
			</body>
		</html>
	);
}
