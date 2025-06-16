"use client";

import { motion } from "framer-motion";
import { useLanguage } from "@/lib/i18n/language-context";

const AutomationsShowcase = () => {
  const { t } = useLanguage();

  return (
    <section className="py-8 sm:py-12 md:py-16">
      <div className="container mx-auto px-2 sm:px-4 md:px-6">
        {/* Compact inline stats display */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center"
        >
          {/* Main content in a sleek horizontal layout */}
          <div className="inline-flex flex-col sm:flex-row items-center gap-4 sm:gap-6 md:gap-8 bg-gradient-to-r from-primary/5 via-background to-purple-500/5 border border-primary/20 rounded-2xl px-4 sm:px-6 md:px-8 py-4 sm:py-4 md:py-6 backdrop-blur-sm max-w-full">
            
            {/* Number badge */}
            <motion.div
              initial={{ scale: 0 }}
              whileInView={{ scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2, type: "spring" }}
              className="relative flex-shrink-0"
            >
              <div className="bg-primary text-white dark:text-black rounded-xl px-3 sm:px-4 py-2 shadow-lg">
                <div className="text-xl sm:text-2xl md:text-3xl font-bold">200+</div>
              </div>
              
              {/* Animated pulse ring */}
              <motion.div
                animate={{ scale: [1, 1.2, 1], opacity: [0.5, 0, 0.5] }}
                transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                className="absolute inset-0 bg-primary rounded-xl -z-10"
              />
            </motion.div>

            {/* Vertical divider - hidden on mobile */}
            <div className="hidden sm:block h-12 w-px bg-gradient-to-b from-transparent via-primary/30 to-transparent" />

            {/* Text content */}
            <div className="text-center sm:text-left">
              <motion.h3
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.3 }}
                className="text-base sm:text-lg md:text-xl lg:text-2xl font-bold text-gray-900 dark:text-white mb-1"
              >
                {t.automationsShowcase.title}
              </motion.h3>
              <motion.p
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.4 }}
                className="text-xs sm:text-sm md:text-base text-primary font-medium"
              >
                {t.automationsShowcase.subtitle}
              </motion.p>
            </div>

            {/* Mini floating icons */}
            <div className="hidden lg:flex items-center gap-2">
              {[...Array(3)].map((_, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, scale: 0 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: 0.5 + i * 0.1 }}
                  animate={{ 
                    y: [0, -4, 0],
                    transition: {
                      duration: 2 + i * 0.5,
                      repeat: Infinity,
                      ease: "easeInOut",
                      delay: i * 0.3
                    }
                  }}
                  className={`w-8 h-8 rounded-lg bg-gradient-to-br shadow-md flex items-center justify-center ${
                    i === 0 ? 'from-blue-500 to-indigo-600' :
                    i === 1 ? 'from-purple-500 to-pink-600' :
                    'from-green-500 to-emerald-600'
                  }`}
                >
                  <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    {i === 0 ? (
                      // AI icon
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                    ) : i === 1 ? (
                      // Gear icon
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                    ) : (
                      // Lightning icon
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                    )}
                  </svg>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default AutomationsShowcase;