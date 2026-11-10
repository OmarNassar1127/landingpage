"use client";

import React, { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useInView, useReducedMotion, type TargetAndTransition } from "framer-motion";
import {
  BookOpen,
  Calculator,
  CalendarDays,
  Check,
  FileSpreadsheet,
  FileText,
  Mail,
  MessageCircle,
  ShoppingBag,
  Sparkles,
  type LucideIcon,
} from "lucide-react";

type Lang = "nl" | "en";
type Tool = { label: string; icon: LucideIcon; tint: string };
type Problem = { chip: string; now: string; inputs: Tool[]; outputs: Tool[]; result: string };

const tool = (label: string, icon: LucideIcon, tint: string): Tool => ({ label, icon, tint });
const MAIL = tool("Mail", Mail, "#FBE3D6");
const EXACT = tool("Exact", Calculator, "#DDE7F3");
const SHOP = tool("Shopify", ShoppingBag, "#E4E9DA");
const EXCEL = tool("Excel", FileSpreadsheet, "#DCEFE2");
const WA = tool("WhatsApp", MessageCircle, "#DCEFE2");
const CAL = (l: string) => tool(l, CalendarDays, "#E7E3F6");
const DOCS = (l: string) => tool(l, BookOpen, "#F3EBD8");
const PDF = (l: string) => tool(l, FileText, "#F3EBD8");

const PROBLEMS: Record<Lang, Problem[]> = {
  nl: [
    { chip: "We typen orders over uit mail", now: "Elke order komt binnen als mail en gaat met de hand het systeem in.", inputs: [MAIL], outputs: [EXACT, SHOP], result: "Orders staan zelf in je systeem. Jij keurt goed." },
    { chip: "Offertes duren dagen", now: "Een aanvraag wacht tot iemand tijd heeft om te rekenen en te typen.", inputs: [MAIL, tool("Prijslijst", FileSpreadsheet, "#DCEFE2")], outputs: [PDF("Offerte")], result: "De offerte staat klaar uit je prijslijst. Jij keurt goed." },
    { chip: "Facturen handmatig inboeken", now: "Pdf openen, bedragen overtypen, btw controleren. Elke week opnieuw.", inputs: [PDF("Factuur-pdf")], outputs: [EXACT], result: "Facturen staan klaargezet in je boekhouding. Jij keurt goed." },
    { chip: "Klantvragen blijven liggen", now: "Mail en WhatsApp lopen vol terwijl jij aan het werk bent.", inputs: [MAIL, WA], outputs: [tool("Antwoord", Mail, "#FBE3D6")], result: "Elke vraag heeft een concept-antwoord. Jij keurt goed." },
    { chip: "Planning in Excel", now: "Wie waar staat, zit in een sheet die één persoon bijhoudt.", inputs: [EXCEL, WA], outputs: [CAL("Agenda")], result: "Afspraken staan in de agenda van de monteur. Jij keurt goed." },
    { chip: "Kennis zit in één hoofd", now: "Het team belt jou voor elke vraag over prijzen, regels en werkwijze.", inputs: [DOCS("Documenten"), MAIL], outputs: [WA], result: "Het team vraagt het de AI, met de bron erbij." },
  ],
  en: [
    { chip: "We retype orders from email", now: "Every order arrives by email and gets typed into the system by hand.", inputs: [MAIL], outputs: [EXACT, SHOP], result: "Orders land in your system on their own. You approve." },
    { chip: "Quotes take days", now: "A request waits until someone has time to calculate and type.", inputs: [MAIL, tool("Price list", FileSpreadsheet, "#DCEFE2")], outputs: [PDF("Quote")], result: "The quote is ready, from your price list. You approve." },
    { chip: "Invoices entered by hand", now: "Open the pdf, retype the amounts, check the VAT. Every week again.", inputs: [PDF("Invoice pdf")], outputs: [EXACT], result: "Invoices are ready in your bookkeeping. You approve." },
    { chip: "Customer questions pile up", now: "Email and WhatsApp fill up while you are on the job.", inputs: [MAIL, WA], outputs: [tool("Reply", Mail, "#FBE3D6")], result: "Every question has a draft reply. You approve." },
    { chip: "Planning in Excel", now: "Who goes where lives in a sheet that one person keeps up.", inputs: [EXCEL, WA], outputs: [CAL("Calendar")], result: "Appointments are in the technician's calendar. You approve." },
    { chip: "Knowledge lives in one head", now: "The team calls you for every question about prices, rules and how things work.", inputs: [DOCS("Documents"), MAIL], outputs: [WA], result: "The team asks the AI, with the source attached." },
  ],
};

const UI = {
  nl: { problem: "Het probleem", agent: "AI-medewerker", label: "Kies een probleem" },
  en: { problem: "The problem", agent: "AI employee", label: "Pick a problem" },
};

