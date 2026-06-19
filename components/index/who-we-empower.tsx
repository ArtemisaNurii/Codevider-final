'use client'

import {
  Bot,
  Building2,
  Code,
  CreditCard,
  Database,
  MessageSquare,
  PenLine,
  Smartphone,
} from 'lucide-react'
import { motion, useInView, useReducedMotion } from 'motion/react'
import { useRef } from 'react'
import { useTranslations } from 'next-intl'
import SectionHead from './section-head'

const CARDS = [
  { id: 'startups', icon: PenLine, featured: false },
  { id: 'enterprise', icon: Building2, featured: false },
  { id: 'crm', icon: MessageSquare, featured: false },
  { id: 'custom', icon: Code, featured: true },
  { id: 'fintech', icon: CreditCard, featured: false },
  { id: 'ai', icon: Bot, featured: false },
  { id: 'data', icon: Database, featured: false },
  { id: 'mobile', icon: Smartphone, featured: false },
] as const

export default function WhoWeEmpower() {
  const t = useTranslations('home.empower')
  const ref = useRef<HTMLElement>(null)
  const inView = useInView(ref, { once: true, margin: '-10% 0px' })
  const shouldReduceMotion = useReducedMotion()

  return (
    <section ref={ref} className="home-section home-section--tight">
      <div className="home-wrap">
        <SectionHead eyebrow={t('eyebrow')} headline={t('headline')} centered />

        <div className="home-section-lead grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {CARDS.map(({ id, icon: Icon, featured }, index) => (
            <motion.article
              key={id}
              initial={shouldReduceMotion ? false : { opacity: 0, y: 16 }}
              animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 16 }}
              transition={{
                type: 'spring',
                duration: 0.45,
                bounce: 0,
                delay: index * 0.06,
              }}
              className={`home-ecard home-card-body ${featured ? 'home-ecard--feature' : ''}`}
            >
              <div
                className={`grid size-[46px] place-items-center rounded-[11px] ${
                  featured
                    ? 'bg-white/10 text-[#00bcff]'
                    : 'bg-[#3a53c9]/10 text-[#3a53c9]'
                }`}
              >
                <Icon className="size-[22px]" aria-hidden />
              </div>
              <h3
                className={`text-[17px] font-semibold leading-snug tracking-[-0.01em] ${featured ? 'text-white' : 'text-[var(--text-h)]'}`}
              >
                {t(`cards.${id}.title`)}
              </h3>
              <p
                className={`text-sm leading-relaxed ${featured ? 'text-blue-100/70' : 'text-[var(--text)]'}`}
              >
                {t(`cards.${id}.description`)}
              </p>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  )
}
