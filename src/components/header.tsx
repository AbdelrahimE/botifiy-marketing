"use client"

import { useState, useEffect } from "react"
import { Menu, X } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { trackActivationClick } from "@/lib/gtm"

const navigationItems = [
  { label: "كيف يعمل", href: "/#customer-journey" },
  { label: "المجالات", href: "/#use-cases" },
  { label: "الأسعار", href: "/#pricing" },
  { label: "الأسئلة الشائعة", href: "/#faq" },
]

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20)
    }

    const handleResize = () => {
      if (window.innerWidth >= 768) { // Tailwind's 'md' breakpoint
        setIsMenuOpen(false)
      }
    }

    window.addEventListener('scroll', handleScroll)
    window.addEventListener('resize', handleResize)

    // Run on mount to handle initial window size
    handleResize()

    return () => {
      window.removeEventListener('scroll', handleScroll)
      window.removeEventListener('resize', handleResize)
    }
  }, [])

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 header-transition ${(isScrolled || isMenuOpen)
        ? 'bg-white/90 backdrop-blur-lg shadow-lg border-b border-green-200/20'
        : 'bg-transparent'
        }`}
    >
      <div className="max-w-container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          {/* Logo on the right (first in RTL) */}
          <div className="flex items-center order-1">
            <Link
              href="/"
              className="flex items-center justify-center transition-transform duration-300"
            >
              <Image
                src="/images/botifiy-logo-ar.png"
                alt="شعار بوتيفاي"
                width={150}
                height={50}
                className="h-9 w-auto md:h-12 md:w-auto object-contain"
                priority
              />
            </Link>
          </div>

          {/* Desktop Navigation - from right to left in RTL */}
          <nav className="hidden md:flex items-center gap-5 lg:gap-8 header-nav order-2" aria-label="التنقل الرئيسي">
            {navigationItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="whitespace-nowrap text-[#0B3404] hover:text-[#63dd32] transition-colors duration-200 font-medium"
              >
                {item.label}
              </Link>
            ))}
          </nav>

          {/* CTA Button & Mobile Menu Button - on the left (last in RTL) */}
          <div className="flex items-center gap-4 order-last">
            <a
              href="/activate?source=header"
              className="bg-[#63dd32] hover:bg-[#4BC625] text-[#0B3404] px-4 py-2 text-md font-bold border-2 border-[#4BC625] rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center transform hover:scale-105 hover:-translate-y-0.5 relative overflow-hidden group"
            >
              <span className="relative z-10">اطلب تفعيل بوتيفاي</span>
              <div className="absolute inset-0 bg-gradient-to-r from-[#63dd32] to-[#4BC625] opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </a>

            {/* Mobile Menu Toggle */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden p-2 text-gray-700 hover:text-[#63dd32] transition-colors duration-200"
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden mt-4 pb-4 border-t border-gray-200">
            <nav className="flex flex-col gap-4 pt-4">
              {navigationItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="text-gray-700 hover:text-[#63dd32] transition-colors duration-200 font-medium text-right"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item.label}
                </Link>
              ))}

              {/* Mobile CTA Button */}
              <div className="mt-4 pt-4 border-t border-gray-200">
                <a
                  href="/activate?source=header-mobile"
                  className="block w-full bg-[#63dd32] hover:bg-[#4BC625] text-[#0B3404] px-4 py-2 text-lg font-bold border-2 border-[#4BC625] rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 text-center relative overflow-hidden group"
                  onClick={() => {
                    trackActivationClick()
                    setIsMenuOpen(false)
                  }}
                >
                  <span className="relative z-10">اطلب تفعيل بوتيفاي</span>
                  <div className="absolute inset-0 bg-gradient-to-r from-[#63dd32] to-[#4BC625] opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </a>
              </div>
            </nav>
          </div>
        )}
      </div>
    </header>
  )
} 