// Build timeline, in seconds after a problem is picked.
const D = { now: 0.15, agent: 0.55, nodes: 0.8, lines: 1.25, flow: 2.2, result: 2.7 };
const AUTO_MS = 7000; // idle auto-cycle
const PICKED_MS = 14000; // after a tap, let it rest longer before moving on

// Diagram geometry in viewBox units. Pills sit over the line ends, so lines start inside them.
const W = 320;
const H = 150;
const rows = (n: number) => (n === 1 ? [H / 2] : [H * 0.26, H * 0.74]);
const curve = (x1: number, y1: number, x2: number, y2: number) => {
  const mx = (x1 + x2) / 2;
  return `M${x1} ${y1} C${mx} ${y1} ${mx} ${y2} ${x2} ${y2}`;
};

const spring = { type: "spring", bounce: 0, duration: 0.7 } as const;

function Node({ t, side, y, delay, still }: { t: Tool; side: "l" | "r"; y: number; delay: number; still: boolean }) {
  const Icon = t.icon;
  return (
    // Outer div owns the position (framer would overwrite a translate class), inner one animates.
    <div className={`absolute flex max-w-[37%] -translate-y-1/2 sm:max-w-[44%] ${side === "l" ? "left-0" : "right-0"}`} style={{ top: `${(y / H) * 100}%` }}>
      <motion.div
        initial={still ? false : { opacity: 0, scale: 0.9, x: side === "l" ? -8 : 8 }}
        animate={{ opacity: 1, scale: 1, x: 0 }}
        transition={{ ...spring, delay }}
        className="flex min-w-0 items-center gap-1.5 rounded-full bg-white py-1 pl-1 pr-2.5 text-[11.5px] font-medium text-zinc-700 shadow-[0_4px_14px_-6px_rgba(60,40,20,0.22)] ring-1 ring-zinc-900/[0.07] sm:gap-2 sm:pr-3 sm:text-[13px]"
      >
        <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full sm:h-7 sm:w-7" style={{ background: t.tint }}>
          <Icon className="h-3.5 w-3.5 text-zinc-700" strokeWidth={2} />
        </span>
        <span className="truncate">{t.label}</span>
      </motion.div>
    </div>
  );
}

function Build({ p, lang, still }: { p: Problem; lang: Lang; still: boolean }) {
  const ui = UI[lang];
  const ins = rows(p.inputs.length);
  const outs = rows(p.outputs.length);
  const paths = [
    ...ins.map((y) => curve(44, y, W / 2 - 22, H / 2)),
    ...outs.map((y) => curve(W / 2 + 22, H / 2, W - 44, y)),
  ];
  const at = (s: number) => (still ? 0 : s);
  const from = <O extends TargetAndTransition>(o: O) => (still ? false : o);

  return (
    <div className="flex h-full flex-col">
      <div className="text-[12px] font-medium uppercase tracking-[0.08em] text-zinc-400">{ui.problem}</div>
      <p className="mt-1.5 text-[19px] font-semibold leading-snug tracking-[-0.015em] text-zinc-900 sm:text-[22px]">{p.chip}</p>
      <motion.p
        initial={from({ opacity: 0, y: 6 })}
        animate={{ opacity: 1, y: 0 }}
        transition={{ ...spring, delay: at(D.now) }}
        className="mt-1 text-[14px] leading-relaxed text-zinc-500 sm:text-[15px]"
      >
        {p.now}
      </motion.p>

      {/* The system assembling itself: their tools, wired through one agent. */}
      <div className="relative mt-4 w-full sm:mt-6" style={{ aspectRatio: `${W} / ${H}` }}>
        <svg viewBox={`0 0 ${W} ${H}`} className="absolute inset-0 h-full w-full" aria-hidden>
          {paths.map((d, i) => (
            <motion.path
              key={`l${i}`}
              d={d}
              fill="none"
              stroke="#C7C9F5"
              strokeWidth={1.6}
              strokeLinecap="round"
              initial={from({ pathLength: 0 })}
              animate={{ pathLength: 1 }}
              transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1], delay: at(D.lines + i * 0.12) }}
            />
          ))}
          {!still &&
            paths.map((d, i) => (
              <path
                key={`f${i}`}
                d={d}
                pathLength={100}
                fill="none"
                stroke="#6366F1"
                strokeWidth={2.2}
                strokeLinecap="round"
                className="hero-flow"
                style={{ animationDelay: `${D.flow + i * 0.35}s` }}
              />
            ))}
        </svg>

        {p.inputs.map((t, i) => (
          <Node key={`i${i}`} t={t} side="l" y={ins[i]} delay={at(D.nodes + i * 0.1)} still={still} />
        ))}
        {p.outputs.map((t, i) => (
          <Node key={`o${i}`} t={t} side="r" y={outs[i]} delay={at(D.nodes + 0.2 + i * 0.1)} still={still} />
        ))}

        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
          <motion.div
            initial={from({ opacity: 0, scale: 0.8 })}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ type: "spring", bounce: 0.25, duration: 0.7, delay: at(D.agent) }}
            className="flex h-10 items-center gap-1.5 whitespace-nowrap rounded-2xl bg-indigo-600 px-3.5 text-[13px] font-semibold text-white shadow-[0_10px_28px_-8px_rgba(79,70,229,0.6)] sm:h-11 sm:px-4"
          >
            <Sparkles className="h-3.5 w-3.5" strokeWidth={2.2} />
            <span className="sm:hidden">AI</span>
            <span className="hidden sm:inline">{ui.agent}</span>
          </motion.div>
        </div>
      </div>

      <motion.div
        initial={from({ opacity: 0, y: 8 })}
        animate={{ opacity: 1, y: 0 }}
        transition={{ ...spring, delay: at(D.result) }}
        className="mt-auto flex items-start gap-2.5 rounded-2xl bg-[#F4F4FD] px-4 py-3 pt-3 text-[14px] font-medium leading-snug text-indigo-950 ring-1 ring-indigo-950/[0.05] sm:text-[15px]"
      >
        <span className="mt-[1px] flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-indigo-600 text-white">
          <Check className="h-3 w-3" strokeWidth={3.2} />
        </span>
        {p.result}
      </motion.div>
    </div>
  );
}

