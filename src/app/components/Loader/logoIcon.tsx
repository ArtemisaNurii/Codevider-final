import React, { forwardRef, Ref } from 'react';

// The props interface remains unchanged.
export interface LogoIconProps {
  hexagonRef: Ref<SVGPathElement>;
  bracketsRef: Ref<SVGPathElement>;
  heartRef: Ref<SVGPathElement>;
}

export const LogoIcon = forwardRef<SVGSVGElement, LogoIconProps>(
  ({ hexagonRef, bracketsRef, heartRef }, ref) => (
    <svg
      ref={ref}
      width="80"
      height="65"
      viewBox="0 0 86 76"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Path 1: The Outer Hexagon (Unchanged) */}
      <path
        ref={hexagonRef}
        d="M21.6603 2H64.3397L85.6795 38L64.3397 74H21.6603L0.32051 38L21.6603 2Z"
        stroke="#E5E7EB"
        strokeWidth="3"
      />
      {/* Path 2: The <> Brackets (Unchanged) */}
      <path
        ref={bracketsRef}
        d="M60 24L70 38L60 52M26 52L16 38L26 24"
        stroke="#E5E7EB"
        strokeWidth="3"
        strokeLinecap="round"
      />
      {/* Path 3: The Inner Heart (MODIFIED - Made Larger) */}
      <path
        ref={heartRef}
        d="M53.5 30.5C51 28 47.5 28 45.5 30.5L43 33L40.5 30.5C38.5 28 35 28 32.5 30.5C30 33 30 37 32.5 39.5L43 50L53.5 39.5C56 37 56 33 53.5 30.5Z"
        stroke="#E5E7EB"
        strokeWidth="3"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
);

LogoIcon.displayName = 'LogoIcon';