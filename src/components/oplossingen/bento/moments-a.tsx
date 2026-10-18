/**
 * Small product moments, one idea per tile, for the first half of the catalog.
 * Each is a piece of the slug's UI mock, redrawn in HTML so it sits in a bento tile.
 */
import { Check, CornerDownRight, FileText, Mail, MessageCircle, MessageSquare, Receipt, UserRound } from "lucide-react";
import type { Lang } from "@/lib/solutions";
import { Chip, PulseDot, Shimmer, T, Tile, Typing, type Tone } from "./kit";

type M = { lang: Lang; tone?: Tone; className?: string };
const nl = (lang: Lang) => lang === "nl";

/* klantenservice */
export function Online({ lang, tone = "white", className = "" }: M) {
  return (
    <Tile tone={tone} className={className}>
      <PulseDot />
      <T tone={tone}>Agent online</T>
      <p className="bp">{nl(lang) ? "E-mail, chat en WhatsApp in één inbox." : "Email, chat and WhatsApp in one inbox."}</p>
      <span className="mt-3 flex gap-1.5 text-[#6e6e73]" aria-hidden="true">
        <Mail className="h-4 w-4" />
        <MessageSquare className="h-4 w-4" />
        <MessageCircle className="h-4 w-4" />
      </span>
      <Shimmer />
    </Tile>
  );
}

export function Handoff({ lang, tone = "white", className = "" }: M) {
  return (
    <Tile tone={tone} className={className}>
      <T tone={tone}>{nl(lang) ? "Doorzetten" : "Hand over"}</T>
      <p className="bp">{nl(lang) ? "Lastig? Naar een collega, met samenvatting." : "Tricky? To a colleague, with a summary."}</p>
      <span className="mt-auto flex items-center gap-2 pt-3" aria-hidden="true">
        <span className="bx-float flex h-7 w-7 items-center justify-center rounded-full bg-amber-50 text-xs font-bold text-amber-700 ring-1 ring-amber-300">S</span>
        <Chip className="bg-amber-50 text-amber-700">{nl(lang) ? "Naar Sanne" : "To Sanne"}</Chip>
      </span>
    </Tile>
  );
}

/* ai-op-je-eigen-data */
export function Weekly({ lang, tone = "white", className = "" }: M) {
  const bars = [46, 62, 54, 78, 70, 88];
  return (
    <Tile tone={tone} className={className}>
      <T tone={tone}>{nl(lang) ? "Weekrapport, vanzelf" : "Weekly report, on its own"}</T>
      <p className="bp">{nl(lang) ? "Je vaste cijfers, elke week in je mail of Slack." : "Your usual numbers, every week in your mail or Slack."}</p>
      <span className="mt-auto flex h-24 items-end gap-1.5 pt-4" aria-hidden="true">
        {bars.map((h, i) => (
          <span key={i} className="bx-grow block flex-1 rounded-md bg-gradient-to-b from-[#818cf8] to-primary" style={{ height: `${h}%`, animationDelay: `${-i * 0.55}s` }} />
        ))}
      </span>
    </Tile>
  );
}

/* offerte-agent */
export function Draft({ lang, tone = "white", className = "" }: M) {
  return (
    <Tile tone={tone} className={className}>
      <T tone={tone}>{nl(lang) ? "Concept klaar" : "Draft ready"}</T>
      <p className="bp">{nl(lang) ? "In jouw sjabloon, met jouw prijzen." : "In your template, with your prices."}</p>
      <span className="bx-float mt-4 block rounded-xl bg-[#f5f5f7] p-3" aria-hidden="true">
        <span className="flex items-center gap-1.5 text-[11px] font-semibold text-[#1d1d1f]">
          <FileText className="h-3.5 w-3.5 text-primary" />
          {nl(lang) ? "Offerte" : "Quote"}
        </span>
        {["100%", "82%", "90%", "64%"].map((w, i) => (
          <span key={i} className="bx-shimmer mt-1.5 block h-1.5 rounded bg-[#dcdce3]" style={{ width: w, animationDelay: `${-i * 0.4}s` }} />
        ))}
      </span>
      <Chip className="mt-auto self-start bg-amber-50 text-amber-700 ring-1 ring-amber-200">
        {nl(lang) ? "Wacht op jouw akkoord" : "Waiting for your OK"}
      </Chip>
    </Tile>
  );
}

/* factuurverwerking */
export function Scan({ lang, tone = "white", className = "" }: M) {
  return (
    <Tile tone={tone} className={className}>
      <T tone={tone}>{nl(lang) ? "Uitgelezen" : "Read"}</T>
      <p className="bp">{nl(lang) ? "Leverancier, bedrag en btw." : "Supplier, amount and VAT."}</p>
      <span className="relative mx-auto mt-4 block w-full max-w-[150px] overflow-hidden rounded-lg border border-black/[0.07] bg-[#fbfbfc] p-3 [--bx-scan:84px]" aria-hidden="true">
        <Receipt className="mb-2 h-4 w-4 text-[#a1a1aa]" />
        {["80%", "55%", "70%", "40%"].map((w, i) => (
          <span key={i} className="mt-1.5 block h-1.5 rounded bg-[#e4e4e7]" style={{ width: w }} />
        ))}
        <span className="mt-2 flex justify-end">
          <Check className="h-3.5 w-3.5 text-emerald-600" strokeWidth={3} />
        </span>
        <span className="bx-scan absolute inset-x-0 top-2 block h-[2px] bg-primary shadow-[0_0_12px_2px_rgba(70,55,210,0.45)]" />
      </span>
    </Tile>
  );
}

