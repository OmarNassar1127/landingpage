"use client";

import React, { useEffect, useState, useId } from "react";
import { motion, useAnimation, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { useInView } from "react-intersection-observer";
import { ChevronDown, Zap, Globe, Code, Database } from "lucide-react";
import { scrollToSection } from "@/lib/scroll-utils";
import { Icon } from "@/components/ui/icon";
import { useLanguage } from "@/lib/i18n/language-context";

function HeroContent() {
  const { t } = useLanguage();
  const [ref, inView] = useInView({ threshold: 0.1 });
  const controls = useAnimation();
  const [currentIcon, setCurrentIcon] = useState(0);
  const [isMounted, setIsMounted] = useState(false);
  const stableId = useId();

  useEffect(() => {
    setIsMounted(true);
    if (inView) controls.start("visible");
  }, [inView, controls]);

  // Modernized animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.2, delayChildren: 0.3 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] }
    }
  };

  const handleScrollDown = (e: React.MouseEvent) => {
    e.preventDefault();
    scrollToSection("trusted-partners");
  };

  return (
    <section
      ref={ref}
      className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-b from-background to-background/50"
    >
      {/* Modern gradient backgrounds */}
      {isMounted && (
        <>
          <motion.div
            className="absolute inset-0 z-0"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1 }}
          >
            <div className="absolute top-0 -left-40 w-[800px] h-[800px] rounded-full bg-purple-500/20 mix-blend-multiply blur-[128px] animate-pulse" />
            <div className="absolute bottom-0 -right-40 w-[800px] h-[800px] rounded-full bg-blue-500/20 mix-blend-multiply blur-[128px] animate-pulse" />
          </motion.div>

          {/* Subtle grid overlay */}
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#8882_1px,transparent_1px),linear-gradient(to_bottom,#8882_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_110%)]" />
        </>
      )}

      <div className="container relative z-10 px-4 sm:px-6 w-full max-w-7xl mx-auto">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={controls}
          className="flex flex-col items-center space-y-10 text-center"
        >
          {/* Hero Content - Mobile Optimized */}
          <motion.div
            variants={itemVariants}
            className="space-y-4 md:space-y-6"
          >
            {/* Main headline - mobile optimized sizing */}
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold tracking-tight max-w-5xl px-2 sm:px-0 leading-tight">
              {t.hero.title}
            </h1>
            
            {/* Innovative feature highlights - mobile responsive */}
            <div className="flex flex-wrap justify-center gap-2 sm:gap-3 md:gap-4 mt-6 px-2 sm:px-0 max-w-2xl mx-auto">
              {[
                { icon: Zap, text: "Fast", color: "from-yellow-500 to-orange-600" },
                { icon: Code, text: "Custom", color: "from-blue-500 to-indigo-600" },
                { icon: Database, text: "Scalable", color: "from-green-500 to-emerald-600" },
                { icon: Globe, text: "Modern", color: "from-purple-500 to-pink-600" }
              ].map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.4, delay: 0.8 + index * 0.1 }}
                  className={`inline-flex items-center gap-1.5 sm:gap-2 px-3 sm:px-4 py-2 sm:py-2.5 rounded-full bg-gradient-to-r ${item.color} text-white shadow-lg backdrop-blur-sm text-xs sm:text-sm font-medium`}
                >
                  <Icon icon={item.icon} className="h-3 w-3 sm:h-4 sm:w-4" />
                  <span className="font-medium">{item.text}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>

          <motion.p
            variants={itemVariants}
            className="max-w-3xl text-base sm:text-lg md:text-xl text-muted-foreground font-normal leading-relaxed px-4 sm:px-0 text-center"
          >
            {t.hero.subtitle}
          </motion.p>

          <motion.div
            variants={itemVariants}
            className="flex flex-col sm:flex-row gap-4 items-center justify-center w-full"
          >
            <Button
              size="lg"
              className="bg-primary hover:bg-primary/90 text-white dark:text-black shadow-lg shadow-primary/25 hover:shadow-xl hover:shadow-primary/30 transition-all duration-300 w-full sm:w-auto min-w-[200px]"
              asChild
            >
              <a href="#trusted-partners" aria-label={t.hero.ctaButton}>
                {t.hero.ctaButton}
              </a>
            </Button>
            <Button
              variant="outline"
              size="lg"
              className="border-2 hover:bg-primary/5 transition-colors duration-300 w-full sm:w-auto min-w-[200px]"
              asChild
            >
              <a href="#contact" aria-label={t.hero.secondaryButton}>
                {t.hero.secondaryButton}
              </a>
            </Button>
          </motion.div>

          {/* Scroll indicator - positioned above bottom of hero section */}
          <motion.div
            variants={itemVariants}
            className="mt-8 sm:mt-12 md:mt-16 lg:mt-20 flex justify-center"
          >
            {isMounted && (
              <motion.a 
                href="#trusted-partners" 
                onClick={(e) => handleScrollDown(e)}
                className="flex flex-col items-center hover:text-primary transition-colors bg-background/90 backdrop-blur-sm px-4 py-3 sm:px-6 sm:py-4 rounded-full shadow-lg border border-primary/30 group min-h-[56px] sm:min-h-[64px]"
                whileHover={{ y: -3, boxShadow: "0 10px 25px -5px rgba(139,92,246,0.2)" }}
                whileTap={{ y: 0 }}
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 1, delay: 1 }}
                aria-label="Scroll down"
              >
                <motion.div
                  animate={{
                    y: [0, 5, 0],
                  }}
                  transition={{
                    duration: 1.5,
                    repeat: Infinity,
                  }}
                >
                  <Icon 
                    icon={ChevronDown} 
                    className="h-5 w-5 sm:h-6 sm:w-6 group-hover:text-primary" 
                  />
                </motion.div>
              </motion.a>
            )}
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}

// Modernized loading state
function HeroLoading() {
  const { t } = useLanguage();
  return (
    <section className="relative min-h-screen flex items-center justify-center bg-gradient-to-b from-background to-background/50">
      <div className="container px-4 sm:px-6 text-center w-full max-w-7xl mx-auto">
        <div className="space-y-8">
          <div className="space-y-4 md:space-y-6">
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold text-primary/90 max-w-5xl mx-auto px-2 sm:px-0 leading-tight">
              {t.hero.title}
            </h1>
            <div className="flex flex-wrap justify-center gap-2 sm:gap-3 md:gap-4 px-2 sm:px-0 max-w-2xl mx-auto">
              {[...Array(4)].map((_, i) => (
                <div key={i} className="h-6 sm:h-8 w-16 sm:w-20 rounded-full bg-primary/20 animate-pulse" />
              ))}
            </div>
          </div>
          <p className="max-w-3xl mx-auto text-base sm:text-lg md:text-xl text-muted-foreground/80 font-normal px-4 sm:px-0 text-center">
            {t.hero.subtitle}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <div className="h-11 w-36 rounded-md bg-primary/90 animate-pulse" />
            <div className="h-11 w-36 rounded-md border-2 border-primary/30 animate-pulse" />
          </div>
          {/* Scroll indicator placeholder */}
          <div className="mt-8 sm:mt-12 md:mt-16 lg:mt-20 flex justify-center">
            <div className="h-14 w-14 rounded-full bg-primary/20 animate-pulse" />
          </div>
        </div>
      </div>
    </section>
  );
}

export default function Hero() {
  const [isClient, setIsClient] = useState(false);
  
  useEffect(() => {
    setIsClient(true);
  }, []);
  
  return isClient ? <HeroContent /> : <HeroLoading />;
}