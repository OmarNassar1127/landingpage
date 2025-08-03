"use client";

import React from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowDown, Users, User, Zap } from "lucide-react";
import { ThemeToggle } from "@/components/ui/theme-toggle";

interface ZzpHeroProps {
  isEnglish?: boolean;
}

export default function ZzpHero({ isEnglish = false }: ZzpHeroProps) {
  const content = isEnglish ? {
    badge: "VIRELIO FREELANCE",
    title: "Freelance for AI Projects",
    subtitle: "Omar & Robin",
    description: "Professional freelance developers specializing in AI, backend development, and innovative digital solutions. Available for hire individually or as a team.",
    ctaButton: "View Our CV's",
    hiringSections: {
      individual: "Hire individually",
      team: "Hire as a team",
      flexible: "Flexible collaboration"
    }
  } : {
    badge: "VIRELIO ZZP",
    title: "ZZP'ers voor AI Projecten",
    subtitle: "Omar & Robin", 
    description: "Professionele ZZP'ers gespecialiseerd in AI, backend ontwikkeling en innovatieve digitale oplossingen. Je kunt ons inhuren als duo of apart, afhankelijk van jouw projectbehoeften.",
    ctaButton: "Bekijk Onze CV's",
    hiringSections: {
      individual: "Huur individueel in",
      team: "Huur als team in",
      flexible: "Flexibele samenwerking"
    }
  };

  const scrollToProfiles = () => {
    const profilesSection = document.getElementById('profiles');
    if (profilesSection) {
      profilesSection.scrollIntoView({ 
        behavior: 'smooth',
        block: 'start'
      });
    }
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-background via-background to-primary/5">
      {/* Theme toggle - sticky position with Apple-style design */}
      <div className="fixed top-4 right-4 z-50">
        <div className="bg-white/90 dark:bg-gray-900/90 backdrop-blur-xl rounded-full p-1 shadow-lg border border-gray-200 dark:border-gray-700">
          <ThemeToggle />
        </div>
      </div>
      
      {/* Background decorative elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 rounded-full bg-primary/10 blur-3xl opacity-20" />
        <div className="absolute top-1/2 -left-40 w-96 h-96 rounded-full bg-blue-500/10 blur-3xl opacity-20" />
        <div className="absolute bottom-0 right-1/3 w-64 h-64 rounded-full bg-purple-500/10 blur-3xl opacity-20" />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center rounded-full border px-4 py-1.5 mb-8 bg-primary/5 border-primary/20"
          >
            <span className="text-sm font-semibold text-primary uppercase tracking-wider">
              {content.badge}
            </span>
          </motion.div>

          {/* Main heading */}
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight mb-4"
          >
            {isEnglish ? (
              content.title
            ) : (
              <>
                <span className="block sm:inline">ZZP'ers voor AI</span>{' '}
                <span className="block sm:inline">Projecten</span>
              </>
            )}
          </motion.h1>

          {/* Subtitle */}
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-2xl md:text-3xl lg:text-4xl font-semibold text-primary mb-6"
          >
            {content.subtitle}
          </motion.h2>

          {/* Description */}
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto mb-8 leading-relaxed"
          >
            {content.description}
          </motion.p>

          {/* Hiring Options */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="flex flex-wrap justify-center gap-4 mb-12"
          >
            <Badge variant="outline" className="flex items-center gap-2 px-4 py-2 text-sm bg-blue-500/20 backdrop-blur-sm border-blue-400 text-blue-900 dark:text-blue-100">
              <User className="h-4 w-4 text-blue-600 dark:text-blue-400" />
              {content.hiringSections.individual}
            </Badge>
            <Badge variant="outline" className="flex items-center gap-2 px-4 py-2 text-sm bg-green-500/20 backdrop-blur-sm border-green-400 text-green-900 dark:text-green-100">
              <Users className="h-4 w-4 text-green-600 dark:text-green-400" />
              {content.hiringSections.team}
            </Badge>
            <Badge variant="outline" className="flex items-center gap-2 px-4 py-2 text-sm bg-purple-500/20 backdrop-blur-sm border-purple-400 text-purple-900 dark:text-purple-100">
              <Zap className="h-4 w-4 text-purple-600 dark:text-purple-400" />
              {content.hiringSections.flexible}
            </Badge>
          </motion.div>

          {/* CTA Button */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="mb-16"
          >
            <Button
              size="lg"
              onClick={scrollToProfiles}
              className="bg-primary hover:bg-primary/90 text-white dark:text-black shadow-xl hover:shadow-2xl transition-all duration-300 group px-8 py-6 text-lg"
            >
              {content.ctaButton}
              <ArrowDown className="ml-2 h-5 w-5 group-hover:translate-y-1 transition-transform" />
            </Button>
          </motion.div>

          {/* Scroll indicator */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.7 }}
            className="hidden sm:flex flex-col items-center cursor-pointer"
            onClick={scrollToProfiles}
          >
            <p className="text-sm text-muted-foreground mb-4 uppercase tracking-wider">
              {/* {content.scrollText} */}
            </p>
            <motion.div
              animate={{ y: [0, 8, 0] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
              className="w-6 h-10 border-2 border-muted-foreground/30 rounded-full flex items-start justify-center p-2"
            >
              <div className="w-1 h-3 bg-muted-foreground/60 rounded-full" />
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}