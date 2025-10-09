"use client"
import { ArrowUpRight, X } from "lucide-react"
import { useState, useEffect, useCallback, useMemo } from "react"
import Image from "next/image"
import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"
import type { Route } from "next"

type NavLink = { name: string; href: Route };

export const navLinks = [
  { name: "Home", href: "/" },
  { name: "Services", href: "/services" },
  { name: "Career", href: "/career" },

  { name: "About", href: "/about" },
  // { name: "Projects", href: "/projects" },
] as const satisfies readonly NavLink[];

const Header = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const pathname = usePathname()
  const router = useRouter()
  const isHomePage = pathname === "/"
  const [isSolid, setIsSolid] = useState(!isHomePage)

  const toggleMobileMenu = useCallback(() => setIsMobileMenuOpen(v => !v), [])
  const closeMobileMenu = useCallback(() => setIsMobileMenuOpen(false), [])

  // Preload routes on hover for faster navigation
  const handleLinkHover = useCallback((href: Route) => {
    if (href !== pathname) {
      router.prefetch(href)
    }
  }, [router, pathname])

  // Lock page scroll when mobile menu is open
  useEffect(() => {
    const root = document.documentElement
    root.style.overflow = isMobileMenuOpen ? "hidden" : ""
    return () => { root.style.overflow = "" }
  }, [isMobileMenuOpen])

  // Debounced scroll handler for better performance
  const handleScroll = useCallback(() => {
    const heroSection = document.getElementById("hero")
    if (heroSection) {
      const heroBottom = heroSection.offsetTop + heroSection.offsetHeight
      setIsSolid(window.scrollY > heroBottom - 80)
    } else {
      setIsSolid(window.scrollY > window.innerHeight)
    }
  }, [])

  useEffect(() => {
    if (!isHomePage) {
      setIsSolid(true)
      return
    }

    let ticking = false
    const debouncedHandleScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          handleScroll()
          ticking = false
        })
        ticking = true
      }
    }

    handleScroll()
    window.addEventListener("scroll", debouncedHandleScroll, { passive: true })
    window.addEventListener("resize", debouncedHandleScroll, { passive: true })
    return () => {
      window.removeEventListener("scroll", debouncedHandleScroll)
      window.removeEventListener("resize", debouncedHandleScroll)
    }
  }, [isHomePage, handleScroll])

  // Memoize year to avoid recalculation on every render
  const year = useMemo(() => new Date().getFullYear(), [])

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 p-4 transition-all duration-300 ${
          isSolid
            ? "bg-white/95 border-b border-gray-200 backdrop-blur-sm"
            : "bg-transparent border-transparent"
        }`}
      >
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          {/* Logo */}
          <Link href="/">
            <Image
              src={isSolid ? "/images/logo/blue.png" : "/images/logo/whitblue.svg"}
              alt="logo"
              width={140}
              height={82}
              priority
            />
          </Link>

          {/* Desktop Nav */}
          <nav
            className={`hidden md:block backdrop-blur-md rounded-full relative overflow-hidden ${
              isSolid ? "bg-black/10" : "bg-white/10"
            }`}
          >
            <ul className="flex items-center relative z-10">
              {navLinks.map((link, index) => (
                <li key={link.name} className="relative group">
                  <Link
                    href={link.href}
                    className={`px-5 py-3 text-sm font-medium transition-colors duration-300 inline-block relative z-10 ${
                      isSolid ? "text-gray-700 hover:text-white" : "text-white hover:text-gray-900"
                    }`}
                    onMouseEnter={() => handleLinkHover(link.href)}
                    prefetch={true}
                  >
                    {link.name}
                  </Link>
                  <div
                    className={`absolute inset-0 rounded-full scale-0 group-hover:scale-100 transition-all duration-300 ease-out origin-center -z-10 ${
                      isSolid ? "bg-black" : "bg-white"
                    }`}
                  />
                  {index < navLinks.length - 1 && (
                    <span
                      className={`relative z-10 px-1 ${
                        isSolid ? "text-gray-400" : "text-white/60"
                      }`}
                    >
                      |
                    </span>
                  )}
                </li>
              ))}
            </ul>
          </nav>

          {/* Desktop Book a Call */}
          <Link
            href="https://calendly.com/codevider/pasho"
            className={`hidden md:flex backdrop-blur-md px-6 py-3 rounded-full items-center gap-2 text-sm font-semibold transition-all duration-300 ${
              isSolid ? "bg-black text-white hover:bg-gray-800" : "bg-white text-black hover:bg-gray-100"
            }`}
          >
            BOOK A CALL
            <div className={`rounded-full p-1 ${isSolid ? "bg-white text-black" : "bg-black text-white"}`}>
              <ArrowUpRight size={14} />
            </div>
          </Link>

          {/* Mobile Hamburger (animated burger → X using lines) */}
          <button
            onClick={toggleMobileMenu}
            className={`md:hidden backdrop-blur-md p-2 rounded-full transition-all duration-300 ${
              isSolid ? "bg-transparent text-black hover:bg-black/20" : "bg-transparent text-white hover:bg-white/20"
            }`}
            aria-label="Toggle mobile menu"
            aria-expanded={isMobileMenuOpen}
          >
            <span className="relative block w-4 h-4">
              {/* top line */}
              <span
                className={`absolute left-0 top-0 h-[1px] w-4 bg-current transition-all duration-300 ease-in-out ${
                  isMobileMenuOpen ? "translate-y-[6px] rotate-45" : "translate-y-0 rotate-0"
                }`}
              />
              {/* middle line */}
              <span
                className={`absolute left-0 top-1/2 h-[1px] w-4 bg-current transition-all duration-300 ease-in-out -translate-y-1/2 ${
                  isMobileMenuOpen ? "opacity-0" : "opacity-100"
                }`}
              />
              {/* bottom line */}
              <span
                className={`absolute left-0 bottom-0 h-[1px] w-4 bg-current transition-all duration-300 ease-in-out ${
                  isMobileMenuOpen ? "-translate-y-[6px] -rotate-45" : "translate-y-0 rotate-0"
                }`}
              />
            </span>
          </button>
        </div>

        {/* Mobile Menu Overlay (FULL PAGE) */}
        <div
          className={`fixed inset-0 md:hidden z-[60] bg-black/95 backdrop-blur-lg transition-all duration-700 ease-in-out ${
            isMobileMenuOpen ? "opacity-100 visible translate-y-0" : "opacity-0 invisible -translate-y-full"
          }`}
          style={{ height: "100dvh" }}
          onClick={(e) => {
            if (e.currentTarget === e.target) closeMobileMenu()
          }}
        >
          {/* Close button INSIDE overlay (always visible) */}
          <button
            onClick={(e) => {
              e.stopPropagation()
              closeMobileMenu()
            }}
            className="absolute top-4 right-4 p-3 rounded-full bg-white/10 text-white hover:bg-white/20 transition z-10"
            aria-label="Close menu"
          >
            <X size={20} />
          </button>

          {/* Content */}
          <div
            className={`flex flex-col items-center justify-center h-full space-y-8 px-6 transition-all duration-500 ease-out ${
              isMobileMenuOpen ? "translate-y-0 opacity-100" : "translate-y-12 opacity-0"
            }`}
          >
            <nav className="flex flex-col items-center space-y-6">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  className="text-2xl font-medium text-white hover:text-gray-300"
                  onClick={closeMobileMenu}
                  onMouseEnter={() => handleLinkHover(link.href)}
                  prefetch={true}
                >
                  {link.name}
                </Link>
              ))}
            </nav>
            <Link
              href="/#contact"
              className="bg-white text-black px-8 py-4 rounded-full flex items-center gap-3 text-lg font-semibold hover:bg-gray-100 mt-8"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              BOOK A CALL
              <div className="bg-black text-white rounded-full p-2">
                <ArrowUpRight size={18} />
              </div>
            </Link>
          </div>

          {/* Bottom divider + rights reserved (mobile only) */}
          <div className="absolute bottom-0 left-0 right-0">
            <div className="h-px w-full bg-white/15" />
            <p className="text-center text-xs text-white/60 py-4">
              © {year} Codevider — All rights reserved.
            </p>
          </div>
        </div>
      </header>
    </>
  )
}

export default Header
