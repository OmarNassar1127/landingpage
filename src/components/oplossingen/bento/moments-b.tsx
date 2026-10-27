/**
 * Small product moments for the second half of the catalog.
 */
import { CalendarCheck, Check, FileSearch, Search, Star } from "lucide-react";
import type { Lang } from "@/lib/solutions";
import { Caret, Chip, T, Tile, type Tone } from "./kit";

type M = { lang: Lang; tone?: Tone; className?: string };
const nl = (lang: Lang) => lang === "nl";

/* kennisbank-assistent */
export function Ask({ lang, tone = "white", className = "" }: M) {
  return (
    <Tile tone={tone} className={className}>
      <T tone={tone}>{nl(lang) ? "Antwoord met de bron erbij" : "Answers with their source"}</T>
      <span className="mt-auto flex items-center gap-2 rounded-full bg-[#f5f5f7] px-3 py-2.5 text-[13px] text-[#1d1d1f] lg:text-sm" aria-hidden="true">
        <Search className="h-4 w-4 shrink-0 text-[#a1a1aa]" />
        <span className="truncate">{nl(lang) ? "Hoeveel vakantiedagen heb ik?" : "How many days off do I get?"}</span>
        <Caret />
      </span>
      <Chip className="bx-rise mt-2 self-start bg-[#ecebfc] text-primary">
        <FileSearch className="h-3 w-3" />
        {nl(lang) ? "Bron: Personeelshandboek" : "Source: Staff handbook"}
      </Chip>
    </Tile>
  );
}

/* recruitment-screening */
export function Criteria({ lang, tone = "white", className = "" }: M) {
  const rows = nl(lang)
    ? [
        ["Ervaring", 0.9, true],
        ["Rijbewijs B", 1, true],
        ["Engels", 0.55, false],
      ]
    : [
        ["Experience", 0.9, true],
        ["Driving licence", 1, true],
        ["Dutch", 0.55, false],
      ];
  return (
    <Tile tone={tone} className={className}>
      <T tone={tone}>{nl(lang) ? "Per criterium uitgelegd" : "Explained per criterion"}</T>
      <p className="bp">{nl(lang) ? "Geen zwarte doos: je ziet waarom." : "No black box: you see why."}</p>
      <span className="mt-auto block space-y-2.5 pt-4" aria-hidden="true">
        {rows.map(([label, v, ok], i) => (
          <span key={label as string} className="block">
            <span className="mb-1 flex items-center justify-between text-[11px] font-semibold text-[#3f3f46] lg:text-xs">
              {label}
              {ok ? <Check className="h-3.5 w-3.5 text-emerald-600" strokeWidth={3} /> : <span className="h-1.5 w-1.5 rounded-full bg-amber-500" />}
            </span>
            <span className="block h-1.5 overflow-hidden rounded-full bg-[#ececf2]">
              <span
                className={`bx-fill block h-full rounded-full ${ok ? "bg-primary" : "bg-amber-400"}`}
                style={{ width: `${(v as number) * 100}%`, animationDelay: `${i * 0.25}s` }}
              />
            </span>
          </span>
        ))}
      </span>
    </Tile>
  );
}

export function Slot({ lang, tone = "white", className = "" }: M) {
  const slots = nl(lang) ? ["Di 10:00", "Do 14:00", "Vr 09:30"] : ["Tue 10:00", "Thu 14:00", "Fri 09:30"];
  return (
    <Tile tone={tone} className={className}>
      <CalendarCheck className={`mb-2 h-5 w-5 ${tone === "dark" || tone === "indigo" ? "text-white" : "text-primary"}`} strokeWidth={2} />
      <T tone={tone}>{nl(lang) ? "Kiest zelf een tijd" : "Picks a time"}</T>
      <span className="mt-auto flex flex-wrap gap-1.5 pt-3" aria-hidden="true">
        {slots.map((s, i) => (
          <Chip key={s} className={i === 1 ? "bx-shimmer bg-primary text-white" : "bg-[#f5f5f7] text-[#6e6e73]"}>
            {s}
          </Chip>
        ))}
      </span>
    </Tile>
  );
}

