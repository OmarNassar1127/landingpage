'use client'

import { motion } from 'framer-motion'
import { FiStar, FiTrendingUp, FiUsers, FiClock } from 'react-icons/fi'
import { useLanguage } from '@/lib/i18n/language-context'
import { translations } from '@/lib/i18n/translations'
import Image from 'next/image'

interface Metric {
  value: string
  label: string
  icon: string
}

interface SocialProofSectionProps {
  currentLang?: 'nl' | 'en';
}

export default function SocialProofSection({ currentLang }: SocialProofSectionProps) {
  const { language: contextLanguage } = useLanguage()
  const language = currentLang || contextLanguage
  const t = translations[language].voiceAI

  // Real client logos
  const clientLogos = [
    { name: "Capgemini", logo: "/images/trusted-by/capgemini.webp" },
    { name: "CSDM", logo: "/images/trusted-by/csdm.png" },
    { name: "E-Flux", logo: "/images/trusted-by/e-flux.jpeg" },
    { name: "KLM", logo: "/images/trusted-by/klm.png" },
    { name: "Road", logo: "/images/trusted-by/road.webp" },
    { name: "Vloto", logo: "/images/trusted-by/vloto.svg" }
  ]

  const metrics: Metric[] = t.socialProof.metrics || []

  return (
    <section data-section="social-proof" className="section-padding bg-white">
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
            {t.socialProof.title}
          </h2>
        </motion.div>

        {/* Key Metric */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          viewport={{ once: true }}
        >
          <div className="bg-gradient-to-r from-green-500/10 to-blue-600/10 rounded-2xl p-8 max-w-2xl mx-auto">
            <div className="text-4xl md:text-5xl font-bold text-slate-900 mb-2">
              87%
            </div>
            <p className="text-lg text-gray-600 font-medium">
              {t.socialProof.metric}
            </p>
          </div>
        </motion.div>

        {/* Client Logos */}
        <motion.div
          className="mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          viewport={{ once: true }}
        >
          <p className="text-center text-gray-600 mb-8 font-medium">
            {t.socialProof.trustedBy}
          </p>
          
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
            {clientLogos.map((client, index) => (
              <motion.div
                key={index}
                className="bg-gray-100/50 rounded-xl p-4 flex items-center justify-center hover:bg-gray-100/80 transition-colors duration-200 group h-20"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ scale: 1.05 }}
              >
                <Image
                  src={client.logo}
                  alt={`${client.name} logo`}
                  width={100}
                  height={32}
                  className="max-w-[90px] max-h-8 object-contain transition-all duration-300"
                  priority={index < 3}
                />
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Testimonial */}
        <motion.div
          className="bg-gradient-to-br from-slate-900 to-slate-900/90 rounded-2xl p-8 md:p-12 text-white mb-16 dark-section"
          id="testimonial-dark"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          viewport={{ once: true }}
        >
          <div className="max-w-4xl mx-auto">
            {/* Stars */}
            <div className="flex justify-center mb-6">
              {[...Array(5)].map((_, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, scale: 0 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.3, delay: 0.8 + i * 0.1 }}
                  viewport={{ once: true }}
                >
                  <FiStar className="text-2xl text-yellow-400 fill-current mx-1" />
                </motion.div>
              ))}
            </div>

            {/* Quote */}
            <motion.blockquote
              className="text-xl md:text-2xl font-medium text-center mb-8 leading-relaxed"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 1.3 }}
              viewport={{ once: true }}
            >
              &ldquo;{t.socialProof.testimonial.quote}&rdquo;
            </motion.blockquote>

            {/* Author */}
            <motion.div
              className="flex flex-col md:flex-row items-center justify-center gap-4"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 1.5 }}
              viewport={{ once: true }}
            >
              <div className="w-16 h-16 bg-white/10 rounded-full flex items-center justify-center backdrop-blur-sm">
                <span className="text-2xl font-bold">
                  {t.socialProof.testimonial.author.split(' ').map((n: string) => n[0]).join('')}
                </span>
              </div>
              
              <div className="text-center md:text-left">
                <div className="font-semibold text-lg">
                  {t.socialProof.testimonial.author}
                </div>
                <div className="text-white/80">
                  {t.socialProof.testimonial.role}
                </div>
                <div className="text-white/60 text-sm">
                  {t.socialProof.testimonial.company}
                </div>
              </div>
            </motion.div>
          </div>
        </motion.div>

        {/* Metrics Grid */}
        <div className="grid md:grid-cols-3 gap-8">
          {metrics.map((metric: Metric, index: number) => (
            <motion.div
              key={index}
              className="text-center p-8 rounded-2xl bg-white shadow-xl hover:shadow-2xl border border-gray-200/50 transition-all duration-300 group hover:-translate-y-2"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.8 + index * 0.2 }}
              viewport={{ once: true }}
              whileHover={{ scale: 1.02 }}
            >
              <div className="w-16 h-16 mx-auto mb-6 bg-gradient-to-br from-blue-600 to-blue-600/80 rounded-xl shadow-sm flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                {metric.icon === 'TrendingUp' && <FiTrendingUp className="text-2xl text-white" />}
                {metric.icon === 'Clock' && <FiClock className="text-2xl text-white" />}
                {metric.icon === 'Users' && <FiUsers className="text-2xl text-white" />}
              </div>
              
              <motion.div
                className="text-3xl font-bold text-slate-900 mb-2"
                initial={{ scale: 0.8 }}
                whileInView={{ scale: 1 }}
                transition={{ duration: 0.5, delay: 1 + index * 0.2 }}
                viewport={{ once: true }}
              >
                {metric.value}
              </motion.div>
              
              <p className="text-gray-600 font-medium group-hover:text-blue-600 transition-colors duration-300">
                {metric.label}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}