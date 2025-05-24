"use client";

import { motion } from "framer-motion";
import { useLanguage } from "@/lib/i18n/language-context";

const AutomationsShowcase = () => {
  const { t } = useLanguage();

  return (
    <section className="py-16 md:py-20 bg-gradient-to-br from-slate-50 to-blue-50/30 dark:from-slate-950 dark:to-blue-950/30">
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid lg:grid-cols-2 gap-8 md:gap-12 lg:gap-16 items-center">
          {/* Left side - Text */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="space-y-4 md:space-y-6 text-center lg:text-left"
          >
            <h2 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-gray-900 dark:text-white leading-tight">
              {t.automationsShowcase.title}
            </h2>
            <p className="text-xl sm:text-2xl md:text-3xl text-blue-600 dark:text-blue-400 font-medium leading-relaxed">
              {t.automationsShowcase.subtitle}
            </p>
          </motion.div>

          {/* Right side - Animated Graphic */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="flex justify-center lg:justify-end"
          >
            <div className="relative w-64 h-64 sm:w-80 sm:h-80 md:w-96 md:h-96">
              {/* Animated circles representing automations */}
              <div className="absolute inset-0">
                {/* Main circle */}
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                  className="absolute inset-0 rounded-full border-4 border-blue-200 dark:border-blue-800"
                />
                
                {/* Inner rotating elements */}
                <motion.div
                  animate={{ rotate: -360 }}
                  transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
                  className="absolute inset-6 sm:inset-8 rounded-full border-2 border-purple-200 dark:border-purple-800"
                />

                {/* Center number */}
                <div className="absolute inset-0 flex items-center justify-center z-10">
                  <motion.div
                    initial={{ scale: 0 }}
                    whileInView={{ scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8, delay: 0.5, type: "spring" }}
                    className="text-center bg-white dark:bg-slate-900 rounded-full p-4 sm:p-6 shadow-lg"
                  >
                    <div className="text-4xl sm:text-5xl md:text-6xl font-bold text-blue-600 dark:text-blue-400 mb-1 sm:mb-2">
                      200+
                    </div>
                    <div className="text-xs sm:text-sm text-gray-600 dark:text-gray-300 font-medium">
                      {t.automationsShowcase.centerLabel}
                    </div>
                  </motion.div>
                </div>

                {/* Floating icons around the circle - positioned to not overlap center */}
                {[...Array(8)].map((_, i) => {
                  // Calculate positions to avoid center overlap
                  const angle = (i * Math.PI) / 4;
                  const radius = 45; // Increased radius to avoid center overlap
                  const top = 50 + radius * Math.sin(angle);
                  const left = 50 + radius * Math.cos(angle);
                  
                  return (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, scale: 0 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.6, delay: 0.7 + i * 0.1 }}
                      animate={{ 
                        y: [0, -8, 0],
                        rotate: [0, 3, -3, 0],
                        transition: {
                          duration: 3 + i * 0.5,
                          repeat: Infinity,
                          ease: "easeInOut",
                          delay: i * 0.5
                        }
                      }}
                      className={`absolute w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 rounded-lg bg-gradient-to-br shadow-lg flex items-center justify-center ${
                        i % 3 === 0 ? 'from-blue-500 to-indigo-600' :
                        i % 3 === 1 ? 'from-purple-500 to-pink-600' :
                        'from-green-500 to-emerald-600'
                      }`}
                      style={{
                        top: `${top}%`,
                        left: `${left}%`,
                        transform: 'translate(-50%, -50%)'
                      }}
                    >
                      {/* AI/Automation icons */}
                      <svg className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      {i % 4 === 0 ? (
                        // AI brain icon
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                      ) : i % 4 === 1 ? (
                        // Gear icon
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                      ) : i % 4 === 2 ? (
                        // Lightning bolt icon
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                      ) : (
                        // Code icon
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
                      )}
                    </svg>
                  </motion.div>
                  );
                })}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default AutomationsShowcase;