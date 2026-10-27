"use client";

import { Lock } from "lucide-react";
import type { Lang } from "@/lib/solutions";
import { AgentMark, Avatar, Bubble, C, Card, Check, Chip, Glyph, Lines, Scene, Show, Txt } from "./kit";

const T = {
  nl: {
    title: "Eigen bedrijfs-AI",
    label: "Een stagiair vraagt wat de directeur verdient. De vraag gaat langs vijf controles: aanmelden, invoercontrole, documenten per rol, rechtencheck en logboek. De rechtencheck stopt de vraag, want salarissen zijn alleen voor HR. De assistent antwoordt dat hij dit niet mag laten zien.",
    q: ["Wat verdient de", "directeur?"],
    who: "Stagiair",
    checks: "Controles",
    rows: [
      { name: "Aanmelden", note: "stagiair", t: "green" },
      { name: "Invoercontrole", note: "in orde", t: "green" },
      { name: "Documenten per rol", note: "salarissen verborgen", t: "amber" },
      { name: "Rechtencheck", note: "alleen HR", t: "red" },
      { name: "Logboek", note: "vastgelegd", t: "green" },
    ],
    agent: "Assistent",
    answer: ["Salarissen mag ik je", "niet laten zien.", "Vraag het HR."],
    stop: "Gestopt bij de rechtencheck",
  },
  en: {
    title: "Your own company AI",
    label: "An intern asks what the director earns. The question passes five checks: sign-in, input check, documents per role, access check and log. The access check stops it, because salaries are for HR only. The assistant answers that it may not show this.",
    q: ["What does the", "director earn?"],
    who: "Intern",
    checks: "Checks",
    rows: [
      { name: "Sign-in", note: "intern", t: "green" },
      { name: "Input check", note: "fine", t: "green" },
      { name: "Documents per role", note: "salaries hidden", t: "amber" },
      { name: "Access check", note: "HR only", t: "red" },
      { name: "Log", note: "recorded", t: "green" },
    ],
    agent: "Assistant",
    answer: ["I may not show", "you salaries.", "Please ask HR."],
    stop: "Stopped at the access check",
  },
} as const;

const RY = 28; // first row, inside the checks card
const RH = 36;

export default function BedrijfsAi({ lang, still }: { lang: Lang; still?: boolean }) {
  const t = T[lang];
  return (
    <Scene title={t.title} label={t.label} steps={7} still={still} tick={900}>
      {/* the question */}
      <Show at={1}>
        <Avatar x={26} y={56} initial={t.who[0]} t="muted" r={9} />
        <Txt x={40} y={59.5} size={9} weight={600} color={C.muted}>
          {t.who}
        </Txt>
        <Bubble x={14} y={72} w={150} lines={[...t.q]} size={10.5} />
      </Show>

      {/* the checks, one after another */}
      <Card x={184} y={40} w={202} h={RY + RH * 5 + 4}>
        <Txt x={12} y={18} size={9} weight={700} color={C.faint}>
          {t.checks.toUpperCase()}
        </Txt>
        {t.rows.map((r, i) => {
          const y = RY + i * RH;
          const bad = r.t === "red";
          return (
            <g key={r.name}>
              {i > 0 && <line x1={12} x2={190} y1={y - 4} y2={y - 4} stroke={C.line} />}
              <Txt x={12} y={y + 14} size={10} weight={600} color={C.ink}>
                {r.name}
              </Txt>
              <Show at={2 + i} dx={-6} dy={0}>
                {bad ? <Glyph icon={Lock} x={180} y={y + 5} s={11} color="#b91c1c" /> : <Check x={186} y={y + 10} r={6} t={r.t === "amber" ? "amber" : "green"} />}
                <Txt x={12} y={y + 27} size={8.5} weight={500} color={bad ? "#b91c1c" : r.t === "amber" ? "#b45309" : C.muted}>
                  {r.note}
                </Txt>
              </Show>
            </g>
          );
        })}
      </Card>

      {/* the answer */}
      <Show at={6} dx={0} dy={8}>
        <Card x={14} y={150} w={150} h={84} t="indigo">
          <AgentMark x={16} y={16} r={7} />
          <Txt x={28} y={20} size={9.5} weight={600} color={C.indigo}>
            {t.agent}
          </Txt>
          <Lines x={10} y={40} lines={[...t.answer]} size={10} gap={13} color={C.ink} />
        </Card>
      </Show>
      <Show at={7} dy={0}>
        <Chip x={14} y={244} text={t.stop} t="red" size={8.5} dot />
      </Show>
    </Scene>
  );
}
