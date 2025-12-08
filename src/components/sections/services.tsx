"use client";

import React, { useEffect, useState } from "react";
import { motion, useAnimation } from "framer-motion";
import { useLanguage } from "@/lib/i18n/language-context";
import { scrollToSection } from "@/lib/scroll-utils";
import { Button } from "@/components/ui/button";
import { useInView } from "react-intersection-observer";
import {
  Bot,
  Cog,
  TrendingUp,
  BarChart3,
  Rocket,
  ChevronRight,
  ArrowRight,
  Sparkles,
  Brain,
  Zap,
  Clock,
  Shield,
  Users,
  Phone,
  Star,
  Check,
  Video,
  Mail,
  MessageCircle,
  Calendar
} from "lucide-react";

interface Service {
  id: string;
  title: string;
  tagline: string;
  description: string;
  icon: any;
  features: string[];
  highlight: string;
  gradient: string;
}

const getServices = (language: string): Service[] => {
  const isNL = language === 'nl';

  return [
    {
      id: "kennisbanken-rag",
      title: language === 'nl' ? 'Kennisbanken' : 'Knowledge Bases',
      tagline: language === 'nl' ? 'Antwoord in 3 seconden, niet 3 uur' : 'Answer in 3 seconds, not 3 hours',
      description: language === 'nl'
        ? 'Nieuw teamlid vraagt: "Hoe werkt proces X?" - AI doorzoekt 10.000 documenten en geeft het antwoord met bronvermelding. Direct productief.'
        : 'New team member asks: "How does process X work?" - AI searches 10,000 documents and gives the answer with sources. Instantly productive.',
      icon: Bot,
      features: [
        language === 'nl' ? '2 uur zoeken wordt 10 seconden vinden' : '2 hours searching becomes 10 seconds finding',
        language === 'nl' ? 'Onboarding van 2 weken naar 2 dagen' : 'Onboarding from 2 weeks to 2 days',
        language === 'nl' ? 'Met bronnen - geen hallucinaties' : 'With sources - no hallucinations'
      ],
      highlight: language === 'nl' ? 'Populair' : 'Popular',
      gradient: "from-blue-500 to-cyan-500"
    },
    {
      id: "ai-agents",
      title: language === 'nl' ? 'AI Agents' : 'AI Agents',
      tagline: language === 'nl' ? 'Taken die zichzelf afhandelen' : 'Tasks that handle themselves',
      description: language === 'nl'
        ? 'AI die zelfstandig werkt. Leest je inbox, beantwoordt vragen, plant meetings, volgt leads op, zonder dat jij ertussen zit.'
        : 'AI that works independently. Reads your inbox, answers questions, schedules meetings, follows up on leads, without your involvement.',
      icon: Cog,
      features: [
        language === 'nl' ? 'Inbox gelezen en beantwoord voordat jij wakker bent' : 'Inbox read and answered before you wake up',
        language === 'nl' ? 'Leads automatisch gekwalificeerd en ingepland' : 'Leads automatically qualified and scheduled',
        language === 'nl' ? 'Alleen escalaties in je inbox, geen ruis' : 'Only escalations in your inbox, no noise'
      ],
      highlight: "",
      gradient: "from-purple-500 to-pink-500"
    },
    {
      id: "automatiseringen",
      title: language === 'nl' ? 'Automatiseringen' : 'Automations',
      tagline: language === 'nl' ? 'Jij reviewt, AI doet de rest' : 'You review, AI does the rest',
      description: language === 'nl'
        ? 'Na elke meeting staat de samenvatting klaar. Actiepunten in je CRM. Rapport in draft. Jij hoeft alleen nog op "verzenden" te klikken.'
        : 'After every meeting, the summary is ready. Action items in your CRM. Report in draft. You just need to click "send".',
      icon: Rocket,
      features: [
        language === 'nl' ? 'Meeting notities automatisch naar stakeholders' : 'Meeting notes automatically to stakeholders',
        language === 'nl' ? 'Rapporten en analyses in draft, klaar voor review' : 'Reports and analyses in draft, ready for review',
        language === 'nl' ? 'Data tussen systemen gesynchroniseerd zonder copy-paste' : 'Data synced between systems without copy-paste'
      ],
      highlight: "",
      gradient: "from-orange-500 to-red-500"
    }
  ];
};

