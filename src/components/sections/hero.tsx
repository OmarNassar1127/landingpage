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

      <div className="container relative z-10 px-4">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={controls}
          className="flex flex-col items-center space-y-10 text-center"
        >
          {/* Hero Content */}
          <motion.h1
            variants={itemVariants}
            className="text-4xl md:text-6xl font-bold tracking-tight drop-shadow-md"
          >
            {t.hero.title}
          </motion.h1>

          <motion.p
            variants={itemVariants}
            className="max-w-2xl text-lg md:text-xl text-muted-foreground leading-relaxed"
          >
            {t.hero.subtitle}
          </motion.p>

          <motion.div
            variants={itemVariants}
            className="flex flex-col sm:flex-row gap-4"
          >
            <Button
              size="lg"
              className="bg-primary hover:bg-primary/90 text-white dark:text-black shadow-lg shadow-primary/25 hover:shadow-xl hover:shadow-primary/30 transition-all duration-300"
              asChild
            >
              <a href="#trusted-partners" aria-label={t.hero.ctaButton}>
                {t.hero.ctaButton}
              </a>
            </Button>
            <Button
              variant="outline"
              size="lg"
              className="border-2 hover:bg-primary/5 transition-colors duration-300"
              asChild
            >
              <a href="#contact" aria-label={t.hero.secondaryButton}>
                {t.hero.secondaryButton}
              </a>
            </Button>
          </motion.div>

          {/* Scroll indicator */}
          {isMounted && (
            <div className="absolute bottom-[-60px] sm:bottom-[-80px] md:bottom-[-120px] lg:bottom-[-150px] left-0 right-0 flex justify-center" style={{ zIndex: 100 }}>
              <motion.a 
                href="#trusted-partners" 
                onClick={(e) => handleScrollDown(e)}
                className="flex flex-col items-center hover:text-primary transition-colors bg-background/80 px-6 py-2 sm:px-8 sm:py-3 rounded-full shadow border border-primary/30 group min-h-[44px]"
                whileHover={{ y: -3, boxShadow: "0 10px 25px -5px rgba(139,92,246,0.2)" }}
                whileTap={{ y: 0 }}
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 1, delay: 1 }}
                aria-label="Scroll down"
              >
                {/* <span className="text-sm font-medium ">{t.projects.viewMore}</span> */}
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
                    className="h-5 w-5 group-hover:text-primary" 
                  />
                </motion.div>
              </motion.a>
            </div>
          )}
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
      <div className="container px-4 text-center">
        <div className="space-y-8">
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-primary/90">
            {t.hero.title}
          </h1>
          <p className="max-w-2xl mx-auto text-lg text-muted-foreground/80">
            {t.hero.subtitle}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <div className="h-11 w-36 rounded-md bg-primary/90 animate-pulse" />
            <div className="h-11 w-36 rounded-md border-2 border-primary/30 animate-pulse" />
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