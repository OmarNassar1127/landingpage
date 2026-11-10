"use client";

import React, { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useInView, useReducedMotion } from "framer-motion";
import { Check, FileText } from "lucide-react";

type Lang = "nl" | "en";

type Mail = {
  name: string;
  initials: string;
  tint: string;
  subject: string;
  time: string;
  question: string;
  reply: string;
  source: string;
};

const MAILS: Record<Lang, Mail[]> = {
  nl: [
    {
      name: "Lotte Bakker",
      initials: "LB",
      tint: "#F6E3D3",
      subject: "Retour na 30 dagen",
      time: "09:41",
      question: "Kan ik mijn bestelling na 30 dagen nog retourneren?",
      reply:
        "Hoi Lotte, retourneren kan tot 30 dagen na ontvangst. Ben je net over die termijn? Stuur je ordernummer, dan kijken we of ruilen nog lukt.",
      source: "uit jullie retourvoorwaarden",
    },
    {
      name: "Daan Visser",
      initials: "DV",
      tint: "#DDE7F3",
      subject: "Wanneer komt mijn pakket?",
      time: "10:02",
      question: "Ik heb gisteren besteld. Wanneer wordt het bezorgd?",
      reply:
        "Hoi Daan, je bestelling is gisteren voor 22:00 binnengekomen en vandaag verzonden. Je pakket komt morgen. De track & trace staat in je bevestigingsmail.",
      source: "uit jullie verzendinformatie",
    },
    {
      name: "Mila de Jong",
      initials: "MJ",
      tint: "#E4E9DA",
      subject: "Adres wijzigen",
      time: "10:17",
      question: "Ik ben net verhuisd. Kan ik het bezorgadres nog aanpassen?",
      reply:
        "Hoi Mila, zolang je bestelling nog niet verzonden is, passen we het adres aan. Stuur je nieuwe adres en ordernummer, dan zet ik het direct om.",
      source: "uit jullie veelgestelde vragen",
    },
  ],
  en: [
    {
      name: "Lotte Bakker",
      initials: "LB",
      tint: "#F6E3D3",
      subject: "Return after 30 days",
      time: "09:41",
      question: "Can I still return my order after 30 days?",
      reply:
        "Hi Lotte, you can return items up to 30 days after delivery. Just past that? Send us your order number and we'll see if an exchange still works.",
      source: "from your return policy",
    },
    {
      name: "Daan Visser",
      initials: "DV",
      tint: "#DDE7F3",
      subject: "When will my parcel arrive?",
      time: "10:02",
      question: "I ordered yesterday. When will it be delivered?",
      reply:
        "Hi Daan, your order came in before 22:00 yesterday and shipped today, so it arrives tomorrow. The tracking link is in your confirmation email.",
      source: "from your shipping info",
    },
    {
      name: "Mila de Jong",
      initials: "MJ",
      tint: "#E4E9DA",
      subject: "Change of address",
      time: "10:17",
      question: "I just moved. Can I still change the delivery address?",
      reply:
        "Hi Mila, as long as your order hasn't shipped, we can change the address. Send your new address and order number and I'll update it right away.",
      source: "from your FAQ",
    },
  ],
};

const UI = {
  nl: {
    draft: "Concept-antwoord",
    edit: "Aanpassen",
    approve: "Goedkeuren",
    approved: "Goedgekeurd",
    counter: (n: number) => (
      <>
        voorbeeld ·<Digit n={n} /> van 20 zo te versturen
      </>
    ),
  },
  en: {
    draft: "Draft reply",
    edit: "Edit",
    approve: "Approve",
    approved: "Approved",
    counter: (n: number) => (
      <>
        example ·<Digit n={n} /> of 20 ready to send
      </>
    ),
  },
};

// Timeline of one card, in ms from the moment it appears. One loop of three
// cards takes about 3 x 7.6 s, each card is one complete "mail in, reply out".
const T = {
  question: 350,
  typeStart: 1100,
  typeMs: 3000,
  source: 4300,
  cursorIn: 4800,
  press: 5750,
  approved: 5950,
  exit: 7300,
};
const STATIC_T = T.source + 200; // reduced motion: finished draft, nothing moving
const COUNT_BASE = 11;

const spring = { type: "spring", bounce: 0, duration: 0.7 } as const;

function Digit({ n }: { n: number }) {
  return (
    // One layer only: the old number unmounts, the new one fades in, in a fixed 2ch slot.
    <span className="mx-[0.3em] inline-block w-[2ch] text-center tabular-nums font-semibold text-zinc-900">
      <motion.span key={n} className="inline-block" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.25 }}>
        {n}
      </motion.span>
    </span>
  );
}

