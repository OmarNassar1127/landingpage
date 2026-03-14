"use client";

import React from "react";
import { motion } from "framer-motion";
import { useLanguage } from "@/lib/i18n/language-context";

const CompanySlider = () => {
  const { language } = useLanguage();

  const companies = [
    { name: "KLM Catering Services", logo: "/images/companies/klm.png" },
    { name: "E-Flux", logo: "/images/companies/e-flux.jpeg" },
    { name: "ZapBot", logo: "/images/clients/whatsapp.svg" },
    { name: "CSDM Amsterdam", logo: "/images/companies/csdm.png" },
    { name: "Slouch", logo: "/images/clients/og-image.png" },
    { name: "Hilverda De Boer", logo: "/images/companies/hilverda.png" },
    { name: "Vesting Finance", logo: "/images/companies/vestingfinance.png" },
  ];

  return (
    <section className="py-16 sm:py-20 overflow-hidden" id="trusted-partners">
      <div className="container mx-auto px-4">
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center text-sm font-medium text-muted-foreground uppercase tracking-widest mb-12"
        >
          {language === "nl" ? "Zij gingen je voor" : "Trusted by industry leaders"}
        </motion.p>

        {/* Marquee */}
        <div className="relative">
          <div className="absolute left-0 top-0 bottom-0 w-12 sm:w-24 md:w-40 bg-gradient-to-r from-background to-transparent z-10 pointer-events-none" />
          <div className="absolute right-0 top-0 bottom-0 w-12 sm:w-24 md:w-40 bg-gradient-to-l from-background to-transparent z-10 pointer-events-none" />

          <div className="flex overflow-hidden">
            <div className="flex gap-16 sm:gap-24 md:gap-32 items-center animate-scroll">
              {[...Array(3)].flatMap((_, setIdx) =>
                companies.map((company, index) => (
                  <div
                    key={`${setIdx}-${company.name}-${index}`}
                    className="flex-shrink-0 group"
                  >
                    <img
                      src={company.logo}
                      alt={company.name}
                      className="h-10 sm:h-12 md:h-14 w-auto object-contain grayscale opacity-50 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-500"
                    />
                  </div>
                ))
              )}
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
          animation: scroll 35s linear infinite;
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
