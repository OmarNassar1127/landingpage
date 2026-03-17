import { generateMetadata as genMeta } from "@/lib/metadata";
import { faqSchema, breadcrumbSchema } from "@/lib/schema";
import { siteConfig } from "@/lib/config";
import Navbar from "@/components/sections/navbar";
import Footer from "@/components/sections/footer";
import { ArrowRight, Bot, Zap, Users, BookOpen, TrendingUp, CheckCircle, Clock, MessageSquare } from "lucide-react";

export const metadata = genMeta({
  title: "AI Agent Laten Bouwen — Maatwerk AI Agents",
  description:
    "Laat een maatwerk AI agent bouwen door Virelio. Van klantenservice tot sales: wij leveren werkende AI agents in 2 weken. Prijzen vanaf €2.000. GDPR-compliant, Amsterdam.",
  keywords:
    "AI agent laten bouwen, maatwerk AI agent, AI agent ontwikkeling, AI agent bouwen Nederland, custom AI agent, AI automatisering, AI bureau Amsterdam, AI agent kosten, klantenservice AI, sales agent AI",
  pathname: "/diensten/ai-agent-bouwen",
  locale: "nl_NL",
});

const faqItems = [
  {
    question: "Wat kost een AI agent laten bouwen?",
    answer:
      "Een eenvoudige AI agent kost vanaf €2.000 (eenmalig). Een complete bedrijfsoplossing met meerdere geïntegreerde agents ligt tussen de €5.000 en €15.000+. Daarbovenop zijn er maandelijkse kosten voor API-gebruik en hosting, doorgaans €200–€800 per maand afhankelijk van het volume.",
  },
  {
    question: "Hoe lang duurt het om een AI agent te bouwen?",
    answer:
      "Wij leveren een werkende prototype binnen 1 week na de intake. De volledige productieversie staat live binnen 2 weken. Complexere multi-agent systemen kunnen 3–4 weken in beslag nemen.",
  },
  {
    question: "Wat is het verschil tussen een AI agent en een chatbot?",
    answer:
      "Een traditionele chatbot volgt vaste scripts en kan alleen reageren op vooraf geprogrammeerde vragen. Een AI agent begrijpt context, neemt zelfstandig beslissingen, voert acties uit in externe systemen (zoals een CRM of agenda), en kan meerdere stappen achter elkaar uitvoeren zonder menselijke tussenkomst.",
  },
  {
    question: "Werkt de AI agent met mijn bestaande software?",
    answer:
      "Ja. Wij integreren met de meeste gangbare bedrijfssoftware: HubSpot, Salesforce, Zendesk, Exact Online, Shopify, Slack, en meer. Heeft u een eigen systeem? Via een API of webhook koppelen wij daar ook op aan.",
  },
  {
    question: "Is mijn data veilig bij een AI agent van Virelio?",
    answer:
      "Absoluut. Wij werken GDPR-compliant en al uw data wordt verwerkt binnen de EU. On-premise deployment is mogelijk als u data uw bedrijfsnetwerk niet wilt verlaten. U behoudt altijd 100% eigenaarschap van uw data — geen vendor lock-in.",
  },
];

const agentTypes = [
  {
    icon: MessageSquare,
    title: "Klantenservice Agent",
    description:
      "Beantwoordt 80% van support tickets automatisch. Integreert met Zendesk, Intercom, WhatsApp Business.",
    saving: "2 FTE bespaard",
  },
  {
    icon: TrendingUp,
    title: "Sales Agent",
    description:
      "Kwalificeert inbound leads, plant meetings in Calendly, stuurt gepersonaliseerde follow-ups.",
    saving: "+40% conversie",
  },
  {
    icon: Zap,
    title: "Operations Agent",
    description:
      "Verwerkt orders, maakt facturen aan, koppelt met Exact Online of Moneybird — volledig automatisch.",
    saving: "90% minder handwerk",
  },
  {
    icon: BookOpen,
    title: "Kennisbank Agent (RAG)",
    description:
      "Doorzoekt uw interne documenten (SharePoint, Notion, Confluence) en geeft antwoord met bronvermelding.",
    saving: "Antwoord in <5 sec",
  },
];

