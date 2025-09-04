'use client'
import Link from 'next/link'

export default function NotFound() {
  return (
    <main className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden bg-black text-white font-sans">
      {/* Background Glow */}
      <div className="absolute inset-0 z-0">
        <div 
          className="absolute left-1/2 top-1/2 h-[500px] w-[500px] -translate-x-1/2 -translate-y-1/2 rounded-full"
          style={{
            backgroundImage: 'radial-gradient(circle at center, rgba(14, 165, 233, 0.4) 0%, rgba(14, 165, 233, 0) 60%)',
          }}
        />
      </div>

      <div className="relative z-10 flex w-full max-w-6xl flex-col items-center justify-center px-8 text-center md:flex-row md:justify-between md:text-left">
        {/* Left Content */}
        <div className="max-w-md space-y-6">
          <p className="text-sm font-semibold tracking-widest text-sky-300">
            [404 - PAGE NOT FOUND]
          </p>
          <h1 className="text-3xl font-bold uppercase tracking-wider md:text-4xl">
            Oops! It seems like you&apos;re looking for a page that doesn&apos;t exist.
          </h1>
          <Link href="/">
            <button className="mt-4 rounded-sm border border-white/50 px-5 py-2 text-sm font-medium transition-colors hover:bg-white/10 hover:border-white">
              RETURN TO HOME
            </button>
          </Link>
        </div>

        {/* 404 Text Column */}
        <div className="relative mt-16 flex flex-col items-center justify-center md:mt-0">
          {/* ... (rest of the 404 text styling) ... */}
           <span className="text-[12rem] font-black text-white/10 blur-md md:text-[18rem]">404</span>
          <span className="absolute text-[12rem] font-black text-white/20 blur-sm md:text-[18rem]">404</span>
          <span 
            className="absolute text-[12rem] font-black text-white md:text-[18rem]"
            style={{ textShadow: '0 0 10px rgba(255,255,255,0.8), 0 0 40px rgba(14, 165, 233, 0.7)' }}
          >
            404
          </span>
          <div 
            className="absolute top-full h-1/2 w-full -scale-y-100 opacity-20"
            style={{ 
              WebkitMaskImage: 'linear-gradient(to bottom, white 0%, transparent 100%)',
              maskImage: 'linear-gradient(to bottom, white 0%, transparent 100%)'
            }}
          >
            <span className="text-[12rem] font-black text-white blur-sm md:text-[18rem]">404</span>
          </div>
        </div>
      </div>

      
    </main>
  )
}