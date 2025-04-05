"use client";

import React, { useEffect } from "react";
import { motion, useAnimation } from "framer-motion";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useInView } from "react-intersection-observer";
import { formatTechStack } from "@/lib/utils";
import { scrollToSection } from "@/lib/scroll-utils"; 
import { ExternalLink, ArrowRight } from "lucide-react";
import { useLanguage } from "@/lib/i18n/language-context";

interface Project {
  title: string;
  description: string;
  techStack: string;
  learnMoreUrl: string;
}

// This function will be used to get project details based on current language
const getProjects = (t: any) => [
  {
    title: t.projects.aiSolutions.title,
    description: t.projects.aiSolutions.description,
    techStack: "Python TensorFlow Next.js MySQL Laravel OpenAI TypeScript React",
    learnMoreUrl: "#",
  },
  {
    title: t.projects.saasQuotum.title,
    description: t.projects.saasQuotum.description,
    techStack: "React Node.js MongoDB Laravel Stripe TradingView Mailtrap",
    learnMoreUrl: "#",
  },
  {
    title: t.projects.kycIntegrations.title,
    description: t.projects.kycIntegrations.description,
    techStack: "Laravel MySQL Onfido React-Native",
    learnMoreUrl: "#",
  },
  {
    title: t.projects.shopAutomations.title,
    description: t.projects.shopAutomations.description,
    techStack: "Laravel Python Bol.com AWS Marktplaats MongoDB Mailtrap",
    learnMoreUrl: "#",
  },
];

export default function Projects() {
  const { t } = useLanguage();
  const controls = useAnimation();
  const [ref, inView] = useInView({
    triggerOnce: false,
    threshold: 0.1,
  });
  
  // Get projects based on the current language
  const projects = getProjects(t);
  
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
        delayChildren: 0.3,
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
        duration: 0.6,
      },
    },
  };
  
  const techBadgeVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: { 
      opacity: 1, 
      scale: 1,
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 20,
      }
    },
  };

  return (
    <section id="projects" className="py-24 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <motion.div
            initial={{ width: "0%" }}
            animate={{ width: "100%" }}
            transition={{ duration: 1, ease: "easeInOut" }}
            className="h-px bg-primary/20 mb-8 mx-auto max-w-md"
          />
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={controls}
            variants={{
              hidden: { opacity: 0, y: 20 },
              visible: { 
                opacity: 1, 
                y: 0,
                transition: { 
                  type: "spring",
                  stiffness: 100,
                  damping: 20
                }
              }
            }}
            className="text-3xl md:text-4xl font-bold tracking-tight mb-4"
          >
            {t.projects.title}
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={controls}
            variants={{
              hidden: { opacity: 0, y: 20 },
              visible: { 
                opacity: 1, 
                y: 0,
                transition: { 
                  delay: 0.2,
                  type: "spring",
                  stiffness: 100,
                  damping: 20
                }
              }
            }}
            className="text-muted-foreground max-w-2xl mx-auto"
          >
            {t.projects.subtitle}
          </motion.p>
        </div>

        <motion.div
          ref={ref}
          variants={containerVariants}
          initial="hidden"
          animate={controls}
          className="grid grid-cols-1 md:grid-cols-2 gap-8"
        >
          {projects.map((project, index) => (
            <motion.div 
              key={index} 
              variants={itemVariants}
              whileHover={{ 
                y: -10,
                transition: { duration: 0.3 }
              }}
            >
              <Card className="h-full flex flex-col overflow-hidden border-primary/10 dark:border-primary/5">
                <CardHeader className="relative">
                  <motion.div
                    className="absolute -left-2 top-0 h-full w-1 bg-primary"
                    initial={{ height: 0 }}
                    animate={{ height: "100%" }}
                    transition={{ duration: 0.5, delay: 0.2 + index * 0.1 }}
                  />
                  <CardTitle className="flex items-center">
                    {project.title}
                  </CardTitle>
                  <CardDescription>{project.description}</CardDescription>
                </CardHeader>
                <CardContent className="flex-grow">
                  <div className="flex flex-wrap gap-2">
                    {formatTechStack(project.techStack).map((tech, techIndex) => (
                      <motion.span 
                        key={techIndex} 
                        className="tech-badge"
                        data-tech={tech}
                        variants={techBadgeVariants}
                        custom={techIndex}
                        transition={{ delay: 0.1 * techIndex }}
                        whileHover={{ 
                          scale: 1.05,
                          boxShadow: "0 4px 12px rgba(0, 0, 0, 0.2)",
                          y: -2
                        }}
                      >
                        {tech}
                      </motion.span>
                    ))}
                  </div>
                </CardContent>
                <CardFooter>
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    className="group" 
                    asChild
                  >
                    <a href={project.learnMoreUrl} className="inline-flex items-center">
                      {t.projects.viewProject} 
                      <motion.div
                        className="ml-1"
                        initial={{ x: 0 }}
                        whileHover={{ x: 3 }}
                        transition={{ duration: 0.2 }}
                      >
                        <ArrowRight className="h-4 w-4 transform transition-transform group-hover:translate-x-1" />
                      </motion.div>
                    </a>
                  </Button>
                </CardFooter>
              </Card>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
