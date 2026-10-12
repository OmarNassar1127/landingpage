import { ArrowRight, Check, Wrench } from "lucide-react";

export const CALENDLY = "https://calendly.com/omarnassar1127/30min";

export const PRICING_TIERS = [
  {
    name: "Starter",
    price: "€1.000",
    amount: 1000,
    note: "eenmalig",
    description: "Eén agent voor één taak die nu tijd kost.",
    features: ["1 AI agent", "1 koppeling, zoals e-mail of Slack", "GPT of Claude als taalmodel", "Live in 1 week", "1 maand support"],
  },
  {
    name: "Business",
    price: "€2.500 tot €4.000",
    amount: 2500,
    note: "eenmalig",
    description: "Meerdere agents die samen een heel proces afhandelen.",
    features: [
      "2 tot 4 samenwerkende agents",
      "Tot 3 koppelingen (CRM, ERP, support)",
      "Afgestemd op jouw tone of voice",
      "Dashboard met resultaten",
      "3 maanden support",
      "Prototype binnen enkele dagen",
    ],
    highlighted: true,
  },
  {
    name: "Enterprise",
    price: "vanaf €7.500",
    amount: 7500,
    note: "eenmalig",
    description: "Een complete afdeling geautomatiseerd.",
    features: ["Onbeperkt aantal agents", "On-premise mogelijk", "Modellen getraind op jouw data", "Alle systemen gekoppeld", "SLA en vaste contactpersoon"],
  },
];

export const MAINTENANCE = [
  { name: "Onderhoud Basis", price: "€99", amount: 99, description: "Hosting, monitoring, updates en support." },
  { name: "Onderhoud Plus", price: "€249", amount: 249, description: "Alles van Basis, plus maandelijkse verbeteringen en nieuwe functies." },
];

export default function Pricing() {
  return (
    <section id="prijzen" className="border-t border-black/[0.07] bg-white py-16 sm:py-24">
      <div className="container mx-auto max-w-6xl px-4 sm:px-6">
        <div className="mb-10 max-w-2xl sm:mb-14">
          <p className="mb-4 flex items-center gap-2 text-sm font-medium text-primary">
            <span className="h-1.5 w-1.5 rounded-full bg-primary" />
            Prijzen
          </p>
          <h2 className="mb-4 text-3xl font-bold tracking-tight text-zinc-900 sm:text-4xl">Vaste prijs, vooraf bekend</h2>
          <p className="text-base text-zinc-500 sm:text-lg">
            Je betaalt één keer voor de bouw. Daarna kies je een onderhoudsplan, zodat je agent blijft werken en beter wordt.
          </p>
        </div>

        <div className="grid gap-4 lg:grid-cols-12">
          {PRICING_TIERS.map((tier) => {
            const hi = !!tier.highlighted;
            return (
              <div
                key={tier.name}
                className={`flex flex-col rounded-[24px] border p-6 sm:p-7 ${
                  hi
                    ? "border-primary bg-primary text-white shadow-[0_40px_80px_-40px_rgba(70,55,210,0.6)] lg:col-span-6"
                    : "border-black/[0.07] bg-white text-zinc-900 shadow-[0_24px_60px_-44px_rgba(70,55,210,0.35)] lg:col-span-3"
                }`}
              >
                <div className="flex items-center justify-between gap-3">
                  <p className={`text-sm font-semibold ${hi ? "text-white/80" : "text-zinc-500"}`}>{tier.name}</p>
                  {hi && <span className="rounded-full bg-white/15 px-2.5 py-0.5 text-[11px] font-semibold text-white">Aanbevolen</span>}
                </div>
                <p className={`mt-3 font-bold tracking-tight ${hi ? "text-3xl sm:text-4xl" : "text-3xl"}`}>{tier.price}</p>
                <p className={`mt-1 text-xs ${hi ? "text-white/70" : "text-zinc-400"}`}>{tier.note}</p>
                <p className={`mt-4 text-sm leading-relaxed ${hi ? "text-white/85" : "text-zinc-500"}`}>{tier.description}</p>
                <ul className={`mt-5 flex-1 gap-x-6 gap-y-2.5 ${hi ? "grid sm:grid-cols-2 sm:content-start" : "space-y-2.5"}`}>
                  {tier.features.map((f) => (
                    <li key={f} className={`flex items-start gap-2 text-sm ${hi ? "text-white/90" : "text-zinc-600"}`}>
                      <Check className={`mt-0.5 h-4 w-4 shrink-0 ${hi ? "text-white" : "text-primary"}`} strokeWidth={2.4} />
                      {f}
                    </li>
                  ))}
                </ul>
                <a
                  href={CALENDLY}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`mt-7 inline-flex items-center justify-center gap-2 rounded-xl px-5 py-3 text-sm font-semibold transition-all active:scale-[0.98] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 ${
                    hi
                      ? "bg-white text-primary hover:bg-white/90 focus-visible:ring-white focus-visible:ring-offset-primary"
                      : "border border-black/[0.1] bg-white text-zinc-900 hover:border-primary/40 hover:text-primary focus-visible:ring-primary"
                  }`}
                >
                  Gesprek plannen
                  <ArrowRight className="h-4 w-4" />
                </a>
              </div>
            );
          })}
        </div>

        {/* maintenance add-on */}
        <div className="mt-4 grid gap-4 rounded-[24px] border border-black/[0.07] bg-zinc-50/60 p-4 sm:p-5 lg:grid-cols-12 lg:items-center">
          <div className="flex items-start gap-3 px-1 lg:col-span-4">
            <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-black/[0.07] bg-white">
              <Wrench className="h-[18px] w-[18px] text-primary" />
            </span>
            <div>
              <h3 className="text-[15px] font-semibold text-zinc-900">Onderhoud na oplevering</h3>
              <p className="text-[13px] leading-snug text-zinc-500">Een vast bedrag per maand, voor elk pakket.</p>
            </div>
          </div>
          {MAINTENANCE.map((m) => (
            <div key={m.name} className="rounded-2xl border border-black/[0.07] bg-white px-5 py-4 lg:col-span-4">
              <div className="flex items-baseline justify-between gap-3">
                <span className="text-[15px] font-semibold text-zinc-900">{m.name}</span>
                <span className="whitespace-nowrap text-lg font-bold tracking-tight text-zinc-900">
                  {m.price}
                  <span className="text-sm font-medium text-zinc-400">/mnd</span>
                </span>
              </div>
              <p className="mt-1 text-[13px] leading-snug text-zinc-500">{m.description}</p>
            </div>
          ))}
        </div>

        <p className="mt-6 text-sm text-zinc-500">
          Het verbruik van het taalmodel (API) betaal je direct aan de aanbieder, doorgaans €200 tot €800 per maand afhankelijk van het volume.
          Alle kosten op een rij staan in ons{" "}
          <a href="/blog/wat-kost-ai-agent" className="font-medium text-primary hover:underline">kostenoverzicht voor AI agents</a>.
        </p>
      </div>
    </section>
  );
}
