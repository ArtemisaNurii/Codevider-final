'use client'

import { Clock, Lightbulb, SlidersHorizontal } from 'lucide-react'
import { motion, useInView, useReducedMotion } from 'motion/react'
import { useRef } from 'react'
import { useTranslations } from 'next-intl'
import SectionHead from './section-head'

const WHY_CARDS = [
  { id: 'savings', icon: Clock },
  { id: 'control', icon: SlidersHorizontal },
  { id: 'expertise', icon: Lightbulb },
] as const

export default function WhyChooseUs() {
  const t = useTranslations('home.why_choose')
  const ref = useRef<HTMLElement>(null)
  const inView = useInView(ref, { once: true, margin: '-10% 0px' })
  const shouldReduceMotion = useReducedMotion()

  return (
    <section ref={ref} className="home-section">
      <div className="home-wrap">
        <SectionHead
          eyebrow={t('eyebrow')}
          headline={t('headline')}
          description={t('description')}
          centered
        />

        <div className="home-section-lead grid gap-5 lg:grid-cols-[1.2fr_0.9fr_0.9fr]">
          <motion.article
            className="home-vp-card home-vp-card--tint home-card-body"
            initial={shouldReduceMotion ? false : { opacity: 0, y: 16 }}
            animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 16 }}
            transition={{ type: 'spring', duration: 0.45, bounce: 0 }}
          >
            <span className="inline-block rounded-full bg-[var(--text-h)] px-3.5 py-1.5 text-[13px] font-semibold text-[var(--bg)]">
              {t('value_badge')}
            </span>
            <p className="text-[17px] font-semibold text-[#3a53c9]">
              {t('value_flow')}
            </p>
            <p className="text-[15px] leading-relaxed text-[var(--text-h)]/80">
              {t('value_description')}
            </p>
          </motion.article>

          <motion.article
            className="home-vp-card home-card-body"
            initial={shouldReduceMotion ? false : { opacity: 0, y: 16 }}
            animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 16 }}
            transition={{ type: 'spring', duration: 0.45, bounce: 0, delay: 0.08 }}
          >
            <p className="font-[family-name:var(--mono)] text-[44px] font-semibold tracking-[-0.03em] text-[var(--text-h)]">
              {t('flex_value')}
            </p>
            <p className="font-semibold text-[var(--text-h)]">{t('flex_title')}</p>
            <p className="text-sm leading-relaxed text-[var(--text)]">
              {t('flex_description')}
            </p>
          </motion.article>

          <motion.article
            className="home-vp-card home-vp-card--dark home-card-body"
            initial={shouldReduceMotion ? false : { opacity: 0, y: 16 }}
            animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 16 }}
            transition={{ type: 'spring', duration: 0.45, bounce: 0, delay: 0.16 }}
          >
            <p className="font-[family-name:var(--mono)] text-[44px] font-semibold tracking-[-0.03em] text-white">
              {t('years_value')}
            </p>
            <p className="font-semibold text-white">{t('years_title')}</p>
            <p className="text-sm leading-relaxed text-blue-100/70">
              {t('years_description')}
            </p>
            <div className="flex flex-wrap gap-2 pt-1">
              {(['usa', 'germany', 'london', 'europe'] as const).map((flag) => (
                <span
                  key={flag}
                  className="rounded-full border border-white/10 bg-white/[0.08] px-2.5 py-1 text-xs text-blue-100/70"
                >
                  {t(`flags.${flag}`)}
                </span>
              ))}
            </div>
          </motion.article>
        </div>

        <div className="mt-6 grid gap-5 lg:grid-cols-3">
          {WHY_CARDS.map(({ id, icon: Icon }, index) => (
            <motion.article
              key={id}
              className="home-ecard home-card-body"
              initial={shouldReduceMotion ? false : { opacity: 0, y: 16 }}
              animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 16 }}
              transition={{
                type: 'spring',
                duration: 0.45,
                bounce: 0,
                delay: 0.2 + index * 0.08,
              }}
            >
              <div className="float-right grid size-12 place-items-center rounded-[13px] bg-[#3a53c9]/10 text-[#3a53c9]">
                <Icon className="size-6" aria-hidden />
              </div>
              <p className="text-xs font-semibold uppercase tracking-[0.1em] text-[#3a53c9]">
                {t(`cards.${id}.pin`)}
              </p>
              <h3 className="text-xl font-semibold tracking-[-0.01em] text-[var(--text-h)]">
                {t(`cards.${id}.title`)}
              </h3>
              <p className="text-[15px] leading-relaxed text-[var(--text)]">
                {t(`cards.${id}.description`)}
              </p>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  )
}