/* inbox-agent */
export function Labels({ lang, tone = "dark", className = "" }: M) {
  const items = nl(lang)
    ? [
        ["Aanvraag", "bg-indigo-400/20 text-indigo-200"],
        ["Klacht", "bg-rose-400/20 text-rose-200"],
        ["Factuur", "bg-amber-400/20 text-amber-200"],
        ["Spam", "bg-white/10 text-white/60"],
        ["Planning", "bg-emerald-400/20 text-emerald-200"],
        ["Retour", "bg-sky-400/20 text-sky-200"],
      ]
    : [
        ["Request", "bg-indigo-400/20 text-indigo-200"],
        ["Complaint", "bg-rose-400/20 text-rose-200"],
        ["Invoice", "bg-amber-400/20 text-amber-200"],
        ["Spam", "bg-white/10 text-white/60"],
        ["Scheduling", "bg-emerald-400/20 text-emerald-200"],
        ["Return", "bg-sky-400/20 text-sky-200"],
      ];
  return (
    <Tile tone={tone} className={`justify-center ${className}`}>
      <div className="lg:flex lg:items-center lg:gap-8">
        <div className="lg:w-72 lg:shrink-0">
          <T tone={tone}>{nl(lang) ? "Elke mail een label" : "Every email gets a label"}</T>
          <p className="bp">{nl(lang) ? "En bij de juiste collega." : "And lands with the right colleague."}</p>
        </div>
        <div className="relative mt-4 min-w-0 flex-1 overflow-hidden [mask-image:linear-gradient(90deg,transparent,#000_12%,#000_88%,transparent)] lg:mt-0" aria-hidden="true">
          <div className="bx-marquee flex w-max gap-2">
            {[...items, ...items].map(([t, c], i) => (
              <Chip key={i} className={`px-3 py-1.5 text-xs ${c}`}>
                {t}
              </Chip>
            ))}
          </div>
        </div>
      </div>
    </Tile>
  );
}

export function Reply({ lang, tone = "white", className = "" }: M) {
  return (
    <Tile tone={tone} className={className}>
      <T tone={tone}>{nl(lang) ? "Concept in jullie toon" : "Draft in your tone"}</T>
      <p className="bp">{nl(lang) ? "Versturen doet je team zelf." : "Your team does the sending."}</p>
      <span className="mt-auto flex items-center gap-2 pt-3 text-primary" aria-hidden="true">
        <CornerDownRight className="h-4 w-4" />
        <span className="flex h-7 items-center rounded-full bg-[#ecebfc] px-3">
          <Typing />
        </span>
      </span>
    </Tile>
  );
}

/* sales-opvolging */
export function FollowUp({ lang, tone = "white", className = "" }: M) {
  const stops = nl(lang) ? ["Offerte", "Follow-up", "Gesprek"] : ["Quote", "Follow-up", "Call"];
  return (
    <Tile tone={tone} className={className}>
      <T tone={tone}>{nl(lang) ? "Op het juiste moment" : "At the right moment"}</T>
      <p className="bp">{nl(lang) ? "Geen reactie? Hij zet de follow-up klaar." : "No reply? It prepares the follow-up."}</p>
      <span className="relative mt-auto block pt-5" aria-hidden="true">
        <span className="block h-[2px] rounded bg-[#e8e8ed]" />
        <span className="bx-travel absolute top-[16px] block h-2.5 w-2.5 rounded-full bg-primary shadow-[0_0_0_4px_rgba(70,55,210,0.15)]" />
        <span className="mt-2 flex justify-between text-[10px] font-semibold text-[#6e6e73] lg:text-[11px]">
          {stops.map((s) => (
            <span key={s}>{s}</span>
          ))}
        </span>
      </span>
    </Tile>
  );
}

export function Crm({ lang, tone = "white", className = "" }: M) {
  return (
    <Tile tone={tone} className={className}>
      <T tone={tone}>{nl(lang) ? "CRM bijgewerkt" : "CRM updated"}</T>
      <p className="bp">{nl(lang) ? "Na elke mail of call een samenvatting en de volgende stap." : "After every email or call, a summary and the next step."}</p>
      <span className="mt-auto flex items-center gap-2 pt-3" aria-hidden="true">
        <UserRound className="h-4 w-4 text-[#a1a1aa]" />
        <span className="bx-shimmer block h-2 flex-1 rounded bg-[#e8e8ed]" />
        <span className="flex h-5 w-5 items-center justify-center rounded-full bg-emerald-600">
          <Check className="h-3 w-3 text-white" strokeWidth={3} />
        </span>
      </span>
    </Tile>
  );
}
