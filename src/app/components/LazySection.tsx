"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";

type LazySectionProps = {
  children: ReactNode;
  minHeight?: string;
  rootMargin?: string;
  id?: string;
  className?: string;
};

export function LazySection({
  children,
  minHeight = "20rem",
  rootMargin = "400px 0px",
  id,
  className = "",
}: LazySectionProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { rootMargin },
    );

    observer.observe(element);
    return () => observer.disconnect();
  }, [rootMargin]);

  return (
    <div
      ref={ref}
      id={id}
      className={className}
      style={visible ? undefined : { minHeight }}
    >
      {visible ? children : null}
    </div>
  );
}

export function SectionSkeleton({ minHeight = "20rem" }: { minHeight?: string }) {
  return (
    <div
      aria-hidden
      className="w-full animate-pulse bg-gray-50/80"
      style={{ minHeight }}
    />
  );
}
