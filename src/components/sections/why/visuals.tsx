"use client";

import React, { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useInView, useReducedMotion } from "framer-motion";
import { Check, FileArchive, FileCode2, FileText, Folder, Lock, Unlock, ShieldCheck } from "lucide-react";

/**
 * Micro illustrations for the "Waarom Virelio" bento. Each one shows the
 * promise of its card instead of an icon. Transform and opacity only; under
 * prefers-reduced-motion every visual renders its end state.
 */

type Lang = "nl" | "en";
const EASE = [0.22, 1, 0.36, 1] as const;

/** true once the element is in view (or immediately when motion is reduced) */
function useStart<T extends Element>(amount = 0.5) {
  const ref = useRef<T>(null);
  const inView = useInView(ref, { once: true, amount });
  const reduce = useReducedMotion();
  return { ref, start: inView || !!reduce, reduce: !!reduce };
}

/* Large card: a private repo whose lock clicks shut, then broncode.zip moves to the client. */
export function OwnershipVisual({ lang }: { lang: Lang }) {
  const { ref, start, reduce } = useStart<HTMLDivElement>(0.4);
  const [stage, setStage] = useState(0); // 0 idle, 1 files, 2 locked, 3 handed over

  useEffect(() => {
    if (!start) return;
    if (reduce) { setStage(3); return; }
    const t = [
      window.setTimeout(() => setStage(1), 100),
      window.setTimeout(() => setStage(2), 1100),
      window.setTimeout(() => setStage(3), 1700),
    ];
    return () => t.forEach(clearTimeout);
  }, [start, reduce]);

  const files = [
    { icon: Folder, name: "src/", note: "" },
    { icon: FileCode2, name: "agents/klantenservice.ts", note: "" },
    { icon: FileText, name: "docs/README.md", note: "" },
    { icon: FileText, name: "LICENSE", note: lang === "nl" ? "op jouw naam" : "in your name" },
  ];

  return (
    <div ref={ref} aria-hidden="true" className="relative flex h-full flex-col justify-center gap-4">
      {/* repo card */}
      <div className="rounded-xl border border-black/[0.07] bg-white shadow-[0_14px_36px_-22px_rgba(70,55,210,0.35)] dark:border-white/10 dark:bg-background">
        <div className="flex items-center justify-between border-b border-black/[0.06] px-4 py-3 dark:border-white/10">
          <span className="truncate font-mono text-[12px] text-foreground">
            <span className="text-muted-foreground">{lang === "nl" ? "jouw-bedrijf" : "your-company"} / </span>ai-assistent
          </span>
          <span className="relative flex h-7 shrink-0 items-center gap-1.5 rounded-full border border-black/[0.07] bg-[#fafafb] px-2.5 text-[11px] font-medium text-muted-foreground dark:border-white/10 dark:bg-white/5">
            <span className="relative h-3.5 w-3.5">
              <AnimatePresence initial={false} mode="popLayout">
                {stage >= 2 ? (
                  <motion.span key="shut" className="absolute inset-0 text-primary"
                    initial={{ scale: 1.5, opacity: 0 }} animate={{ scale: 1, opacity: 1 }}
                    transition={{ type: "spring", stiffness: 600, damping: 18 }}>
                    <Lock className="h-3.5 w-3.5" strokeWidth={2.4} />
                  </motion.span>
                ) : (
                  <motion.span key="open" className="absolute inset-0" exit={{ opacity: 0, scale: 0.8 }}>
                    <Unlock className="h-3.5 w-3.5" strokeWidth={2.2} />
                  </motion.span>
                )}
              </AnimatePresence>
            </span>
            <span className={stage >= 2 ? "text-primary" : ""}>{lang === "nl" ? "Privé" : "Private"}</span>
          </span>
        </div>
        <ul className="space-y-0.5 p-2">
          {files.map((f, i) => {
            const Icon = f.icon;
            return (
              <motion.li key={f.name}
                className="flex items-center gap-2.5 rounded-lg px-2.5 py-1.5 font-mono text-[12px] text-foreground/80"
                initial={false}
                animate={{ opacity: stage >= 1 ? 1 : 0, x: stage >= 1 ? 0 : -6 }}
                transition={{ duration: 0.4, delay: reduce ? 0 : i * 0.12, ease: EASE }}>
                <Icon className="h-3.5 w-3.5 shrink-0 text-muted-foreground" />
                <span className="truncate">{f.name}</span>
                {f.note && <span className="ml-auto shrink-0 rounded-full bg-primary/[0.07] px-2 py-0.5 font-sans text-[10.5px] font-medium text-primary">{f.note}</span>}
              </motion.li>
            );
          })}
        </ul>
      </div>

      {/* handover track */}
      <div className="flex items-center gap-3 text-[11px] font-medium text-muted-foreground">
        <span className="shrink-0">Virelio</span>
        <div className="relative h-9 flex-1">
          <div className="absolute inset-x-0 top-1/2 border-t border-dashed border-primary/25" />
          <div className="absolute inset-y-0 left-0 right-[112px]">
            <motion.div className="absolute inset-y-0 left-0 w-full"
              initial={false}
              animate={{ x: stage >= 3 ? "100%" : "0%" }}
              transition={{ duration: reduce ? 0 : 0.9, ease: EASE }}>
              <span className="absolute top-1/2 flex h-8 w-[112px] -translate-y-1/2 items-center justify-center gap-1.5 rounded-lg border border-primary/20 bg-white font-mono text-[11px] text-foreground shadow-[0_8px_20px_-12px_rgba(70,55,210,0.55)] dark:bg-background">
                <FileArchive className="h-3.5 w-3.5 text-primary" />
                broncode.zip
              </span>
            </motion.div>
          </div>
        </div>
        <span className="flex shrink-0 items-center gap-1.5 text-foreground">
          <motion.span className="flex h-4 w-4 items-center justify-center rounded-full bg-primary text-white"
            initial={false} animate={{ scale: stage >= 3 ? 1 : 0, opacity: stage >= 3 ? 1 : 0 }}
            transition={{ delay: reduce ? 0 : 0.8, type: "spring", stiffness: 500, damping: 20 }}>
            <Check className="h-2.5 w-2.5" strokeWidth={3} />
          </motion.span>
          {lang === "nl" ? "Jouw team" : "Your team"}
        </span>
      </div>
    </div>
  );
}