function Cursor() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" aria-hidden="true" className="drop-shadow-[0_2px_3px_rgba(30,20,10,0.25)]">
      <path
        d="M5 3.2 19.4 12l-6.3 1.4 3.6 6.6-2.6 1.4-3.6-6.6L5.8 19.2z"
        fill="#18181b"
        stroke="#fff"
        strokeWidth="1.4"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function CardBody({ mail, t, lang, still }: { mail: Mail; t: number; lang: Lang; still?: boolean }) {
  const ui = UI[lang];
  const typed = Math.round(
    Math.min(1, Math.max(0, (t - T.typeStart) / T.typeMs)) * mail.reply.length,
  );
  const typing = t >= T.typeStart && typed < mail.reply.length;
  const showQuestion = t >= T.question;
  const sourceOn = t >= T.source;
  const cursorOn = t >= T.cursorIn && t < T.exit - 300;
  const pressed = t >= T.press && t < T.approved + 120;
  const approved = t >= T.approved;

  return (
    <div className="rounded-[28px] bg-white p-5 sm:p-7 ring-1 ring-zinc-900/[0.06] shadow-[0_1px_2px_rgba(60,40,20,0.05),0_12px_32px_-12px_rgba(60,40,20,0.16),0_40px_80px_-32px_rgba(79,70,229,0.22)]">
      {/* Sender */}
      <div className="flex items-center gap-3">
        <div
          className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full text-[13px] font-semibold text-zinc-700"
          style={{ background: mail.tint }}
        >
          {mail.initials}
        </div>
        <div className="min-w-0 flex-1">
          <div className="flex items-baseline justify-between gap-2">
            <span className="truncate text-[15px] font-semibold text-zinc-900">{mail.name}</span>
            <span className="shrink-0 text-[12px] tabular-nums text-zinc-400">{mail.time}</span>
          </div>
          <div className="truncate text-[13px] text-zinc-500">{mail.subject}</div>
        </div>
      </div>

      {/* Question */}
      <motion.p
        initial={false}
        animate={{ opacity: showQuestion ? 1 : 0, y: showQuestion ? 0 : 6 }}
        transition={still ? { duration: 0 } : spring}
        className="mt-4 text-[17px] sm:text-[19px] leading-snug tracking-[-0.01em] text-zinc-900"
      >
        {mail.question}
      </motion.p>

      {/* Draft */}
      <div className="mt-5 rounded-2xl bg-[#F7F7FB] p-4 sm:p-5 ring-1 ring-indigo-950/[0.04]">
        <div className="mb-2 flex items-center gap-2 text-[12px] font-medium text-zinc-500">
          <span className="h-1.5 w-1.5 rounded-full bg-indigo-500" />
          {ui.draft}
        </div>
        <p className="text-[15px] leading-relaxed text-zinc-700">
          {mail.reply.slice(0, typed)}
          {(typing || (t >= T.question && t < T.typeStart)) && (
            <span className="hero-caret ml-px inline-block h-[1.05em] w-[2px] translate-y-[2px] rounded-full bg-indigo-500" />
          )}
          <span className="text-transparent">{mail.reply.slice(typed)}</span>
        </p>
        <motion.div
          initial={false}
          animate={{
            opacity: sourceOn ? 1 : 0.35,
            scale: sourceOn ? 1 : 0.96,
            backgroundColor: sourceOn ? "rgba(99,102,241,0.10)" : "rgba(24,24,27,0.04)",
            color: sourceOn ? "#4338CA" : "#a1a1aa",
          }}
          transition={still ? { duration: 0 } : spring}
          className="mt-3 inline-flex origin-left items-center gap-1.5 rounded-full px-2.5 py-1 text-[12px] font-medium"
        >
          <FileText className="h-3.5 w-3.5" strokeWidth={2} />
          {mail.source}
        </motion.div>
      </div>

      {/* Actions */}
      <div className="mt-5 flex items-center justify-end gap-2">
        <span className="rounded-full px-4 py-2.5 text-[14px] font-medium text-zinc-500">{ui.edit}</span>
        <div className="relative">
          <motion.span
            initial={false}
            animate={{
              scale: pressed ? 0.94 : 1,
              backgroundColor: approved ? "#4F46E5" : "#18181b",
            }}
            transition={{ type: "spring", bounce: 0, duration: 0.25 }}
            className="relative flex min-w-[9.5rem] items-center justify-center gap-1.5 overflow-hidden rounded-full px-5 py-2.5 text-[14px] font-semibold text-white"
          >
            <AnimatePresence initial={false} mode="popLayout">
              {approved ? (
                <motion.span
                  key="ok"
                  initial={{ y: 14, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ type: "spring", bounce: 0.3, duration: 0.45 }}
                  className="flex items-center gap-1.5"
                >
                  <Check className="h-4 w-4" strokeWidth={3} />
                  {ui.approved}
                </motion.span>
              ) : (
                <motion.span key="go" exit={{ y: -14, opacity: 0 }} transition={{ duration: 0.2 }}>
                  {ui.approve}
                </motion.span>
              )}
            </AnimatePresence>
          </motion.span>
          {!still && (
            <motion.div
              initial={false}
              animate={
                cursorOn
                  ? { x: 0, y: 0, opacity: 1, scale: pressed ? 0.85 : 1 }
                  : { x: 70, y: 60, opacity: 0, scale: 1 }
              }
              transition={{ type: "spring", bounce: 0, duration: cursorOn ? 0.9 : 0.5 }}
              className="pointer-events-none absolute left-[74%] top-[58%]"
            >
              <Cursor />
            </motion.div>
          )}
        </div>
      </div>
    </div>
  );
}

