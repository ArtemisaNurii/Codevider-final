import { Alexandria, Libre_Baskerville } from "next/font/google";
import Script from "next/script";
import type { ReactNode } from "react";
import "@/app/globals.css";
import { ThemeProvider } from "@/components/providers/ThemeProvider";

const themeInitScript = `(function(){try{var t=localStorage.getItem('theme');var d=t==='dark'||(!t&&window.matchMedia('(prefers-color-scheme: dark)').matches);if(d){document.documentElement.classList.add('dark')}document.documentElement.dataset.theme=d?'dark':'light'}catch(e){}})();`;

/**
 * Runs synchronously before first paint.
 * 1. Takes over scroll restoration so the browser never auto-scrolls from 0.
 * 2. Saves the pre-unload position to sessionStorage (keyed by pathname).
 * 3. On next load, instantly jumps to that position before React hydrates —
 *    so scroll-driven animations see the correct scrollY immediately.
 */
const scrollRestorationScript = `(function(){try{
  history.scrollRestoration='manual';
  var key='__sr__'+location.pathname;
  var saved=sessionStorage.getItem(key);
  if(saved){var y=parseInt(saved,10);if(y>0){window.scrollTo(0,y);}}
  window.addEventListener('beforeunload',function(){
    sessionStorage.setItem(key,String(Math.round(window.scrollY)));
  },{passive:true});
}catch(e){}})();`;

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
				<Script id="theme-init" strategy="beforeInteractive">
					{themeInitScript}
				</Script>
				<Script id="scroll-restore" strategy="beforeInteractive">
					{scrollRestorationScript}
				</Script>
			</head>
			<body className="min-h-full flex flex-col">
				<ThemeProvider>{children}</ThemeProvider>
			</body>
		</html>
	);
}
