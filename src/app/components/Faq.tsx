'use client';

import React, { useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { Plus } from 'lucide-react';
import { homePage } from '@/lib/constants/pages/home';

const springTransition = { type: 'spring' as const, duration: 0.3, bounce: 0 };

export default function Faq() {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const { title, list: items } = homePage.faq;

  const toggle = (index: number) => {
    setActiveIndex((current) => (current === index ? null : index));
  };

  return (
    <section className="bg-white section-py">
      <div className="site-container">
        <h2 className="text-center text-fluid-heading font-semibold uppercase text-black mb-8 sm:mb-10 text-balance">
          {title}
        </h2>
        <div className="rounded-2xl bg-white p-2 sm:p-3 surface-elevated">
          {items.map((item, index) => {
            const isOpen = activeIndex === index;
            const panelId = `faq-panel-${index}`;
            const triggerId = `faq-trigger-${index}`;

            return (
              <div
                key={item.title}
                className={`overflow-hidden rounded-xl ${
                  index !== items.length - 1 ? 'shadow-[0_1px_0_rgba(0,0,0,0.06)]' : ''
                }`}
              >
                <button
                  type="button"
                  id={triggerId}
                  onClick={() => toggle(index)}
                  aria-expanded={isOpen}
                  aria-controls={panelId}
                  className="relative flex w-full min-h-11 items-center gap-3 rounded-xl px-3 py-4 text-left text-sm font-semibold text-gray-800 transition-[color,background-color,transform] duration-150 ease-out hover:bg-gray-50/80 sm:text-base active:scale-[0.96] before:absolute before:inset-[-2px] before:content-[''] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-500/40 focus-visible:ring-offset-2"
                >
                  <motion.span
                    animate={{ rotate: isOpen ? 45 : 0 }}
                    transition={springTransition}
                    className="inline-flex shrink-0"
                    aria-hidden
                  >
                    <Plus className="h-5 w-5 text-gray-700" />
                  </motion.span>
                  <span className="text-pretty">{item.title}</span>
                </button>
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      id={panelId}
                      role="region"
                      aria-labelledby={triggerId}
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{
                        height: 0,
                        opacity: 0,
                        transition: {
                          height: { duration: 0.2, ease: [0.2, 0, 0, 1] },
                          opacity: { duration: 0.15, ease: 'easeIn' },
                        },
                      }}
                      transition={{
                        height: springTransition,
                        opacity: { duration: 0.2 },
                      }}
                    >
                      <p className="px-3 pb-4 pt-0 text-sm leading-relaxed text-gray-700 text-pretty sm:px-8 sm:text-base">
                        {item.description}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
