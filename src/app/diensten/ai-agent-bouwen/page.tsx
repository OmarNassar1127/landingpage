import { generateMetadata as genMeta } from "@/lib/metadata";
import { faqSchema, breadcrumbSchema } from "@/lib/schema";
import { siteConfig } from "@/lib/config";
import Navbar from "@/components/sections/navbar";
import CatalogLink from "@/components/oplossingen/catalog-link";
import Footer from "@/components/sections/footer";
import AgentWorkbench from "@/components/diensten/agent-bouwen/agent-workbench";
import Pricing, { CALENDLY, MAINTENANCE, PRICING_TIERS } from "@/components/diensten/agent-bouwen/pricing";
import { ArrowRight, BookOpen, Check, ChevronDown, MessageSquare, TrendingUp, Zap } from "lucide-react";

export const metadata = genMeta({
  title: "AI agent laten bouwen: maatwerk, live in 1 week",
  description:
    "Laat een AI agent op maat bouwen door Virelio. Voor klantenservice, sales en operations. Live in 1 week, vanaf €1.000 en AVG-conform. Gevestigd in Amsterdam.",
  keywords:
    "AI agent laten bouwen, maatwerk AI agent, AI agent ontwikkeling, AI agent bouwen Nederland, custom AI agent, AI automatisering, AI bureau Amsterdam, AI agent kosten, klantenservice AI, sales agent AI",
  pathname: "/diensten/ai-agent-bouwen",
  locale: "nl_NL",
});

const PAGE_URL = `${siteConfig.url}/diensten/ai-agent-bouwen`;

const faqItems = [
  {
    question: "Wat kost een AI agent laten bouwen?",
    answer:
      "Eén AI agent kost €1.000 eenmalig. Meerdere samenwerkende agents kosten €2.500 tot €4.000, een complete afdeling vanaf €7.500. Voor onderhoud na oplevering zijn er twee plannen: Onderhoud Basis voor €99 per maand (hosting, monitoring, updates en support) en Onderhoud Plus voor €249 per maand (alles van Basis plus maandelijkse verbeteringen en nieuwe functies). Het verbruik van het taalmodel betaal je apart aan de aanbieder, doorgaans €200 tot €800 per maand afhankelijk van het volume.",
  },
  {
    question: "Hoe lang duurt het om een AI agent te bouwen?",
    answer:
      "Binnen enkele dagen na de intake staat er een werkend prototype. De productieversie staat live binnen 1 week. Complexere systemen met meerdere agents kunnen 3 tot 4 weken duren.",
  },
  {
    question: "Wat is het verschil tussen een AI agent en een chatbot?",
    answer:
      "Een chatbot volgt vaste scripts en reageert alleen op vooraf bedachte vragen. Een AI agent begrijpt context, neemt zelf beslissingen, voert acties uit in andere systemen (zoals een CRM of agenda) en zet meerdere stappen achter elkaar zonder dat iemand hoeft mee te kijken.",
  },
  {
    question: "Werkt de AI agent met mijn bestaande software?",
    answer:
      "Ja. We koppelen met de meeste gangbare software: HubSpot, Salesforce, Zendesk, Exact Online, Shopify, Slack en meer. Heb je een eigen systeem? Via een API of webhook koppelen we daar ook op aan.",
  },
  {
    question: "Is mijn data veilig bij een AI agent van Virelio?",
    answer:
      "Ja. We werken volgens de AVG en verwerken alle data binnen de EU. Mag je data het bedrijfsnetwerk niet verlaten? Dan draaien we de agent on-premise. Je blijft altijd eigenaar van je data en zit nergens aan vast.",
  },
];

const agentTypes = [
  { icon: MessageSquare, title: "Klantenservice agent", description: "Beantwoordt 80% van de supportvragen zelf. Werkt met Zendesk, Intercom en WhatsApp Business.", result: "2 FTE bespaard" },
  { icon: TrendingUp, title: "Sales agent", description: "Kwalificeert inbound leads, plant afspraken in Calendly en stuurt persoonlijke follow-ups.", result: "+40% conversie" },
  { icon: Zap, title: "Operations agent", description: "Verwerkt orders en maakt facturen aan in Exact Online of Moneybird. Zonder handwerk.", result: "90% minder handwerk" },
  { icon: BookOpen, title: "Kennisbank agent (RAG)", description: "Doorzoekt je documenten in SharePoint, Notion of Confluence en antwoordt met bronvermelding.", result: "Antwoord in <5 sec" },
];

