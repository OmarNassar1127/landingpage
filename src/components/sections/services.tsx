"use client";

import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useLanguage } from "@/lib/i18n/language-context";
import { scrollToSection } from "@/lib/scroll-utils";
import { useInView } from "react-intersection-observer";
import {
  Headphones,
  TrendingUp,
  Settings,
  BookOpen,
  ChevronDown,
  MessageSquare,
  UserPlus,
  FileSearch,
  BarChart3,
  FileText,
  Receipt,
  Users2,
  Search,
  ShieldCheck,
  LineChart,
  Zap,
} from "lucide-react";

interface Agent {
  name: string;
  description: string;
  integrations: string;
  price: string;
}

interface AgentCategory {
  id: string;
  title: string;
  subtitle: string;
  icon: any;
  agents: Agent[];
}

const getCategories = (language: string): AgentCategory[] => {
  const isNL = language === "nl";
  return [
    {
      id: "klantenservice",
      title: isNL ? "Klantenservice" : "Customer Service",
      subtitle: isNL
        ? "Tickets, onboarding, reviews, chat"
        : "Tickets, onboarding, reviews, chat",
      icon: Headphones,
      agents: [
        {
          name: isNL ? "Klantenservice Agent" : "Customer Service Agent",
          description: isNL
            ? "Beantwoordt 80% van tickets zelfstandig, escaleert de rest"
            : "Handles 80% of tickets independently, escalates the rest",
          integrations: "Zendesk, Intercom, WhatsApp, Slack",
          price: "€5.000+",
        },
        {
          name: isNL ? "Onboarding Agent" : "Onboarding Agent",
          description: isNL
            ? "Begeleidt nieuwe klanten stap-voor-stap door setup"
            : "Guides new customers step-by-step through setup",
          integrations: "HubSpot, Intercom, Calendly, Notion",
          price: "€5.000+",
        },
        {
          name: "WhatsApp/Chat Agent",
          description: isNL
            ? "24/7 beschikbaar op alle kanalen"
            : "24/7 available on all channels",
          integrations: "WhatsApp Business API, Twilio, Zendesk",
          price: "€5.000+",
        },
      ],
    },
    {
      id: "sales-marketing",
      title: "Sales & Marketing",
      subtitle: isNL
        ? "Leads, outreach, offertes, content"
        : "Leads, outreach, quotes, content",
      icon: TrendingUp,
      agents: [
        {
          name: isNL ? "Lead Kwalificatie Agent" : "Lead Qualifying Agent",
          description: isNL
            ? "Scoort en kwalificeert inbound leads, plant meetings"
            : "Scores and qualifies inbound leads, schedules meetings",
          integrations: "HubSpot, Salesforce, LinkedIn API, Calendly",
          price: "€5.000+",
        },
        {
          name: isNL ? "Outbound Agent" : "Outbound Agent",
          description: isNL
            ? "Gepersonaliseerde outreach op schaal"
            : "Personalized outreach at scale",
          integrations: "Apollo.io, LinkedIn API, Gmail API, HubSpot",
          price: "€5.000+",
        },
        {
          name: isNL ? "Offerte Agent" : "Quote Agent",
          description: isNL
            ? "Genereert offertes op basis van klantgesprek"
            : "Generates quotes based on client conversations",
          integrations: "Google Docs API, HubSpot, PandaDoc",
          price: "€8.000+",
        },
      ],
    },
    {
      id: "operations",
      title: "Operations",
      subtitle: isNL
        ? "Orders, facturen, HR, meetings, data"
        : "Orders, invoices, HR, meetings, data",
      icon: Settings,
      agents: [
        {
          name: isNL ? "Order Processing Agent" : "Order Processing Agent",
          description: isNL
            ? "Verwerkt orders, checkt voorraad, stuurt bevestigingen"
            : "Processes orders, checks stock, sends confirmations",
          integrations: "Shopify API, Exact Online, Picqer, Sendcloud",
          price: "€10.000+",
        },
        {
          name: isNL ? "Facturatie Agent" : "Invoicing Agent",
          description: isNL
            ? "Facturen, herinneringen, betalingen matchen"
            : "Invoices, reminders, payment matching",
          integrations: "Exact Online, Mollie, Twinfield, Moneybird",
          price: "€5.000+",
        },
        {
          name: isNL ? "HR Onboarding Agent" : "HR Onboarding Agent",
          description: isNL
            ? "Begeleidt nieuwe medewerkers door documenten en accounts"
            : "Guides new employees through documents and accounts",
          integrations: "Personio, Notion, Slack, Google Workspace",
          price: "€5.000+",
        },
      ],
    },
    {
      id: "kennisbank",
      title: isNL ? "Kennisbank & Intelligence" : "Knowledge & Intelligence",
      subtitle: isNL
        ? "Zoeken, compliance, rapportage, research"
        : "Search, compliance, reporting, research",
      icon: BookOpen,
      agents: [
        {
          name: isNL ? "Kennisbank Agent" : "Knowledge Base Agent",
          description: isNL
            ? "Doorzoekt 10.000+ documenten, geeft antwoord met bronnen"
            : "Searches 10,000+ documents, answers with sources",
          integrations: "Pinecone, OpenAI API, SharePoint, Notion",
          price: "€5.000+",
        },
        {
          name: isNL ? "Compliance Agent" : "Compliance Agent",
          description: isNL
            ? "Checkt documenten tegen regelgeving, signaleert risico's"
            : "Checks documents against regulations, flags risks",
          integrations: "SharePoint, OpenAI API, Power Automate",
          price: "€10.000+",
        },
        {
          name: isNL ? "Rapportage Agent" : "Reporting Agent",
          description: isNL
            ? "Genereert wekelijkse en maandelijkse rapporten"
            : "Generates weekly and monthly reports",
          integrations: "Power BI, Google Sheets, Slack, BigQuery",
          price: "€5.000+",
        },
      ],
    },
  ];
};

