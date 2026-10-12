"use client";

import React from "react";
import { motion, useReducedMotion } from "framer-motion";
import { useLanguage } from "@/lib/i18n/language-context";
import {
  BlendVisual,
  CancelVisual,
  EuShieldVisual,
  LanguageVisual,
  OwnershipVisual,
  SprintVisual,
} from "@/components/sections/why/visuals";

type Lang = "nl" | "en";

type Reason = {
  key: string;
  title: string;
  description: string;
  highlight: string;
  visual: React.ReactNode;
  span?: string;
};

const getReasons = (lang: Lang): Reason[] => {
  const isNL = lang === "nl";
  return [
    {
      key: "data",
      title: isNL ? "Jouw data, jouw eigendom" : "Your data, your ownership",
      description: isNL
        ? "Alles wat we bouwen is 100% van jou. Je krijgt de broncode, de documentatie en volledige controle over je systemen. Geen verborgen licenties."
        : "Everything we build is 100% yours. You get the source code, the documentation and full control over your systems. No hidden licenses.",
      highlight: isNL ? "Volledige broncode + documentatie" : "Full source code + documentation",
      visual: <OwnershipVisual lang={lang} />,
      span: "sm:col-span-2 lg:row-span-2",
    },
    {
      key: "fast",
      title: isNL ? "Live in 1 week" : "Live in 1 week",
      description: isNL
        ? "Geen trajecten van maanden. Intake, prototype, feedback, live. Je ziet binnen dagen resultaat en draait binnen 1 week."
        : "No month-long timelines. Intake, prototype, feedback, live. You see results within days and are running within 1 week.",
      highlight: isNL ? "Sprint-based · snel resultaat" : "Sprint-based · fast results",
      visual: <SprintVisual lang={lang} />,
    },
    {
      key: "privacy",
      title: "Privacy-first",
      description: isNL
        ? "Privacy is ons uitgangspunt, geen bijzaak. AVG-compliant, dataverwerking binnen de EU en open over welke AI-modellen we inzetten."
        : "Privacy is our starting point, not an afterthought. GDPR-compliant, data processing within the EU and open about which AI models we use.",
      highlight: isNL ? "AVG-compliant · EU data" : "GDPR-compliant · EU data",
      visual: <EuShieldVisual />,
    },
    {
      key: "team",
      title: isNL ? "Jong & ervaren" : "Young & experienced",
      description: isNL
        ? "Frisse kennis van de nieuwste AI-tools, samen met jaren ervaring bij grote organisaties. Je krijgt allebei."
        : "Fresh knowledge of the latest AI tools, together with years of experience at large organisations. You get both.",
      highlight: isNL ? "Nieuwste tech + bewezen aanpak" : "Latest tech + proven approach",
      visual: <BlendVisual lang={lang} />,
    },
    {
      key: "languages",
      title: isNL ? "Meertalig team" : "Multilingual team",
      description: isNL
        ? "Nederlands is onze basis, maar we werken net zo makkelijk in het Engels, Arabisch, Spaans of Frans. Handig als je internationaal groeit."
        : "Dutch is our base, but we work just as easily in English, Arabic, Spanish or French. Useful when you grow internationally.",
      highlight: "NL · EN · AR · ES · FR",
      visual: <LanguageVisual />,
    },
    {
      key: "lockin",
      title: isNL ? "Geen lock-in" : "No lock-in",
      description: isNL
        ? "Niet tevreden? Je stopt wanneer je wilt. Je blijft omdat het werkt, niet omdat een contract je vasthoudt."
        : "Not satisfied? You stop whenever you want. You stay because it works, not because a contract holds you.",
      highlight: isNL ? "Maandelijks opzegbaar" : "Cancel anytime",
      visual: <CancelVisual lang={lang} />,
      span: "sm:col-span-2 lg:col-span-1",
    },
  ];
};

