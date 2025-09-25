"use client"

import { motion } from "framer-motion"
import { ReactNode, useMemo } from "react"

interface ScrollRevealProps {
  children: ReactNode
  delay?: number
  direction?: "up" | "down" | "left" | "right" | "fade"
  className?: string
  duration?: number
}

const ScrollReveal = ({ 
  children, 
  delay = 0, 
  direction = "up", 
  className = "",
  duration = 0.6 
}: ScrollRevealProps) => {
  // Memoize direction variants to avoid recreation on every render
  const directionVariants = useMemo(() => ({
    up: { y: 50, opacity: 0 },
    down: { y: -50, opacity: 0 },
    left: { x: 50, opacity: 0 },
    right: { x: -50, opacity: 0 },
    fade: { opacity: 0 }
  }), [])

  // Memoize animation variants to prevent unnecessary recalculations
  const variants = useMemo(() => ({
    hidden: directionVariants[direction],
    visible: {
      y: 0,
      x: 0,
      opacity: 1,
      transition: {
        duration,
        delay,
        ease: [0.25, 0.1, 0.25, 1] as [number, number, number, number]
      }
    }
  }), [direction, duration, delay, directionVariants])

  // Memoize viewport settings for better performance
  const viewportSettings = useMemo(() => ({
    once: true, // This prevents re-rendering once animated
    amount: 0.1, // Reduced from 0.2 for earlier triggering
    margin: "-50px" // Reduced margin for smoother experience
  }), [])

  return (
    <motion.div
      className={className}
      initial="hidden"
      whileInView="visible"
      viewport={viewportSettings}
      variants={variants}
    >
      {children}
    </motion.div>
  )
}

export default ScrollReveal
