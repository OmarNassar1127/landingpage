"use client";

import React, { useEffect } from "react";
import { motion, useAnimation } from "framer-motion";
import { Button } from "@/components/ui/button";
import { useInView } from "react-intersection-observer";
import { ArrowRight, Brain } from "lucide-react";
import { scrollToSection } from "@/lib/scroll-utils";
import { Icon } from "@/components/ui/icon";
import { useLanguage } from "@/lib/i18n/language-context";
import AgentFloor from "@/components/sections/agent-floor";

function HeroContent() {
  const { language } = useLanguage();
  const [ref, inView] = useInView({ threshold: 0.1 });
  const controls = useAnimation();

  useEffect(() => {
    if (inView) controls.start("visible");
  }, [inView, controls]);

  const container = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1, delayChildren: 0.05 },
    },
  };
  const item = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] },
    },
  };

  return (
    <section
      id="hero"
      ref={ref}
      className="relative min-h-screen flex items-center bg-background overflow-hidden"
    >
      <div
        className="absolute top-[-10%] right-[-5%] w-[45vw] h-[45vh] rounded-full opacity-[0.05] dark:opacity-[0.03] pointer-events-none"
        style={{
          background:
            "radial-gradient(circle, hsl(var(--primary)) 0%, transparent 70%)",
          filter: "blur(100px)",
        }}
      />

      <div className="container relative z-10 px-4 sm:px-6 max-w-7xl mx-auto py-24 sm:py-28 lg:py-32">
        <div className="grid lg:grid-cols-2 gap-16 lg:gap-12 items-center">
          {/* Left: Copy */}
          <motion.div
            variants={container}
            initial="hidden"
            animate={controls}
            className="text-center lg:text-left"
          >
            <motion.div
              variants={item}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/5 border border-primary/10 mb-8"
            >
              <Brain className="w-4 h-4 text-primary" />
              <span className="text-xs sm:text-sm font-medium text-primary">
                {language === "nl"
                  ? "AI-team op aanvraag"
                  : "AI team on demand"}
              </span>
            </motion.div>

            <motion.h1
              variants={item}
              className="text-4xl sm:text-5xl md:text-6xl xl:text-7xl font-black tracking-tight leading-[0.95] mb-6"
            >
              {language === "nl" ? (
                <>
                  Wij bouwen jouw
                  <br />
                  <span className="text-primary">digitale team</span>
                </>
              ) : (
                <>
                  We build your
                  <br />
                  <span className="text-primary">digital team</span>
                </>
              )}
            </motion.h1>

            <motion.p
              variants={item}
              className="text-lg sm:text-xl text-muted-foreground leading-relaxed mb-10 max-w-lg mx-auto lg:mx-0"
            >
              {language === "nl"
                ? "AI agents die samenwerken, delegeren en uitvoeren. Van kennisbank tot automatisering, live in 1 week."
                : "AI agents that collaborate, delegate and execute. From knowledge base to automation, live in 1 week."}
            </motion.p>

            <motion.div
              variants={item}
              className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start mb-12"
            >
              <Button
                size="lg"
                className="bg-foreground text-background hover:bg-foreground/90 shadow-lg px-8 sm:px-10 py-6 text-base font-semibold group rounded-xl"
                asChild
              >
                <a
                  href="#ready-to-start"
                  onClick={(e) => {
                    e.preventDefault();
                    scrollToSection("ready-to-start");
                  }}
                  className="flex items-center justify-center gap-2"
                >
                  {language === "nl"
                    ? "Plan gratis intake"
                    : "Book free intake"}
                  <Icon
                    icon={ArrowRight}
                    className="h-4 w-4 group-hover:translate-x-1 transition-transform"
                  />
                </a>
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="border-border hover:border-primary/30 px-8 sm:px-10 py-3 sm:py-6 text-base rounded-xl"
                asChild
              >
                <a
                  href="#services"
                  onClick={(e) => {
                    e.preventDefault();
                    scrollToSection("services");
                  }}
                  className="flex items-center justify-center"
                >
                  {language === "nl" ? "Bekijk agents" : "View agents"}
                </a>
              </Button>
            </motion.div>

            <motion.div
              variants={item}
              className="flex items-center justify-center lg:justify-start gap-10 sm:gap-14"
            >
              {[
                {
                  value: "<4h",
                  label: language === "nl" ? "reactietijd" : "response",
                },
                {
                  value: "18+",
                  label: language === "nl" ? "bedrijven" : "companies",
                },
                {
                  value: "100%",
                  label: language === "nl" ? "garantie" : "guarantee",
                },
              ].map((stat, idx) => (
                <div key={idx} className="text-center lg:text-left">
                  <div className="text-2xl sm:text-3xl font-black text-foreground">
                    {stat.value}
                  </div>
                  <div className="text-[11px] text-muted-foreground uppercase tracking-wider mt-0.5">
                    {stat.label}
                  </div>
                </div>
              ))}
            </motion.div>
          </motion.div>

          {/* Right: the agent team at work */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.6 }}
          >
            <AgentFloor language={language} />
          </motion.div>
        </div>
      </div>
    </section>
  );
}

// Rendered on the server as well, so the headline is in the static HTML.
export default function Hero() {
  return <HeroContent />;
}
