import { Alexandria, Libre_Baskerville } from "next/font/google";
import type { ReactNode } from "react";
import "@/app/globals.css";
import { ThemeProvider } from "@/components/providers/ThemeProvider";

const alexandria = Alexandria({
	variable: "--font-sans",
	subsets: ["latin"],
	style: ["normal"],
});

const libreBaskerville = Libre_Baskerville({
	variable: "--font-heading",
	subsets: ["latin"],
	weight: ["400", "700"],
	style: ["normal", "italic"],
});

/** Props for SiteDocument. */
type Props = {
	locale: string;
	children: ReactNode;
};

/**
 * Root document component that sets up fonts, theme, and scroll restoration.
 *
 * @param locale - Current locale
 * @param children - Child components
 * @returns Root document JSX
 */
export function SiteDocument({ locale, children }: Props) {
	return (
		<html
			lang={locale}
			data-scroll-behavior="smooth"
			suppressHydrationWarning
			className={`${alexandria.variable} ${libreBaskerville.variable} h-full antialiased`}
		>
			<head>
				<meta name="apple-mobile-web-app-title" content="Codevider" />
				<meta
					name="google-site-verification"
					content="icvkJSNSGcApy6ogZHuUBc-qCeN1kIXiFF6_7lN74J0"
				/>
			</head>
			<body className="min-h-full flex flex-col" suppressHydrationWarning>
				<ThemeProvider>{children}</ThemeProvider>
			</body>
		</html>
	);
}
