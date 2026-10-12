"use client";

import React, { useEffect, useMemo, useRef, useState } from "react";
import { AnimatePresence, MotionConfig, animate, motion, useInView, useReducedMotion } from "framer-motion";
import { ArrowUpRight, ShieldCheck, TrendingUp, type LucideIcon } from "lucide-react";
import { useLanguage } from "@/lib/i18n/language-context";
import { Button } from "@/components/ui/button";
import { scrollToSection } from "@/lib/scroll-utils";
import { ContentOSScene, FraudScene, ZapBotScene } from "./case-studies/scenes";

/**
 * Client results as a scroll story. Desktop: a sticky browser frame on the left
 * cross-fades between the product mocks while the stories scroll past on the
 * right. Mobile: each story shows its mock inline. Static under reduced motion.
 */

interface CaseStudy {
  name: string;
  url: string;
  logo: string;
  logoBg: string;
  brand: string;
  tagline: string;
  challenge: string;
  solution: string;
  results: { label: string; value: string }[];
  tech: string[];
  Icon?: LucideIcon;
  Preview: React.ComponentType<{ language: string }>;
}

const getCaseStudies = (language: string): CaseStudy[] => {
  const isNL = language === "nl";
  return [
    {
      name: "ZapBot",
      url: "https://zapbot.nl",
      logo: "/images/clients/whatsapp.svg",
      logoBg: "",
      brand: "#10b981",
      tagline: isNL ? "WhatsApp AI-assistent voor bedrijven" : "WhatsApp AI assistant for businesses",
      challenge: isNL
        ? "Bedrijven misten berichten buiten kantooruren. Afspraken werden handmatig ingepland en no-shows kostten omzet. 's Avonds en in het weekend was niemand bereikbaar."
        : "Businesses were missing messages outside office hours. Appointments were manually scheduled and no-shows were costing revenue. Evenings and weekends were unreachable.",
      solution: isNL
        ? "We bouwden een AI-assistent die direct koppelt met WhatsApp Business en Google Calendar. De bot plant automatisch afspraken in, stuurt herinneringen en wisselt zelf van taal."
        : "We built an AI assistant that connects directly to WhatsApp Business and Google Calendar. The bot schedules appointments on its own, sends reminders and switches language when the customer does.",
      results: isNL
        ? [
            { label: "Reactietijd", value: "<10 sec" },
            { label: "Minder no-shows", value: "40%" },
            { label: "Bespaard", value: "€2.800/mnd" },
            { label: "Beschikbaar", value: "24/7" },
          ]
        : [
            { label: "Response time", value: "<10 sec" },
            { label: "Fewer no-shows", value: "40%" },
            { label: "Cost saved", value: "€2,800/mo" },
            { label: "Available", value: "24/7" },
          ],
      tech: ["WhatsApp API", "AI/NLP", "Node.js", "Multi-language"],
      Preview: ZapBotScene,
    },
    {
      name: "Fraud Guard",
      url: "",
      logo: "",
      logoBg: "bg-zinc-900",
      brand: "#4637d2",
      Icon: ShieldCheck,
      tagline: isNL ? "Fraudepreventie voor facturatie · gebouwd door ervaren mensen" : "Invoice fraud prevention · built by experienced people",
      challenge: isNL
        ? "Bij een snelgroeiend mobiliteitsplatform liepen de betalingsachterstanden op. Risicoklanten werden pas zichtbaar als de factuur al openstond."
        : "At a fast-growing mobility platform, payment defaults were rising. Risky customers only became visible once the invoice was already overdue.",
      solution: isNL
        ? "Ervaren mensen uit ons team bouwden een systeem dat betaalgedrag en transactiegeschiedenis analyseert en elke klant een dynamisch risicoprofiel geeft, nog vóór de facturatie. Klanten met een hoog risico krijgen kleinere, periodieke micro-facturen in plaats van één grote maandfactuur."
        : "Experienced people from our team built a system that analyses payment behaviour and transaction history and gives every customer a dynamic risk profile before they are invoiced. High-risk customers get smaller, periodic micro-invoices instead of one large monthly invoice.",
      results: isNL
        ? [
            { label: "Minder wanbetalingen", value: "73%" },
            { label: "Openstaand teruggehaald", value: "€2M+" },
            { label: "Betere cashflow", value: "45%" },
            { label: "Risicocheck vóór facturatie", value: "Vooraf" },
          ]
        : [
            { label: "Fewer payment defaults", value: "73%" },
            { label: "Outstanding recovered", value: "€2M+" },
            { label: "Better cash flow", value: "45%" },
            { label: "Risk check before invoicing", value: "Upfront" },
          ],
      tech: ["Laravel", "Risk scoring", "Mollie", "MySQL"],
      Preview: FraudScene,
    },
    {
      name: "ContentOS",
      url: "",
      logo: "",
      logoBg: "bg-gradient-to-br from-orange-500 to-pink-500",
      brand: "#f97316",
      tagline: isNL ? "AI-marketingteam dat content maakt terwijl jij slaapt" : "AI marketing team that creates content while you sleep",
      challenge: isNL
        ? "Een groeiend e-commerce merk produceerde 3 posts per week en had geen budget voor een volledig marketingteam. Content was inconsistent en campagnes werden te laat gelanceerd."
        : "A growing e-commerce brand was producing 3 posts per week with no budget for a full marketing team. Content was inconsistent and campaigns launched too late.",
      solution: isNL
        ? "We bouwden een team van 4 AI-agents: een Strateeg die de contentkalender plant, een Schrijver die posts en blogs maakt, een Designer die visuals genereert, en een Analist die prestaties meet en de strategie bijstuurt."
        : "We built a team of 4 AI agents: a Strategist that plans the content calendar, a Writer that creates posts and blogs, a Designer that generates visuals, and an Analyst that measures performance and adjusts strategy.",
      results: isNL
        ? [
            { label: "Content/week", value: "25+" },
            { label: "Engagement", value: "+180%" },
            { label: "Tijd bespaard", value: "30 uur/wk" },
            { label: "Kosten vs. team", value: "-75%" },
          ]
        : [
            { label: "Content/week", value: "25+" },
            { label: "Engagement", value: "+180%" },
            { label: "Time saved", value: "30 hrs/wk" },
            { label: "Cost vs. team", value: "-75%" },
          ],
      tech: ["AI Agents", "Social APIs", "Analytics", "Automation"],
      Preview: ContentOSScene,
    },
  ];
};