const Services = () => {
  const { language } = useLanguage();
  const controls = useAnimation();
  const [selectedService, setSelectedService] = useState<string | null>(null);
  const [ref, inView] = useInView({
    triggerOnce: false,
    threshold: 0.1,
  });

  const services = getServices(language);

  useEffect(() => {
    if (inView) {
      controls.start("visible");
    }
  }, [controls, inView]);

  useEffect(() => {
    const hash = window.location.hash;
    if (hash === '#services') {
      const timer = setTimeout(() => {
        scrollToSection('services');
      }, 500);
      return () => clearTimeout(timer);
    }
  }, []);

  return (
    <section id="services" className="py-16 sm:py-20 md:py-24 overflow-hidden">
      <div className="container mx-auto px-4 sm:px-6 max-w-7xl">
        {/* Header */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-4 sm:mb-6 px-4">
            {language === 'nl'
              ? <>Oplossingen die <span className="text-[#3B82F6] dark:text-[#86efac]">werken</span></>
              : <>Solutions that <span className="text-[#3B82F6] dark:text-[#86efac]">work</span></>
            }
          </h2>

          <p className="text-base sm:text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto px-4">
            {language === 'nl'
              ? 'Dit zijn de meest gevraagde oplossingen. We bouwen alles op maat.'
              : 'These are the most requested solutions. We build everything custom.'}
          </p>
        </motion.div>


        {/* Services Clean 3-Column Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6" ref={ref}>
          {services.map((service, index) => (
            <motion.div
              key={service.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <ServiceCard
                service={service}
                language={language}
                onClick={() => setSelectedService(service.id)}
                isSelected={selectedService === service.id}
              />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

// Service Card Component
const ServiceCard = ({
  service,
  language,
  isLarge = false,
  isFullWidth = false,
  onClick,
  isSelected
}: {
  service: Service;
  language: string;
  isLarge?: boolean;
  isFullWidth?: boolean;
  onClick?: () => void;
  isSelected?: boolean;
}) => {
  const Icon = service.icon;
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      className={`
        relative group cursor-pointer h-full
        ${isFullWidth ? 'min-h-[280px]' : isLarge ? 'min-h-[420px]' : 'min-h-[400px]'}
      `}
      onClick={onClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Background gradient - subtle */}
      <div className="absolute inset-0 rounded-2xl bg-slate-500/5 group-hover:bg-slate-500/10 transition-opacity duration-500" />

      {/* Card content */}
      <div className={`
        relative h-full p-5 sm:p-6 rounded-2xl border 
        ${isSelected ? 'border-primary bg-primary/5' : 'border-border/50 bg-card/50'}
        backdrop-blur-sm transition-all duration-300 hover:border-primary/50
        group-hover:border-primary/50 group-hover:shadow-xl
        ${isFullWidth ? 'flex flex-col lg:flex-row items-start gap-6 sm:gap-8' : 'flex flex-col'}
      `}>

        <div className={`${isFullWidth ? 'lg:w-1/3' : ''} flex-shrink-0`}>
          <div className="inline-flex p-3 rounded-xl mb-3">
            <Icon className="h-10 w-10 text-primary" />
          </div>

          <h3 className="text-xl sm:text-2xl font-bold mb-2 text-foreground">
            {service.title}
          </h3>

          <p className="text-sm text-primary dark:text-primary/90 font-semibold mb-3">
            {service.tagline}
          </p>

          <p className="text-foreground/80 dark:text-foreground/70 text-base leading-relaxed mb-5 min-h-[60px]">
            {service.description}
          </p>
        </div>

        <div className={`${isFullWidth ? 'lg:w-2/3' : ''} flex-grow flex flex-col justify-start`}>
          {isFullWidth && (
            <h4 className="font-semibold mb-4 text-lg text-foreground">
              {language === 'nl' ? 'Wat je krijgt' : 'What you get:'}
            </h4>
          )}
          <div className="space-y-3">
            {service.features.map((feature, idx) => (
              <motion.div
                key={idx}
                className="flex items-start gap-3"
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: idx * 0.05 }}
              >
                <div className="mt-0.5">
                  <Check className="h-4 w-4 text-green-500" />
                </div>
                <span className="text-sm text-foreground/70 dark:text-foreground/60">{feature}</span>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Hover indicator */}
        <div className={`
          absolute bottom-6 ${isFullWidth ? 'right-8' : 'right-6'} 
          opacity-0 group-hover:opacity-100 transition-all duration-300
          transform group-hover:translate-x-1
        `}>
        </div>
      </div>
    </div>
  );
};

export default Services;