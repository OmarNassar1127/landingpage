"use client";

import React from "react";
import { useLanguage } from "@/lib/i18n/language-context";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
// import { Badge } from "@/components/ui/badge";
import { Clock, Users, CheckCircle } from "lucide-react";
import { Icon } from "@/components/ui/icon";

export default function WorkshopFormats() {
  const { t } = useLanguage();

  const FormatCard = ({
    title,
    duration,
    participants,
    description,
    includes,
    featured = false,
  }: {
    title: string;
    duration: string;
    participants: string;
    description: string;
    includes: string[];
    featured?: boolean;
  }) => {
    return (
      <Card className={`h-full transition-all duration-300 hover:shadow-lg relative ${
        featured 
          ? "border-primary shadow-lg shadow-primary/10 scale-105" 
          : "hover:shadow-primary/5 border-primary/10"
      }`}>
        {featured && (
          <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
            <div className="bg-primary text-white px-4 py-1 rounded-full text-sm font-medium">Most Popular</div>
          </div>
        )}
        
        <CardHeader>
          <CardTitle className="text-2xl font-bold mb-4">{title}</CardTitle>
          
          <div className="space-y-2 mb-4">
            <div className="flex items-center gap-2">
              <Icon icon={Clock} className="h-4 w-4 text-primary" />
              <span className="text-sm text-muted-foreground">{duration}</span>
            </div>
            <div className="flex items-center gap-2">
              <Icon icon={Users} className="h-4 w-4 text-primary" />
              <span className="text-sm text-muted-foreground">{participants}</span>
            </div>
          </div>
          
          <p className="text-muted-foreground font-normal">{description}</p>
        </CardHeader>
        
        <CardContent>
          <div className="space-y-3">
            <h4 className="font-semibold text-sm uppercase tracking-wide text-primary">
              What's Included:
            </h4>
            <ul className="space-y-2">
              {includes.map((item, index) => (
                <li key={index} className="flex items-start gap-2">
                  <Icon icon={CheckCircle} className="h-4 w-4 text-green-500 mt-0.5 shrink-0" />
                  <span className="text-sm text-muted-foreground font-normal">{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </CardContent>
      </Card>
    );
  };

  return (
    <section className="py-20 px-4 md:px-8 max-w-7xl mx-auto bg-muted/20">
      <div className="text-center mb-16">
        <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 tracking-tight">
          {t.workshop.formats.sectionTitle}
        </h2>
        <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto font-normal">
          {t.workshop.formats.sectionSubtitle}
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <FormatCard
          title={t.workshop.formats.halfDay.title}
          duration={t.workshop.formats.halfDay.duration}
          participants={t.workshop.formats.halfDay.participants}
          description={t.workshop.formats.halfDay.description}
          includes={t.workshop.formats.halfDay.includes}
        />

        <FormatCard
          title={t.workshop.formats.fullDay.title}
          duration={t.workshop.formats.fullDay.duration}
          participants={t.workshop.formats.fullDay.participants}
          description={t.workshop.formats.fullDay.description}
          includes={t.workshop.formats.fullDay.includes}
          featured={true}
        />

        <FormatCard
          title={t.workshop.formats.multiDay.title}
          duration={t.workshop.formats.multiDay.duration}
          participants={t.workshop.formats.multiDay.participants}
          description={t.workshop.formats.multiDay.description}
          includes={t.workshop.formats.multiDay.includes}
        />
      </div>
    </section>
  );
}