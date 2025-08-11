'use client'

import { motion } from 'framer-motion'
import { FiTrendingDown, FiClock, FiZap } from 'react-icons/fi'
import { useLanguage } from '@/lib/i18n/language-context'
import { translations } from '@/lib/i18n/translations'

interface Benefit {
  title: string
  description: string
  icon: string
}

const iconMap = {
  TrendingDown: FiTrendingDown,
  Clock: FiClock,
  Zap: FiZap
}

interface BenefitsSectionProps {
  currentLang?: 'nl' | 'en';
}

export default function BenefitsSection({ currentLang }: BenefitsSectionProps) {
  const { language: contextLanguage } = useLanguage()
  const language = currentLang || contextLanguage
  const t = translations[language].voiceAI

  return (
    <section data-section="benefits" className="section-padding bg-gray-50/30">
      <div className="container-custom">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <h2 className="text-3xl md:text-4xl text-slate-900 mb-4 font-sans font-semibold">
            {t.benefits.title}
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            {t.benefits.subtitle}
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8 md:gap-12">
          {t.benefits.items.map((benefit: Benefit, index: number) => {
            const IconComponent = iconMap[benefit.icon as keyof typeof iconMap]
            
            return (
              <motion.div
                key={index}
                className="group"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: index * 0.2 }}
                viewport={{ once: true }}
              >
                <div className="bg-white rounded-2xl p-8 h-full shadow-xl hover:shadow-2xl transition-all duration-300 group-hover:-translate-y-2 border border-gray-200/50 ring-1 ring-gray-900/5">
                  {/* Icon */}
                  <motion.div
                    className="w-16 h-16 bg-gradient-to-br from-blue-600 to-blue-600/80 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300"
                    whileHover={{ rotate: 5 }}
                  >
                    <IconComponent className="text-2xl text-white" />
                  </motion.div>

                  {/* Content */}
                  <h3 className="text-xl font-semibold text-slate-900 mb-4 group-hover:text-blue-600 transition-colors duration-300">
                    {benefit.title}
                  </h3>
                  
                  <p className="text-gray-600 leading-relaxed">
                    {benefit.description}
                  </p>

                  {/* Hover Effect Line */}
                  <motion.div
                    className="h-1 bg-gradient-to-r from-blue-600 to-green-500 rounded-full mt-6 origin-left"
                    initial={{ scaleX: 0 }}
                    whileInView={{ scaleX: 1 }}
                    transition={{ duration: 0.8, delay: 0.5 + index * 0.2 }}
                    viewport={{ once: true }}
                  />
                </div>
              </motion.div>
            )
          })}
        </div>

        {/* Additional Value Props */}
        <motion.div
          className="mt-20 bg-white rounded-2xl p-8 md:p-12 shadow-lg border border-gray-100"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          viewport={{ once: true }}
        >
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h3 className="text-2xl font-semibold text-slate-900 mb-6">
                {t.benefits.enterprise.title}
              </h3>
              
              <div className="space-y-4">
                {t.benefits.enterprise.features.map((feature: string, index: number) => (
                  <motion.div
                    key={index}
                    className="flex items-start gap-3"
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5, delay: 1 + index * 0.1 }}
                    viewport={{ once: true }}
                  >
                    <div className="w-6 h-6 bg-green-500/10 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                      <div className="w-2 h-2 bg-green-500 rounded-full" />
                    </div>
                    <span className="text-gray-600">{feature}</span>
                  </motion.div>
                ))}
              </div>
            </div>

            <motion.div
              className="relative"
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 1.2 }}
              viewport={{ once: true }}
            >
              <div className="bg-gradient-to-br from-gray-100/50 to-gray-100/30 rounded-xl p-8 relative overflow-hidden">
                {/* Decorative Elements */}
                <div className="absolute top-4 right-4 w-20 h-20 bg-blue-600/5 rounded-full" />
                <div className="absolute bottom-4 left-4 w-16 h-16 bg-green-500/5 rounded-full" />
                
                <div className="relative z-10 text-center">
                  <div className="text-4xl font-bold text-slate-900 mb-2">{t.benefits.enterprise.stats[0].value}</div>
                  <p className="text-gray-600 font-medium mb-4">{t.benefits.enterprise.stats[0].label}</p>
                  
                  <div className="text-2xl font-bold text-green-500 mb-2">{t.benefits.enterprise.stats[1].value}</div>
                  <p className="text-gray-600 font-medium">{t.benefits.enterprise.stats[1].label}</p>
                </div>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}