"use client";

import type { FC } from 'react';
import Link from 'next/link'; // Import the Next.js Link component for internal navigation
import { Facebook, Instagram, Linkedin } from "lucide-react";

export const Footer1: FC = () => {
  return (
    <footer className="relative z-10 pt-12 border-black/40 sm:py-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-black via-[#050a08] to-[#0ea5e9] text-gray-400">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-center gap-6 border-b border-white/20 pb-8 mb-8">
          <p className="text-center md:text-left text-gray-400 max-w-2xl">
            Stay updated on our latest developments, insights, and opportunities by following us.
          </p>
          <button
            className="border border-white/80 text-white px-8 py-3 font-semibold rounded-lg hover:bg-white hover:text-black transition-colors w-full md:w-auto flex-shrink-0"
            onClick={() => (window.location.href = "mailto:hr@codevider.com")}
          >
            Let&apos;s Talk
          </button>
        </div>

        {/* --- MODIFIED LAYOUT: Two columns positioned at start and end --- */}
        <div className="flex justify-between text-sm">
          <div className="space-y-3">
            <p className="font-bold text-base text-gray-300">Company</p>
            <ul className="space-y-2 text-gray-400">
              {/* Anchor links for the same page are fine with <a> tags */}
              <li><a href="#about" className="hover:text-white transition-colors">About Us</a></li>
              <li><a href="#services" className="hover:text-white transition-colors">Services</a></li>
              <li><a href="#projects" className="hover:text-white transition-colors">Projects</a></li>
            </ul>
          </div>
          <div className="space-y-3">
            <p className="font-bold text-base text-gray-300">Contact</p>
            <ul className="space-y-2 text-gray-400">
              {/* mailto and tel links should use standard <a> tags */}
              <li><a href="mailto:hello@codevider.com" className="hover:text-white transition-colors">hr@codevider.com</a></li>
              <li><a href="tel:+355695877742" className="hover:text-white transition-colors"> +355 695877742</a></li>
            </ul>
          </div>
        </div>

        {/* --- NEW SECTION: Social Icons and Legal Links --- */}
        <div className="mt-12 py-6 flex flex-col sm:flex-row justify-between items-center gap-6">
          {/* Social Icons */}
          <div className="flex items-center gap-5">
            {/* External links should use standard <a> tags with target="_blank" */}
            <a href="https://www.instagram.com/codevider/?hl=en" target="_blank" rel="noopener noreferrer" aria-label="Instagram">
              <Instagram className="h-6 w-6 text-gray-400 hover:text-white transition-colors" />
            </a>
            <a href="https://www.facebook.com/codevider/" target="_blank" rel="noopener noreferrer" aria-label="Facebook">
              <Facebook className="h-6 w-6 text-gray-400 hover:text-white transition-colors" />
            </a>
            <a href="https://al.linkedin.com/company/codevider" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
              <Linkedin className="h-6 w-6 text-gray-400 hover:text-white transition-colors" />
            </a>
          </div>

          {/* Legal Links - Using Next.js Link for internal app navigation */}
          <div className="flex items-center gap-6 text-sm">
            
          </div>
        </div>

        <div className="border-t border-white/20 pt-6 text-center">
          <p className="text-sm text-gray-500">© {new Date().getFullYear()} Codevider. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};