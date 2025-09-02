'use client';

import React, { useEffect } from 'react';
import { motion } from 'framer-motion';

type LoaderProps = {
  onLoadingComplete: () => void;
  size?: string | number;
  className?: string;
};

export default function Loader({
  onLoadingComplete,
  size = '3.75em',
  className = '',
}: LoaderProps) {
  const width = typeof size === 'number' ? `${size}px` : size;

  useEffect(() => {
    // This timer simulates loading assets, data, etc.
    const timer = setTimeout(() => {
      onLoadingComplete();
    }, 3000); // Loader will be visible for 3 seconds

    return () => clearTimeout(timer);
    // The dependency array ensures this effect runs only once on mount.
  }, [onLoadingComplete]);

  return (
    // The parent's AnimatePresence will handle the exit animation.
    // We define it here so the component owns its own animation behavior.
    <motion.div
      initial={{ opacity: 1 }}
      exit={{ opacity: 0, transition: { duration: 0.5, ease: 'easeInOut' } }}
      className="fixed inset-0 z-[9999] flex items-center justify-center bg-black"
    >
      <div
        className={`flex items-center justify-center ${className}`}
        role="status"
        aria-label="Loading"
      >
        <div
          className={`
            relative aspect-square overflow-visible
            will-change-transform
            animate-[loader-spin_10000ms_linear_infinite]
            before:content-[''] before:absolute before:bg-sky-300 before:animate-[squeeze_3000ms_infinite]
            after:content-[''] after:absolute after:bg-cyan-400 after:animate-[squeeze_3000ms_infinite] after:[animation-delay:-1250ms] after:rounded-[50px]
          `}
          style={
            {
              width,
              ['--size' as unknown as string]: width,
              ['--pad' as unknown as string]: '6px',
              ['--gap' as unknown as string]: '53%',
            } as React.CSSProperties
          }
        />
      </div>
    </motion.div>
  );
}