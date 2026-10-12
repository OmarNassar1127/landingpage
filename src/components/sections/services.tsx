"use client";

import React, { useCallback, useEffect, useRef, useState } from "react";
import { motion, AnimatePresence, useInView, useReducedMotion } from "framer-motion";
import { ArrowRight, ChevronRight, Zap } from "lucide-react";
import { useLanguage } from "@/lib/i18n/language-context";
import { scrollToSection } from "@/lib/scroll-utils";
import { CATEGORY_COLOR, getCategories, type Agent } from "./services/data";
import CategoryDetail from "./services/category-detail";

/**
 * Live agent directory: the categories as a vertical tab list, the selected
 * category's agents as working rows. Categories advance every 6 s until the
 * user interacts; hover or focus pauses it. Rows open the category detail
 * modal on that agent. Static under reduced motion.
 */

const ADVANCE_MS = 6000;
const RING = "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2";
const SPRING = { type: "spring", stiffness: 380, damping: 34 } as const;

function AgentRow({ agent, index, color, reduce, isNL, onOpen }: {
  agent: Agent; index: number; color: string; reduce: boolean; isNL: boolean; onOpen: (e: React.MouseEvent<HTMLButtonElement>) => void;
}) {
  const Icon = agent.icon;
  const cycle = 2.6 + index * 0.7;
  return (
    <motion.li
      initial={reduce ? false : { opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ ...SPRING, delay: reduce ? 0 : 0.05 + index * 0.06 }}
    >
      <button
        onClick={onOpen}
        className={`group relative flex w-full items-center gap-3 overflow-hidden rounded-2xl border border-black/[0.07] bg-white px-3.5 py-3.5 text-left shadow-[0_1px_2px_rgba(23,23,28,0.04)] transition-[box-shadow,transform] duration-200 hover:-translate-y-px hover:shadow-[0_14px_30px_-18px_rgba(23,23,28,0.35)] sm:gap-4 sm:px-5 sm:py-4 ${RING}`}
      >
        <span className="relative flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-black/[0.07] bg-zinc-50">
          <Icon className="h-[18px] w-[18px] text-zinc-700" strokeWidth={2} />
          <span className="absolute -right-0.5 -top-0.5 h-2 w-2 rounded-full ring-2 ring-white" style={{ background: color }} />
        </span>
        <span className="min-w-0 flex-1">
          <span className="flex items-center gap-2">
            <span className="truncate text-[15px] font-semibold text-zinc-900">{agent.name}</span>
            <span className="inline-flex shrink-0 items-center gap-1.5 rounded-full bg-emerald-50 px-2 py-0.5 text-[11px] font-medium text-emerald-700">
              <span className="relative flex h-1.5 w-1.5">
                {!reduce && (
                  <motion.span
                    className="absolute inset-0 rounded-full bg-emerald-500"
                    animate={{ scale: [1, 2.4], opacity: [0.5, 0] }}
                    transition={{ duration: 1.6, repeat: Infinity, ease: "easeOut", delay: index * 0.3 }}
                  />
                )}
                <span className="relative h-1.5 w-1.5 rounded-full bg-emerald-500" />
              </span>
              {isNL ? "actief" : "active"}
            </span>
          </span>
          <span className="mt-0.5 block text-[13px] leading-snug text-zinc-500 sm:truncate">{agent.headline}</span>
          {/* work in progress: a thin line that keeps filling */}
          <span className="mt-2.5 block h-[2px] overflow-hidden rounded-full bg-black/[0.05]" aria-hidden="true">
            <motion.span
              className="block h-full w-full origin-left rounded-full"
              style={{ background: color, opacity: 0.7, scaleX: reduce ? 0.62 : undefined }}
              initial={reduce ? false : { scaleX: 0 }}
              animate={reduce ? undefined : { scaleX: [0, 1, 1], opacity: [0.7, 0.7, 0] }}
              transition={reduce ? undefined : { duration: cycle, times: [0, 0.85, 1], repeat: Infinity, ease: "easeInOut", delay: index * 0.4 }}
            />
          </span>
        </span>
        <ChevronRight className="h-4 w-4 shrink-0 text-zinc-300 transition-transform group-hover:translate-x-0.5 group-hover:text-primary" />
      </button>
    </motion.li>
  );
}

