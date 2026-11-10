"use client";

import React from "react";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { useLanguage } from "@/lib/i18n/language-context";
import HeroMailCard from "@/components/sections/hero-mail-card";
import { TEST_MAILTO } from "@/lib/test-offer";

const EXAMPLE_HREF = "/blog/klantvragen-automatisch-beantwoorden";

const COPY = {
  nl: {
    h1a: "Elke klantmail al beantwoord.",
    h1b: "Jij keurt alleen goed.",
    sub: "Stuur 20 echte klantmails. Binnen twee werkdagen krijg je 20 concept-antwoorden terug, met een telling van hoeveel je zo had kunnen versturen.",
    cta: "Start de test voor €250",
    example: "Bekijk een voorbeeld",
    note: "Verrekend met de setup. Geen toegang tot je inbox nodig. Omar Nassar, regio Amsterdam.",
  },
  en: {
    h1a: "Every customer email, already answered.",
    h1b: "You just approve.",
    sub: "Send 20 real customer emails. Within two working days you get 20 draft replies back, with a count of how many you could have sent as they are.",
    cta: "Start the test for €250",
    example: "See an example",
    note: "Credited against the setup. No access to your inbox needed. Omar Nassar, Amsterdam area.",
  },
};

export default function Hero() {
  const { language } = useLanguage();
  const lang = language === "en" ? "en" : "nl";
  const c = COPY[lang];

  return (
    <section id="hero" className="relative overflow-hidden bg-white">
      {/* Warm light from the top, a breath of the indigo accent behind the card, white at the seam. */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(60% 50% at 15% 0%, rgba(255,214,184,0.45) 0%, rgba(255,214,184,0) 70%), radial-gradient(45% 45% at 80% 55%, rgba(129,140,248,0.16) 0%, rgba(129,140,248,0) 70%), linear-gradient(180deg, #FFFBF7 0%, #FFFFFF 100%)",
        }}
      />

      <div className="relative mx-auto grid max-w-6xl items-center gap-10 px-5 pb-20 pt-24 sm:px-8 sm:pt-32 lg:min-h-[100svh] lg:grid-cols-[1.05fr_1fr] lg:gap-16 lg:pb-24 lg:pt-28">
        <div className="text-center lg:text-left">
          <h1 className="mx-auto max-w-[16ch] text-[2.25rem] font-semibold leading-[1.06] tracking-[-0.032em] text-zinc-900 sm:text-[3.25rem] lg:mx-0 lg:text-[3.6rem] [text-wrap:balance]">
            <span className="block">{c.h1a}</span>
            <span className="block text-zinc-400">{c.h1b}</span>
          </h1>

          <p className="mx-auto mt-5 max-w-[34rem] text-[16px] leading-relaxed text-zinc-600 sm:text-[19px] lg:mx-0">
            {c.sub}
          </p>

          <div className="mt-8 flex flex-col items-center gap-3 sm:flex-row sm:justify-center lg:justify-start">
            <a
              href={TEST_MAILTO[lang]}
              className="group inline-flex w-full items-center justify-center gap-2 rounded-full bg-zinc-900 px-7 py-4 text-[16px] font-semibold text-white shadow-[0_8px_24px_-10px_rgba(24,24,27,0.5)] transition-[transform,background-color] duration-150 hover:bg-zinc-800 active:scale-[0.97] sm:w-auto"
            >
              {c.cta}
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
            </a>
            <a
              href={EXAMPLE_HREF}
              className="inline-flex items-center gap-1 px-2 py-2 text-[16px] font-medium text-indigo-600 hover:text-indigo-700"
            >
              {c.example}
              <span aria-hidden>›</span>
            </a>
          </div>

          <p className="mx-auto mt-5 max-w-[30rem] text-[13px] leading-relaxed text-zinc-500 lg:mx-0">{c.note}</p>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ type: "spring", bounce: 0, duration: 0.9, delay: 0.15 }}
        >
          <HeroMailCard lang={lang} />
        </motion.div>
      </div>
    </section>
  );
}
