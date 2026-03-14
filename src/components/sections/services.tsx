"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useLanguage } from "@/lib/i18n/language-context";
import { scrollToSection } from "@/lib/scroll-utils";
import {
  Headphones,
  TrendingUp,
  Settings,
  BookOpen,
  ArrowRight,
  X,
  Zap,
  Plug,
  MessageSquare,
  Search,
  ChevronRight,
} from "lucide-react";
import { Button } from "@/components/ui/button";

interface Agent {
  name: string;
  headline: string;
  description: string;
  integrations: string[];
  results: { value: string; label: string }[];
}

interface Category {
  id: string;
  title: string;
  subtitle: string;
  agentCount: string;
  icon: any;
  gradient: string;
  agents: Agent[];
}

const getCategories = (language: string): Category[] => {
  const isNL = language === "nl";
  return [
    {
      id: "klantenservice",
      title: isNL ? "Klantenservice" : "Customer Service",
      subtitle: isNL
        ? "Je klanten helpen terwijl jij slaapt"
        : "Help your customers while you sleep",
      agentCount: "3 agents",
      icon: Headphones,
      gradient: "from-blue-500 to-cyan-400",
      agents: [
        {
          name: isNL ? "Klantenservice Agent" : "Customer Service Agent",
          headline: isNL ? "Beantwoordt 80% van tickets zelfstandig" : "Handles 80% of tickets independently",
          description: isNL
            ? "Analyseert binnenkomende tickets, beantwoordt veelgestelde vragen direct en escaleert complexe cases naar het juiste teamlid."
            : "Analyzes incoming tickets, answers FAQs instantly and escalates complex cases to the right team member.",
          integrations: ["Zendesk", "Intercom", "WhatsApp", "Slack"],
          results: isNL
            ? [{ value: "80%", label: "Minder handmatig" }, { value: "24/7", label: "Beschikbaar" }, { value: "<30s", label: "Reactietijd" }]
            : [{ value: "80%", label: "Less manual" }, { value: "24/7", label: "Available" }, { value: "<30s", label: "Response" }],
        },
        {
          name: isNL ? "Onboarding Agent" : "Onboarding Agent",
          headline: isNL ? "Nieuwe klanten productief in uren" : "New customers productive in hours",
          description: isNL
            ? "Stuurt gepersonaliseerde welkomstflows, beantwoordt setup-vragen en zorgt dat nieuwe klanten snel productief zijn."
            : "Sends personalized welcome flows, answers setup questions and ensures new customers become productive quickly.",
          integrations: ["HubSpot", "Intercom", "Calendly", "Notion"],
          results: isNL
            ? [{ value: "50%", label: "Snellere setup" }, { value: "-40%", label: "Churn" }, { value: "100%", label: "Consistent" }]
            : [{ value: "50%", label: "Faster setup" }, { value: "-40%", label: "Churn" }, { value: "100%", label: "Consistent" }],
        },
        {
          name: "WhatsApp/Chat Agent",
          headline: isNL ? "Elk kanaal, elke taal, altijd beschikbaar" : "Every channel, every language, always on",
          description: isNL
            ? "Beantwoordt klantvragen via WhatsApp, webchat en social media. Begrijpt context en plant afspraken."
            : "Answers questions via WhatsApp, webchat and social media. Understands context and books appointments.",
          integrations: ["WhatsApp API", "Twilio", "Zendesk"],
          results: isNL
            ? [{ value: "24/7", label: "Alle kanalen" }, { value: "5+", label: "Talen" }, { value: "<10s", label: "Reactietijd" }]
            : [{ value: "24/7", label: "All channels" }, { value: "5+", label: "Languages" }, { value: "<10s", label: "Response" }],
        },
      ],
    },
    {
      id: "sales",
      title: "Sales & Marketing",
      subtitle: isNL ? "Meer leads, minder handwerk" : "More leads, less manual work",
      agentCount: "3 agents",
      icon: TrendingUp,
      gradient: "from-emerald-500 to-green-400",
      agents: [
        {
          name: isNL ? "Lead Kwalificatie Agent" : "Lead Qualifying Agent",
          headline: isNL ? "Warme leads direct bij sales" : "Warm leads to sales instantly",
          description: isNL
            ? "Analyseert inkomende leads, kwalificeert automatisch en plant meetings met warme leads. Koude leads krijgen een nurture-flow."
            : "Analyzes incoming leads, auto-qualifies and schedules meetings with warm leads. Cold leads get a nurture flow.",
          integrations: ["HubSpot", "Salesforce", "LinkedIn", "Calendly"],
          results: isNL
            ? [{ value: "+30%", label: "Conversie" }, { value: "0", label: "Leads gemist" }, { value: "Auto", label: "Follow-up" }]
            : [{ value: "+30%", label: "Conversion" }, { value: "0", label: "Leads missed" }, { value: "Auto", label: "Follow-up" }],
        },
        {
          name: isNL ? "Outbound Agent" : "Outbound Agent",
          headline: isNL ? "150+ gepersonaliseerde contacten per week" : "150+ personalized contacts per week",
          description: isNL
            ? "Vindt ideale prospects, schrijft gepersonaliseerde berichten en verstuurt via e-mail of LinkedIn."
            : "Finds ideal prospects, writes personalized messages and sends via email or LinkedIn.",
          integrations: ["Apollo.io", "LinkedIn API", "Gmail", "HubSpot"],
          results: isNL
            ? [{ value: "150+", label: "Contacten/wk" }, { value: "42%", label: "Open rate" }, { value: "Auto", label: "A/B testing" }]
            : [{ value: "150+", label: "Contacts/wk" }, { value: "42%", label: "Open rate" }, { value: "Auto", label: "A/B testing" }],
        },
        {
          name: isNL ? "Offerte Agent" : "Quote Agent",
          headline: isNL ? "Van call naar offerte in minuten" : "From call to quote in minutes",
          description: isNL
            ? "Luistert mee met sales calls, haalt wensen eruit en genereert een professionele offerte."
            : "Listens in on sales calls, extracts requirements and generates a professional quote.",
          integrations: ["Google Docs", "HubSpot", "PandaDoc"],
          results: isNL
            ? [{ value: "80%", label: "Sneller" }, { value: "-90%", label: "Fouten" }, { value: "100%", label: "Consistent" }]
            : [{ value: "80%", label: "Faster" }, { value: "-90%", label: "Errors" }, { value: "100%", label: "Consistent" }],
        },
      ],
    },
    {
      id: "operations",
      title: "Operations",
      subtitle: isNL ? "Processen die zichzelf draaien" : "Processes that run themselves",
      agentCount: "3 agents",
      icon: Settings,
      gradient: "from-amber-500 to-orange-400",
      agents: [
        {
          name: isNL ? "Order Processing Agent" : "Order Processing Agent",
          headline: isNL ? "Bestelling tot verzending, zero handmatig" : "Order to shipment, zero manual",
          description: isNL
            ? "Verwerkt orders automatisch, checkt voorraad in real-time en stuurt tracking-info naar klanten."
            : "Processes orders automatically, checks stock in real-time and sends tracking info to customers.",
          integrations: ["Shopify", "Exact Online", "Picqer", "Sendcloud"],
          results: isNL
            ? [{ value: "0", label: "Handmatig" }, { value: "Real-time", label: "Voorraad" }, { value: "Auto", label: "Tracking" }]
            : [{ value: "0", label: "Manual" }, { value: "Real-time", label: "Stock" }, { value: "Auto", label: "Tracking" }],
        },
        {
          name: isNL ? "Facturatie Agent" : "Invoicing Agent",
          headline: isNL ? "Nooit meer achter betalingen aanbellen" : "Never chase payments again",
          description: isNL
            ? "Genereert facturen automatisch, stuurt herinneringen en matcht betalingen met je boekhouding."
            : "Generates invoices automatically, sends reminders and matches payments with your bookkeeping.",
          integrations: ["Exact Online", "Mollie", "Moneybird"],
          results: isNL
            ? [{ value: "Auto", label: "Herinneringen" }, { value: "99%", label: "Match-rate" }, { value: "-95%", label: "Fouten" }]
            : [{ value: "Auto", label: "Reminders" }, { value: "99%", label: "Match rate" }, { value: "-95%", label: "Errors" }],
        },
        {
          name: isNL ? "HR Onboarding Agent" : "HR Onboarding Agent",
          headline: isNL ? "Nieuwe medewerker productief in dagen" : "New employee productive in days",
          description: isNL
            ? "Stuurt nieuwe medewerkers door alle stappen: documenten, accounts en introductiegesprekken."
            : "Guides new employees through all steps: documents, accounts and intro meetings.",
          integrations: ["Personio", "Notion", "Slack", "Google Workspace"],
          results: isNL
            ? [{ value: "90%", label: "Sneller" }, { value: "0", label: "Vergeten" }, { value: "100%", label: "Consistent" }]
            : [{ value: "90%", label: "Faster" }, { value: "0", label: "Forgotten" }, { value: "100%", label: "Consistent" }],
        },
      ],
    },
    {
      id: "kennisbank",
      title: isNL ? "Kennisbank & Intelligence" : "Knowledge & Intelligence",
      subtitle: isNL ? "Al je kennis, altijd vindbaar" : "All your knowledge, always findable",
      agentCount: "3 agents",
      icon: BookOpen,
      gradient: "from-violet-500 to-purple-400",
      agents: [
        {
          name: isNL ? "Kennisbank Agent" : "Knowledge Base Agent",
          headline: isNL ? "Stel een vraag, krijg antwoord met bronnen" : "Ask a question, get answers with sources",
          description: isNL
            ? "Maakt al je documenten doorzoekbaar met AI. Vragen in natuurlijke taal, antwoord met bronvermelding."
            : "Makes all your documents searchable with AI. Questions in natural language, answers with source references.",
          integrations: ["SharePoint", "Notion", "Confluence", "Google Drive"],
          results: isNL
            ? [{ value: "10K+", label: "Documenten" }, { value: "<5s", label: "Antwoord" }, { value: "100%", label: "Met bron" }]
            : [{ value: "10K+", label: "Documents" }, { value: "<5s", label: "Answer" }, { value: "100%", label: "With source" }],
        },
        {
          name: isNL ? "Compliance Agent" : "Compliance Agent",
          headline: isNL ? "Altijd compliant, zonder handmatige checks" : "Always compliant, no manual checks",
          description: isNL
            ? "Scant documenten automatisch tegen regelgeving. Signaleert risico's en houdt een audit trail bij."
            : "Scans documents against regulations automatically. Flags risks and maintains an audit trail.",
          integrations: ["SharePoint", "Power Automate", "Custom APIs"],
          results: isNL
            ? [{ value: "Auto", label: "Scanning" }, { value: "100%", label: "Audit trail" }, { value: "0", label: "Gemist" }]
            : [{ value: "Auto", label: "Scanning" }, { value: "100%", label: "Audit trail" }, { value: "0", label: "Missed" }],
        },
        {
          name: isNL ? "Rapportage Agent" : "Reporting Agent",
          headline: isNL ? "Rapporten die zichzelf schrijven" : "Reports that write themselves",
          description: isNL
            ? "Haalt data uit al je systemen, genereert rapporten en stuurt ze automatisch naar de juiste mensen."
            : "Pulls data from all your systems, generates reports and sends them to the right people automatically.",
          integrations: ["Power BI", "Google Sheets", "Slack", "BigQuery"],
          results: isNL
            ? [{ value: "Auto", label: "Delivery" }, { value: "Multi", label: "Databronnen" }, { value: "Wekelijks", label: "Updates" }]
            : [{ value: "Auto", label: "Delivery" }, { value: "Multi", label: "Sources" }, { value: "Weekly", label: "Updates" }],
        },
      ],
    },
  ];
};

