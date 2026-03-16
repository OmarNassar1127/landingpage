import { generateMetadata as genMeta } from "@/lib/metadata";
import { faqSchema, breadcrumbSchema } from "@/lib/schema";
import { siteConfig } from "@/lib/config";
import Navbar from "@/components/sections/navbar";
import Footer from "@/components/sections/footer";
import {
  ArrowRight,
  Users,
  Layers,
  BarChart3,
  CheckCircle,
  Building2,
  HeartPulse,
  Calculator,
  Headphones,
  TrendingUp,
} from "lucide-react";

export const metadata = genMeta({
  title: "Digitale Medewerker — AI die Zelfstandig Werk Overneemt",
  description:
    "Een digitale medewerker van Virelio werkt 24/7, maakt geen fouten en kost een fractie van een menselijke FTE. Multi-agent AI die taken overneemt in HR, finance, operations en klantenservice. Amsterdam.",
  keywords:
    "digitale medewerker, AI medewerker, virtuele medewerker, AI automatisering bedrijf, digitale collega, AI agent HR, AI finance automatisering, klantenservice automatisering, operations AI, multi-agent systeem, AI bureau Amsterdam",
  pathname: "/diensten/digitale-medewerker",
  locale: "nl_NL",
});

const faqItems = [
  {
    question: "Wat is een digitale medewerker precies?",
    answer:
      "Een digitale medewerker is een AI-systeem dat zelfstandig een rol vervult binnen uw organisatie — net zoals een menselijke medewerker, maar dan 24/7, foutloos en zonder ziekteverlof. Het systeem bestaat uit meerdere samenwerkende AI agents die samen een takenpakket beheren: van het beantwoorden van klantvragen tot het verwerken van facturen.",
  },
  {
    question: "Hoe verschilt een digitale medewerker van gewone automatisering?",
    answer:
      "Traditionele automatisering (RPA, scripts) volgt vaste regels en faalt bij uitzonderingen. Een digitale medewerker begrijpt context, past zich aan op nieuwe situaties en kan complexe beslissingen nemen. Hij leest e-mails, begrijpt de intentie en kiest de juiste actie — ook als het bericht onverwacht is.",
  },
  {
    question: "Voor welke afdelingen is een digitale medewerker geschikt?",
    answer:
      "Vrijwel elke afdeling met repetitieve kenniswerk: klantenservice (ticketverwerking), HR (onboarding, vragen van medewerkers), finance (facturatie, betalingsherinneringen, rapportages), operations (orderverwerking, planning) en sales (lead kwalificatie, follow-up).",
  },
  {
    question: "Wat zijn de kosten van een digitale medewerker?",
    answer:
      "De eenmalige implementatiekosten liggen tussen €5.000 en €15.000 afhankelijk van complexiteit. De maandelijkse operationele kosten zijn €300–€1.000 voor API-gebruik en hosting. Ter vergelijking: een menselijke FTE kost gemiddeld €40.000–€60.000 per jaar inclusief overhead.",
  },
  {
    question: "Kan een digitale medewerker complexe vragen of uitzonderingen aan?",
    answer:
      "Ja, maar voor echt complexe of gevoelige situaties escaleren wij altijd naar een mens. U stelt zelf de grens in: welke zaken handelt de agent af, en wanneer stuurt hij door? Dit zorgt voor de juiste balans tussen automatisering en menselijke aandacht.",
  },
];

const departments = [
  {
    icon: HeartPulse,
    name: "HR",
    tasks: [
      "Onboarding nieuwe medewerkers (accounts, documenten, intro's)",
      "Beantwoorden van HR-vragen (verlof, beleid, salarisstroken)",
      "Contractscreening en administratie",
      "Exit-interviews automatisch verwerken",
    ],
    saving: "€30.000/jaar bespaard",
    savingMonthly: "€2.500/maand",
  },
  {
    icon: Calculator,
    name: "Finance",
    tasks: [
      "Facturen automatisch aanmaken en versturen",
      "Betalingsherinneringen op de juiste momenten",
      "Inkomende betalingen matchen met openstaande facturen",
      "Maandelijkse financiële rapportages genereren",
    ],
    saving: "€24.000/jaar bespaard",
    savingMonthly: "€2.000/maand",
  },
  {
    icon: Building2,
    name: "Operations",
    tasks: [
      "Orders verwerken vanuit Shopify, e-mail of formulieren",
      "Voorraad controleren en leveranciers informeren",
      "Logistieke planning en track & trace updates",
      "Rapportages over operationele KPI's",
    ],
    saving: "€36.000/jaar bespaard",
    savingMonthly: "€3.000/maand",
  },
  {
    icon: Headphones,
    name: "Klantenservice",
    tasks: [
      "80% van inkomende tickets automatisch afhandelen",
      "24/7 reageren op WhatsApp, e-mail en chat",
      "Complexe vragen escaleren naar de juiste medewerker",
      "Klanttevredenheidsscores bijhouden",
    ],
    saving: "€80.000/jaar bespaard",
    savingMonthly: "€6.700/maand",
  },
];

