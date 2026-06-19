'use client'

import { motion, useInView, useReducedMotion } from 'motion/react'
import { useRef, useState } from 'react'
import { useTranslations } from 'next-intl'
import SectionHead from './section-head'

const FAQ_IDS = [
  'projects',
  'technologies',
  'estimates',
  'ownership',
  'communication',
  'quality',
  'support',
  'legacy',
] as const

export default function Faq() {
  const t = useTranslations('home.faq')
  const ref = useRef<HTMLElement>(null)
  const inView = useInView(ref, { once: true, margin: '-10% 0px' })
  const shouldReduceMotion = useReducedMotion()
  const [openId, setOpenId] = useState<string | null>(null)

  return (
    <section ref={ref} className="home-section home-section--tight">
      <div className="home-wrap">
        <SectionHead eyebrow={t('eyebrow')} headline={t('headline')} centered />

        <motion.div
          className="home-section-lead mx-auto max-w-[860px]"
          initial={shouldReduceMotion ? false : { opacity: 0, y: 16 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 16 }}
          transition={{ type: 'spring', duration: 0.45, bounce: 0, delay: 0.08 }}
        >
          {FAQ_IDS.map((id) => {
            const isOpen = openId === id
            return (
              <div key={id} className="home-faq-item" data-open={isOpen}>
                <button
                  type="button"
                  className="home-faq-q"
                  aria-expanded={isOpen}
                  onClick={() => setOpenId(isOpen ? null : id)}
                >
                  {t(`items.${id}.question`)}
                  <span className="home-faq-icon" aria-hidden />
                </button>
                <div
                  className="overflow-hidden transition-[max-height] duration-300 ease-[cubic-bezier(0.2,0.7,0.3,1)]"
                  style={{ maxHeight: isOpen ? '400px' : '0' }}
                >
                  <p className="max-w-[70ch] px-1 pb-8 pt-1 text-base leading-relaxed text-[var(--text)]">
                    {t(`items.${id}.answer`)}
                  </p>
                </div>
              </div>
            )
          })}
        </motion.div>
      </div>
    </section>
  )
}
