"use client";

import { AlertTriangle } from "lucide-react";
import type { Lang } from "@/lib/solutions";
import { Bar, C, Card, Glyph, Lines, Scene, Show, Txt, tone, type Tone } from "./kit";

const T = {
  nl: {
    title: "Contract-check",
    label: "Een contract wordt artikel voor artikel gelezen. De agent markeert een onbeperkte aansprakelijkheid, een lange opzegtermijn en een ontbrekende verwerkersclausule.",
    doc: "Overeenkomst",
    arts: ["Art. 4 Looptijd", "Art. 7 Aansprakelijkheid", "Art. 9 Opzegging", "Art. 12 Privacy"],
    head: "3 punten om na te lopen",
    flags: [
      { t: "red", k: "Hoog risico", l: ["Art. 7: aansprakelijkheid", "is onbeperkt."] },
      { t: "amber", k: "Let op", l: ["Art. 9: opzegtermijn", "van 6 maanden."] },
      { t: "amber", k: "Ontbreekt", l: ["Art. 12: geen", "verwerkersclausule."] },
    ],
  },
  en: {
    title: "Contract check",
    label: "A contract is read clause by clause. The agent flags unlimited liability, a long notice period and a missing data processing clause.",
    doc: "Agreement",
    arts: ["Art. 4 Term", "Art. 7 Liability", "Art. 9 Termination", "Art. 12 Privacy"],
    head: "3 points to review",
    flags: [
      { t: "red", k: "High risk", l: ["Art. 7: liability is", "unlimited."] },
      { t: "amber", k: "Note", l: ["Art. 9: notice period", "of 6 months."] },
      { t: "amber", k: "Missing", l: ["Art. 12: no data", "processing clause."] },
    ],
  },
};

const AY = [44, 96, 148, 200];
const FLAGGED = [1, 2, 3];

export default function Contract({ lang, still }: { lang: Lang; still?: boolean }) {
  const t = T[lang];
  return (
    <Scene title={t.title} label={t.label} steps={6} still={still} tick={1000}>
      <Card x={14} y={40} w={196} h={250} r={6}>
        <Txt x={14} y={24} size={11} weight={700}>
          {t.doc}
        </Txt>
        {t.arts.map((a, i) => {
          const fi = FLAGGED.indexOf(i);
          const ft = fi >= 0 ? (t.flags[fi].t as Tone) : null;
          return (
            <g key={a} transform={`translate(0 ${AY[i]})`}>
              {ft && (
                <Show at={2 + fi} dy={0}>
                  <rect x={6} y={-6} width={184} height={46} rx={5} fill={tone(ft).fill} stroke={tone(ft).stroke} />
                </Show>
              )}
              <Txt x={14} y={8} size={9} weight={700} color={C.ink}>
                {a}
              </Txt>
              <Bar x={14} y={15} w={160} h={4} />
              <Bar x={14} y={23} w={150} h={4} />
              <Bar x={14} y={31} w={i === 3 ? 60 : 110} h={4} />
            </g>
          );
        })}
      </Card>

      <Show at={1}>
        <Txt x={224} y={56} size={10.5} weight={700}>
          {t.head}
        </Txt>
      </Show>
      {t.flags.map((f, i) => {
        const s = tone(f.t as Tone);
        return (
          <Show key={i} at={2 + i} dx={8} dy={0}>
            <Card x={222} y={68 + i * 74} w={164} h={64} t={f.t as Tone}>
              <Glyph icon={AlertTriangle} x={10} y={9} s={11} color={s.text} />
              <Txt x={26} y={18} size={9} weight={700} color={s.text}>
                {f.k}
              </Txt>
              <Lines x={10} y={36} lines={f.l} size={10} color={C.ink} />
            </Card>
          </Show>
        );
      })}
    </Scene>
  );
}