// ─── UNIQUE TEMPLATES PER CATEGORY (data changes per agent) ──

function ChatTemplate({ activeAgent, agents, language }: { activeAgent: number; agents: Agent[]; language: string }) {
  const isNL = language === "nl";
  const allConvos = isNL
    ? [
        [
          { from: "customer", text: "Ik heb een verkeerd product ontvangen, wat nu?" },
          { from: "agent", text: "Vervelend! Ik zie je bestelling #7290. Ik stuur direct een retourlabel naar je mail en het juiste product gaat vandaag nog de deur uit 📬" },
          { from: "customer", text: "Wow dat is snel, dankje!" },
          { from: "agent", text: "Geen probleem! Het nieuwe pakket is morgen bij je. Verder nog iets?" },
        ],
        [
          { from: "agent", text: "Hey! Leuk dat je erbij bent. Ik loop even met je door de eerste stappen 🎯" },
          { from: "customer", text: "Cool, ik heb nog nooit zoiets gebruikt" },
          { from: "agent", text: "Geen zorgen! Stap 1: koppel je e-mail. Klik op Instellingen → Integraties. Ik wacht op je ✓" },
          { from: "customer", text: "Gelukt!" },
          { from: "agent", text: "Top! Nu stap 2: ik heb een demo-project voor je aangemaakt zodat je kunt oefenen 💡" },
        ],
        [
          { from: "customer", text: "Hoi, doen jullie ook reparaties?" },
          { from: "agent", text: "Jazeker! We repareren alle merken. Wil je een afspraak inplannen? We hebben plek op woensdag 11:00 of donderdag 14:30 🔧" },
          { from: "customer", text: "Donderdag 14:30 is goed" },
          { from: "agent", text: "Staat genoteerd! Je krijgt een bevestiging via WhatsApp en een herinnering morgenochtend. Tot donderdag!" },
        ],
      ]
    : [
        [
          { from: "customer", text: "I received the wrong product, what should I do?" },
          { from: "agent", text: "Sorry about that! I can see your order #7290. I'm sending a return label to your email now and shipping the correct item today 📬" },
          { from: "customer", text: "Wow that's fast, thanks!" },
          { from: "agent", text: "No problem! The new package will arrive tomorrow. Anything else I can help with?" },
        ],
        [
          { from: "agent", text: "Hey! Great to have you on board. Let me walk you through the first steps 🎯" },
          { from: "customer", text: "Cool, I've never used anything like this before" },
          { from: "agent", text: "No worries! Step 1: connect your email. Go to Settings → Integrations. I'll wait ✓" },
          { from: "customer", text: "Done!" },
          { from: "agent", text: "Nice! Step 2: I've created a demo project for you to practice with 💡" },
        ],
        [
          { from: "customer", text: "Hi, do you also do repairs?" },
          { from: "agent", text: "Absolutely! We repair all brands. Want to book an appointment? We have slots on Wednesday 11:00 or Thursday 14:30 🔧" },
          { from: "customer", text: "Thursday 14:30 works" },
          { from: "agent", text: "Booked! You'll get a WhatsApp confirmation and a reminder tomorrow morning. See you Thursday!" },
        ],
      ];

  const msgs = allConvos[activeAgent] || allConvos[0];
  const agentName = agents[activeAgent]?.name || agents[0].name;

  return (
    <div className="rounded-xl border border-border/40 bg-muted/20 overflow-hidden">
      <div className="flex items-center gap-2 px-4 py-2.5 border-b border-border/30 bg-muted/30">
        <MessageSquare className="w-3.5 h-3.5 text-blue-500" />
        <span className="text-xs font-medium text-foreground/70">{agentName}</span>
        <motion.div className="w-1.5 h-1.5 rounded-full bg-emerald-400 ml-auto" animate={{ opacity: [1, 0.3, 1] }} transition={{ duration: 2, repeat: Infinity }} />
      </div>
      <div className="p-4 space-y-2.5">
        {msgs.map((msg, i) => (
          <motion.div key={`${activeAgent}-${i}`} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 + i * 0.25 }} className={`flex ${msg.from === "customer" ? "justify-end" : "justify-start"}`}>
            <div className={`max-w-[80%] rounded-2xl px-3.5 py-2 ${msg.from === "customer" ? "bg-primary/10 rounded-tr-sm" : "bg-muted/60 rounded-tl-sm"}`}>
              <p className="text-[12px] text-foreground/70">{msg.text}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

function PipelineTemplate({ activeAgent, agents, language }: { activeAgent: number; agents: Agent[]; language: string }) {
  const isNL = language === "nl";
  const allData = isNL
    ? [
        [
          { label: "Websitebezoekers", count: 1240, width: 100, color: "bg-emerald-500/20 text-emerald-500" },
          { label: "Formulier ingevuld", count: 186, width: 65, color: "bg-emerald-500/30 text-emerald-500" },
          { label: "Demo ingepland", count: 47, width: 38, color: "bg-emerald-500/50 text-emerald-500" },
          { label: "Klant geworden", count: 21, width: 20, color: "bg-emerald-500 text-white" },
        ],
        [
          { label: "Doelgroep", count: 620, width: 100, color: "bg-emerald-500/20 text-emerald-500" },
          { label: "E-mail verstuurd", count: 415, width: 67, color: "bg-emerald-500/30 text-emerald-500" },
          { label: "Gelezen", count: 178, width: 42, color: "bg-emerald-500/50 text-emerald-500" },
          { label: "Gesprek gestart", count: 43, width: 18, color: "bg-emerald-500 text-white" },
        ],
        [
          { label: "Gesprekken gevoerd", count: 38, width: 100, color: "bg-emerald-500/20 text-emerald-500" },
          { label: "Voorstel opgesteld", count: 32, width: 84, color: "bg-emerald-500/30 text-emerald-500" },
          { label: "Goedgekeurd", count: 28, width: 74, color: "bg-emerald-500/50 text-emerald-500" },
          { label: "Ondertekend", count: 22, width: 58, color: "bg-emerald-500 text-white" },
        ],
      ]
    : [
        [
          { label: "Site visitors", count: 1240, width: 100, color: "bg-emerald-500/20 text-emerald-500" },
          { label: "Form filled", count: 186, width: 65, color: "bg-emerald-500/30 text-emerald-500" },
          { label: "Demo booked", count: 47, width: 38, color: "bg-emerald-500/50 text-emerald-500" },
          { label: "Became client", count: 21, width: 20, color: "bg-emerald-500 text-white" },
        ],
        [
          { label: "Target group", count: 620, width: 100, color: "bg-emerald-500/20 text-emerald-500" },
          { label: "Email sent", count: 415, width: 67, color: "bg-emerald-500/30 text-emerald-500" },
          { label: "Read", count: 178, width: 42, color: "bg-emerald-500/50 text-emerald-500" },
          { label: "Started convo", count: 43, width: 18, color: "bg-emerald-500 text-white" },
        ],
        [
          { label: "Calls done", count: 38, width: 100, color: "bg-emerald-500/20 text-emerald-500" },
          { label: "Proposal drafted", count: 32, width: 84, color: "bg-emerald-500/30 text-emerald-500" },
          { label: "Approved", count: 28, width: 74, color: "bg-emerald-500/50 text-emerald-500" },
          { label: "Signed", count: 22, width: 58, color: "bg-emerald-500 text-white" },
        ],
      ];

  const stages = allData[activeAgent] || allData[0];

  return (
    <div className="rounded-xl border border-border/40 bg-muted/20 overflow-hidden">
      <div className="flex items-center gap-2 px-4 py-2.5 border-b border-border/30 bg-muted/30">
        <TrendingUp className="w-3.5 h-3.5 text-emerald-500" />
        <span className="text-xs font-medium text-foreground/70">{agents[activeAgent]?.name}</span>
      </div>
      <div className="p-4 space-y-2">
        {stages.map((stage, i) => (
          <motion.div key={`${activeAgent}-${i}`} initial={{ opacity: 0, scaleX: 0 }} animate={{ opacity: 1, scaleX: 1 }} transition={{ delay: 0.2 + i * 0.15, duration: 0.4 }} style={{ originX: 0 }}>
            <div className="flex items-center gap-3">
              <span className="text-[11px] text-muted-foreground w-[90px] shrink-0">{stage.label}</span>
              <div className="flex-1 h-7 rounded-lg overflow-hidden bg-muted/30">
                <motion.div className={`h-full rounded-lg ${stage.color} flex items-center px-2.5`} initial={{ width: 0 }} animate={{ width: `${stage.width}%` }} transition={{ delay: 0.3 + i * 0.15, duration: 0.6 }}>
                  <span className="text-[11px] font-bold">{stage.count}</span>
                </motion.div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

function WorkflowTemplate({ activeAgent, agents, language }: { activeAgent: number; agents: Agent[]; language: string }) {
  const isNL = language === "nl";
  const allSteps = isNL
    ? [
        [
          { label: "Betaling ontvangen via Shopify", status: "done", time: "11:22" },
          { label: "3 artikelen gereserveerd in magazijn", status: "done", time: "11:22" },
          { label: "Pakbon + label via Sendcloud", status: "done", time: "11:23" },
          { label: "Track & trace naar klant gestuurd", status: "active", time: "11:24" },
        ],
        [
          { label: "Milestone bereikt — factuur aangemaakt", status: "done", time: "Ma 09:00" },
          { label: "PDF verstuurd via Moneybird", status: "done", time: "Ma 09:01" },
          { label: "Geen betaling na 14d — herinnering", status: "done", time: "Di 09:00" },
          { label: "Betaling binnen — automatisch geboekt", status: "active", time: "Wo 14:12" },
        ],
        [
          { label: "Arbeidsovereenkomst digitaal getekend", status: "done", time: "Dag 1" },
          { label: "Slack, Gmail, Notion accounts actief", status: "done", time: "Dag 1" },
          { label: "Kennismaking met 4 teamleden gepland", status: "done", time: "Dag 2" },
          { label: "Eerste eigen taak toegewezen", status: "active", time: "Dag 3" },
        ],
      ]
    : [
        [
          { label: "Payment received via Shopify", status: "done", time: "11:22" },
          { label: "3 items reserved in warehouse", status: "done", time: "11:22" },
          { label: "Packing slip + label via Sendcloud", status: "done", time: "11:23" },
          { label: "Track & trace sent to customer", status: "active", time: "11:24" },
        ],
        [
          { label: "Milestone hit — invoice created", status: "done", time: "Mon 09:00" },
          { label: "PDF sent via Moneybird", status: "done", time: "Mon 09:01" },
          { label: "No payment after 14d — reminder sent", status: "done", time: "Tue 09:00" },
          { label: "Payment received — auto-booked", status: "active", time: "Wed 14:12" },
        ],
        [
          { label: "Employment contract signed digitally", status: "done", time: "Day 1" },
          { label: "Slack, Gmail, Notion accounts active", status: "done", time: "Day 1" },
          { label: "Meet & greet with 4 team members set", status: "done", time: "Day 2" },
          { label: "First own task assigned", status: "active", time: "Day 3" },
        ],
      ];

  const steps = allSteps[activeAgent] || allSteps[0];

  return (
    <div className="rounded-xl border border-border/40 bg-muted/20 overflow-hidden">
      <div className="flex items-center gap-2 px-4 py-2.5 border-b border-border/30 bg-muted/30">
        <Settings className="w-3.5 h-3.5 text-amber-500" />
        <span className="text-xs font-medium text-foreground/70">{agents[activeAgent]?.name}</span>
      </div>
      <div className="p-4 space-y-0">
        {steps.map((step, i) => (
          <motion.div key={`${activeAgent}-${i}`} initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.2 + i * 0.2 }} className="flex items-center gap-3 py-2 relative">
            {i < steps.length - 1 && <div className="absolute left-[11px] top-[28px] w-[2px] h-[16px] bg-border/50" />}
            <div className={`w-6 h-6 rounded-full flex items-center justify-center shrink-0 ${step.status === "done" ? "bg-amber-500/20" : "bg-amber-500/10 ring-2 ring-amber-500/30"}`}>
              {step.status === "done" ? (
                <span className="text-amber-500 text-[10px]">✓</span>
              ) : (
                <motion.div className="w-2 h-2 rounded-full bg-amber-500" animate={{ scale: [1, 1.3, 1] }} transition={{ duration: 1.5, repeat: Infinity }} />
              )}
            </div>
            <span className="text-[12px] text-foreground/70 flex-1">{step.label}</span>
            <span className="text-[10px] text-muted-foreground/40">{step.time}</span>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

function SearchTemplate({ activeAgent, agents, language }: { activeAgent: number; agents: Agent[]; language: string }) {
  const isNL = language === "nl";
  const allData = isNL
    ? [
        {
          query: "Hoe werkt de garantie op maatwerkprojecten?",
          results: [
            { source: "Servicevoorwaarden 2025", page: "§7.1", match: "Maatwerkprojecten vallen onder 12 maanden garantie op..." },
            { source: "Intern wiki — Garanties", page: "p.4", match: "Bij maatwerkoplossingen geldt een SLA van 48 uur voor..." },
            { source: "Klant-onboarding doc", page: "#22", match: "Leg bij oplevering de garantievoorwaarden vast in het..." },
          ],
        },
        {
          query: "Scan leverancierscontract Konings BV",
          results: [
            { source: "Contract Konings BV", page: "§3.5", match: "⚠️ Betalingstermijn 60 dagen wijkt af van standaard 30d" },
            { source: "Inkoopbeleid 2025", page: "p.2", match: "Maximale betalingstermijn leveranciers: 30 dagen tenzij..." },
            { source: "Risico-matrix", page: "#8", match: "Aanbeveling: heronderhandel of laat juridisch reviewen" },
          ],
        },
        {
          query: "Maak maandoverzicht operatie maart",
          results: [
            { source: "Exact Online", page: "live", match: "Omzet maart: €87K — 8% boven target" },
            { source: "Jira board", page: "live", match: "23 tickets opgelost, 2 open, gem. doorlooptijd 1.4 dag" },
            { source: "Google Sheets team", page: "live", match: "Overzicht verstuurd naar #management + PDF opgeslagen" },
          ],
        },
      ]
    : [
        {
          query: "How does warranty work on custom projects?",
          results: [
            { source: "Service Terms 2025", page: "§7.1", match: "Custom projects are covered by 12 months warranty on..." },
            { source: "Internal wiki — Warranties", page: "p.4", match: "For custom solutions, a 48-hour SLA applies for..." },
            { source: "Client onboarding doc", page: "#22", match: "Document warranty terms at delivery in the project..." },
          ],
        },
        {
          query: "Scan supplier contract Konings BV",
          results: [
            { source: "Contract Konings BV", page: "§3.5", match: "⚠️ Payment term 60 days deviates from standard 30d" },
            { source: "Procurement Policy 2025", page: "p.2", match: "Maximum supplier payment term: 30 days unless..." },
            { source: "Risk matrix", page: "#8", match: "Recommendation: renegotiate or send for legal review" },
          ],
        },
        {
          query: "Generate monthly ops overview March",
          results: [
            { source: "Exact Online", page: "live", match: "Revenue March: €87K — 8% above target" },
            { source: "Jira board", page: "live", match: "23 tickets resolved, 2 open, avg lead time 1.4 days" },
            { source: "Google Sheets team", page: "live", match: "Overview sent to #management + PDF saved" },
          ],
        },
      ];

  const data = allData[activeAgent] || allData[0];

  return (
    <div className="rounded-xl border border-border/40 bg-muted/20 overflow-hidden">
      <div className="flex items-center gap-2 px-4 py-2.5 border-b border-border/30 bg-muted/30">
        <Search className="w-3.5 h-3.5 text-violet-500" />
        <span className="text-xs font-medium text-foreground/70">{agents[activeAgent]?.name}</span>
      </div>
      <div className="p-4 space-y-3">
        <motion.div key={`q-${activeAgent}`} initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex items-center gap-2 px-3 py-2 rounded-lg bg-background border border-border/50">
          <Search className="w-3 h-3 text-muted-foreground/40" />
          <span className="text-[11px] text-foreground/50">{data.query}</span>
        </motion.div>
        <div className="space-y-1.5">
          {data.results.map((r, i) => (
            <motion.div key={`${activeAgent}-${i}`} initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 + i * 0.2 }} className="rounded-lg bg-background/50 border border-border/30 p-2.5">
              <div className="flex items-center gap-2 mb-1">
                <span className="text-[10px] font-semibold text-violet-500">{r.source}</span>
                <span className="text-[9px] text-muted-foreground/40">{r.page}</span>
              </div>
              <p className="text-[11px] text-foreground/50 truncate">{r.match}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}

// ─── CATEGORY DETAIL MODAL ───────────────────────────────────

function CategoryDetail({
  category,
  language,
  onClose,
}: {
  category: Category;
  language: string;
  onClose: () => void;
}) {
  const isNL = language === "nl";
  const [activeAgent, setActiveAgent] = useState(0);
  const agent = category.agents[activeAgent];
  const CategoryIcon = category.icon;

  const getTemplate = (catId: string, agentIdx: number) => {
    const props = { activeAgent: agentIdx, agents: category.agents, language };
    switch (catId) {
      case "klantenservice": return <ChatTemplate {...props} />;
      case "sales": return <PipelineTemplate {...props} />;
      case "operations": return <WorkflowTemplate {...props} />;
      case "kennisbank": return <SearchTemplate {...props} />;
      default: return null;
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
      onClick={onClose}
    >
      <motion.div
        initial={{ opacity: 0, y: 40, scale: 0.96 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 20, scale: 0.98 }}
        transition={{ type: "spring", stiffness: 350, damping: 30 }}
        className="relative w-full max-w-3xl max-h-[90vh] overflow-y-auto bg-background rounded-3xl border border-border shadow-2xl scrollbar-hide"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Gradient header */}
        <div className={`relative px-4 sm:px-6 md:px-8 pt-6 sm:pt-8 pb-5 sm:pb-6 bg-gradient-to-br ${category.gradient} overflow-hidden`}>
          <div className="absolute top-0 right-0 w-40 h-40 rounded-full bg-white/5 -translate-y-1/2 translate-x-1/2" />
          <div className="absolute bottom-0 left-1/3 w-24 h-24 rounded-full bg-white/5 translate-y-1/2" />

          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-2 rounded-full bg-white/10 hover:bg-white/20 transition-colors"
          >
            <X className="w-4 h-4 text-white" />
          </button>

          <div className="relative">
            <div className="w-12 h-12 rounded-2xl bg-white/15 backdrop-blur flex items-center justify-center mb-4">
              <CategoryIcon className="w-6 h-6 text-white" />
            </div>
            <h3 className="text-2xl font-bold text-white mb-1">
              {category.title}
            </h3>
            <p className="text-white/70 text-sm">{category.subtitle}</p>
          </div>
        </div>

        <div className="px-4 sm:px-6 md:px-8 py-5 sm:py-6">
          {/* Agent tabs */}
          <div className="grid grid-cols-3 gap-2 mb-6">
            {category.agents.map((a, i) => (
              <button
                key={i}
                onClick={() => setActiveAgent(i)}
                className={`px-2 sm:px-4 py-2.5 rounded-xl text-[11px] sm:text-sm font-medium transition-all text-center leading-tight ${
                  activeAgent === i
                    ? "bg-foreground text-background"
                    : "bg-muted/40 text-muted-foreground hover:bg-muted/60"
                }`}
              >
                {a.name}
              </button>
            ))}
          </div>

          {/* Active agent content */}
          <AnimatePresence mode="wait">
            <motion.div
              key={activeAgent}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.25 }}
              className="space-y-6"
            >
              {/* Headline + description */}
              <div>
                <h4 className="text-lg font-bold text-foreground mb-2">
                  {agent.headline}
                </h4>
                <p className="text-sm text-foreground/60 leading-relaxed">
                  {agent.description}
                </p>
              </div>

              <div className="grid sm:grid-cols-2 gap-5">
                {/* Left: Results + integrations */}
                <div className="space-y-5">
                  {/* Results */}
                  <div className="grid grid-cols-3 gap-1.5 sm:gap-2">
                    {agent.results.map((r, i) => (
                      <motion.div
                        key={i}
                        initial={{ opacity: 0, y: 8 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 + i * 0.06 }}
                        className="text-center p-2 sm:p-3 rounded-xl bg-muted/30 border border-border/30"
                      >
                        <div className="text-base sm:text-lg font-bold text-foreground">
                          {r.value}
                        </div>
                        <div className="text-[8px] sm:text-[9px] text-muted-foreground uppercase tracking-wider mt-0.5">
                          {r.label}
                        </div>
                      </motion.div>
                    ))}
                  </div>

                  {/* Integrations */}
                  <div>
                    <h5 className="text-[10px] font-semibold text-muted-foreground uppercase tracking-wider mb-2">
                      <Plug className="w-3 h-3 inline mr-1" />
                      {isNL ? "Werkt met" : "Works with"}
                    </h5>
                    <div className="flex flex-wrap gap-1.5">
                      {agent.integrations.map((int, i) => (
                        <span
                          key={i}
                          className="px-2.5 py-1 rounded-md bg-muted/40 border border-border/30 text-[11px] text-foreground/60"
                        >
                          {int}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Right: Unique template */}
                <div>{getTemplate(category.id, activeAgent)}</div>
              </div>

              {/* CTA */}
              <Button
                className="w-full bg-foreground text-background hover:bg-foreground/90 rounded-xl py-5 text-base font-semibold group"
                onClick={() => {
                  onClose();
                  scrollToSection("ready-to-start");
                }}
              >
                {isNL ? "Bespreek deze agent" : "Discuss this agent"}
                <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
              </Button>
            </motion.div>
          </AnimatePresence>
        </div>
      </motion.div>
    </motion.div>
  );
}

// ─── MAIN COMPONENT ──────────────────────────────────────────

const Services = () => {
  const { language } = useLanguage();
  const categories = getCategories(language);
  const isNL = language === "nl";
  const [selectedCategory, setSelectedCategory] = useState<Category | null>(null);

  const totalAgents = categories.reduce((acc, c) => acc + c.agents.length, 0);

  return (
    <section id="services" className="py-20 sm:py-28 md:py-32 overflow-hidden">
      <div className="container mx-auto px-4 sm:px-6 max-w-7xl">
        {/* Header */}
        <motion.div
          className="text-center mb-16 sm:mb-20"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <p className="text-sm font-medium text-primary uppercase tracking-widest mb-4">
            {isNL ? `${totalAgents} digitale medewerkers` : `${totalAgents} digital employees`}
          </p>
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
            {isNL ? (
              <>Welke agent past <span className="text-primary">bij jou</span>?</>
            ) : (
              <>Which agent fits <span className="text-primary">your team</span>?</>
            )}
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            {isNL
              ? "Kies een categorie en ontdek wat onze agents voor je kunnen doen"
              : "Choose a category and discover what our agents can do for you"}
          </p>
        </motion.div>

        {/* 4 Category cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          {categories.map((cat, i) => {
            const CatIcon = cat.icon;
            return (
              <motion.button
                key={cat.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
                onClick={() => setSelectedCategory(cat)}
                className="text-left group relative overflow-hidden rounded-2xl border border-border/50 bg-background p-6 sm:p-8 hover:border-primary/20 transition-all duration-300 active:scale-[0.98]"
              >
                {/* Gradient hover glow */}
                <div className={`absolute inset-0 opacity-0 group-hover:opacity-[0.04] transition-opacity duration-500 bg-gradient-to-br ${cat.gradient} pointer-events-none`} />

                <div className="relative flex items-start justify-between">
                  <div className="flex-1">
                    <div className={`w-12 h-12 rounded-2xl bg-gradient-to-br ${cat.gradient} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}>
                      <CatIcon className="w-6 h-6 text-white" />
                    </div>
                    <h3 className="text-xl font-bold text-foreground mb-1.5">
                      {cat.title}
                    </h3>
                    <p className="text-sm text-muted-foreground mb-4">
                      {cat.subtitle}
                    </p>
                    {/* Agent names preview */}
                    <div className="flex flex-wrap gap-1.5">
                      {cat.agents.map((a, ai) => (
                        <span
                          key={ai}
                          className="px-2 py-0.5 rounded-md bg-muted/40 text-[11px] text-muted-foreground"
                        >
                          {a.name}
                        </span>
                      ))}
                    </div>
                  </div>
                  <ChevronRight className="w-5 h-5 text-muted-foreground/20 group-hover:text-primary group-hover:translate-x-1 transition-all mt-2 shrink-0" />
                </div>
              </motion.button>
            );
          })}
        </div>

        {/* Custom agent CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-8 rounded-2xl border border-dashed border-primary/30 bg-primary/[0.02] p-8 sm:p-10 text-center"
        >
          <div className="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center mx-auto mb-4">
            <Zap className="w-6 h-6 text-primary" />
          </div>
          <h3 className="text-xl font-bold text-foreground mb-2">
            {isNL
              ? "Niet gevonden wat je zoekt?"
              : "Didn't find what you need?"}
          </h3>
          <p className="text-sm text-muted-foreground max-w-md mx-auto mb-6">
            {isNL
              ? "Geen probleem. Wij bouwen agents volledig op maat — afgestemd op jouw processen, systemen en wensen. Vertel ons wat je nodig hebt."
              : "No problem. We build fully custom agents — tailored to your processes, systems and needs. Tell us what you're looking for."}
          </p>
          <Button
            className="bg-foreground text-background hover:bg-foreground/90 rounded-xl px-8 py-5 text-base font-semibold group"
            onClick={() => scrollToSection("ready-to-start")}
          >
            {isNL ? "Bespreek jouw custom agent" : "Discuss your custom agent"}
            <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
          </Button>
        </motion.div>
      </div>

      {/* Category detail modal */}
      <AnimatePresence>
        {selectedCategory && (
          <CategoryDetail
            category={selectedCategory}
            language={language}
            onClose={() => setSelectedCategory(null)}
          />
        )}
      </AnimatePresence>
    </section>
  );
};

export default Services;