const processSteps = [
  { step: "01", title: "Gratis intake", when: "Dag 1", description: "Een videocall van 30 minuten. We brengen je proces in kaart en kiezen de taak die de meeste tijd kost." },
  { step: "02", title: "Prototype", when: "Dag 2 tot 3", description: "Je krijgt een werkende versie en test die op echte vragen. Jouw feedback gaat direct de bouw in." },
  { step: "03", title: "Koppelingen", when: "Dag 4 tot 5", description: "We sluiten de agent aan op je CRM, e-mail, agenda, supportplatform of ERP." },
  { step: "04", title: "Live", when: "Dag 7", description: "De agent draait. De eerste weken kijken we actief mee en verbeteren we op basis van echte gesprekken." },
];

const proof = ["18+ bedrijven geholpen", "Live in 1 week", "AVG-conform, data in de EU", "Gratis intake"];

const btnPrimary =
  "inline-flex items-center justify-center gap-2 rounded-xl bg-primary px-7 py-3.5 text-sm font-semibold text-white shadow-[0_14px_30px_-14px_rgba(70,55,210,0.7)] transition-all hover:bg-primary/90 active:scale-[0.98] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2";
const btnSecondary =
  "inline-flex items-center justify-center gap-2 rounded-xl border border-black/[0.1] bg-white px-7 py-3.5 text-sm font-semibold text-zinc-900 transition-colors hover:border-primary/40 hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2";

function Eyebrow({ children }: { children: React.ReactNode }) {
  return (
    <p className="mb-4 flex items-center gap-2 text-sm font-medium text-primary">
      <span className="h-1.5 w-1.5 rounded-full bg-primary" />
      {children}
    </p>
  );
}

