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
  ChevronDown
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

// Simplified, business-focused project data
const getProjects = (language: string): Project[] => {
  const isNL = language === 'nl';
  
  return [
    {
      id: "ai-assistant",
      title: isNL ? "AI‑assistent voor KLM" : "AI Assistant for KLM",
      subtitle: isNL ? "Automatiseert dagelijkse taken en verhoogt de productiviteit" : "Smart workflow automation",
      description: isNL 
        ? "Automatiseert dagelijkse taken en verhoogt de productiviteit"
        : "Intelligent assistant that automates daily tasks and increases team productivity",
      impact: isNL ? "80% snellere documentverwerking" : "80% faster document processing",
      category: "AI",
      icon: Brain,
      color: "from-purple-500 to-pink-500",
      results: [
        isNL ? "5 uur per dag bespaard" : "5 hours saved per day",
        isNL ? "100% nauwkeurigheid" : "100% accuracy",
        isNL ? "24/7 beschikbaar" : "24/7 available"
      ]
    },
    {
      id: "ecommerce-platform",
      title: isNL ? "E-commerce Platform Quotum" : "E-commerce Platform Quotum",
      subtitle: isNL ? "Complete online verkoop oplossing" : "Complete online sales solution",
      description: isNL
        ? "Moderne webshop met geautomatiseerde voorraad, betalingen en klantbeheer"
        : "Modern webshop with automated inventory, payments and customer management",
      impact: isNL ? "3x meer online verkoop" : "3x more online sales",
      category: "E-commerce",
      icon: ShoppingBag,
      color: "from-blue-500 to-cyan-500",
      results: [
        isNL ? "250% ROI in 6 maanden" : "250% ROI in 6 months",
        isNL ? "Volledig geautomatiseerd" : "Fully automated",
        isNL ? "0 downtime" : "0 downtime"
      ]
    },
    {
      id: "kyc-automation",
      title: isNL ? "KYC Verificatie Systeem" : "KYC Verification System",
      subtitle: isNL ? "Veilige klantverificatie" : "Secure customer verification",
      description: isNL
        ? "Geautomatiseerde identiteitsverificatie die fraude voorkomt en compliance waarborgt"
        : "Automated identity verification that prevents fraud and ensures compliance",
      impact: isNL ? "95% minder fraude" : "95% less fraud",
      category: "Security",
      icon: Shield,
      color: "from-green-500 to-emerald-500",
      results: [
        isNL ? "2 min verificatietijd" : "2 min verification time",
        isNL ? "100% compliant" : "100% compliant",
        isNL ? "50% kostenbesparing" : "50% cost savings"
      ]
    },
    {
      id: "shop-automation",
      title: isNL ? "Albert Heijn Bot" : "Albert Heijn Bot",
      subtitle: isNL ? "Winkelautomatisering" : "Shop automation",
      description: isNL
        ? "Slimme bot die voorraad monitort, bestellingen plaatst en prijzen optimaliseert"
        : "Smart bot that monitors inventory, places orders and optimizes prices",
      impact: isNL ? "40 uur per maand bespaard" : "40 hours saved per month",
      category: "Automation",
      icon: Zap,
      color: "from-orange-500 to-red-500",
      results: [
        isNL ? "Zero voorraadtekorten" : "Zero stock shortages",
        isNL ? "30% hogere marge" : "30% higher margin",
        isNL ? "Volledig autonoom" : "Fully autonomous"
      ]
    },
    {
      id: "linkedin-ai",
      title: isNL ? "LinkedIn Growth Tool" : "LinkedIn Growth Tool",
      subtitle: isNL ? "Sociale media automatisering" : "Social media automation",
      description: isNL
        ? "AI-tool die LinkedIn-content genereert, posts plant en engagement verhoogt"
        : "AI tool that generates LinkedIn content, schedules posts and increases engagement",
      impact: isNL ? "10x meer bereik" : "10x more reach",
      category: "Marketing",
      icon: TrendingUp,
      color: "from-indigo-500 to-purple-500",
      results: [
        isNL ? "500% meer leads" : "500% more leads",
        isNL ? "Dagelijks nieuwe content" : "Daily new content",
        isNL ? "Auto-engagement" : "Auto-engagement"
      ]
    },
    {
      id: "klm-catering",
      title: isNL ? "KLM Catering Systeem" : "KLM Catering System",
      subtitle: isNL ? "Supply chain optimalisatie" : "Supply chain optimization",
      description: isNL
        ? "End-to-end cateringsysteem dat planning, inkoop en distributie optimaliseert"
        : "End-to-end catering system that optimizes planning, purchasing and distribution",
      impact: isNL ? "€2M jaarlijkse besparing" : "€2M annual savings",
      category: "Enterprise",
      icon: Plane,
      color: "from-sky-500 to-blue-500",
      results: [
        isNL ? "30% minder verspilling" : "30% less waste",
        isNL ? "Real-time tracking" : "Real-time tracking",
        isNL ? "99.9% leverbetrouwbaarheid" : "99.9% delivery reliability"
      ]
    }
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
  
  // Simply show 3 projects initially, all when expanded
  const displayedProjects = showAll ? projects : projects.slice(0, 3);
  
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
            className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight mb-4"
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
            className="text-muted-foreground text-lg max-w-2xl mx-auto"
          >
            {language === 'nl' 
              ? 'Van startup tot enterprise: meetbaar resultaat dat jouw business vooruit helpt'
              : 'From startup to enterprise: we deliver measurable results that transform your business'}
          </motion.p>
        </div>

        {/* Category filters - removed to avoid confusion */}

        {/* Projects Grid */}
        <motion.div
          ref={ref}
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6 md:gap-8"
        >
          {displayedProjects.map((project, index) => {
            const Icon = project.icon;
            return (
              <motion.div 
                key={project.id} 
                variants={itemVariants}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: index * 0.05 }}
                whileHover={{ 
                  y: -8,
                  transition: { duration: 0.3 }
                }}
                className="group"
              >
                <Card className="h-full flex flex-col overflow-hidden border-border/50 bg-card/50 backdrop-blur-sm hover:shadow-2xl transition-all duration-300">
                  {/* Gradient accent bar */}
                  <div className={`h-1 bg-gradient-to-r ${project.color}`} />
                  
                  <CardHeader className="pb-4">
                    <div className="flex items-start justify-between mb-2">
                      <div className={`p-3 rounded-lg bg-gradient-to-br ${project.color} bg-opacity-10`}>
                        <Icon className="h-6 w-6 text-white" />
                      </div>
                      <Badge variant="secondary" className="text-xs">
                        {project.category}
                      </Badge>
                    </div>
                    
                    <CardTitle className="text-xl font-bold">
                      {project.title}
                    </CardTitle>
                    <p className="text-sm text-muted-foreground font-medium">
                      {project.subtitle}
                    </p>
                  </CardHeader>
                  
                  <CardContent className="flex-grow space-y-4">
                    <p className="text-muted-foreground">
                      {project.description}
                    </p>
                    
                    {/* Impact highlight */}
                    <div className="flex items-center gap-2 p-3 rounded-lg bg-primary/5 border border-primary/10">
                      <TrendingUp className="h-4 w-4 text-primary" />
                      <span className="text-sm font-semibold text-primary">
                        {project.impact}
                      </span>
                    </div>
                    
                    {/* Results */}
                    {project.results && (
                      <div className="space-y-2">
                        {project.results.map((result, idx) => (
                          <div key={idx} className="flex items-center gap-2 text-sm">
                            <div className="w-1.5 h-1.5 rounded-full bg-green-500" />
                            <span className="text-muted-foreground">{result}</span>
                          </div>
                        ))}
                      </div>
                    )}
                  </CardContent>
                  
                  <CardFooter className="pt-4 border-t border-border/50">
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      className="w-full group/btn" 
                      onClick={() => scrollToSection('contact')}
                    >
                      <span>{language === 'nl' ? 'Plan een demo' : 'Discuss your project'}</span>
                      <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover/btn:translate-x-1" />
                    </Button>
                  </CardFooter>
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

        {/* CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={controls}
          variants={{
            visible: { 
              opacity: 1, 
              y: 0,
              transition: { delay: 0.6, duration: 0.5 }
            }
          }}
          className="mt-16 text-center p-8 rounded-2xl bg-gradient-to-r from-primary/10 to-purple-500/10 border border-primary/20"
        >
          <h3 className="text-2xl font-bold mb-2">
            {language === 'nl' ? 'Klaar om te beginnen?' : 'Ready to get started?'}
          </h3>
          <p className="text-muted-foreground mb-6">
            {language === 'nl' 
              ? 'Laten we samen uw volgende succesproject bouwen'
              : "Let's build your next success story together"}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" onClick={() => scrollToSection('contact')}>
              {language === 'nl' ? 'Plan een kennismaking' : 'Start your project'}
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
            <Button size="lg" variant="outline" onClick={() => scrollToSection('book-meeting')}>
              {language === 'nl' ? 'Gratis demo aanvragen' : 'View demo'}
            </Button>
          </div>
        </motion.div>
      </div>
    </section>
  );
}