const processSteps = [
  {
    step: "01",
    title: "Gratis intake",
    duration: "Dag 1",
    description:
      "30 minuten videocall. Wij brengen uw proces in kaart, identificeren de grootste tijdverspillers, en schetsen de ideale agent-architectuur.",
  },
  {
    step: "02",
    title: "Prototype",
    duration: "Week 1",
    description:
      "U ontvangt een werkende demo van uw AI agent. U kunt direct testen, feedback geven en zien hoe de agent reageert op echte vragen.",
  },
  {
    step: "03",
    title: "Integraties",
    duration: "Week 2",
    description:
      "Wij koppelen de agent aan uw bestaande systemen: CRM, e-mail, agenda, klantenservice platform of ERP.",
  },
  {
    step: "04",
    title: "Live & monitoring",
    duration: "Einde week 2",
    description:
      "De agent gaat live. Wij monitoren de eerste weken actief en optimaliseren op basis van echte interacties.",
  },
];

const pricingTiers = [
  {
    name: "Starter",
    price: "€2.000",
    description: "Eén gerichte agent voor een specifieke taak",
    features: [
      "1 AI agent",
      "1 integratie (bijv. Slack of e-mail)",
      "Standaard LLM (GPT-4o of Claude)",
      "2 weken oplevering",
      "1 maand support",
    ],
  },
  {
    name: "Business",
    price: "€5.000 – €8.000",
    description: "Meerdere agents die samenwerken",
    features: [
      "2–4 samenwerkende agents",
      "Tot 3 integraties (CRM, ERP, support)",
      "Fijn afgestemd op uw tone-of-voice",
      "Dashboard met analytics",
      "3 maanden support",
    ],
    highlighted: true,
  },
  {
    name: "Enterprise",
    price: "€15.000+",
    description: "Volledige AI-transformatie van een afdeling",
    features: [
      "Onbeperkt agents",
      "On-premise deployment mogelijk",
      "Fine-tuned modellen",
      "Volledige systeem-integraties",
      "SLA + dedicated support",
    ],
  },
];

