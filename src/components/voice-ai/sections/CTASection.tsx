'use client'

import { motion } from 'framer-motion'
import { useState } from 'react'
import { FiCalendar, FiUser, FiMail, FiHome, FiArrowRight } from 'react-icons/fi'
import { useLanguage } from '@/lib/i18n/language-context'
import { translations } from '@/lib/i18n/translations'

interface CTASectionProps {
  currentLang?: 'nl' | 'en';
}

export default function CTASection({ currentLang }: CTASectionProps) {
  const { language: contextLanguage } = useLanguage()
  const language = currentLang || contextLanguage
  const t = translations[language].voiceAI
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    phone: ''
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [submitError, setSubmitError] = useState('')

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setSubmitError('')
    
    try {
      // Send form data to Formspree
      const response = await fetch("https://formspree.io/f/xldjpybw", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          company: formData.company,
          phone: formData.phone,
          _subject: `New demo request from ${formData.name} at ${formData.company}`,
        }),
      });
      
      if (!response.ok) {
        throw new Error(`Form submission failed: ${response.status}`);
      }
      
      setIsSubmitting(false)
      setIsSubmitted(true)
      
      // Reset form after showing success message
      setTimeout(() => {
        setIsSubmitted(false)
        setFormData({ name: '', email: '', company: '', phone: '' })
      }, 5000)
      
    } catch (error) {
      setIsSubmitting(false)
      setSubmitError(error instanceof Error ? error.message : 'Failed to submit form. Please try again.')
      
      // Clear error after 5 seconds
      setTimeout(() => {
        setSubmitError('')
      }, 5000)
    }
  }

  const isFormValid = formData.name && formData.email && formData.company

  return (
    <section className="section-padding bg-gradient-to-br from-slate-900 via-slate-900 to-slate-900/90 text-white relative overflow-hidden" data-section="cta">
      {/* Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-10 w-64 h-64 bg-blue-600/10 rounded-full blur-3xl" />
        <div className="absolute bottom-20 right-10 w-80 h-80 bg-green-500/10 rounded-full blur-3xl" />
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-white/5 rounded-full blur-3xl" />
      </div>

      <div className="container-custom relative z-10">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <motion.div
            className="text-center mb-12"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-4xl mb-4 font-sans font-semibold">
              {t.cta.title}
            </h2>
            <p className="text-lg text-white/80 max-w-2xl mx-auto">
              {t.cta.subtitle}
            </p>
          </motion.div>

          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Form */}
            <motion.div
              className="bg-white/5 backdrop-blur-sm rounded-2xl p-8 border border-white/10"
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              viewport={{ once: true }}
            >
              {!isSubmitted ? (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="relative">
                      <FiUser className="absolute left-4 top-4 text-white/60" />
                      <input
                        type="text"
                        name="name"
                        placeholder={t.cta.form.name}
                        value={formData.name}
                        onChange={handleInputChange}
                        className="w-full bg-white/10 border border-white/20 rounded-lg pl-12 pr-4 py-3 text-white placeholder-white/60 focus:border-conversion-blue focus:outline-none transition-colors duration-200"
                        required
                      />
                    </div>
                    
                    <div className="relative">
                      <FiMail className="absolute left-4 top-4 text-white/60" />
                      <input
                        type="email"
                        name="email"
                        placeholder={t.cta.form.email}
                        value={formData.email}
                        onChange={handleInputChange}
                        className="w-full bg-white/10 border border-white/20 rounded-lg pl-12 pr-4 py-3 text-white placeholder-white/60 focus:border-conversion-blue focus:outline-none transition-colors duration-200"
                        required
                      />
                    </div>
                  </div>

                  <div className="relative">
                    <FiHome className="absolute left-4 top-4 text-white/60" />
                    <input
                      type="text"
                      name="company"
                      placeholder={t.cta.form.company}
                      value={formData.company}
                      onChange={handleInputChange}
                      className="w-full bg-white/10 border border-white/20 rounded-lg pl-12 pr-4 py-3 text-white placeholder-white/60 focus:border-conversion-blue focus:outline-none transition-colors duration-200"
                      required
                    />
                  </div>

                  <div className="relative">
                    <input
                      type="tel"
                      name="phone"
                      placeholder={t.cta.form.phone}
                      value={formData.phone}
                      onChange={handleInputChange}
                      className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-white placeholder-white/60 focus:border-conversion-blue focus:outline-none transition-colors duration-200"
                    />
                  </div>

                  <motion.button
                    type="submit"
                    disabled={!isFormValid || isSubmitting}
                    className={`w-full py-4 px-6 rounded-lg font-semibold text-lg flex items-center justify-center gap-3 transition-all duration-200 ${
                      isFormValid && !isSubmitting
                        ? 'bg-orange-500 hover:bg-orange-600 text-white transform hover:scale-105'
                        : 'bg-white/20 text-white/60 cursor-not-allowed'
                    }`}
                    whileHover={isFormValid ? { scale: 1.02 } : {}}
                    whileTap={isFormValid ? { scale: 0.98 } : {}}
                  >
                    {isSubmitting ? (
                      <div className="w-6 h-6 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    ) : (
                      <>
                        <FiCalendar className="text-xl" />
                        {t.cta.ctaText}
                        <FiArrowRight className="text-lg" />
                      </>
                    )}
                  </motion.button>
                  
                  {/* Error Message */}
                  {submitError && (
                    <motion.div
                      className="mt-4 p-4 bg-red-500/20 border border-red-500/30 rounded-lg"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      <p className="text-red-300 text-sm font-medium">
                        ⚠️ {submitError}
                      </p>
                    </motion.div>
                  )}
                </form>
              ) : (
                <motion.div
                  className="text-center py-8"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5 }}
                >
                  <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-4">
                    <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <h3 className="text-xl font-semibold mb-2">{t.cta.form.success.title}</h3>
                  <p className="text-white/80">
                    {t.cta.form.success.message.replace('{name}', formData.name ? formData.name.split(' ')[0] : '')}
                  </p>
                </motion.div>
              )}
            </motion.div>

            {/* Benefits Recap */}
            <motion.div
              className="space-y-6"
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              viewport={{ once: true }}
            >
              <h3 className="text-2xl font-semibold mb-6">
                {t.cta.whatToExpect.title}
              </h3>

              {t.cta.whatToExpect.items.map((item, index) => (
                <motion.div
                  key={index}
                  className="flex gap-4 items-start"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.6 + index * 0.1 }}
                  viewport={{ once: true }}
                >
                  <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                    <span className="text-white text-sm font-bold">{index + 1}</span>
                  </div>
                  <div>
                    <h4 className="font-semibold mb-1">{item.title}</h4>
                    <p className="text-white/70 text-sm">{item.description}</p>
                  </div>
                </motion.div>
              ))}

              <motion.div
                className="mt-8 p-4 bg-white/10 rounded-lg border border-white/20"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ duration: 0.5, delay: 1 }}
                viewport={{ once: true }}
              >
                <p className="text-sm text-white/80">
                  {t.cta.whatToExpect.footer}
                </p>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  )
}