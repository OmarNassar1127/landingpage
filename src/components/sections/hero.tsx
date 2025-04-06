"use client";

import React, { useEffect, useState, useId } from "react";
import { motion, useAnimation, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { useInView } from "react-intersection-observer";
import { ChevronDown, Zap, Globe, Code, Database } from "lucide-react";
import { scrollToSection } from "@/lib/scroll-utils";
import { Icon } from "@/components/ui/icon";
import { useLanguage } from "@/lib/i18n/language-context";

// Separate the actual Hero component from its wrapper to prevent hydration issues
function HeroContent() {
  const { t } = useLanguage();
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });
  
  const controls = useAnimation();
  const [currentIcon, setCurrentIcon] = useState(0);
  const stableId = useId();
  const [isMounted, setIsMounted] = useState(false);
  
  // Fix hydration mismatch by only rendering client-side
  useEffect(() => {
    setIsMounted(true);
  }, []);
  
  const icons = [
    { icon: <Icon icon={Zap} className="h-8 w-8" />, color: "text-yellow-500" },
    { icon: <Icon icon={Globe} className="h-8 w-8" />, color: "text-blue-500" },
    { icon: <Icon icon={Code} className="h-8 w-8" />, color: "text-green-500" },
    { icon: <Icon icon={Database} className="h-8 w-8" />, color: "text-purple-500" },
  ];
  
  useEffect(() => {
    if (inView) {
      controls.start("visible");
    }
    
    // Cycle through tech icons
    const interval = setInterval(() => {
      setCurrentIcon((prev) => (prev + 1) % icons.length);
    }, 2000);
    
    return () => clearInterval(interval);
  }, [inView, controls]);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.3,
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
  
  const backgroundCircleVariants = {
    hidden: { 
      opacity: 0,
      scale: 0,
    },
    visible: (i: number) => ({
      opacity: 0.05 + (i % 5) * 0.01,
      scale: 1,
      transition: {
        delay: i * 0.05,
        duration: 1 + i * 0.1,
        type: "spring",
        stiffness: 50,
      }
    })
  };
  
  const iconVariants = {
    initial: { scale: 0, rotate: -180, opacity: 0 },
    animate: { scale: 1, rotate: 0, opacity: 1 },
    exit: { scale: 0, rotate: 180, opacity: 0 }
  };
  
  const handleScrollDown = (e: React.MouseEvent) => {
    e.preventDefault();
    scrollToSection("trusted-partners");
  };

  return (
    <section
      ref={ref}
      className="relative h-screen flex items-center justify-center overflow-hidden"
    >
      {/* WOW factor: Animated gradient blur - ENHANCED */}
      {isMounted && (
        <motion.div 
          className="absolute -bottom-40 -left-40 w-[700px] h-[700px] rounded-full bg-purple-500/40 blur-[100px] dark:bg-purple-600/40 z-0 will-change-transform will-change-opacity"
          suppressHydrationWarning
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.4, 0.7, 0.4],
          }}
          transition={{
            duration: 15,
            repeat: Infinity,
            repeatType: "reverse",
            useCompositeLayer: true
          }}
        />
      )}
      
      {isMounted && (
        <motion.div 
          className="absolute top-20 -right-40 w-[600px] h-[600px] rounded-full bg-blue-500/40 blur-[100px] dark:bg-blue-600/40 z-0 will-change-transform will-change-opacity"
          suppressHydrationWarning
          animate={{
            scale: [1, 1.3, 1],
            opacity: [0.3, 0.6, 0.3],
          }}
          transition={{
            duration: 12,
            repeat: Infinity,
            repeatType: "reverse",
            delay: 2,
            useCompositeLayer: true
          }}
        />
      )}
      
      {isMounted && (
        <motion.div 
          className="absolute -bottom-20 right-40 w-[500px] h-[500px] rounded-full bg-teal-500/30 blur-[80px] dark:bg-teal-600/30 z-0 will-change-transform will-change-opacity"
          suppressHydrationWarning
          animate={{
            scale: [1, 1.4, 1],
            opacity: [0.3, 0.5, 0.3],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            repeatType: "reverse",
            delay: 1,
            useCompositeLayer: true
          }}
        />
      )}

      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden z-0" suppressHydrationWarning>
        {isMounted && Array.from({ length: 30 }).map((_, i) => (
          <motion.div
            key={`${stableId}-bg-${i}`}
            className="absolute rounded-full bg-primary/5"
            custom={i}
            variants={backgroundCircleVariants}
            initial="hidden"
            animate={controls}
            suppressHydrationWarning
            style={{
              width: `${(i % 5) * 60 + 50}px`,
              height: `${(i % 5) * 60 + 50}px`,
              left: `${(i * 3.33) % 100}%`,
              top: `${(i * 3.33) % 100}%`,
            }}
          />
        ))}
      </div>

      {/* Animated grid lines */}
      <div className="absolute inset-0 z-0">
        <motion.div 
          className="w-full h-full border-l-[0.5px] border-r-[0.5px] border-primary/5"
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 1.5, ease: "easeOut", delay: 0.5 }}
        />
        <motion.div 
          className="w-full h-full border-t-[0.5px] border-b-[0.5px] border-primary/5"
          initial={{ scaleY: 0 }}
          animate={{ scaleY: 1 }}
          transition={{ duration: 1.5, ease: "easeOut", delay: 0.5 }}
        />
      </div>
      
      {/* Enhanced 3D Floating Particles Effect */}
      <div className="absolute inset-0 z-0 overflow-hidden" suppressHydrationWarning>
        {isMounted && Array.from({ length: 30 }).map((_, i) => (
          <motion.div
            key={`${stableId}-particle-${i}`}
            className={`absolute rounded-full will-change-transform will-change-opacity ${
              i % 5 === 0 ? "bg-purple-500/40" : 
              i % 5 === 1 ? "bg-blue-500/40" : 
              i % 5 === 2 ? "bg-teal-500/40" : 
              i % 5 === 3 ? "bg-yellow-500/40" : 
              "bg-white/40"
            }`}
            suppressHydrationWarning
            initial={{
              x: i * 33.3,
              y: i * 33.3,
              opacity: 0.2 + (i % 4) * 0.1,
              scale: 0.1 + (i % 7) * 0.1,
            }}
            animate={{
              y: [null, ((i * 50) % 800) - 400],
              x: [null, ((i * 50) % 800) - 400],
              opacity: [null, 0.3 + (i % 5) * 0.1, 0],
              scale: [null, 0.5 + (i % 2) * 0.25, 0],
            }}
            transition={{
              duration: 20 + (i % 5) * 4,
              repeat: Infinity,
              repeatType: "loop",
              useCompositeLayer: true
            }}
            style={{
              width: `${3 + (i % 10)}px`,
              height: `${3 + (i % 10)}px`,
              filter: `blur(${(i % 3) * 0.5}px)`,
            }}
          />
        ))}
      </div>
      
      {/* Shimmering lines effect */}
      <div className="absolute inset-0 z-0 opacity-10">
        {isMounted && Array.from({ length: 10 }).map((_, i) => (
          <motion.div
            key={`${stableId}-line-${i}`}
            className="absolute h-px bg-gradient-to-r from-transparent via-primary/50 to-transparent will-change-transform"
            style={{
              top: `${10 + i * 8}%`,
              width: "100%",
              transform: "scaleX(0)",
              transformOrigin: i % 2 === 0 ? "0% 50%" : "100% 50%"
            }}
            animate={{
              scaleX: [0, 1, 0]
            }}
            transition={{
              duration: 8 + i * 2,
              repeat: Infinity,
              repeatType: "loop",
              ease: "easeInOut",
              delay: i * 0.5,
              useCompositeLayer: true
            }}
          />
        ))}
      </div>

      <div className="container relative z-10 mx-auto px-4 text-center">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={controls}
          className="flex flex-col items-center space-y-8"
        >
          <motion.div 
            className="mb-6 flex justify-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.5 }}
          >
            <div className="relative h-16 w-16 flex items-center justify-center rounded-full bg-background/80 shadow-lg border border-primary/20">
              {isMounted && (
                <AnimatePresence mode="wait">
                  <motion.div
                    key={currentIcon}
                    className={icons[currentIcon].color}
                    variants={iconVariants}
                    initial="initial"
                    animate="animate"
                    exit="exit"
                    transition={{ type: "spring", stiffness: 200, damping: 20 }}
                  >
                    {icons[currentIcon].icon}
                  </motion.div>
                </AnimatePresence>
              )}
            </div>
          </motion.div>

          <motion.h1
            variants={itemVariants}
            className="text-4xl md:text-6xl font-bold tracking-tight drop-shadow-md"
          >
            {t.hero.title}
          </motion.h1>

          <motion.p
            variants={itemVariants}
            className="max-w-xl text-lg text-muted-foreground/90 backdrop-blur-sm bg-background/20 px-4 py-2 rounded-lg shadow-sm border border-primary/10"
          >
            {t.hero.subtitle}
          </motion.p>

          <motion.div variants={itemVariants} className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
            <Button size="lg" className="backdrop-blur-sm bg-primary/90 hover:bg-primary/80 shadow-lg shadow-primary/20" asChild>
              <a href="#trusted-partners" onClick={(e) => handleScrollDown(e)}>
                {t.hero.ctaButton}
              </a>
            </Button>
            <Button variant="outline" size="lg" className="backdrop-blur-sm bg-background/50 border-primary/30 hover:bg-background/30 shadow-lg" asChild>
              <a href="#contact" onClick={(e) => {
                e.preventDefault();
                scrollToSection("contact");
              }}>
                {t.hero.secondaryButton}
              </a>
            </Button>
          </motion.div>
          
          {/* Button positioned with responsive bottom margin */}
          {isMounted && (
            <div className="absolute bottom-[-60px] sm:bottom-[-80px] md:bottom-[-120px] lg:bottom-[-150px] left-0 right-0 flex justify-center" style={{ zIndex: 100 }}>
              <motion.a 
                href="#trusted-partners" 
                onClick={(e) => handleScrollDown(e)}
                className="flex flex-col items-center hover:text-primary transition-colors bg-background/50 backdrop-blur-lg px-6 py-2 sm:px-8 sm:py-3 rounded-full shadow-lg border border-primary/30 group"
                whileHover={{ y: -3, boxShadow: "0 10px 25px -5px rgba(139,92,246,0.3)" }}
                whileTap={{ y: 0 }}
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 1, delay: 1 }}
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

