"use client";

import React, { useEffect, useState } from "react";
import { motion, AnimatePresence, useAnimation } from "framer-motion";
import { Button } from "@/components/ui/button";
import { useInView } from "react-intersection-observer";
import {
  ArrowRight,
  Search,
  BarChart3,
  Code2,
  Rocket,
  Activity,
  Brain,
  CheckCheck,
  Image,
} from "lucide-react";
import { scrollToSection } from "@/lib/scroll-utils";
import { Icon } from "@/components/ui/icon";
import { useLanguage } from "@/lib/i18n/language-context";

interface ChatMessage {
  agent: string;
  icon: any;
  color: string;
  message: string;
  time: string;
  type?: "text" | "image" | "tasklist";
  tasks?: { assignee: string; task: string }[];
  replyTo?: string;
}

const getChatMessages = (language: string): ChatMessage[] => {
  const isNL = language === "nl";
  return [
    {
      agent: "Nova",
      icon: Brain,
      color: "bg-primary",
      message: isNL
        ? "Hé team, nieuw project! E-commerce klant wil klantenservice automatiseren. Hier is het plan:"
        : "Hey team, new project! E-commerce client wants to automate customer support. Here's the plan:",
      time: "09:01",
    },
    {
      agent: "Nova",
      icon: Brain,
      color: "bg-primary",
      message: isNL
        ? "Iedereen akkoord? Stuur updates naar mij, dan review ik en zetten we live 👇"
        : "Everyone agree? Send updates to me, I'll review and we push live 👇",
      time: "09:01",
      type: "tasklist",
      tasks: isNL
        ? [
            { assignee: "Scout", task: "Analyseer huidige helpdesk & veelgestelde vragen" },
            { assignee: "Pixel", task: "Bereken besparingspotentieel voor de klant" },
            { assignee: "Forge", task: "Bouw chatbot + koppeling met hun systeem" },
            { assignee: "Pulse", task: "Monitor eerste gesprekken & rapporteer" },
            { assignee: "Bolt", task: "Zet live zodra alles is goedgekeurd" },
          ]
        : [
            { assignee: "Scout", task: "Analyze current helpdesk & common questions" },
            { assignee: "Pixel", task: "Calculate savings potential for the client" },
            { assignee: "Forge", task: "Build chatbot + connect to their system" },
            { assignee: "Pulse", task: "Monitor first conversations & report back" },
            { assignee: "Bolt", task: "Push live once everything is approved" },
          ],
    },
    {
      agent: "Scout",
      icon: Search,
      color: "bg-blue-500",
      message: isNL
        ? "Done! 73% van de vragen zijn herhaalbaar. Dit wordt makkelijk te automatiseren 👀"
        : "Done! 73% of tickets are repetitive. This will be easy to automate 👀",
      time: "09:03",
      replyTo: "Nova",
    },
    {
      agent: "Pixel",
      icon: BarChart3,
      color: "bg-violet-500",
      message: isNL
        ? "Mooi Scout. Op basis van die data schat ik €4.200/maand besparing voor de klant 📊"
        : "Nice Scout. Based on that data I'm estimating €4,200/month savings for the client 📊",
      time: "09:05",
      replyTo: "Scout",
    },
    {
      agent: "Forge",
      icon: Code2,
      color: "bg-amber-500",
      message: isNL
        ? "Chatbot is gebouwd en gekoppeld aan hun systeem. Heb ook een fallback naar een medewerker ingebouwd voor complexe vragen 🔧"
        : "Chatbot is built and connected to their system. Added a human handoff for complex questions too 🔧",
      time: "09:12",
    },
    {
      agent: "Pulse",
      icon: Activity,
      color: "bg-emerald-500",
      message: isNL
        ? "Ik hou het in de gaten — eerste 50 gesprekken: 96% klanttevredenheid. Nul crashes ✓"
        : "Keeping an eye on it — first 50 conversations: 96% satisfaction rate. Zero crashes ✓",
      time: "09:18",
    },
    {
      agent: "Bolt",
      icon: Rocket,
      color: "bg-rose-500",
      message: isNL
        ? "Staat live! Klant heeft toegang. Hier een preview van het dashboard 👇"
        : "It's live! Client has access. Here's a preview of the dashboard 👇",
      time: "09:20",
    },
    {
      agent: "Bolt",
      icon: Rocket,
      color: "bg-rose-500",
      message: "",
      time: "09:20",
      type: "image",
    },
    {
      agent: "Nova",
      icon: Brain,
      color: "bg-primary",
      message: isNL
        ? "Strak werk team! Van aanvraag tot live in 19 minuten. Klant is blij 💪"
        : "Great work team! From request to live in 19 minutes. Client is happy 💪",
      time: "09:21",
    },
  ];
};

