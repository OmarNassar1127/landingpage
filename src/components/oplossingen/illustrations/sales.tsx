"use client";

import type { Lang } from "@/lib/solutions";
import { AgentMark, Avatar, C, Card, Chip, Scene, Show, Txt } from "./kit";

const T = {
  nl: {
    title: "Lead #318",
    you: "J",
    label: "De tijdlijn van een lead. Na de offerte stuurt de agent op tijd twee follow-ups, de klant reageert en de agent werkt de fase en de volgende stap in het CRM bij.",
    events: [
      { d: "Ma 6 okt", who: "you", text: "Offerte verstuurd" },
      { d: "Do 9 okt", who: "agent", text: "Follow-up 1 verstuurd" },
      { d: "Di 14 okt", who: "agent", text: "Follow-up 2 met voorbeeld" },
      { d: "Di 14 okt", who: "lead", text: "“Klinkt goed, plan maar in.”" },
    ],
    onTime: "Op tijd",
    crm: "CRM",
    stage: "Fase",
    stages: ["Offerte", "Akkoord"],
    next: "Volgende stap",
    nexts: ["Wacht op reactie", "Start 3 nov"],
    updated: "Bijgewerkt",
  },
  en: {
    title: "Lead #318",
    you: "Y",
    label: "The timeline of a lead. After the quote the agent sends two follow-ups on time, the customer replies and the agent updates the stage and next step in the CRM.",
    events: [
      { d: "Mon 6 Oct", who: "you", text: "Quote sent" },
      { d: "Thu 9 Oct", who: "agent", text: "Follow-up 1 sent" },
      { d: "Tue 14 Oct", who: "agent", text: "Follow-up 2 with example" },
      { d: "Tue 14 Oct", who: "lead", text: "“Sounds good, book it in.”" },
    ],
    onTime: "On time",
    crm: "CRM",
    stage: "Stage",
    stages: ["Quote", "Won"],
    next: "Next step",
    nexts: ["Awaiting reply", "Start 3 Nov"],
    updated: "Updated",
  },
};

const EY = [48, 104, 160, 216];

export default function Sales({ lang, still }: { lang: Lang; still?: boolean }) {
  const t = T[lang];
  return (
    <Scene title={t.title} label={t.label} steps={6} still={still} tick={1000}>
      <line x1="30" x2="30" y1={EY[0] + 20} y2={EY[3] + 26} stroke={C.indigoLine} strokeWidth="1.5" strokeDasharray="3 3" />
      {t.events.map((e, i) => (
        <Show key={i} at={i + 1} dx={-8} dy={0}>
          {e.who === "agent" ? <AgentMark x={30} y={EY[i] + 20} r={9} /> : <Avatar x={30} y={EY[i] + 20} initial={e.who === "you" ? t.you : "K"} t={e.who === "you" ? "muted" : "green"} r={9} />}
          <Card x={48} y={EY[i]} w={210} h={42} t={e.who === "lead" ? "green" : "muted"}>
            <Txt x={10} y={16} size={8.5} weight={600} color={C.muted}>
              {e.d}
            </Txt>
            <Txt x={10} y={31} size={10} weight={e.who === "lead" ? 600 : 500} color={C.ink}>
              {e.text}
            </Txt>
            {e.who === "agent" && <Chip x={200} y={7} text={t.onTime} t="green" size={8} anchor="end" />}
          </Card>
        </Show>
      ))}

      <Card x={270} y={48} w={116} h={210}>
        <Txt x={12} y={22} size={10.5} weight={700}>
          {t.crm}
        </Txt>
        <Txt x={12} y={48} size={8.5} color={C.muted}>
          {t.stage}
        </Txt>
        <Show at={0} until={5} dy={0}>
          <Chip x={12} y={56} text={t.stages[0]} t="muted" size={9} />
        </Show>
        <Show at={5} dy={0}>
          <Chip x={12} y={56} text={t.stages[1]} t="green" size={9} dot />
        </Show>
        <Txt x={12} y={98} size={8.5} color={C.muted}>
          {t.next}
        </Txt>
        <Show at={0} until={5} dy={0}>
          <Txt x={12} y={114} size={10} color={C.body}>
            {t.nexts[0]}
          </Txt>
        </Show>
        <Show at={5} dy={0}>
          <Txt x={12} y={114} size={10} weight={600} color={C.ink}>
            {t.nexts[1]}
          </Txt>
        </Show>
        <line x1="12" x2="104" y1="134" y2="134" stroke={C.line} />
        <Show at={6}>
          <AgentMark x={20} y={156} r={7} />
          <Txt x={32} y={160} size={9} weight={600} color={C.indigo}>
            {t.updated}
          </Txt>
        </Show>
      </Card>
    </Scene>
  );
}
