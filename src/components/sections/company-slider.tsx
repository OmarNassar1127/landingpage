"use client";

import React, { useEffect, useRef } from "react";
import { motion, useAnimation, useInView } from "framer-motion";
import { cn } from "@/lib/utils";
import { Building2, Scale, Plane, Globe, Shield, CreditCard, Activity, Zap, Database, BadgeDollarSign } from "lucide-react";
import { useLanguage } from "@/lib/i18n/language-context";

// Company data with icon placeholders for logos
// In a production environment, you'll want to add actual company logos
const companies = [
  { id: 1, name: "Road", logo: "road", icon: <Activity className="w-6 h-6" /> },
  { id: 2, name: "eFlux", logo: "eflux", icon: <Zap className="w-6 h-6" /> },
  { id: 3, name: "Capgemini", logo: "capgemini", icon: <Database className="w-6 h-6" /> },
  { id: 4, name: "Ministerie van Defensie", logo: "defensie", icon: <Shield className="w-6 h-6" /> },
  { id: 5, name: "Hilverda de Boer", logo: "hilverda", icon: <Building2 className="w-6 h-6" /> },
  { id: 6, name: "Fest Finance", logo: "fest", icon: <BadgeDollarSign className="w-6 h-6" /> },
  { id: 7, name: "KLM", logo: "klm", icon: <Plane className="w-6 h-6" /> },
  { id: 8, name: "CSDM", logo: "csdm", icon: <Scale className="w-6 h-6" /> },
  { id: 9, name: "Vloto", logo: "vloto", icon: <Globe className="w-6 h-6" /> },
  { id: 10, name: "Quotum", logo: "quotum", icon: <CreditCard className="w-6 h-6" /> },
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
          <motion.div variants={itemVariants} className="text-center relative">
            <div className="absolute left-1/2 -top-10 w-1 h-24 bg-gradient-to-b from-transparent via-primary/50 to-transparent transform -translate-x-1/2" />
            <h2 className="text-2xl font-bold drop-shadow-md">{t.companies.title}</h2>
            <p className="text-muted-foreground/90 backdrop-blur-sm bg-background/30 inline-block px-4 py-2 rounded-lg shadow-sm border border-primary/10 mt-2">
              {t.companies.subtitle}
            </p>
            <div className="absolute left-1/2 -bottom-10 w-1 h-24 bg-gradient-to-b from-primary/50 via-transparent to-transparent transform -translate-x-1/2" />
          </motion.div>

          <motion.div 
            variants={itemVariants}
            className="relative overflow-hidden my-8"
          >
            {/* Fade gradient effects on sides */}
            <div className="absolute left-0 top-0 bottom-0 w-24 bg-gradient-to-r from-background to-transparent z-10 backdrop-blur-sm" />
            <div className="absolute right-0 top-0 bottom-0 w-24 bg-gradient-to-l from-background to-transparent z-10 backdrop-blur-sm" />
            {/* First Slider (Left to Right) */}
            <motion.div
              className="flex space-x-16 mb-12 will-change-transform"
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
                  className="flex items-center justify-center min-w-[180px] h-16"
                >
                  {/* If you have actual logos, replace this with an Image component */}
                  <div className="flex items-center justify-center h-full px-4 py-2 bg-background/60 backdrop-blur-md rounded-lg border border-primary/20 shadow-lg hover:border-primary/40 transition-transform duration-300 hover:scale-[1.03]">
                    <div className="text-primary/80 mr-2">
                      {company.icon}
                    </div>
                    <div className="text-base font-medium text-foreground">
                      {company.name}
                    </div>
                  </div>
                </div>
              ))}
            </motion.div>
            
            {/* Second Slider (Right to Left) - with shuffled array again for more variety */}
            <motion.div
              className="flex space-x-16 will-change-transform"
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
                  className="flex items-center justify-center min-w-[180px] h-16"
                >
                  {/* If you have actual logos, replace this with an Image component */}
                  <div className="flex items-center justify-center h-full px-4 py-2 bg-background/60 backdrop-blur-md rounded-lg border border-primary/20 shadow-lg hover:border-primary/40 transition-all duration-300 hover:shadow-xl hover:shadow-primary/5 hover:scale-105">
                    <div className="text-primary/80 mr-2">
                      {company.icon}
                    </div>
                    <div className="text-base font-medium text-foreground">
                      {company.name}
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
