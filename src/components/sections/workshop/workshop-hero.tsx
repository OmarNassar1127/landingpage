"use client";

import React, { useEffect, useState } from "react";
import { motion, useAnimation } from "framer-motion";
import { Button } from "@/components/ui/button";
import { useInView } from "react-intersection-observer";
import { BrainCircuit, Users, Target, TrendingUp } from "lucide-react";
import { scrollToSection } from "@/lib/scroll-utils";
import { Icon } from "@/components/ui/icon";
import { useLanguage } from "@/lib/i18n/language-context";

export default function WorkshopHero() {
  const { t } = useLanguage();
  const [ref, inView] = useInView({ threshold: 0.1 });
  const controls = useAnimation();
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
    if (inView) controls.start("visible");
  }, [inView, controls]);

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

  const handleBookWorkshop = (e: React.MouseEvent) => {
    e.preventDefault();
    scrollToSection("workshop-cta");
  };

  const handleLearnMore = (e: React.MouseEvent) => {
    e.preventDefault();
    scrollToSection("workshop-benefits");
  };

  return (
    <section
      ref={ref}
      className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-b from-background to-background/50 pt-16"
    >
      {/* Background effects */}
      {isMounted && (
        <>
          <motion.div
            className="absolute inset-0 z-0"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1 }}
          >
            <div className="absolute top-0 -left-40 w-[600px] h-[600px] rounded-full bg-blue-500/20 mix-blend-multiply blur-[128px] animate-pulse" />
            <div className="absolute bottom-0 -right-40 w-[600px] h-[600px] rounded-full bg-purple-500/20 mix-blend-multiply blur-[128px] animate-pulse" />
          </motion.div>

          {/* Grid overlay */}
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
          {/* AI Icon */}
          <motion.div
            variants={itemVariants}
            className="flex items-center justify-center w-24 h-24 rounded-full bg-primary/10 border border-primary/20"
          >
            <Icon icon={BrainCircuit} className="h-12 w-12 text-primary" />
          </motion.div>

          {/* Hero Content */}
          <motion.h1
            variants={itemVariants}
            className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight"
          >
            {t.workshop.title}
          </motion.h1>

          <motion.p
            variants={itemVariants}
            className="max-w-2xl text-xl md:text-2xl text-muted-foreground font-normal"
          >
            {t.workshop.subtitle}
          </motion.p>

          <motion.p
            variants={itemVariants}
            className="max-w-3xl text-lg text-muted-foreground/80 font-normal"
          >
            {t.workshop.heroDescription}
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            variants={itemVariants}
            className="flex flex-col sm:flex-row gap-4"
          >
            <Button
              size="lg"
              className="bg-primary hover:bg-primary/90 text-white dark:text-black shadow-lg shadow-primary/25 hover:shadow-xl hover:shadow-primary/30 transition-all duration-300"
              onClick={handleBookWorkshop}
            >
              {t.workshop.ctaButton}
            </Button>
            <Button
              variant="outline"
              size="lg"
              className="border-2 hover:bg-primary/5 transition-colors duration-300"
              onClick={handleLearnMore}
            >
              {t.workshop.learnMoreButton}
            </Button>
          </motion.div>

          {/* Key benefits preview */}
          <motion.div
            variants={itemVariants}
            className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-16 max-w-4xl"
          >
            <div className="flex flex-col items-center space-y-3 p-6 rounded-lg bg-background/50 backdrop-blur-sm border border-primary/10">
              <Icon icon={Users} className="h-8 w-8 text-primary" />
              <h3 className="font-semibold">Hands-on Training</h3>
              <p className="text-sm text-muted-foreground text-center">Work with real AI tools and build practical solutions</p>
            </div>
            <div className="flex flex-col items-center space-y-3 p-6 rounded-lg bg-background/50 backdrop-blur-sm border border-primary/10">
              <Icon icon={Target} className="h-8 w-8 text-primary" />
              <h3 className="font-semibold">Customized Content</h3>
              <p className="text-sm text-muted-foreground text-center">Tailored to your industry and specific challenges</p>
            </div>
            <div className="flex flex-col items-center space-y-3 p-6 rounded-lg bg-background/50 backdrop-blur-sm border border-primary/10">
              <Icon icon={TrendingUp} className="h-8 w-8 text-primary" />
              <h3 className="font-semibold">Immediate Results</h3>
              <p className="text-sm text-muted-foreground text-center">Implement solutions right after the workshop</p>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}