const roiItems = [
  {
    label: "Gemiddelde FTE-kosten",
    human: "€50.000/jaar",
    digital: "€8.400/jaar",
    highlight: false,
  },
  {
    label: "Beschikbaarheid",
    human: "40 uur/week",
    digital: "168 uur/week (24/7)",
    highlight: true,
  },
  {
    label: "Foutpercentage",
    human: "5–15%",
    digital: "<1%",
    highlight: false,
  },
  {
    label: "Opstarttijd",
    human: "3–6 maanden",
    digital: "2 weken",
    highlight: true,
  },
  {
    label: "Schaalbaar",
    human: "Nee (nieuwe FTE nodig)",
    digital: "Direct, geen extra kosten",
    highlight: false,
  },
];

const howItWorks = [
  {
    step: "01",
    title: "Multi-agent architectuur",
    description:
      "Een digitale medewerker bestaat niet uit één agent, maar uit een team van gespecialiseerde sub-agents. Een orchestrator verdeelt het werk: een leesagent verwerkt inkomende informatie, een beslisagent bepaalt de actie, een uitvoeringsagent voert de taak uit.",
  },
  {
    step: "02",
    title: "Integraties met uw systemen",
    description:
      "De digitale medewerker heeft toegang tot uw tools: CRM, ERP, e-mail, agenda, klantenservice platform. Hij leest, schrijft en triggert acties — precies zoals een menselijke medewerker zou doen.",
  },
  {
    step: "03",
    title: "Geheugen en leren",
    description:
      "De agent onthoudt eerdere interacties en bouwt kennis op over uw klanten, producten en processen. Hoe langer hij actief is, hoe beter de antwoorden worden.",
  },
  {
    step: "04",
    title: "Escalatie naar mensen",
    description:
      "U bepaalt wanneer de agent een mens inschakelt. Bij twijfel, klachten of hoog-risico beslissingen wordt automatisch doorgezet naar de juiste persoon via Slack, e-mail of telefoon.",
  },
];