// Agent icons mapping for visual variety
const agentIcons: Record<string, any> = {
  "Klantenservice Agent": MessageSquare,
  "Customer Service Agent": MessageSquare,
  "Onboarding Agent": UserPlus,
  "WhatsApp/Chat Agent": MessageSquare,
  "Lead Kwalificatie Agent": FileSearch,
  "Lead Qualifying Agent": FileSearch,
  "Outbound Agent": TrendingUp,
  "Offerte Agent": FileText,
  "Quote Agent": FileText,
  "Order Processing Agent": Receipt,
  "Facturatie Agent": Receipt,
  "Invoicing Agent": Receipt,
  "HR Onboarding Agent": Users2,
  "Kennisbank Agent": Search,
  "Knowledge Base Agent": Search,
  "Compliance Agent": ShieldCheck,
  "Rapportage Agent": LineChart,
  "Reporting Agent": LineChart,
};

function CategoryCard({
  category,
  language,
}: {
  category: AgentCategory;
  language: string;
}) {
  const [expanded, setExpanded] = useState(false);
  const CategoryIcon = category.icon;
  const visibleAgents = expanded ? category.agents : category.agents.slice(0, 3);
  const hasMore = category.agents.length > 3;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="rounded-2xl border border-border bg-background hover:border-primary/20 transition-all duration-300"
    >
      {/* Category header */}
      <div className="p-6 sm:p-8 pb-4">
        <div className="flex items-center gap-3 mb-1">
          <CategoryIcon className="w-5 h-5 text-primary" />
          <h3 className="text-xl font-bold text-foreground">{category.title}</h3>
        </div>
        <p className="text-sm text-muted-foreground ml-8">
          {category.subtitle}
        </p>
      </div>

      {/* Agent list */}
      <div className="px-6 sm:px-8 pb-6 sm:pb-8 space-y-1">
        {visibleAgents.map((agent, idx) => {
          const AgentIcon = agentIcons[agent.name] || Zap;
          return (
            <div
              key={idx}
              className="group flex items-start gap-4 p-4 -mx-2 rounded-xl hover:bg-muted/50 transition-colors cursor-pointer"
              onClick={() => scrollToSection("ready-to-start")}
            >
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between gap-2 mb-1">
                  <h4 className="font-semibold text-foreground text-sm sm:text-base truncate">
                    {agent.name}
                  </h4>
                  <span className="text-sm font-bold text-foreground whitespace-nowrap">
                    {agent.price}
                  </span>
                </div>
                <p className="text-sm text-muted-foreground leading-relaxed truncate">
                  {agent.description}
                </p>
                <p className="text-xs text-primary/70 mt-1 truncate">
                  {agent.integrations}
                </p>
              </div>
            </div>
          );
        })}

        {hasMore && (
          <button
            onClick={() => setExpanded(!expanded)}
            className="flex items-center gap-1 text-sm font-medium text-primary hover:text-primary/80 transition-colors pt-2 ml-2"
          >
            {expanded
              ? language === "nl"
                ? "Toon minder"
                : "Show less"
              : `+${category.agents.length - 3} ${
                  language === "nl" ? "meer" : "more"
                }`}
            <ChevronDown
              className={`w-4 h-4 transition-transform ${
                expanded ? "rotate-180" : ""
              }`}
            />
          </button>
        )}
      </div>
    </motion.div>
  );
}

const Services = () => {
  const { language } = useLanguage();
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 });
  const categories = getCategories(language);

  useEffect(() => {
    const hash = window.location.hash;
    if (hash === "#services") {
      const timer = setTimeout(() => scrollToSection("services"), 500);
      return () => clearTimeout(timer);
    }
  }, []);

  return (
    <section id="services" className="py-20 sm:py-28 md:py-32 overflow-hidden">
      <div className="container mx-auto px-4 sm:px-6 max-w-6xl" ref={ref}>
        {/* Header */}
        <motion.div
          className="text-center mb-16 sm:mb-20"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <p className="text-sm font-medium text-primary uppercase tracking-widest mb-4">
            {language === "nl"
              ? `${categories.reduce((acc, c) => acc + c.agents.length, 0)} digitale medewerkers`
              : `${categories.reduce((acc, c) => acc + c.agents.length, 0)} digital employees`}
          </p>
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
            {language === "nl" ? (
              <>
                Welke agent past{" "}
                <span className="text-primary">bij jou</span>?
              </>
            ) : (
              <>
                Which agent fits{" "}
                <span className="text-primary">your team</span>?
              </>
            )}
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            {language === "nl"
              ? "Klik op een agent om je besparing te berekenen. Prijs na een gratis intake."
              : "Click an agent to calculate your savings. Pricing after a free intake."}
          </p>
        </motion.div>

        {/* Categories grid - 2x2 */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
          {categories.map((category) => (
            <CategoryCard
              key={category.id}
              category={category}
              language={language}
            />
          ))}
        </div>

        {/* Disclaimer */}
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-center text-xs text-muted-foreground/60 mt-10"
        >
          {language === "nl"
            ? "Alle prijzen zijn indicatief. De exacte prijs bepalen we samen na een gratis intake."
            : "All prices are indicative. We determine the exact price together after a free intake."}
        </motion.p>
      </div>
    </section>
  );
};

export default Services;
