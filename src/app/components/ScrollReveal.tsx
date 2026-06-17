"use client"

import { motion, useReducedMotion, type Variants } from "framer-motion"
import type React from "react"

const easeCubic = [0.25, 0.1, 0.25, 1.0] as const

const enterTransition = { duration: 0.5, ease: easeCubic }

// Variants for different reveal styles
const fadeUp: Variants = {
  hidden: { opacity: 0, y: 12, filter: "blur(4px)" },
  visible: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: enterTransition,
  },
}

const fadeIn: Variants = {
  hidden: { opacity: 0, filter: "blur(4px)" },
  visible: {
    opacity: 1,
    filter: "blur(0px)",
    transition: { duration: 0.6, ease: easeCubic },
  },
}

const scaleUp: Variants = {
  hidden: { opacity: 0, scale: 0.97, filter: "blur(4px)" },
  visible: {
    opacity: 1,
    scale: 1,
    filter: "blur(0px)",
    transition: enterTransition,
  },
}

const slideFromLeft: Variants = {
  hidden: { opacity: 0, x: -24, filter: "blur(4px)" },
  visible: {
    opacity: 1,
    x: 0,
    filter: "blur(0px)",
    transition: enterTransition,
  },
}

const slideFromRight: Variants = {
  hidden: { opacity: 0, x: 24, filter: "blur(4px)" },
  visible: {
    opacity: 1,
    x: 0,
    filter: "blur(0px)",
    transition: enterTransition,
  },
}

const variantMap = {
  fadeUp,
  fadeIn,
  scaleUp,
  slideFromLeft,
  slideFromRight,
}

export type AnimationVariant = keyof typeof variantMap

// ─── AnimatedSection (drop-in ScrollReveal replacement) ───────────────────────

interface ScrollRevealProps {
  children: React.ReactNode
  variant?: AnimationVariant
  delay?: number
  className?: string
  as?: "div" | "section" | "span" | "h1" | "h2" | "h3" | "p" | "a"
  once?: boolean
  amount?: number
  // legacy prop aliases kept for back-compat
  direction?: "up" | "down" | "left" | "right" | "fade"
  duration?: number
}

const ScrollReveal = ({
  children,
  variant = "fadeUp",
  delay = 0,
  className = "",
  as = "div",
  once = true,
  amount = 0.1,
}: ScrollRevealProps) => {
  const prefersReducedMotion = useReducedMotion()
  const selectedVariant = variantMap[variant]

  if (prefersReducedMotion) {
    const StaticComponent = as
    return <StaticComponent className={className}>{children}</StaticComponent>
  }

  const delayedVariant: Variants = {
    hidden: selectedVariant.hidden,
    visible: {
      ...selectedVariant.visible,
      transition: {
        ...((selectedVariant.visible as Record<string, unknown>).transition as Record<string, unknown>),
        delay,
      },
    },
  }

  const Component = motion.create(as as "div")

  return (
    <Component
      initial="hidden"
      whileInView="visible"
      viewport={{ once, amount, margin: "0px 0px -8% 0px" }}
      variants={delayedVariant}
      className={className}
    >
      {children}
    </Component>
  )
}

export default ScrollReveal

// ─── StaggerContainer ─────────────────────────────────────────────────────────

interface StaggerContainerProps {
  children: React.ReactNode
  className?: string
  staggerDelay?: number
  as?: "div" | "section" | "ul"
}

export function StaggerContainer({
  children,
  className = "",
  staggerDelay = 0.1,
  as = "div",
}: StaggerContainerProps) {
  const customStagger: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: staggerDelay,
        delayChildren: 0.1,
      },
    },
  }

  const Component = motion.create(as as "div")

  return (
    <Component
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
      variants={customStagger}
      className={className}
    >
      {children}
    </Component>
  )
}

// ─── StaggerItem ──────────────────────────────────────────────────────────────

interface StaggerItemProps {
  children: React.ReactNode
  className?: string
  variant?: AnimationVariant
}

export function StaggerItem({
  children,
  className = "",
  variant = "fadeUp",
}: StaggerItemProps) {
  return (
    <motion.div variants={variantMap[variant]} className={className}>
      {children}
    </motion.div>
  )
}

// ─── TextReveal ───────────────────────────────────────────────────────────────

interface TextRevealProps {
  text: string
  className?: string
  by?: "word" | "char"
  delay?: number
}

export function TextReveal({
  text,
  className = "",
  by = "word",
  delay = 0,
}: TextRevealProps) {
  const items = by === "word" ? text.split(" ") : text.split("")

  return (
    <motion.span
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.5 }}
      variants={{
        hidden: {},
        visible: {
          transition: {
            staggerChildren: by === "word" ? 0.08 : 0.03,
            delayChildren: delay,
          },
        },
      }}
      className={className}
      aria-label={text}
    >
      {items.map((item, i) => (
        <motion.span
          key={`${item}-${i}`}
          variants={{
            hidden: { opacity: 0, y: 20, filter: "blur(4px)" },
            visible: {
              opacity: 1,
              y: 0,
              filter: "blur(0px)",
              transition: { duration: 0.5, ease: easeCubic },
            },
          }}
          className="inline-block"
        >
          {item}
          {by === "word" && i < items.length - 1 ? "\u00A0" : ""}
        </motion.span>
      ))}
    </motion.span>
  )
}

// ─── CountUp ──────────────────────────────────────────────────────────────────

interface CountUpProps {
  target: number
  duration?: number
  className?: string
  suffix?: string
}

export function CountUp({
  target,
  duration = 2,
  className = "",
  suffix = "",
}: CountUpProps) {
  return (
    <motion.span
      className={className}
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
    >
      <motion.span initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}>
        {target}
        {suffix}
      </motion.span>
    </motion.span>
  )
}
