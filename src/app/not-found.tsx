'use client'
import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'

export default function NotFound() {
  return (
    <main className="relative min-h-screen overflow-hidden bg-gradient-to-br from-black via-slate-800 to-slate-950 text-white">
      {/* Subtle background: grid + glow */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
      >
        {/* Soft radial glow */}
        {/* <div className="absolute left-1/2 top-1/2 h-[60vh] w-[60vh] -translate-x-1/2 -translate-y-1/2 rounded-full bg-sky-500/10 blur-3xl" /> */}
        {/* Fine grid */}
        <div
          className="absolute inset-0 opacity-[0.08]"
          style={{
            backgroundImage:
              'linear-gradient(to right, rgba(255,255,255,0.15) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.15) 1px, transparent 1px)',
            backgroundSize: '32px 32px',
          }}
        />
        {/* Grain */}
      
      </div>

      <div className="relative z-10 flex min-h-screen items-center justify-center px-6">
        <div className="mx-auto flex max-w-6xl flex-col-reverse items-center gap-16 md:flex-row md:items-center md:justify-between">
        {/* Left: content */}
        <section className="max-w-xl text-center md:text-left">
          <p className="mb-3 text-xs font-semibold tracking-[0.2em] text-sky-300/80">
            PAGE NOT FOUND
          </p>
          <h1 className="text-balance text-3xl font-semibold leading-tight text-white md:text-4xl">
            The page you’re looking for doesn’t exist or was moved.
          </h1>
          <p className="mt-3 text-base text-slate-300">
            Check the URL for typos, or use the actions below to get back on track.
          </p>

          <div className="mt-6 flex flex-wrap items-center justify-center gap-3 md:justify-start">
            <Link
              href="/"
              className="inline-flex items-center gap-2 rounded-xl border border-white/15 bg-white/5 px-4 py-2 text-sm font-medium text-white transition hover:bg-white/10"
              aria-label="Return to home page"
            >
              <ArrowLeft className="h-4 w-4" />
              Return Home
            </Link>

      
          </div>


        </section>

        {/* Right: layered 404 */}
        <section className="relative flex items-center justify-center">
          <span className="sr-only">404</span>
          <div className="relative">
            <span className="block select-none text-[9rem] font-black leading-none text-white/5 md:text-[16rem]">
              404
            </span>
            <span className="absolute inset-0 -z-10 select-none text-[9rem] font-black leading-none text-sky-400/10 blur-lg md:text-[16rem]">
              404
            </span>
            <div
              className="pointer-events-none absolute left-1/2 top-1/2 -z-10 h-64 w-64 -translate-x-1/2 -translate-y-1/2 rounded-full bg-sky-400/20 blur-2xl"
              aria-hidden
            />
          </div>
        </section>
        </div>
      </div>

      {/* Footer hint */}
      <div className="absolute bottom-0 left-0 right-0 z-10 px-6 pb-8">
        <p className="text-center text-xs text-slate-400">
          Error code: <span className="font-mono">404</span> • This page may have been removed or renamed.
        </p>
      </div>
    </main>
  )
}
