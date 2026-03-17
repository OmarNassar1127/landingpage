import { generateMetadata as genMeta } from "@/lib/metadata";
import { faqSchema, breadcrumbSchema } from "@/lib/schema";
import { siteConfig } from "@/lib/config";
import Navbar from "@/components/sections/navbar";
import Footer from "@/components/sections/footer";
import {
  ArrowRight,
  Zap,
  CheckCircle,
  TrendingUp,
  ShieldCheck,
  Package,
  CreditCard,
  Users,
  Puzzle,
} from "lucide-react";

export const metadata = genMeta({
  title: "AI Automatisering voor MKB — Betaalbaar & Schaalbaar",
  description:
    "AI automatisering speciaal voor het Nederlandse MKB. Betaalbaar vanaf €2.000, live in 2 weken, geen IT-afdeling nodig. Inclusief WBSO-subsidie van 35%. Virelio, Amsterdam.",
  keywords:
    "AI automatisering MKB, AI voor MKB, AI agent MKB, automatisering midden klein bedrijf, betaalbare AI, WBSO subsidie AI, AI HubSpot integratie, Shopify AI automatisering, Exact Online AI, AI bureau MKB Nederland, klantenservice automatisering MKB",
  pathname: "/diensten/ai-automatisering-mkb",
  locale: "nl_NL",
});

const faqItems = [
  {
    question: "Is AI automatisering ook betaalbaar voor kleine bedrijven?",
    answer:
      "Absoluut. Onze eenvoudige AI agents starten vanaf €2.000 eenmalig. Maandelijkse kosten liggen doorgaans tussen €200 en €500. Bij een besparing van €2.000 per maand is de ROI al in de eerste maand positief. We bouwen bewust schaalbaar: u begint klein en breidt uit zodra de ROI bewezen is.",
  },
  {
    question: "Heb ik een IT-afdeling nodig voor AI automatisering?",
    answer:
      "Nee. Wij verzorgen de volledige implementatie, integratie en lancering. Na oplevering beheer u de agent via een eenvoudig dashboard zonder technische kennis. Heeft u een vraag of wilt u iets aanpassen? U belt ons — geen IT-kennis vereist.",
  },
  {
    question: "Wat is de WBSO-subsidie en hoe werkt dat?",
    answer:
      "WBSO (Wet Bevordering Speur- en Ontwikkelingswerk) is een Nederlandse subsidieregeling voor bedrijven die R&D uitvoeren, inclusief AI-ontwikkeling. U ontvangt 32–40% van uw R&D-loonkosten terug. Wij helpen u bij de aanvraag en zorgen voor de juiste documentatie. Dit kan de effectieve kosten van een AI-project aanzienlijk verlagen.",
  },
  {
    question: "Welke software integreert u met?",
    answer:
      "Wij integreren met vrijwel alle gangbare MKB-software: Exact Online, Moneybird, Twinfield (boekhouding), HubSpot, Pipedrive, Salesforce (CRM), Zendesk, Intercom (support), Shopify, WooCommerce, Bol.com (e-commerce), Slack, Teams, WhatsApp Business, en meer. Heeft u een maatwerksysteem? Via een API of webhook koppelen wij ook daarop.",
  },
  {
    question: "Hoe snel zien we resultaat?",
    answer:
      "De eerste resultaten zijn zichtbaar zodra de agent live gaat, doorgaans 2 weken na de intake. Wij meten samen met u de impact: minder handmatig werk, snellere responstijden, hogere klanttevredenheid. In de eerste maand rapporteren wij de besparingen zodat u zwart op wit ziet wat de investering oplevert.",
  },
];

const scenarios = [
  {
    icon: Users,
    title: "Klantenservice automatisering",
    problem:
      "Uw support-medewerkers besteden 60% van hun tijd aan dezelfde 20 vragen: levertijden, retouren, factuurvragen.",
    solution:
      "Een AI klantenservice agent beantwoordt 80% van inkomende tickets automatisch via e-mail, WhatsApp en chat. De resterende 20% wordt slim doorgestuurd naar de juiste collega.",
    monthly: "€3.500/maand",
    yearly: "€42.000/jaar",
    investment: "Investering: €4.000 eenmalig",
  },
  {
    icon: CreditCard,
    title: "Facturatie & betalingsherinneringen",
    problem:
      "Facturen worden te laat verstuurd, betalingsherinneringen vergeten, en het bijhouden van openstaande posten kost uren per week.",
    solution:
      "Een finance agent koppelt met Exact Online of Moneybird, maakt facturen automatisch aan na een order, verstuurt herinneringen op dag 14 en 30, en matcht inkomende betalingen.",
    monthly: "€1.800/maand",
    yearly: "€21.600/jaar",
    investment: "Investering: €2.500 eenmalig",
  },
  {
    icon: Package,
    title: "Orderverwerking & logistiek",
    problem:
      "Bestellingen uit Shopify, e-mail en telefoon worden handmatig verwerkt. Fouten in orders, verkeerde adressen en gemiste leveringen kosten klanten en reputatie.",
    solution:
      "Een operations agent pakt orders op uit alle kanalen, controleert voorraad, maakt verzenddocumenten aan via Sendcloud, en stuurt de klant automatisch een track & trace-link.",
    monthly: "€2.200/maand",
    yearly: "€26.400/jaar",
    investment: "Investering: €3.500 eenmalig",
  },
];

