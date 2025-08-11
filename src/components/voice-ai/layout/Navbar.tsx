'use client'

import { useState, useEffect } from 'react'
import { FiMenu, FiGlobe, FiX } from 'react-icons/fi'
import { useLanguage } from '@/lib/i18n/language-context'
import { translations } from '@/lib/i18n/translations'
import { motion, AnimatePresence } from 'framer-motion'
import Image from 'next/image'
import { useRouter } from 'next/navigation'

interface NavbarProps {
  currentLang?: 'nl' | 'en';
}

export default function Navbar({ currentLang }: NavbarProps) {
  const [isClient, setIsClient] = useState(false)
  const [activeSection, setActiveSection] = useState('')
  const [isDarkSection, setIsDarkSection] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  // Use the prop if provided, otherwise fall back to context (for backward compatibility)
  const { language: contextLanguage } = useLanguage()
  const language = currentLang || contextLanguage
  const t = translations[language].voiceAI
  const router = useRouter()
  
  const handleLanguageSwitch = () => {
    // Get current path to determine which page we're on
    const currentPath = window.location.pathname
    
    // Direct navigation without using switchLanguage to avoid /en prefix
    if (currentPath.includes('spraakassistent')) {
      // Going from Dutch to English
      window.location.href = '/voiceassistant'
    } else if (currentPath.includes('voiceassistant')) {
      // Going from English to Dutch
      window.location.href = '/spraakassistent'
    } else {
      // Fallback: switch based on current language context
      const newPath = language === 'nl' ? '/voiceassistant' : '/spraakassistent'
      window.location.href = newPath
    }
  }

  const navItems = [
    { name: t.navbar.howItWorks, section: 'solution' },
    { name: t.navbar.testimonials, section: 'social-proof' },
    { name: t.navbar.benefits, section: 'benefits' },
  ]

  useEffect(() => {
    setIsClient(true)

    const handleScroll = () => {
      const sections = ['hero', 'problem', 'solution', 'social-proof', 'benefits', 'cta']
      const currentSection = sections.find(section => {
        const element = document.querySelector(`[data-section="${section}"]`)
        if (element) {
          const rect = element.getBoundingClientRect()
          return rect.top <= 100 && rect.bottom >= 100
        }
        return false
      })
      
      if (currentSection) {
        setActiveSection(currentSection)
        // Check if we're on dark sections
        const darkSections = ['cta']
        
        // Check if we're specifically over the dark parts of these sections
        if (currentSection === 'social-proof') {
          // Check if we're over the testimonial card
          const testimonialCard = document.getElementById('testimonial-dark')
          if (testimonialCard) {
            const rect = testimonialCard.getBoundingClientRect()
            setIsDarkSection(rect.top <= 100 && rect.bottom >= 100)
          } else {
            setIsDarkSection(false)
          }
        } else if (currentSection === 'problem') {
          // Check if we're over the dark visual impact section
          const darkSection = document.getElementById('problem-dark')
          if (darkSection) {
            const rect = darkSection.getBoundingClientRect()
            setIsDarkSection(rect.top <= 100 && rect.bottom >= 100)
          } else {
            setIsDarkSection(false)
          }
        } else {
          setIsDarkSection(darkSections.includes(currentSection))
        }
      }
    }

    window.addEventListener('scroll', handleScroll)
    handleScroll() // Check initial position

    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [])

  const scrollToCTA = () => {
    const element = document.querySelector('[data-section="cta"]')
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }
  }

  const scrollToSection = (sectionId: string) => {
    const element = document.querySelector(`[data-section="${sectionId}"]`)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }
  }

  const scrollToHero = () => {
    const element = document.querySelector('[data-section="hero"]')
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }
  }

  if (!isClient) return null

  return (
    <div className="fixed top-6 left-1/2 transform -translate-x-1/2 z-50 w-full max-w-[826px] px-4">
      <div className={`flex w-full flex-row items-center justify-between gap-3 md:gap-5 rounded-full px-3 md:px-4 py-2.5 md:py-3 backdrop-blur-lg transition-all duration-300 ${
        isDarkSection 
          ? 'border border-white/30 bg-white/10' 
          : 'border border-gray-400/50 bg-gray-200/30'
      }`}>
        {/* Logo */}
        <button 
          onClick={scrollToHero}
          className="ml-2.5 md:ml-4 flex items-center gap-3 outline-none focus:outline-none cursor-pointer group"
        >
          <Image 
            src="/images/logo.png" 
            alt={`${t.company.name} Logo`}
            width={32}
            height={32}
            className="h-6 w-auto md:h-8 transition-transform duration-200 group-hover:scale-105"
            priority
          />
          <span className={`font-semibold text-base md:text-lg transition-colors duration-300 ${
            isDarkSection ? 'text-white' : 'text-gray-900'
          }`}>
            {t.company.name}
          </span>
        </button>

        {/* Desktop Navigation */}
        <div className="hidden md:flex w-fit items-center justify-center gap-16">
          {navItems.map((item) => (
            <button
              key={item.name}
              onClick={() => scrollToSection(item.section)}
              className={`text-base leading-tight tracking-normal font-medium transition-all duration-300 ease-out relative group outline-none focus:outline-none ${
                isDarkSection
                  ? activeSection === item.section
                    ? 'text-white'
                    : 'text-white/70'
                  : activeSection === item.section
                    ? 'text-gray-900'
                    : 'text-gray-600'
              }`}
            >
              {item.name}
              {/* Premium underline effect */}
              <span className={`absolute -bottom-1 left-0 h-0.5 transition-all duration-300 ease-out ${
                activeSection === item.section
                  ? isDarkSection ? 'w-full bg-white' : 'w-full bg-gray-900'
                  : isDarkSection ? 'w-0 bg-white group-hover:w-full' : 'w-0 bg-gray-900 group-hover:w-full'
              }`} />
              {/* Premium text color change */}
              <span className={`absolute inset-0 flex items-center justify-center opacity-0 transition-opacity duration-300 group-hover:opacity-100 ${
                isDarkSection ? 'text-white' : 'text-gray-900'
              }`}>
                {item.name}
              </span>
            </button>
          ))}
        </div>

        {/* Language Switcher */}
        <div className="hidden md:flex items-center gap-2">
          <FiGlobe className={`text-lg ${isDarkSection ? 'text-white/70' : 'text-gray-600'}`} />
          <button
            onClick={handleLanguageSwitch}
            className={`px-3 py-1.5 text-sm font-medium rounded-lg transition-all duration-300 outline-none focus:outline-none ${
              isDarkSection
                ? 'text-white/80 hover:bg-white/10'
                : 'text-gray-700 hover:bg-gray-100'
            }`}
          >
            {language === 'nl' ? 'EN' : 'NL'}
          </button>
        </div>

        {/* Get Started Button */}
        <button
          onClick={scrollToCTA}
          className={`hidden md:flex flex-row items-center justify-center gap-1 outline-none transition-all duration-300 border px-4 py-2.5 whitespace-nowrap rounded-full text-base leading-tight tracking-normal font-medium cursor-pointer ${
            isDarkSection
              ? 'bg-white text-gray-900 hover:bg-gray-100 border-transparent'
              : 'bg-gray-900 text-white hover:bg-gray-700 border-transparent'
          }`}
        >
          {t.navbar.getStarted}
        </button>

        {/* Mobile Menu Toggle */}
        <button
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="md:hidden mr-2.5 p-2 rounded-lg transition-all duration-300"
        >
          <motion.div
            animate={{ rotate: isMobileMenuOpen ? 180 : 0 }}
            transition={{ duration: 0.3 }}
          >
            {isMobileMenuOpen ? (
              <FiX size={24} className={`transition-colors duration-300 ${
                isDarkSection ? 'text-white' : 'text-gray-900'
              }`} />
            ) : (
              <FiMenu size={24} className={`transition-colors duration-300 ${
                isDarkSection ? 'text-white' : 'text-gray-900'
              }`} />
            )}
          </motion.div>
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence mode="wait">
        {isMobileMenuOpen && (
          <motion.div
            className={`md:hidden absolute top-full left-0 right-0 mt-2 mx-4 rounded-2xl backdrop-blur-lg ${
              isDarkSection 
                ? 'border border-white/20 bg-white/10' 
                : 'border border-gray-200/50 bg-white/90'
            }`}
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ 
              duration: 0.2,
              ease: "easeOut"
            }}
          >
            <div className="p-6 space-y-6">
              {/* Mobile Navigation Links */}
              {navItems.map((item) => (
                <button
                  key={item.name}
                  onClick={() => {
                    scrollToSection(item.section)
                    setIsMobileMenuOpen(false)
                  }}
                  className={`block w-full text-left text-lg font-medium transition-all duration-200 hover:translate-x-1 ${
                    isDarkSection
                      ? activeSection === item.section
                        ? 'text-white'
                        : 'text-white/70 hover:text-white'
                      : activeSection === item.section
                        ? 'text-gray-900'
                        : 'text-gray-600 hover:text-gray-900'
                  }`}
                >
                  {item.name}
                </button>
              ))}
              
              {/* Mobile Language Switcher */}
              <div className="flex items-center justify-between pt-4 border-t border-white/10">
                <div className="flex items-center gap-2">
                  <FiGlobe className={`text-lg ${isDarkSection ? 'text-white/70' : 'text-gray-600'}`} />
                  <span className={`text-sm ${isDarkSection ? 'text-white/80' : 'text-gray-600'}`}>
                    Taal / Language
                  </span>
                </div>
                <button
                  onClick={() => {
                    handleLanguageSwitch()
                    setTimeout(() => setIsMobileMenuOpen(false), 100)
                  }}
                  className={`px-4 py-2 text-sm font-medium rounded-lg transition-all duration-200 ${
                    isDarkSection
                      ? 'text-white bg-white/10 hover:bg-white/20'
                      : 'text-gray-700 bg-gray-100 hover:bg-gray-200'
                  }`}
                >
                  {language === 'nl' ? 'EN' : 'NL'}
                </button>
              </div>
              
              {/* Mobile CTA Button */}
              <button
                onClick={() => {
                  scrollToCTA()
                  setTimeout(() => setIsMobileMenuOpen(false), 100)
                }}
                className={`w-full px-6 py-3 rounded-xl text-lg font-medium transition-all duration-200 ${
                  isDarkSection
                    ? 'bg-white text-gray-900 hover:bg-gray-100'
                    : 'bg-gray-900 text-white hover:bg-gray-700'
                }`}
              >
                {t.navbar.getStarted}
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}