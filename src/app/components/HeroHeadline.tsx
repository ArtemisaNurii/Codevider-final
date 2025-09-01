"use client"
import React from 'react';

// CSS for the blinking cursor effect
const cursorStyle = `
  @keyframes blink {
    50% { opacity: 0; }
  }
  .blinking-cursor {
    color: #38bdf8; /* Sky color for the cursor */
    animation: blink 1s step-end infinite;
  }
`;

// --- MODIFIED: The component now accepts props ---
interface HeroHeadlineProps {
  displayedText: string;
}

const HeroHeadline: React.FC<HeroHeadlineProps> = ({ displayedText }) => {
  return (
    <div className="flex flex-col gap-4 text-center items-center">
      <style>{cursorStyle}</style>
      <h1 style={{ fontFamily: "var(--font-manrope), serif" }} className="hero-text text-4xl md:text-6xl lg:text-7xl font-normal tracking-tighter h-24 md:h-40 lg:h-52 flex flex-col justify-center">
        <span className="block text-white/90">Your trusting partner in</span>
        <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-sky-300">
          {displayedText}
          <span className="blinking-cursor">|</span>
        </span>
      </h1>
    </div>
  );
};

export default HeroHeadline;