/* contract-check */
export function Mark({ lang, tone = "white", className = "" }: M) {
  const t = nl(lang)
    ? { a: "Artikel 9. Duur", b: "Deze overeenkomst wordt", c: "telkens stilzwijgend verlengd", d: "met een periode van twaalf maanden.", flag: "Stilzwijgende verlenging", why: "Afwijkend van jouw checklist" }
    : { a: "Article 9. Term", b: "This agreement is", c: "renewed automatically each time", d: "for a further twelve months.", flag: "Automatic renewal", why: "Differs from your checklist" };
  return (
    <Tile tone={tone} className={className}>
      <T tone={tone}>{nl(lang) ? "Gemarkeerd, met de reden" : "Marked, with the reason"}</T>
      <p className="bp">{nl(lang) ? "Een eerste lezing, geen juridisch advies." : "A first reading, not legal advice."}</p>
      <span className="mt-4 block rounded-xl bg-[#fbfbfc] p-3 font-serif text-[13px] leading-relaxed text-[#3f3f46] ring-1 ring-black/[0.06] lg:p-4 lg:text-[15px]" aria-hidden="true">
        <span className="block text-[11px] font-sans font-semibold uppercase tracking-[0.08em] text-[#a1a1aa]">{t.a}</span>
        {t.b}{" "}
        <span className="relative whitespace-nowrap">
          <span className="bx-mark absolute -inset-x-0.5 inset-y-0 -z-0 rounded bg-amber-200/80" />
          <span className="relative">{t.c}</span>
        </span>{" "}
        {t.d}
      </span>
      <span className="mt-3 flex flex-wrap items-center gap-2">
        <Chip className="bg-amber-50 text-amber-700 ring-1 ring-amber-200">{t.flag}</Chip>
        <span className="text-[11px] lg:text-xs">{t.why}</span>
      </span>
    </Tile>
  );
}

export function Eu({ lang, tone = "dark", className = "" }: M) {
  return (
    <Tile tone={tone} className={className}>
      <span className="relative mb-3 block h-12 w-12" aria-hidden="true">
        <span className="bx-spin absolute inset-0 block">
          {Array.from({ length: 12 }, (_, i) => {
            const a = (i / 12) * Math.PI * 2;
            return (
              <Star
                key={i}
                className="absolute h-2.5 w-2.5 fill-amber-300 text-amber-300"
                style={{ left: `${50 + Math.sin(a) * 40}%`, top: `${50 - Math.cos(a) * 40}%`, transform: "translate(-50%,-50%)" }}
              />
            );
          })}
        </span>
      </span>
      <T tone={tone}>{nl(lang) ? "Blijft binnen de EU" : "Stays in the EU"}</T>
      <p className="bp">{nl(lang) ? "Je contracten gaan de EU niet uit." : "Your contracts do not leave the EU."}</p>
    </Tile>
  );
}

/* productteksten */
export function Languages({ lang, tone = "white", className = "" }: M) {
  const words = [
    ["NL", "Linnen dekbed"],
    ["EN", "Linen duvet"],
    ["DE", "Leinenbettwäsche"],
    ["NL", "Linnen dekbed"],
  ];
  return (
    <Tile tone={tone} className={className}>
      <T tone={tone}>{nl(lang) ? "Dezelfde toon, elke taal" : "Same tone, every language"}</T>
      <span className="mt-auto block h-[42px] overflow-hidden rounded-xl bg-[#f5f5f7] lg:h-[46px]" aria-hidden="true">
        <span className="bx-swap block">
          {words.map(([code, w], i) => (
            <span key={i} className="flex h-[42px] items-center gap-2 px-3 text-[12px] text-[#1d1d1f] lg:h-[46px] lg:text-sm">
              <span className="rounded bg-white px-1.5 py-0.5 text-[10px] font-bold text-primary ring-1 ring-black/[0.06]">{code}</span>
              <span className="truncate">{w}</span>
            </span>
          ))}
        </span>
      </span>
    </Tile>
  );
}

