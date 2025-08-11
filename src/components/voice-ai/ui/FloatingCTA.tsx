"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { FiPlay } from "react-icons/fi";
import { useState, useEffect } from "react";
import { useLanguage } from "@/lib/i18n/language-context";
import { translations } from "@/lib/i18n/translations";

export default function FloatingCTA() {
  const { language } = useLanguage();
  const t = translations[language].voiceAI;
  const [isVisible, setIsVisible] = useState(false);
  const [isClient, setIsClient] = useState(false);
  const { scrollY } = useScroll();
  const opacity = useTransform(scrollY, [100, 200], [0, 1]);

  useEffect(() => {
    setIsClient(true);

    const handleScroll = () => {
      setIsVisible(window.scrollY > 200);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToCTA = () => {
    const ctaSection = document.querySelector('[data-section="cta"]');
    if (ctaSection) {
      ctaSection.scrollIntoView({ behavior: "smooth" });
    }
  };

  if (!isClient || !isVisible) return null;

  return (
    <motion.div
      className="fixed bottom-6 right-6 z-40 flex flex-col gap-3"
      style={{ opacity }}
      initial={{ scale: 0 }}
      animate={{ scale: 1 }}
      transition={{
        type: "spring",
        stiffness: 400,
        damping: 25,
      }}
    >
      {/* Main CTA Button */}
      <motion.button
        onClick={scrollToCTA}
        className="bg-orange-500 hover:bg-orange-600 text-white px-6 py-3 rounded-full shadow-lg hover:shadow-xl flex items-center gap-3 font-semibold group transition-all duration-200"
        whileHover={{ scale: 1.05, y: -2 }}
        whileTap={{ scale: 0.95 }}
        data-cursor="pointer"
      >
        <FiPlay className="text-lg group-hover:scale-110 transition-transform duration-200" />
        {t.cta.ctaText}
      </motion.button>
    </motion.div>
  );
}
