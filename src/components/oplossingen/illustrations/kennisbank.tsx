"use client";

import { FileText } from "lucide-react";
import type { Lang } from "@/lib/solutions";
import { AgentMark, Arrow, Avatar, Bar, Bubble, C, Card, Chip, Glyph, Lines, Scene, Show, Txt } from "./kit";

const T = {
  nl: {
    title: "Kennisbank",
    label: "Een collega vraagt hoeveel vakantiedagen hij na vijf jaar krijgt. De assistent zoekt in drie documenten, markeert de juiste passage in het verlofbeleid en antwoordt met de bron erbij.",
    q: ["Hoeveel vakantiedagen krijg ik", "na 5 jaar in dienst?"],
    docs: ["Personeelshandboek.pdf", "Verlofbeleid.docx", "Cao 2026.pdf"],
    hit: "§3.2 Na 5 jaar: +2 dagen",
    answer: ["Na 5 jaar krijg je 27 dagen:", "25 basis plus 2 extra."],
    source: "Bron: Verlofbeleid §3.2",
    searching: "Zoekt in 3 documenten",
    who: "Assistent",
  },
  en: {
    title: "Knowledge base",
    label: "A colleague asks how many days of leave they get after five years. The assistant searches three documents, highlights the right passage in the leave policy and answers with the source.",
    q: ["How many days of leave do I", "get after 5 years?"],
    docs: ["Staff handbook.pdf", "Leave policy.docx", "Agreement 2026.pdf"],
    hit: "§3.2 After 5 years: +2 days",
    answer: ["After 5 years you get 27 days:", "25 standard plus 2 extra."],
    source: "Source: Leave policy §3.2",
    searching: "Searching 3 documents",
    who: "Assistant",
  },
};

const DY = [100, 162, 224];

export default function Kennisbank({ lang, still }: { lang: Lang; still?: boolean }) {
  const t = T[lang];
  return (
    <Scene title={t.title} label={t.label} steps={5} still={still} tick={1100}>
      <Show at={1}>
        <Avatar x={378} y={60} initial="M" t="muted" r={9} />
        <Bubble x={186} y={44} w={180} lines={t.q} size={10} />
      </Show>

      <Show at={2} until={3} dy={0}>
        <Chip x={14} y={74} text={t.searching} t="indigo" size={8.5} dot />
      </Show>
      {t.docs.map((d, i) => {
        const hit = i === 1;
        return (
          <g key={d}>
            <Card x={14} y={DY[i]} w={154} h={54} >
              <Glyph icon={FileText} x={10} y={9} s={11} color={hit ? C.indigo : C.muted} />
              <Txt x={26} y={18} size={9} weight={600} color={C.ink}>
                {d}
              </Txt>
              <Bar x={10} y={28} w={128} />
              <Bar x={10} y={39} w={96} />
            </Card>
            {hit && (
              <Show at={3} dy={0}>
                <Card x={14} y={DY[i]} w={154} h={54} t="indigo">
                  <Glyph icon={FileText} x={10} y={9} s={11} color={C.indigo} />
                  <Txt x={26} y={18} size={9} weight={600} color={C.indigo}>
                    {d}
                  </Txt>
                  <rect x={6} y={26} width={142} height={20} rx={4} fill="#fff" stroke={C.indigo} strokeWidth="1.1" />
                  <Txt x={12} y={39.5} size={9} weight={600} color={C.ink}>
                    {t.hit}
                  </Txt>
                </Card>
              </Show>
            )}
          </g>
        );
      })}

      <Arrow d={`M170 ${DY[1] + 27} C 182 ${DY[1] + 27}, 180 ${DY[1] + 8}, 194 ${DY[1] + 8}`} at={4} />
      <Show at={4} dx={8} dy={0}>
        <Card x={196} y={126} w={190} h={108} t="indigo">
          <AgentMark x={16} y={16} r={7} />
          <Txt x={28} y={20} size={9.5} weight={600} color={C.indigo}>
            {t.who}
          </Txt>
          <Lines x={10} y={44} lines={t.answer} size={10} color={C.ink} />
          <Show at={5} dy={0}>
            <Chip x={10} y={76} text={t.source} t="solid" size={8.5} />
          </Show>
        </Card>
      </Show>
    </Scene>
  );
}