export default function DigitaleMedewerkerPage() {
  const faqSchemaData = faqSchema({ items: faqItems });

  const breadcrumbData = breadcrumbSchema({
    items: [
      { position: 1, name: "Home", item: siteConfig.url },
      { position: 2, name: "Diensten", item: `${siteConfig.url}/diensten` },
      {
        position: 3,
        name: "Digitale Medewerker",
        item: `${siteConfig.url}/diensten/digitale-medewerker`,
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
        <Navbar />

        {/* Hero */}
        <section className="pt-24 sm:pt-32 md:pt-40 pb-12 sm:pb-16 md:pb-20">
          <div className="container mx-auto px-6 sm:px-8 max-w-4xl text-center">
            <div className="inline-flex items-center gap-2 rounded-full bg-muted/60 border border-border/60 px-4 py-1.5 text-xs sm:text-sm text-muted-foreground mb-6">
              <Users className="h-3.5 w-3.5 text-primary" />
              Multi-agent AI — werkt als een volwaardige medewerker
            </div>
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold leading-[1.1] tracking-tight text-foreground mb-5 sm:mb-6">
              Digitale Medewerker
              <span className="block text-primary mt-1">
                AI die Zelfstandig Werk Overneemt
              </span>
            </h1>
            <p className="text-base sm:text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed mb-8 sm:mb-10">
              Een digitale medewerker werkt 24/7, maakt geen fouten en kost een
              fractie van een menselijke FTE. Virelio implementeert multi-agent
              systemen die een volledige rol vervullen binnen uw organisatie.
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

            {/* Stats */}
            <div className="mt-10 sm:mt-12 grid grid-cols-2 sm:grid-cols-4 gap-4 sm:gap-6 max-w-3xl mx-auto">
              {[
                { value: "24/7", label: "Beschikbaar" },
                { value: "€50k+", label: "Jaarlijkse besparing" },
                { value: "<1%", label: "Foutpercentage" },
                { value: "2 wkn", label: "Live" },
              ].map((stat) => (
                <div
                  key={stat.label}
                  className="rounded-2xl bg-muted/40 border border-border/60 p-4 text-center"
                >
                  <p className="text-xl sm:text-2xl font-bold text-foreground">
                    {stat.value}
                  </p>
                  <p className="text-xs text-muted-foreground mt-0.5">
                    {stat.label}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* How it works */}
        <section className="py-12 sm:py-16 md:py-20 border-t border-border/50 bg-muted/20">
          <div className="container mx-auto px-6 sm:px-8 max-w-4xl">
            <div className="mb-8 sm:mb-12 text-center">
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-foreground mb-3 sm:mb-4">
                Hoe werkt een digitale medewerker?
              </h2>
              <p className="text-sm sm:text-base text-muted-foreground max-w-xl mx-auto">
                Achter de schermen is een digitale medewerker een
                georkestreerd netwerk van AI agents met toegang tot uw systemen.
              </p>
            </div>
            <div className="grid sm:grid-cols-2 gap-4 sm:gap-5">
              {howItWorks.map((item) => (
                <div
                  key={item.step}
                  className="rounded-2xl bg-muted/40 border border-border/60 shadow-sm p-5 sm:p-6"
                >
                  <div className="flex items-center gap-3 mb-3">
                    <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-foreground text-background text-xs font-bold shrink-0">
                      {item.step}
                    </span>
                    <h3 className="font-bold text-foreground text-sm sm:text-base">
                      {item.title}
                    </h3>
                  </div>
                  <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
                    {item.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Departments */}
        <section className="py-12 sm:py-16 md:py-20 border-t border-border/50">
          <div className="container mx-auto px-6 sm:px-8 max-w-5xl">
            <div className="mb-8 sm:mb-12 text-center">
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-foreground mb-3 sm:mb-4">
                Inzetbaar in elke afdeling
              </h2>
              <p className="text-sm sm:text-base text-muted-foreground max-w-xl mx-auto">
                Elke afdeling met repetitieve kennistaken is een kandidaat.
                Hieronder de vier meest gevraagde implementaties.
              </p>
            </div>
            <div className="grid sm:grid-cols-2 gap-5 sm:gap-6">
              {departments.map((dept) => (
                <div
                  key={dept.name}
                  className="rounded-2xl bg-muted/40 border border-border/60 shadow-sm p-5 sm:p-6"
                >
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10 text-primary shrink-0">
                        <dept.icon className="h-5 w-5" />
                      </div>
                      <h3 className="font-bold text-foreground text-base sm:text-lg">
                        {dept.name}
                      </h3>
                    </div>
                    <div className="text-right">
                      <p className="text-base sm:text-lg font-bold text-foreground">
                        {dept.savingMonthly}
                      </p>
                      <p className="text-[11px] text-muted-foreground">
                        {dept.saving}
                      </p>
                    </div>
                  </div>
                  <ul className="space-y-2">
                    {dept.tasks.map((task) => (
                      <li
                        key={task}
                        className="flex items-start gap-2 text-xs sm:text-sm text-muted-foreground"
                      >
                        <CheckCircle className="h-3.5 w-3.5 text-primary mt-0.5 shrink-0" />
                        {task}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ROI comparison */}
        <section className="py-12 sm:py-16 md:py-20 border-t border-border/50 bg-muted/20">
          <div className="container mx-auto px-6 sm:px-8 max-w-3xl">
            <div className="mb-8 sm:mb-10 text-center">
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-foreground mb-3 sm:mb-4">
                ROI: Digitale medewerker vs. menselijke FTE
              </h2>
              <p className="text-sm sm:text-base text-muted-foreground max-w-xl mx-auto">
                Een eerlijke vergelijking. Bij een gemiddeld MKB-bedrijf is de
                terugverdientijd minder dan 3 maanden.
              </p>
            </div>
            <div className="rounded-2xl bg-muted/40 border border-border/60 shadow-sm overflow-hidden">
              <div className="grid grid-cols-3 bg-muted/60 text-foreground text-xs sm:text-sm font-semibold">
                <div className="p-3 sm:p-4">Maatstaf</div>
                <div className="p-3 sm:p-4 border-l border-border/30">
                  Menselijke FTE
                </div>
                <div className="p-3 sm:p-4 border-l border-border/30 text-primary">
                  Digitale Medewerker
                </div>
              </div>
              {roiItems.map((item, i) => (
                <div
                  key={item.label}
                  className={`grid grid-cols-3 text-xs sm:text-sm ${
                    i % 2 === 0 ? "bg-background/40" : ""
                  }`}
                >
                  <div className="p-3 sm:p-4 font-medium text-foreground">
                    {item.label}
                  </div>
                  <div className="p-3 sm:p-4 border-l border-border/40 text-muted-foreground">
                    {item.human}
                  </div>
                  <div
                    className={`p-3 sm:p-4 border-l border-border/40 font-semibold ${
                      item.highlight ? "text-primary" : "text-foreground"
                    }`}
                  >
                    {item.digital}
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-6 rounded-2xl bg-primary/5 border border-primary/20 p-4 sm:p-5">
              <div className="flex items-start gap-3">
                <TrendingUp className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                <div>
                  <p className="font-bold text-foreground text-sm sm:text-base">
                    Terugverdientijd: gemiddeld 8 weken
                  </p>
                  <p className="text-xs sm:text-sm text-muted-foreground mt-1">
                    Bij een implementatie van €8.000 en een maandelijkse besparing
                    van €3.000 verdient u de investering in minder dan 3 maanden
                    terug. Over een jaar: <strong className="text-foreground">€36.000 netto bespaard</strong>.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section className="py-12 sm:py-16 md:py-20 border-t border-border/50">
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
              Welke afdeling automatiseren we als eerste?
            </h2>
            <p className="mb-6 sm:mb-8 text-sm sm:text-base text-muted-foreground max-w-lg mx-auto">
              Plan een gratis gesprek van 30 minuten. Wij analyseren uw
              processen en adviseren welke digitale medewerker de hoogste ROI
              oplevert.
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
