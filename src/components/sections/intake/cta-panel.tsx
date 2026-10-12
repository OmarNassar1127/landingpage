"use client";

import React, { useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { ArrowRight, Check, ChevronRight, Mail, MessageCircle, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";

const FOCUS = "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background";

export default function CtaPanel({ isNL }: { isNL: boolean }) {
  const [showContact, setShowContact] = useState(false);
  const reduce = useReducedMotion();

  const checks = [
    isNL ? "Binnen 4u reactie" : "Response within 4h",
    isNL ? "18 bedrijven geholpen" : "18 companies helped",
    isNL ? "Geld-terug garantie" : "Money-back guarantee",
  ];

  const contacts = [
    { href: "tel:+31687838713", icon: Phone, label: "+31 6 8783 8713" },
    { href: "mailto:info@virelio.nl", icon: Mail, label: "info@virelio.nl" },
    { href: "https://wa.me/31687838713", icon: MessageCircle, label: "WhatsApp", external: true },
  ];

  return (
    <motion.div
      id="ready-to-start"
      className="relative overflow-hidden rounded-3xl border border-black/[0.07] bg-[#fbfbfe] px-5 py-12 text-center shadow-[0_1px_2px_rgba(23,23,28,0.04),0_30px_60px_-40px_rgba(70,55,210,0.35)] sm:px-10 sm:py-16 md:py-20 dark:border-white/10 dark:bg-background"
      initial={reduce ? false : { opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
    >
      {/* grid texture, fading out toward the edges */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
        style={{
          backgroundImage:
            "linear-gradient(rgba(70,55,210,0.06) 1px, transparent 1px), linear-gradient(90deg, rgba(70,55,210,0.06) 1px, transparent 1px)",
          backgroundSize: "28px 28px",
          maskImage: "radial-gradient(ellipse 70% 70% at 50% 40%, #000 30%, transparent 100%)",
          WebkitMaskImage: "radial-gradient(ellipse 70% 70% at 50% 40%, #000 30%, transparent 100%)",
        }}
      />

      <div className="relative">
        <h3 className="mb-3 text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
          {isNL ? "Klaar om te beginnen?" : "Ready to start?"}
        </h3>
        <p className="mb-8 text-lg text-muted-foreground sm:mb-10 sm:text-xl">
          {isNL ? "30 minuten. Gratis. Geen verplichtingen." : "30 minutes. Free. No commitments."}
        </p>

        <div className="mb-6 flex justify-center">
          <Button
            size="lg"
            asChild
            className={`group h-auto rounded-xl bg-primary px-7 py-4 text-base font-semibold text-primary-foreground shadow-[0_12px_28px_-12px_rgba(70,55,210,0.7)] transition-shadow duration-300 hover:bg-primary/90 hover:shadow-[0_16px_34px_-12px_rgba(70,55,210,0.8)] sm:px-10 sm:text-lg ${FOCUS}`}
          >
            <a href="https://calendly.com/omarnassar1127/30min" target="_blank" rel="noopener noreferrer" className="flex items-center justify-center gap-3">
              {isNL ? "Plan een gesprek" : "Schedule a call"}
              <ArrowRight className="h-5 w-5 transition-transform duration-200 group-hover:translate-x-0.5 motion-reduce:transition-none" />
            </a>
          </Button>
        </div>

        <ul className="mb-8 flex flex-wrap items-center justify-center gap-x-5 gap-y-2 text-sm text-muted-foreground">
          {checks.map((text) => (
            <li key={text} className="flex items-center gap-1.5">
              <Check className="h-3.5 w-3.5 text-primary" strokeWidth={2.75} aria-hidden="true" />
              <span className="tabular-nums">{text}</span>
            </li>
          ))}
        </ul>

        <div className="mx-auto max-w-sm">
          <button
            type="button"
            onClick={() => setShowContact((v) => !v)}
            aria-expanded={showContact}
            aria-controls="intake-contact"
            className={`mx-auto mb-3 flex items-center justify-center gap-1.5 rounded-md px-2 py-1 text-sm text-muted-foreground transition-colors hover:text-foreground ${FOCUS}`}
          >
            {isNL ? "Of neem direct contact op" : "Or contact directly"}
            <ChevronRight className={`h-4 w-4 transition-transform motion-reduce:transition-none ${showContact ? "rotate-90" : ""}`} aria-hidden="true" />
          </button>

          <AnimatePresence initial={false}>
            {showContact && (
              <motion.div
                id="intake-contact"
                initial={reduce ? false : { opacity: 0, y: -6 }}
                animate={{ opacity: 1, y: 0 }}
                exit={reduce ? { opacity: 0, transition: { duration: 0 } } : { opacity: 0, y: -6 }}
                transition={{ duration: 0.2 }}
                className="space-y-1 rounded-xl border border-black/[0.07] bg-white p-2 text-left dark:border-white/10 dark:bg-background"
              >
                {contacts.map(({ href, icon: Icon, label, external }) => (
                  <a
                    key={href}
                    href={href}
                    {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                    className={`flex items-center gap-3 rounded-lg p-3 transition-colors hover:bg-primary/[0.04] ${FOCUS}`}
                  >
                    <Icon className="h-4 w-4 flex-shrink-0 text-primary" aria-hidden="true" />
                    <span className="text-sm font-medium tabular-nums text-foreground">{label}</span>
                  </a>
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </motion.div>
  );
}
