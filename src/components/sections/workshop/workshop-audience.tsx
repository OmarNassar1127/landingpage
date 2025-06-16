"use client";

import React from "react";
import { useLanguage } from "@/lib/i18n/language-context";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Crown, Users, Building, Globe } from "lucide-react";
import { Icon } from "@/components/ui/icon";

export default function WorkshopAudience() {
  const { t } = useLanguage();

  const AudienceCard = ({
    icon: IconComponent,
    title,
    description,
  }: {
    icon: React.ElementType;
    title: string;
    description: string;
  }) => {
    return (
      <Card className="h-full transition-all duration-300 hover:shadow-lg hover:shadow-primary/5 border-primary/10">
        <CardHeader className="text-center pb-4">
          <div className="flex justify-center mb-4">
            <div className="flex items-center justify-center w-16 h-16 rounded-full bg-primary/10">
              <Icon icon={IconComponent} className="h-8 w-8 text-primary" />
            </div>
          </div>
          <CardTitle className="text-xl font-semibold">{title}</CardTitle>
        </CardHeader>
        <CardContent className="pt-0 text-center">
          <p className="text-muted-foreground font-normal leading-relaxed">{description}</p>
        </CardContent>
      </Card>
    );
  };

  return (
    <section className="py-20 px-4 md:px-8 max-w-7xl mx-auto">
      <div className="text-center mb-16">
        <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 tracking-tight">
          {t.workshop.audience.sectionTitle}
        </h2>
        <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto font-normal">
          {t.workshop.audience.sectionSubtitle}
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <AudienceCard
          icon={Crown}
          title={t.workshop.audience.executives.title}
          description={t.workshop.audience.executives.description}
        />

        <AudienceCard
          icon={Users}
          title={t.workshop.audience.teams.title}
          description={t.workshop.audience.teams.description}
        />

        <AudienceCard
          icon={Building}
          title={t.workshop.audience.companies.title}
          description={t.workshop.audience.companies.description}
        />

        <AudienceCard
          icon={Globe}
          title={t.workshop.audience.industries.title}
          description={t.workshop.audience.industries.description}
        />
      </div>
    </section>
  );
}