export default function AIAgentBouwenPage() {
  const faqSchemaData = faqSchema({ items: faqItems });

  const breadcrumbData = breadcrumbSchema({
    items: [
      { position: 1, name: "Home", item: siteConfig.url },
      { position: 2, name: "Diensten", item: `${siteConfig.url}/diensten` },
      {
        position: 3,
        name: "AI Agent Laten Bouwen",
        item: `${siteConfig.url}/diensten/ai-agent-bouwen`,
      },
    ],
  });

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchemaData) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbData) }}
      />

      <main className="min-h-screen bg-background">
        <Navbar customNavLinks={[
          { name: "Wat is een AI agent", href: "#wat-is-ai-agent" },
          { name: "Onze agents", href: "#onze-agents" },
          { name: "Proces", href: "#proces" },
          { name: "Prijzen", href: "#prijzen" },
          { name: "FAQ", href: "#faq" },
        ]} />

        {/* Hero */}
        <section className="pt-24 sm:pt-32 md:pt-40 pb-12 sm:pb-16 md:pb-20">
          <div className="container mx-auto px-6 sm:px-8 max-w-4xl text-center">
            <div className="inline-flex items-center gap-2 rounded-full bg-muted/60 border border-border/60 px-4 py-1.5 text-xs sm:text-sm text-muted-foreground mb-6">
              <Bot className="h-3.5 w-3.5 text-primary" />
              Maatwerk AI Agent Development — Amsterdam
            </div>
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold leading-[1.1] tracking-tight text-foreground mb-5 sm:mb-6">
              AI Agent Laten Bouwen
              <span className="block text-primary mt-1">voor Jouw Bedrijf</span>
            </h1>
            <p className="text-base sm:text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed mb-8 sm:mb-10">
              Virelio bouwt maatwerk AI agents die zelfstandig taken uitvoeren,
              beslissingen nemen en integreren met uw bestaande software.
              Prototype in 1 week. Live in 2 weken. Vanaf €2.000.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <a
                href="https://calendly.com/omarnassar1127/30min"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 rounded-xl bg-foreground px-7 py-3.5 text-sm font-medium text-background transition-all hover:bg-foreground/90 active:scale-[0.98]"
              >
                Plan gratis intake
                <ArrowRight className="h-4 w-4" />
              </a>
              <a
                href="mailto:info@virelio.nl"
                className="inline-flex items-center justify-center gap-2 rounded-xl border border-border/60 bg-background px-7 py-3.5 text-sm font-medium text-foreground transition-all hover:bg-muted/40 active:scale-[0.98]"
              >
                Stel een vraag
              </a>
            </div>

            {/* Social proof strip */}
            <div className="mt-10 sm:mt-12 flex flex-wrap justify-center gap-x-8 gap-y-3 text-xs sm:text-sm text-muted-foreground">
              <span className="flex items-center gap-1.5">
                <CheckCircle className="h-4 w-4 text-primary" />
                18+ bedrijven geholpen
              </span>
              <span className="flex items-center gap-1.5">
                <CheckCircle className="h-4 w-4 text-primary" />
                Live in 2 weken
              </span>
              <span className="flex items-center gap-1.5">
                <CheckCircle className="h-4 w-4 text-primary" />
                GDPR-compliant, EU data
              </span>
              <span className="flex items-center gap-1.5">
                <CheckCircle className="h-4 w-4 text-primary" />
                Gratis intake, geen verplichtingen
              </span>
            </div>
          </div>
        </section>

        {/* What is an AI agent */}
        <section id="wat-is-ai-agent" className="py-12 sm:py-16 md:py-20 border-t border-border/50">
          <div className="container mx-auto px-6 sm:px-8 max-w-4xl">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-foreground mb-4 sm:mb-6">
              Wat is een AI agent — en waarom is het geen chatbot?
            </h2>
            <div className="grid md:grid-cols-2 gap-6 sm:gap-8">
              <div>
                <p className="text-sm sm:text-base text-muted-foreground leading-relaxed mb-4">
                  Een AI agent is software die zelfstandig een doel nastreeft.
                  Het systeem percipieert informatie uit zijn omgeving (e-mail,
                  CRM, documenten), neemt beslissingen en voert acties uit —
                  zonder dat een mens elke stap hoeft te bevestigen.
                </p>
                <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">
                  Een traditionele chatbot reageert alleen op directe input
                  volgens vaste regels. Een AI agent kan zelf een taak
                  opzetten, tools aanroepen, systemen raadplegen en meerdere
                  stappen achter elkaar uitvoeren om een resultaat te bereiken.
                </p>
              </div>
              <div className="rounded-2xl bg-muted/40 border border-border/60 shadow-sm p-5 sm:p-6">
                <h3 className="font-bold text-foreground mb-4 text-sm sm:text-base">
                  Chatbot vs. AI Agent
                </h3>
                <div className="space-y-3 text-sm">
                  {[
                    ["Reageert op input", "Handelt proactief"],
                    ["Vaste scripts", "Zelfstandige beslissingen"],
                    ["Geen externe acties", "Roept tools & API's aan"],
                    ["1 stap per keer", "Meerdere stappen in serie"],
                    ["Geen geheugen", "Behoudt context"],
                  ].map(([chatbot, agent]) => (
                    <div
                      key={chatbot}
                      className="grid grid-cols-2 gap-3"
                    >
                      <div className="flex items-center gap-2 text-muted-foreground">
                        <span className="h-1.5 w-1.5 rounded-full bg-border flex-shrink-0" />
                        {chatbot}
                      </div>
                      <div className="flex items-center gap-2 text-foreground font-medium">
                        <span className="h-1.5 w-1.5 rounded-full bg-primary flex-shrink-0" />
                        {agent}
                      </div>
                    </div>
                  ))}
                </div>
                <div className="mt-4 pt-4 border-t border-border/40 flex gap-6 text-xs text-muted-foreground">
                  <span>Chatbot</span>
                  <span className="text-primary font-semibold">AI Agent</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Agent types */}
        <section id="onze-agents" className="py-12 sm:py-16 md:py-20 border-t border-border/50 bg-muted/20">
          <div className="container mx-auto px-6 sm:px-8 max-w-5xl">
            <div className="mb-8 sm:mb-12 text-center">
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-foreground mb-3 sm:mb-4">
                Welke agents bouwen wij?
              </h2>
              <p className="text-sm sm:text-base text-muted-foreground max-w-xl mx-auto">
                Wij hebben gespecialiseerde agents gebouwd voor elk type
                bedrijfstaak — elk volledig maatwerk op uw proces.
              </p>
            </div>
            <div className="grid sm:grid-cols-2 gap-4 sm:gap-5">
              {agentTypes.map((agent) => (
                <div
                  key={agent.title}
                  className="rounded-2xl bg-muted/40 border border-border/60 shadow-sm p-5 sm:p-6"
                >
                  <div className="flex items-start gap-4">
                    <div className="flex h-10 w-10 sm:h-11 sm:w-11 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary">
                      <agent.icon className="h-5 w-5" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between gap-2 mb-1.5">
                        <h3 className="font-bold text-foreground text-sm sm:text-base">
                          {agent.title}
                        </h3>
                        <span className="shrink-0 text-[11px] font-semibold text-primary bg-primary/10 rounded-full px-2.5 py-0.5">
                          {agent.saving}
                        </span>
                      </div>
                      <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
                        {agent.description}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <p className="mt-6 text-center text-sm text-muted-foreground">
              Heeft u een andere use case?{" "}
              <a
                href="https://calendly.com/omarnassar1127/30min"
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary hover:underline font-medium"
              >
                Vertel ons uw situatie
              </a>{" "}
              — wij denken graag mee.
            </p>
          </div>
        </section>

        {/* Process */}
        <section id="proces" className="py-12 sm:py-16 md:py-20 border-t border-border/50">
          <div className="container mx-auto px-6 sm:px-8 max-w-4xl">
            <div className="mb-8 sm:mb-12 text-center">
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-foreground mb-3 sm:mb-4">
                Van intake naar live in 2 weken
              </h2>
              <p className="text-sm sm:text-base text-muted-foreground max-w-xl mx-auto">
                Ons proces is snel, transparant en gericht op resultaat — niet
                op eindeloze analysefases.
              </p>
            </div>
            <div className="relative">
              {/* Vertical line */}
              <div className="absolute left-6 sm:left-8 top-0 bottom-0 w-px bg-border/60 hidden sm:block" />
              <div className="space-y-4 sm:space-y-6">
                {processSteps.map((step) => (
                  <div key={step.step} className="flex gap-4 sm:gap-6">
                    <div className="flex flex-col items-center shrink-0">
                      <div className="flex h-12 w-12 sm:h-16 sm:w-16 items-center justify-center rounded-2xl bg-foreground text-background text-xs sm:text-sm font-bold z-10">
                        {step.step}
                      </div>
                    </div>
                    <div className="flex-1 rounded-2xl bg-muted/40 border border-border/60 shadow-sm p-4 sm:p-5 pb-5 sm:pb-6">
                      <div className="flex items-center justify-between mb-2">
                        <h3 className="font-bold text-foreground text-sm sm:text-base">
                          {step.title}
                        </h3>
                        <span className="flex items-center gap-1 text-[11px] text-muted-foreground">
                          <Clock className="h-3 w-3" />
                          {step.duration}
                        </span>
                      </div>
                      <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
                        {step.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Pricing */}
        <section id="prijzen" className="py-12 sm:py-16 md:py-20 border-t border-border/50 bg-muted/20">
          <div className="container mx-auto px-6 sm:px-8 max-w-5xl">
            <div className="mb-8 sm:mb-12 text-center">
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-foreground mb-3 sm:mb-4">
                Transparante prijzen
              </h2>
              <p className="text-sm sm:text-base text-muted-foreground max-w-xl mx-auto">
                Geen verrassingen achteraf. Alle prijzen zijn eenmalige
                ontwikkelkosten. Maandelijkse API- en hostingkosten zijn
                doorgaans €200–€800.
              </p>
            </div>
            <div className="grid sm:grid-cols-3 gap-4 sm:gap-5">
              {pricingTiers.map((tier) => (
                <div
                  key={tier.name}
                  className={`rounded-2xl border shadow-sm p-5 sm:p-6 flex flex-col ${
                    tier.highlighted
                      ? "bg-foreground text-background border-foreground"
                      : "bg-muted/40 border-border/60 text-foreground"
                  }`}
                >
                  <div className="mb-4">
                    <p
                      className={`text-xs font-semibold uppercase tracking-wider mb-1 ${
                        tier.highlighted
                          ? "text-background/60"
                          : "text-muted-foreground"
                      }`}
                    >
                      {tier.name}
                    </p>
                    <p
                      className={`text-2xl sm:text-3xl font-bold ${
                        tier.highlighted ? "text-background" : "text-foreground"
                      }`}
                    >
                      {tier.price}
                    </p>
                    <p
                      className={`text-xs sm:text-sm mt-1 ${
                        tier.highlighted
                          ? "text-background/70"
                          : "text-muted-foreground"
                      }`}
                    >
                      {tier.description}
                    </p>
                  </div>
                  <ul className="space-y-2 flex-1">
                    {tier.features.map((feature) => (
                      <li
                        key={feature}
                        className={`flex items-start gap-2 text-xs sm:text-sm ${
                          tier.highlighted
                            ? "text-background/80"
                            : "text-muted-foreground"
                        }`}
                      >
                        <CheckCircle
                          className={`h-3.5 w-3.5 mt-0.5 shrink-0 ${
                            tier.highlighted ? "text-background" : "text-primary"
                          }`}
                        />
                        {feature}
                      </li>
                    ))}
                  </ul>
                  <a
                    href="https://calendly.com/omarnassar1127/30min"
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`mt-6 inline-flex items-center justify-center gap-2 rounded-xl px-5 py-2.5 text-sm font-medium transition-all hover:opacity-90 active:scale-[0.98] ${
                      tier.highlighted
                        ? "bg-background text-foreground"
                        : "bg-foreground text-background"
                    }`}
                  >
                    Gesprek plannen
                    <ArrowRight className="h-3.5 w-3.5" />
                  </a>
                </div>
              ))}
            </div>
            <p className="mt-6 text-center text-xs sm:text-sm text-muted-foreground">
              WBSO-subsidie van toepassing? U kunt tot 35% van de R&D-kosten
              terugkrijgen via de WBSO-regeling. Wij helpen u daarbij.
            </p>
          </div>
        </section>

        {/* FAQ */}
        <section id="faq" className="py-12 sm:py-16 md:py-20 border-t border-border/50">
          <div className="container mx-auto px-6 sm:px-8 max-w-3xl">
            <h2 className="text-2xl sm:text-3xl font-bold text-foreground mb-8 sm:mb-10">
              Veelgestelde vragen
            </h2>
            <div className="space-y-4 sm:space-y-5">
              {faqItems.map((item) => (
                <div
                  key={item.question}
                  className="rounded-2xl bg-muted/40 border border-border/60 shadow-sm p-5 sm:p-6"
                >
                  <h3 className="font-bold text-foreground text-sm sm:text-base mb-2 sm:mb-3">
                    {item.question}
                  </h3>
                  <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
                    {item.answer}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Bottom CTA */}
        <section className="border-t border-border/50 bg-muted/20">
          <div className="container mx-auto px-6 sm:px-8 max-w-4xl py-12 sm:py-16 md:py-20 text-center">
            <h2 className="mb-3 sm:mb-4 text-2xl sm:text-3xl md:text-4xl font-bold text-foreground">
              Klaar om uw eerste AI agent te bouwen?
            </h2>
            <p className="mb-6 sm:mb-8 text-sm sm:text-base text-muted-foreground max-w-lg mx-auto">
              Plan een gratis intake van 30 minuten. Geen verkoopverhaal — wij
              luisteren naar uw situatie en vertellen u eerlijk wat mogelijk is.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <a
                href="https://calendly.com/omarnassar1127/30min"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 rounded-xl bg-foreground px-8 py-4 text-sm font-medium text-background transition-all hover:bg-foreground/90 active:scale-[0.98]"
              >
                Plan gratis intake
                <ArrowRight className="h-4 w-4" />
              </a>
              <a
                href="mailto:info@virelio.nl"
                className="inline-flex items-center justify-center gap-2 rounded-xl border border-border/60 bg-background px-8 py-4 text-sm font-medium text-foreground transition-all hover:bg-muted/40 active:scale-[0.98]"
              >
                Mail ons direct
              </a>
            </div>
            <p className="mt-5 text-xs text-muted-foreground">
              Virelio — AI Agent Bureau · Amsterdam ·{" "}
              <a
                href="tel:+31687838713"
                className="hover:text-foreground transition-colors"
              >
                +31 6 87838713
              </a>
            </p>
          </div>
        </section>

        <Footer />
      </main>
    </>
  );
}
