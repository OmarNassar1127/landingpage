"use client";

import React from "react";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { useLanguage } from "@/lib/i18n/language-context";
import HeroProblems from "@/components/sections/hero-problems";
import { PROBLEM_MAILTO, TEST_MAILTO } from "@/lib/test-offer";

const COPY = {
  nl: {
    h1a: "Vertel wat er vastloopt.",
    h1b: "Wij bouwen het.",
    sub: "Wij bouwen AI die het herhaalwerk overneemt, aangesloten op de systemen die je al gebruikt. Jij keurt goed.",
    cta: "Vertel je probleem",
    test: "Of probeer het 2 weken in je eigen inbox (€250, geld terug)",
    note: "Vaste prijs binnen 48 uur. Omar Nassar, regio Amsterdam.",
  },
  en: {
    h1a: "Tell us what's stuck.",
    h1b: "We build the fix.",
    sub: "We build AI that takes over the repetitive work, wired into the tools you already use. You approve.",
    cta: "Tell us your problem",
    test: "Or try it for 2 weeks in your own inbox (€250, money back)",
    note: "Fixed price within 48 hours. Omar Nassar, Amsterdam area.",
  },
};

export default function Hero() {
  const { language } = useLanguage();
  const lang = language === "en" ? "en" : "nl";
  const c = COPY[lang];

  return (
    <section id="hero" className="relative overflow-hidden bg-white">
      {/* Hero wash (globals.css): warm light from the top, a breath of indigo, white at the seam. */}
      <div aria-hidden className="wash-hero pointer-events-none absolute inset-0" />

      <div className="relative mx-auto grid max-w-6xl items-center gap-6 px-5 pb-16 pt-[4.5rem] sm:gap-10 sm:px-8 sm:pt-32 lg:min-h-[100svh] lg:grid-cols-[1.05fr_1fr] lg:gap-16 lg:pb-24 lg:pt-28">
        <div className="text-center lg:text-left">
          <h1 className="mx-auto max-w-[16ch] text-[2rem] font-semibold leading-[1.06] tracking-[-0.032em] text-ink sm:text-[3.25rem] lg:mx-0 lg:text-[3.6rem] [text-wrap:balance]">
            <span className="block">{c.h1a}</span>
            <span className="block text-ink-soft/60">{c.h1b}</span>
          </h1>

          <p className="mx-auto mt-3 max-w-[34rem] text-[15px] sm:mt-5 leading-relaxed text-ink-soft sm:text-[19px] lg:mx-0">
            {c.sub}
          </p>

          <div className="mt-5 flex flex-col items-center gap-2 sm:mt-8 sm:gap-3 sm:flex-row sm:justify-center lg:justify-start">
            <a
              href={PROBLEM_MAILTO[lang]}
              className="group inline-flex w-full items-center justify-center gap-2 rounded-full bg-brand px-7 py-4 text-[16px] font-semibold text-white shadow-[0_8px_24px_-10px_rgb(var(--brand)/0.5)] transition-[transform,background-color] duration-150 hover:bg-brand/90 active:scale-[0.97] sm:w-auto"
            >
              {c.cta}
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
            </a>
            <a
              href={TEST_MAILTO[lang]}
              className="inline-flex items-center gap-1 px-2 py-2 text-[15px] font-medium text-brand hover:text-brand/80"
            >
              {c.test}
              <span aria-hidden>›</span>
            </a>
          </div>

          <p className="mx-auto mt-3 max-w-[30rem] text-[12px] sm:mt-5 sm:text-[13px] leading-relaxed text-ink-soft lg:mx-0">{c.note}</p>
        </div>

        <motion.div
          className="min-w-0"
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ type: "spring", bounce: 0, duration: 0.9, delay: 0.15 }}
        >
          <HeroProblems lang={lang} />
        </motion.div>
      </div>
    </section>
  );
}
