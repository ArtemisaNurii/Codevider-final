'use client'

import Link from 'next/link'
import { useTranslations } from 'next-intl'
import { CodeviderLogo } from './CodeviderLogo'

const SOCIAL_LINKS = [
  { href: '#', label: 'Instagram', src: '/icons/footer/instagram.svg' },
  {
    href: 'https://al.linkedin.com/company/codevider',
    label: 'LinkedIn',
    src: '/icons/footer/linkedin.png',
  },
  {
    href: 'https://www.facebook.com/codevider/',
    label: 'Facebook',
    src: '/icons/footer/facebook.svg',
  },
] as const

export default function Footer() {
  const t = useTranslations('footer')

  return (
    <footer className="bg-[#0f1424] px-6 py-[clamp(54px,7vw,84px)] pb-[30px] text-blue-100/70 sm:px-10 md:px-14">
      <div className="mx-auto max-w-[1200px]">
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-[1.6fr_1fr_1fr_1fr]">
          <div>
            <Link href="/" className="inline-flex items-center gap-2.5 text-white">
              <CodeviderLogo compact />
            </Link>
            <p className="mt-[18px] max-w-[30ch] text-[15px] leading-relaxed">
              {t('description')}
            </p>
          </div>

          <div>
            <h4 className="mb-4 text-sm font-semibold uppercase tracking-[0.04em] text-white">
              {t('company')}
            </h4>
            <Link href="/about" className="block py-1.5 text-[15px] transition-colors hover:text-white">
              {t('about')}
            </Link>
            <Link href="/services" className="block py-1.5 text-[15px] transition-colors hover:text-white">
              {t('services')}
            </Link>
            <Link href="/career" className="block py-1.5 text-[15px] transition-colors hover:text-white">
              {t('careers')}
            </Link>
          </div>

          <div>
            <h4 className="mb-4 text-sm font-semibold uppercase tracking-[0.04em] text-white">
              {t('address_heading')}
            </h4>
            <p className="py-1.5 text-[15px]">{t('address_line_1')}</p>
            <p className="py-1.5 text-[15px]">{t('address_line_2')}</p>
            <p className="py-1.5 text-[15px]">{t('address_line_3')}</p>
          </div>

          <div>
            <h4 className="mb-4 text-sm font-semibold uppercase tracking-[0.04em] text-white">
              {t('contact_heading')}
            </h4>
            <a
              href="mailto:info@codevider.com"
              className="block py-1.5 text-[15px] transition-colors hover:text-white"
            >
              info@codevider.com
            </a>
            <a
              href="tel:+35569587742"
              className="block py-1.5 text-[15px] transition-colors hover:text-white"
            >
              +355 69 587 7742
            </a>
          </div>
        </div>

        <div className="mt-12 flex flex-wrap items-center justify-between gap-4 border-t border-white/10 pt-6 text-sm">
          <span>{t('copyright')}</span>
          <div className="flex gap-2.5">
            {SOCIAL_LINKS.map(({ href, label, src }) => (
              <a
                key={label}
                href={href}
                aria-label={label}
                className="grid size-[38px] place-items-center rounded-[10px] border border-white/10 transition-[border-color,transform] hover:-translate-y-0.5 hover:border-white"
              >
                <img
                  src={src}
                  alt=""
                  width={18}
                  height={18}
                  className="size-[18px] object-contain opacity-70 transition-opacity hover:opacity-100"
                />
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  )
}
