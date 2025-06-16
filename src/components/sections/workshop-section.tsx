"use client";

import React from "react";
import { useLanguage } from "@/lib/i18n/language-context";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { 
  GraduationCap, 
  Users, 
  Building, 
  ArrowRight, 
  Zap, 
  Target,
  Clock
} from "lucide-react";
import { Icon } from "@/components/ui/icon";
import { motion } from "framer-motion";
import Link from "next/link";

export default function WorkshopSection() {
  const { t } = useLanguage();

  const workshopFeatures = [
    {
      icon: Users,
      title: t.workshopSection.features.handson.title,
      description: t.workshopSection.features.handson.description,
    },
    {
      icon: Target,
      title: t.workshopSection.features.tailored.title,
      description: t.workshopSection.features.tailored.description,
    },
    {
      icon: Clock,
      title: t.workshopSection.features.flexible.title,
      description: t.workshopSection.features.flexible.description,
    },
  ];

  return (
    <section className="py-20 px-4 md:px-8 max-w-7xl mx-auto">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        {/* Left side - Content */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="space-y-8"
        >
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <Icon icon={GraduationCap} className="h-8 w-8 text-primary" />
              <span className="text-sm font-semibold text-primary uppercase tracking-wider">
                {t.workshopSection.badge}
              </span>
            </div>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight">
              {t.workshopSection.title}
            </h2>
            <p className="text-lg md:text-xl text-muted-foreground max-w-2xl font-normal">
              {t.workshopSection.subtitle}
            </p>
          </div>

          {/* Features */}
          <div className="space-y-6">
            {workshopFeatures.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="flex items-start gap-4"
              >
                <div className="bg-primary/10 p-3 rounded-lg shrink-0">
                  <Icon icon={feature.icon} className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold mb-1">{feature.title}</h3>
                  <p className="text-muted-foreground font-normal">{feature.description}</p>
                </div>
              </motion.div>
            ))}
          </div>

          {/* CTA Button */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            viewport={{ once: true }}
            className="pt-4"
          >
            <Link href="/workshop">
              <Button 
                size="mobile" 
                className="bg-primary hover:bg-primary/90 text-white dark:text-black shadow-lg hover:shadow-xl transition-all duration-300 group"
              >
                {t.workshopSection.ctaButton}
                <Icon icon={ArrowRight} className="h-5 w-5 ml-2 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>
          </motion.div>
        </motion.div>

        {/* Right side - Visual/Graphic */}
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          viewport={{ once: true }}
          className="relative"
        >
          <Card className="relative overflow-hidden border-primary/20 bg-gradient-to-br from-primary/5 via-background to-purple-500/5">
            <CardContent className="p-8">
              <div className="space-y-6">
                {/* Header Icon */}
                <div className="text-center">
                  <div className="inline-flex items-center justify-center w-20 h-20 bg-primary/10 rounded-full mb-4">
                    <Icon icon={Building} className="h-10 w-10 text-primary" />
                  </div>
                  <h3 className="text-2xl font-bold mb-2">{t.workshopSection.card.title}</h3>
                  <p className="text-muted-foreground">{t.workshopSection.card.subtitle}</p>
                </div>

                {/* Visual Elements */}
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-background/50 backdrop-blur-sm rounded-lg p-4 text-center border border-primary/10">
                    <div className="w-8 h-8 bg-primary/20 rounded-full mx-auto mb-2 flex items-center justify-center">
                      <Icon icon={Zap} className="h-4 w-4 text-primary" />
                    </div>
                    <p className="text-sm font-medium">{t.workshopSection.card.practical}</p>
                  </div>
                  <div className="bg-background/50 backdrop-blur-sm rounded-lg p-4 text-center border border-primary/10">
                    <div className="w-8 h-8 bg-primary/20 rounded-full mx-auto mb-2 flex items-center justify-center">
                      <Icon icon={Users} className="h-4 w-4 text-primary" />
                    </div>
                    <p className="text-sm font-medium">{t.workshopSection.card.interactive}</p>
                  </div>
                </div>

                {/* Bottom text */}
                <div className="text-center pt-4">
                  <p className="text-sm text-muted-foreground italic">
                    "{t.workshopSection.card.quote}"
                  </p>
                </div>
              </div>
            </CardContent>
            
            {/* Background decorations */}
            <div className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/2 w-32 h-32 rounded-full bg-primary/10 blur-2xl" />
            <div className="absolute bottom-0 left-0 translate-y-1/2 -translate-x-1/2 w-32 h-32 rounded-full bg-purple-500/10 blur-2xl" />
          </Card>
        </motion.div>
      </div>
    </section>
  );
}