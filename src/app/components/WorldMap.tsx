"use client";
import { motion } from "motion/react";
import WorldMap from "./ui/world-map";

export default function WorldMapDemo() {
  return (
    <div className="py-20 dark:bg-black bg-gradient-to-br from-black via-slate-900 to-sky-800  w-full">
      <motion.div 
        className="max-w-7xl mx-auto text-center"
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        viewport={{ once: true, margin: "-100px" }}
      >
        <p className="font-bold font-sans text-4xl md:text-6xl dark:text-white text-white">
          Global{" "}
          <span className="text-neutral-400">
            {"Partnerships".split("").map((word, idx) => (
              <motion.span
                key={idx}
                className="inline-block"
                initial={{ x: -10, opacity: 0 }}
                whileInView={{ x: 0, opacity: 1 }}
                transition={{ duration: 0.5, delay: idx * 0.04 }}
                viewport={{ once: true }}
              >
                {word}
              </motion.span>
            ))}
          </span>
        </p>
        <motion.p 
          className="text-sm md:text-lg text-neutral-200 max-w-2xl font-sans mx-auto py-4"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          viewport={{ once: true }}
        >
          Building bridges across borders. We enable seamless collaboration on projects 
          worldwide, empowering startups, enterprises, and innovators to grow together.
        </motion.p>
      </motion.div>

      {/* Map wrapper: only fade in, no y/scale slide */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 1.2, ease: "easeOut", delay: 0.2 }}
        viewport={{ once: true, margin: "0px", amount: 0.3 }}
      >
        <WorldMap
          dots={[
            
            
              { start: { lat: 32.1533, lng: 17.1683 }, end: { lat: 27.7128, lng: -77.0060 } }, // → New York City
              { start: { lat: 32.1533, lng: 17.1683 }, end: { lat: 41.8566, lng: 5.3522 } },  // → Paris
              { start: { lat: 32.1533, lng: 17.1683 }, end: { lat: 29.7749, lng: -122.4194 } }, // → San Francisco
              { start: { lat: 32.1533, lng: 17.1683 }, end: { lat: -58.8136, lng: 144.9631 } }, // → Melbourne
              { start: { lat: 32.1533, lng: 17.1683 }, end: { lat: 46.5074, lng: -2.2978 } }, // → London
              { start: { lat: 32.1533, lng: 16.1683 }, end: { lat: 5.2048, lng: 55.9708 } },  // → Dubai
 
            
            
          
        ]}
        />
      </motion.div>
    </div>
  );
}