export default function AIAgentBouwenPage() {
  const faqSchemaData = faqSchema({ items: faqItems });

  const breadcrumbData = breadcrumbSchema({
    items: [
      { position: 1, name: "Home", item: siteConfig.url },
      { position: 2, name: "Diensten", item: `${siteConfig.url}/diensten` },
      { position: 3, name: "AI agent laten bouwen", item: PAGE_URL },
    ],
  });

  const serviceData = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: "AI agent laten bouwen",
    serviceType: "AI agent ontwikkeling",
    url: PAGE_URL,
    provider: { "@type": "Organization", name: "Virelio", url: siteConfig.url },
    areaServed: { "@type": "Country", name: "Netherlands" },
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "AI agent pakketten",
      itemListElement: [
        ...PRICING_TIERS.map((t) => ({
          "@type": "Offer",
          name: t.name,
          description: t.description,
          priceSpecification: {
            "@type": "PriceSpecification",
            priceCurrency: "EUR",
            ...(t.name === "Business" ? { minPrice: 2500, maxPrice: 4000 } : t.name === "Enterprise" ? { minPrice: t.amount } : { price: t.amount }),
          },
        })),
        ...MAINTENANCE.map((m) => ({
          "@type": "Offer",
          name: m.name,
          description: m.description,
          priceSpecification: {
            "@type": "UnitPriceSpecification",
            price: m.amount,
            priceCurrency: "EUR",
            unitCode: "MON",
            referenceQuantity: { "@type": "QuantitativeValue", value: 1, unitCode: "MON" },
          },
        })),
      ],
    },
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchemaData) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbData) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceData) }} />

      <main className="min-h-screen bg-white">
        <Navbar
          customNavLinks={[
            { name: "Wat je krijgt", href: "#wat-je-krijgt" },
            { name: "Prijzen", href: "#prijzen" },
            { name: "Proces", href: "#proces" },
            { name: "FAQ", href: "#faq" },
          ]}
        />

        {/* Hero */}
        <section className="overflow-hidden pb-16 pt-28 sm:pb-20 sm:pt-32 lg:pt-36">
          <div className="container mx-auto grid max-w-6xl items-center gap-10 px-4 sm:px-6 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.05fr)] lg:gap-8">
            <div>
              <Eyebrow>Maatwerk AI agents uit Amsterdam</Eyebrow>
              <h1 className="mb-5 text-4xl font-bold leading-[1.06] tracking-tight text-zinc-900 sm:text-5xl lg:text-[56px]">
                AI agent laten bouwen
                <span className="block text-primary">voor jouw bedrijf</span>
              </h1>
              <p className="mb-8 max-w-xl text-base leading-relaxed text-zinc-500 sm:text-lg">
                Virelio bouwt AI agents die zelf taken uitvoeren in de software die je al gebruikt. Prototype binnen enkele dagen, live in 1 week, vanaf €1.000.
              </p>
              <div className="flex flex-col gap-3 sm:flex-row">
                <a href={CALENDLY} target="_blank" rel="noopener noreferrer" className={btnPrimary}>
                  Plan gratis intake
                  <ArrowRight className="h-4 w-4" />
                </a>
                <a href="mailto:info@virelio.nl" className={btnSecondary}>
                  Stel een vraag
                </a>
              </div>
              <ul className="mt-8 grid grid-cols-2 gap-x-6 gap-y-2.5 text-sm text-zinc-600 sm:flex sm:flex-wrap">
                {proof.map((p) => (
                  <li key={p} className="flex items-center gap-1.5">
                    <Check className="h-4 w-4 shrink-0 text-primary" strokeWidth={2.4} />
                    {p}
                  </li>
                ))}
              </ul>
            </div>
            <AgentWorkbench />
          </div>
        </section>

        {/* What you get */}
        <section id="wat-je-krijgt" className="border-t border-black/[0.07] bg-zinc-50/60 py-16 sm:py-24">
          <div className="container mx-auto max-w-6xl px-4 sm:px-6">
            <div className="mb-10 grid gap-4 sm:mb-14 lg:grid-cols-2 lg:items-end lg:gap-14">
              <div>
                <Eyebrow>Wat je krijgt</Eyebrow>
                <h2 className="text-3xl font-bold tracking-tight text-zinc-900 sm:text-4xl">Een agent die het werk doet, geen chatbot die praat</h2>
              </div>
              <p className="text-base text-zinc-500 sm:text-lg">
                Een AI agent leest je e-mail, CRM en documenten, neemt beslissingen en voert de volgende stap zelf uit. Dit zijn de agents die we het vaakst bouwen, elke keer op maat.
              </p>
            </div>
            <div className="grid gap-3 sm:grid-cols-2 sm:gap-4">
              {agentTypes.map((a) => (
                <div key={a.title} className="flex items-start gap-4 rounded-2xl border border-black/[0.07] bg-white p-5 shadow-[0_24px_50px_-40px_rgba(70,55,210,0.35)] sm:p-6">
                  <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-black/[0.07] bg-zinc-50">
                    <a.icon className="h-[18px] w-[18px] text-primary" strokeWidth={2} />
                  </span>
                  <div className="min-w-0 flex-1">
                    <div className="mb-1 flex flex-wrap items-center justify-between gap-2">
                      <h3 className="text-[15px] font-semibold text-zinc-900">{a.title}</h3>
                      <span className="rounded-full bg-primary/[0.08] px-2.5 py-0.5 text-[11px] font-semibold text-primary">{a.result}</span>
                    </div>
                    <p className="text-sm leading-relaxed text-zinc-500">{a.description}</p>
                  </div>
                </div>
              ))}
            </div>
            <p className="mt-6 text-sm text-zinc-500">
              Andere taak in gedachten?{" "}
              <a href={CALENDLY} target="_blank" rel="noopener noreferrer" className="font-medium text-primary hover:underline">
                Vertel ons je situatie
              </a>{" "}
              en we denken mee.
            </p>
          </div>
        </section>

        <Pricing />

        {/* Process */}
        <section id="proces" className="border-t border-black/[0.07] bg-zinc-50/60 py-16 sm:py-24">
          <div className="container mx-auto max-w-6xl px-4 sm:px-6">
            <div className="mb-10 max-w-2xl sm:mb-14">
              <Eyebrow>Proces</Eyebrow>
              <h2 className="text-3xl font-bold tracking-tight text-zinc-900 sm:text-4xl">Van intake naar live in 1 week</h2>
            </div>
            <ol className="grid gap-3 sm:grid-cols-2 sm:gap-4 lg:grid-cols-4">
              {processSteps.map((s, i) => (
                <li key={s.step} className="relative rounded-2xl border border-black/[0.07] bg-white p-5 sm:p-6">
                  <span className="absolute inset-x-6 top-0 h-[3px] rounded-b-full bg-primary" style={{ opacity: 0.25 + i * 0.25 }} aria-hidden="true" />
                  <div className="mb-4 flex items-center justify-between">
                    <span className="text-sm font-bold tabular-nums text-primary">{s.step}</span>
                    <span className="text-xs font-medium text-zinc-400">{s.when}</span>
                  </div>
                  <h3 className="mb-1.5 text-[15px] font-semibold text-zinc-900">{s.title}</h3>
                  <p className="text-sm leading-relaxed text-zinc-500">{s.description}</p>
                </li>
              ))}
            </ol>
          </div>
        </section>

        {/* FAQ */}
        <section id="faq" className="border-t border-black/[0.07] bg-white py-16 sm:py-24">
          <div className="container mx-auto max-w-3xl px-4 sm:px-6">
            <h2 className="mb-8 text-3xl font-bold tracking-tight text-zinc-900 sm:mb-10 sm:text-4xl">Veelgestelde vragen</h2>
            <div className="divide-y divide-black/[0.07] rounded-2xl border border-black/[0.07]">
              {faqItems.map((item, i) => (
                <details key={item.question} open={i === 0} className="group px-5 sm:px-6">
                  <summary className="flex cursor-pointer list-none items-center justify-between gap-4 py-5 text-[15px] font-semibold text-zinc-900 [&::-webkit-details-marker]:hidden">
                    <h3>{item.question}</h3>
                    <ChevronDown className="h-4 w-4 shrink-0 text-zinc-400 transition-transform group-open:rotate-180" />
                  </summary>
                  <p className="pb-5 text-sm leading-relaxed text-zinc-500">{item.answer}</p>
                </details>
              ))}
            </div>
          </div>
        </section>

        {/* Bottom CTA */}
        <section className="border-t border-black/[0.07] bg-white pb-20 sm:pb-28">
          <div className="container mx-auto max-w-6xl px-4 sm:px-6">
            <div className="rounded-[28px] border border-black/[0.07] bg-zinc-50/60 px-6 py-12 text-center shadow-[0_40px_80px_-50px_rgba(70,55,210,0.35)] sm:px-10 sm:py-16">
              <h2 className="mb-3 text-3xl font-bold tracking-tight text-zinc-900 sm:text-4xl">Klaar voor je eerste AI agent?</h2>
              <p className="mx-auto mb-8 max-w-lg text-base text-zinc-500">
                Plan een gratis intake van 30 minuten. Geen verkooppraatje: we luisteren en vertellen je eerlijk wat mogelijk is.
              </p>
              <div className="flex flex-col justify-center gap-3 sm:flex-row">
                <a href={CALENDLY} target="_blank" rel="noopener noreferrer" className={btnPrimary}>
                  Plan gratis intake
                  <ArrowRight className="h-4 w-4" />
                </a>
                <a href="mailto:info@virelio.nl" className={btnSecondary}>
                  Mail ons direct
                </a>
              </div>
              <p className="mt-6 text-xs text-zinc-400">
                Virelio, AI agent bureau in Amsterdam ·{" "}
                <a href="tel:+31687838713" className="transition-colors hover:text-zinc-900">
                  +31 6 87838713
                </a>
              </p>
            </div>
          </div>
        </section>

        <CatalogLink />
        <Footer />
      </main>
    </>
  );
}
