"use client";

import React from "react";
import { motion } from "framer-motion";
import { useLanguage } from "@/lib/i18n/language-context";

const CompanySlider = () => {
  const { language } = useLanguage();

  // Top 5 most impressive/recognizable logos
  const companies = [
    { name: "KLM Catering Services", logo: "/images/companies/klm.png" },
    { name: "E-Flux", logo: "/images/companies/e-flux.jpeg" },
    { name: "CSDM Amsterdam", logo: "/images/companies/csdm.png" },
    { name: "Hilverda De Boer", logo: "/images/companies/hilverda.png" },
    { name: "Vesting Finance", logo: "/images/companies/vestingfinance.png" },
  ];

  return (
    <section className="py-12 sm:py-16 md:py-20 overflow-hidden">
      <div className="container mx-auto px-4">
        {/* Simple heading */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-10 sm:mb-12"
        >
          <p className="text-sm sm:text-base font-medium text-muted-foreground">
            {language === 'nl' ? 'Zij gingen je voor' : 'Trusted by industry leaders'}
          </p>
        </motion.div>

        {/* Marquee container */}
        <div className="relative">
          {/* Gradient overlays for smooth fade */}
          <div className="absolute left-0 top-0 bottom-0 w-20 sm:w-32 bg-gradient-to-r from-background to-transparent z-10 pointer-events-none" />
          <div className="absolute right-0 top-0 bottom-0 w-20 sm:w-32 bg-gradient-to-l from-background to-transparent z-10 pointer-events-none" />

          {/* Scrolling logos - using CSS animation for better performance */}
          <div className="flex overflow-hidden">
            <div className="flex gap-12 sm:gap-16 md:gap-20 items-center animate-scroll">
              {/* First set */}
              {companies.map((company, index) => (
                <div
                  key={`first-${company.name}-${index}`}
                  className="flex-shrink-0 group"
                >
                  <img
                    src={company.logo}
                    alt={company.name}
                    className="h-8 sm:h-10 w-auto object-contain grayscale opacity-70 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-300"
                  />
                </div>
              ))}
              {/* Second set - exact duplicate for seamless loop */}
              {companies.map((company, index) => (
                <div
                  key={`second-${company.name}-${index}`}
                  className="flex-shrink-0 group"
                >
                  <img
                    src={company.logo}
                    alt={company.name}
                    className="h-8 sm:h-10 w-auto object-contain grayscale opacity-70 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-300"
                  />
                </div>
              ))}
              {/* Third set - for extra smoothness */}
              {companies.map((company, index) => (
                <div
                  key={`third-${company.name}-${index}`}
                  className="flex-shrink-0 group"
                >
                  <img
                    src={company.logo}
                    alt={company.name}
                    className="h-8 sm:h-10 w-auto object-contain grayscale opacity-70 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-300"
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes scroll {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(calc(-100% / 3));
          }
        }

        .animate-scroll {
          animation: scroll 30s linear infinite;
          will-change: transform;
        }

        .animate-scroll:hover {
          animation-play-state: paused;
        }
      `}</style>
    </section>
  );
};

export default CompanySlider;
