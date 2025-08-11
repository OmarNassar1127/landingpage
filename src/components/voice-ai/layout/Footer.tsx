'use client'

import { FiTwitter, FiLinkedin, FiGithub } from 'react-icons/fi'
import { useLanguage } from '@/lib/i18n/language-context'
import { translations } from '@/lib/i18n/translations'
import Image from 'next/image'

export default function Footer() {
  const { language } = useLanguage()
  const t = translations[language].voiceAI
  const currentYear = new Date().getFullYear()

  return (
    <footer className="bg-white border-t border-gray-200 py-8">
      <div className="container-custom">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          {/* Logo & Copyright */}
          <div className="flex items-center gap-6">
            <div className="flex items-center gap-3">
              <Image 
                src="/images/logo.png" 
                alt={`${t.company.name} Logo`}
                width={32}
                height={32}
                className="h-8 w-auto"
              />
              <span className="text-lg font-bold text-slate-900">{t.company.name}</span>
            </div>
            <span className="text-gray-500 text-sm">
              © {currentYear} {t.footer.copyright}
            </span>
          </div>

          {/* Links & Social */}
          <div className="flex items-center gap-8">
            <div className="flex items-center gap-6 text-sm">
              <a href="#privacy" className="text-gray-600 hover:text-slate-900 transition-colors">{t.footer.links.privacy}</a>
              <a href="#terms" className="text-gray-600 hover:text-slate-900 transition-colors">{t.footer.links.terms}</a>
              <a href="#contact" className="text-gray-600 hover:text-slate-900 transition-colors">{t.footer.links.contact}</a>
            </div>
            
            <div className="flex items-center gap-3">
              <a href="https://twitter.com/virelio" className="text-gray-400 hover:text-gray-600 transition-colors">
                <FiTwitter size={18} />
              </a>
              <a href="https://linkedin.com/company/virelio" className="text-gray-400 hover:text-gray-600 transition-colors">
                <FiLinkedin size={18} />
              </a>
              <a href="https://github.com/virelio" className="text-gray-400 hover:text-gray-600 transition-colors">
                <FiGithub size={18} />
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}