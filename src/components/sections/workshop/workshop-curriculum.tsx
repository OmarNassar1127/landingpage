"use client";

import React from "react";
import { useLanguage } from "@/lib/i18n/language-context";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BookOpen, Cpu, Lightbulb, Rocket } from "lucide-react";
import { Icon } from "@/components/ui/icon";

export default function WorkshopCurriculum() {
  const { t } = useLanguage();

  const ModuleCard = ({
    icon: IconComponent,
    title,
    topics,
    moduleNumber,
  }: {
    icon: React.ElementType;
    title: string;
    topics: string[];
    moduleNumber: number;
  }) => {
    return (
      <Card className="h-full transition-all duration-300 hover:shadow-lg hover:shadow-primary/5 border-primary/10">
        <CardHeader>
          <div className="flex items-center gap-3 mb-3">
            <div className="flex items-center justify-center w-10 h-10 rounded-full bg-primary text-white dark:text-black text-sm font-bold">
              {moduleNumber}
            </div>
            <Icon icon={IconComponent} className="h-6 w-6 text-primary" />
          </div>
          <CardTitle className="text-xl font-semibold">{title}</CardTitle>
        </CardHeader>
        <CardContent>
          <ul className="space-y-3">
            {topics.map((topic, index) => (
              <li key={index} className="flex items-start gap-2">
                <div className="w-1.5 h-1.5 rounded-full bg-primary mt-2.5 shrink-0" />
                <span className="text-sm text-muted-foreground font-normal">{topic}</span>
              </li>
            ))}
          </ul>
        </CardContent>
      </Card>
    );
  };

  return (
    <section className="py-20 px-4 md:px-8 max-w-7xl mx-auto bg-muted/20">
      <div className="text-center mb-16">
        <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 tracking-tight">
          {t.workshop.curriculum.sectionTitle}
        </h2>
        <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto font-normal">
          {t.workshop.curriculum.sectionSubtitle}
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <ModuleCard
          icon={BookOpen}
          title={t.workshop.curriculum.module1.title}
          topics={t.workshop.curriculum.module1.topics}
          moduleNumber={1}
        />

        <ModuleCard
          icon={Cpu}
          title={t.workshop.curriculum.module2.title}
          topics={t.workshop.curriculum.module2.topics}
          moduleNumber={2}
        />

        <ModuleCard
          icon={Lightbulb}
          title={t.workshop.curriculum.module3.title}
          topics={t.workshop.curriculum.module3.topics}
          moduleNumber={3}
        />

        <ModuleCard
          icon={Rocket}
          title={t.workshop.curriculum.module4.title}
          topics={t.workshop.curriculum.module4.topics}
          moduleNumber={4}
        />
      </div>
    </section>
  );
}