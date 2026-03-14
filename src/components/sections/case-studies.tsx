"use client";

import React from "react";
import { motion } from "framer-motion";
import { useLanguage } from "@/lib/i18n/language-context";
import {
  ArrowUpRight,
  MessageCircle,
  Bot,
  Users,
  TrendingUp,
  Zap,
  Globe,
  Activity,
  Clock,
  BarChart3,
  Sparkles,
  Shield,
  Eye,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { scrollToSection } from "@/lib/scroll-utils";

interface CaseStudy {
  name: string;
  url: string;
  logo: string;
  logoBg: string;
  tagline: string;
  description: string;
  challenge: string;
  solution: string;
  results: { label: string; value: string }[];
  tech: string[];
  color: string;
  gradient: string;
  icon: any;
  screenshotBg: string;
}

const getCaseStudies = (language: string): CaseStudy[] => {
  const isNL = language === "nl";
  return [
    {
      name: "ZapBot",
      url: "https://zapbot.nl",
      logo: "/images/clients/whatsapp.svg",
      logoBg: "",
      tagline: isNL
        ? "WhatsApp AI-assistent voor bedrijven"
        : "WhatsApp AI assistant for businesses",
      description: isNL
        ? "ZapBot is een volledig geautomatiseerde WhatsApp-bot die klantvragen beantwoordt, afspraken inplant en leads opvolgt — 24/7, zonder menselijke tussenkomst."
        : "ZapBot is a fully automated WhatsApp bot that answers customer questions, schedules appointments and follows up on leads — 24/7, without human intervention.",
      challenge: isNL
        ? "Bedrijven misten 60% van hun inkomende WhatsApp-berichten buiten kantooruren. Leads gingen verloren en klanten voelden zich genegeerd."
        : "Businesses were missing 60% of incoming WhatsApp messages outside office hours. Leads were lost and customers felt ignored.",
      solution: isNL
        ? "We bouwden een AI-agent die naadloos integreert met WhatsApp Business. De bot begrijpt context, schakelt tussen talen en escaleert naar een medewerker wanneer nodig."
        : "We built an AI agent that seamlessly integrates with WhatsApp Business. The bot understands context, switches between languages and escalates to a human when needed.",
      results: isNL
        ? [
            { label: "Reactietijd", value: "<3 sec" },
            { label: "Klanttevredenheid", value: "94%" },
            { label: "Leads opgevangen", value: "+210%" },
            { label: "Kosten bespaard", value: "€2.800/mnd" },
          ]
        : [
            { label: "Response time", value: "<3 sec" },
            { label: "Satisfaction", value: "94%" },
            { label: "Leads captured", value: "+210%" },
            { label: "Cost saved", value: "€2,800/mo" },
          ],
      tech: ["WhatsApp API", "AI/NLP", "Node.js", "Multi-language"],
      color: "text-emerald-500",
      gradient: "from-emerald-500/10 to-emerald-500/5",
      icon: MessageCircle,
      screenshotBg: "bg-gradient-to-br from-emerald-950 to-emerald-900",
    },
    {
      name: "Slouch",
      url: "https://slouch.pro",
      logo: "/images/clients/slouch-logo-round.png",
      logoBg: "bg-[#1a2332]",
      tagline: isNL
        ? "AI-houdingscorrectie via je webcam"
        : "AI posture correction via your webcam",
      description: isNL
        ? "Slouch.pro detecteert je houding in real-time via de webcam en geeft subtiele nudges wanneer je slecht zit — volledig privé, alles draait lokaal in de browser."
        : "Slouch.pro detects your posture in real-time via webcam and gives gentle nudges when you slouch — fully private, everything runs locally in the browser.",
      challenge: isNL
        ? "Remote workers zitten 10+ uur per dag achter een scherm. Bestaande oplossingen zoals wearables kosten €80+, zijn onhandig en vereisen opladen."
        : "Remote workers sit 10+ hours a day behind a screen. Existing solutions like wearables cost €80+, are clunky, and require charging.",
      solution: isNL
        ? "We bouwden een AI-app die Google MediaPipe gebruikt om via je bestaande webcam je houding te analyseren. Geen hardware, geen data die je apparaat verlaat — 100% privacy-first."
        : "We built an AI app using Google MediaPipe to analyze your posture via your existing webcam. No hardware, no data leaving your device — 100% privacy-first.",
      results: isNL
        ? [
            { label: "Actieve gebruikers", value: "2.800+" },
            { label: "Verbetering", value: "2 weken" },
            { label: "Privacygarantie", value: "100%" },
            { label: "Setup-tijd", value: "10 sec" },
          ]
        : [
            { label: "Active users", value: "2,800+" },
            { label: "Improvement", value: "2 weeks" },
            { label: "Privacy guarantee", value: "100%" },
            { label: "Setup time", value: "10 sec" },
          ],
      tech: ["MediaPipe", "TensorFlow.js", "React", "Supabase"],
      color: "text-teal-500",
      gradient: "from-teal-500/10 to-teal-500/5",
      icon: Activity,
      screenshotBg: "bg-gradient-to-br from-slate-950 to-slate-900",
    },
  ];
};

// Fake browser preview for ZapBot
function ZapBotPreview({ language }: { language: string }) {
  const isNL = language === "nl";
  return (
    <div className="space-y-2">
      {/* WhatsApp-style chat bubbles */}
      <div className="flex justify-end">
        <div className="bg-emerald-500/20 rounded-2xl rounded-tr-sm px-3 py-2 max-w-[75%]">
          <p className="text-[11px] text-foreground/70">
            {isNL
              ? "Hoi, ik wil graag een afspraak inplannen voor volgende week"
              : "Hi, I'd like to schedule an appointment for next week"}
          </p>
          <span className="text-[8px] text-muted-foreground/40 float-right mt-0.5">
            14:32
          </span>
        </div>
      </div>
      <div className="flex justify-start">
        <div className="bg-muted/60 rounded-2xl rounded-tl-sm px-3 py-2 max-w-[75%]">
          <div className="flex items-center gap-1 mb-1">
            <Bot className="w-2.5 h-2.5 text-emerald-500" />
            <span className="text-[9px] font-semibold text-emerald-500">
              ZapBot
            </span>
          </div>
          <p className="text-[11px] text-foreground/70">
            {isNL
              ? "Natuurlijk! Ik heb deze slots beschikbaar: Ma 10:00, Di 14:00, Wo 09:30. Welke past het beste? 📅"
              : "Of course! I have these slots available: Mon 10:00, Tue 14:00, Wed 09:30. Which works best? 📅"}
          </p>
          <span className="text-[8px] text-muted-foreground/40 float-right mt-0.5">
            14:32
          </span>
        </div>
      </div>
      <div className="flex justify-end">
        <div className="bg-emerald-500/20 rounded-2xl rounded-tr-sm px-3 py-2 max-w-[75%]">
          <p className="text-[11px] text-foreground/70">
            {isNL ? "Dinsdag 14:00 graag!" : "Tuesday 14:00 please!"}
          </p>
          <span className="text-[8px] text-muted-foreground/40 float-right mt-0.5">
            14:33
          </span>
        </div>
      </div>
      <div className="flex justify-start">
        <div className="bg-muted/60 rounded-2xl rounded-tl-sm px-3 py-2 max-w-[75%]">
          <div className="flex items-center gap-1 mb-1">
            <Bot className="w-2.5 h-2.5 text-emerald-500" />
            <span className="text-[9px] font-semibold text-emerald-500">
              ZapBot
            </span>
          </div>
          <p className="text-[11px] text-foreground/70">
            {isNL
              ? "Gepland! ✅ Je ontvangt een bevestiging per e-mail. Nog vragen? Ik sta 24/7 klaar!"
              : "Booked! ✅ You'll receive a confirmation by email. Any questions? I'm here 24/7!"}
          </p>
          <span className="text-[8px] text-muted-foreground/40 float-right mt-0.5">
            14:33
          </span>
        </div>
      </div>
    </div>
  );
}

// Fake browser preview for Slouch.pro
function SlouchPreview({ language }: { language: string }) {
  const isNL = language === "nl";
  return (
    <div className="space-y-2.5">
      {/* Status header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <motion.div
            className="w-6 h-6 rounded-full bg-emerald-500/20 flex items-center justify-center"
            animate={{ scale: [1, 1.1, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            <Eye className="w-3 h-3 text-emerald-400" />
          </motion.div>
          <div>
            <div className="text-[10px] font-semibold text-foreground/80">
              {isNL ? "Houding: Goed" : "Posture: Good"}
            </div>
            <div className="text-[8px] text-emerald-400">
              {isNL ? "Camera actief" : "Camera active"}
            </div>
          </div>
        </div>
        <div className="flex items-center gap-1">
          <Shield className="w-3 h-3 text-teal-400/60" />
          <span className="text-[8px] text-teal-400/60">
            {isNL ? "Lokaal" : "Local"}
          </span>
        </div>
      </div>

      {/* Posture score chart */}
      <div className="rounded-lg bg-muted/30 p-2">
        <div className="text-[8px] text-muted-foreground/50 mb-1.5">
          {isNL ? "Houdingsscore vandaag" : "Posture score today"}
        </div>
        <div className="flex items-end gap-[3px] h-10">
          {[60, 72, 68, 85, 78, 90, 88, 92, 86, 94, 91, 96].map((h, i) => (
            <motion.div
              key={i}
              className={`flex-1 rounded-sm ${h > 80 ? "bg-teal-500/60" : "bg-amber-400/40"}`}
              initial={{ height: 0 }}
              whileInView={{ height: `${h}%` }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 + i * 0.05, duration: 0.4 }}
            />
          ))}
        </div>
        <div className="flex justify-between mt-1">
          <span className="text-[7px] text-muted-foreground/30">09:00</span>
          <span className="text-[7px] text-muted-foreground/30">12:00</span>
          <span className="text-[7px] text-muted-foreground/30">15:00</span>
          <span className="text-[7px] text-muted-foreground/30">
            {isNL ? "Nu" : "Now"}
          </span>
        </div>
      </div>

      {/* Stats row */}
      <div className="grid grid-cols-3 gap-1.5">
        {[
          {
            label: isNL ? "Sessie" : "Session",
            value: "2u 14m",
          },
          {
            label: isNL ? "Nudges" : "Nudges",
            value: "3",
          },
          {
            label: "Score",
            value: "92%",
          },
        ].map((s, i) => (
          <div
            key={i}
            className="rounded-md bg-muted/30 p-1.5 text-center"
          >
            <div className="text-[10px] font-bold text-foreground/70">
              {s.value}
            </div>
            <div className="text-[7px] text-muted-foreground/50">
              {s.label}
            </div>
          </div>
        ))}
      </div>

      {/* Nudge notification */}
      <motion.div
        className="rounded-lg bg-teal-500/10 border border-teal-500/20 p-2"
        initial={{ opacity: 0, y: 4 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.8 }}
      >
        <div className="flex items-center gap-1 mb-1">
          <Sparkles className="w-2.5 h-2.5 text-teal-400" />
          <span className="text-[9px] font-semibold text-teal-400">
            {isNL ? "Laatste nudge" : "Latest nudge"}
          </span>
        </div>
        <p className="text-[10px] text-foreground/60 leading-relaxed">
          {isNL
            ? "Zit recht! Je schouders zakken naar voren. Even stretchen? 🧘"
            : "Sit up! Your shoulders are dropping forward. Time for a stretch? 🧘"}
        </p>
      </motion.div>
    </div>
  );
}