const HAIRLINE = "border-[rgba(23,23,28,0.07)]";
const EASE = [0.22, 1, 0.36, 1] as const;
const FOCUS = "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-white";

/** Splits "€2.800/mnd" into prefix, number and suffix. Values with zero or several numbers (24/7) stay static. */
function parseMetric(value: string) {
  const nums = value.match(/\d[\d.,]*/g);
  if (!nums || nums.length !== 1) return null;
  const raw = nums[0];
  const at = value.indexOf(raw);
  return { pre: value.slice(0, at), post: value.slice(at + raw.length), n: parseInt(raw.replace(/[.,]/g, ""), 10), sep: raw.match(/[.,]/)?.[0] ?? "" };
}

function Metric({ label, value }: { label: string; value: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.6 });
  const reduce = useReducedMotion();
  const parsed = useMemo(() => parseMetric(value), [value]);
  const [n, setN] = useState<number | null>(null); // null = show the final value as written

  useEffect(() => {
    if (!parsed || reduce) return;
    if (!inView) { setN(0); return; }
    const controls = animate(0, parsed.n, { duration: 1.1, ease: EASE, onUpdate: setN, onComplete: () => setN(null) });
    return () => controls.stop();
  }, [inView, parsed, reduce]);

  const shown = n === null || !parsed
    ? value
    : parsed.pre + String(Math.round(n)).replace(/\B(?=(\d{3})+(?!\d))/g, parsed.sep) + parsed.post;

  return (
    <div ref={ref} className="flex flex-col-reverse gap-1 bg-white px-4 py-4 sm:px-5">
      <dt className="text-[13px] leading-tight text-zinc-500">{label}</dt>
      <dd className="text-2xl font-semibold tabular-nums tracking-tight text-zinc-900 sm:text-[28px]">
        <span className="sr-only">{value}</span>
        <span aria-hidden="true">{shown}</span>
      </dd>
    </div>
  );
}

