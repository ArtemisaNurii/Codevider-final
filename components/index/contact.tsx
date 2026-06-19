'use client'

import { ArrowRight, Check, Mail, MapPin, Phone } from 'lucide-react'
import { motion, useInView, useReducedMotion } from 'motion/react'
import { FormEvent, useRef, useState } from 'react'
import { useTranslations } from 'next-intl'

export default function Contact() {
  const t = useTranslations('home.contact')
  const ref = useRef<HTMLElement>(null)
  const inView = useInView(ref, { once: true, margin: '-10% 0px' })
  const shouldReduceMotion = useReducedMotion()
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const form = event.currentTarget
    if (!form.checkValidity()) {
      form.reportValidity()
      return
    }
    setSubmitted(true)
  }

  return (
    <section ref={ref} id="contact" className="home-section home-dark-section">
      <div className="home-wrap grid items-start gap-[clamp(2.5rem,6vw,5rem)] lg:grid-cols-[0.9fr_1.1fr]">
        <motion.div
          initial={shouldReduceMotion ? false : { opacity: 0, y: 16 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 16 }}
          transition={{ type: 'spring', duration: 0.45, bounce: 0 }}
        >
          <p className="home-eyebrow">{t('eyebrow')}</p>
          <h2 className="mt-[clamp(1.125rem,2.5vw,1.5rem)] max-w-xl text-balance text-[clamp(1.875rem,4.4vw,3.25rem)] leading-[1.05] tracking-[-0.02em] text-white">
            {t('headline')}
          </h2>
          <p className="mt-[clamp(1rem,2vw,1.375rem)] max-w-[46ch] text-[17px] leading-relaxed text-blue-100/70">
            {t('description')}
          </p>

          {[
            { icon: Mail, title: t('email_title'), href: 'mailto:info@codevider.com', value: 'info@codevider.com' },
            { icon: Phone, title: t('phone_title'), href: 'tel:+35569587742', value: '+355 69 587 7742' },
            { icon: MapPin, title: t('address_title'), value: t('address_value') },
          ].map(({ icon: Icon, title, href, value }) => (
            <div key={title} className="mt-8 flex gap-4">
              <span className="grid size-11 shrink-0 place-items-center rounded-xl bg-[#3a53c9]/20 text-[#00bcff]">
                <Icon className="size-5" aria-hidden />
              </span>
              <div>
                <h4 className="text-[15px] font-semibold text-white">{title}</h4>
                {href ? (
                  <a
                    href={href}
                    className="mt-1 block font-semibold text-[#00bcff] transition-colors hover:text-white"
                  >
                    {value}
                  </a>
                ) : (
                  <p className="mt-1 text-[15px] leading-relaxed text-blue-100/70">{value}</p>
                )}
              </div>
            </div>
          ))}
        </motion.div>

        <motion.div
          initial={shouldReduceMotion ? false : { opacity: 0, y: 16 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 16 }}
          transition={{ type: 'spring', duration: 0.45, bounce: 0, delay: 0.1 }}
        >
          {submitted ? (
            <div className="rounded-3xl border border-white/10 bg-white/5 p-10 text-center">
              <div className="mx-auto mb-[18px] grid size-16 place-items-center rounded-full bg-[#3a53c9]/20 text-[#00bcff]">
                <Check className="size-8" strokeWidth={2.4} aria-hidden />
              </div>
              <h3 className="text-xl font-semibold text-white">{t('success_title')}</h3>
              <p className="mt-2 text-blue-100/70">{t('success_message')}</p>
            </div>
          ) : (
            <form
              onSubmit={handleSubmit}
              className="rounded-3xl border border-[var(--border)] bg-[var(--bg)] p-[clamp(28px,3.5vw,44px)] text-[var(--text-h)] shadow-sm"
              noValidate
            >
              <div className="mb-6 grid gap-5 sm:grid-cols-2">
                <div>
                  <label htmlFor="contact-name" className="mb-2 block text-sm font-semibold">
                    {t('form_name')}
                  </label>
                  <input
                    id="contact-name"
                    name="name"
                    type="text"
                    required
                    placeholder={t('form_name_placeholder')}
                    className="w-full rounded-[10px] border-[1.5px] border-[var(--border)] bg-[var(--bg)] px-4 py-3.5 text-[inherit] transition-[border-color,box-shadow] focus:border-[#3a53c9] focus:outline-none focus:ring-[3px] focus:ring-[#3a53c9]/15"
                  />
                </div>
                <div>
                  <label htmlFor="contact-email" className="mb-2 block text-sm font-semibold">
                    {t('form_email')}
                  </label>
                  <input
                    id="contact-email"
                    name="email"
                    type="email"
                    required
                    placeholder={t('form_email_placeholder')}
                    className="w-full rounded-[10px] border-[1.5px] border-[var(--border)] bg-[var(--bg)] px-4 py-3.5 text-[inherit] transition-[border-color,box-shadow] focus:border-[#3a53c9] focus:outline-none focus:ring-[3px] focus:ring-[#3a53c9]/15"
                  />
                </div>
              </div>
              <div className="mb-6">
                <label htmlFor="contact-company" className="mb-2 block text-sm font-semibold">
                  {t('form_company')}{' '}
                  <span className="font-normal text-[var(--text)]">({t('form_optional')})</span>
                </label>
                <input
                  id="contact-company"
                  name="company"
                  type="text"
                  placeholder={t('form_company_placeholder')}
                  className="w-full rounded-[10px] border-[1.5px] border-[var(--border)] bg-[var(--bg)] px-4 py-3.5 text-[inherit] transition-[border-color,box-shadow] focus:border-[#3a53c9] focus:outline-none focus:ring-[3px] focus:ring-[#3a53c9]/15"
                />
              </div>
              <div className="mb-6">
                <label htmlFor="contact-message" className="mb-2 block text-sm font-semibold">
                  {t('form_message')}
                </label>
                <textarea
                  id="contact-message"
                  name="message"
                  required
                  rows={5}
                  placeholder={t('form_message_placeholder')}
                  className="min-h-[132px] w-full resize-y rounded-[10px] border-[1.5px] border-[var(--border)] bg-[var(--bg)] px-4 py-3.5 text-[inherit] transition-[border-color,box-shadow] focus:border-[#3a53c9] focus:outline-none focus:ring-[3px] focus:ring-[#3a53c9]/15"
                />
              </div>
              <button
                type="submit"
                className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-[#3a53c9] px-7 py-4 text-base font-semibold text-white transition-[background-color,transform] hover:bg-[#2f46a8] active:scale-[0.96]"
              >
                {t('form_submit')}
                <ArrowRight className="size-4" aria-hidden />
              </button>
              <p className="mt-3 text-[13px] leading-relaxed text-[var(--text)]">{t('form_note')}</p>
            </form>
          )}
        </motion.div>
      </div>
    </section>
  )
}
