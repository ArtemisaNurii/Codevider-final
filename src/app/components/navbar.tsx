"use client"
import { ArrowUpRight, Menu, X } from "lucide-react"
import { useState, useEffect } from "react"
import Image from "next/image"
import Link from "next/link"
import { usePathname } from 'next/navigation'

const navLinks = [
  { name: "Home", href: "/" },
  { name: "About", href: "/about" },
  { name: "Service", href: "/#services" },
  { name: "Projects", href: "/projects" },
  { name: "Career", href: "/career" },
  { name: "Contact Us", href: "/#contact" }
]

const Header = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  
  const pathname = usePathname();
  const isHomePage = pathname === '/';

  // The state for the solid (white background) header.
  // Initialized to `true` (solid) if it's NOT the homepage.
  const [isSolid, setIsSolid] = useState(!isHomePage);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen)
  }

  useEffect(() => {
    // If we are on any page other than the homepage, the header is always solid.
    // The effect stops here for non-homepage routes.
    if (!isHomePage) {
      setIsSolid(true);
      return;
    }

    // --- YOUR ORIGINAL, CORRECT LOGIC IS RESTORED HERE ---
    // This logic now runs ONLY on the homepage.
    const handleScroll = () => {
      const heroSection = document.getElementById('hero');
      
      // If the hero section exists, calculate its bottom position.
      if (heroSection) {
        const heroBottom = heroSection.offsetTop + heroSection.offsetHeight;
        
        // The header becomes solid only when the scroll position is past the bottom of the hero section.
        // The 80px buffer means it changes just before the hero section completely leaves the screen.
        setIsSolid(window.scrollY > heroBottom - 80);
      } else {
        // A fallback in case the hero section isn't found on the homepage for some reason.
        setIsSolid(window.scrollY > window.innerHeight);
      }
    };

    // Run the check when the component mounts and on every scroll or resize event.
    handleScroll();
    window.addEventListener('scroll', handleScroll);
    window.addEventListener('resize', handleScroll);
    
    // Cleanup listeners when the component unmounts or the page changes.
    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleScroll);
    }
  }, [isHomePage]); // The effect re-runs if the user navigates to or from the homepage.

  return (
    <>
      <header className={`fixed top-0 left-0 right-0 z-50 p-4 transition-all duration-300 ${
        isSolid 
          ? 'bg-white/95 border-b border-gray-200 backdrop-blur-sm' // SOLID STATE
          : 'bg-transparent' // TRANSPARENT STATE
      }`}>
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          {/* Logo */}
          <Link href="/">
            <Image 
              src={isSolid ? "/images/logo/black.png" : "/images/logo/white.png"} 
              alt="logo" 
              width={140} 
              height={82} 
            />
          </Link>

          {/* Desktop Navigation Links */}
          <nav className={`hidden md:block backdrop-blur-md rounded-full relative overflow-hidden ${
            isSolid ? 'bg-black/10' : 'bg-white/10'
          }`}>
            <ul className="flex items-center relative z-10">
              {navLinks.map((link, index) => (
                <li key={link.name} className="relative group">
                  <Link
                    href={link.href}
                    className={`px-5 py-3 text-sm font-medium transition-colors duration-300 inline-block relative z-10 ${
                      isSolid 
                        ? 'text-gray-700 hover:text-white' 
                        : 'text-white hover:text-gray-900'
                    }`}
                  >
                    {link.name}
                  </Link>
                  <div className={`absolute inset-0 rounded-full scale-0 group-hover:scale-100 transition-all duration-300 ease-out origin-center -z-10 ${
                    isSolid ? 'bg-black' : 'bg-white'
                  }`}></div>
                  {index < navLinks.length - 1 && (
                    <span className={`relative z-10 px-1 ${
                      isSolid ? 'text-gray-400' : 'text-white/60'
                    }`}>|</span>
                  )}
                </li>
              ))}
            </ul>
          </nav>

          {/* Desktop Book a Call Button */}
          <Link
            href="/#contact"
            className={`hidden md:flex backdrop-blur-md px-6 py-3 rounded-full items-center gap-2 text-sm font-semibold transition-all duration-300 ${
              isSolid 
                ? 'bg-black text-white hover:bg-gray-800' 
                : 'bg-white text-black hover:bg-gray-100'
            }`}
          >
            BOOK A CALL
            <div className={`rounded-full p-1 ${
              isSolid ? 'bg-white text-black' : 'bg-black text-white'
            }`}>
              <ArrowUpRight size={14} />
            </div>
          </Link>

          {/* Mobile Hamburger Button */}
          <button
            onClick={toggleMobileMenu}
            className={`md:hidden backdrop-blur-md p-3 rounded-full transition-all duration-300 ${
              isSolid 
                ? 'bg-black/10 text-black hover:bg-black/20' 
                : 'bg-white/10 text-white hover:bg-white/20'
            }`}
            aria-label="Toggle mobile menu"
          >
            <div
              className={`transition-all duration-500 ease-in-out ${isMobileMenuOpen ? "rotate-90 scale-110" : "rotate-0 scale-100"}`}
            >
              {isMobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
            </div>
          </button>
        </div>

        {/* Mobile Menu Overlay */}
        <div
          className={`fixed inset-0 bg-black/95 backdrop-blur-lg md:hidden z-40 transition-all duration-700 ease-in-out ${
            isMobileMenuOpen ? "opacity-100 visible" : "opacity-0 invisible"
          }`}
          style={{
            transform: isMobileMenuOpen ? "translateY(0)" : "translateY(-100%)",
          }}
        >
          <div
            className={`flex flex-col items-center justify-center h-full space-y-8 px-6 transition-all duration-500 ease-out ${
              isMobileMenuOpen ? "translate-y-0 opacity-100" : "translate-y-12 opacity-0"
            }`}
          >
            <nav className="flex flex-col items-center space-y-6">
              {navLinks.map((link, index) => (
                <Link
                  key={link.name}
                  href={link.href}
                  className={`text-2xl font-medium text-white hover:text-gray-300`}
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {link.name}
                </Link>
              ))}
            </nav>
            <Link
              href="/#contact"
              className={`bg-white text-black px-8 py-4 rounded-full flex items-center gap-3 text-lg font-semibold hover:bg-gray-100 mt-8`}
              onClick={() => setIsMobileMenuOpen(false)}
            >
              BOOK A CALL
              <div className="bg-black text-white rounded-full p-2">
                <ArrowUpRight size={18} />
              </div>
            </Link>
          </div>
        </div>
      </header>
    </>
  )
}

export default Header