// Client-side only wrapper to prevent hydration issues
export default function Hero() {
  const { t } = useLanguage();
  const [isClient, setIsClient] = useState(false);
  
  useEffect(() => {
    setIsClient(true);
  }, []);
  
  // On the server or during hydration, render a simple loading placeholder
  if (!isClient) {
    return (
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        <div className="container mx-auto px-4 text-center">
          <div className="flex flex-col items-center space-y-8">
            <div className="mb-6 flex justify-center">
              <div className="relative h-16 w-16 flex items-center justify-center rounded-full bg-background/80 shadow-lg border border-primary/20">
                {/* Empty placeholder for the icon */}
                <div className="h-8 w-8"></div>
              </div>
            </div>
            <h1 className="text-4xl md:text-6xl font-bold tracking-tight drop-shadow-md">
              {t.hero.title}
            </h1>
            <p className="max-w-xl text-lg text-muted-foreground/90 backdrop-blur-sm bg-background/20 px-4 py-2 rounded-lg shadow-sm border border-primary/10">
              {t.hero.subtitle}
            </p>
            {/* Simple placeholder buttons */}
            <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
              <div className="h-11 w-36 rounded-md bg-primary/90"></div>
              <div className="h-11 w-36 rounded-md bg-background/50 border border-primary/30"></div>
            </div>
          </div>
        </div>
      </section>
    );
  }
  
  // On the client, render the full component
  return <HeroContent />;
}