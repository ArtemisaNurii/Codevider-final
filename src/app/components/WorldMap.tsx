"use client";
import { motion } from "motion/react";
import WorldMap from "./ui/world-map";

export default function WorldMapDemo() {
  return (
    <div className="py-40 dark:bg-black bg-white w-full">
      <motion.div 
        className="max-w-7xl mx-auto text-center"
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        viewport={{ once: true, margin: "-100px" }}
      >
        <p className="font-bold font-sans text-2xl md:text-5xl dark:text-white text-gray-900">
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
          className="text-sm md:text-lg text-neutral-500 max-w-2xl font-sans mx-auto py-4"
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
        transition={{ duration: 1.2, ease: "easeOut", delay: 0.5 }}
        viewport={{ once: true, margin: "-50px" }}
      >
        <WorldMap
          dots={[
            { start: { lat: 64.2008, lng: -149.4937 }, end: { lat: 34.0522, lng: -118.2437 } }, // Alaska → LA
            { start: { lat: 64.2008, lng: -149.4937 }, end: { lat: -15.7975, lng: -47.8919 } }, // Alaska → Brazil
            { start: { lat: -15.7975, lng: -47.8919 }, end: { lat: 38.7223, lng: -9.1393 } },   // Brazil → Lisbon
            { start: { lat: 51.5074, lng: -0.1278 }, end: { lat: 28.6139, lng: 77.209 } },     // London → New Delhi
            { start: { lat: 28.6139, lng: 77.209 }, end: { lat: 43.1332, lng: 131.9113 } },    // New Delhi → Vladivostok
            { start: { lat: 28.6139, lng: 77.209 }, end: { lat: -1.2921, lng: 36.8219 } },     // New Delhi → Nairobi
          ]}
        />
      </motion.div>
    </div>
  );
}
