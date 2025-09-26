"use client"

import type React from "react"

import { type AnimationOptions, motion } from "motion/react"
import { forwardRef, useCallback, useEffect, useImperativeHandle, useMemo, useRef, useState } from "react"

import { cn } from "@/lib/utils"
import { useTextProcessingWorker } from "@/lib/hooks/useWebWorker"

interface TextProps {
  children: React.ReactNode
  reverse?: boolean
  transition?: AnimationOptions
  splitBy?: "words" | "characters" | "lines" | string
  staggerDuration?: number
  staggerFrom?: "first" | "last" | "center" | "random" | number
  containerClassName?: string
  wordLevelClassName?: string
  elementLevelClassName?: string
  onClick?: () => void
  onStart?: () => void
  onComplete?: () => void
  autoStart?: boolean // Whether to start the animation automatically
  once?: boolean // Whether to animate only once
}

// Ref interface to allow external control of the animation
export interface VerticalCutRevealRef {
  startAnimation: () => void
  reset: () => void
}

interface WordObject {
  characters: string[]
  needsSpace: boolean
}

const VerticalCutReveal = forwardRef<VerticalCutRevealRef, TextProps>(
  (
    {
      children,
      reverse = false,
      transition = {
        type: "spring",
        stiffness: 190,
        damping: 22,
      },
      splitBy = "words",
      staggerDuration = 0.2,
      staggerFrom = "first",
      containerClassName,
      wordLevelClassName,
      elementLevelClassName,
      onClick,
      onStart,
      onComplete,
      autoStart = true,
      once = false,
      ...props
    },
    ref,
  ) => {
    const containerRef = useRef<HTMLSpanElement>(null)
    const text = typeof children === "string" ? children : children?.toString() || ""
    const [isAnimating, setIsAnimating] = useState(false)
    const [hasAnimated, setHasAnimated] = useState(false)

    // handy function to split text into characters with support for unicode and emojis
    const splitIntoCharacters = (text: string): string[] => {
      if (typeof Intl !== "undefined" && "Segmenter" in Intl) {
        const segmenter = new Intl.Segmenter("en", { granularity: "grapheme" })
        return Array.from(segmenter.segment(text), ({ segment }) => segment)
      }
      // Fallback for browsers that don't support Intl.Segmenter
      return Array.from(text)
    }

    // Use Web Worker for expensive text processing
    const [processedData, setProcessedData] = useState<{
      elements: string[] | Array<{characters: string[]; needsSpace: boolean}>;
      delays: number[];
      animationData: Array<{element: unknown; delay: number; index: number}>;
    } | null>(null);
    
    const { processAnimationSequence, isLoading: isProcessing } = useTextProcessingWorker();

    // Process text with Web Worker when dependencies change
    useEffect(() => {
      const processText = async () => {
        try {
          const result = await processAnimationSequence(text, {
            splitBy: splitBy as 'words' | 'characters' | 'lines',
            staggerFrom,
            staggerDuration,
          });
          setProcessedData(result as typeof processedData);
        } catch (error) {
          console.error('Text processing failed:', error);
          // Fallback to synchronous processing
          const words = text.split(" ");
          const elements = splitBy === "words" ? text.split(" ") : splitBy === "lines" ? text.split("\n") : text.split(splitBy);
          setProcessedData({
            elements,
            delays: elements.map((_, i) => i * staggerDuration),
            animationData: elements.map((element, index) => ({ element, delay: index * staggerDuration, index }))
          });
        }
      };

      processText();
    }, [text, splitBy, staggerFrom, staggerDuration, processAnimationSequence]);

    // Extract elements and delays from processed data
    const elements = processedData?.elements || [];
    const getStaggerDelay = useCallback(
      (index: number) => processedData?.delays[index] || 0,
      [processedData],
    )

    const startAnimation = useCallback(() => {
      if (once && hasAnimated) return // Don't animate again if once is true and already animated
      setIsAnimating(true)
      onStart?.()
    }, [onStart, once, hasAnimated])

    // Expose the startAnimation function via ref
    useImperativeHandle(ref, () => ({
      startAnimation,
      reset: () => {
        setIsAnimating(false)
        setHasAnimated(false)
      },
    }))

    // Auto start animation
    useEffect(() => {
      if (autoStart) {
        startAnimation()
      }
    }, [autoStart])

    const variants = {
      hidden: { y: reverse ? "-100%" : "100%" },
      visible: (i: number) => ({
        y: 0,
        transition: {
          ...transition,
          delay: ((transition?.delay as number) || 0) + getStaggerDelay(i),
        },
      }),
    }

    return (
      <span
        className={cn(containerClassName, "flex flex-wrap whitespace-pre-wrap", splitBy === "lines" && "flex-col")}
        onClick={onClick}
        ref={containerRef}
        {...props}
      >
        <span className="sr-only">{text}</span>

        {(splitBy === "characters"
          ? (elements as WordObject[])
          : (elements as string[]).map((el, i) => ({
              characters: [el],
              needsSpace: i !== elements.length - 1,
            }))
        ).map((wordObj, wordIndex, array) => {
          const previousCharsCount = array.slice(0, wordIndex).reduce((sum, word) => sum + word.characters.length, 0)

          return (
            <span key={wordIndex} aria-hidden="true" className={cn("inline-flex overflow-hidden", wordLevelClassName)}>
              {wordObj.characters.map((char, charIndex) => (
                <span className={cn(elementLevelClassName, "whitespace-pre-wrap relative")} key={charIndex}>
                  <motion.span
                    custom={previousCharsCount + charIndex}
                    initial="hidden"
                    animate={isAnimating ? "visible" : "hidden"}
                    variants={variants}
                    onAnimationComplete={
                      wordIndex === elements.length - 1 && charIndex === wordObj.characters.length - 1
                        ? () => {
                            if (once) setHasAnimated(true)
                            onComplete?.()
                          }
                        : undefined
                    }
                    className="inline-block"
                  >
                    {char}
                  </motion.span>
                </span>
              ))}
              {wordObj.needsSpace && <span> </span>}
            </span>
          )
        })}
      </span>
    )
  },
)

VerticalCutReveal.displayName = "VerticalCutReveal"
export default VerticalCutReveal
