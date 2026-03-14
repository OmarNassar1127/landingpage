"use client";

import React, { useEffect, useState } from "react";
import { motion, useAnimation } from "framer-motion";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useInView } from "react-intersection-observer";
import { scrollToSection } from "@/lib/scroll-utils";
import { Sparkles, Brain, Zap, Cog, TrendingUp, ChevronDown } from "lucide-react";
import { useLanguage } from "@/lib/i18n/language-context";

interface Project {
  id: string;
  title: string;
  quote: string;
  description: string;
  impact: string;
  category: string;
  icon: any;
}

const getProjects = (language: string): Project[] => {
  const isNL = language === "nl";
  return [
    {
      id: "kennisbank-luchtvaart",
      title: isNL ? "Kennisbank — Luchtvaart" : "Knowledge Base — Aviation",
      quote: isNL
        ? "Onze engineers zochten gemiddeld 2 uur per dag naar informatie. Nu vinden ze alles in seconden."
        : "Our engineers spent 2 hours daily searching for information. Now they find everything in seconds.",
      description: isNL
        ? "Alle interne handleidingen en procedures doorzoekbaar. Nieuwe medewerkers vinden antwoorden direct."
        : "All internal manuals and procedures searchable. New employees find answers instantly.",
      impact: isNL ? "2.500+ dagelijkse gebruikers" : "2,500+ daily users",
      category: "AI & RAG",
      icon: Brain,
    },
    {
      id: "meeting-automation",
      title: isNL ? "Meeting Automatisering — Consultancy" : "Meeting Automation — Consultancy",
      quote: isNL
        ? "We besparen 40 uur per maand op meeting follow-ups. Notulen zijn klaar voordat de call afloopt."
        : "We save 40 hours monthly on meeting follow-ups. Minutes are ready before the call ends.",
      description: isNL
        ? "Live transcriptie, automatische notulen en follow-up taken."
        : "Live transcription, automatic minutes and follow-up tasks.",
      impact: isNL ? "5 uur/week bespaard per team" : "5 hours/week saved per team",
      category: "Automation",
      icon: Zap,
    },
    {
      id: "research-agent",
      title: isNL ? "Research Agent — Fintech" : "Research Agent — Fintech",
      quote: isNL
        ? "Marktonderzoek dat voorheen een week kostte, hebben we nu in 10 minuten."
        : "Market research that used to take a week, we now have in 10 minutes.",
      description: isNL
        ? "Van vraag tot compleet rapport met bronvermelding."
        : "From question to complete report with citations.",
      impact: isNL ? "60% minder research tijd" : "60% less research time",
      category: "AI Agents",
      icon: Cog,
    },
    {
      id: "linkedin-outreach",
      title: isNL ? "LinkedIn Tool — B2B SaaS" : "LinkedIn Tool — B2B SaaS",
      quote: isNL
        ? "We gingen van 0 naar 150+ relevante connecties per week. Allemaal gepersonaliseerd."
        : "We went from 0 to 150+ relevant connections per week. All personalized.",
      description: isNL
        ? "Vindt ideale prospects, schrijft gepersonaliseerde berichten."
        : "Finds ideal prospects, writes personalized messages.",
      impact: isNL ? "150% meer inbound leads" : "150% more inbound leads",
      category: "Marketing",
      icon: TrendingUp,
    },
    {
      id: "inventory-bot",
      title: isNL ? "Voorraadbot — Groothandel" : "Inventory Bot — Wholesale",
      quote: isNL
        ? "Zero voorraadtekorten in 6 maanden. De bot bestelt automatisch voordat we uitverkocht raken."
        : "Zero stock shortages in 6 months. The bot orders automatically before we run out.",
      description: isNL
        ? "Monitort voorraad 24/7, voorspelt tekorten en plaatst bestellingen."
        : "Monitors inventory 24/7, predicts shortages and places orders.",
      impact: isNL ? "40 uur/maand bespaard" : "40 hours/month saved",
      category: "Automation",
      icon: Zap,
    },
    {
      id: "onboarding-ai",
      title: isNL ? "Onboarding Assistent — HR Tech" : "Onboarding Assistant — HR Tech",
      quote: isNL
        ? "Nieuwe medewerkers zijn nu in 2 dagen productief in plaats van 2 weken."
        : "New employees are now productive in 2 days instead of 2 weeks.",
      description: isNL
        ? "Begeleidt nieuwe medewerkers door alle systemen."
        : "Guides new employees through all systems.",
      impact: isNL ? "90% snellere onboarding" : "90% faster onboarding",
      category: "AI Agents",
      icon: Cog,
    },
    {
      id: "lead-qualification",
      title: isNL ? "Lead Kwalificatie — B2B SaaS" : "Lead Qualification — B2B SaaS",
      quote: isNL
        ? "Sales besteedt nu alleen tijd aan warme leads. Cold leads krijgen automatisch follow-up."
        : "Sales only spends time on warm leads now. Cold leads get automatic follow-up.",
      description: isNL
        ? "AI analyseert inkomende leads, stuurt gepersonaliseerde e-mails."
        : "AI analyzes incoming leads, sends personalized emails.",
      impact: isNL ? "30% hoger conversie" : "30% higher conversion",
      category: "AI Agents",
      icon: TrendingUp,
    },
  ];
};