function Logo({ study, size = "h-10 w-10" }: { study: CaseStudy; size?: string }) {
  return (
    <div className={`${size} flex shrink-0 items-center justify-center overflow-hidden rounded-xl ${study.logoBg}`}>
      {study.logo ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img src={study.logo} alt="" className="h-full w-full scale-125 object-cover" />
      ) : (
        React.createElement(study.Icon ?? TrendingUp, { className: "h-5 w-5 text-white", "aria-hidden": true })
      )}
    </div>
  );
}

/** The scenes are composed at 540x420; on narrow screens they scale down as one piece. */
function ScaledScene({ children }: { children: React.ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);
  const [k, setK] = useState(1);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const ro = new ResizeObserver(([e]) => setK(Math.min(1, e.contentRect.width / 540)));
    ro.observe(el);
    return () => ro.disconnect();
  }, []);
  return (
    <div ref={ref} className="relative w-full overflow-hidden" style={{ height: 420 * k }}>
      <div className="absolute left-0 top-0 w-[540px] origin-top-left" style={{ transform: `scale(${k})` }}>{children}</div>
    </div>
  );
}

function Story({ study, language, index, setRef }: { study: CaseStudy; language: string; index: number; setRef: (el: HTMLElement | null) => void }) {
  const isNL = language === "nl";
  const { Preview } = study;
  return (
    <article
      ref={setRef}
      aria-labelledby={`case-${index}-name`}
      className={`py-14 first:pt-0 lg:flex lg:min-h-[88vh] lg:flex-col lg:justify-center lg:py-20 lg:first:pt-20 ${index > 0 ? `border-t ${HAIRLINE} lg:border-t-0` : ""}`}
    >
      {/* mobile: the mock sits inline above its story */}
      <div className="mb-8 lg:hidden">
        <ScaledScene><Preview language={language} /></ScaledScene>
      </div>

      <div className="flex items-center gap-3">
        <Logo study={study} />
        <div className="min-w-0">
          <h3 id={`case-${index}-name`} className="flex items-center gap-2 text-xl font-semibold tracking-tight text-zinc-900 sm:text-2xl">
            {study.name}
            <span className="h-1.5 w-1.5 rounded-full" style={{ background: study.brand }} aria-hidden="true" />
          </h3>
          <p className="text-sm text-zinc-500">{study.tagline}</p>
        </div>
      </div>

      <div className="mt-7 space-y-5">
        <div>
          <h4 className="mb-1.5 text-sm font-semibold text-zinc-900">{isNL ? "De uitdaging" : "The challenge"}</h4>
          <p className="text-[15px] leading-relaxed text-zinc-600">{study.challenge}</p>
        </div>
        <div>
          <h4 className="mb-1.5 text-sm font-semibold text-zinc-900">{isNL ? "Onze oplossing" : "Our solution"}</h4>
          <p className="text-[15px] leading-relaxed text-zinc-600">{study.solution}</p>
        </div>
      </div>

      <dl className={`mt-8 grid grid-cols-2 gap-px overflow-hidden rounded-2xl border ${HAIRLINE} bg-[rgba(23,23,28,0.07)]`}>
        {study.results.map((r) => <Metric key={r.label} label={r.label} value={r.value} />)}
      </dl>

      <div className="mt-6 flex flex-wrap items-center gap-2">
        <ul className="flex flex-wrap gap-2" aria-label={isNL ? "Technologie" : "Technology"}>
          {study.tech.map((t) => (
            <li key={t} className={`rounded-full border ${HAIRLINE} bg-zinc-50 px-2.5 py-1 text-xs text-zinc-600`}>{t}</li>
          ))}
        </ul>
        {study.url ? (
          <a
            href={study.url}
            target="_blank"
            rel="noopener noreferrer"
            className={`group ml-auto inline-flex items-center gap-1 rounded-md text-sm font-medium text-primary underline-offset-4 hover:underline ${FOCUS}`}
          >
            {isNL ? "Bekijk live" : "View live"}
            <ArrowUpRight className="h-3.5 w-3.5 transition-transform duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" aria-hidden="true" />
            <span className="sr-only">: {study.name}</span>
          </a>
        ) : (
          <span className="ml-auto text-sm font-medium text-zinc-500">{isNL ? "Op maat gebouwd" : "Custom built"}</span>
        )}
      </div>
    </article>
  );
}