export function OnlyFacts({ lang, tone = "white", className = "" }: M) {
  return (
    <Tile tone={tone} className={className}>
      <T tone={tone}>{nl(lang) ? "Alleen wat in je data staat" : "Only what is in your data"}</T>
      <p className="bp">{nl(lang) ? "Hij verzint geen specificaties." : "It never invents a spec."}</p>
      <span className="mt-auto flex flex-wrap gap-1.5 pt-3 font-mono text-[10px] lg:text-[11px]" aria-hidden="true">
        {["240×220", "linnen", "wit"].map((s, i) => (
          <span key={s} className="bx-shimmer rounded-md bg-[#f5f5f7] px-2 py-1 text-[#3f3f46]" style={{ animationDelay: `${-i * 0.6}s` }}>
            {s}
          </span>
        ))}
      </span>
    </Tile>
  );
}

/* planning-agent */
export function Week({ lang, tone = "white", className = "" }: M) {
  const days = nl(lang) ? ["Ma", "Di", "Wo", "Do", "Vr"] : ["Mon", "Tue", "Wed", "Thu", "Fri"];
  // which lanes have a shift on which day; the amber one moves after a sick call
  const lanes = [
    [1, 1, 0, 1, 1],
    [0, 1, 1, 1, 0],
    [1, 0, 1, 0, 1],
  ];
  return (
    <Tile tone={tone} className={className}>
      <div className="lg:flex lg:items-start lg:justify-between lg:gap-6">
        <div>
          <T tone={tone}>{nl(lang) ? "Ziekmelding? Doorgeschoven." : "Sick call? Moved."}</T>
          <p className="bp">{nl(lang) ? "Je ziet wat verandert, voordat jij akkoord geeft." : "You see what changes before you approve."}</p>
        </div>
        <Chip className="mt-2 bg-emerald-50 text-emerald-700 ring-1 ring-emerald-200 lg:mt-0">
          <Check className="h-3 w-3" strokeWidth={3} />
          {nl(lang) ? "Voorstel klaar" : "Proposal ready"}
        </Chip>
      </div>
      <div className="mt-auto grid grid-cols-5 gap-1.5 pt-4" aria-hidden="true">
        {days.map((d) => (
          <span key={d} className="text-center text-[10px] font-semibold text-[#a1a1aa] lg:text-[11px]">
            {d}
          </span>
        ))}
        {lanes.flatMap((lane, r) =>
          lane.map((on, c) => {
            const moving = r === 2 && c === 2;
            return (
              <span key={`${r}-${c}`} className="relative block h-5 rounded-md bg-[#f5f5f7] lg:h-6">
                {on ? <span className={`absolute inset-0 rounded-md ${r === 0 ? "bg-primary" : r === 1 ? "bg-[#a5b4fc]" : "bg-[#c7d2fe]"}`} /> : null}
                {moving && <span className="bx-nudge absolute inset-0 rounded-md bg-amber-400 ring-2 ring-amber-200" />}
              </span>
            );
          }),
        )}
      </div>
    </Tile>
  );
}

export function Approve({ lang, tone = "white", className = "" }: M) {
  return (
    <Tile tone={tone} className={className}>
      <T tone={tone}>{nl(lang) ? "Jij keurt goed" : "You approve"}</T>
      <p className="bp">{nl(lang) ? "Elke wijziging eerst als voorstel." : "Every change starts as a proposal."}</p>
      <span className="mt-auto flex items-center gap-2 pt-3" aria-hidden="true">
        <span className="bx-ping flex h-7 w-7 items-center justify-center rounded-full bg-[#34c759]">
          <Check className="h-4 w-4 text-white" strokeWidth={3} />
        </span>
        <span className="text-xs font-semibold text-[#1d1d1f]">{nl(lang) ? "Akkoord" : "Approve"}</span>
      </span>
    </Tile>
  );
}