export default function Projects() {
  const { language } = useLanguage();
  const [showAll, setShowAll] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 });

  const projects = getProjects(language);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  useEffect(() => {
    const hash = window.location.hash;
    if (hash === "#projects") {
      const timer = setTimeout(() => scrollToSection("projects"), 500);
      return () => clearTimeout(timer);
    }
  }, []);

  const initialCount = isMobile ? 2 : 4;
  const displayedProjects = showAll ? projects : projects.slice(0, initialCount);

  return (
    <section
      id="projects"
      className="py-20 sm:py-28 md:py-32 bg-muted/20 dark:bg-muted/5"
    >
      <div className="container mx-auto px-4 sm:px-6 max-w-7xl">
        {/* Header */}
        <div className="text-center mb-16 sm:mb-20">
          <motion.p
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-sm font-medium text-primary uppercase tracking-widest mb-6"
          >
            <Sparkles className="inline h-4 w-4 mr-2" />
            {language === "nl" ? "Bewezen resultaten" : "Proven results"}
          </motion.p>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.05 }}
            className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-6"
          >
            {language === "nl"
              ? "Projecten met resultaat"
              : "Projects that Make Impact"}
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-muted-foreground text-lg sm:text-xl max-w-2xl mx-auto"
          >
            {language === "nl"
              ? "Van startup tot enterprise — meetbaar resultaat"
              : "From startup to enterprise — measurable results"}
          </motion.p>
        </div>

        {/* Projects Grid */}
        <div ref={ref} className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {displayedProjects.map((project, index) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.06 }}
              whileHover={{ y: -3, transition: { duration: 0.2 } }}
              className="group cursor-pointer"
              onClick={() => scrollToSection("ready-to-start")}
            >
              <div className="h-full p-8 sm:p-10 rounded-3xl border border-border/50 bg-background/80 dark:bg-card/50 backdrop-blur-sm hover:border-primary/30 hover:shadow-2xl hover:shadow-primary/5 transition-all duration-500">
                {/* Top row: category + impact */}
                <div className="flex items-center justify-between mb-5">
                  <Badge
                    variant="secondary"
                    className="text-xs font-medium"
                  >
                    {project.category}
                  </Badge>
                  <span className="text-xs font-bold text-primary">
                    {project.impact}
                  </span>
                </div>

                {/* Quote */}
                <blockquote className="text-lg sm:text-xl font-medium leading-relaxed mb-5 text-foreground/90 italic border-l-2 border-primary/30 pl-5">
                  &ldquo;{project.quote}&rdquo;
                </blockquote>

                {/* Title */}
                <h3 className="font-semibold text-sm mb-2 text-muted-foreground uppercase tracking-wide">
                  {project.title}
                </h3>

                {/* Description */}
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {project.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Show More */}
        {projects.length > initialCount && (
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mt-12 text-center"
          >
            <Button
              size="lg"
              variant="outline"
              onClick={() => setShowAll(!showAll)}
              className="group rounded-xl"
            >
              <span>
                {showAll
                  ? language === "nl"
                    ? "Toon minder"
                    : "Show less"
                  : language === "nl"
                  ? "Bekijk alle projecten"
                  : "View all projects"}
              </span>
              <ChevronDown
                className={`ml-2 h-4 w-4 transition-transform duration-300 ${
                  showAll ? "rotate-180" : "group-hover:translate-y-0.5"
                }`}
              />
            </Button>
          </motion.div>
        )}
      </div>
    </section>
  );
}
