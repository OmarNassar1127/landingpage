"use client";

import React from "react";
import { motion } from "framer-motion";
import { useLanguage } from "@/lib/i18n/language-context";
import {
  Rocket,
  Shield,
  Globe2,
  Users,
  Lock,
  Zap,
} from "lucide-react";

const getReasons = (language: string) => {
  const isNL = language === "nl";
  return [
    {
      icon: Users,
      title: isNL ? "Jong & ervaren" : "Young & experienced",
      description: isNL
        ? "Ons team combineert frisse kennis van de nieuwste AI-technologie met jarenlange ervaring bij grote organisaties. Je krijgt het beste van twee werelden: up-to-date tools én bewezen werkwijzen."
        : "Our team combines fresh knowledge of the latest AI tech with years of experience at major organizations. You get the best of both worlds: cutting-edge tools and proven practices.",
      highlight: isNL ? "Nieuwste tech + bewezen aanpak" : "Latest tech + proven approach",
    },
    {
      icon: Shield,
      title: isNL ? "Jouw data, jouw eigendom" : "Your data, your ownership",
      description: isNL
        ? "Alles wat we bouwen is 100% van jou. Geen vendor lock-in, geen verborgen licenties. Je krijgt de broncode, de documentatie en volledige controle over je systemen."
        : "Everything we build is 100% yours. No vendor lock-in, no hidden licenses. You get the source code, the documentation and full control over your systems.",
      highlight: isNL ? "Volledige broncode + documentatie" : "Full source code + documentation",
    },
    {
      icon: Lock,
      title: isNL ? "Privacy-first" : "Privacy-first",
      description: isNL
        ? "We bouwen met privacy als uitgangspunt, niet als bijzaak. AVG-compliant, data verwerking binnen de EU en transparant over welke AI-modellen we inzetten."
        : "We build with privacy as a starting point, not an afterthought. GDPR-compliant, data processing within the EU and transparent about which AI models we use.",
      highlight: isNL ? "AVG-compliant · EU data" : "GDPR-compliant · EU data",
    },
    {
      icon: Rocket,
      title: isNL ? "Live in 2 weken" : "Live in 2 weeks",
      description: isNL
        ? "Geen maandenlange trajecten. We werken in korte sprints: intake, prototype, feedback, live. Je ziet binnen dagen de eerste resultaten en bent binnen 2 weken operationeel."
        : "No month-long timelines. We work in short sprints: intake, prototype, feedback, live. You see first results within days and are operational within 2 weeks.",
      highlight: isNL ? "Sprint-based · snel resultaat" : "Sprint-based · fast results",
    },
    {
      icon: Globe2,
      title: isNL ? "Meertalig team" : "Multilingual team",
      description: isNL
        ? "Nederlands is onze thuisbasis, maar we werken net zo makkelijk in het Engels, Arabisch, Spaans of Frans. Internationaal schalen? Geen probleem."
        : "Dutch is our home base, but we work just as easily in English, Arabic, Spanish or French. Scaling internationally? No problem.",
      highlight: isNL ? "NL · EN · AR · ES · FR" : "NL · EN · AR · ES · FR",
    },
    {
      icon: Zap,
      title: isNL ? "Geen lock-in" : "No lock-in",
      description: isNL
        ? "Niet tevreden? Je kunt op elk moment stoppen. We geloven dat je bij ons blijft omdat het werkt, niet omdat je vastzit aan een contract."
        : "Not satisfied? You can stop at any time. We believe you stay with us because it works, not because you're stuck in a contract.",
      highlight: isNL ? "Maandelijks opzegbaar" : "Cancel anytime",
    },
  ];
};

export default function WhyVirelio() {
  const { language } = useLanguage();
  const isNL = language === "nl";
  const reasons = getReasons(language);

  return (
    <section className="py-20 sm:py-28 md:py-32 bg-muted/20 dark:bg-muted/5">
      <div className="container mx-auto px-4 sm:px-6 max-w-7xl">
        {/* Header */}
        <div className="text-center mb-16 sm:mb-20">
          <motion.p
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-sm font-medium text-primary uppercase tracking-widest mb-4"
          >
            {isNL ? "Waarom Virelio" : "Why Virelio"}
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.05 }}
            className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-6"
          >
            {isNL ? (
              <>
                Gebouwd op{" "}
                <span className="text-primary">vertrouwen</span>
              </>
            ) : (
              <>
                Built on{" "}
                <span className="text-primary">trust</span>
              </>
            )}
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-muted-foreground text-lg sm:text-xl max-w-2xl mx-auto"
          >
            {isNL
              ? "Geen verrassingen, geen kleine lettertjes. Dit is hoe wij werken."
              : "No surprises, no fine print. This is how we work."}
          </motion.p>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {reasons.map((reason, i) => {
            const ReasonIcon = reason.icon;
            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.06 }}
                className="group p-6 sm:p-8 rounded-2xl border border-border/50 bg-background hover:border-primary/20 hover:shadow-lg hover:shadow-primary/5 transition-all duration-300 h-full flex flex-col"
              >
                <div className="w-11 h-11 rounded-xl bg-primary/10 flex items-center justify-center mb-5 group-hover:scale-110 transition-transform duration-300">
                  <ReasonIcon className="w-5 h-5 text-primary" />
                </div>

                <h3 className="text-lg font-bold text-foreground mb-2">
                  {reason.title}
                </h3>

                <p className="text-sm text-muted-foreground leading-relaxed flex-1">
                  {reason.description}
                </p>

                <div className="inline-flex items-center px-3 py-1 rounded-full bg-primary/5 border border-primary/10 mt-5">
                  <span className="text-xs font-medium text-primary">
                    {reason.highlight}
                  </span>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
