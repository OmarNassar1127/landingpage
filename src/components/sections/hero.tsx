"use client";

import React, { useEffect, useState } from "react";
import { motion, useAnimation, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { useInView } from "react-intersection-observer";
import { ChevronDown, Zap, Globe, Code, Database } from "lucide-react";
import { scrollToSection } from "@/lib/scroll-utils";

export default function Hero() {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });
  
  const controls = useAnimation();
  const [currentIcon, setCurrentIcon] = useState(0);
  const icons = [
    { icon: <Zap className="h-8 w-8" />, color: "text-yellow-500" },
    { icon: <Globe className="h-8 w-8" />, color: "text-blue-500" },
    { icon: <Code className="h-8 w-8" />, color: "text-green-500" },
    { icon: <Database className="h-8 w-8" />, color: "text-purple-500" },
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
    scrollToSection("projects");
  };

  return (
    <section
      ref={ref}
      className="relative h-screen flex items-center justify-center overflow-hidden"
    >
      {/* Background gradient blur effects */}
      <div className="absolute inset-0 bg-gradient-to-b from-background to-background/50 dark:from-background dark:to-background/80 z-0" />
      
      {/* WOW factor: Animated gradient blur - ENHANCED */}
      <motion.div 
        className="absolute -bottom-40 -left-40 w-[700px] h-[700px] rounded-full bg-purple-500/40 blur-[100px] dark:bg-purple-600/40 z-0"
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.4, 0.7, 0.4],
        }}
        transition={{
          duration: 15,
          repeat: Infinity,
          repeatType: "reverse",
        }}
      />
      
      <motion.div 
        className="absolute top-20 -right-40 w-[600px] h-[600px] rounded-full bg-blue-500/40 blur-[100px] dark:bg-blue-600/40 z-0"
        animate={{
          scale: [1, 1.3, 1],
          opacity: [0.3, 0.6, 0.3],
        }}
        transition={{
          duration: 12,
          repeat: Infinity,
          repeatType: "reverse",
          delay: 2,
        }}
      />
      
      <motion.div 
        className="absolute -bottom-20 right-40 w-[500px] h-[500px] rounded-full bg-teal-500/30 blur-[80px] dark:bg-teal-600/30 z-0"
        animate={{
          scale: [1, 1.4, 1],
          opacity: [0.3, 0.5, 0.3],
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          repeatType: "reverse",
          delay: 1,
        }}
      />

      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden z-0">
        {Array.from({ length: 30 }).map((_, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full bg-primary/5"
            custom={i}
            variants={backgroundCircleVariants}
            initial="hidden"
            animate={controls}
            style={{
              width: Math.random() * 300 + 50 + "px",
              height: Math.random() * 300 + 50 + "px",
              left: Math.random() * 100 + "%",
              top: Math.random() * 100 + "%",
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
      <div className="absolute inset-0 z-0 overflow-hidden">
        {Array.from({ length: 30 }).map((_, i) => (
          <motion.div
            key={`particle-${i}`}
            className={`absolute rounded-full ${
              i % 5 === 0 ? "bg-purple-500/40" : 
              i % 5 === 1 ? "bg-blue-500/40" : 
              i % 5 === 2 ? "bg-teal-500/40" : 
              i % 5 === 3 ? "bg-yellow-500/40" : 
              "bg-white/40"
            }`}
            initial={{
              x: Math.random() * window.innerWidth,
              y: Math.random() * window.innerHeight,
              opacity: Math.random() * 0.3 + 0.2,
              scale: Math.random() * 0.6 + 0.1,
            }}
            animate={{
              y: [null, Math.random() * 800 - 400],
              x: [null, Math.random() * 800 - 400],
              opacity: [null, Math.random() * 0.6 + 0.3, 0],
              scale: [null, Math.random() * 0.5 + 0.5, 0],
            }}
            transition={{
              duration: Math.random() * 20 + 20,
              repeat: Infinity,
              repeatType: "loop",
            }}
            style={{
              width: Math.random() * 10 + 3 + "px",
              height: Math.random() * 10 + 3 + "px",
              filter: `blur(${Math.random() * 2}px)`,
            }}
          />
        ))}
      </div>
      
      {/* Shimmering lines effect */}
      <div className="absolute inset-0 z-0 opacity-10">
        {Array.from({ length: 10 }).map((_, i) => (
          <motion.div
            key={`line-${i}`}
            className="absolute h-px bg-gradient-to-r from-transparent via-primary/50 to-transparent"
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
              delay: i * 0.5
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
            </div>
          </motion.div>

          <motion.h1
            variants={itemVariants}
            className="text-4xl md:text-6xl font-bold tracking-tight"
          >
            Innovative Solutions for
            <span className="text-primary block md:inline"> Modern Challenges</span>
          </motion.h1>

          <motion.p
            variants={itemVariants}
            className="max-w-xl text-lg text-muted-foreground"
          >
            We create cutting-edge technologies and platforms that transform businesses
            and enhance user experiences across industries.
          </motion.p>

          <motion.div variants={itemVariants} className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
            <Button size="lg" asChild>
              <a href="#projects" onClick={(e) => handleScrollDown(e)}>
                Explore Projects
              </a>
            </Button>
            <Button variant="outline" size="lg" asChild>
              <a href="#contact" onClick={(e) => {
                e.preventDefault();
                scrollToSection("contact");
              }}>
                Contact Us
              </a>
            </Button>
          </motion.div>
          
          {/* Button positioned at center-bottom, 10px from bottom */}
          <div className="absolute bottom-[-200px] left-0 right-0 flex justify-center" style={{ zIndex: 100 }}>
            <motion.a 
              href="#projects" 
              onClick={(e) => handleScrollDown(e)}
              className="flex flex-col items-center hover:text-primary transition-colors bg-background/70 backdrop-blur-sm px-8 py-3 rounded-full shadow-lg border border-primary/20 group"
              whileHover={{ y: -3, boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1)" }}
              whileTap={{ y: 0 }}
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 1, delay: 1 }}
            >
              <span className="text-sm font-medium ">Discover Our Work</span>
              <motion.div
                animate={{
                  y: [0, 5, 0],
                }}
                transition={{
                  duration: 1.5,
                  repeat: Infinity,
                }}
              >
                <ChevronDown className="h-5 w-5 group-hover:text-primary" />
              </motion.div>
            </motion.a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
