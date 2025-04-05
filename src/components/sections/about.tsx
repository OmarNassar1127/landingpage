"use client";

import React, { useEffect } from "react";
import { motion, useAnimation } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { Button } from "@/components/ui/button";
import { scrollToSection } from "@/lib/scroll-utils";
import { Star, ChevronRight, Sparkles, Layers, Users, BookOpen } from "lucide-react";
import { useLanguage } from "@/lib/i18n/language-context";

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
          className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center"
        >
          <motion.div variants={itemVariants} className="space-y-6">
            <div className="inline-block">
              <motion.div 
                className="w-20 h-1 bg-primary mb-4"
                initial={{ width: 0 }}
                animate={{ width: "5rem" }}
                transition={{ duration: 0.8, delay: 0.2 }}
              />
            </div>
            <motion.h2 
              className="text-3xl md:text-4xl font-bold tracking-tight"
              variants={itemVariants}
            >
              {t.about.title}
            </motion.h2>
            
            <motion.p 
              className="text-muted-foreground"
              variants={itemVariants}
            >
              {t.about.description}
            </motion.p>
            
            <motion.p 
              className="text-muted-foreground"
              variants={itemVariants}
            >
              {t.about.missionDescription}
            </motion.p>
            
            <motion.div 
              variants={itemVariants}
              className="flex flex-col sm:flex-row gap-4"
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
                  className="inline-flex items-center"
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
          
          <motion.div 
            variants={itemVariants} 
            className="bg-muted/30 rounded-xl p-8 shadow-lg dark:bg-muted/10 border border-primary/5"
            whileHover={{ boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)" }}
            transition={{ duration: 0.3 }}
          >
            <motion.h3 
              className="text-2xl font-semibold mb-6"
              variants={itemVariants}
            >
              {t.about.valuesTitle}
            </motion.h3>
            
            <ul className="space-y-6">
              {[
                {
                  title: t.about.valueInnovation,
                  description: t.about.valueInnovationDesc
                },
                {
                  title: t.about.valueQuality,
                  description: t.about.valueQualityDesc
                },
                {
                  title: t.about.valueCollaboration,
                  description: t.about.valueCollaborationDesc
                },
                {
                  title: t.about.valueIntegrity,
                  description: t.about.valueIntegrityDesc
                }
              ].map((value, index) => (
                <motion.li
                  key={index}
                  className="flex gap-4"
                  variants={{
                    hidden: { opacity: 0, x: -20 },
                    visible: { 
                      opacity: 1, 
                      x: 0, 
                      transition: {
                        type: "spring",
                        stiffness: 100,
                        damping: 15,
                        delay: 0.3 + index * 0.1
                      }
                    }
                  }}
                  whileHover={{ x: 5 }}
                  transition={{ duration: 0.2 }}
                >
                  <div className="flex-shrink-0 mt-1">
                    <motion.div
                      initial={{ rotate: 0 }}
                      whileHover={{ rotate: 15, scale: 1.1 }}
                      transition={{ duration: 0.2 }}
                    >
                      {valueIcons[index]}
                    </motion.div>
                  </div>
                  <div>
                    <h4 className="font-medium">{value.title}</h4>
                    <p className="text-sm text-muted-foreground mt-1">{value.description}</p>
                  </div>
                </motion.li>
              ))}
            </ul>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
