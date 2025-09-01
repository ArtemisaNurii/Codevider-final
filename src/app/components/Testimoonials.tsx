// app/testimonials/page.tsx

import Marquee from 'react-fast-marquee';
import Image from 'next/image';

interface Testimonial {
  name: string;
  role: string;
  image: string;
  text: string;
}

const testimonials: Testimonial[] = [
  {
    name: 'Sarah Thompson',
    role: 'Trendy Store',
    image: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=150&h=150&q=80',
    text: "Codevider transformed our online presence. Their SEO expertise boosted our rankings and brought in a flood of organic traffic we'd never seen before.",
  },
  {
    name: 'James Carter',
    role: 'ABC Plumbing',
    image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=150&h=150&q=80',
    text: 'After partnering with Codevider, our traffic and conversions saw a significant increase. Their team is knowledgeable, responsive, and genuinely invested in our success.',
  },
  {
    name: 'Lisa Chen',
    role: 'Innovative Software',
    image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=150&h=150&q=80',
    text: 'Codevider truly understood our business, delivering results that went far beyond our expectations. Their work has made a real, measurable impact on our bottom.',
  },
];

const CARD_WIDTH = 'w-80 sm:w-96';
const CARD_HEIGHT = 'h-auto';

export default function TestimonialsPage() {
  return (
    <section className="relative w-full overflow-hidden bg-white py-20 sm:py-28">
      {/* Glow background */}
      <div
        aria-hidden="true"
        className="absolute max-w-7xl left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-4/5 h-[550px] rounded-full bg-gradient-to-br from-sky-300 to-blue-300 opacity-50 blur-3xl"
      />

      <div className="relative z-10 mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mb-16 text-center">
          <p className="text-sm font-semibold uppercase tracking-wider text-gray-700">Testimonials</p>
          <h2 className="mt-4 text-4xl font-semibold tracking-tight text-gray-900 sm:text-5xl">
            What Our Clients Say
          </h2>
          <p className="mt-4 text-lg text-gray-700">
            Real insights from those we’ve had the pleasure to serve.
          </p>
        </div>

        <Marquee gradient={false} speed={30} className="py-4">
          {testimonials.map((t, idx) => (
            <article
              key={idx}
              className={`relative mx-4 flex ${CARD_WIDTH} ${CARD_HEIGHT} flex-shrink-0 flex-col justify-between rounded-2xl border border-white/30 bg-white/20 p-8 shadow-lg backdrop-blur-lg`}
            >
              <blockquote className="text-lg leading-relaxed text-gray-900">&ldquo;{t.text}&rdquo;</blockquote>
              <footer className="mt-8 flex items-center gap-4 border-t border-gray-900/10 pt-6">
                <Image
                  src={t.image}
                  alt={t.name}
                  width={56}
                  height={56}
                  className="h-14 w-14 rounded-full object-cover ring-2 ring-white/50"
                />
                <div>
                  <p className="font-semibold text-gray-900">{t.name}</p>
                  <p className="text-sm text-gray-700">{t.role}</p>
                </div>
              </footer>
            </article>
          ))}
        </Marquee>
      </div>
    </section>
  );
}