const whyMKB = [
  {
    icon: CreditCard,
    title: "Betaalbaar vanaf €2.000",
    description:
      "Geen enterprise-prijzen. Wij bouwen gerichte oplossingen die snel rendement opleveren — niet overengineered.",
  },
  {
    icon: Zap,
    title: "Live in 2 weken",
    description:
      "Geen maandenlange implementatietrajecten. Prototype in week 1, productie in week 2.",
  },
  {
    icon: ShieldCheck,
    title: "Geen IT-team nodig",
    description:
      "Wij verzorgen alles: bouw, integratie, lancering en onderhoud. U runt uw business, wij runnen de techniek.",
  },
  {
    icon: TrendingUp,
    title: "Schaalbaar met uw groei",
    description:
      "Begin met één agent voor één taak. Voeg agents toe zodra de ROI bewezen is — zonder dure herimplementaties.",
  },
];

const integrations = [
  { category: "Boekhouding", tools: ["Exact Online", "Moneybird", "Twinfield", "Snelstart"] },
  { category: "CRM & Sales", tools: ["HubSpot", "Pipedrive", "Salesforce", "Zoho"] },
  { category: "Klantenservice", tools: ["Zendesk", "Intercom", "Freshdesk", "Crisp"] },
  { category: "E-commerce", tools: ["Shopify", "WooCommerce", "Bol.com", "Lightspeed"] },
  { category: "Communicatie", tools: ["Slack", "Teams", "WhatsApp Business", "Gmail"] },
  { category: "Logistiek", tools: ["Sendcloud", "MyParcel", "DHL API", "PostNL API"] },
];

