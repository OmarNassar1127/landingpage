"use client";

import React, { useEffect, useState } from "react";
import { motion, useAnimation } from "framer-motion";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useInView } from "react-intersection-observer";
import { scrollToSection } from "@/lib/scroll-utils";
import {
  ExternalLink,
  ArrowRight,
  Sparkles,
  ShoppingBag,
  Shield,
  Zap,
  Brain,
  Plane,
  TrendingUp,
  Clock,
  Users,
  ChevronDown,
  Cog,
  Rocket
} from "lucide-react";
import { useLanguage } from "@/lib/i18n/language-context";

interface Project {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  impact: string;
  category: string;
  icon: any;
  color: string;
  results?: string[];
  caseStudyUrl?: string;
}

// Testimonial-style project showcases - human, persuasive, no jargon
const getProjects = (language: string): Project[] => {
  const isNL = language === 'nl';

  return [
    {
      id: "kennisbank-luchtvaart",
      title: isNL ? "Kennisbank - Luchtvaart" : "Knowledge Base - Aviation",
      subtitle: isNL
        ? "\"Onze engineers zochten gemiddeld 2 uur per dag naar informatie. Nu vinden ze alles in seconden.\""
        : "\"Our engineers spent 2 hours daily searching for information. Now they find everything in seconds.\"",
      description: isNL
        ? "Alle interne handleidingen en procedures doorzoekbaar. Nieuwe medewerkers vinden antwoorden direct."
        : "All internal manuals and procedures searchable. New employees find answers instantly.",
      impact: isNL ? "2.500+ dagelijkse gebruikers" : "2,500+ daily users",
      category: "AI & RAG",
      icon: Brain,
      color: "from-blue-500 to-cyan-500",
      results: []
    },
    {
      id: "meeting-automation",
      title: isNL ? "Meeting Automatisering - Consultancy" : "Meeting Automation - Consultancy",
      subtitle: isNL
        ? "\"We besparen 40 uur per maand op meeting follow-ups. Notulen zijn klaar voordat de call afloopt.\""
        : "\"We save 40 hours monthly on meeting follow-ups. Minutes are ready before the call ends.\"",
      description: isNL
        ? "Live transcriptie, automatische notulen en follow-up taken. Focus op gesprek, niet schrijven."
        : "Live transcription, automatic minutes and follow-up tasks. Focus on conversation, not writing.",
      impact: isNL ? "5 uur/week bespaard per team" : "5 hours/week saved per team",
      category: "Automation",
      icon: Zap,
      color: "from-orange-500 to-red-500",
      results: []
    },
    {
      id: "research-agent",
      title: isNL ? "Research Agent - Fintech" : "Research Agent - Fintech",
      subtitle: isNL
        ? "\"Marktonderzoek dat voorheen een week kostte, hebben we nu in 10 minuten. Met bronnen en alles.\""
        : "\"Market research that used to take a week, we now have in 10 minutes. With sources and all.\"",
      description: isNL
        ? "Van vraag tot compleet rapport met bronvermelding. Analyseert concurrentie, trends en regelgeving."
        : "From question to complete report with citations. Analyzes competition, trends and regulations.",
      impact: isNL ? "60% minder research tijd" : "60% less research time",
      category: "AI Agents",
      icon: Cog,
      color: "from-purple-500 to-indigo-500",
      results: []
    },
    {
      id: "linkedin-outreach",
      title: isNL ? "LinkedIn Tool - B2B SaaS" : "LinkedIn Tool - B2B SaaS",
      subtitle: isNL
        ? "\"We gingen van 0 naar 150+ relevante connecties per week. Allemaal gepersonaliseerd.\""
        : "\"We went from 0 to 150+ relevant connections per week. All personalized.\"",
      description: isNL
        ? "Vindt ideale prospects, schrijft gepersonaliseerde berichten en plant follow-ups automatisch."
        : "Finds ideal prospects, writes personalized messages and schedules follow-ups automatically.",
      impact: isNL ? "150% meer inbound leads" : "150% more inbound leads",
      category: "Marketing",
      icon: TrendingUp,
      color: "from-pink-500 to-rose-500",
      results: []
    },
    {
      id: "inventory-bot",
      title: isNL ? "Voorraadbot - Groothandel" : "Inventory Bot - Wholesale",
      subtitle: isNL
        ? "\"Zero voorraadtekorten in 6 maanden. De bot bestelt automatisch voordat we uitverkocht raken.\""
        : "\"Zero stock shortages in 6 months. The bot orders automatically before we run out.\"",
      description: isNL
        ? "Monitort voorraad 24/7, voorspelt tekorten en plaatst bestellingen bij leveranciers."
        : "Monitors inventory 24/7, predicts shortages and places orders with suppliers.",
      impact: isNL ? "40 uur/maand bespaard" : "40 hours/month saved",
      category: "Automation",
      icon: Zap,
      color: "from-green-500 to-emerald-500",
      results: []
    },
    {
      id: "onboarding-ai",
      title: isNL ? "Onboarding Assistent - HR Tech" : "Onboarding Assistant - HR Tech",
      subtitle: isNL
        ? "\"Nieuwe medewerkers zijn nu in 2 dagen productief in plaats van 2 weken. Alles geautomatiseerd.\""
        : "\"New employees are now productive in 2 days instead of 2 weeks. Everything automated.\"",
      description: isNL
        ? "Begeleidt nieuwe medewerkers door alle systemen, beantwoordt vragen en monitort voortgang."
        : "Guides new employees through all systems, answers questions and monitors progress.",
      impact: isNL ? "90% snellere onboarding" : "90% faster onboarding",
      category: "AI Agents",
      icon: Cog,
      color: "from-cyan-500 to-blue-500",
      results: []
    },
    {
      id: "lead-qualification",
      title: isNL ? "Lead Kwalificatie - B2B SaaS" : "Lead Qualification - B2B SaaS",
      subtitle: isNL
        ? "\"Sales besteedt nu alleen tijd aan warme leads. Cold leads krijgen automatisch follow-up.\""
        : "\"Sales only spends time on warm leads now. Cold leads get automatic follow-up.\"",
      description: isNL
        ? "AI analyseert inkomende leads, stuurt gepersonaliseerde e-mails en plant calls met prospects."
        : "AI analyzes incoming leads, sends personalized emails and schedules calls with prospects.",
      impact: isNL ? "30% hoger conversie" : "30% higher conversion",
      category: "AI Agents",
      icon: TrendingUp,
      color: "from-green-500 to-emerald-500",
      results: []
    },
  ];
};