/* Jong & ervaren: two circles, "nieuw" and "bewezen", slide together and overlap. */
export function BlendVisual({ lang }: { lang: Lang }) {
  const { ref, start, reduce } = useStart<HTMLDivElement>();
  const t = { duration: reduce ? 0 : 0.9, ease: EASE, delay: reduce ? 0 : 0.15 };
  return (
    <div ref={ref} aria-hidden="true" className="relative flex h-full items-center justify-center">
      <motion.div className="flex h-[72px] w-[72px] items-center justify-start rounded-full border border-primary/30 bg-primary/[0.05] pl-3 text-[10.5px] font-medium text-primary"
        initial={false} animate={{ x: start ? 12 : -4 }} transition={t}>
        {lang === "nl" ? "Nieuw" : "New"}
      </motion.div>
      <motion.div className="flex h-[72px] w-[72px] items-center justify-end rounded-full border border-black/[0.12] bg-white/60 pr-2.5 text-[10.5px] font-medium text-muted-foreground dark:border-white/15 dark:bg-white/5"
        initial={false} animate={{ x: start ? -12 : 4 }} transition={t}>
        {lang === "nl" ? "Bewezen" : "Proven"}
      </motion.div>
      <motion.span className="absolute h-2 w-2 rounded-full bg-primary"
        initial={false} animate={{ scale: start ? 1 : 0, opacity: start ? 1 : 0 }}
        transition={{ delay: reduce ? 0 : 0.9, type: "spring", stiffness: 500, damping: 18 }} />
    </div>
  );
}