/**
 * Pins a full-height child inside `col` while the column scrolls past.
 * CSS sticky can't be used: globals.css sets overflow-x hidden on html and body,
 * which makes body the scroll container and stops sticky from sticking.
 */
type Pin = { mode: "top" | "fixed" | "bottom"; left: number; width: number };
function usePin(col: React.RefObject<HTMLDivElement>) {
  const [pin, setPin] = useState<Pin>({ mode: "top", left: 0, width: 0 });
  useEffect(() => {
    const update = () => {
      const el = col.current;
      if (!el || el.offsetParent === null) return;
      const r = el.getBoundingClientRect();
      const mode: Pin["mode"] = r.top > 0 ? "top" : r.bottom < window.innerHeight ? "bottom" : "fixed";
      setPin((p) => (p.mode === mode && p.left === r.left && p.width === r.width ? p : { mode, left: r.left, width: r.width }));
    };
    update();
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    return () => { window.removeEventListener("scroll", update); window.removeEventListener("resize", update); };
  }, [col]);
  return pin;
}

export default function CaseStudies() {
  const { language } = useLanguage();
  const isNL = language === "nl";
  const studies = getCaseStudies(language);
  const reduce = useReducedMotion();
  const [active, setActive] = useState(0);
  const storyRefs = useRef<(HTMLElement | null)[]>([]);
  const colRef = useRef<HTMLDivElement>(null);
  const pin = usePin(colRef);
  const pinStyle: React.CSSProperties =
    pin.mode === "fixed" ? { position: "fixed", top: 0, left: pin.left, width: pin.width }
    : pin.mode === "bottom" ? { position: "absolute", bottom: 0, left: 0, right: 0 }
    : { position: "absolute", top: 0, left: 0, right: 0 };

  // the story crossing the middle of the viewport drives the sticky frame
  useEffect(() => {
    const io = new IntersectionObserver(
      (entries) => entries.forEach((e) => {
        if (e.isIntersecting) setActive(storyRefs.current.indexOf(e.target as HTMLElement));
      }),
      { rootMargin: "-45% 0px -45% 0px" },
    );
    storyRefs.current.forEach((el) => el && io.observe(el));
    return () => io.disconnect();
  }, []);

  const goTo = (i: number) => storyRefs.current[i]?.scrollIntoView({ behavior: reduce ? "auto" : "smooth", block: "center" });
  const reveal = (delay = 0) => reduce ? {} : {
    initial: { opacity: 0, y: 16 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true },
    transition: { duration: 0.5, delay, ease: EASE },
  };

  const current = studies[active] ?? studies[0];
  const ActivePreview = current.Preview;

  return (
    <MotionConfig reducedMotion="user">
      <section id="case-studies" aria-labelledby="case-studies-title" className="bg-white py-20 sm:py-28 md:py-32">
        <div className="container mx-auto max-w-6xl px-6">
          <div className="mx-auto mb-14 max-w-2xl text-center sm:mb-16 lg:mb-4">
            <motion.p {...reveal()} className="mb-4 text-sm font-medium text-primary">
              {isNL ? "Klantresultaten" : "Client results"}
            </motion.p>
            <motion.h2 {...reveal(0.05)} id="case-studies-title" className="mb-5 text-3xl font-semibold tracking-tight text-zinc-900 sm:text-4xl md:text-5xl">
              {isNL ? "Van idee tot lancering" : "From idea to launch"}
            </motion.h2>
            <motion.p {...reveal(0.1)} className="text-lg text-zinc-500">
              {isNL
                ? "Bekijk hoe we AI-oplossingen bouwen die echt werken, van concept tot product."
                : "See how we build AI solutions that actually work, from concept to product."}
            </motion.p>
          </div>

          <div className="lg:grid lg:grid-cols-[minmax(0,1.05fr)_minmax(0,1fr)] lg:gap-16 xl:gap-20">
            {/* desktop: sticky frame */}
            <div ref={colRef} className="relative hidden lg:block">
              <div className="flex h-screen flex-col justify-center py-24" style={pinStyle}>
                <nav aria-label={isNL ? "Klantcases" : "Client cases"} className="mb-5 grid grid-cols-3 gap-3">
                  {studies.map((s, i) => (
                    <button
                      key={s.name}
                      type="button"
                      onClick={() => goTo(i)}
                      aria-current={i === active ? "step" : undefined}
                      className={`group rounded-sm pb-1 text-left ${FOCUS}`}
                    >
                      <span className="block h-[2px] overflow-hidden rounded-full bg-[rgba(23,23,28,0.07)]">
                        <span
                          className="block h-full origin-left rounded-full bg-primary transition-transform duration-500 ease-out motion-reduce:transition-none"
                          style={{ transform: `scaleX(${i <= active ? 1 : 0})` }}
                        />
                      </span>
                      <span className={`mt-2 block text-sm font-medium transition-colors duration-300 ${i === active ? "text-zinc-900" : "text-zinc-400 group-hover:text-zinc-600"}`}>
                        {s.name}
                      </span>
                    </button>
                  ))}
                </nav>
                <div className="mt-2 grid min-h-[440px] items-center">
                    <AnimatePresence initial={false}>
                      <motion.div
                        key={current.name}
                        className="col-start-1 row-start-1"
                        initial={{ opacity: 0, scale: 0.97, filter: "blur(6px)" }}
                        animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
                        exit={{ opacity: 0, scale: 1.02, filter: "blur(6px)" }}
                        transition={{ duration: reduce ? 0 : 0.45, ease: EASE }}
                      >
                        <ActivePreview language={language} />
                      </motion.div>
                    </AnimatePresence>
                </div>
              </div>
            </div>

            <div>
              {studies.map((study, i) => (
                <Story key={study.name} study={study} index={i} language={language} setRef={(el) => { storyRefs.current[i] = el; }} />
              ))}
            </div>
          </div>

          <motion.div {...reveal()} className={`mt-16 border-t ${HAIRLINE} pt-14 text-center lg:mt-8`}>
            <p className="mb-6 text-zinc-500">{isNL ? "Wil jij ook zo'n resultaat?" : "Want results like these?"}</p>
            <Button
              size="lg"
              className={`rounded-xl bg-zinc-900 px-8 py-6 text-base font-semibold text-white hover:bg-zinc-800 ${FOCUS}`}
              onClick={() => scrollToSection("ready-to-start")}
            >
              {isNL ? "Plan gratis intake" : "Book free intake"}
            </Button>
          </motion.div>
        </div>
      </section>
    </MotionConfig>
  );
}
