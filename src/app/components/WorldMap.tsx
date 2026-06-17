"use client";
import { motion } from "motion/react";
import WorldMap from "./ui/world-map";
import { useRevealInView } from "@/lib/hooks/useScrollRevealMode";

const titleHidden = { opacity: 0, y: 50 };
const titleVisible = { opacity: 1, y: 0 };
const titleViewport = { once: true, margin: "-100px" };

const subtitleHidden = { opacity: 0, y: 30 };
const subtitleVisible = { opacity: 1, y: 0 };
const subtitleViewport = { once: true };

const mapHidden = { opacity: 0 };
const mapVisible = { opacity: 1 };
const mapViewport = { once: true, margin: "0px", amount: 0.3 };

const letterHidden = { x: -10, opacity: 0 };
const letterVisible = { x: 0, opacity: 1 };
const letterViewport = { once: true };

function AnimatedLetter({ letter, index }: { letter: string; index: number }) {
  const letterMotion = useRevealInView(letterHidden, letterVisible, letterViewport);

  return (
    <motion.span
      ref={letterMotion.ref}
      className="inline-block"
      initial={letterMotion.initial}
      animate={letterMotion.animate}
      whileInView={letterMotion.whileInView}
      viewport={letterMotion.viewport}
      transition={{ duration: 0.5, delay: index * 0.04 }}
    >
      {letter}
    </motion.span>
  );
}

export default function WorldMapDemo() {
  const title = useRevealInView(titleHidden, titleVisible, titleViewport);
  const subtitle = useRevealInView(subtitleHidden, subtitleVisible, subtitleViewport);
  const map = useRevealInView(mapHidden, mapVisible, mapViewport);

  return (
    <div className="section-py dark:bg-black bg-linear-to-br from-black via-slate-900 to-sky-800 w-full">
      <motion.div 
        ref={title.ref}
        className="site-container text-center"
        initial={title.initial}
        animate={title.animate}
        whileInView={title.whileInView}
        viewport={title.viewport}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        <p className="font-bold font-sans text-fluid-display dark:text-white text-white text-balance">
          Global{" "}
          <span className="text-neutral-400">
            {"Partnerships".split("").map((word, idx) => (
              <AnimatedLetter key={idx} letter={word} index={idx} />
            ))}
          </span>
        </p>
        <motion.p 
          ref={subtitle.ref}
          className="text-sm sm:text-base md:text-lg text-neutral-200 max-w-2xl font-sans mx-auto py-4 text-pretty leading-relaxed"
          initial={subtitle.initial}
          animate={subtitle.animate}
          whileInView={subtitle.whileInView}
          viewport={subtitle.viewport}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          Building bridges across borders. We enable seamless collaboration on projects 
          worldwide, empowering startups, enterprises, and innovators to grow together.
        </motion.p>
      </motion.div>

      <motion.div
        ref={map.ref}
        initial={map.initial}
        animate={map.animate}
        whileInView={map.whileInView}
        viewport={map.viewport}
        transition={{ duration: 1.2, ease: "easeOut", delay: 0.2 }}
      >
        <WorldMap
          dots={[
            
            
              { start: { lat: 32.1533, lng: 17.1683 }, end: { lat: 27.7128, lng: -77.0060 } },
              { start: { lat: 32.1533, lng: 17.1683 }, end: { lat: 41.8566, lng: 5.3522 } },
              { start: { lat: 32.1533, lng: 17.1683 }, end: { lat: 29.7749, lng: -122.4194 } },
              { start: { lat: 32.1533, lng: 17.1683 }, end: { lat: -58.8136, lng: 144.9631 } },
              { start: { lat: 32.1533, lng: 17.1683 }, end: { lat: 46.5074, lng: -2.2978 } },
              { start: { lat: 32.1533, lng: 16.1683 }, end: { lat: 5.2048, lng: 55.9708 } },
 
            
            
          
        ]}
        />
      </motion.div>
    </div>
  );
}
