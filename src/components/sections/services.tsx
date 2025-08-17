"use client";

import React, { useEffect, useState } from "react";
import { motion, useAnimation } from "framer-motion";
import { useLanguage } from "@/lib/i18n/language-context";
import { scrollToSection } from "@/lib/scroll-utils";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useInView } from "react-intersection-observer";
import {
  Bot,
  Cog,
  TrendingUp,
  BarChart3,
  Rocket,
  Palette,
  ArrowRight,
  Check,
  Star,
  Zap,
  Clock,
  Shield,
  Users,
  ChevronRight
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
      id: "ai-integration",
      title: isNL ? "AI Integratie" : "AI Integration",
      tagline: isNL ? "Een digitale collega die werk uit handen neemt" : "A digital colleague that takes work off your hands",
      description: isNL 
        ? "Een AI-assistent die je documenten kent, gesprekken omzet in notulen en taken automatisch opvolgt."
        : "An AI assistant that knows your documents, converts conversations to minutes and automatically follows up on tasks.",
      icon: Bot,
      features: [
        isNL ? "Kent al je interne documenten zonder uploaden" : "Knows all your internal documents without uploading",
        isNL ? "Zet gesprekken om in notulen en actiepunten" : "Converts conversations into minutes and action items",
        isNL ? "Beantwoordt vragen en volgt taken automatisch op" : "Answers questions and follows up on tasks automatically",
        isNL ? "Werkt met alle bestaande systemen" : "Works with all existing systems"
      ],
      highlight: isNL ? "Meest gevraagd" : "Most requested",
      gradient: "from-violet-600 via-purple-600 to-indigo-600"
    },
    {
      id: "tool-integrations",
      title: isNL ? "Tool Integraties" : "Tool Integrations",
      tagline: isNL ? "Eén werkplek waarin al je systemen samenwerken" : "One workplace where all your systems work together",
      description: isNL
        ? "Koppelt Slack, Teams, agenda's, documenten en taken. Acties starten vanzelf op basis van wijzigingen."
        : "Links Slack, Teams, calendars, documents and tasks. Actions start automatically based on changes.",
      icon: Cog,
      features: [
        isNL ? "Koppelt Slack, Teams, agenda's, documenten en taken" : "Links Slack, Teams, calendars, documents and tasks",
        isNL ? "Acties starten vanzelf op basis van wijzigingen" : "Actions start automatically based on changes",
        isNL ? "Overzicht zonder zoeken of schakelen" : "Overview without searching or switching",
        isNL ? "Real-time synchronisatie tussen tools" : "Real-time synchronization between tools"
      ],
      highlight: isNL ? "Tijdsbesparing" : "Time saver",
      gradient: "from-blue-600 via-cyan-600 to-teal-600"
    },
    {
      id: "custom-software",
      title: isNL ? "Maatwerk Software" : "Custom Software",
      tagline: isNL ? "Oplossingen die precies doen wat jij nodig hebt" : "Solutions that do exactly what you need",
      description: isNL
        ? "Dashboards, portalen of tools afgestemd op je team. Werkt samen met je bestaande systemen en schaalt mee."
        : "Dashboards, portals or tools tailored to your team. Works with existing systems and scales with you.",
      icon: Rocket,
      features: [
        isNL ? "Dashboards, portalen of tools afgestemd op je team" : "Dashboards, portals or tools tailored to your team",
        isNL ? "Werkt samen met je bestaande systemen en accounts" : "Works with your existing systems and accounts",
        isNL ? "Schaalt mee met je processen en groeit met je bedrijf" : "Scales with your processes and grows with your business",
        isNL ? "100% maatwerk, geen templates" : "100% custom, no templates"
      ],
      highlight: isNL ? "100% Op Maat" : "100% Custom",
      gradient: "from-indigo-600 via-blue-600 to-purple-600"
    },
    {
      id: "data-insights",
      title: isNL ? "Data & Inzicht" : "Data & Insights",
      tagline: isNL ? "Altijd direct antwoord op je cijfers, zonder zoeken" : "Always instant answers to your numbers, no searching",
      description: isNL
        ? "Gekoppeld aan je database of backend. Vraag omzet, trends of teamdata op via Slack of Teams."
        : "Connected to your database or backend. Ask for revenue, trends or team data via Slack or Teams.",
      icon: BarChart3,
      features: [
        isNL ? "Gekoppeld aan je database of backend" : "Connected to your database or backend",
        isNL ? "Vraag omzet, trends of teamdata op via Slack of Teams" : "Ask for revenue, trends or team data via Slack or Teams",
        isNL ? "Antwoorden in gewone taal – binnen 3 seconden" : "Answers in plain language – within 3 seconds",
        isNL ? "Automatische rapportages en alerts" : "Automatic reporting and alerts"
      ],
      highlight: isNL ? "3 sec antwoord" : "3 sec response",
      gradient: "from-orange-600 via-red-600 to-pink-600"
    },
    {
      id: "custom-ai",
      title: isNL ? "Maatwerk AI-oplossingen" : "Custom AI Solutions",
      tagline: isNL ? "AI die zich aanpast aan je werk en collega's" : "AI that adapts to your work and colleagues",
      description: isNL
        ? "AI die patronen herkent en meedenkt in je processen. Reageert per afdeling of rol anders."
        : "AI that recognizes patterns and thinks along in your processes. Responds differently per department or role.",
      icon: TrendingUp,
      features: [
        isNL ? "Herkent patronen en denkt mee in je processen" : "Recognizes patterns and thinks along in your processes",
        isNL ? "Reageert per afdeling of rol anders" : "Responds differently per department or role",
        isNL ? "Neemt terugkerend werk stilletjes over" : "Quietly takes over recurring work",
        isNL ? "Leert continue bij van je team" : "Continuously learns from your team"
      ],
      highlight: isNL ? "Zelf-lerend" : "Self-learning",
      gradient: "from-emerald-600 via-green-600 to-teal-600"
    },
    {
      id: "custom-website",
      title: isNL ? "Website op Maat" : "Custom Website",
      tagline: isNL ? "Een professionelle website, volledig ingericht op jouw doel en doelgroep" : "A professional website, fully tailored to your goal and target audience",
      description: isNL
        ? "Binnen 7 dagen live met een strak en snel ontwerp. Gebouwd om te converteren – van eerste indruk tot actie."
        : "Live within 7 days with sleek and fast design. Built to convert – from first impression to action.",
      icon: Palette,
      features: [
        isNL ? "Binnen 7 dagen live met een strak en snel ontwerp" : "Live within 7 days with sleek and fast design",
        isNL ? "Gebouwd om te converteren – van eerste indruk tot actie" : "Built to convert – from first impression to action",
        isNL ? "SEO integratie inbegrepen" : "SEO integration included",
        isNL ? "Volledig responsive op alle devices" : "Fully responsive on all devices"
      ],
      highlight: isNL ? "7 dagen live" : "7 days live",
      gradient: "from-pink-600 via-rose-600 to-red-600"
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
          <Badge className="mb-4 bg-primary/10 text-primary border-primary/20">
            <Zap className="h-3 w-3 mr-1" />
            {language === 'nl' ? 'Onze Diensten' : 'Our Services'}
          </Badge>
          
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
            {language === 'nl' 
              ? <>Oplossingen die <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-purple-600">transformeren</span></>
              : <>Solutions that <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-purple-600">transform</span></>
            }
          </h2>
          
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            {language === 'nl' 
              ? 'Van AI-integratie tot maatwerk software: wij bouwen oplossingen die écht werken voor jouw team.'
              : 'From AI integration to custom software: we build solutions that actually work for your team.'}
          </p>
        </motion.div>

        {/* Services Bento Grid Style */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6" ref={ref}>
          {/* First row - 2 large cards */}
          <motion.div
            className="lg:col-span-6"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <ServiceCard
              service={services[0]}
              language={language}
              isLarge={true}
              onClick={() => setSelectedService(services[0].id)}
              isSelected={selectedService === services[0].id}
            />
          </motion.div>
          
          <motion.div
            className="lg:col-span-6"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <ServiceCard
              service={services[1]}
              language={language}
              isLarge={true}
              onClick={() => setSelectedService(services[1].id)}
              isSelected={selectedService === services[1].id}
            />
          </motion.div>

          {/* Second row - 3 medium cards */}
          {services.slice(2, 5).map((service, index) => (
            <motion.div
              key={service.id}
              className="lg:col-span-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 + index * 0.1 }}
            >
              <ServiceCard
                service={service}
                language={language}
                onClick={() => setSelectedService(service.id)}
                isSelected={selectedService === service.id}
              />
            </motion.div>
          ))}

          {/* Third row - 1 full width card */}
          <motion.div
            className="lg:col-span-12"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.6 }}
          >
            <ServiceCard
              service={services[5]}
              language={language}
              isFullWidth={true}
              onClick={() => setSelectedService(services[5].id)}
              isSelected={selectedService === services[5].id}
            />
          </motion.div>
        </div>

        {/* Trust Indicators */}
        <motion.div
          className="mt-20 grid grid-cols-2 md:grid-cols-4 gap-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.7 }}
        >
          <div className="text-center">
            <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-black dark:bg-white mb-3">
              <Clock className="h-5 w-5 text-white dark:text-black" />
            </div>
            <div className="text-2xl font-bold mb-1">2-4</div>
            <div className="text-sm text-muted-foreground">
              {language === 'nl' ? 'Weken levertijd' : 'Weeks delivery'}
            </div>
          </div>
          
          <div className="text-center">
            <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-black dark:bg-white mb-3">
              <Shield className="h-5 w-5 text-white dark:text-black" />
            </div>
            <div className="text-2xl font-bold mb-1">100%</div>
            <div className="text-sm text-muted-foreground">
              {language === 'nl' ? 'Garantie' : 'Guarantee'}
            </div>
          </div>
          
          <div className="text-center">
            <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-black dark:bg-white mb-3">
              <Users className="h-5 w-5 text-white dark:text-black" />
            </div>
            <div className="text-2xl font-bold mb-1">50+</div>
            <div className="text-sm text-muted-foreground">
              {language === 'nl' ? 'Tevreden klanten' : 'Happy clients'}
            </div>
          </div>
          
          <div className="text-center">
            <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-black dark:bg-white mb-3">
              <Star className="h-5 w-5 text-white dark:text-black" />
            </div>
            <div className="text-2xl font-bold mb-1">4.9/5</div>
            <div className="text-sm text-muted-foreground">
              {language === 'nl' ? 'Beoordeling' : 'Rating'}
            </div>
          </div>
        </motion.div>

        {/* CTA */}
        <motion.div
          className="mt-20 text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.8 }}
        >
          <h3 className="text-2xl font-bold mb-4">
            {language === 'nl' ? 'Klaar om te beginnen?' : 'Ready to start?'}
          </h3>
          <p className="text-muted-foreground mb-8 max-w-md mx-auto">
            {language === 'nl' 
              ? 'Laten we bespreken hoe we jouw business kunnen transformeren.'
              : "Let's discuss how we can transform your business."}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" onClick={() => scrollToSection('contact')}>
              {language === 'nl' ? 'Start een project' : 'Start a project'}
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
            <Button size="lg" variant="outline" onClick={() => scrollToSection('demo')}>
              {language === 'nl' ? 'Bekijk demo' : 'View demo'}
            </Button>
          </div>
        </motion.div>
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
        ${isFullWidth ? 'min-h-[280px]' : isLarge ? 'min-h-[420px]' : 'min-h-[360px]'}
      `}
      onClick={onClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Background gradient */}
      <div className={`
        absolute inset-0 rounded-2xl bg-gradient-to-br ${service.gradient}
        opacity-5 group-hover:opacity-10 transition-opacity duration-500
      `} />
      
      {/* Card content */}
      <div className={`
        relative h-full p-6 sm:p-8 rounded-2xl border 
        ${isSelected ? 'border-primary bg-primary/5' : 'border-border/50 bg-card/50'}
        backdrop-blur-sm transition-all duration-300
        group-hover:border-primary/50 group-hover:shadow-xl
        ${isFullWidth ? 'flex flex-col lg:flex-row items-center gap-8' : 'flex flex-col'}
      `}>
        {/* Badge */}
        <Badge 
          className="absolute top-4 right-4 bg-background/90 border-primary/20"
          variant="outline"
        >
          {service.highlight}
        </Badge>
        
        {/* Icon and Title Section */}
        <div className={`${isFullWidth ? 'lg:w-1/3' : ''}`}>
          <div className={`
            inline-flex p-3 rounded-xl mb-4
            bg-gradient-to-br ${service.gradient}
          `}>
            <Icon className="h-6 w-6 text-white" />
          </div>
          
          <h3 className="text-xl sm:text-2xl font-bold mb-2">
            {service.title}
          </h3>
          
          <p className="text-sm text-primary font-medium mb-3">
            {service.tagline}
          </p>
          
          <p className="text-muted-foreground text-sm sm:text-base mb-4">
            {service.description}
          </p>
        </div>
        
        {/* Features */}
        <div className={`${isFullWidth ? 'lg:w-2/3' : ''} space-y-3 flex-grow`}>
          {isFullWidth && (
            <h4 className="font-semibold mb-4 text-lg">
              {language === 'nl' ? 'Wat je krijgt:' : 'What you get:'}
            </h4>
          )}
          <div className={`
            ${isFullWidth ? 'grid grid-cols-1 sm:grid-cols-2 gap-3' : 'space-y-3'}
          `}>
            {(isLarge || isFullWidth ? service.features : service.features.slice(0, 2)).map((feature, idx) => (
              <motion.div 
                key={idx} 
                className="flex items-start gap-2"
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: isHovered ? 1 : 0.8, x: 0 }}
                transition={{ delay: idx * 0.05 }}
              >
                <div className="mt-0.5">
                  <Check className="h-4 w-4 text-green-500" />
                </div>
                <span className="text-sm text-muted-foreground">{feature}</span>
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
          <ChevronRight className="h-5 w-5 text-primary" />
        </div>
      </div>
    </div>
  );
};

export default Services;