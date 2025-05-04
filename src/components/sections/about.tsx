"use client";

import React, { useEffect } from "react";
import { motion, useAnimation } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { Button } from "@/components/ui/button";
import { scrollToSection } from "@/lib/scroll-utils";
import { Star, ChevronRight, Sparkles, Layers, Users, BookOpen } from "lucide-react";
import { useLanguage } from "@/lib/i18n/language-context";
import Image from "next/image";
import { cn } from "@/lib/utils";

export default function About() {
  const { t } = useLanguage();
  const controls = useAnimation();
  const [ref, inView] = useInView({
    triggerOnce: false,
    threshold: 0.1,
  });
  
  useEffect(() => {
    if (inView) {
      controls.start("visible");
    }
  }, [controls, inView]);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { 
        type: "spring",
        stiffness: 100,
        damping: 15,
        duration: 0.6 
      },
    },
  };
  
  const valueIcons = [
    <Sparkles key="sparkles" className="h-6 w-6 text-primary" />,
    <Layers key="layers" className="h-6 w-6 text-primary" />,
    <Users key="users" className="h-6 w-6 text-primary" />,
    <BookOpen key="book" className="h-6 w-6 text-primary" />
  ];

  return (
    <section id="about" className="py-24 relative overflow-hidden">
      {/* Background decorative elements */}
      <motion.div 
        className="absolute -right-40 top-20 w-80 h-80 rounded-full bg-primary/5 dark:bg-primary/10 blur-3xl"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 2 }}
      />
      <motion.div 
        className="absolute -left-40 bottom-20 w-80 h-80 rounded-full bg-primary/5 dark:bg-primary/10 blur-3xl"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 2, delay: 0.5 }}
      />
    
      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          ref={ref}
          variants={containerVariants}
          initial="hidden"
          animate={controls}
          className="flex flex-col space-y-16"
        >
          {/* Header Section */}
          <div className="text-center mx-auto max-w-3xl">
            <div className="inline-block">
              <motion.div 
                className="w-20 h-1 bg-primary mb-4 mx-auto"
                initial={{ width: 0 }}
                animate={{ width: "5rem" }}
                transition={{ duration: 0.8, delay: 0.2 }}
              />
            </div>
            <motion.h2 
              className="text-3xl md:text-4xl font-bold tracking-tight mb-4"
              variants={itemVariants}
            >
              {t.about.title}
            </motion.h2>
            <motion.p 
              className="text-muted-foreground"
              variants={itemVariants}
            >
              {t.about.subtitle}
            </motion.p>
          </div>

          {/* About Content + Founders Image */}
          <motion.div
            variants={containerVariants}
            className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center"
          >
            <motion.div variants={itemVariants} className="space-y-6 order-2 md:order-1 p-6 rounded-lg bg-primary/5 border border-primary/10 shadow-sm mt-4">
              <motion.h3 
                className="text-2xl font-semibold"
                variants={itemVariants}
                id="about-team"
              >
                {t.about.teamTitle}
              </motion.h3>
              
              <motion.div 
                className="text-muted-foreground space-y-4"
                variants={itemVariants}
              >
                <div className="text-muted-foreground space-y-4">
                  {t.about.description.split('\n').map((paragraph, index) => (
                    <p key={index}>{paragraph}</p>
                  ))}
                </div>
              </motion.div>
              
              
              <motion.div 
                variants={itemVariants}
                className="flex flex-col sm:flex-row gap-4 pt-2"
              >
                <Button 
                  size="lg" 
                  asChild
                  className="group"
                >
                  <a 
                    href="#contact" 
                    onClick={(e) => {
                      e.preventDefault();
                      scrollToSection("contact");
                    }}
                    className="inline-flex items-center min-h-[44px] min-w-[44px] px-4 py-2"
                    aria-label={t.hero.secondaryButton}
                  >
                    {t.hero.secondaryButton}
                    <motion.span
                      initial={{ x: 0 }}
                      whileHover={{ x: 3 }}
                      transition={{ duration: 0.2 }}
                      className="ml-2"
                    >
                      <ChevronRight className="h-4 w-4" />
                    </motion.span>
                  </a>
                </Button>
              </motion.div>
            </motion.div>
            
            {/* Founders Image */}
            <motion.div 
              variants={itemVariants} 
              className="relative order-1 md:order-2"
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.3 }}
            >
              <div className="overflow-hidden rounded-xl shadow-lg border border-primary/10 relative aspect-[3/2]">
                <Image
                  src="/founders/Founders.webp"
                  alt="Virelio Founders"
                  fill
                  className="object-cover hover:scale-105 transition-transform duration-500"
                />
              </div>
              <div className="absolute -bottom-4 -right-4 bg-primary/10 backdrop-blur-xl rounded-lg p-4 shadow-lg border border-primary/20">
                <p className="text-sm font-medium">{t.about.theTeam}</p>
              </div>
            </motion.div>
          </motion.div>

          {/* Our Mission Section */}
          <motion.div
            variants={containerVariants}
            className="mt-16 max-w-3xl mx-auto"
          >
            <motion.h3 
                className="text-2xl font-semibold mb-6 text-center"
                variants={itemVariants}
                id="about-mission"
              >
                {t.about.missionTitle}
              </motion.h3>
            
            <motion.p 
              className="text-muted-foreground text-center mb-8"
              variants={itemVariants}
            >
              {t.about.missionDescription}
            </motion.p>
          </motion.div>

          {/* Our Values Section */}
          <motion.div 
            variants={containerVariants}
            className="mt-16"
          >
            <motion.h3 
              className="text-2xl font-semibold mb-8 text-center"
              variants={itemVariants}
              id="about-values"
            >
              {t.about.valuesTitle}
            </motion.h3>
            
            <motion.div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {[
                {
                  title: t.about.valueInnovation,
                  description: t.about.valueInnovationDesc,
                  icon: 0
                },
                {
                  title: t.about.valueQuality,
                  description: t.about.valueQualityDesc,
                  icon: 1
                },
                {
                  title: t.about.valueCollaboration,
                  description: t.about.valueCollaborationDesc,
                  icon: 2
                },
                {
                  title: t.about.valueIntegrity,
                  description: t.about.valueIntegrityDesc,
                  icon: 3
                }
              ].map((value, index) => (
                <motion.div
                  key={index}
                  className={cn(
                    "bg-muted/30 rounded-xl p-6 shadow-md dark:bg-muted/10 border border-primary/5 flex flex-col items-center text-center",
                    "hover:shadow-lg hover:border-primary/20 transition-all duration-300"
                  )}
                  variants={itemVariants}
                  whileHover={{ y: -5 }}
                  transition={{ duration: 0.2 }}
                >
                  <div className="p-3 rounded-full bg-primary/10 mb-4">
                    <motion.div
                      initial={{ rotate: 0 }}
                      whileHover={{ rotate: 15, scale: 1.1 }}
                      transition={{ duration: 0.2 }}
                    >
                      {valueIcons[value.icon]}
                    </motion.div>
                  </div>
                  <h4 className="font-medium text-lg mb-2">{value.title}</h4>
                  <p className="text-sm text-muted-foreground">{value.description}</p>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