export default function Projects() {
  const { language } = useLanguage();
  const controls = useAnimation();
  const [showAll, setShowAll] = useState(false);
  const [ref, inView] = useInView({
    triggerOnce: false,
    threshold: 0.1,
  });

  const projects = getProjects(language);

  // Show 4 projects in 2x2 grid, all when expanded
  const displayedProjects = showAll ? projects : projects.slice(0, 4);

  useEffect(() => {
    if (inView) {
      controls.start("visible");
    }
  }, [controls, inView]);

  useEffect(() => {
    const hash = window.location.hash;
    if (hash === '#projects') {
      const timer = setTimeout(() => {
        scrollToSection('projects');
      }, 500);
      return () => clearTimeout(timer);
    }
  }, []);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.08, // Faster stagger
        delayChildren: 0.1, // Less delay
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        stiffness: 200, // Snappier
        damping: 20,
        duration: 0.3, // Faster overall
      },
    },
  };

  return (
    <section id="projects" className="py-16 sm:py-20 md:py-24 bg-gradient-to-b from-background to-muted/20">
      <div className="container mx-auto px-4 sm:px-6 max-w-7xl">
        {/* Header */}
        <div className="text-center mb-12 sm:mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={controls}
            variants={{
              visible: {
                opacity: 1,
                y: 0,
                transition: { duration: 0.5 }
              }
            }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 backdrop-blur-sm mb-6"
          >
            <Sparkles className="h-4 w-4 text-primary" />
            <span className="text-xs sm:text-sm font-medium text-primary">
              {language === 'nl' ? 'Bewezen Resultaten' : 'Proven Results'}
            </span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={controls}
            variants={{
              visible: {
                opacity: 1,
                y: 0,
                transition: { delay: 0.1, duration: 0.5 }
              }
            }}
            className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight mb-4 px-4"
          >
            {language === 'nl' ? 'Projecten met resultaat' : 'Projects that Make Impact'}
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={controls}
            variants={{
              visible: {
                opacity: 1,
                y: 0,
                transition: { delay: 0.2, duration: 0.5 }
              }
            }}
            className="text-muted-foreground text-base sm:text-lg max-w-2xl mx-auto px-4"
          >
            {language === 'nl'
              ? 'Van startup tot enterprise: meetbaar resultaat dat jouw business vooruit helpt'
              : 'From startup to enterprise: we deliver measurable results that transform your business'}
          </motion.p>
        </div>

        {/* Category filters - removed to avoid confusion */}

        {/* Projects Grid - Testimonial Style */}
        <motion.div
          ref={ref}
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-1 lg:grid-cols-2 gap-6"
        >
          {displayedProjects.map((project, index) => {
            return (
              <motion.div
                key={project.id}
                variants={itemVariants}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: index * 0.05 }}
                whileHover={{
                  y: -4,
                  transition: { duration: 0.2 }
                }}
                className="group cursor-pointer"
                onClick={() => scrollToSection('contact')}
              >
                <Card className="h-full flex flex-col border-border bg-card hover:shadow-xl hover:border-primary/30 transition-all duration-300 p-8 rounded-3xl">
                  {/* Category badge */}
                  <div className="flex items-center justify-between mb-4">
                    <Badge variant="secondary" className="text-xs">
                      {project.category}
                    </Badge>
                    <span className="text-xs font-medium text-primary">{project.impact}</span>
                  </div>

                  {/* Quote - Most Prominent */}
                  <blockquote className="text-lg font-medium leading-relaxed mb-4 text-foreground/90 italic border-l-4 border-primary/30 pl-4">
                    {project.subtitle}
                  </blockquote>

                  {/* Title */}
                  <h3 className="font-semibold text-base mb-3 text-muted-foreground">
                    {project.title}
                  </h3>

                  {/* Description */}
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {project.description}
                  </p>
                </Card>
              </motion.div>
            );
          })}
        </motion.div>

        {/* Show More/Less Button */}
        {projects.length > 3 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="mt-12 text-center"
          >
            <Button
              size="lg"
              variant="outline"
              onClick={() => setShowAll(!showAll)}
              className="group"
            >
              <span>
                {showAll
                  ? (language === 'nl' ? 'Toon minder' : 'Show less')
                  : (language === 'nl' ? 'Bekijk alle projecten' : 'View all projects')
                }
              </span>
              <ChevronDown className={`ml-2 h-4 w-4 transition-all duration-300 ${showAll ? 'rotate-180' : 'group-hover:translate-y-1'}`} />
            </Button>
          </motion.div>
        )}
      </div>
    </section>
  );
}