"use client";

import { NotebookPen } from "lucide-react";
import type { Lang } from "@/lib/solutions";
import { AgentMark, Arrow, C, Card, Chip, Glyph, Row, Scene, Show, Txt, Typing } from "./kit";

const T = {
  nl: {
    title: "Offerte-agent",
    label: "Losse belnotities van een aanvraag worden door de agent omgezet in een complete offerte met regels, bedragen en een totaal, klaar om te checken.",
    notes: "Belnotitie",
    noteLines: ["Kantoor, 120 m²", "Oude vloer eruit", "Nieuw pvc leggen", "Plinten erbij", "Start week 46"],
    quote: "Offerte 2026-118",
    to: "Aan: Klant",
    lines: [
      ["Oude vloer verwijderen", "€960"],
      ["Pvc leggen, 120 m²", "€4.200"],
      ["Plinten, 46 m", "€690"],
      ["Voorrijkosten", "€85"],
    ],
    total: ["Totaal excl. btw", "€5.935"],
    ready: "Klaar om te checken",
  },
  en: {
    title: "Quote agent",
    label: "Loose call notes from an enquiry are turned by the agent into a complete quote with lines, amounts and a total, ready to check.",
    notes: "Call notes",
    noteLines: ["Office, 120 m²", "Old floor out", "Lay new vinyl", "Add skirting", "Start week 46"],
    quote: "Quote 2026-118",
    to: "To: Customer",
    lines: [
      ["Remove old floor", "€960"],
      ["Lay vinyl, 120 m²", "€4,200"],
      ["Skirting, 46 m", "€690"],
      ["Call-out fee", "€85"],
    ],
    total: ["Total excl. VAT", "€5,935"],
    ready: "Ready for your check",
  },
};

export default function Offerte({ lang, still }: { lang: Lang; still?: boolean }) {
  const t = T[lang];
  return (
    <Scene title={t.title} label={t.label} steps={8} still={still} tick={850}>
      <Show at={1} dx={-8} dy={0}>
        <Card x={14} y={46} w={136} h={238} t="amber" flat>
          <Glyph icon={NotebookPen} x={12} y={12} s={12} color="#b45309" />
          <Txt x={30} y={22} size={10} weight={600} color="#b45309">
            {t.notes}
          </Txt>
          {t.noteLines.map((l, i) => (
            <g key={l}>
              <line x1="12" x2="124" y1={52 + i * 30} y2={52 + i * 30} stroke="rgba(180,83,9,0.15)" />
              <Txt x={14} y={47 + i * 30} size={10.5} color="#57534e">
                {l}
              </Txt>
            </g>
          ))}
        </Card>
      </Show>

      <Arrow d="M152 165 H176" at={2} />
      <Show at={2} dy={0}>
        <AgentMark x={164} y={165} r={9} />
      </Show>

      <Card x={186} y={46} w={200} h={238}>
        <Show at={2}>
          <Txt x={14} y={24} size={11} weight={700}>
            {t.quote}
          </Txt>
          <Txt x={14} y={40} size={9} color={C.muted}>
            {t.to}
          </Txt>
        </Show>
        <Show at={2} until={3} dy={0}>
          <Typing x={18} y={70} />
        </Show>
        {t.lines.map(([d, a], i) => (
          <Show key={d} at={3 + i}>
            <Row x={6} y={54 + i * 26} h={26} size={9.5} cells={[{ text: d, w: 128 }, { text: a, w: 60, align: "end", color: C.ink, weight: 600 }]} />
          </Show>
        ))}
        <Show at={7}>
          <Row x={6} y={164} h={26} size={10} t="indigo" cells={[{ text: t.total[0], w: 120, color: C.indigo, weight: 600 }, { text: t.total[1], w: 68, align: "end", color: C.indigo, weight: 700 }]} />
        </Show>
        <Show at={8}>
          <Chip x={14} y={204} text={t.ready} t="green" dot />
        </Show>
      </Card>
    </Scene>
  );
}
