"use client";

import React from "react";
import { useLanguage } from "@/lib/i18n/language-context";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Target, Settings, Wrench, Users } from "lucide-react";
import { Icon } from "@/components/ui/icon";

export default function WorkshopBenefits() {
  const { t } = useLanguage();

  const BenefitCard = ({
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
        <CardHeader className="pb-4">
          <div className="flex items-center gap-3 mb-2">
            <div className="flex items-center justify-center w-12 h-12 rounded-lg bg-primary/10">
              <Icon icon={IconComponent} className="h-6 w-6 text-primary" />
            </div>
            <CardTitle className="text-xl font-semibold">{title}</CardTitle>
          </div>
        </CardHeader>
        <CardContent className="pt-0">
          <p className="text-muted-foreground font-normal leading-relaxed">{description}</p>
        </CardContent>
      </Card>
    );
  };

  return (
    <section id="workshop-benefits" className="py-20 px-4 md:px-8 max-w-7xl mx-auto">
      <div className="text-center mb-16">
        <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 tracking-tight">
          {t.workshop.benefits.sectionTitle}
        </h2>
        <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto font-normal">
          {t.workshop.benefits.sectionSubtitle}
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <BenefitCard
          icon={Target}
          title={t.workshop.benefits.practical.title}
          description={t.workshop.benefits.practical.description}
        />

        <BenefitCard
          icon={Settings}
          title={t.workshop.benefits.customized.title}
          description={t.workshop.benefits.customized.description}
        />

        <BenefitCard
          icon={Wrench}
          title={t.workshop.benefits.handson.title}
          description={t.workshop.benefits.handson.description}
        />

        <BenefitCard
          icon={Users}
          title={t.workshop.benefits.expert.title}
          description={t.workshop.benefits.expert.description}
        />
      </div>
    </section>
  );
}