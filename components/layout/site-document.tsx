import { Alexandria, Libre_Baskerville } from "next/font/google";
import type { ReactNode } from "react";
import "@/app/globals.css";
import { ThemeProvider } from "@/components/providers/ThemeProvider";

const themeInitScript = `(function(){try{var t=localStorage.getItem('theme');var d=t==='dark'||(!t&&window.matchMedia('(prefers-color-scheme: dark)').matches);if(d){document.documentElement.classList.add('dark')}document.documentElement.dataset.theme=d?'dark':'light'}catch(e){}})();`;

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

type Props = {
	locale: string;
	children: ReactNode;
};

export function SiteDocument({ locale, children }: Props) {
	return (
		<html
			lang={locale}
			suppressHydrationWarning
			className={`${alexandria.variable} ${libreBaskerville.variable} h-full antialiased`}
		>
			<head>
				<meta name="apple-mobile-web-app-title" content="Codevider" />
				<meta
					name="google-site-verification"
					content="icvkJSNSGcApy6ogZHuUBc-qCeN1kIXiFF6_7lN74J0"
				/>
				<script dangerouslySetInnerHTML={{ __html: themeInitScript }} />
			</head>
			<body className="min-h-full flex flex-col">
				<ThemeProvider>{children}</ThemeProvider>
			</body>
		</html>
	);
}
