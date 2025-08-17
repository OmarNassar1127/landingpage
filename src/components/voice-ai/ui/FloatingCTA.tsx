"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { FiPlay, FiX } from "react-icons/fi";
import { useState, useEffect } from "react";
import { useLanguage } from "@/lib/i18n/language-context";
import { translations } from "@/lib/i18n/translations";

export default function FloatingCTA() {
  const { language } = useLanguage();
  const t = translations[language].voiceAI;
  const [isVisible, setIsVisible] = useState(false);
  const [isClient, setIsClient] = useState(false);
  const [showPopup, setShowPopup] = useState(false);
  const [hasShownPopup, setHasShownPopup] = useState(false);
  const { scrollY } = useScroll();
  const opacity = useTransform(scrollY, [100, 200], [0, 1]);

  useEffect(() => {
    setIsClient(true);

    const handleScroll = () => {
      setIsVisible(window.scrollY > 200);
    };

    window.addEventListener("scroll", handleScroll);
    
    // Show popup after 10 seconds, only once
    const popupTimer = setTimeout(() => {
      if (!hasShownPopup) {
        setShowPopup(true);
        setHasShownPopup(true);
      }
    }, 10000);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      clearTimeout(popupTimer);
    };
  }, [hasShownPopup]);

  const handleCallDemo = () => {
    // Link to call demo - could be a phone number or a booking form
    window.open('tel:+31208901234', '_self'); // Replace with actual demo phone number
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
      {/* Popup Message */}
      {showPopup && (
        <motion.div
          className="bg-white border border-gray-200 rounded-lg shadow-lg p-3 mb-2 relative max-w-48"
          initial={{ opacity: 0, y: 10, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.3 }}
        >
          <button
            onClick={() => setShowPopup(false)}
            className="absolute -top-1 -right-1 w-5 h-5 bg-gray-100 hover:bg-gray-200 rounded-full flex items-center justify-center text-gray-500 text-xs"
          >
            <FiX />
          </button>
          <p className="text-sm text-gray-700 font-medium">
            Probeer mij gratis
          </p>
        </motion.div>
      )}
      
      {/* Main CTA Button */}
      <motion.button
        onClick={handleCallDemo}
        className="bg-orange-500 hover:bg-orange-600 text-white px-6 py-3 rounded-full shadow-lg hover:shadow-xl flex items-center gap-3 font-semibold group transition-all duration-200"
        whileHover={{ scale: 1.05, y: -2 }}
        whileTap={{ scale: 0.95 }}
        data-cursor="pointer"
        animate={showPopup ? { scale: [1, 1.1, 1] } : {}}
        transition={{ duration: 0.6 }}
      >
        <FiPlay className="text-lg group-hover:scale-110 transition-transform duration-200" />
        {t.cta.ctaText}
      </motion.button>
    </motion.div>
  );
}
