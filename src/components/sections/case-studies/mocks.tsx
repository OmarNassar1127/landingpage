"use client";

import React from "react";
import { motion } from "framer-motion";
import { Bot, BarChart3, Calendar, Eye, Mail, PenTool, Shield, Sparkles, Target } from "lucide-react";

/**
 * Mock product screens shown in the case-studies browser frame. Bars grow with
 * scaleY (transform only), so MotionConfig reducedMotion="user" keeps them static.
 */

type Props = { language: string };

function Bubble({ me, time, children }: { me?: boolean; time: string; children: React.ReactNode }) {
  return (
    <div className={`flex ${me ? "justify-end" : "justify-start"}`}>
      <div className={`max-w-[78%] rounded-2xl px-3 py-2 ${me ? "rounded-tr-sm bg-emerald-500/15" : "rounded-tl-sm bg-zinc-100"}`}>
        {!me && (
          <div className="mb-1 flex items-center gap-1">
            <Bot className="h-2.5 w-2.5 text-emerald-600" aria-hidden="true" />
            <span className="text-[9px] font-semibold text-emerald-600">ZapBot</span>
          </div>
        )}
        <p className="text-[11px] leading-snug text-zinc-700">{children}</p>
        <span className="mt-0.5 block text-right text-[8px] tabular-nums text-zinc-400">{time}</span>
      </div>
    </div>
  );
}

export function ZapBotPreview({ language }: Props) {
  const nl = language === "nl";
  return (
    <div className="space-y-2">
      <Bubble me time="14:32">{nl ? "Hoi, ik wil graag een afspraak inplannen voor volgende week" : "Hi, I'd like to schedule an appointment for next week"}</Bubble>
      <Bubble time="14:32">
        {nl
          ? "Natuurlijk! Ik heb deze slots beschikbaar: Ma 10:00, Di 14:00, Wo 09:30. Welke past het beste?"
          : "Of course! I have these slots available: Mon 10:00, Tue 14:00, Wed 09:30. Which works best?"}
      </Bubble>
      <Bubble me time="14:33">{nl ? "Dinsdag 14:00 graag!" : "Tuesday 14:00 please!"}</Bubble>
      <Bubble time="14:33">
        {nl
          ? "Gepland! Je ontvangt een bevestiging per e-mail. Nog vragen? Ik sta 24/7 klaar."
          : "Booked! You'll receive a confirmation by email. Any questions? I'm here 24/7."}
      </Bubble>
    </div>
  );
}

