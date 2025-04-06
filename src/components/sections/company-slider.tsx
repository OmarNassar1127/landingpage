"use client";

import React, { useEffect, useRef } from "react";
import { motion, useAnimation, useInView } from "framer-motion";
import { cn } from "@/lib/utils";
import { Building2, Scale, Plane, Globe, Shield, CreditCard, Activity, Zap, Database, BadgeDollarSign } from "lucide-react";
import { useLanguage } from "@/lib/i18n/language-context";
import Image from "next/image";

// Company data with logo images
const companies = [
  { id: 1, name: "Road", logo: "/images/companies/road.webp", icon: <Activity className="w-6 h-6" /> },
  { id: 2, name: "e-Flux", logo: "/images/companies/e-flux.jpeg", icon: <Zap className="w-6 h-6" /> },
  { id: 3, name: "Capgemini", logo: "/images/companies/capgemini.webp", icon: <Database className="w-6 h-6" /> },
  { id: 4, name: "Ministerie van Defensie", logo: "/images/companies/ministerie.png", icon: <Shield className="w-6 h-6" /> },
  { id: 5, name: "Hilverda de Boer", logo: "/images/companies/hilverda.png", icon: <Building2 className="w-6 h-6" /> },
  { id: 6, name: "Vesting Finance", logo: "/images/companies/vestingfinance.png", icon: <BadgeDollarSign className="w-6 h-6" /> },
  { id: 7, name: "KLM", logo: "/images/companies/klm.png", icon: <Plane className="w-6 h-6" /> },
  { id: 8, name: "CSDM", logo: "/images/companies/csdm.png", icon: <Scale className="w-6 h-6" /> },
  { id: 9, name: "Vloto", logo: "/images/companies/vloto.svg", icon: <Globe className="w-6 h-6" /> },
  { id: 10, name: "Quotum", logo: "/images/companies/quotum.png", icon: <CreditCard className="w-6 h-6" /> },
  { id: 11, name: "WL-Bali", logo: "/images/companies/wl-bali.jpg", icon: <CreditCard className="w-6 h-6" /> },
];

// Shuffle the companies array to display them in random order
const shuffleArray = (array: typeof companies) => {
  // Create a copy of the array
  const shuffled = [...array];
  
  // Fisher-Yates shuffle algorithm
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  
  return shuffled;
};

export default function CompanySlider() {
  const { t } = useLanguage();
  const ref = useRef(null);
  const isInView = useInView(ref, { once: false, amount: 0.3 });
  const controls = useAnimation();
  
  // Shuffle companies only once when component mounts
  const shuffledCompanies = React.useMemo(() => shuffleArray(companies), []);
  
  // Create more shuffled arrays for second row to ensure variety
  const shuffledCompaniesReverse = React.useMemo(() => shuffleArray([...companies]), []);
  
  useEffect(() => {
    if (isInView) {
      controls.start("visible");
    }
  }, [isInView, controls]);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.3,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" },
    },
  };

  return (
    <section 
      id="trusted-partners"
      ref={ref} 
      className="py-16 relative"
    >
      {/* Background gradient and blur effect */}
      <div className="absolute inset-0 bg-gradient-to-r from-background via-background/70 to-background z-[-1]" />
      <div className="absolute inset-0 border-y border-primary/10 z-[-1]" />
      <div className="container mx-auto px-4">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={controls}
          className="space-y-8"
        >
          <motion.div variants={itemVariants} className="text-center relative z-10">
            <div className="absolute left-1/2 -top-10 w-1 h-24 bg-gradient-to-b from-transparent via-primary/50 to-transparent transform -translate-x-1/2 z-0" />
            <div className="flex flex-col items-center gap-3 relative z-20">
              <h2 className="text-3xl md:text-4xl font-bold drop-shadow-md px-6 py-2 backdrop-blur-lg sm:backdrop-blur-xl bg-background/20 inline-block rounded-lg">{t.companies.title}</h2>
              <p className="text-muted-foreground/90 backdrop-blur-lg sm:backdrop-blur-xl bg-background/20 inline-block px-6 py-3 rounded-lg shadow-sm border border-primary/10">
                {t.companies.subtitle}
              </p>
            </div>
            <div className="absolute left-1/2 -bottom-10 w-1 h-24 bg-gradient-to-b from-primary/50 via-transparent to-transparent transform -translate-x-1/2 z-0" />
          </motion.div>

          <motion.div 
            variants={itemVariants}
            className="relative overflow-hidden my-8"
          >
            {/* Fade gradient effects on sides - minimal blur */}
            <div className="absolute left-0 top-0 bottom-0 w-24 bg-gradient-to-r from-background to-transparent z-0" />
            <div className="absolute right-0 top-0 bottom-0 w-24 bg-gradient-to-l from-background to-transparent z-0" />
            {/* First Slider (Left to Right) */}
            <motion.div
              className="flex space-x-12 mb-10 will-change-transform relative z-10"
              animate={{
                x: [0, -1500],
              }}
              transition={{
                x: {
                  duration: 60,
                  repeat: Infinity,
                  repeatType: "loop",
                  ease: "linear",
                },
                useCompositeLayer: true
              }}
            >
              {[...shuffledCompanies, ...shuffledCompanies].map((company, index) => (
                <div 
                  key={`${company.id}-${index}`} 
                  className="flex items-center justify-center min-w-[150px] h-16 z-10"
                >
                  <div className="flex items-center justify-center h-full px-4 py-2 bg-white dark:bg-white rounded-lg border border-gray-200 shadow hover:border-primary/30 transition-all duration-300 hover:scale-105 hover:shadow-md">
                    <div className="relative h-10 w-28">
                      <Image 
                        src={company.logo}
                        alt={`${company.name} logo`}
                        fill
                        className="object-contain"
                        sizes="(max-width: 768px) 60px, 112px"
                      />
                    </div>
                  </div>
                </div>
              ))}
            </motion.div>
            
            {/* Second Slider (Right to Left) - with shuffled array again for more variety */}
            <motion.div
              className="flex space-x-12 will-change-transform relative z-10"
              animate={{
                x: [-1500, 0],
              }}
              transition={{
                x: {
                  duration: 60,
                  repeat: Infinity,
                  repeatType: "loop",
                  ease: "linear",
                },
                useCompositeLayer: true
              }}
            >
              {[...shuffledCompaniesReverse, ...shuffledCompaniesReverse].map((company, index) => (
                <div 
                  key={`rev-${company.id}-${index}`} 
                  className="flex items-center justify-center min-w-[150px] h-16 z-10"
                >
                  <div className="flex items-center justify-center h-full px-4 py-2 bg-white dark:bg-white rounded-lg border border-gray-200 shadow hover:border-primary/30 transition-all duration-300 hover:scale-105 hover:shadow-md">
                    <div className="relative h-10 w-28">
                      <Image 
                        src={company.logo}
                        alt={`${company.name} logo`}
                        fill
                        className="object-contain"
                        sizes="(max-width: 768px) 60px, 112px"
                      />
                    </div>
                  </div>
                </div>
              ))}
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
