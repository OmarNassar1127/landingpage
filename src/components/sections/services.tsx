"use client";

import React from "react";
import { useLanguage } from "@/lib/i18n/language-context";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Check,
  Code,
  Database,
  Bot,
  ShieldCheck,
  BrainCircuit,
  Globe,
  CloudCog,
} from "lucide-react";

const ServiceFeature = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex items-start gap-2 mt-2">
      <Check className="h-5 w-5 text-green-500 shrink-0 mt-0.5" />
      <span className="text-sm text-muted-foreground">{children}</span>
    </div>
  );
};

const Services = () => {
  const { language, t } = useLanguage();

  const ServiceCard = ({
    icon: Icon,
    title,
    description,
    features,
  }: {
    icon: React.ElementType;
    title: string;
    description: string;
    features: string[];
  }) => {
    return (
      <Card className="h-full transition-all duration-300 hover:shadow-lg">
        <CardHeader className="pb-2">
          <div className="flex items-center gap-2 mb-2">
            <Icon className="h-6 w-6 text-primary" />
            <CardTitle className="text-xl">{title}</CardTitle>
          </div>
          <CardDescription className="text-sm">{description}</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-1">
            {features.map((feature, index) => (
              <ServiceFeature key={index}>{feature}</ServiceFeature>
            ))}
          </div>
        </CardContent>
      </Card>
    );
  };

  return (
    <section className="py-20 px-4 md:px-8 max-w-7xl mx-auto">
      <div className="text-center mb-16">
        <h2 className="text-3xl md:text-4xl font-bold mb-4 tracking-tight">
          {t.services.title}
        </h2>
        <p className="text-muted-foreground max-w-3xl mx-auto">
          {t.services.subtitle}
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <ServiceCard
          icon={Bot}
          title={t.services.aiDevelopment.title}
          description={t.services.aiDevelopment.description}
          features={[
            t.services.aiDevelopment.feature1,
            t.services.aiDevelopment.feature2,
            t.services.aiDevelopment.feature3,
          ]}
        />

        <ServiceCard
          icon={ShieldCheck}
          title={t.services.toolIntegrations.title}
          description={t.services.toolIntegrations.description}
          features={[
            t.services.toolIntegrations.feature1,
            t.services.toolIntegrations.feature2,
            t.services.toolIntegrations.feature3,
          ]}
        />

        <ServiceCard
          icon={CloudCog}
          title={t.services.saasDevelopment.title}
          description={t.services.saasDevelopment.description}
          features={[
            t.services.saasDevelopment.feature1,
            t.services.saasDevelopment.feature2,
            t.services.saasDevelopment.feature3,
          ]}
        />

        <ServiceCard
          icon={Database}
          title={t.services.dataAnalytics.title}
          description={t.services.dataAnalytics.description}
          features={[
            t.services.dataAnalytics.feature1,
            t.services.dataAnalytics.feature2,
            t.services.dataAnalytics.feature3,
          ]}
        />

        <ServiceCard
          icon={BrainCircuit}
          title={t.services.customAISolutions.title}
          description={t.services.customAISolutions.description}
          features={[
            t.services.customAISolutions.feature1,
            t.services.customAISolutions.feature2,
            t.services.customAISolutions.feature3,
          ]}
        />

        <ServiceCard
          icon={Globe}
          title={t.services.webDevelopment.title}
          description={t.services.webDevelopment.description}
          features={[
            t.services.webDevelopment.feature1,
            t.services.webDevelopment.feature2,
            t.services.webDevelopment.feature3,
          ]}
        />
      </div>

      <div className="mt-16 text-center">
        <a
          href="#contact"
          className="inline-flex items-center justify-center px-6 py-3 text-base font-medium rounded-md text-white bg-primary shadow-sm hover:bg-primary/90 transition-colors dark:text-black dark:bg-primary dark:hover:bg-primary/90"
        >
          {t.services.ctaButton}
        </a>
      </div>
    </section>
  );
};

export default Services;
