"use client";

import { Mail, MessageCircle, MessageSquare } from "lucide-react";
import type { Lang } from "@/lib/solutions";
import { AgentMark, Arrow, Avatar, C, Card, Check, Chip, Glyph, Lines, Scene, Show, Txt, Typing } from "./kit";

const T = {
  nl: {
    title: "Klantenservice",
    label: "Klantvragen komen binnen via e-mail, chat en WhatsApp. De agent beantwoordt de eerste twee zelf en zet de boze klant door naar collega Sanne, met een samenvatting.",
    head: "Vandaag binnengekomen",
    online: "Agent online",
    agent: "Agent",
    rows: [
      { ch: "E-mail", time: "08:12", q: ["Waar blijft mijn", "bestelling #2041?"], a: ["Hij is onderweg en komt", "morgen voor 12:00 aan."] },
      { ch: "Chat", time: "08:30", q: ["Kan ik mijn bezorgadres", "nog wijzigen?"], a: ["Ja, dat kan tot 18:00.", "Ik heb het aangepast."] },
      { ch: "WhatsApp", time: "09:05", q: ["Dit is al de derde keer", "dat het misgaat!"] },
    ],
    handoff: "Doorgezet naar Sanne",
    summary: ["Klant is boos, 3e keer.", "Samenvatting staat erbij."],
  },
  en: {
    title: "Customer service",
    label: "Customer messages arrive by email, chat and WhatsApp. The agent answers the first two itself and hands the upset customer to colleague Sanne, with a summary.",
    head: "Received today",
    online: "Agent online",
    agent: "Agent",
    rows: [
      { ch: "Email", time: "08:12", q: ["Where is my", "order #2041?"], a: ["It is on its way and", "arrives tomorrow by noon."] },
      { ch: "Chat", time: "08:30", q: ["Can I still change my", "delivery address?"], a: ["Yes, until 6 pm today.", "I have updated it."] },
      { ch: "WhatsApp", time: "09:05", q: ["This is the third time", "it has gone wrong!"] },
    ],
    handoff: "Handed to Sanne",
    summary: ["Upset customer, 3rd time.", "Summary attached."],
  },
};

const ICONS = [Mail, MessageSquare, MessageCircle];
const ROW_Y = [64, 142, 220];
const CW = 176;

export default function Klantenservice({ lang, still }: { lang: Lang; still?: boolean }) {
  const t = T[lang];
  return (
    <Scene title={t.title} label={t.label} steps={9} still={still} tick={850}>
      <Txt x={16} y={51} size={11} weight={600}>
        {t.head}
      </Txt>
      <Chip x={384} y={39} text={t.online} t="green" anchor="end" dot />

      {t.rows.map((r, i) => {
        const y = ROW_Y[i];
        const at = 1 + i * 3;
        return (
          <g key={r.ch}>
            <Show at={at} dx={-8} dy={0}>
              <Card x={14} y={y} w={CW} h={66}>
                <Glyph icon={ICONS[i]} x={10} y={9} s={11} />
                <Txt x={26} y={18} size={9.5} weight={600} color={C.muted}>
                  {r.ch}
                </Txt>
                <Txt x={CW - 10} y={18} size={9} color={C.faint} anchor="end">
                  {r.time}
                </Txt>
                <Lines x={10} y={38} lines={r.q} size={10.5} />
              </Card>
            </Show>

            <Arrow d={`M193 ${y + 33} H207`} at={at + 1} />

            <Show at={at + 1} until={at + 2} dy={0}>
              <Card x={210} y={y + 20} w={46} h={26} r={13} flat>
                <Typing x={16} y={13} />
              </Card>
            </Show>

            {r.a ? (
              <Show at={at + 2} dx={8} dy={0}>
                <Card x={210} y={y} w={CW} h={66} t="indigo">
                  <AgentMark x={16} y={14} r={7} />
                  <Txt x={28} y={18} size={9.5} weight={600} color={C.indigo}>
                    {t.agent}
                  </Txt>
                  <Check x={CW - 14} y={14} r={6} />
                  <Lines x={10} y={38} lines={r.a} size={10.5} color={C.ink} />
                </Card>
              </Show>
            ) : (
              <Show at={at + 2} dx={8} dy={0}>
                <Card x={210} y={y} w={CW} h={66} t="amber">
                  <Avatar x={17} y={14} initial="S" r={8} />
                  <Txt x={30} y={18} size={9.5} weight={600} color="#b45309">
                    {t.handoff}
                  </Txt>
                  <Lines x={10} y={38} lines={t.summary} size={10.5} color={C.ink} />
                </Card>
              </Show>
            )}
          </g>
        );
      })}
    </Scene>
  );
}
