"use client";

import React, { useEffect, useState } from "react";
import { motion, useAnimation } from "framer-motion";
import { Button } from "@/components/ui/button";
import { useInView } from "react-intersection-observer";
import { ChevronDown, Check, ArrowRight, Users, Trophy, Clock, Shield, MessageCircle } from "lucide-react";
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
      className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-b from-blue-50/30 via-background to-background dark:from-background dark:via-background dark:to-background"
    >
      {/* Subtle pattern overlay */}
      <div className="absolute inset-0 opacity-[0.02] dark:opacity-[0.03]" style={{
        backgroundImage: `radial-gradient(circle at 1px 1px, rgb(59 130 246) 1px, transparent 0)`,
        backgroundSize: '40px 40px'
      }} />

      <div className="container relative z-10 px-4 sm:px-6 w-full max-w-7xl mx-auto">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={controls}
          className="flex flex-col items-center space-y-8 md:space-y-12 text-center"
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
            {/* Main headline - larger and more impactful */}
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-black tracking-tight max-w-5xl px-2 sm:px-0 leading-[1.05]">
              {language === 'nl' ? (
                <>
                  Virelio bouwt <em className="not-italic font-black text-[#3B82F6] dark:text-[#86efac]">AI</em>.
                </>
              ) : (
                <>
                  Virelio builds <em className="not-italic font-black text-[#3B82F6] dark:text-[#86efac]">AI</em>.
                </>
              )}
            </h1>
          </motion.div>

          <motion.p
            variants={itemVariants}
            className="max-w-2xl text-lg sm:text-xl md:text-2xl text-muted-foreground font-normal leading-relaxed px-4 sm:px-0 text-center"
          >
            {language === 'nl' ? (
              <>
                <span className="font-bold text-foreground">Inhuur. Maatwerk. Training.</span><br />
                Van idee tot live in 2 weken.
              </>
            ) : (
              <>
                <span className="font-bold text-foreground">Hire us. Custom-built. We train you.</span><br />
                From idea to live in 2 weeks.
              </>
            )}
          </motion.p>

          {/* Single Primary CTA */}
          <motion.div
            variants={itemVariants}
            className="flex flex-col items-center justify-center gap-4"
          >
            <Button
              size="lg"
              className="bg-primary hover:bg-primary/90 text-primary-foreground shadow-lg hover:shadow-xl transition-all duration-300 px-12 py-6 text-lg group"
              asChild
            >
              <a
                href="#ready-to-start"
                onClick={(e) => {
                  e.preventDefault();
                  scrollToSection("ready-to-start");
                }}
                className="flex items-center justify-center gap-2"
                aria-label={language === 'nl' ? "Plan gratis intake" : "Book free intake"}
              >
                {language === 'nl' ? 'Plan gratis intake' : 'Book free intake'}
                <Icon icon={ArrowRight} className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </a>
            </Button>
          </motion.div>

          {/* Trust Indicators - Single Row */}
          <motion.div
            variants={itemVariants}
            className="flex flex-wrap items-center justify-center gap-6 sm:gap-12 pt-8 border-t border-border/30 max-w-4xl"
          >
            {[
              { label: language === 'nl' ? 'Binnen 4u reactie' : 'Within 4h response', icon: Clock },
              { label: language === 'nl' ? '18 bedrijven geholpen' : '18 companies helped', icon: Users },
              { label: language === 'nl' ? 'Geld-terug garantie' : 'Money-back guarantee', icon: Trophy }
            ].map((stat, idx) => {
              const StatIcon = stat.icon;
              return (
                <div key={idx} className="flex items-center gap-2">
                  <div className="p-1.5 rounded-full bg-primary/10">
                    <StatIcon className="h-4 w-4 text-primary" />
                  </div>
                  <span className="text-sm font-medium text-muted-foreground">
                    {stat.label}
                  </span>
                </div>
              );
            })}
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