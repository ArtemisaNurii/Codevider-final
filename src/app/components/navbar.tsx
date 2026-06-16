"use client"

import { ArrowUpRight, X } from "lucide-react"
import { useCallback, useEffect, useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"
import type { Route } from "next"

type NavigationItem = {
  name: string
  href: Route
}

const NAVIGATION_ITEMS = [
  { name: "Home", href: "/" },
  { name: "Services", href: "/services" },
  { name: "Career", href: "/career" },
  { name: "About", href: "/about" },
] as const satisfies readonly NavigationItem[]

const BOOK_CALL_URL = "https://calendly.com/codevider/pasho"

const SiteNavbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const pathname = usePathname()
  const router = useRouter()
  const isHomePage = pathname === "/"
  const [hasSolidBackground, setHasSolidBackground] = useState(!isHomePage)

  const toggleMobileMenu = useCallback(() => setIsMobileMenuOpen(v => !v), [])
  const closeMobileMenu = useCallback(() => setIsMobileMenuOpen(false), [])

  const handleLinkHover = useCallback((href: Route) => {
    if (href !== pathname) {
      router.prefetch(href)
    }
  }, [router, pathname])

  useEffect(() => {
    const root = document.documentElement
    root.style.overflow = isMobileMenuOpen ? "hidden" : ""
    return () => { root.style.overflow = "" }
  }, [isMobileMenuOpen])

  const handleScroll = useCallback(() => {
    const heroSection = document.getElementById("hero")
    if (heroSection) {
      const heroBottom = heroSection.offsetTop + heroSection.offsetHeight
      setHasSolidBackground(window.scrollY > heroBottom - 80)
    } else {
      setHasSolidBackground(window.scrollY > window.innerHeight)
    }
  }, [])

  useEffect(() => {
    if (!isHomePage) {
      setHasSolidBackground(true)
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

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 p-4 transition-all duration-300 ${
          hasSolidBackground
            ? "bg-white/95 backdrop-blur-sm"
            : "bg-transparent"
        }`}
      >
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <Link href="/">
            <Image
              src={hasSolidBackground ? "/images/logo/blue.png" : "/images/logo/whitblue.svg"}
              alt="logo"
              width={140}
              height={82}
              priority
            />
          </Link>
          <nav
            className={`hidden md:block backdrop-blur-md rounded-full relative overflow-hidden ${
              hasSolidBackground ? "bg-black/10" : "bg-white/10"
            }`}
          >
            <ul className="flex items-center relative z-10">
              {NAVIGATION_ITEMS.map((link) => (
                <li key={link.name} className="relative group">
                  <Link
                    href={link.href}
                    className={`px-5 py-3 text-sm font-medium transition-colors duration-300 inline-block relative z-10 ${
                      hasSolidBackground ? "text-gray-700 hover:text-white" : "text-white hover:text-gray-900"
                    }`}
                    onMouseEnter={() => handleLinkHover(link.href)}
                    prefetch={true}
                  >
                    {link.name}
                  </Link>
                  <div
                    className={`absolute inset-0 rounded-full scale-0 group-hover:scale-100 transition-all duration-300 ease-out origin-center -z-10 ${
                      hasSolidBackground ? "bg-black" : "bg-white"
                    }`}
                  />
                </li>
              ))}
            </ul>
          </nav>
          <Link
            href={BOOK_CALL_URL}
            target="_blank"
            rel="noopener noreferrer"
            className={`hidden md:flex backdrop-blur-md px-4 py-3 rounded-full items-center gap-2 text-sm font-semibold transition-all duration-300 ${
              hasSolidBackground ? "bg-black text-white hover:bg-gray-800" : "bg-white text-black hover:bg-gray-100"
            }`}
          >
            BOOK A CALL
            <div className={`rounded-full p-1 ${hasSolidBackground ? "bg-white text-black" : "bg-black text-white"}`}>
              <ArrowUpRight size={14} />
            </div>
          </Link>

          <button
            onClick={toggleMobileMenu}
            className={`md:hidden backdrop-blur-md p-2 rounded-full transition-all duration-300 ${
              hasSolidBackground ? "bg-transparent text-black hover:bg-black/20" : "bg-transparent text-white hover:bg-white/20"
            }`}
            aria-label="Toggle mobile menu"
            aria-expanded={isMobileMenuOpen}
          >
            <span className="relative block w-4 h-4">
              <span
                className={`absolute left-0 top-0 h-[1px] w-4 bg-current transition-all duration-300 ease-in-out ${
                  isMobileMenuOpen ? "translate-y-[6px] rotate-45" : "translate-y-0 rotate-0"
                }`}
              />
              <span
                className={`absolute left-0 top-1/2 h-[1px] w-4 bg-current transition-all duration-300 ease-in-out -translate-y-1/2 ${
                  isMobileMenuOpen ? "opacity-0" : "opacity-100"
                }`}
              />
              <span
                className={`absolute left-0 bottom-0 h-[1px] w-4 bg-current transition-all duration-300 ease-in-out ${
                  isMobileMenuOpen ? "-translate-y-[6px] -rotate-45" : "translate-y-0 rotate-0"
                }`}
              />
            </span>
          </button>
        </div>

        <div
          className={`fixed inset-0 md:hidden z-[60] bg-black/95 backdrop-blur-lg transition-all duration-700 ease-in-out ${
            isMobileMenuOpen ? "opacity-100 visible translate-y-0" : "opacity-0 invisible -translate-y-full"
          }`}
          style={{ height: "100dvh" }}
          onClick={(e) => {
            if (e.currentTarget === e.target) closeMobileMenu()
          }}
        >
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

          <div
            className={`flex flex-col items-center justify-center h-full space-y-8 px-6 transition-all duration-500 ease-out ${
              isMobileMenuOpen ? "translate-y-0 opacity-100" : "translate-y-12 opacity-0"
            }`}
          >
            <nav className="flex flex-col items-center space-y-6">
              {NAVIGATION_ITEMS.map((link) => (
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
              href={BOOK_CALL_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-white text-black px-8 py-4 rounded-full flex items-center gap-3 text-lg font-semibold hover:bg-gray-100 mt-8"
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

export default SiteNavbar
