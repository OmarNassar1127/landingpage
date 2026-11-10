"use client";

import React from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Check, FileText } from "lucide-react";
import { UI, type Lang, type Result } from "@/components/sections/hero-problems-data";

const spring = { type: "spring", bounce: 0, duration: 0.6 } as const;

// One revealed row of the finished thing; rows appear in order after the card lands.
function Row({ i, still, children, className = "" }: { i: number; still: boolean; children: React.ReactNode; className?: string }) {
  return (
    <motion.div
      initial={still ? false : { opacity: 0, y: 6 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ ...spring, delay: still ? 0 : 0.25 + i * 0.16 }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

function Body({ r, lang, still }: { r: Result; lang: Lang; still: boolean }) {
  switch (r.kind) {
    case "order":
      return (
        <div className="divide-y divide-line text-[12.5px] sm:text-[13.5px]">
          {r.rows.map((row, i) => {
            const fresh = i === r.rows.length - 1;
            return (
              <Row key={row.id} i={fresh ? 2 : 0} still={still} className={`flex items-center gap-2 py-1.5 ${fresh ? "" : "text-ink-soft/60"}`}>
                <span className="w-9 shrink-0 tabular-nums">#{row.id}</span>
                <span className={`min-w-0 flex-1 ${fresh ? "font-medium text-ink" : "truncate"}`}>
                  {fresh ? (
                    <>
                      <span className="block truncate">{row.who}</span>
                      <span className="block truncate text-[11.5px] font-normal text-ink-soft">{row.what}</span>
                    </>
                  ) : (
                    <>
                      {row.who}
                      <span className="hidden sm:inline"> · {row.what}</span>
                    </>
                  )}
                </span>
                <span className={`shrink-0 tabular-nums ${fresh ? "font-semibold text-ink" : ""}`}>{row.amount}</span>
                {fresh && <span className="shrink-0 rounded-full bg-brand px-1.5 py-px text-[10px] font-semibold text-white">{UI[lang].fresh}</span>}
              </Row>
            );
          })}
        </div>
      );
    case "quote":
      return (
        <div className="text-[12.5px] sm:text-[13.5px]">
          {r.lines.map((l, i) => (
            <Row key={l.label} i={i} still={still} className="flex items-baseline gap-2 py-1">
              <span className="min-w-0 flex-1 truncate text-ink/80">{l.label}</span>
              <span className="shrink-0 text-ink-soft/60">{l.qty}</span>
              <span className="w-[5.2rem] shrink-0 text-right tabular-nums text-ink/80">{l.amount}</span>
            </Row>
          ))}
          <Row i={r.lines.length} still={still} className="mt-1 flex items-baseline justify-between border-t border-line pt-2 font-semibold text-ink">
            <span>{r.totalLabel}</span>
            <span className="tabular-nums">{r.total}</span>
          </Row>
        </div>
      );
    case "invoice":
      return (
        <div className="text-[12.5px] sm:text-[13.5px]">
          <div className="grid grid-cols-2 gap-x-4 gap-y-1.5">
            {r.fields.map((f, i) => (
              <Row key={f.k} i={i} still={still}>
                <div className="text-[11px] text-ink-soft/60">{f.k}</div>
                <div className="truncate font-medium tabular-nums text-ink">{f.v}</div>
              </Row>
            ))}
          </div>
          <Row i={r.fields.length} still={still} className="mt-2.5 flex items-center gap-1.5 text-[12.5px] font-medium text-brand">
            <span className="flex h-4 w-4 items-center justify-center rounded-full bg-brand text-white">
              <Check className="h-2.5 w-2.5" strokeWidth={3.5} />
            </span>
            {r.booked}
          </Row>
        </div>
      );
    case "message":
      return (
        <div className="text-[12.5px] sm:text-[13.5px]">
          <Row i={0} still={still} className="text-ink-soft">
            <span className="font-medium text-ink/80">{r.from}:</span> {r.question}
          </Row>
          <Row i={1} still={still} className="mt-1.5 leading-relaxed text-ink">
            {r.answer}
          </Row>
        </div>
      );
    case "plan":
      return (
        <div className="text-[11px]">
          <div className="grid grid-cols-5 gap-1">
            {r.days.map((d, di) => (
              <div key={d} className="flex flex-col gap-1">
                <div className={`text-center font-medium ${di === r.pick.day ? "text-brand" : "text-ink-soft/60"}`}>{d}</div>
                {[0, 1, 2, 3].map((s) => {
                  const pick = di === r.pick.day && s === r.pick.slot;
                  const busy = r.busy[di].includes(s);
                  return pick ? (
                    <Row key={s} i={3} still={still} className="flex h-[18px] items-center justify-center rounded-md bg-brand font-semibold text-white ring-2 ring-brand-tint">
                      {r.pick.label}
                    </Row>
                  ) : (
                    <div key={s} className={`h-[18px] rounded-md ${busy ? "bg-line" : "bg-white ring-1 ring-line"}`} />
                  );
                })}
              </div>
            ))}
          </div>
          <Row i={4} still={still} className="mt-2 text-[12.5px] font-medium text-ink sm:text-[13.5px]">
            {r.proposal}
          </Row>
        </div>
      );
  }
}

// phase: 1 card shown, 2 approve pressed, 3 approved.
export default function ResultCard({ r, lang, phase, still }: { r: Result; lang: Lang; phase: number; still: boolean }) {
  const ui = UI[lang];
  const pressed = phase === 2;
  const approved = phase >= 3;
  return (
    <div className="rounded-2xl bg-band p-3.5 ring-1 ring-line sm:p-4">
      <div className="mb-2 flex items-baseline justify-between gap-2">
        <span className="flex shrink-0 items-center gap-1.5 whitespace-nowrap text-[12.5px] font-semibold text-ink sm:text-[13.5px]">
          <span className="h-1.5 w-1.5 rounded-full bg-brand" />
          {r.title}
        </span>
        <span className="min-w-0 truncate text-[11.5px] text-ink-soft/60">{r.meta}</span>
      </div>
      <Body r={r} lang={lang} still={still} />
      <div className="mt-3 flex items-center justify-between gap-2">
        <span className="inline-flex min-w-0 items-center gap-1 truncate rounded-full bg-brand-tint px-2 py-0.5 text-[11px] font-medium text-brand">
          <FileText className="h-3 w-3 shrink-0" strokeWidth={2} />
          <span className="truncate">{r.source}</span>
        </span>
        <div className="flex shrink-0 items-center gap-1">
          <span className="hidden px-2 text-[12.5px] font-medium text-ink-soft sm:inline">{ui.edit}</span>
          <motion.span
            initial={false}
            animate={{ scale: pressed ? 0.93 : 1 }}
            transition={{ type: "spring", bounce: 0, duration: 0.25 }}
            className={`relative flex h-8 min-w-[7.5rem] items-center justify-center overflow-hidden rounded-full px-3.5 text-[12.5px] font-semibold text-white transition-colors duration-200 ${approved ? "bg-brand" : "bg-ink"}`}
          >
            <AnimatePresence initial={false} mode="wait">
              <motion.span
                key={approved ? "ok" : "go"}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.18 }}
                className="flex items-center gap-1"
              >
                {approved && <Check className="h-3.5 w-3.5" strokeWidth={3} />}
                {approved ? ui.approved : ui.approve}
              </motion.span>
            </AnimatePresence>
          </motion.span>
        </div>
      </div>
    </div>
  );
}