/* Privacy-first: twelve EU stars ring a shield. */
export function EuShieldVisual() {
  const { ref, start, reduce } = useStart<HTMLDivElement>();
  const R = 30, C = 40;
  const star = (cx: number, cy: number, r = 2.6) =>
    Array.from({ length: 10 }, (_, k) => {
      const a = (Math.PI / 5) * k - Math.PI / 2;
      const rr = k % 2 ? r * 0.45 : r;
      return `${(cx + rr * Math.cos(a)).toFixed(2)},${(cy + rr * Math.sin(a)).toFixed(2)}`;
    }).join(" ");
  return (
    <div ref={ref} aria-hidden="true" className="relative flex h-full items-center justify-center">
      <svg width={80} height={80} viewBox="0 0 80 80" className="absolute">
        {Array.from({ length: 12 }, (_, i) => {
          const a = (i / 12) * Math.PI * 2 - Math.PI / 2;
          return (
            <motion.polygon key={i} points={star(C + R * Math.cos(a), C + R * Math.sin(a))}
              className="fill-primary"
              initial={false} animate={{ opacity: start ? 0.85 : 0, scale: start ? 1 : 0.4 }}
              style={{ transformOrigin: `${C + R * Math.cos(a)}px ${C + R * Math.sin(a)}px` }}
              transition={{ delay: reduce ? 0 : i * 0.05, duration: reduce ? 0 : 0.3 }} />
          );
        })}
      </svg>
      <motion.div className="flex h-10 w-10 items-center justify-center rounded-xl bg-white shadow-[0_8px_20px_-10px_rgba(70,55,210,0.6)] ring-1 ring-primary/15 dark:bg-background"
        initial={false} animate={{ scale: start ? 1 : 0.6, opacity: start ? 1 : 0 }}
        transition={{ delay: reduce ? 0 : 0.65, type: "spring", stiffness: 420, damping: 20 }}>
        <ShieldCheck className="h-5 w-5 text-primary" strokeWidth={2.2} />
      </motion.div>
    </div>
  );
}

/* Live in 1 week: a 7-day sprint bar that fills, day 7 is live. */
export function SprintVisual({ lang }: { lang: Lang }) {
  const { ref, start, reduce } = useStart<HTMLDivElement>();
  return (
    <div ref={ref} aria-hidden="true" className="flex h-full w-full flex-col justify-center gap-2 px-1">
      <div className="flex items-end gap-[3px]">
        {Array.from({ length: 7 }, (_, i) => (
          <div key={i} className="relative h-6 flex-1 overflow-hidden rounded-[3px] bg-black/[0.05] dark:bg-white/10">
            <motion.div className={`absolute inset-0 origin-bottom ${i === 6 ? "bg-primary" : "bg-primary/45"}`}
              initial={false} animate={{ scaleY: start ? 1 : 0 }}
              transition={{ delay: reduce ? 0 : 0.1 + i * 0.12, duration: reduce ? 0 : 0.3, ease: EASE }} />
          </div>
        ))}
      </div>
      <div className="flex justify-between text-[10.5px] font-medium tabular-nums text-muted-foreground">
        <span>{lang === "nl" ? "Dag 1 · intake" : "Day 1 · intake"}</span>
        <motion.span className="text-primary" initial={false} animate={{ opacity: start ? 1 : 0 }}
          transition={{ delay: reduce ? 0 : 1.1 }}>
          {lang === "nl" ? "Dag 7 · live" : "Day 7 · live"}
        </motion.span>
      </div>
    </div>
  );
}

/* Meertalig team: a pill that cycles through the five working languages. */
const GREETINGS = [
  { code: "NL", word: "Hallo" },
  { code: "EN", word: "Hello" },
  { code: "AR", word: "مرحبا" },
  { code: "ES", word: "Hola" },
  { code: "FR", word: "Bonjour" },
];

