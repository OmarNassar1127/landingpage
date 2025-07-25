"use client";

import React, { useState } from "react";
import { useLanguage } from "@/lib/i18n/language-context";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  CheckCircle,
  ArrowRight,
  Download,
  Calendar,
  Mail,
} from "lucide-react";
import { Icon } from "@/components/ui/icon";
import WorkshopContact from "./workshop-contact";

export default function WorkshopCTA() {
  const { t } = useLanguage();
  const [activeTab, setActiveTab] = useState<"contact" | "calendar">("contact");

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
                  <Icon
                    icon={CheckCircle}
                    className="h-5 w-5 text-green-500 shrink-0"
                  />
                  <span className="text-muted-foreground font-normal">
                    {benefit}
                  </span>
                </div>
              ))}
            </div>

            {/* Tab Navigation */}
            <div className="flex justify-center mb-8">
              <div className="bg-background/50 backdrop-blur-sm rounded-lg p-1 border border-primary/20">
                <div className="flex">
                  <Button
                    variant={activeTab === "contact" ? "default" : "ghost"}
                    size="sm"
                    onClick={() => setActiveTab("contact")}
                    className={`rounded-md px-6 py-2 transition-all duration-200 ${
                      activeTab === "contact"
                        ? "bg-primary text-white dark:text-black shadow-sm"
                        : "hover:bg-primary/10"
                    }`}
                  >
                    <Icon icon={Mail} className="h-4 w-4 mr-2" />
                    {t.workshop.tabs.contactForm}
                  </Button>
                  <Button
                    variant={activeTab === "calendar" ? "default" : "ghost"}
                    size="sm"
                    onClick={() => setActiveTab("calendar")}
                    className={`rounded-md px-6 py-2 transition-all duration-200 ${
                      activeTab === "calendar"
                        ? "bg-primary text-white dark:text-black shadow-sm"
                        : "hover:bg-primary/10"
                    }`}
                  >
                    <Icon icon={Calendar} className="h-4 w-4 mr-2" />
                    {t.workshop.tabs.quickSchedule}
                  </Button>
                </div>
              </div>
            </div>

            {/* Contact Form - Always visible within the same container */}
            {activeTab === "contact" && (
              <div className="max-w-4xl mx-auto">
                <WorkshopContact />
              </div>
            )}

            {/* Calendly Integration */}
            {activeTab === "calendar" && (
              <div className="max-w-4xl mx-auto">
                <div className="bg-background/80 backdrop-blur-sm rounded-lg p-6 border border-primary/20">
                  <div className="text-center mb-4">
                    <h3 className="text-lg font-semibold">
                      {t.workshop.calendly.title}
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      {t.workshop.calendly.subtitle}
                    </p>
                  </div>
                  <div className="w-full h-[600px] rounded-lg overflow-hidden">
                    <iframe
                      src="https://calendly.com/quotum-consulting/30min"
                      width="100%"
                      height="100%"
                      frameBorder="0"
                      title="Schedule Workshop Consultation"
                      className="rounded-lg"
                    />
                  </div>
                </div>
              </div>
            )}

            {/* Contact info */}
            <div className="text-center text-sm text-muted-foreground space-y-2">
              <p>Contact us directly:</p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <a
                  href="mailto:robin.bril@gmail.com"
                  className="hover:text-primary transition-colors"
                >
                  robin.bril@gmail.com
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
