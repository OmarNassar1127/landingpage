"use client";

import { motion } from "framer-motion";
import { FiPlay, FiUsers } from "react-icons/fi";
import { useLanguage } from "@/lib/i18n/language-context";
import { translations } from "@/lib/i18n/translations";

interface HeroSectionProps {
  currentLang?: 'nl' | 'en';
}

export default function HeroSection({ currentLang }: HeroSectionProps) {
  const { language: contextLanguage } = useLanguage();
  const language = currentLang || contextLanguage;
  const t = translations[language].voiceAI;

  const scrollToDemo = () => {
    const element = document.querySelector('[data-section="solution"]');
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  const scrollToContact = () => {
    const element = document.querySelector('[data-section="cta"]');
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <section
      data-section="hero"
      className="relative min-h-screen flex items-center justify-center bg-white overflow-hidden"
    >
      {/* Beautiful Gradient Background */}
      <div className="absolute inset-0 z-0">
        {/* Primary gradient blob */}
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400 rounded-full blur-3xl opacity-30 animate-pulse"></div>

        {/* Secondary gradient blob */}
        <div className="absolute top-1/3 right-1/4 w-80 h-80 bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 rounded-full blur-3xl opacity-25 animate-pulse [animation-delay:1s]"></div>

        {/* Tertiary gradient blob */}
        <div className="absolute bottom-1/4 left-1/3 w-72 h-72 bg-gradient-to-r from-orange-300 via-pink-400 to-purple-400 rounded-full blur-3xl opacity-20 animate-pulse [animation-delay:2s]"></div>

        {/* Overlay for better text readability */}
        <div className="absolute inset-0 bg-white/60 backdrop-blur-sm"></div>
      </div>

      <div className="container-custom relative z-10 text-center px-4 py-8 md:py-0">
        {/* Eyebrow Text - Context */}
        <motion.div
          className="inline-flex items-center gap-2 bg-blue-50 text-blue-600 px-4 py-2 rounded-full text-sm font-medium mb-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          <FiUsers className="text-sm" />
          {t.hero.eyebrow}
        </motion.div>

        {/* Main Headline - Describing 3 Big Outcomes */}
        <motion.div
          className="text-[2.375rem] md:text-[2.85rem] lg:text-[3.325rem] xl:text-[3.8rem] font-sans text-slate-900 mb-8 max-w-6xl mx-auto leading-tight"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
        >
          <h1 className="text-[2.375rem] md:text-[2.85rem] lg:text-[3.325rem] xl:text-[3.8rem] font-sans text-slate-900 leading-tight">
            <div>{t.hero.headline.line1}</div>
            <div>{t.hero.headline.line2}</div>
            <div>{t.hero.headline.line3}</div>
          </h1>
        </motion.div>

        {/* Subline - Clear Value Proposition */}
        <motion.div
          className="text-2xl md:text-3xl text-gray-700 mb-6 max-w-3xl mx-auto"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
        >
          <div className="mb-2">
            <span className="text-purple-600 font-black text-3xl md:text-4xl bg-gradient-to-r from-purple-600 via-pink-500 to-orange-500 bg-clip-text text-transparent">
              {t.company.name} {t.hero.subline.main}
            </span>{" "}
            {t.hero.subline.detail}
          </div>
        </motion.div>

        {/* Trust Signal */}
        <motion.p
          className="text-gray-500 text-sm mb-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.6 }}
        >
          {t.hero.trustSignal}
        </motion.p>

        {/* CTA Buttons - Clear, Benefit-Focused */}
        <motion.div
          className="flex flex-col sm:flex-row gap-6 justify-center items-center mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8, ease: "easeOut" }}
        >
          {/* Primary CTA - Clear Benefit */}
          <motion.button
            onClick={scrollToContact}
            className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-lg font-semibold flex items-center gap-2 shadow-lg hover:shadow-xl transition-all duration-200 transform hover:scale-105"
            whileHover={{ y: -2 }}
            whileTap={{ scale: 0.98 }}
          >
            <FiPlay className="text-sm" />
            {t.hero.primaryCta}
          </motion.button>

          {/* Secondary CTA - Reduces friction */}
          <motion.button
            onClick={scrollToDemo}
            className="bg-transparent border-2 border-gray-300 text-gray-700 hover:bg-gray-50 hover:border-gray-400 px-8 py-3 rounded-lg font-semibold transition-all duration-200"
            whileHover={{ y: -2 }}
            whileTap={{ scale: 0.98 }}
          >
            {t.hero.secondaryCta}
          </motion.button>
        </motion.div>

        {/* Social Proof */}
        <motion.div
          className="flex items-center justify-center gap-2 text-gray-600"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 1.0 }}
        >
          <FiUsers className="text-green-500 text-lg" />
          <span className="text-sm font-medium">{t.hero.socialProof}</span>
        </motion.div>
      </div>
    </section>
  );
}
