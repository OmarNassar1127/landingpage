'use client'

import { motion } from 'framer-motion'
import { FiClock, FiDollarSign, FiTrendingDown } from 'react-icons/fi'
import { useLanguage } from '@/lib/i18n/language-context'
import { translations } from '@/lib/i18n/translations'

interface ProblemSectionProps {
  currentLang?: 'nl' | 'en';
}

export default function ProblemSection({ currentLang }: ProblemSectionProps) {
  const { language: contextLanguage } = useLanguage()
  const language = currentLang || contextLanguage
  const t = translations[language].voiceAI

  const stats = [
    {
      icon: FiClock,
      value: t.problem.stats[0].value,
      label: t.problem.stats[0].label,
      description: t.problem.stats[0].description
    },
    {
      icon: FiDollarSign,
      value: t.problem.stats[1].value,
      label: t.problem.stats[1].label,
      description: t.problem.stats[1].description
    },
    {
      icon: FiTrendingDown,
      value: t.problem.stats[2].value,
      label: t.problem.stats[2].label,
      description: t.problem.stats[2].description
    }
  ]

  return (
    <section data-section="problem" className="section-padding bg-white">
      <div className="container-custom">
        {/* Section Title */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <h2 className="text-3xl md:text-4xl text-slate-900 mb-4 font-sans font-semibold">
            {t.problem.title}
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            {t.problem.subtitle}
          </p>
        </motion.div>

        {/* Stats Grid */}
        <div className="grid md:grid-cols-3 gap-8 mb-16">
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              className="text-center p-8 rounded-2xl bg-white shadow-xl hover:shadow-2xl border border-gray-200/50 transition-all duration-300 group hover:-translate-y-2"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: index * 0.2 }}
              viewport={{ once: true }}
              whileHover={{ scale: 1.02 }}
            >
              <div className="w-16 h-16 mx-auto mb-6 bg-gradient-to-br from-blue-600 to-blue-600/80 rounded-xl shadow-sm flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                <stat.icon className="text-2xl text-white" />
              </div>
              
              <motion.div
                className="text-4xl font-bold text-slate-900 mb-2"
                initial={{ scale: 0.8 }}
                whileInView={{ scale: 1 }}
                transition={{ duration: 0.5, delay: index * 0.2 + 0.3 }}
                viewport={{ once: true }}
              >
                {stat.value}
              </motion.div>
              
              <h3 className="text-lg font-semibold text-slate-900 mb-3 group-hover:text-blue-600 transition-colors duration-300">
                {stat.label}
              </h3>
              
              <p className="text-gray-600 text-sm leading-relaxed">
                {stat.description}
              </p>
            </motion.div>
          ))}
        </div>

        {/* Visual Impact */}
        <motion.div
          className="relative bg-gradient-to-r from-slate-900 to-slate-900/90 rounded-2xl p-8 md:p-12 text-white overflow-hidden dark-section"
          id="problem-dark"
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          viewport={{ once: true }}
        >
          {/* Background Pattern */}
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-4 right-4 w-32 h-32 border border-white rounded-full"></div>
            <div className="absolute bottom-4 left-4 w-24 h-24 border border-white rounded-full"></div>
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-48 h-48 border border-white rounded-full"></div>
          </div>

          <div className="relative z-10 text-center">
            <motion.h3
              className="text-2xl md:text-3xl font-bold mb-4"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              viewport={{ once: true }}
            >
              {t.problem.visualImpact.title}
            </motion.h3>
            
            <motion.p
              className="text-lg opacity-90 max-w-3xl mx-auto"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.8 }}
              viewport={{ once: true }}
            >
              {t.problem.visualImpact.description}
            </motion.p>
          </div>
        </motion.div>
      </div>
    </section>
  )
}