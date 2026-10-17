"use client";

import React from "react";
import { motion } from "framer-motion";
import { MessageSquare, TrendingUp, Settings, Search, Radar, FileCheck } from "lucide-react";
import type { Agent } from "./data";

export function ChatTemplate({ activeAgent, agents, language }: { activeAgent: number; agents: Agent[]; language: string }) {
  const isNL = language === "nl";
  const allConvos = isNL
    ? [
        [
          { from: "customer", text: "Ik heb een verkeerd product ontvangen, wat nu?" },
          { from: "agent", text: "Vervelend! Ik zie je bestelling #7290. Ik stuur direct een retourlabel naar je mail en het juiste product gaat vandaag nog de deur uit 📬" },
          { from: "customer", text: "Wow dat is snel, dankje!" },
          { from: "agent", text: "Geen probleem! Het nieuwe pakket is morgen bij je. Verder nog iets?" },
        ],
        [
          { from: "agent", text: "Hey! Leuk dat je erbij bent. Ik loop even met je door de eerste stappen 🎯" },
          { from: "customer", text: "Cool, ik heb nog nooit zoiets gebruikt" },
          { from: "agent", text: "Geen zorgen! Stap 1: koppel je e-mail. Klik op Instellingen → Integraties. Ik wacht op je ✓" },
          { from: "customer", text: "Gelukt!" },
          { from: "agent", text: "Top! Nu stap 2: ik heb een demo-project voor je aangemaakt zodat je kunt oefenen 💡" },
        ],
        [
          { from: "customer", text: "Hoi, doen jullie ook reparaties?" },
          { from: "agent", text: "Jazeker! We repareren alle merken. Wil je een afspraak inplannen? We hebben plek op woensdag 11:00 of donderdag 14:30 🔧" },
          { from: "customer", text: "Donderdag 14:30 is goed" },
          { from: "agent", text: "Staat genoteerd! Je krijgt een bevestiging via WhatsApp en een herinnering morgenochtend. Tot donderdag!" },
        ],
        [
          { from: "agent", text: "Goedemiddag, u spreekt met Virelio. Waarmee kan ik u helpen? 📞" },
          { from: "customer", text: "Ik wil graag een afspraak maken voor volgende week" },
          { from: "agent", text: "Natuurlijk! Ik zie dat dinsdag 10:00 en woensdag 14:00 beschikbaar zijn. Wat past u het beste?" },
          { from: "customer", text: "Dinsdag 10:00 graag" },
          { from: "agent", text: "Ingepland! U ontvangt een bevestiging per SMS. Fijne dag nog! 😊" },
        ],
      ]
    : [
        [
          { from: "customer", text: "I received the wrong product, what should I do?" },
          { from: "agent", text: "Sorry about that! I can see your order #7290. I'm sending a return label to your email now and shipping the correct item today 📬" },
          { from: "customer", text: "Wow that's fast, thanks!" },
          { from: "agent", text: "No problem! The new package will arrive tomorrow. Anything else I can help with?" },
        ],
        [
          { from: "agent", text: "Hey! Great to have you on board. Let me walk you through the first steps 🎯" },
          { from: "customer", text: "Cool, I've never used anything like this before" },
          { from: "agent", text: "No worries! Step 1: connect your email. Go to Settings → Integrations. I'll wait ✓" },
          { from: "customer", text: "Done!" },
          { from: "agent", text: "Nice! Step 2: I've created a demo project for you to practice with 💡" },
        ],
        [
          { from: "customer", text: "Hi, do you also do repairs?" },
          { from: "agent", text: "Absolutely! We repair all brands. Want to book an appointment? We have slots on Wednesday 11:00 or Thursday 14:30 🔧" },
          { from: "customer", text: "Thursday 14:30 works" },
          { from: "agent", text: "Booked! You'll get a WhatsApp confirmation and a reminder tomorrow morning. See you Thursday!" },
        ],
        [
          { from: "agent", text: "Good afternoon, you're speaking with Virelio. How can I help you? 📞" },
          { from: "customer", text: "I'd like to schedule an appointment for next week" },
          { from: "agent", text: "Of course! I see Tuesday 10:00 and Wednesday 14:00 are available. What works best?" },
          { from: "customer", text: "Tuesday 10:00 please" },
          { from: "agent", text: "Scheduled! You'll receive a confirmation via SMS. Have a great day! 😊" },
        ],
      ];

  const msgs = allConvos[activeAgent] || allConvos[0];
  const agentName = agents[activeAgent]?.name || agents[0].name;

  return (
    <div className="rounded-xl border border-border/40 bg-muted/20 overflow-hidden">
      <div className="flex items-center gap-2 px-4 py-2.5 border-b border-border/30 bg-muted/30">
        <MessageSquare className="w-3.5 h-3.5 text-blue-500" />
        <span className="text-xs font-medium text-foreground/70">{agentName}</span>
        <motion.div className="w-1.5 h-1.5 rounded-full bg-emerald-400 ml-auto" animate={{ opacity: [1, 0.3, 1] }} transition={{ duration: 2, repeat: Infinity }} />
      </div>
      <div className="p-4 space-y-2.5">
        {msgs.map((msg, i) => (
          <motion.div key={`${activeAgent}-${i}`} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 + i * 0.25 }} className={`flex ${msg.from === "customer" ? "justify-end" : "justify-start"}`}>
            <div className={`max-w-[80%] rounded-2xl px-3.5 py-2 ${msg.from === "customer" ? "bg-primary/10 rounded-tr-sm" : "bg-muted/60 rounded-tl-sm"}`}>
              <p className="text-[12px] text-foreground/70">{msg.text}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

export function PipelineTemplate({ activeAgent, agents, language }: { activeAgent: number; agents: Agent[]; language: string }) {
  const isNL = language === "nl";
  const allData = isNL
    ? [
        [
          { label: "Websitebezoekers", count: 1240, width: 100, color: "bg-emerald-500/20 text-emerald-500" },
          { label: "Formulier ingevuld", count: 186, width: 65, color: "bg-emerald-500/30 text-emerald-500" },
          { label: "Demo ingepland", count: 47, width: 38, color: "bg-emerald-500/50 text-emerald-500" },
          { label: "Klant geworden", count: 21, width: 20, color: "bg-emerald-500 text-white" },
        ],
        [
          { label: "Doelgroep", count: 620, width: 100, color: "bg-emerald-500/20 text-emerald-500" },
          { label: "E-mail verstuurd", count: 415, width: 67, color: "bg-emerald-500/30 text-emerald-500" },
          { label: "Gelezen", count: 178, width: 42, color: "bg-emerald-500/50 text-emerald-500" },
          { label: "Gesprek gestart", count: 43, width: 18, color: "bg-emerald-500 text-white" },
        ],
        [
          { label: "Gesprekken gevoerd", count: 38, width: 100, color: "bg-emerald-500/20 text-emerald-500" },
          { label: "Voorstel opgesteld", count: 32, width: 84, color: "bg-emerald-500/30 text-emerald-500" },
          { label: "Goedgekeurd", count: 28, width: 74, color: "bg-emerald-500/50 text-emerald-500" },
          { label: "Ondertekend", count: 22, width: 58, color: "bg-emerald-500 text-white" },
        ],
        [
          { label: "Content gemaakt", count: 25, width: 100, color: "bg-emerald-500/20 text-emerald-500" },
          { label: "Gepubliceerd", count: 22, width: 88, color: "bg-emerald-500/30 text-emerald-500" },
          { label: "Engagement", count: 840, width: 60, color: "bg-emerald-500/50 text-emerald-500" },
          { label: "Leads via content", count: 12, width: 30, color: "bg-emerald-500 text-white" },
        ],
      ]
    : [
        [
          { label: "Site visitors", count: 1240, width: 100, color: "bg-emerald-500/20 text-emerald-500" },
          { label: "Form filled", count: 186, width: 65, color: "bg-emerald-500/30 text-emerald-500" },
          { label: "Demo booked", count: 47, width: 38, color: "bg-emerald-500/50 text-emerald-500" },
          { label: "Became client", count: 21, width: 20, color: "bg-emerald-500 text-white" },
        ],
        [
          { label: "Target group", count: 620, width: 100, color: "bg-emerald-500/20 text-emerald-500" },
          { label: "Email sent", count: 415, width: 67, color: "bg-emerald-500/30 text-emerald-500" },
          { label: "Read", count: 178, width: 42, color: "bg-emerald-500/50 text-emerald-500" },
          { label: "Started convo", count: 43, width: 18, color: "bg-emerald-500 text-white" },
        ],
        [
          { label: "Calls done", count: 38, width: 100, color: "bg-emerald-500/20 text-emerald-500" },
          { label: "Proposal drafted", count: 32, width: 84, color: "bg-emerald-500/30 text-emerald-500" },
          { label: "Approved", count: 28, width: 74, color: "bg-emerald-500/50 text-emerald-500" },
          { label: "Signed", count: 22, width: 58, color: "bg-emerald-500 text-white" },
        ],
        [
          { label: "Content created", count: 25, width: 100, color: "bg-emerald-500/20 text-emerald-500" },
          { label: "Published", count: 22, width: 88, color: "bg-emerald-500/30 text-emerald-500" },
          { label: "Engagement", count: 840, width: 60, color: "bg-emerald-500/50 text-emerald-500" },
          { label: "Leads via content", count: 12, width: 30, color: "bg-emerald-500 text-white" },
        ],
      ];

  const stages = allData[activeAgent] || allData[0];

  return (
    <div className="rounded-xl border border-border/40 bg-muted/20 overflow-hidden">
      <div className="flex items-center gap-2 px-4 py-2.5 border-b border-border/30 bg-muted/30">
        <TrendingUp className="w-3.5 h-3.5 text-emerald-500" />
        <span className="text-xs font-medium text-foreground/70">{agents[activeAgent]?.name}</span>
      </div>
      <div className="p-4 space-y-2">
        {stages.map((stage, i) => (
          <motion.div key={`${activeAgent}-${i}`} initial={{ opacity: 0, scaleX: 0 }} animate={{ opacity: 1, scaleX: 1 }} transition={{ delay: 0.2 + i * 0.15, duration: 0.4 }} style={{ originX: 0 }}>
            <div className="flex items-center gap-3">
              <span className="text-[11px] text-muted-foreground w-[90px] shrink-0">{stage.label}</span>
              <div className="flex-1 h-7 rounded-lg overflow-hidden bg-muted/30">
                <motion.div className={`h-full rounded-lg ${stage.color} flex items-center px-2.5`} initial={{ width: 0 }} animate={{ width: `${stage.width}%` }} transition={{ delay: 0.3 + i * 0.15, duration: 0.6 }}>
                  <span className="text-[11px] font-bold">{stage.count}</span>
                </motion.div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

export function WorkflowTemplate({ activeAgent, agents, language }: { activeAgent: number; agents: Agent[]; language: string }) {
  const isNL = language === "nl";
  const allSteps = isNL
    ? [
        [
          { label: "Betaling ontvangen via Shopify", status: "done", time: "11:22" },
          { label: "3 artikelen gereserveerd in magazijn", status: "done", time: "11:22" },
          { label: "Pakbon + label via Sendcloud", status: "done", time: "11:23" },
          { label: "Track & trace naar klant gestuurd", status: "active", time: "11:24" },
        ],
        [
          { label: "Mijlpaal bereikt, factuur aangemaakt", status: "done", time: "Ma 09:00" },
          { label: "PDF verstuurd via Moneybird", status: "done", time: "Ma 09:01" },
          { label: "Geen betaling na 14d, herinnering verstuurd", status: "done", time: "Di 09:00" },
          { label: "Betaling binnen en automatisch geboekt", status: "active", time: "Wo 14:12" },
        ],
        [
          { label: "Arbeidsovereenkomst digitaal getekend", status: "done", time: "Dag 1" },
          { label: "Slack, Gmail, Notion accounts actief", status: "done", time: "Dag 1" },
          { label: "Kennismaking met 4 teamleden gepland", status: "done", time: "Dag 2" },
          { label: "Eerste eigen taak toegewezen", status: "active", time: "Dag 3" },
        ],
        [
          { label: "Meeting gestart, opname actief", status: "done", time: "14:00" },
          { label: "3 actiepunten gedetecteerd", status: "done", time: "14:32" },
          { label: "Notulen gegenereerd", status: "done", time: "14:45" },
          { label: "Verstuurd naar #team + Linear", status: "active", time: "14:46" },
        ],
      ]
    : [
        [
          { label: "Payment received via Shopify", status: "done", time: "11:22" },
          { label: "3 items reserved in warehouse", status: "done", time: "11:22" },
          { label: "Packing slip + label via Sendcloud", status: "done", time: "11:23" },
          { label: "Track & trace sent to customer", status: "active", time: "11:24" },
        ],
        [
          { label: "Milestone hit, invoice created", status: "done", time: "Mon 09:00" },
          { label: "PDF sent via Moneybird", status: "done", time: "Mon 09:01" },
          { label: "No payment after 14d, reminder sent", status: "done", time: "Tue 09:00" },
          { label: "Payment received and auto-booked", status: "active", time: "Wed 14:12" },
        ],
        [
          { label: "Employment contract signed digitally", status: "done", time: "Day 1" },
          { label: "Slack, Gmail, Notion accounts active", status: "done", time: "Day 1" },
          { label: "Meet & greet with 4 team members set", status: "done", time: "Day 2" },
          { label: "First own task assigned", status: "active", time: "Day 3" },
        ],
        [
          { label: "Meeting started, recording active", status: "done", time: "14:00" },
          { label: "3 action items detected", status: "done", time: "14:32" },
          { label: "Minutes generated", status: "done", time: "14:45" },
          { label: "Sent to #team + Linear", status: "active", time: "14:46" },
        ],
      ];

  const steps = allSteps[activeAgent] || allSteps[0];

  return (
    <div className="rounded-xl border border-border/40 bg-muted/20 overflow-hidden">
      <div className="flex items-center gap-2 px-4 py-2.5 border-b border-border/30 bg-muted/30">
        <Settings className="w-3.5 h-3.5 text-amber-500" />
        <span className="text-xs font-medium text-foreground/70">{agents[activeAgent]?.name}</span>
      </div>
      <div className="p-4 space-y-0">
        {steps.map((step, i) => (
          <motion.div key={`${activeAgent}-${i}`} initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.2 + i * 0.2 }} className="flex items-center gap-3 py-2 relative">
            {i < steps.length - 1 && <div className="absolute left-[11px] top-[28px] w-[2px] h-[16px] bg-border/50" />}
            <div className={`w-6 h-6 rounded-full flex items-center justify-center shrink-0 ${step.status === "done" ? "bg-amber-500/20" : "bg-amber-500/10 ring-2 ring-amber-500/30"}`}>
              {step.status === "done" ? (
                <span className="text-amber-500 text-[10px]">✓</span>
              ) : (
                <motion.div className="w-2 h-2 rounded-full bg-amber-500" animate={{ scale: [1, 1.3, 1] }} transition={{ duration: 1.5, repeat: Infinity }} />
              )}
            </div>
            <span className="text-[12px] text-foreground/70 flex-1">{step.label}</span>
            <span className="text-[10px] text-muted-foreground/40">{step.time}</span>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

export function SearchTemplate({ activeAgent, agents, language }: { activeAgent: number; agents: Agent[]; language: string }) {
  const isNL = language === "nl";
  const allData = isNL
    ? [
        {
          query: "Hoe werkt de garantie op maatwerkprojecten?",
          results: [
            { source: "Servicevoorwaarden 2025", page: "§7.1", match: "Maatwerkprojecten vallen onder 12 maanden garantie op..." },
            { source: "Interne wiki: Garanties", page: "p.4", match: "Bij maatwerkoplossingen geldt een SLA van 48 uur voor..." },
            { source: "Klant-onboarding doc", page: "#22", match: "Leg bij oplevering de garantievoorwaarden vast in het..." },
          ],
        },
        {
          query: "Scan leverancierscontract Konings BV",
          results: [
            { source: "Contract Konings BV", page: "§3.5", match: "⚠️ Betalingstermijn 60 dagen wijkt af van standaard 30d" },
            { source: "Inkoopbeleid 2025", page: "p.2", match: "Maximale betalingstermijn leveranciers: 30 dagen tenzij..." },
            { source: "Risico-matrix", page: "#8", match: "Aanbeveling: heronderhandel of laat juridisch reviewen" },
          ],
        },
        {
          query: "Maak maandoverzicht operatie maart",
          results: [
            { source: "Exact Online", page: "live", match: "Omzet maart: €87K, 8% boven target" },
            { source: "Jira board", page: "live", match: "23 tickets opgelost, 2 open, gem. doorlooptijd 1.4 dag" },
            { source: "Google Sheets team", page: "live", match: "Overzicht verstuurd naar #management + PDF opgeslagen" },
          ],
        },
        {
          query: "Analyseer AI-trends in de logistieke sector 2026",
          results: [
            { source: "McKinsey Report 2026", page: "p.14", match: "AI-adoptie in logistiek stijgt met 340% in 2025-2026..." },
            { source: "TechCrunch", page: "artikel", match: "Autonomous warehousing markt bereikt $12B in 2026..." },
            { source: "Gartner Hype Cycle", page: "2026", match: "Predictive logistics AI verschuift naar 'plateau of productivity'..." },
          ],
        },
      ]
    : [
        {
          query: "How does warranty work on custom projects?",
          results: [
            { source: "Service Terms 2025", page: "§7.1", match: "Custom projects are covered by 12 months warranty on..." },
            { source: "Internal wiki: Warranties", page: "p.4", match: "For custom solutions, a 48-hour SLA applies for..." },
            { source: "Client onboarding doc", page: "#22", match: "Document warranty terms at delivery in the project..." },
          ],
        },
        {
          query: "Scan supplier contract Konings BV",
          results: [
            { source: "Contract Konings BV", page: "§3.5", match: "⚠️ Payment term 60 days deviates from standard 30d" },
            { source: "Procurement Policy 2025", page: "p.2", match: "Maximum supplier payment term: 30 days unless..." },
            { source: "Risk matrix", page: "#8", match: "Recommendation: renegotiate or send for legal review" },
          ],
        },
        {
          query: "Generate monthly ops overview March",
          results: [
            { source: "Exact Online", page: "live", match: "Revenue March: €87K, 8% above target" },
            { source: "Jira board", page: "live", match: "23 tickets resolved, 2 open, avg lead time 1.4 days" },
            { source: "Google Sheets team", page: "live", match: "Overview sent to #management + PDF saved" },
          ],
        },
        {
          query: "Analyze AI trends in logistics sector 2026",
          results: [
            { source: "McKinsey Report 2026", page: "p.14", match: "AI adoption in logistics grows 340% in 2025-2026..." },
            { source: "TechCrunch", page: "article", match: "Autonomous warehousing market reaches $12B in 2026..." },
            { source: "Gartner Hype Cycle", page: "2026", match: "Predictive logistics AI shifts to 'plateau of productivity'..." },
          ],
        },
      ];

  const data = allData[activeAgent] || allData[0];

  return (
    <div className="rounded-xl border border-border/40 bg-muted/20 overflow-hidden">
      <div className="flex items-center gap-2 px-4 py-2.5 border-b border-border/30 bg-muted/30">
        <Search className="w-3.5 h-3.5 text-violet-500" />
        <span className="text-xs font-medium text-foreground/70">{agents[activeAgent]?.name}</span>
      </div>
      <div className="p-4 space-y-3">
        <motion.div key={`q-${activeAgent}`} initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex items-center gap-2 px-3 py-2 rounded-lg bg-background border border-border/50">
          <Search className="w-3 h-3 text-muted-foreground/40" />
          <span className="text-[11px] text-foreground/50">{data.query}</span>
        </motion.div>
        <div className="space-y-1.5">
          {data.results.map((r, i) => (
            <motion.div key={`${activeAgent}-${i}`} initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 + i * 0.2 }} className="rounded-lg bg-background/50 border border-border/30 p-2.5">
              <div className="flex items-center gap-2 mb-1">
                <span className="text-[10px] font-semibold text-violet-500">{r.source}</span>
                <span className="text-[9px] text-muted-foreground/40">{r.page}</span>
              </div>
              <p className="text-[11px] text-foreground/50 truncate">{r.match}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}

// Data & Insights: Dashboard with live metrics
export function DashboardTemplate({ activeAgent, agents, language }: { activeAgent: number; agents: Agent[]; language: string }) {
  const isNL = language === "nl";
  const allData = isNL
    ? [
        { title: "Concurrentie Monitor", metrics: [
          { label: "Prijswijzigingen", value: "3 vandaag", color: "text-rose-400" },
          { label: "Nieuwe features", value: "1 gelanceerd", color: "text-amber-400" },
          { label: "Review score", value: "4.2 → 3.8 ↓", color: "text-red-400" },
          { label: "Vacatures", value: "+5 dev rollen", color: "text-blue-400" },
        ]},
        { title: "Prijs Optimalisatie", metrics: [
          { label: "Huidige marge", value: "34.2%", color: "text-emerald-400" },
          { label: "Aanbevolen prijs", value: "€49.90 → €54.90", color: "text-rose-400" },
          { label: "Verwachte impact", value: "+€2.1K/maand", color: "text-amber-400" },
          { label: "Seizoensfactor", value: "Hoog (Q1)", color: "text-blue-400" },
        ]},
        { title: "Churn Voorspeller", metrics: [
          { label: "Risico klanten", value: "7 van 240", color: "text-red-400" },
          { label: "Gem. risicoscore", value: "82/100", color: "text-amber-400" },
          { label: "Auto-retentie actief", value: "3 campagnes", color: "text-emerald-400" },
          { label: "Gered deze maand", value: "4 klanten", color: "text-blue-400" },
        ]},
        { title: "Social Listening", metrics: [
          { label: "Vermeldingen vandaag", value: "23", color: "text-rose-400" },
          { label: "Sentiment", value: "Positief", color: "text-emerald-400" },
          { label: "Trending topic", value: "\"AI agents\"", color: "text-amber-400" },
          { label: "Competitor mentions", value: "4 negatief", color: "text-red-400" },
        ]},
      ]
    : [
        { title: "Competitor Monitor", metrics: [
          { label: "Price changes", value: "3 today", color: "text-rose-400" },
          { label: "New features", value: "1 launched", color: "text-amber-400" },
          { label: "Review score", value: "4.2 → 3.8 ↓", color: "text-red-400" },
          { label: "Job posts", value: "+5 dev roles", color: "text-blue-400" },
        ]},
        { title: "Price Optimization", metrics: [
          { label: "Current margin", value: "34.2%", color: "text-emerald-400" },
          { label: "Recommended", value: "€49.90 → €54.90", color: "text-rose-400" },
          { label: "Expected impact", value: "+€2.1K/month", color: "text-amber-400" },
          { label: "Season factor", value: "High (Q1)", color: "text-blue-400" },
        ]},
        { title: "Churn Predictor", metrics: [
          { label: "At-risk customers", value: "7 of 240", color: "text-red-400" },
          { label: "Avg risk score", value: "82/100", color: "text-amber-400" },
          { label: "Auto-retention", value: "3 campaigns", color: "text-emerald-400" },
          { label: "Saved this month", value: "4 customers", color: "text-blue-400" },
        ]},
        { title: "Social Listening", metrics: [
          { label: "Mentions today", value: "23", color: "text-rose-400" },
          { label: "Sentiment", value: "Positive", color: "text-emerald-400" },
          { label: "Trending topic", value: "\"AI agents\"", color: "text-amber-400" },
          { label: "Competitor mentions", value: "4 negative", color: "text-red-400" },
        ]},
      ];

  const data = allData[activeAgent] || allData[0];

  return (
    <div className="rounded-xl border border-border/40 bg-muted/20 overflow-hidden">
      <div className="flex items-center gap-2 px-4 py-2.5 border-b border-border/30 bg-muted/30">
        <Radar className="w-3.5 h-3.5 text-rose-500" />
        <span className="text-xs font-medium text-foreground/70">{agents[activeAgent]?.name}</span>
        <motion.div className="w-1.5 h-1.5 rounded-full bg-emerald-400 ml-auto" animate={{ opacity: [1, 0.3, 1] }} transition={{ duration: 2, repeat: Infinity }} />
      </div>
      <div className="p-4 space-y-2">
        {data.metrics.map((m, i) => (
          <motion.div key={`${activeAgent}-${i}`} initial={{ opacity: 0, x: -8 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.2 + i * 0.12 }} className="flex items-center justify-between py-1.5 px-2 rounded-lg bg-background/40">
            <span className="text-[11px] text-muted-foreground">{m.label}</span>
            <span className={`text-[11px] font-semibold ${m.color}`}>{m.value}</span>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

// Finance & Legal: Document scan visualization
export function DocumentScanTemplate({ activeAgent, agents, language }: { activeAgent: number; agents: Agent[]; language: string }) {
  const isNL = language === "nl";
  const allData = isNL
    ? [
        { doc: "Leverancierscontract_2025.pdf", findings: [
          { type: "risk", text: "Betalingstermijn 90 dagen, standaard is 30" },
          { type: "missing", text: "Verwerkersovereenkomst ontbreekt" },
          { type: "ok", text: "Aansprakelijkheidsclausule conform" },
        ]},
        { doc: "Maandrapport_uitgaven_maart.xlsx", findings: [
          { type: "alert", text: "Dubbele factuur #4421 gedetecteerd: €1.240" },
          { type: "info", text: "Marketing budget 12% boven limiet" },
          { type: "ok", text: "Alle overige categorieën binnen budget" },
        ]},
        { doc: "Transactie_batch_14032026.csv", findings: [
          { type: "risk", text: "3 transacties van zelfde IP in 2 minuten" },
          { type: "alert", text: "Bedrag €4.800 wijkt af van klantgemiddelde" },
          { type: "ok", text: "KYC-verificatie klant bevestigd" },
        ]},
        { doc: "Cashflow_forecast_Q2_2026.pdf", findings: [
          { type: "info", text: "Verwachte inkomsten Q2: €142K (+8% vs Q1)" },
          { type: "alert", text: "Tekort verwacht in week 22: €4.200 onder minimum" },
          { type: "ok", text: "Aanbeveling: vervroeg factuur #912 of stel investering uit" },
        ]},
      ]
    : [
        { doc: "Supplier_Contract_2025.pdf", findings: [
          { type: "risk", text: "Payment term 90 days, standard is 30" },
          { type: "missing", text: "Data processing agreement missing" },
          { type: "ok", text: "Liability clause compliant" },
        ]},
        { doc: "Monthly_Expenses_March.xlsx", findings: [
          { type: "alert", text: "Duplicate invoice #4421 detected: €1,240" },
          { type: "info", text: "Marketing budget 12% over limit" },
          { type: "ok", text: "All other categories within budget" },
        ]},
        { doc: "Transaction_Batch_14032026.csv", findings: [
          { type: "risk", text: "3 transactions from same IP in 2 minutes" },
          { type: "alert", text: "Amount €4,800 deviates from customer average" },
          { type: "ok", text: "KYC verification confirmed" },
        ]},
        { doc: "Cashflow_Forecast_Q2_2026.pdf", findings: [
          { type: "info", text: "Expected revenue Q2: €142K (+8% vs Q1)" },
          { type: "alert", text: "Shortfall expected in week 22: €4,200 below minimum" },
          { type: "ok", text: "Recommendation: expedite invoice #912 or defer investment" },
        ]},
      ];

  const data = allData[activeAgent] || allData[0];
  const icons: Record<string, { icon: string; color: string }> = {
    risk: { icon: "⚠️", color: "border-red-500/20 bg-red-500/5" },
    missing: { icon: "❌", color: "border-amber-500/20 bg-amber-500/5" },
    alert: { icon: "🔔", color: "border-amber-500/20 bg-amber-500/5" },
    info: { icon: "ℹ️", color: "border-blue-500/20 bg-blue-500/5" },
    ok: { icon: "✅", color: "border-emerald-500/20 bg-emerald-500/5" },
  };

  return (
    <div className="rounded-xl border border-border/40 bg-muted/20 overflow-hidden">
      <div className="flex items-center gap-2 px-4 py-2.5 border-b border-border/30 bg-muted/30">
        <FileCheck className="w-3.5 h-3.5 text-cyan-500" />
        <span className="text-xs font-medium text-foreground/70">{agents[activeAgent]?.name}</span>
      </div>
      <div className="p-4 space-y-2.5">
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex items-center gap-2 px-3 py-2 rounded-lg bg-background border border-border/50">
          <span className="text-[10px]">📄</span>
          <span className="text-[11px] text-foreground/50 font-mono truncate">{data.doc}</span>
        </motion.div>
        {data.findings.map((f, i) => {
          const style = icons[f.type] || icons.ok;
          return (
            <motion.div key={`${activeAgent}-${i}`} initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 + i * 0.2 }} className={`rounded-lg border p-2.5 ${style.color}`}>
              <div className="flex items-start gap-2">
                <span className="text-[10px] mt-0.5">{style.icon}</span>
                <p className="text-[11px] text-foreground/60">{f.text}</p>
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
