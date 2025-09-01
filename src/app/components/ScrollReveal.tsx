"use client"

import { motion } from "framer-motion"
import { ReactNode } from "react"

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
  const directionVariants = {
    up: { y: 50, opacity: 0 },
    down: { y: -50, opacity: 0 },
    left: { x: 50, opacity: 0 },
    right: { x: -50, opacity: 0 },
    fade: { opacity: 0 }
  }

  const variants = {
    hidden: directionVariants[direction],
    visible: {
      y: 0,
      x: 0,
      opacity: 1,
      transition: {
        duration,
        delay,
        ease: "easeOut"
      }
    }
  }

  return (
    <motion.div
      className={className}
      initial="hidden"
      whileInView="visible"
      viewport={{ 
        once: true, // This prevents re-rendering once animated
        amount: 0.2, // Trigger when 20% of the element is visible
        margin: "-100px" // Start animation 100px before element comes into view
      }}
    >
      {children}
    </motion.div>
  )
}

export default ScrollReveal
