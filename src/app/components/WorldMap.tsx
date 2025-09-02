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
        transition={{ duration: 1.2, ease: "easeOut", delay: 0.2 }}
        viewport={{ once: true, margin: "0px", amount: 0.3 }}
      >
        <WorldMap
          dots={[
            
            { start: { lat: 32.1533, lng: 17.1683 }, end: { lat: 52.5200, lng: 13.4050 } },  // Albania → Germany (Berlin)
            { start: { lat: 32.1533, lng: 17.1683 }, end: { lat: 10.7167, lng: -10.5677 } }, // Albania → Senegal (Dakar)
            { start: { lat: 32.1533, lng: 17.1683 }, end: { lat: 40.7128, lng: -74.0060 } }, // Albania → New York City
            { start: { lat: 32.1533, lng: 17.1683 }, end: { lat: 48.8566, lng: 2.3522 } }  ,  // Albania → France (Paris)
            { start: { lat: 32.1533, lng: 17.1683 }, end: { lat:  -14.2350, lng: -47.8828 } } ,
            { start: { lat: 32.1533, lng: 17.1683 }, end: { lat: -35.2820, lng: 149.1287 } } ,
            { start: { lat: 32.1533, lng: 17.1683 }, end: { lat: 39.9042, lng: 116.4074 } } 

          
        ]}
        />
      </motion.div>
    </div>
  );
}
