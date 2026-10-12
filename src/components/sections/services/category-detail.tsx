"use client";

import React, { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { ArrowRight, Plug, X } from "lucide-react";
import { scrollToSection } from "@/lib/scroll-utils";
import { CATEGORY_COLOR, type Category } from "./data";
import {
  ChatTemplate,
  PipelineTemplate,
  WorkflowTemplate,
  SearchTemplate,
  DashboardTemplate,
  DocumentScanTemplate,
} from "./templates";

const TEMPLATES: Record<string, typeof ChatTemplate> = {
  klantenservice: ChatTemplate,
  sales: PipelineTemplate,
  operations: WorkflowTemplate,
  kennisbank: SearchTemplate,
  "data-insights": DashboardTemplate,
  "finance-legal": DocumentScanTemplate,
};

const RING = "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2";

export default function CategoryDetail({
  category,
  initialAgent = 0,
  language,
  onClose,
}: {
  category: Category;
  initialAgent?: number;
  language: string;
  onClose: () => void;
}) {
  const isNL = language === "nl";
  const reduce = useReducedMotion();
  const [activeAgent, setActiveAgent] = useState(initialAgent);
  const closeRef = useRef<HTMLButtonElement>(null);
  const agent = category.agents[activeAgent];
  const CategoryIcon = category.icon;
  const color = CATEGORY_COLOR[category.id];
  const Template = TEMPLATES[category.id];

  useEffect(() => {
    closeRef.current?.focus();
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-end justify-center bg-zinc-950/40 backdrop-blur-sm sm:items-center"
      onClick={onClose}
    >
      <motion.div
        role="dialog"
        aria-modal="true"
        aria-labelledby="service-detail-title"
        initial={reduce ? { opacity: 0 } : { opacity: 0, y: 60 }}
        animate={{ opacity: 1, y: 0 }}
        exit={reduce ? { opacity: 0 } : { opacity: 0, y: 40 }}
        transition={{ type: "spring", stiffness: 320, damping: 32 }}
        className="relative max-h-[92vh] w-full overflow-y-auto rounded-t-[28px] border border-black/[0.07] bg-white shadow-[0_40px_80px_-30px_rgba(23,23,28,0.45)] scrollbar-hide sm:max-h-[88vh] sm:max-w-3xl sm:rounded-[28px]"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex justify-center pb-1 pt-3 sm:hidden">
          <div className="h-1 w-10 rounded-full bg-zinc-200" />
        </div>

        {/* Header */}
        <div className="flex items-start gap-4 border-b border-black/[0.07] px-5 pb-5 pt-4 sm:px-8 sm:pt-7">
          <div className="relative flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl border border-black/[0.07] bg-zinc-50">
            <CategoryIcon className="h-5 w-5 text-zinc-700" strokeWidth={2} />
            <span className="absolute -right-0.5 -top-0.5 h-2.5 w-2.5 rounded-full ring-2 ring-white" style={{ background: color }} />
          </div>
          <div className="min-w-0 flex-1">
            <h3 id="service-detail-title" className="text-xl font-semibold tracking-tight text-zinc-900 sm:text-2xl">
              {category.title}
            </h3>
            <p className="text-sm text-zinc-500">{category.subtitle}</p>
          </div>
          <button
            ref={closeRef}
            onClick={onClose}
            aria-label={isNL ? "Sluiten" : "Close"}
            className={`rounded-xl p-2.5 text-zinc-500 transition-colors hover:bg-zinc-100 hover:text-zinc-900 ${RING}`}
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        {/* Agent selector */}
        <div className="px-5 pt-5 sm:px-8">
          <div className="grid grid-cols-2 gap-2 sm:grid-cols-4" role="group" aria-label={isNL ? "Kies een agent" : "Choose an agent"}>
            {category.agents.map((a, i) => {
              const AgentIcon = a.icon;
              const on = activeAgent === i;
              return (
                <button
                  key={a.name}
                  onClick={() => setActiveAgent(i)}
                  aria-pressed={on}
                  className={`flex flex-col items-center gap-1.5 rounded-2xl border px-3 py-3 text-xs font-medium transition-colors ${RING} ${
                    on
                      ? "border-primary/40 bg-primary/[0.04] text-zinc-900 shadow-[0_8px_20px_-14px_rgba(70,55,210,0.6)]"
                      : "border-black/[0.07] bg-white text-zinc-500 hover:text-zinc-900"
                  }`}
                >
                  <AgentIcon className={`h-5 w-5 ${on ? "text-primary" : ""}`} />
                  <span className="text-center leading-tight">{a.name}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Content */}
        <div className="px-5 pb-6 pt-6 sm:px-8 sm:pb-8">
          <AnimatePresence mode="wait" initial={false}>
            <motion.div
              key={activeAgent}
              initial={reduce ? { opacity: 0 } : { opacity: 0, x: 16 }}
              animate={{ opacity: 1, x: 0 }}
              exit={reduce ? { opacity: 0 } : { opacity: 0, x: -16 }}
              transition={{ type: "spring", stiffness: 380, damping: 36 }}
              className="space-y-6"
            >
              <div>
                <h4 className="mb-2 text-lg font-semibold tracking-tight text-zinc-900 sm:text-xl">{agent.headline}</h4>
                <p className="text-sm leading-relaxed text-zinc-500">{agent.description}</p>
              </div>

              <div className="grid grid-cols-3 gap-2 sm:gap-3">
                {agent.results.map((r) => (
                  <div key={r.label} className="min-w-0 rounded-2xl border border-black/[0.07] bg-white p-3 text-center sm:p-4">
                    <div className="truncate text-lg font-semibold tabular-nums tracking-tight text-zinc-900 sm:text-2xl">{r.value}</div>
                    <div className="mt-1 truncate text-[11px] text-zinc-500">{r.label}</div>
                  </div>
                ))}
              </div>

              <div className="grid gap-5 sm:grid-cols-2">
                <div>
                  <h5 className="mb-3 flex items-center gap-1.5 text-xs font-medium text-zinc-500">
                    <Plug className="h-3 w-3" />
                    {isNL ? "Werkt met" : "Works with"}
                  </h5>
                  <div className="flex flex-wrap gap-2">
                    {agent.integrations.map((int) => (
                      <span key={int} className="rounded-lg border border-black/[0.07] bg-zinc-50 px-3 py-1.5 text-xs font-medium text-zinc-600">
                        {int}
                      </span>
                    ))}
                  </div>
                </div>
                <div>{Template && <Template activeAgent={activeAgent} agents={category.agents} language={language} />}</div>
              </div>

              <button
                className={`group flex w-full items-center justify-center gap-2 rounded-2xl bg-primary px-6 py-4 text-base font-semibold text-white shadow-[0_12px_30px_-14px_rgba(70,55,210,0.8)] transition-transform hover:-translate-y-px active:translate-y-0 ${RING}`}
                onClick={() => {
                  onClose();
                  scrollToSection("ready-to-start");
                }}
              >
                {isNL ? "Bespreek deze agent" : "Discuss this agent"}
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </button>
            </motion.div>
          </AnimatePresence>
        </div>
      </motion.div>
    </motion.div>
  );
}