// Fake dashboard screenshot component
function DashboardPreview({ language }: { language: string }) {
  const isNL = language === "nl";
  return (
    <div className="rounded-xl border border-border/40 bg-gradient-to-br from-muted/80 to-muted/40 overflow-hidden w-full max-w-[280px]">
      {/* Mini browser bar */}
      <div className="flex items-center gap-1.5 px-3 py-1.5 border-b border-border/30 bg-muted/60">
        <div className="flex gap-1">
          <div className="w-1.5 h-1.5 rounded-full bg-red-400/60" />
          <div className="w-1.5 h-1.5 rounded-full bg-yellow-400/60" />
          <div className="w-1.5 h-1.5 rounded-full bg-green-400/60" />
        </div>
        <div className="flex-1 mx-2 px-2 py-0.5 rounded bg-background/50 text-[8px] text-muted-foreground/50 font-mono">
          dashboard.klant.nl
        </div>
      </div>
      {/* Dashboard content */}
      <div className="p-3 space-y-2">
        <div className="flex items-center justify-between">
          <div className="text-[9px] font-semibold text-foreground/70">
            {isNL ? "Klantenservice AI" : "Customer Service AI"}
          </div>
          <div className="flex items-center gap-1">
            <div className="w-1 h-1 rounded-full bg-emerald-400" />
            <span className="text-[8px] text-emerald-500/70">Live</span>
          </div>
        </div>
        {/* Stats row */}
        <div className="grid grid-cols-3 gap-1.5">
          {[
            { label: isNL ? "Gesprekken" : "Chats", val: "1,247" },
            { label: isNL ? "Tevredenheid" : "Satisfaction", val: "96%" },
            { label: isNL ? "Besparing" : "Saved", val: "€4.2k" },
          ].map((s, i) => (
            <div
              key={i}
              className="rounded-md bg-background/60 p-1.5 text-center"
            >
              <div className="text-[10px] font-bold text-foreground/80">
                {s.val}
              </div>
              <div className="text-[7px] text-muted-foreground/60">
                {s.label}
              </div>
            </div>
          ))}
        </div>
        {/* Mini chart */}
        <div className="rounded-md bg-background/60 p-2">
          <div className="flex items-end gap-[3px] h-8 justify-center">
            {[40, 55, 45, 70, 65, 80, 75, 90, 85, 95, 88, 92].map((h, i) => (
              <motion.div
                key={i}
                className="w-[6px] rounded-sm bg-primary/60"
                initial={{ height: 0 }}
                animate={{ height: `${h}%` }}
                transition={{ delay: 0.5 + i * 0.05, duration: 0.4 }}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function AgentChat({ language }: { language: string }) {
  const messages = getChatMessages(language);
  const [visibleCount, setVisibleCount] = useState(0);
  const [typing, setTyping] = useState<string | null>(null);
  const [userScrolled, setUserScrolled] = useState(false);
  const [showNewMsg, setShowNewMsg] = useState(false);
  const scrollRef = React.useRef<HTMLDivElement>(null);
  const isNL = language === "nl";

  // Detect if user has scrolled up
  const handleScroll = () => {
    if (!scrollRef.current) return;
    const { scrollTop, scrollHeight, clientHeight } = scrollRef.current;
    const isAtBottom = scrollHeight - scrollTop - clientHeight < 40;
    setUserScrolled(!isAtBottom);
    if (isAtBottom) setShowNewMsg(false);
  };

  // Auto-scroll only if user hasn't scrolled up
  useEffect(() => {
    if (scrollRef.current && !userScrolled) {
      scrollRef.current.scrollTo({
        top: scrollRef.current.scrollHeight,
        behavior: "smooth",
      });
    } else if (userScrolled && visibleCount > 0) {
      setShowNewMsg(true);
    }
  }, [visibleCount, typing, userScrolled]);

  const scrollToBottom = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollTo({
        top: scrollRef.current.scrollHeight,
        behavior: "smooth",
      });
      setUserScrolled(false);
      setShowNewMsg(false);
    }
  };

  // Initial message with typing delay
  useEffect(() => {
    const initial = setTimeout(() => {
      setTyping(messages[0].agent);
      setTimeout(() => {
        setTyping(null);
        setVisibleCount(1);
      }, 2000);
    }, 800);
    return () => clearTimeout(initial);
  }, []);

  // Subsequent messages
  useEffect(() => {
    if (visibleCount === 0 || visibleCount >= messages.length) {
      if (visibleCount >= messages.length) {
        const reset = setTimeout(() => {
          setVisibleCount(0);
          setTyping(null);
          setTimeout(() => {
            setTyping(messages[0].agent);
            setTimeout(() => {
              setTyping(null);
              setVisibleCount(1);
            }, 2000);
          }, 600);
        }, 30000);
        return () => clearTimeout(reset);
      }
      return;
    }

    const nextMsg = messages[visibleCount];
    // Longer pause before typing starts (feels like reading previous message)
    const pauseBeforeTyping = 1200 + Math.random() * 800;
    // Longer typing duration for longer messages
    const typingDuration = nextMsg.type === "image"
      ? 800
      : Math.min(2500, 1200 + nextMsg.message.length * 8);

    const typingTimer = setTimeout(() => {
      setTyping(nextMsg.agent);
      const showTimer = setTimeout(() => {
        setTyping(null);
        setVisibleCount((v) => v + 1);
      }, typingDuration);
      return () => clearTimeout(showTimer);
    }, pauseBeforeTyping);
    return () => clearTimeout(typingTimer);
  }, [visibleCount, messages.length]);

  return (
    <div className="relative w-full max-w-[480px] mx-auto px-1 sm:px-0">
      <div className="rounded-2xl border border-border/60 bg-background overflow-hidden shadow-2xl shadow-black/10 h-[480px] sm:h-[500px] flex flex-col">
        {/* Chat header */}
        <div className="flex items-center gap-3 px-5 py-4 border-b border-border/50 bg-muted/30 shrink-0">
          <div className="relative">
            <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center">
              <Brain className="w-5 h-5 text-primary-foreground" />
            </div>
            <div className="absolute -bottom-0.5 -right-0.5 w-3.5 h-3.5 rounded-full bg-emerald-400 border-2 border-background" />
          </div>
          <div className="flex-1 min-w-0">
            <h4 className="text-sm font-semibold text-foreground">
              Virelio Agents
            </h4>
            {/* Show typing status or member list */}
            <AnimatePresence mode="wait">
              {typing ? (
                <motion.p
                  key="typing"
                  initial={{ opacity: 0, y: 2 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -2 }}
                  className="text-xs text-primary"
                >
                  {typing} {isNL ? "is aan het typen..." : "is typing..."}
                </motion.p>
              ) : (
                <motion.p
                  key="members"
                  initial={{ opacity: 0, y: 2 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -2 }}
                  className="text-xs text-muted-foreground"
                >
                  Nova, Scout, Pixel, Forge, Pulse, Bolt
                </motion.p>
              )}
            </AnimatePresence>
          </div>
          <div className="flex -space-x-2">
            {[
              { icon: Search, color: "bg-blue-500" },
              { icon: BarChart3, color: "bg-violet-500" },
              { icon: Code2, color: "bg-amber-500" },
              { icon: Activity, color: "bg-emerald-500" },
              { icon: Rocket, color: "bg-rose-500" },
            ].map((a, i) => (
              <div
                key={i}
                className={`w-7 h-7 rounded-full ${a.color} border-2 border-background flex items-center justify-center`}
              >
                <a.icon className="w-3 h-3 text-white" />
              </div>
            ))}
          </div>
        </div>

        {/* Chat body — fills remaining space */}
        <div
          ref={scrollRef}
          onScroll={handleScroll}
          className="relative p-4 flex-1 min-h-0 space-y-3 overflow-y-auto chat-scrollbar"
        >
          <AnimatePresence mode="popLayout">
            {messages.slice(0, visibleCount).map((msg, i) => {
              const MsgIcon = msg.icon;
              return (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 16, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{
                    duration: 0.3,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                  className="flex items-start gap-2.5"
                >
                  <div
                    className={`w-8 h-8 rounded-full ${msg.color} flex items-center justify-center shrink-0 mt-0.5`}
                  >
                    <MsgIcon className="w-3.5 h-3.5 text-white" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-baseline gap-2 mb-0.5">
                      <span className="text-xs font-semibold text-foreground">
                        {msg.agent}
                      </span>
                      <span className="text-[10px] text-muted-foreground">
                        {msg.time}
                      </span>
                    </div>

                    {/* Reply indicator */}
                    {msg.replyTo && (
                      <div className="flex items-center gap-1 mb-1 pl-2 border-l-2 border-primary/20">
                        <span className="text-[10px] text-muted-foreground/60">
                          {isNL ? "Antwoord op" : "Reply to"}{" "}
                          <span className="font-medium text-muted-foreground/80">
                            {msg.replyTo}
                          </span>
                        </span>
                      </div>
                    )}

                    {msg.type === "image" ? (
                      <DashboardPreview language={language} />
                    ) : msg.type === "tasklist" ? (
                      <div className="bg-muted/50 rounded-2xl rounded-tl-sm px-3.5 py-2.5 max-w-[calc(100%-20px)]">
                        <p className="text-[13px] text-foreground/80 leading-relaxed mb-2">
                          {msg.message}
                        </p>
                        <div className="space-y-1.5">
                          {msg.tasks?.map((t, ti) => (
                            <motion.div
                              key={ti}
                              initial={{ opacity: 0, x: -6 }}
                              animate={{ opacity: 1, x: 0 }}
                              transition={{ delay: ti * 0.1 }}
                              className="flex items-start gap-2 text-[12px]"
                            >
                              <div className="w-4 h-4 rounded border border-primary/30 bg-primary/5 flex items-center justify-center shrink-0 mt-0.5">
                                <span className="text-[8px] text-primary font-bold">{ti + 1}</span>
                              </div>
                              <div>
                                <span className="font-semibold text-primary/80">{t.assignee}</span>
                                <span className="text-foreground/60"> — {t.task}</span>
                              </div>
                            </motion.div>
                          ))}
                        </div>
                      </div>
                    ) : (
                      <div className="bg-muted/50 rounded-2xl rounded-tl-sm px-3.5 py-2.5 inline-block max-w-[calc(100%-20px)]">
                        <p className="text-[13px] text-foreground/80 leading-relaxed">
                          {msg.message}
                        </p>
                      </div>
                    )}

                    {/* Read receipt on last message */}
                    {i === visibleCount - 1 && (
                      <div className="flex items-center gap-0.5 mt-0.5 justify-end mr-2">
                        <CheckCheck className="w-3.5 h-3.5 text-primary/40" />
                      </div>
                    )}
                  </div>
                </motion.div>
              );
            })}
          </AnimatePresence>

          {/* Typing indicator — WhatsApp style */}
          <AnimatePresence>
            {typing && (
              <motion.div
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -4 }}
                transition={{ duration: 0.2 }}
                className="flex items-center gap-2.5"
              >
                <div className="w-8 h-8 rounded-full bg-muted flex items-center justify-center shrink-0">
                  {(() => {
                    const found = messages.find((m) => m.agent === typing);
                    const TypingIcon = found?.icon || Brain;
                    return (
                      <TypingIcon className="w-3.5 h-3.5 text-muted-foreground" />
                    );
                  })()}
                </div>
                <div className="bg-muted/50 rounded-2xl rounded-tl-sm px-4 py-3 inline-flex items-center gap-1.5">
                  <motion.div
                    className="w-2 h-2 rounded-full bg-muted-foreground/40"
                    animate={{ y: [0, -4, 0] }}
                    transition={{
                      duration: 0.6,
                      repeat: Infinity,
                      delay: 0,
                      ease: "easeInOut",
                    }}
                  />
                  <motion.div
                    className="w-2 h-2 rounded-full bg-muted-foreground/40"
                    animate={{ y: [0, -4, 0] }}
                    transition={{
                      duration: 0.6,
                      repeat: Infinity,
                      delay: 0.15,
                      ease: "easeInOut",
                    }}
                  />
                  <motion.div
                    className="w-2 h-2 rounded-full bg-muted-foreground/40"
                    animate={{ y: [0, -4, 0] }}
                    transition={{
                      duration: 0.6,
                      repeat: Infinity,
                      delay: 0.3,
                      ease: "easeInOut",
                    }}
                  />
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* New message indicator when user scrolled up */}
        <AnimatePresence>
          {showNewMsg && (
            <motion.button
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 10 }}
              onClick={scrollToBottom}
              className="absolute bottom-16 left-1/2 -translate-x-1/2 z-20 px-3 py-1.5 rounded-full bg-primary text-primary-foreground text-[11px] font-medium shadow-lg flex items-center gap-1.5 hover:bg-primary/90 transition-colors"
            >
              <ArrowRight className="w-3 h-3 rotate-90" />
              {isNL ? "Nieuw bericht" : "New message"}
            </motion.button>
          )}
        </AnimatePresence>

        {/* Chat footer */}
        <div className="px-4 py-3 border-t border-border/50 bg-muted/20 flex items-center gap-2 shrink-0">
          <div className="flex-1 px-4 py-2.5 rounded-xl bg-muted/40 border border-border/30">
            <span className="text-xs text-muted-foreground/50">
              {isNL
                ? "Jouw agents zijn aan het werk..."
                : "Your agents are working..."}
            </span>
          </div>
          <div className="flex items-center gap-1 text-muted-foreground/30">
            <CheckCheck className="w-4 h-4 text-primary/40" />
          </div>
        </div>
      </div>
    </div>
  );
}

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
                ? "AI agents die samenwerken, delegeren en uitvoeren. Van kennisbank tot automatisering — live in 2 weken."
                : "AI agents that collaborate, delegate and execute. From knowledge base to automation — live in 2 weeks."}
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

          {/* Right: Agent Chat */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.6 }}
          >
            <AgentChat language={language} />
          </motion.div>
        </div>
      </div>
    </section>
  );
}

function HeroLoading() {
  return (
    <section className="relative min-h-screen flex items-center bg-background">
      <div className="container px-4 sm:px-6 max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-6 text-center lg:text-left">
            <div className="h-8 w-40 rounded-full bg-muted animate-pulse mx-auto lg:mx-0" />
            <div className="h-16 w-full max-w-md rounded-lg bg-muted animate-pulse mx-auto lg:mx-0" />
            <div className="h-6 w-80 max-w-full rounded-lg bg-muted/60 animate-pulse mx-auto lg:mx-0" />
          </div>
          <div className="h-[480px] sm:h-[500px] max-w-[480px] mx-auto bg-muted/20 rounded-2xl animate-pulse" />
        </div>
      </div>
    </section>
  );
}

export default function Hero() {
  const [isClient, setIsClient] = useState(false);
  useEffect(() => {
    setIsClient(true);
  }, []);
  return isClient ? <HeroContent /> : <HeroLoading />;
}