const Services = () => {
  const { language } = useLanguage();
  const categories = getCategories(language);
  const isNL = language === "nl";
  const reduce = !!useReducedMotion();
  const totalAgents = categories.reduce((acc, c) => acc + c.agents.length, 0);

  const [active, setActive] = useState(0);
  const [touched, setTouched] = useState(false);
  const [paused, setPaused] = useState(false);
  const [detail, setDetail] = useState<{ cat: number; agent: number } | null>(null);
  const sectionRef = useRef<HTMLElement>(null);
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const triggerRef = useRef<HTMLElement | null>(null);
  const inView = useInView(sectionRef, { amount: 0.35 });

  const running = !touched && !reduce && inView && !paused && !detail;

  useEffect(() => {
    if (!running) return;
    const t = window.setTimeout(() => setActive((a) => (a + 1) % categories.length), ADVANCE_MS);
    return () => clearTimeout(t);
  }, [running, active, categories.length]);

  const select = (i: number, focus = false) => {
    setTouched(true);
    setActive(i);
    if (focus) tabRefs.current[i]?.focus();
  };

  const onTabKey = (e: React.KeyboardEvent, i: number) => {
    const n = categories.length;
    const next = { ArrowDown: i + 1, ArrowRight: i + 1, ArrowUp: i - 1, ArrowLeft: i - 1, Home: 0, End: n - 1 }[e.key];
    if (next === undefined) return;
    e.preventDefault();
    select((next + n) % n, true);
  };

  const closeDetail = useCallback(() => {
    setDetail(null);
    triggerRef.current?.focus();
  }, []);

  const cat = categories[active];
  const color = CATEGORY_COLOR[cat.id];

  return (
    <section ref={sectionRef} id="services" className="overflow-hidden bg-white py-20 sm:py-28 md:py-32">
      <div
        className="container mx-auto max-w-7xl px-4 sm:px-6"
        onPointerEnter={() => setPaused(true)}
        onPointerLeave={() => setPaused(false)}
        onFocus={() => setPaused(true)}
        onBlur={(e) => !e.currentTarget.contains(e.relatedTarget as Node) && setPaused(false)}
      >
        <div className="grid gap-10 lg:grid-cols-[minmax(0,380px)_minmax(0,1fr)] lg:gap-14">
          {/* Left: heading + category tabs */}
          <div className="lg:sticky lg:top-28 lg:self-start">
            <motion.div
              initial={reduce ? false : { opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={SPRING}
            >
              <p className="mb-4 flex items-center gap-2 text-sm font-medium text-primary">
                <span className="h-1.5 w-1.5 rounded-full bg-primary" />
                <span className="tabular-nums">{isNL ? `${totalAgents} digitale medewerkers` : `${totalAgents} digital employees`}</span>
              </p>
              <h2 className="mb-4 text-3xl font-bold tracking-tight text-zinc-900 sm:text-4xl lg:text-[44px] lg:leading-[1.08]">
                {isNL ? (
                  <>Welke agent past <span className="text-primary">bij jou</span>?</>
                ) : (
                  <>Which agent fits <span className="text-primary">your team</span>?</>
                )}
              </h2>
              <p className="mb-8 text-base text-zinc-500 sm:text-lg">
                {isNL
                  ? "Kies een categorie en ontdek wat onze agents voor je kunnen doen"
                  : "Choose a category and discover what our agents can do for you"}
              </p>
            </motion.div>

            <div role="tablist" aria-orientation="vertical" aria-label={isNL ? "Categorieën" : "Categories"} className="space-y-1">
              {categories.map((c, i) => {
                const on = i === active;
                return (
                  <button
                    key={c.id}
                    ref={(el) => { tabRefs.current[i] = el; }}
                    role="tab"
                    id={`services-tab-${c.id}`}
                    aria-selected={on}
                    aria-controls="services-panel"
                    tabIndex={on ? 0 : -1}
                    onClick={() => select(i)}
                    onKeyDown={(e) => onTabKey(e, i)}
                    className={`relative flex w-full items-center gap-3 overflow-hidden rounded-xl border px-4 py-3 text-left transition-colors duration-200 ${RING} ${
                      on
                        ? "border-black/[0.07] bg-white shadow-[0_10px_24px_-16px_rgba(23,23,28,0.35)]"
                        : "border-transparent hover:bg-zinc-50"
                    }`}
                  >
                    {/* indigo bar; while auto-advancing it fills up as a timer */}
                    {on && (
                      <span className="absolute inset-y-2 left-0 w-[3px] overflow-hidden rounded-full bg-primary/20" aria-hidden="true">
                        <motion.span
                          key={`${active}-${running}`}
                          className="block h-full w-full origin-top rounded-full bg-primary"
                          initial={{ scaleY: running ? 0 : 1 }}
                          animate={{ scaleY: 1 }}
                          transition={running ? { duration: ADVANCE_MS / 1000, ease: "linear" } : { duration: 0 }}
                        />
                      </span>
                    )}
                    <span className="h-2 w-2 shrink-0 rounded-full" style={{ background: CATEGORY_COLOR[c.id] }} />
                    <span className="min-w-0 flex-1">
                      <span className={`block text-[15px] font-semibold ${on ? "text-zinc-900" : "text-zinc-600"}`}>{c.title}</span>
                      <span className="hidden truncate text-[13px] text-zinc-500 sm:block">{c.subtitle}</span>
                    </span>
                    <span className="shrink-0 text-xs tabular-nums text-zinc-400">{c.agents.length}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Right: the selected category at work */}
          <div className="min-w-0">
            <div
              id="services-panel"
              role="tabpanel"
              aria-labelledby={`services-tab-${cat.id}`}
              className="rounded-[28px] border border-black/[0.07] bg-zinc-50/60 p-3 shadow-[0_40px_80px_-50px_rgba(23,23,28,0.35)] sm:p-5"
            >
              <AnimatePresence mode="wait" initial={false}>
                <motion.div
                  key={cat.id}
                  initial={reduce ? { opacity: 0 } : { opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={reduce ? { opacity: 0 } : { opacity: 0, y: -6 }}
                  transition={reduce ? { duration: 0.15 } : SPRING}
                >
                  <div className="flex flex-wrap items-center justify-between gap-3 px-2 pb-4 pt-2 sm:px-3">
                    <div className="flex min-w-0 items-center gap-2.5">
                      <span className="h-2.5 w-2.5 shrink-0 rounded-full" style={{ background: color }} />
                      <h3 className="truncate text-lg font-semibold tracking-tight text-zinc-900">{cat.title}</h3>
                      <span className="shrink-0 text-sm tabular-nums text-zinc-400">
                        {cat.agents.length} agents
                      </span>
                    </div>
                    <button
                      onClick={(e) => {
                        setTouched(true);
                        triggerRef.current = e.currentTarget;
                        setDetail({ cat: active, agent: 0 });
                      }}
                      className={`inline-flex items-center gap-1 rounded-lg px-2 py-1 text-sm font-medium text-primary hover:bg-primary/[0.06] ${RING}`}
                    >
                      {isNL ? "Ontdek" : "Explore"}
                      <ArrowRight className="h-3.5 w-3.5" />
                    </button>
                  </div>
                  <ul className="space-y-2">
                    {cat.agents.map((a, i) => (
                      <AgentRow
                        key={a.name}
                        agent={a}
                        index={i}
                        color={color}
                        reduce={reduce}
                        isNL={isNL}
                        onOpen={(e) => {
                          setTouched(true);
                          triggerRef.current = e.currentTarget;
                          setDetail({ cat: active, agent: i });
                        }}
                      />
                    ))}
                  </ul>
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Custom agent CTA */}
            <div className="mt-4 flex flex-col gap-4 rounded-2xl border border-black/[0.07] bg-white px-5 py-4 sm:flex-row sm:items-center sm:gap-5">
              <Zap className="hidden h-5 w-5 shrink-0 text-primary sm:block" />
              <div className="min-w-0 flex-1">
                <h3 className="text-[15px] font-semibold text-zinc-900">
                  {isNL ? "Niet gevonden wat je zoekt?" : "Didn't find what you need?"}
                </h3>
                <p className="text-[13px] leading-snug text-zinc-500">
                  {isNL
                    ? "Geen probleem. Wij bouwen agents volledig op maat, afgestemd op jouw processen, systemen en wensen. Vertel ons wat je nodig hebt."
                    : "No problem. We build fully custom agents, tailored to your processes, systems and needs. Tell us what you're looking for."}
                </p>
              </div>
              <button
                onClick={() => scrollToSection("ready-to-start")}
                className={`group inline-flex shrink-0 items-center justify-center gap-2 rounded-xl border border-black/[0.1] bg-white px-4 py-2.5 text-sm font-semibold text-zinc-900 transition-colors hover:border-primary/40 hover:text-primary ${RING}`}
              >
                {isNL ? "Bespreek jouw custom agent" : "Discuss your custom agent"}
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
              </button>
            </div>
          </div>
        </div>
      </div>

      <AnimatePresence>
        {detail && (
          <CategoryDetail
            key={`${detail.cat}-${detail.agent}`}
            category={categories[detail.cat]}
            initialAgent={detail.agent}
            language={language}
            onClose={closeDetail}
          />
        )}
      </AnimatePresence>
    </section>
  );
};

export default Services;