export default function HeroMailCard({ lang }: { lang: Lang }) {
  const mails = MAILS[lang];
  const reduce = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { margin: "-10% 0px" });
  const [idx, setIdx] = useState(0);
  const [t, setT] = useState(0);
  const tRef = useRef(0);
  const idxRef = useRef(0);

  useEffect(() => {
    if (reduce || !inView) return;
    let raf = 0;
    let last = performance.now();
    const tick = (now: number) => {
      const dt = Math.min(250, now - last); // a hidden tab must not skip the loop ahead
      last = now;
      tRef.current += dt;
      if (tRef.current >= T.exit) {
        tRef.current = 0;
        idxRef.current = (idxRef.current + 1) % mails.length;
        setIdx(idxRef.current);
      }
      setT(tRef.current);
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [reduce, inView, mails.length]);

  const still = !!reduce;
  const shownT = still ? STATIC_T : t;
  const shownIdx = still ? 0 : idx;
  const count = still ? 14 : COUNT_BASE + idx + (t >= T.approved ? 1 : 0);

  return (
    <div
      ref={ref}
      role="img"
      aria-label={
        lang === "nl"
          ? "Voorbeeld: een klantmail krijgt een concept-antwoord uit de retourvoorwaarden, dat je met één klik goedkeurt."
          : "Example: a customer email gets a draft reply from the return policy, which you approve with one click."
      }
      className="relative mx-auto w-full max-w-[34rem]"
    >
      <div className="mb-4 flex justify-center lg:justify-start">
        <span className="inline-flex items-center rounded-full bg-white/70 px-3.5 py-1.5 text-[13px] text-zinc-500 ring-1 ring-zinc-900/[0.06] backdrop-blur">
          {UI[lang].counter(count)}
        </span>
      </div>

      <div className="relative">
        {/* The queue behind: two waiting mails give the card its depth. */}
        <div aria-hidden className="absolute inset-x-6 -bottom-3 top-6 rounded-[28px] bg-white/80 ring-1 ring-zinc-900/[0.05] shadow-[0_12px_32px_-16px_rgba(60,40,20,0.14)]" />
        <div aria-hidden className="absolute inset-x-12 -bottom-6 top-12 rounded-[28px] bg-white/60 ring-1 ring-zinc-900/[0.04]" />

        <div className="relative grid [&>*]:col-start-1 [&>*]:row-start-1">
          {/* Sizer: the tallest mail reserves the height so nothing below jumps. */}
          {mails.map((m, i) => (
            <div key={`s${i}`} aria-hidden className="invisible">
              <CardBody mail={m} t={T.exit} lang={lang} still />
            </div>
          ))}
          <AnimatePresence initial={false}>
            <motion.div
              key={shownIdx}
              initial={{ opacity: 0, y: 26, scale: 0.955 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -36, scale: 0.98, transition: { type: "spring", bounce: 0, duration: 0.55 } }}
              transition={{ ...spring, delay: 0.25 }}
              className="origin-bottom"
            >
              <CardBody mail={mails[shownIdx]} t={shownT} lang={lang} still={still} />
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