function CaseStudyCard({
  study,
  index,
  language,
}: {
  study: CaseStudy;
  index: number;
  language: string;
}) {
  const isNL = language === "nl";
  const StudyIcon = study.icon;
  const isReversed = index % 2 === 1;

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="group"
    >
      <div
        className={`grid lg:grid-cols-2 gap-8 lg:gap-12 items-center ${isReversed ? "lg:direction-rtl" : ""}`}
      >
        {/* Content side */}
        <div className={`space-y-6 ${isReversed ? "lg:order-2" : ""}`}>
          {/* Logo + name */}
          <div className="flex items-center gap-3">
            <div className={`w-12 h-12 rounded-2xl overflow-hidden shrink-0 ${study.logoBg}`}>
              <img
                src={study.logo}
                alt={`${study.name} logo`}
                className="w-full h-full object-cover scale-125"
              />
            </div>
            <div>
              <h3 className="text-2xl font-bold text-foreground">
                {study.name}
              </h3>
              <p className="text-sm text-muted-foreground">{study.tagline}</p>
            </div>
          </div>

          {/* Challenge & Solution */}
          <div className="space-y-4">
            <div>
              <h4 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2">
                {isNL ? "De uitdaging" : "The challenge"}
              </h4>
              <p className="text-sm text-foreground/70 leading-relaxed">
                {study.challenge}
              </p>
            </div>
            <div>
              <h4 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2">
                {isNL ? "Onze oplossing" : "Our solution"}
              </h4>
              <p className="text-sm text-foreground/70 leading-relaxed">
                {study.solution}
              </p>
            </div>
          </div>

          {/* Results grid */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {study.results.map((r, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.3 + i * 0.08 }}
                className="text-center p-3 rounded-xl bg-muted/30 border border-border/30"
              >
                <div className={`text-lg font-bold ${study.color}`}>
                  {r.value}
                </div>
                <div className="text-[10px] text-muted-foreground uppercase tracking-wider mt-0.5">
                  {r.label}
                </div>
              </motion.div>
            ))}
          </div>

          {/* Tech tags + CTA */}
          <div className="flex flex-wrap items-center gap-2">
            {study.tech.map((t, i) => (
              <span
                key={i}
                className="px-2.5 py-1 rounded-lg bg-muted/40 border border-border/30 text-[11px] text-muted-foreground"
              >
                {t}
              </span>
            ))}
            <a
              href={study.url}
              target="_blank"
              rel="noopener noreferrer"
              className={`ml-auto inline-flex items-center gap-1 text-sm font-medium ${study.color} hover:underline underline-offset-4`}
            >
              {isNL ? "Bekijk live" : "View live"}
              <ArrowUpRight className="w-3.5 h-3.5" />
            </a>
          </div>
        </div>

        {/* Preview side */}
        <div className={`${isReversed ? "lg:order-1" : ""}`}>
          <div className="rounded-2xl border border-border/40 bg-background overflow-hidden shadow-xl">
            {/* Browser bar */}
            <div className="flex items-center gap-2 px-4 py-2.5 border-b border-border/30 bg-muted/30">
              <div className="flex gap-1.5">
                <div className="w-2.5 h-2.5 rounded-full bg-red-400/50" />
                <div className="w-2.5 h-2.5 rounded-full bg-yellow-400/50" />
                <div className="w-2.5 h-2.5 rounded-full bg-green-400/50" />
              </div>
              <div className="flex-1 mx-2 px-3 py-1 rounded-md bg-muted/50 text-[10px] text-muted-foreground/50 font-mono">
                {study.url.replace("https://", "")}
              </div>
            </div>
            {/* Content */}
            <div className="p-5">
              {index === 0 ? (
                <ZapBotPreview language={language} />
              ) : (
                <SlouchPreview language={language} />
              )}
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export default function CaseStudies() {
  const { language } = useLanguage();
  const isNL = language === "nl";
  const studies = getCaseStudies(language);

  return (
    <section id="case-studies" className="py-20 sm:py-28 md:py-32">
      <div className="container mx-auto px-4 sm:px-6 max-w-7xl">
        {/* Header */}
        <div className="text-center mb-16 sm:mb-20">
          <motion.p
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-sm font-medium text-primary uppercase tracking-widest mb-6"
          >
            {isNL ? "Klantresultaten" : "Client results"}
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.05 }}
            className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-6"
          >
            {isNL ? "Van idee tot lancering" : "From idea to launch"}
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-muted-foreground text-lg sm:text-xl max-w-2xl mx-auto"
          >
            {isNL
              ? "Bekijk hoe we AI-oplossingen bouwen die écht werken — van concept tot product."
              : "See how we build AI solutions that actually work — from concept to product."}
          </motion.p>
        </div>

        {/* Case studies */}
        <div className="space-y-20 sm:space-y-28">
          {studies.map((study, i) => (
            <CaseStudyCard
              key={study.name}
              study={study}
              index={i}
              language={language}
            />
          ))}
        </div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-20 text-center"
        >
          <p className="text-muted-foreground mb-6">
            {isNL
              ? "Wil jij ook zo'n resultaat?"
              : "Want results like these?"}
          </p>
          <Button
            size="lg"
            className="bg-foreground text-background hover:bg-foreground/90 rounded-xl px-8 py-6 text-base font-semibold"
            onClick={() => scrollToSection("ready-to-start")}
          >
            {isNL ? "Plan gratis intake" : "Book free intake"}
          </Button>
        </motion.div>
      </div>
    </section>
  );
}
