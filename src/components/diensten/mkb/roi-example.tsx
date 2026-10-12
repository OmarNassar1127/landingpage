"use client";

import React, { useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { MAINTENANCE, USE_CASES, eur, roi, type TierId, type UseCaseId } from "./data";

const RING = "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2";
const SPRING = { type: "spring", stiffness: 380, damping: 34 } as const;

function Segmented<T extends string>({ label, value, options, onChange }: {
  label: string; value: T; options: { id: T; label: string }[]; onChange: (v: T) => void;
}) {
  return (
    <div role="radiogroup" aria-label={label} className="inline-flex rounded-xl border border-black/[0.07] bg-zinc-50 p-1">
      {options.map((o) => {
        const on = o.id === value;
        return (
          <button key={o.id} role="radio" aria-checked={on} onClick={() => onChange(o.id)}
            className={`relative rounded-lg px-3 py-1.5 text-sm font-medium transition-colors sm:px-4 ${RING} ${on ? "text-zinc-900" : "text-zinc-500 hover:text-zinc-800"}`}>
            {on && <motion.span layoutId={`seg-${label}`} transition={SPRING} className="absolute inset-0 rounded-lg border border-black/[0.07] bg-white shadow-[0_4px_12px_-6px_rgba(70,55,210,0.35)]" />}
            <span className="relative">{o.label}</span>
          </button>
        );
      })}
    </div>
  );
}

export default function RoiExample() {
  const reduce = !!useReducedMotion();
  const [caseId, setCaseId] = useState<UseCaseId>("klantenservice");
  const [tierId, setTierId] = useState<TierId>("basis");
  const uc = USE_CASES.find((u) => u.id === caseId)!;
  const tier = MAINTENANCE.find((t) => t.id === tierId)!;
  const r = roi(uc.saving, uc.setup, tier.price);
  const bar = (w: number) => ({ width: `${Math.max(2, (w / uc.saving) * 100)}%` });
  const t = reduce ? { duration: 0 } : SPRING;

  return (
    <div className="rounded-[28px] border border-black/[0.07] bg-white p-5 shadow-[0_40px_80px_-50px_rgba(70,55,210,0.35)] sm:p-8">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <Segmented label="Toepassing" value={caseId} onChange={setCaseId} options={USE_CASES.map((u) => ({ id: u.id, label: u.short }))} />
        <Segmented label="Onderhoud" value={tierId} onChange={setTierId} options={MAINTENANCE.map((m) => ({ id: m.id, label: m.name.replace("Onderhoud ", "") }))} />
      </div>

      <div className="mt-8 grid gap-8 md:grid-cols-[minmax(0,1fr)_220px] md:items-end">
        <div className="space-y-5">
          <div>
            <div className="mb-1.5 flex justify-between text-sm">
              <span className="text-zinc-500">Besparing per maand</span>
              <span className="font-semibold tabular-nums text-zinc-900">{eur(uc.saving)}</span>
            </div>
            <div className="h-2.5 overflow-hidden rounded-full bg-black/[0.05]">
              <motion.div className="h-full rounded-full bg-primary" initial={false} animate={bar(uc.saving)} transition={t} />
            </div>
          </div>
          <div>
            <div className="mb-1.5 flex justify-between text-sm">
              <span className="text-zinc-500">Kosten per maand ({tier.name})</span>
              <span className="font-semibold tabular-nums text-zinc-900">{eur(tier.price)}</span>
            </div>
            <div className="h-2.5 overflow-hidden rounded-full bg-black/[0.05]">
              <motion.div className="h-full rounded-full bg-zinc-400" initial={false} animate={bar(tier.price)} transition={t} />
            </div>
          </div>
          <p className="text-sm leading-relaxed text-zinc-500">
            Eenmalige setup {eur(uc.setup)}. Daarna houdt u <span className="font-semibold text-zinc-900">{eur(r.netMonthly)}</span> per maand over.
            Netto in het eerste jaar: <span className="font-semibold text-zinc-900">{eur(r.netYear1)}</span>.
          </p>
        </div>

        <div className="rounded-2xl border border-primary/15 bg-primary/[0.04] p-5 text-center" aria-live="polite">
          <div className="text-xs font-medium text-primary">Terugverdiend in</div>
          <div className="mt-1 text-5xl font-bold tabular-nums tracking-tight text-zinc-900">{r.paybackWeeks}</div>
          <div className="text-sm text-zinc-500">{r.paybackWeeks === 1 ? "week" : "weken"}</div>
        </div>
      </div>
    </div>
  );
}
