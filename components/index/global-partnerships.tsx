'use client'

import { motion, useInView, useReducedMotion } from 'motion/react'
import { useRef } from 'react'
import { useTranslations } from 'next-intl'
import SectionHead from './section-head'

export default function GlobalPartnerships() {
  const t = useTranslations('home.global')
  const ref = useRef<HTMLElement>(null)
  const inView = useInView(ref, { once: true, margin: '-10% 0px' })
  const shouldReduceMotion = useReducedMotion()

  return (
    <section
      ref={ref}
      className="home-section home-dark-section relative overflow-hidden"
    >
      <div
        className="pointer-events-none absolute inset-0 opacity-50"
        style={{
          backgroundImage: 'radial-gradient(rgba(255,255,255,0.14) 1.4px, transparent 1.5px)',
          backgroundSize: '26px 26px',
          maskImage: 'radial-gradient(80% 70% at 50% 60%, #000 20%, transparent 72%)',
        }}
        aria-hidden
      />
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            'radial-gradient(60% 50% at 50% 120%, rgba(58, 83, 201, 0.5), transparent 60%)',
        }}
        aria-hidden
      />

      <div className="home-wrap relative z-[1]">
        <SectionHead
          eyebrow={t('eyebrow')}
          headline={t('headline')}
          description={t('description')}
          centered
          className="[&_h2]:text-white [&_p]:text-blue-100/70"
        />

        <motion.div
          className="home-section-lead relative h-[clamp(260px,32vw,420px)]"
          initial={shouldReduceMotion ? false : { opacity: 0, y: 16 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 16 }}
          transition={{ type: 'spring', duration: 0.45, bounce: 0, delay: 0.1 }}
        >
          <svg
            viewBox="0 0 1000 360"
            preserveAspectRatio="xMidYMid meet"
            className="size-full overflow-visible"
            aria-hidden
          >
            <defs>
              <linearGradient id="arcgrad" x1="0" y1="0" x2="1" y2="0">
                <stop offset="0" stopColor="#246AFE" />
                <stop offset="1" stopColor="#00BCFF" />
              </linearGradient>
            </defs>
            <path
              className="home-net-dash fill-none stroke-[url(#arcgrad)] opacity-60"
              strokeWidth="1.5"
              strokeDasharray="6 6"
              d="M210 230 Q 360 60 520 150"
            />
            <path
              className="home-net-dash fill-none stroke-[url(#arcgrad)] opacity-60"
              strokeWidth="1.5"
              strokeDasharray="6 6"
              d="M520 150 Q 680 40 820 120"
            />
            <path
              className="home-net-dash fill-none stroke-[url(#arcgrad)] opacity-60"
              strokeWidth="1.5"
              strokeDasharray="6 6"
              d="M210 230 Q 420 320 660 250"
            />
            <path
              className="home-net-dash fill-none stroke-[url(#arcgrad)] opacity-60"
              strokeWidth="1.5"
              strokeDasharray="6 6"
              d="M520 150 Q 600 260 660 250"
            />
            {[
              { cx: 210, cy: 230, label: t('tirana'), ly: 258 },
              { cx: 520, cy: 150, label: t('germany'), ly: 135, delay: '0.6s' },
              { cx: 820, cy: 120, label: t('usa'), ly: 105, delay: '1.2s' },
              { cx: 660, cy: 250, label: t('uk'), ly: 278, delay: '0.9s' },
            ].map(({ cx, cy, label, ly, delay }) => (
              <g key={label}>
                <circle
                  className="home-net-ping fill-none stroke-[#00bcff]"
                  cx={cx}
                  cy={cy}
                  r="5"
                  style={delay ? { animationDelay: delay } : undefined}
                />
                <circle className="fill-[#00bcff]" cx={cx} cy={cy} r="5" />
                <text
                  className="fill-white/70 text-[13px]"
                  x={cx}
                  y={ly}
                  textAnchor="middle"
                >
                  {label}
                </text>
              </g>
            ))}
          </svg>
        </motion.div>
      </div>
    </section>
  )
}