function Bars({ values, className, delay }: { values: number[]; className: (h: number) => string; delay: number }) {
  return (
    <>
      {values.map((h, i) => (
        <div key={i} className="flex h-full flex-1 items-end">
          <motion.div
            className={`w-full origin-bottom rounded-sm ${className(h)}`}
            style={{ height: `${h}%` }}
            initial={{ scaleY: 0 }}
            whileInView={{ scaleY: 1 }}
            viewport={{ once: true }}
            transition={{ delay: delay + i * 0.04, duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
          />
        </div>
      ))}
    </>
  );
}

export function SlouchPreview({ language }: Props) {
  const nl = language === "nl";
  const stats = [
    { label: nl ? "Sessie" : "Session", value: "2u 14m" },
    { label: "Nudges", value: "3" },
    { label: "Score", value: "92%" },
  ];
  return (
    <div className="space-y-2.5">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="flex h-6 w-6 items-center justify-center rounded-full bg-emerald-500/15">
            <Eye className="h-3 w-3 text-emerald-600" aria-hidden="true" />
          </div>
          <div>
            <div className="text-[10px] font-semibold text-zinc-800">{nl ? "Houding: goed" : "Posture: good"}</div>
            <div className="text-[8px] text-emerald-600">{nl ? "Camera actief" : "Camera active"}</div>
          </div>
        </div>
        <div className="flex items-center gap-1 text-teal-600/70">
          <Shield className="h-3 w-3" aria-hidden="true" />
          <span className="text-[8px]">{nl ? "Lokaal" : "Local"}</span>
        </div>
      </div>

      <div className="rounded-lg bg-zinc-50 p-2">
        <div className="mb-1.5 text-[8px] text-zinc-500">{nl ? "Houdingsscore vandaag" : "Posture score today"}</div>
        <div className="flex h-10 gap-[3px]">
          <Bars values={[60, 72, 68, 85, 78, 90, 88, 92, 86, 94, 91, 96]} className={(h) => (h > 80 ? "bg-teal-500/60" : "bg-amber-400/50")} delay={0.2} />
        </div>
        <div className="mt-1 flex justify-between text-[7px] tabular-nums text-zinc-400">
          <span>09:00</span><span>12:00</span><span>15:00</span><span>{nl ? "Nu" : "Now"}</span>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-1.5">
        {stats.map((s) => (
          <div key={s.label} className="rounded-md bg-zinc-50 p-1.5 text-center">
            <div className="text-[10px] font-bold tabular-nums text-zinc-800">{s.value}</div>
            <div className="text-[7px] text-zinc-500">{s.label}</div>
          </div>
        ))}
      </div>

      <div className="rounded-lg border border-teal-500/20 bg-teal-500/[0.06] p-2">
        <div className="mb-1 flex items-center gap-1">
          <Sparkles className="h-2.5 w-2.5 text-teal-600" aria-hidden="true" />
          <span className="text-[9px] font-semibold text-teal-700">{nl ? "Laatste nudge" : "Latest nudge"}</span>
        </div>
        <p className="text-[10px] leading-relaxed text-zinc-600">
          {nl ? "Zit recht! Je schouders zakken naar voren. Even stretchen?" : "Sit up! Your shoulders are dropping forward. Time for a stretch?"}
        </p>
      </div>
    </div>
  );
}

export function ContentOSPreview({ language }: Props) {
  const nl = language === "nl";
  const agents = [
    { name: nl ? "Strateeg" : "Strategist", icon: Target, color: "text-orange-500", bg: "bg-orange-500/10", status: nl ? "Contentkalender bijgewerkt" : "Content calendar updated" },
    { name: nl ? "Schrijver" : "Writer", icon: PenTool, color: "text-pink-500", bg: "bg-pink-500/10", status: nl ? "3 posts geschreven" : "3 posts written" },
    { name: nl ? "E-mail" : "Email", icon: Mail, color: "text-blue-500", bg: "bg-blue-500/10", status: nl ? "Campagne verstuurd" : "Campaign sent" },
    { name: nl ? "Analist" : "Analyst", icon: BarChart3, color: "text-emerald-500", bg: "bg-emerald-500/10", status: nl ? "Rapport klaar" : "Report ready" },
  ];
  const days = nl ? ["Ma", "Di", "Wo", "Do", "Vr"] : ["Mon", "Tue", "Wed", "Thu", "Fri"];
  const counts = [5, 6, 4, 5, 5];

  return (
    <div className="space-y-2.5">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Calendar className="h-3.5 w-3.5 text-orange-500" aria-hidden="true" />
          <span className="text-[10px] font-semibold text-zinc-800">{nl ? "Deze week" : "This week"}</span>
        </div>
        <span className="text-[9px] font-medium tabular-nums text-emerald-600">25 {nl ? "items gepland" : "items scheduled"}</span>
      </div>

      <div className="grid grid-cols-5 gap-1">
        {days.map((d, i) => (
          <div key={d} className="rounded-md bg-zinc-50 p-1.5 text-center">
            <div className="mb-0.5 text-[8px] text-zinc-500">{d}</div>
            <div className="text-[10px] font-bold tabular-nums text-zinc-800">{counts[i]}</div>
            <div className="mt-0.5 flex justify-center gap-[2px]">
              <span className="h-1 w-1 rounded-full bg-orange-400/70" />
              <span className="h-1 w-1 rounded-full bg-pink-400/70" />
              <span className="h-1 w-1 rounded-full bg-blue-400/70" />
            </div>
          </div>
        ))}
      </div>

      <div className="space-y-1.5">
        {agents.map((a, i) => {
          const Icon = a.icon;
          return (
            <motion.div
              key={a.name}
              initial={{ opacity: 0, x: -6 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 + i * 0.08 }}
              className="flex items-center gap-2 rounded-lg bg-zinc-50 px-2 py-1.5"
            >
              <div className={`flex h-5 w-5 shrink-0 items-center justify-center rounded ${a.bg}`}>
                <Icon className={`h-2.5 w-2.5 ${a.color}`} aria-hidden="true" />
              </div>
              <span className="w-[60px] shrink-0 text-[10px] font-semibold text-zinc-700">{a.name}</span>
              <span className="min-w-0 flex-1 truncate text-[9px] text-zinc-500">{a.status}</span>
              <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-emerald-500" />
            </motion.div>
          );
        })}
      </div>

      <div className="rounded-lg border border-orange-500/15 bg-orange-500/[0.04] p-2">
        <div className="mb-1 flex items-center justify-between">
          <span className="text-[9px] font-semibold text-orange-600">{nl ? "Resultaat deze week" : "This week's results"}</span>
          <span className="text-[9px] tabular-nums text-emerald-600">+180%</span>
        </div>
        <div className="flex h-6 gap-[3px]">
          <Bars values={[30, 42, 38, 55, 62, 58, 78, 72, 85, 90]} className={() => "bg-gradient-to-t from-orange-500/50 to-pink-500/50"} delay={0.4} />
        </div>
      </div>
    </div>
  );
}
