"use client";

import { motion } from "framer-motion";
import { Search } from "lucide-react";
import type { Lang } from "@/lib/solutions";
import { AgentMark, C, Card, Chip, Glyph, Lines, Meter, Row, Scene, Show, Txt, useStep } from "./kit";

const T = {
  nl: {
    title: "Vraag je data",
    label: "Iemand stelt in gewoon Nederlands een vraag. De agent doorzoekt de rijen van een spreadsheet, markeert de drie grootste klanten en geeft een antwoord met een kleine grafiek.",
    q: "Welke klanten bestelden dit kwartaal het meest?",
    cols: ["Klant", "Q3", "Regio"],
    regions: ["Noord", "Zuid", "West", "Oost", "West", "Zuid", "Noord"],
    answer: "Antwoord",
    lines: ["Klant 102, 014 en 087", "samen 77% van Q3."],
    source: "Bron: verkoop_2026.xlsx",
  },
  en: {
    title: "Ask your data",
    label: "Someone asks a question in plain English. The agent scans the rows of a spreadsheet, marks the three largest customers and answers with a small chart.",
    q: "Which customers ordered the most this quarter?",
    cols: ["Customer", "Q3", "Region"],
    regions: ["North", "South", "West", "East", "West", "South", "North"],
    answer: "Answer",
    lines: ["Customers 102, 014, 087:", "77% of Q3 together."],
    source: "Source: sales_2026.xlsx",
  },
};

const DATA = [
  { id: "014", v: 12400 },
  { id: "027", v: 3150 },
  { id: "102", v: 18900 },
  { id: "045", v: 2780 },
  { id: "087", v: 9640 },
  { id: "061", v: 1920 },
  { id: "033", v: 4310 },
];
const TOP3 = ["102", "014", "087"];
const fmt = (v: number, lang: Lang) => "€" + v.toLocaleString(lang === "nl" ? "nl-NL" : "en-GB");

const SX = 14;
const SY = 84;
const RH = 22;

function ScanBar() {
  const { still } = useStep();
  if (still) return null;
  return (
    <motion.rect
      x={SX + 3}
      width={180}
      height={RH}
      rx={5}
      fill="rgba(70,55,210,0.10)"
      initial={{ y: SY + 32 }}
      animate={{ y: [SY + 32, SY + 32 + RH * 6] }}
      transition={{ duration: 0.9, ease: "easeInOut" }}
    />
  );
}

export default function EigenData({ lang, still }: { lang: Lang; still?: boolean }) {
  const t = T[lang];
  return (
    <Scene title={t.title} label={t.label} steps={5} still={still} tick={1100}>
      <Show at={1}>
        <Card x={14} y={40} w={372} h={32} r={16}>
          <Glyph icon={Search} x={13} y={10} s={12} color={C.indigo} />
          <Txt x={33} y={20} size={10.5} color={C.ink}>
            {t.q}
          </Txt>
        </Card>
      </Show>

      <Card x={SX} y={SY} w={186} h={196}>
        <Row x={3} y={8} h={22} size={9.5} cells={t.cols.map((c, i) => ({ text: c, w: [76, 58, 52][i], align: i === 1 ? "end" : "start", color: C.muted, weight: 600 }))} />
      </Card>
      <Show at={2} until={3} dy={0}>
        <ScanBar />
      </Show>
      {DATA.map((d, i) => {
        const hit = TOP3.includes(d.id);
        return (
          <g key={d.id}>
            <Row
              x={SX + 3}
              y={SY + 32 + i * RH}
              h={RH}
              size={9.5}
              cells={[
                { text: `${t.cols[0]} ${d.id}`, w: 76 },
                { text: fmt(d.v, lang), w: 58, align: "end" },
                { text: t.regions[i], w: 52, color: C.muted },
              ]}
            />
            {hit && (
              <Show at={3} dy={0}>
                <Row
                  x={SX + 3}
                  y={SY + 32 + i * RH}
                  h={RH}
                  size={9.5}
                  t="indigo"
                  cells={[
                    { text: `${t.cols[0]} ${d.id}`, w: 76, color: C.indigo, weight: 600 },
                    { text: fmt(d.v, lang), w: 58, align: "end", color: C.indigo, weight: 600 },
                    { text: t.regions[i], w: 52, color: C.indigo },
                  ]}
                />
              </Show>
            )}
          </g>
        );
      })}

      <Show at={4} dx={8} dy={0}>
        <Card x={212} y={SY} w={174} h={196} t="indigo">
          <AgentMark x={16} y={16} r={7} />
          <Txt x={28} y={20} size={9.5} weight={600} color={C.indigo}>
            {t.answer}
          </Txt>
          <Lines x={10} y={42} lines={t.lines} size={10} color={C.ink} />
          <g transform="translate(10 76)">
            <rect width={154} height={84} rx={8} fill="#fff" stroke={C.indigoLine} />
            {TOP3.map((id, i) => {
              const v = DATA.find((d) => d.id === id)!.v;
              return (
                <g key={id}>
                  <Txt x={10} y={20 + i * 24} size={9} color={C.muted}>
                    {id}
                  </Txt>
                  <Meter x={32} y={14 + i * 24} w={112} value={v / 18900} at={5} h={7} />
                </g>
              );
            })}
          </g>
          <Chip x={10} y={170} text={t.source} t="muted" size={8.5} />
        </Card>
      </Show>
    </Scene>
  );
}