export function LanguageVisual() {
  const { ref, start, reduce } = useStart<HTMLDivElement>();
  const [i, setI] = useState(0);
  useEffect(() => {
    if (!start || reduce) return;
    const id = window.setInterval(() => setI((n) => (n + 1) % GREETINGS.length), 1600);
    return () => clearInterval(id);
  }, [start, reduce]);
  const g = GREETINGS[i];
  return (
    <div ref={ref} aria-hidden="true" className="flex h-full flex-col items-center justify-center gap-3">
      <div className="flex h-10 w-[150px] items-center gap-2 rounded-full border border-black/[0.07] bg-white pl-1.5 pr-4 shadow-[0_8px_22px_-14px_rgba(70,55,210,0.5)] dark:border-white/10 dark:bg-background">
        <span className="relative flex h-7 w-9 shrink-0 items-center justify-center overflow-hidden rounded-full bg-primary text-[11px] font-semibold text-white">
          <AnimatePresence mode="popLayout" initial={false}>
            <motion.span key={g.code} initial={{ y: 14, opacity: 0 }} animate={{ y: 0, opacity: 1 }} exit={{ y: -14, opacity: 0 }}
              transition={{ duration: 0.35, ease: EASE }}>{g.code}</motion.span>
          </AnimatePresence>
        </span>
        <span className="relative flex-1 overflow-hidden text-sm font-medium text-foreground">
          <AnimatePresence mode="popLayout" initial={false}>
            <motion.span key={g.word} dir="auto" className="block" initial={{ y: 14, opacity: 0 }} animate={{ y: 0, opacity: 1 }} exit={{ y: -14, opacity: 0 }}
              transition={{ duration: 0.35, ease: EASE, delay: 0.04 }}>{g.word}</motion.span>
          </AnimatePresence>
        </span>
      </div>
      <div className="flex gap-1.5">
        {GREETINGS.map((x, k) => (
          <span key={x.code} className={`h-1 w-1 rounded-full transition-opacity duration-300 ${k === i ? "bg-primary opacity-100" : "bg-foreground opacity-20"}`} />
        ))}
      </div>
    </div>
  );
}

/* Geen lock-in: a subscription switch that flips to "opgezegd" when the card is hovered. */
export function CancelVisual({ lang }: { lang: Lang }) {
  const flip = "transition duration-300 ease-out motion-reduce:transition-none";
  return (
    <div aria-hidden="true" className="flex h-full items-center justify-center">
      <div className="flex w-[190px] items-center justify-between rounded-xl border border-black/[0.07] bg-white px-3.5 py-3 shadow-[0_8px_22px_-14px_rgba(70,55,210,0.45)] dark:border-white/10 dark:bg-background">
        <div className="relative text-[12px] leading-tight">
          <div className="font-medium text-foreground">{lang === "nl" ? "Abonnement" : "Subscription"}</div>
          <div className="relative h-4 text-[11px] text-muted-foreground">
            <span className={`absolute left-0 ${flip} group-hover:-translate-y-1 group-hover:opacity-0`}>{lang === "nl" ? "Actief" : "Active"}</span>
            <span className={`absolute left-0 translate-y-1 opacity-0 ${flip} group-hover:translate-y-0 group-hover:opacity-100`}>{lang === "nl" ? "Opgezegd, per direct" : "Cancelled, right away"}</span>
          </div>
        </div>
        <span className="relative h-6 w-10 shrink-0 rounded-full bg-black/[0.08] dark:bg-white/15">
          <span className={`absolute inset-0 rounded-full bg-primary ${flip} group-hover:opacity-0`} />
          <span className={`absolute left-0.5 top-0.5 h-5 w-5 translate-x-4 rounded-full bg-white shadow-sm ${flip} group-hover:translate-x-0`} />
        </span>
      </div>
    </div>
  );
}
