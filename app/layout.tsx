import type { Metadata } from 'next'
import { Alexandria, Libre_Baskerville } from 'next/font/google'
import './globals.css'
import { Navbar } from '@/components/nav/Navbar'
import Footer from '@/components/nav/Footer'
import { I18nProvider } from '@/components/providers/I18nProvider'
import { ThemeProvider } from '@/components/providers/ThemeProvider'

const themeInitScript = `(function(){try{var t=localStorage.getItem('theme');if(t==='dark'||(!t&&window.matchMedia('(prefers-color-scheme: dark)').matches)){document.documentElement.classList.add('dark')}}catch(e){}})();`

const alexandria = Alexandria({
  variable: '--font-sans',
  subsets: ['latin'],
})

const libreBaskerville = Libre_Baskerville({
  variable: '--font-heading',
  subsets: ['latin'],
  weight: ['400', '700'],
})

export const metadata: Metadata = {
  title: 'Codevider',
  description: 'Your strategic partner in software development',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode

}>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${alexandria.variable} ${libreBaskerville.variable} h-full antialiased`}
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeInitScript }} />
      </head>
      <body className="min-h-full flex flex-col">
        <ThemeProvider>
          <I18nProvider>
            <Navbar />
            <div id="root" className="flex flex-1 flex-col">
              <main className="flex-1">{children}</main>
              <Footer />
            </div>
          </I18nProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}
