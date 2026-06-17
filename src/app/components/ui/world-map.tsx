"use client"

import { useEffect, useRef, useState } from "react"
import { motion } from "motion/react"
import Image from "next/image"

import { useRevealInView } from "@/lib/hooks/useScrollRevealMode"

const pathHidden = { pathLength: 0 }
const pathVisible = { pathLength: 1 }
const pathViewport = { once: true, margin: "0px" }

function AnimatedPath({
  d,
  index,
}: {
  d: string
  index: number
}) {
  const pathMotion = useRevealInView<SVGPathElement>(pathHidden, pathVisible, pathViewport)

  return (
    <motion.path
      ref={pathMotion.ref}
      d={d}
      fill="none"
      stroke="url(#path-gradient)"
      strokeWidth="1.1"
      initial={pathMotion.initial}
      animate={pathMotion.animate}
      whileInView={pathMotion.whileInView}
      viewport={pathMotion.viewport}
      transition={{
        duration: 1.5,
        delay: 0.3 * index,
        ease: "easeOut",
      }}
    />
  )
}

interface MapProps {
  dots?: Array<{
    start: { lat: number; lng: number; label?: string }
    end: { lat: number; lng: number; label?: string }
  }>
  lineColor?: string
}
export default function WorldMap({ dots = [], lineColor = "#0a61cb" }: MapProps) {
  const svgRef = useRef<SVGSVGElement>(null)
  const [svgMap, setSvgMap] = useState<string | null>(null)

  useEffect(() => {
    let cancelled = false

    void import("dotted-map").then(({ default: DottedMap }) => {
      if (cancelled) return

      const map = new DottedMap({ height: 100, grid: "diagonal" })
      setSvgMap(
        map.getSVG({
          radius: 0.22,
          color: "#FFFFFF60",
          shape: "circle",
          backgroundColor: "transparent",
        }),
      )
    })

    return () => {
      cancelled = true
    }
  }, [])

  const projectPoint = (lat: number, lng: number) => {
    const x = (lng + 180) * (800 / 360)
    const y = (90 - lat) * (400 / 180)
    return { x, y }
  }

  const createCurvedPath = (start: { x: number; y: number }, end: { x: number; y: number }) => {
    const midX = (start.x + end.x) / 2
    const midY = Math.min(start.y, end.y) - 50
    return `M ${start.x} ${start.y} Q ${midX} ${midY} ${end.x} ${end.y}`
  }

  if (!svgMap) {
    return (
      <div
        aria-hidden
        className="w-full lg:w-auto xl:max-w-7xl mx-auto aspect-[2/1] animate-pulse rounded-lg bg-white/5"
      />
    )
  }

  return (
    <div className="w-full lg:w-auto xl:max-w-7xl mx-auto aspect-[2/1] bg-transparent relative font-sans">
      <Image
        src={`data:image/svg+xml;utf8,${encodeURIComponent(svgMap)}`}
        className="h-full w-full [mask-image:linear-gradient(to_bottom,transparent,white_10%,white_90%,transparent)] pointer-events-none select-none"
        alt="world map"
        height={495}
        width={1056}
        draggable={false}
        unoptimized
      />
      <svg
        ref={svgRef}
        viewBox="0 0 800 400"
        className="w-full h-full absolute inset-0 pointer-events-none select-none"
      >
        {dots.map((dot, i) => {
          const startPoint = projectPoint(dot.start.lat, dot.start.lng)
          const endPoint = projectPoint(dot.end.lat, dot.end.lng)
          return (
            <g key={`path-group-${i}`}>
             <AnimatedPath
  d={createCurvedPath(startPoint, endPoint)}
  index={i}
/>

            </g>
          )
        })}

        <defs>
          <linearGradient id="path-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="white" stopOpacity="0" />
            <stop offset="5%" stopColor={lineColor} stopOpacity="1" />
            <stop offset="95%" stopColor={lineColor} stopOpacity="1" />
            <stop offset="100%" stopColor="white" stopOpacity="0" />
          </linearGradient>
        </defs>

        {dots.map((dot, i) => (
          <g key={`points-group-${i}`}>
            <g key={`start-${i}`}>
              <circle
                cx={projectPoint(dot.start.lat, dot.start.lng).x}
                cy={projectPoint(dot.start.lat, dot.start.lng).y}
                r="3"
                fill={lineColor}
              />
              <circle
                cx={projectPoint(dot.start.lat, dot.start.lng).x}
                cy={projectPoint(dot.start.lat, dot.start.lng).y}
                r="3"
                fill={lineColor}
                opacity="0.5"
              >
                <animate attributeName="r" from="3" to="10" dur="1.5s" begin="0s" repeatCount="indefinite" />
                <animate attributeName="opacity" from="0.5" to="0" dur="1.5s" begin="0s" repeatCount="indefinite" />
              </circle>
            </g>
            <g key={`end-${i}`}>
              <circle
                cx={projectPoint(dot.end.lat, dot.end.lng).x}
                cy={projectPoint(dot.end.lat, dot.end.lng).y}
                r="3"
                fill={lineColor}
              />
              <circle
                cx={projectPoint(dot.end.lat, dot.end.lng).x}
                cy={projectPoint(dot.end.lat, dot.end.lng).y}
                r="3"
                fill={lineColor}
                opacity="0.5"
              >
                <animate attributeName="r" from="3" to="10" dur="1.5s" begin="0s" repeatCount="indefinite" />
                <animate attributeName="opacity" from="0.5" to="0" dur="1.5s" begin="0s" repeatCount="indefinite" />
              </circle>
            </g>
          </g>
        ))}
      </svg>
    </div>
  )
}
