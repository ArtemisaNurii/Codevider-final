'use client'

import Link from 'next/link'
import HeroDashboard from './hero-dashboard'
import PixelBlast from './pixel-blast'
import RotatingWord from './rotating-word'
import { useTranslations } from 'next-intl'


export default function Hero() {
  const t = useTranslations('home');
  return (
    <section className="relative isolate min-h-svh overflow-hidden">
      <div className="absolute inset-0">
        <PixelBlast
          variant="square"
          pixelSize={2}
          color="#2f46c9"
          patternScale={1.2}
          patternDensity={0.85}
          pixelSizeJitter={0}
          enableRipples
          rippleSpeed={0.4}
          rippleThickness={0.12}
          rippleIntensityScale={2}
          liquid={false}
          liquidStrength={0.12}
          liquidRadius={1.2}
          liquidWobbleSpeed={5}
          speed={0.5}
          edgeFade={0}
          transparent
        />
      </div>

      <div
        className="pointer-events-none absolute inset-0 bg-gradient-to-b from-[var(--bg)]/50 via-[var(--bg)]/35 to-[var(--bg)]/55"
        aria-hidden
      />

      <div className="home-wrap relative z-10 flex min-h-svh flex-col justify-center pb-[clamp(5rem,10vw,8rem)] pt-[clamp(6rem,12vw,9rem)]">
        <div className="grid w-full items-center gap-12 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.3fr)] lg:gap-14 xl:gap-16">
          <div>
            <h1 className="mb-8 max-w-2xl text-left text-[clamp(2.25rem,5vw,3.5rem)] leading-[1.05] tracking-[-0.03em] text-[var(--text-h)]">
              <span className="block">{t('your_strategic_partner_in')}</span>
              <RotatingWord />
            </h1>

            <p className="max-w-xl text-pretty font-sans text-left text-lg leading-relaxed text-[var(--text)] sm:text-xl sm:leading-8">
              {t('we_design_build_and_scale_reliable_web_mobile_and_cloud_software_embedded_with_your_team_and_delivered_without_the_overhead')}
            </p>

            <div className="mb-10 mt-14 flex flex-wrap items-center justify-start gap-4 sm:mb-14 sm:mt-16 sm:gap-5">
              <Link
                href="#contact"
                className="inline-flex items-center justify-center rounded-full bg-[#3a53c9] px-7 py-3.5 text-sm font-medium text-white transition-[background-color,transform] hover:bg-[#2f46a8] active:scale-[0.96] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#3a53c9]"
              >
                {t('start_your_project')}
              </Link>
              <Link
                href="#services"
                className="inline-flex items-center justify-center rounded-full border border-[var(--border)] bg-[var(--bg)]/80 px-7 py-3.5 text-sm font-medium text-[var(--text-h)] backdrop-blur-sm transition-[background-color,border-color,transform] hover:border-[#3a53c9]/40 hover:bg-[var(--accent-bg)] active:scale-[0.96] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#3a53c9]"
              >
                {t('explore_services')}
              </Link>
            </div>

            <div className="grid grid-cols-3 gap-5 border-t border-[var(--border)] pt-10 sm:gap-10 sm:pt-12">
              {[
                { value: `${new Date().getFullYear() - 2019}+`, label: t('years_delivering') },
                { value: '45+', label: t('global_projects') },
                { value: '25+', label: t('engineers') },
              ].map(({ value, label }) => (
                <div key={label} className="text-left">
                  <p className="font-[family-name:var(--mono)] text-2xl font-medium tracking-tight text-[var(--text-h)] sm:text-3xl">
                    {value}
                  </p>
                  <p className="mt-1 text-xs text-[var(--text)] sm:text-sm">{label}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="relative w-full min-w-0 lg:min-w-[28rem] xl:min-w-[32rem]">
            <HeroDashboard />
          </div>
        </div>
      </div>
    </section>
  )
}
