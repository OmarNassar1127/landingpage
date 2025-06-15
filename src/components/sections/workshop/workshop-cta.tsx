"use client";

import React from "react";
import { useLanguage } from "@/lib/i18n/language-context";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { CheckCircle, ArrowRight, Download } from "lucide-react";
import { Icon } from "@/components/ui/icon";
import { scrollToSection } from "@/lib/scroll-utils";

export default function WorkshopCTA() {
  const { t } = useLanguage();

  const handleContactClick = (e: React.MouseEvent) => {
    e.preventDefault();
    scrollToSection("contact");
  };

  const handleBrochureClick = (e: React.MouseEvent) => {
    e.preventDefault();
    // In a real implementation, this would trigger a PDF download
    // For now, we'll scroll to contact
    scrollToSection("contact");
  };

  return (
    <section id="workshop-cta" className="py-20 px-4 md:px-8 max-w-7xl mx-auto">
      <Card className="relative overflow-hidden border-primary/20 bg-gradient-to-br from-primary/5 via-background to-primary/5">
        <CardContent className="p-8 md:p-12">
          <div className="text-center space-y-8">
            {/* Title */}
            <div className="space-y-4">
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight">
                {t.workshop.cta.sectionTitle}
              </h2>
              <p className="text-xl md:text-2xl text-muted-foreground max-w-2xl mx-auto font-normal">
                {t.workshop.cta.sectionSubtitle}
              </p>
              <p className="text-lg text-muted-foreground max-w-3xl mx-auto font-normal">
                {t.workshop.cta.description}
              </p>
            </div>

            {/* Benefits list */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-2xl mx-auto">
              {t.workshop.cta.benefits.map((benefit, index) => (
                <div key={index} className="flex items-center gap-3 text-left">
                  <Icon icon={CheckCircle} className="h-5 w-5 text-green-500 shrink-0" />
                  <span className="text-muted-foreground font-normal">{benefit}</span>
                </div>
              ))}
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                size="lg"
                className="bg-primary hover:bg-primary/90 text-white dark:text-black shadow-lg shadow-primary/25 hover:shadow-xl hover:shadow-primary/30 transition-all duration-300 group"
                onClick={handleContactClick}
              >
                {t.workshop.cta.primaryButton}
                <Icon icon={ArrowRight} className="h-4 w-4 ml-2 group-hover:translate-x-1 transition-transform" />
              </Button>
              <Button
                variant="outline"
                size="lg"
                className="border-2 border-primary/30 hover:bg-primary/5 transition-colors duration-300 group"
                onClick={handleBrochureClick}
              >
                <Icon icon={Download} className="h-4 w-4 mr-2 group-hover:scale-110 transition-transform" />
                {t.workshop.cta.secondaryButton}
              </Button>
            </div>

            {/* Contact info */}
            <div className="text-center text-sm text-muted-foreground space-y-2">
              <p>Contact us directly:</p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <a 
                  href="mailto:info@virelio.tech" 
                  className="hover:text-primary transition-colors"
                >
                  info@virelio.tech
                </a>
                <a 
                  href="tel:+31640446732" 
                  className="hover:text-primary transition-colors"
                >
                  +31 6 4044 6732
                </a>
              </div>
            </div>
          </div>
        </CardContent>

        {/* Background decoration */}
        <div className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/2 w-96 h-96 rounded-full bg-primary/10 blur-3xl" />
        <div className="absolute bottom-0 left-0 translate-y-1/2 -translate-x-1/2 w-96 h-96 rounded-full bg-purple-500/10 blur-3xl" />
      </Card>
    </section>
  );
}