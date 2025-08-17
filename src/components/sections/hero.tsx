"use client";

import React, { useEffect, useState } from "react";
import { motion, useAnimation } from "framer-motion";
import { Button } from "@/components/ui/button";
import { useInView } from "react-intersection-observer";
import { ChevronDown, Check, ArrowRight, Users, Trophy, Clock, Shield } from "lucide-react";
import { scrollToSection } from "@/lib/scroll-utils";
import { Icon } from "@/components/ui/icon";
import { useLanguage } from "@/lib/i18n/language-context";

function HeroContent() {
  const { t, language } = useLanguage();
  const [ref, inView] = useInView({ threshold: 0.1 });
  const controls = useAnimation();
  const [isMounted, setIsMounted] = useState(false);

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
        </>
      )}

      <div className="container relative z-10 px-4 sm:px-6 w-full max-w-7xl mx-auto">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={controls}
          className="flex flex-col items-center space-y-10 text-center"
        >
          {/* Eyebrow text for context */}
          <motion.div 
            variants={itemVariants}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 backdrop-blur-sm"
          >
            <span className="text-xs sm:text-sm font-medium text-primary">
              {language === 'nl' ? 'Voor moderne bedrijven' : 'For modern businesses'}
            </span>
            <Icon icon={Shield} className="h-3 w-3 sm:h-4 sm:w-4 text-primary" />
          </motion.div>

          {/* Hero Content - Mobile Optimized */}
          <motion.div
            variants={itemVariants}
            className="space-y-6 md:space-y-8"
          >
            {/* Main headline - clear value proposition */}
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold tracking-tight max-w-5xl px-2 sm:px-0 leading-[1.1]">
              {language === 'nl' ? (
                <>
                  <span className="text-primary">AI‑automatiseringen</span> die direct tijd besparen<br className="hidden sm:block" />
                  voor <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-purple-600">jouw team</span>
                </>
              ) : (
                <>
                  <span className="text-primary">AI-automations</span> that save time directly<br className="hidden sm:block" />
                  for <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-purple-600">your team</span>
                </>
              )}
            </h1>
          </motion.div>

          <motion.p
            variants={itemVariants}
            className="max-w-2xl text-base sm:text-lg md:text-xl text-muted-foreground font-normal leading-relaxed px-4 sm:px-0 text-center"
          >
            {language === 'nl' ? (
              <>Van interne processen tot AI‑tool. Maatwerksoftware die past bij jullie workflow. <span className="font-semibold text-foreground">Geen templates.</span></>
            ) : (
              <>From internal processes to AI tools. Custom software that fits your workflow. <span className="font-semibold text-foreground">No templates.</span></>
            )}
          </motion.p>

          {/* Key benefits with checkmarks */}
          <motion.div
            variants={itemVariants}
            className="flex flex-col sm:flex-row gap-4 sm:gap-8 justify-center items-center text-sm sm:text-base"
          >
            {(language === 'nl' ? [
              "Gratis demo aanvragen",
              "Live binnen 2 weken",
              "Geen verborgen kosten"
            ] : [
              "Free working demo",
              "Live within 2 weeks",
              "No hidden costs"
            ]).map((benefit, index) => (
              <div key={index} className="flex items-center gap-2">
                <div className="flex items-center justify-center w-5 h-5 rounded-full bg-green-500/20">
                  <Icon icon={Check} className="h-3 w-3 text-green-500" />
                </div>
                <span className="text-muted-foreground">{benefit}</span>
              </div>
            ))}
          </motion.div>

          <motion.div
            variants={itemVariants}
            className="flex flex-col sm:flex-row gap-4 items-center justify-center w-full"
          >
            <Button
              size="lg"
              className="bg-primary hover:bg-primary/90 text-white dark:text-black shadow-lg shadow-primary/25 hover:shadow-xl hover:shadow-primary/30 transition-all duration-300 w-full sm:w-auto min-w-[200px] group"
              asChild
            >
              <a 
                href="#book-meeting" 
                onClick={(e) => {
                  e.preventDefault();
                  scrollToSection("book-meeting");
                }}
                className="flex items-center justify-center gap-2 text-center" 
                aria-label={language === 'nl' ? "Gratis demo aanvragen" : "View our demo"}
              >
                {language === 'nl' ? 'Gratis demo aanvragen' : 'View our demo'}
                <Icon icon={ArrowRight} className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
              </a>
            </Button>
            <Button
              variant="ghost"
              size="lg"
              className="hover:bg-primary/5 transition-colors duration-300 w-full sm:w-auto min-w-[200px]"
              asChild
            >
              <a 
                href="#projects" 
                onClick={(e) => {
                  e.preventDefault();
                  scrollToSection("projects");
                }}
                className="flex items-center justify-center text-center" 
                aria-label={language === 'nl' ? "Bekijk cases" : "View examples"}
              >
                {language === 'nl' ? 'Bekijk cases' : 'View examples'}
              </a>
            </Button>
          </motion.div>

          {/* Social proof */}
          <motion.div
            variants={itemVariants}
            className="flex flex-col items-center gap-4 pt-8 border-t border-border/50"
          >
            <div className="flex flex-col sm:flex-row items-center gap-4 sm:gap-6">
              <div className="flex items-center gap-2">
                <Icon icon={Users} className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm text-muted-foreground">
                  <span className="font-semibold text-foreground">50+</span> {language === 'nl' ? 'tevreden klanten' : 'happy clients'}
                </span>
              </div>
              <div className="hidden sm:block w-px h-4 bg-border" />
              <div className="flex items-center gap-2">
                <Icon icon={Trophy} className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm text-muted-foreground">
                  <span className="font-semibold text-foreground">4.9/5</span> {language === 'nl' ? 'beoordeling' : 'rating'}
                </span>
              </div>
              <div className="hidden sm:block w-px h-4 bg-border" />
              <div className="flex items-center gap-2">
                <Icon icon={Clock} className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm text-muted-foreground">
                  <span className="font-semibold text-foreground">24h</span> response
                </span>
              </div>
            </div>
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