export default function HeroProblems({ lang }: { lang: Lang }) {
  const problems = PROBLEMS[lang];
  const reduce = !!useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);
  const chipsRef = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { margin: "-10% 0px" });
  const [idx, setIdx] = useState(0);
  const [picked, setPicked] = useState(0); // bumps on every tap, restarts the rest timer

  // Idle auto-cycle; a tap holds the chosen problem longer. Stops off-screen and with reduced motion.
  useEffect(() => {
    if (reduce || !inView) return;
    const id = setTimeout(() => setIdx((i) => (i + 1) % problems.length), picked ? PICKED_MS : AUTO_MS);
    return () => clearTimeout(id);
  }, [idx, picked, reduce, inView, problems.length]);

  // Keep the active chip visible in the phone's scroll row without scrolling the page.
  useEffect(() => {
    const row = chipsRef.current;
    const chip = row?.children[idx] as HTMLElement | undefined;
    if (!row || !chip || row.scrollWidth <= row.clientWidth) return;
    row.scrollTo({ left: chip.offsetLeft - 20, behavior: reduce ? "auto" : "smooth" });
  }, [idx, reduce]);

  return (
    <div ref={ref} className="relative mx-auto w-full min-w-0 max-w-[34rem]">
      <div
        ref={chipsRef}
        role="tablist"
        aria-label={UI[lang].label}
        className="-mx-5 mb-4 flex gap-2 overflow-x-auto px-5 pb-1 [scrollbar-width:none] sm:mx-0 sm:flex-wrap sm:overflow-visible sm:px-0 [&::-webkit-scrollbar]:hidden"
      >
        {problems.map((p, i) => (
          <button
            key={p.chip}
            role="tab"
            aria-selected={i === idx}
            onClick={() => {
              setIdx(i);
              setPicked((n) => n + 1);
            }}
            className={`shrink-0 rounded-full px-3.5 py-2 text-[13px] font-medium transition-[background-color,color,box-shadow,transform] duration-200 active:scale-[0.96] ${
              i === idx
                ? "bg-zinc-900 text-white shadow-[0_6px_16px_-8px_rgba(24,24,27,0.6)]"
                : "bg-white/80 text-zinc-600 ring-1 ring-zinc-900/[0.08] hover:bg-white hover:text-zinc-900"
            }`}
          >
            {p.chip}
          </button>
        ))}
      </div>

      <div className="relative">
        <div aria-hidden className="absolute inset-x-6 -bottom-3 top-6 rounded-[28px] bg-white/70 ring-1 ring-zinc-900/[0.05]" />
        <div
          role="tabpanel"
          className="relative grid rounded-[28px] bg-white p-5 ring-1 ring-zinc-900/[0.06] shadow-[0_1px_2px_rgba(60,40,20,0.05),0_12px_32px_-12px_rgba(60,40,20,0.16),0_40px_80px_-32px_rgba(79,70,229,0.22)] sm:p-7 [&>*]:col-start-1 [&>*]:row-start-1"
        >
          {/* Sizer: the tallest problem reserves the height so nothing below jumps. */}
          {problems.map((p, i) => (
            <div key={`s${i}`} aria-hidden className="invisible">
              <Build p={p} lang={lang} still />
            </div>
          ))}
          <AnimatePresence initial={false} mode="wait">
            <motion.div
              key={idx}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0, transition: { duration: 0.18 } }}
              transition={{ duration: 0.25 }}
            >
              <Build p={problems[idx]} lang={lang} still={reduce} />
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
