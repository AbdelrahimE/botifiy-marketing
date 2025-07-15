"use client"

import { useState, useEffect } from "react"
import { usePathname, useRouter } from "next/navigation"
import { Menu, X } from "lucide-react"
import Image from "next/image"
import { trackClickSignup } from "@/lib/gtm"

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const pathname = usePathname()
  const router = useRouter()

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

  const handleSmoothScroll = (targetId: string) => {
    setIsMenuOpen(false)
    if (pathname === "/") {
      const element = document.getElementById(targetId)
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' })
      }
    } else {
      router.push(`/#${targetId}`)
    }
  }

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 header-transition ${
        (isScrolled || isMenuOpen)
          ? 'bg-white/90 backdrop-blur-lg shadow-lg border-b border-green-200/20'
          : 'bg-transparent'
      }`}
    >
      <div className="max-w-container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          {/* Logo on the right (first in RTL) */}
          <div className="flex items-center order-1">
            <a
              href="/"
              className="flex items-center justify-center transition-transform duration-300 hover:scale-105"
            >
              <Image
                src="/images/botifiy-logo-ar.png"
                alt="شعار بوتيفاي"
                width={150}
                height={48}
                className="h-10 w-auto md:h-12 md:w-auto"
              />
            </a>
          </div>

          {/* Desktop Navigation - from right to left in RTL */}
          <nav className="hidden md:flex items-center gap-8 header-nav order-2">
            <a
              href="/#features"
              onClick={(e) => {
                e.preventDefault()
                handleSmoothScroll('features')
              }}
              className="text-[#0B3404] hover:text-[#60DE2E] transition-colors duration-200 font-medium cursor-pointer"
            >
              المميزات
            </a>
            <a
              href="/#how-it-works"
              onClick={(e) => {
                e.preventDefault()
                handleSmoothScroll('how-it-works')
              }}
              className="text-[#0B3404] hover:text-[#60DE2E] transition-colors duration-200 font-medium cursor-pointer"
            >
              كيف تشتغل؟
            </a>
            <a
              href="/pricing"
              className="text-[#0B3404] hover:text-[#60DE2E] transition-colors duration-200 font-medium"
            >
              الخطط والأسعار
            </a>
            <a
              href="https://app.botifiy.com/auth"
              className="text-[#0B3404] hover:text-[#60DE2E] transition-colors duration-200 font-medium"
              onClick={() => trackClickSignup('login-desktop')}
            >
              تسجيل الدخول
            </a>
          </nav>

          {/* CTA Button & Mobile Menu Button - on the left (last in RTL) */}
          <div className="flex items-center gap-4 order-last">
            <a
              href="https://app.botifiy.com/auth"
              className="bg-[#60DE2E] hover:bg-[#4BC625] text-[#0B3404] px-6 py-2 text-lg font-bold border-2 border-[#4BC625] rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center transform hover:scale-105 hover:-translate-y-0.5 relative overflow-hidden group"
              onClick={() => trackClickSignup('free-trial-header-desktop')}
            >
              <span className="relative z-10">ابدأ مجانًا</span>
              <div className="absolute inset-0 bg-gradient-to-r from-[#60DE2E] to-[#4BC625] opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </a>

            {/* Mobile Menu Toggle */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden p-2 text-gray-700 hover:text-[#60DE2E] transition-colors duration-200"
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden mt-4 pb-4 border-t border-gray-200">
            <nav className="flex flex-col gap-4 pt-4">
              <a
                href="/#features"
                onClick={(e) => {
                  e.preventDefault()
                  handleSmoothScroll('features')
                }}
                className="text-gray-700 hover:text-[#60DE2E] transition-colors duration-200 font-medium text-right cursor-pointer"
              >
                المميزات
              </a>
              <a
                href="/#how-it-works"
                onClick={(e) => {
                  e.preventDefault()
                  handleSmoothScroll('how-it-works')
                }}
                className="text-gray-700 hover:text-[#60DE2E] transition-colors duration-200 font-medium text-right cursor-pointer"
              >
                كيف تشتغل؟
              </a>
              <a
                href="/pricing"
                className="text-gray-700 hover:text-[#60DE2E] transition-colors duration-200 font-medium text-right"
              >
                الخطط والأسعار
              </a>
              <a
                href="https://app.botifiy.com/auth"
                className="text-gray-700 hover:text-[#60DE2E] transition-colors duration-200 font-medium text-right"
                onClick={() => trackClickSignup('login-mobile')}
              >
                تسجيل الدخول
              </a>
              
              {/* Mobile CTA Button */}
              <div className="mt-4 pt-4 border-t border-gray-200">
                <a
                  href="https://app.botifiy.com/auth"
                  className="block w-full bg-[#60DE2E] hover:bg-[#4BC625] text-[#0B3404] px-6 py-2 text-lg font-bold border-2 border-[#4BC625] rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 text-center relative overflow-hidden group"
                  onClick={() => setIsMenuOpen(false)}
                >
                  <span className="relative z-10">ابدأ مجانًا</span>
                  <div className="absolute inset-0 bg-gradient-to-r from-[#60DE2E] to-[#4BC625] opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </a>
              </div>
            </nav>
          </div>
        )}
      </div>
    </header>
  )
} 