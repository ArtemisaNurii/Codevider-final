'use client'
import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { AnimatePresence, motion } from 'framer-motion';
import { LogoIcon } from './logoIcon';

interface LoaderProps {
  isLoading: boolean;
  onLoadingComplete: () => void;
}

const CodeviderLoader: React.FC<LoaderProps> = ({ isLoading, onLoadingComplete }) => {
  const isAnimationComplete = useRef(false);

  // Refs for all three separate elements + containers
  const loaderRef = useRef<HTMLDivElement>(null);
  const iconContainerRef = useRef<HTMLDivElement>(null);
  const hexagonRef = useRef<SVGPathElement>(null);
  const bracketsRef = useRef<SVGPathElement>(null);
  const heartRef = useRef<SVGPathElement>(null);
  const textRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!isLoading || isAnimationComplete.current) return;

    gsap.set(loaderRef.current, { autoAlpha: 1 });
    gsap.set(textRef.current, { autoAlpha: 0 });

    // Initial state for the heart: a "beat" animation
    gsap.set(heartRef.current, { autoAlpha: 0, scale: 0.8 });

    // Initial state for brackets & hexagon: drawing animation
    gsap.set([bracketsRef.current, hexagonRef.current], {
      strokeDasharray: (i, target) => target.getTotalLength(),
      strokeDashoffset: (i, target) => target.getTotalLength(),
    });

    // The final timeline, animating three distinct elements
    const tl = gsap.timeline({
      onComplete: () => {
        isAnimationComplete.current = true;
        setTimeout(onLoadingComplete, 700);
      },
    });

    tl
      // 1. The Heart "beats" into existence
      .to(heartRef.current, {
        autoAlpha: 1,
        scale: 1,
        duration: 0.5,
        ease: 'back.out(1.7)',
      })
      // 2. The Brackets are drawn around the heart
      .to(bracketsRef.current, {
        strokeDashoffset: 0,
        duration: 0.7,
        ease: 'power2.out',
      }, '-=0.2')
      // 3. The Hexagon structure is drawn last
      .to(hexagonRef.current, {
        strokeDashoffset: 0,
        duration: 1.0,
        ease: 'power2.inOut',
      }, '<0.2')
      // 4. The text appears with its glow
      .to(textRef.current, {
        autoAlpha: 1,
        duration: 1,
        ease: 'power2.out',
      }, '-=0.8')
      // 5. The final "power-on" pulse for the entire icon
      .to(iconContainerRef.current, {
        filter: 'drop-shadow(0 0 12px rgba(229, 231, 235, 0.7)) blur(0.5px)',
        duration: 0.3,
        yoyo: true,
        repeat: 1,
        ease: 'power2.inOut',
      }, '-=0.5');

  }, [isLoading, onLoadingComplete]);

  return (
    <AnimatePresence>
      {isLoading && (
        <motion.div
          ref={loaderRef}
          exit={{ opacity: 0, transition: { duration: 0.5, ease: 'easeInOut' } }}
          className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-black"
          style={{ visibility: 'hidden' }}
        >
          <div
            ref={iconContainerRef}
            className="transition-filter duration-300 [filter:drop-shadow(0_0_4px_rgba(229,231,235,0.5))_blur(0.5px)]"
          >
            <LogoIcon
              hexagonRef={hexagonRef}
              bracketsRef={bracketsRef}
              heartRef={heartRef}
            />
          </div>
          <div
            ref={textRef}
            className="mt-6 text-4xl  max-sm:text-2xl font-tight font-bold text-white"
          >
            Codevider
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default CodeviderLoader;