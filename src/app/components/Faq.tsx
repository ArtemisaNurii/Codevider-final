'use client';

import React, { useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { Plus } from 'lucide-react';

const tabs = [
    {
      title: 'What types of software projects do you take on?',
      description:
        'We build everything from MVPs and mobile apps to large-scale SaaS platforms, internal tools, and complex cloud back-ends. If it involves custom code, we can probably handle it.',
    },
    {
      title: 'Which technologies and frameworks do you specialize in?',
      description:
        'Our team specializes in modern web and mobile frameworks including React, Next.js, Node.js, Python, Tailwind CSS, and AWS Cloud services. We’re also flexible and learn new stacks quickly.',
    },
    {
      title: 'How do you estimate project timelines and budgets?',
      description:
        'We start with a discovery session to understand your goals, then create a detailed scope with estimates. Our estimates balance speed and thoroughness to help you plan accurately.',
    },
    {
      title: 'Will I own the source code and intellectual property?',
      description:
        'Yes, you retain full ownership of all source code and IP upon final payment. We make this clear in our contract for transparency and peace of mind.',
    },
    {
      title: 'How will we communicate during the project?',
      description:
        'We use tools like Slack, Notion, and regular video calls to keep you updated. You’ll have a direct line to your project manager and developers.',
    },
    {
      title: 'What is your quality-assurance process?',
      description:
        'Our QA process includes manual and automated testing, peer code reviews, staging environments, and performance monitoring to ensure everything works as intended.',
    },
    {
      title: 'Do you provide post-launch support and maintenance?',
      description:
        'Yes. We offer flexible maintenance plans, including bug fixes, updates, performance monitoring, and new feature development.',
    },
    {
      title: 'Can you work with an existing or legacy codebase?',
      description:
        'Absolutely. We’ve helped modernize and scale legacy systems across various tech stacks while preserving core functionality.',
    },
  ];
  

export default function Faq() {
  const [activeIndex, setActiveIndex] = useState<number | null>(0);

  const handleClick = (index: number) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <section className="bg-white py-16">
      <div className="container mx-auto px-4">
        <h1 className="text-center text-4xl font-semibold uppercase text-black mb-10">
          Frequently Asked Questions
        </h1>
        <div className="rounded-lg border border-gray-200 bg-white p-4 shadow-sm">
          {tabs.map((tab, index) => (
            <motion.div
              key={index}
              className={`overflow-hidden ${index !== tabs.length - 1 ? 'border-b border-gray-200' : ''}`}
              onClick={() => handleClick(index)}
            >
              <button
                className="flex w-full items-center gap-2 px-2 py-4 text-left text-gray-800 font-semibold transition-all sm:text-base text-sm"
              >
                <Plus
                  className={`h-5 w-5 transform transition-transform text-gray-700 ${activeIndex === index ? 'rotate-45' : 'rotate-0'}`}
                />
                {tab.title}
              </button>
              <AnimatePresence mode="sync">
                {activeIndex === index && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3, ease: 'easeInOut', delay: 0.14 }}
                  >
                    <p className="px-8 pb-4 pt-0 text-black text-sm sm:text-base">
                      {tab.description}
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
