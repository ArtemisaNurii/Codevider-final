'use client'

import { DollarSign, Link2, ShieldCheck } from 'lucide-react'
import { motion, useInView, useReducedMotion } from 'motion/react'
import { useRef } from 'react'
import { useTranslations } from 'next-intl'

const PILLARS = [
  { id: 'collaboration', icon: Link2 },
  { id: 'legal', icon: ShieldCheck },
  { id: 'cost', icon: DollarSign },
] as const

export default function WhyOutsource() {
  const t = useTranslations('home.outsource')
  const ref = useRef<HTMLElement>(null)
  const inView = useInView(ref, { once: true, margin: '-10% 0px' })
  const shouldReduceMotion = useReducedMotion()

  return (
    <section ref={ref} className="home-section">
      <div className="home-wrap grid items-start gap-[clamp(3rem,7vw,6rem)] lg:grid-cols-[0.85fr_1.15fr]">
        <motion.div
          initial={shouldReduceMotion ? false : { opacity: 0, y: 16 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 16 }}
          transition={{ type: 'spring', duration: 0.45, bounce: 0 }}
        >
          <p className="home-eyebrow">{t('eyebrow')}</p>
          <h2 className="mt-[clamp(1.125rem,2.5vw,1.5rem)] text-balance text-[clamp(1.75rem,3.8vw,2.75rem)] leading-[1.05] tracking-[-0.02em] text-[var(--text-h)]">
            {t('headline')}
          </h2>
          <p className="mt-[clamp(1rem,2vw,1.375rem)] text-[17px] leading-relaxed text-[var(--text)]">
            {t('description')}
          </p>
        </motion.div>

        <div className="grid gap-[clamp(1.75rem,4vw,3rem)] sm:grid-cols-3">
          {PILLARS.map(({ id, icon: Icon }, index) => (
            <motion.article
              key={id}
              initial={shouldReduceMotion ? false : { opacity: 0, y: 16 }}
              animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 16 }}
              transition={{
                type: 'spring',
                duration: 0.45,
                bounce: 0,
                delay: 0.08 + index * 0.08,
              }}
            >
              <div className="mb-6 grid size-[46px] place-items-center rounded-xl bg-[#3a53c9]/10 text-[#3a53c9]">
                <Icon className="size-6" aria-hidden />
              </div>
              <h3 className="text-[19px] font-semibold tracking-[-0.01em] text-[var(--text-h)]">
                {t(`pillars.${id}.title`)}
              </h3>
              <p className="mt-4 text-[15px] leading-relaxed text-[var(--text)]">
                {t(`pillars.${id}.description`)}
              </p>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  )
}