const CARD =
  "group relative flex h-full flex-col rounded-2xl border border-black/[0.07] bg-white p-5 sm:p-6 shadow-[0_1px_2px_rgba(23,23,28,0.04),0_16px_40px_-28px_rgba(70,55,210,0.28)] transition-shadow duration-300 hover:shadow-[0_1px_2px_rgba(23,23,28,0.04),0_22px_48px_-26px_rgba(70,55,210,0.4)] dark:border-white/10 dark:bg-background";

const STAGE =
  "rounded-xl border border-black/[0.05] bg-[#fafafb] dark:border-white/10 dark:bg-white/[0.03]";

function Tag({ children }: { children: React.ReactNode }) {
  return (
    <span className="inline-flex items-center self-start rounded-full border border-primary/10 bg-primary/[0.05] px-3 py-1 text-xs font-medium text-primary">
      {children}
    </span>
  );
}

export default function WhyVirelio() {
  const { language } = useLanguage();
  const lang: Lang = language === "nl" ? "nl" : "en";
  const isNL = lang === "nl";
  const reasons = getReasons(lang);
  const reduce = useReducedMotion();

  const rise = (delay = 0) =>
    reduce
      ? {}
      : {
          initial: { opacity: 0, y: 16 },
          whileInView: { opacity: 1, y: 0 },
          viewport: { once: true, amount: 0.3 },
          transition: { duration: 0.5, delay, ease: [0.22, 1, 0.36, 1] },
        };

  const [lead, ...rest] = reasons;

  return (
    <section aria-labelledby="why-virelio-title" className="bg-background py-20 sm:py-28 md:py-32">
      <div className="container mx-auto max-w-6xl px-4 sm:px-6">
        {/* Header */}
        <div className="mx-auto mb-12 max-w-2xl text-center sm:mb-16">
          <motion.p {...rise()} className="mb-5 inline-flex items-center rounded-full border border-primary/10 bg-primary/[0.05] px-3.5 py-1.5 text-xs font-medium text-primary sm:text-sm">
            {isNL ? "Waarom Virelio" : "Why Virelio"}
          </motion.p>
          <motion.h2 {...rise(0.05)} id="why-virelio-title" className="mb-5 text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl">
            {isNL ? (
              <>Gebouwd op <span className="text-primary">vertrouwen</span></>
            ) : (
              <>Built on <span className="text-primary">trust</span></>
            )}
          </motion.h2>
          <motion.p {...rise(0.1)} className="text-lg text-muted-foreground sm:text-xl">
            {isNL
              ? "Geen verrassingen, geen kleine lettertjes. Dit is hoe wij werken."
              : "No surprises, no fine print. This is how we work."}
          </motion.p>
        </div>

        {/* Bento */}
        <ul className="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-5 lg:grid-cols-3">
          <motion.li {...rise()} className={lead.span}>
            <article className={`${CARD} sm:p-8`}>
              <div className="max-w-md">
                <h3 className="mb-2 text-xl font-bold text-foreground sm:text-2xl">{lead.title}</h3>
                <p className="mb-5 text-sm leading-relaxed text-muted-foreground sm:text-base">{lead.description}</p>
                <Tag>{lead.highlight}</Tag>
              </div>
              <div className={`${STAGE} mt-6 flex-1 p-4 sm:p-6`}>
                {lead.visual}
              </div>
            </article>
          </motion.li>

          {rest.map((r, i) => (
            <motion.li key={r.key} {...rise(0.05 + i * 0.05)} className={r.span}>
              <article className={CARD}>
                <div className={`${STAGE} mb-5 flex h-28 items-center justify-center overflow-hidden px-4`}>
                  {r.visual}
                </div>
                <h3 className="mb-1.5 text-lg font-bold text-foreground">{r.title}</h3>
                <p className="mb-5 flex-1 text-sm leading-relaxed text-muted-foreground">{r.description}</p>
                <Tag>{r.highlight}</Tag>
              </article>
            </motion.li>
          ))}
        </ul>
      </div>
    </section>
  );
}