export default function AIAutomatiseringMKBPage() {
  const faqSchemaData = faqSchema({ items: faqItems });

  const breadcrumbData = breadcrumbSchema({
    items: [
      { position: 1, name: "Home", item: siteConfig.url },
      { position: 2, name: "Diensten", item: `${siteConfig.url}/diensten` },
      {
        position: 3,
        name: "AI Automatisering voor MKB",
        item: `${siteConfig.url}/diensten/ai-automatisering-mkb`,
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
          { name: "Waarom MKB", href: "#waarom-mkb" },
          { name: "Scenario's", href: "#scenarios" },
          { name: "Integraties", href: "#integraties" },
          { name: "FAQ", href: "#faq" },
        ]} />

        {/* Hero */}
        <section className="pt-24 sm:pt-32 md:pt-40 pb-12 sm:pb-16 md:pb-20">
          <div className="container mx-auto px-6 sm:px-8 max-w-4xl text-center">
            <div className="inline-flex items-center gap-2 rounded-full bg-muted/60 border border-border/60 px-4 py-1.5 text-xs sm:text-sm text-muted-foreground mb-6">
              <Zap className="h-3.5 w-3.5 text-primary" />
              Speciaal voor het Nederlandse MKB
            </div>
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold leading-[1.1] tracking-tight text-foreground mb-5 sm:mb-6">
              AI Automatisering voor MKB
              <span className="block text-primary mt-1">
                Betaalbaar & Schaalbaar
              </span>
            </h1>
            <p className="text-base sm:text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed mb-8 sm:mb-10">
              Klaar met handmatig facturen versturen, dezelfde e-mails
              beantwoorden en orders nakijken? Virelio bouwt AI agents die deze
              taken volledig overnemen — betaalbaar, snel en zonder IT-afdeling.
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

            {/* Social proof */}
            <div className="mt-10 sm:mt-12 flex flex-wrap justify-center gap-x-8 gap-y-3 text-xs sm:text-sm text-muted-foreground">
              <span className="flex items-center gap-1.5">
                <CheckCircle className="h-4 w-4 text-primary" />
                Vanaf €2.000 eenmalig
              </span>
              <span className="flex items-center gap-1.5">
                <CheckCircle className="h-4 w-4 text-primary" />
                Live in 2 weken
              </span>
              <span className="flex items-center gap-1.5">
                <CheckCircle className="h-4 w-4 text-primary" />
                WBSO-subsidie mogelijk (35%)
              </span>
              <span className="flex items-center gap-1.5">
                <CheckCircle className="h-4 w-4 text-primary" />
                Geen IT-kennis nodig
              </span>
            </div>
          </div>
        </section>

        {/* Why MKB */}
        <section id="waarom-mkb" className="py-12 sm:py-16 md:py-20 border-t border-border/50 bg-muted/20">
          <div className="container mx-auto px-6 sm:px-8 max-w-5xl">
            <div className="mb-8 sm:mb-12 text-center">
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-foreground mb-3 sm:mb-4">
                Waarom AI speciaal voor het MKB?
              </h2>
              <p className="text-sm sm:text-base text-muted-foreground max-w-2xl mx-auto">
                Grote bedrijven hebben IT-teams, budgetten en consultants.
                Het MKB heeft dat niet — maar heeft wel dezelfde repetitieve
                processen. Wij bouwen AI die werkt zonder enterprise-overhead.
              </p>
            </div>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
              {whyMKB.map((item) => (
                <div
                  key={item.title}
                  className="rounded-2xl bg-muted/40 border border-border/60 shadow-sm p-5 sm:p-6"
                >
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10 text-primary mb-3">
                    <item.icon className="h-5 w-5" />
                  </div>
                  <h3 className="font-bold text-foreground text-sm sm:text-base mb-2">
                    {item.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
                    {item.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Scenarios with ROI */}
        <section id="scenarios" className="py-12 sm:py-16 md:py-20 border-t border-border/50">
          <div className="container mx-auto px-6 sm:px-8 max-w-5xl">
            <div className="mb-8 sm:mb-12 text-center">
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-foreground mb-3 sm:mb-4">
                3 concrete scenario's met ROI
              </h2>
              <p className="text-sm sm:text-base text-muted-foreground max-w-xl mx-auto">
                Elke berekening is gebaseerd op gemiddeld MKB-bedrijf met
                5–50 medewerkers. Uw situatie kan gunstiger zijn.
              </p>
            </div>
            <div className="space-y-5 sm:space-y-6">
              {scenarios.map((scenario, index) => (
                <div
                  key={scenario.title}
                  className="rounded-2xl bg-muted/40 border border-border/60 shadow-sm p-5 sm:p-6"
                >
                  <div className="flex flex-col sm:flex-row sm:items-start gap-5 sm:gap-6">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-3">
                        <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-primary/10 text-primary shrink-0">
                          <scenario.icon className="h-4.5 w-4.5 h-[18px] w-[18px]" />
                        </div>
                        <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                          Scenario {index + 1}
                        </span>
                      </div>
                      <h3 className="font-bold text-foreground text-base sm:text-lg mb-3">
                        {scenario.title}
                      </h3>
                      <div className="space-y-2.5">
                        <div>
                          <p className="text-[11px] font-semibold text-muted-foreground uppercase tracking-wide mb-1">
                            Het probleem
                          </p>
                          <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
                            {scenario.problem}
                          </p>
                        </div>
                        <div>
                          <p className="text-[11px] font-semibold text-muted-foreground uppercase tracking-wide mb-1">
                            De oplossing
                          </p>
                          <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
                            {scenario.solution}
                          </p>
                        </div>
                      </div>
                    </div>
                    <div className="sm:w-48 shrink-0">
                      <div className="rounded-xl bg-primary/10 border border-primary/20 text-foreground p-4 text-center">
                        <p className="text-[11px] font-medium text-primary mb-1">
                          Besparing
                        </p>
                        <p className="text-xl sm:text-2xl font-bold text-foreground mb-0.5">
                          {scenario.monthly}
                        </p>
                        <p className="text-sm font-semibold text-primary">
                          {scenario.yearly}
                        </p>
                        <div className="mt-3 pt-3 border-t border-border/30">
                          <p className="text-[11px] text-muted-foreground">
                            {scenario.investment}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* WBSO */}
        <section className="py-12 sm:py-16 md:py-20 border-t border-border/50 bg-muted/20">
          <div className="container mx-auto px-6 sm:px-8 max-w-4xl">
            <div className="grid md:grid-cols-2 gap-6 sm:gap-8 items-center">
              <div>
                <div className="inline-flex items-center gap-2 rounded-full bg-primary/10 border border-primary/20 px-3 py-1 text-xs font-semibold text-primary mb-4">
                  <ShieldCheck className="h-3.5 w-3.5" />
                  WBSO Subsidie
                </div>
                <h2 className="text-2xl sm:text-3xl font-bold text-foreground mb-4">
                  Tot 35% subsidie op uw AI-investering
                </h2>
                <p className="text-sm sm:text-base text-muted-foreground leading-relaxed mb-4">
                  De WBSO (Wet Bevordering Speur- en Ontwikkelingswerk) vergoedt
                  een significant deel van R&D-loonkosten voor bedrijven die
                  innovatieve AI-systemen ontwikkelen. Maatwerk AI agents vallen
                  doorgaans onder deze regeling.
                </p>
                <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">
                  Dit betekent dat een project van €8.000 effectief nog maar
                  <strong className="text-foreground"> €5.200 kost</strong> na
                  WBSO-teruggave. Wij helpen u bij de aanvraag en documentatie.
                </p>
              </div>
              <div className="rounded-2xl bg-muted/40 border border-border/60 shadow-sm p-5 sm:p-6">
                <h3 className="font-bold text-foreground mb-4 text-sm sm:text-base">
                  WBSO in de praktijk
                </h3>
                <div className="space-y-3">
                  {[
                    ["Projectkosten", "€8.000"],
                    ["WBSO-teruggave (35%)", "– €2.800"],
                    ["Effectieve investering", "€5.200"],
                    ["Maandelijkse besparing", "€3.000"],
                    ["Terugverdientijd", "< 2 maanden"],
                    ["Besparing jaar 1 (netto)", "€30.800"],
                  ].map(([label, value], i) => (
                    <div
                      key={label}
                      className={`flex justify-between items-center text-sm ${
                        i === 5
                          ? "pt-3 border-t border-border/40 font-bold text-foreground"
                          : "text-muted-foreground"
                      }`}
                    >
                      <span>{label}</span>
                      <span
                        className={
                          i === 4 || i === 5 ? "text-primary font-semibold" : ""
                        }
                      >
                        {value}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Integrations */}
        <section id="integraties" className="py-12 sm:py-16 md:py-20 border-t border-border/50">
          <div className="container mx-auto px-6 sm:px-8 max-w-5xl">
            <div className="mb-8 sm:mb-10 text-center">
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-foreground mb-3 sm:mb-4">
                Integreert met uw bestaande software
              </h2>
              <p className="text-sm sm:text-base text-muted-foreground max-w-xl mx-auto">
                Geen vervanging van uw huidige systemen — wij bouwen er
                bovenop. De AI agent werkt samen met de tools die u al gebruikt.
              </p>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 sm:gap-5">
              {integrations.map((group) => (
                <div
                  key={group.category}
                  className="rounded-2xl bg-muted/40 border border-border/60 shadow-sm p-4 sm:p-5"
                >
                  <div className="flex items-center gap-2 mb-3">
                    <Puzzle className="h-4 w-4 text-primary shrink-0" />
                    <h3 className="font-bold text-foreground text-xs sm:text-sm">
                      {group.category}
                    </h3>
                  </div>
                  <ul className="space-y-1.5">
                    {group.tools.map((tool) => (
                      <li
                        key={tool}
                        className="text-[11px] sm:text-xs text-muted-foreground flex items-center gap-1.5"
                      >
                        <span className="h-1 w-1 rounded-full bg-border flex-shrink-0" />
                        {tool}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
            <p className="mt-5 text-center text-xs sm:text-sm text-muted-foreground">
              Uw software staat er niet bij?{" "}
              <a
                href="mailto:info@virelio.nl"
                className="text-primary hover:underline font-medium"
              >
                Vraag het ons
              </a>{" "}
              — als er een API is, kunnen wij koppelen.
            </p>
          </div>
        </section>

        {/* FAQ */}
        <section id="faq" className="py-12 sm:py-16 md:py-20 border-t border-border/50 bg-muted/20">
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
        <section className="border-t border-border/50">
          <div className="container mx-auto px-6 sm:px-8 max-w-4xl py-12 sm:py-16 md:py-20 text-center">
            <h2 className="mb-3 sm:mb-4 text-2xl sm:text-3xl md:text-4xl font-bold text-foreground">
              Welk proces automatiseren we als eerste?
            </h2>
            <p className="mb-6 sm:mb-8 text-sm sm:text-base text-muted-foreground max-w-lg mx-auto">
              Plan een gratis gesprek van 30 minuten. Wij analyseren uw drie
              grootste tijdverspillers en berekenen de exacte ROI van
              automatisering voor uw situatie.
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
