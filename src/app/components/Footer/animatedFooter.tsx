"use client"; // This must be a client component for hooks and DOM manipulation

import React, { useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import { FaFacebookF, FaLinkedinIn, FaInstagram } from 'react-icons/fa';
import { FiSend } from 'react-icons/fi';
import Image from 'next/image';

// Define props for our reusable link component
interface FooterLinkProps {
  href: string;
  children: React.ReactNode;
}

// A reusable, typed component for the footer links
const FooterLink: React.FC<FooterLinkProps> = ({ href, children }) => (
  <li>
    <a href={href} className="text-xs sm:text-sm text-gray-600 hover:text-gray-900 transition-colors duration-200 leading-5 sm:leading-6">
      {children}
    </a>
  </li>
);

const AnimatedFooter: React.FC = () => {
  // Create refs for the elements we want to animate with GSAP.
  // We type them to tell TypeScript they will be attached to a div element.
  const blob1 = useRef<HTMLDivElement | null>(null);
  const blob2 = useRef<HTMLDivElement | null>(null);

  // Set up the animation inside a useEffect hook to run after the component mounts
  useEffect(() => {
    // Check if the refs are attached before animating
    if (blob1.current && blob2.current) {
        gsap.to(blob1.current, {
            x: "20vw",
            y: "30vh",
            rotation: 360,
            duration: 40,
            ease: "power1.inOut",
            repeat: -1, // Repeat indefinitely
            yoyo: true,  // Animate back and forth
        });
        
        gsap.to(blob2.current, {
            x: "-30vw",
            y: "-20vh",
            rotation: -360,
            duration: 50,
            ease: "power1.inOut",
            repeat: -1,
            yoyo: true,
        });
    }
  }, []); // The empty dependency array ensures this effect runs only once

  return (
    <footer className="bg-white antialiased">
      <div className="max-w-7xl mx-auto px-6 lg:px-8 py-16 sm:py-24">
        
        {/* Call to Action Section with Animated Background */}
        <div className="relative isolate overflow-hidden bg-sky-500/10 rounded-2xl sm:rounded-3xl shadow-xl px-4 sm:px-6 py-12 sm:py-20 lg:py-24 lg:px-24">
          
          {/* Animated Blobs Container */}
          <div className="absolute inset-0 -z-10">
              <div
                ref={blob1}
                className="absolute top-[-50%] left-[-50%] w-[40rem] h-[40rem] bg-gradient-to-br from-sky-500 to-cyan-600 rounded-full filter blur-3xl opacity-40"
              />
              <div
                ref={blob2}
                className="absolute bottom-[-50%] right-[-50%] w-[50rem] h-[50rem] bg-gradient-to-br from-blue-400 to-sky-500 rounded-full filter blur-3xl opacity-50"
              />
          </div>
          
          {/* CTA Content */}
          <div className="relative z-10 text-center text-slate-800">
            <h2 className="text-2xl sm:text-4xl md:text-5xl font-bold tracking-tight">
              Ready to Build Something <br className="hidden sm:block" /> Amazing?
            </h2>
            <p className="mt-4 sm:mt-6 text-sm sm:text-lg leading-6 sm:leading-8 max-w-2xl mx-auto px-2">
              Transform your ideas into powerful digital solutions. Let&apos;s discuss your project
              and see how we can help you scale and succeed.
            </p>
            <div className="mt-6 sm:mt-10">
              <a
                href="#"
                className="inline-flex items-center justify-center rounded-full bg-white px-6 sm:px-8 py-2.5 sm:py-3 text-sm sm:text-base font-semibold text-gray-900 shadow-sm transition-transform hover:scale-105"
              >
                Lets Talk
                <span className="ml-2" aria-hidden="true">&gt;</span>
              </a>
            </div>
          </div>
        </div>

        {/* Main Footer Section */}
        <div className="mt-12 sm:mt-20 grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8 lg:gap-12">
          {/* Column 1: Brand */}
          <div className="col-span-2 md:col-span-2 lg:col-span-1">
            <a href="#" className="flex items-center gap-2">
              <Image 
                src="/images/logo/blue.png" 
                alt="Codevider" 
                width={200} 
                height={84}
              />
            </a>
            <p className="mt-3 sm:mt-4 text-gray-600 text-sm sm:text-base leading-relaxed">
              Your trusted partner for innovative software development solutions. 
              We build scalable web and mobile applications that drive business growth.
            </p>
            <div className="mt-4 sm:mt-6 flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-gray-600"><span className="sr-only">Facebook</span><FaFacebookF className="h-6 w-6" /></a>
              <a href="#" className="text-gray-400 hover:text-gray-600"><span className="sr-only">LinkedIn</span><FaLinkedinIn className="h-6 w-6" /></a>
              <a href="#" className="text-gray-400 hover:text-gray-600"><span className="sr-only">Instagram</span><FaInstagram className="h-6 w-6" /></a>
              <a href="#" className="text-gray-400 hover:text-gray-600"><span className="sr-only">Contact</span><FiSend className="h-6 w-6" /></a>
            </div>
          </div>

          {/* Column 2: Company */}
          <div>
            <h3 className="text-sm sm:text-base font-semibold text-gray-900">Company</h3>
            <ul className="mt-3 sm:mt-4 space-y-2 sm:space-y-3">
              <FooterLink href="/">Home</FooterLink>
              <FooterLink href="/team">About Us</FooterLink>
              <FooterLink href="/team">Our Team</FooterLink>
              <FooterLink href="/team">Culture</FooterLink>
              <FooterLink href="#contact">Contact</FooterLink>
            </ul>
          </div>

          {/* Column 3: Services */}
          <div>
            <h3 className="text-sm sm:text-base font-semibold text-gray-900">Services</h3>
            <ul className="mt-3 sm:mt-4 space-y-2 sm:space-y-3">
              <FooterLink href="#services">Product Engineering</FooterLink>
              <FooterLink href="#services">Pod Teams</FooterLink>
              <FooterLink href="#services">Cloud & DevOps</FooterLink>
              <FooterLink href="#services">UI/UX Design</FooterLink>
              <FooterLink href="/projects">Case Studies</FooterLink>
            </ul>
          </div>

          {/* Column 4: Address */}
          <div className="col-span-2 sm:col-span-1">
            <h3 className="text-sm sm:text-base font-semibold text-gray-900">Address</h3>
            <div className="mt-3 sm:mt-4 space-y-2 sm:space-y-3 text-gray-600">
              <p className="text-xs sm:text-sm leading-5 sm:leading-6">Barrikada Street, Tirana, Albania</p>
              <p className="text-xs sm:text-sm leading-5 sm:leading-6">+355 69 123 4567</p>
              <p className="text-xs sm:text-sm leading-5 sm:leading-6">hello@codevider.com</p>
              <p className="text-xs sm:text-sm leading-5 sm:leading-6">Mon-Fri: 9:00 AM - 6:00 PM CET</p>
            </div>
          </div>
        </div>

        {/* Sub-Footer */}
        <div className="mt-12 sm:mt-20 border-t border-gray-900/10 pt-6 sm:pt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs sm:text-sm text-gray-500 text-center sm:text-left">© 2025 Codevider. All rights reserved.</p>
          <div className="flex flex-wrap items-center justify-center gap-x-4 sm:gap-x-6 gap-y-2">
            <a href="#" className="text-xs sm:text-sm text-gray-500 hover:text-gray-800">Privacy Policy</a>
            <a href="#" className="text-xs sm:text-sm text-gray-500 hover:text-gray-800">Terms of Service</a>
            <a href="#" className="text-xs sm:text-sm text-gray-500 hover:text-gray-800">Security</a>
            <a href="#" className="text-xs sm:text-sm text-gray-500 hover:text-gray-800">Cookie</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default AnimatedFooter;