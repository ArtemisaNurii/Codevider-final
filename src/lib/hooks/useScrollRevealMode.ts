"use client"

import type { TargetAndTransition, VariantLabels } from "motion/react"
import type { RefObject } from "react"
import { useCallback, useMemo, useRef, useState } from "react"

export type ScrollRevealMode = "instant" | "animate" | "deferred"

type ViewportConfig = {
  once?: boolean
  amount?: number
  margin?: string
}

type RevealMotionTarget = TargetAndTransition | VariantLabels

export type RevealMotionProps = {
  initial: RevealMotionTarget
  animate?: RevealMotionTarget
  whileInView?: RevealMotionTarget
  viewport?: ViewportConfig
}

export function isScrollRestored(): boolean {
  return typeof window !== "undefined" && window.scrollY > 0
}

export function getScrollRevealMode(element: Element): ScrollRevealMode {
  if (!isScrollRestored()) {
    return "deferred"
  }

  const rect = element.getBoundingClientRect()

  if (rect.top >= window.innerHeight) {
    return "deferred"
  }

  // Above or inside the viewport on refresh — show immediately.
  return "instant"
}

export function shouldSkipScrollAnimation(element: Element): boolean {
  return getScrollRevealMode(element) === "instant"
}

export function useScrollRevealMode<T extends Element = Element>() {
  const elementRef = useRef<T | null>(null)
  const [mode, setMode] = useState<ScrollRevealMode | null>(null)

  const ref = useCallback((node: T | null) => {
    elementRef.current = node
    if (node) {
      setMode(getScrollRevealMode(node))
    }
  }, [])

  return { ref, mode, elementRef: elementRef as RefObject<T | null> }
}

export function useScrollRevealAnimation(viewport: ViewportConfig = {}) {
  const { ref, mode } = useScrollRevealMode()
  const viewportConfig = useMemo(
    () => ({
      once: viewport.once ?? true,
      amount: viewport.amount ?? 0.1,
      margin: viewport.margin ?? "0px 0px -8% 0px",
    }),
    [viewport.amount, viewport.margin, viewport.once],
  )

  const motionProps = useMemo(() => {
    if (mode === "instant") {
      return { initial: "visible" as const, animate: "visible" as const }
    }

    return {
      initial: "hidden" as const,
      whileInView: "visible" as const,
      viewport: viewportConfig,
    }
  }, [mode, viewportConfig])

  return { ref, mode, ...motionProps }
}

export function useMountRevealAnimation() {
  const { ref, mode } = useScrollRevealMode()

  const motionProps = useMemo(() => {
    if (mode === "instant") {
      return { initial: "visible" as const, animate: "visible" as const }
    }

    if (mode === "deferred") {
      return {
        initial: "hidden" as const,
        whileInView: "visible" as const,
        viewport: { once: true, amount: 0.1 },
      }
    }

    return { initial: "hidden" as const }
  }, [mode])

  return { ref, mode, ...motionProps }
}

export function useInViewRevealAnimation(inView: boolean) {
  const { ref, mode } = useScrollRevealMode()

  const motionProps = useMemo(() => {
    const initial = mode === "instant" ? ("visible" as const) : ("hidden" as const)
    const animate =
      mode === "instant" || inView ? ("visible" as const) : ("hidden" as const)

    return { initial, animate }
  }, [inView, mode])

  return { ref, mode, ...motionProps }
}

export function useRevealInView<T extends Element = HTMLElement>(
  hidden: TargetAndTransition,
  visible: TargetAndTransition,
  viewport: ViewportConfig = { once: true },
): { ref: (node: T | null) => void; mode: ScrollRevealMode | null } & RevealMotionProps {
  const { ref, mode } = useScrollRevealMode<T>()

  const motionProps = useMemo<RevealMotionProps>(() => {
    if (mode === "instant") {
      return { initial: visible, animate: visible }
    }

    return { initial: hidden, whileInView: visible, viewport }
  }, [hidden, mode, visible, viewport])

  return { ref, mode, ...motionProps }
}
