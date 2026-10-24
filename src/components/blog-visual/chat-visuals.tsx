"use client";

/**
 * WhatsApp chat on an iPhone, seen from the customer's phone. Exemplar: the ZapBot scene in the
 * homepage case studies (sections/case-studies/scenes.tsx): beige chat, white incoming, green outgoing.
 * The hero opens on the finished conversation, then replays it bubble by bubble with typing in between.
 */
import { useEffect, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { ArrowDown, BatteryFull, BookOpen, Camera, CheckCheck, ChevronLeft, Mic, Moon, Package, Phone, Plus, Signal, Store, Sun, UserRound, Video, Wifi } from "lucide-react";
import { Eyebrow } from "@/components/oplossingen/shared";
import { chatExamples, type ChatMsg } from "@/lib/blog-webshop";

const SPRING = { type: "spring", stiffness: 260, damping: 24 } as const;
const IOS_FONT = { fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Text", "Helvetica Neue", system-ui, sans-serif' };
const IOS_BLUE = "text-[#007aff]";

function Tail({ me }: { me: boolean }) {
  return (
    <svg viewBox="0 0 8 13" aria-hidden="true" className={`absolute top-0 h-[13px] w-2 ${me ? "-right-2" : "-left-2"}`}>
      {me ? <path d="M5.188 1H0v11.193l6.467-8.625C7.526 2.156 6.958 1 5.188 1z" fill="#d9fdd3" /> : <path d="M1.533 3.568L8 12.193V1H2.812C1.042 1 .474 2.156 1.533 3.568z" fill="#fff" />}
    </svg>
  );
}

function Bubble({ m, tail, animate = false }: { m: Pick<ChatMsg, "from" | "text" | "time" | "link">; tail: boolean; animate?: boolean }) {
  const me = m.from === "klant";
  const inner = (
    <div
      className={`relative max-w-[82%] rounded-[10px] px-2.5 pb-1.5 pt-1.5 text-[14.5px] leading-[1.32] text-[#111b21] shadow-[0_1px_0.5px_rgba(11,20,26,0.13)] ${
        me ? "bg-[#d9fdd3]" : "bg-white"
      } ${tail ? (me ? "rounded-tr-none" : "rounded-tl-none") : ""}`}
    >
      {tail && <Tail me={me} />}
      <span className="sr-only">{me ? "Klant: " : "Webshop: "}</span>
      {m.text}
      {m.link && (
        <span className="mt-1.5 flex items-center gap-2 rounded-md bg-black/[0.05] px-2 py-1.5 text-[13px] font-medium text-[#027eb5]">
          <Package className="h-4 w-4 shrink-0" strokeWidth={1.8} />
          {m.link}
        </span>
      )}
      <span className="relative top-[5px] float-right ml-2 inline-flex items-center gap-0.5 text-[11px] leading-none text-[#667781]">
        {m.time}
        {me && <CheckCheck className="h-3.5 w-3.5 text-[#53bdeb]" strokeWidth={2} />}
      </span>
    </div>
  );
  const row = `flex ${me ? "justify-end pr-2" : "justify-start pl-2"} ${tail ? "mt-1.5" : "mt-0.5"}`;
  if (!animate) return <div className={row}>{inner}</div>;
  return (
    <motion.div layout className={row} initial={{ opacity: 0, y: 10, scale: 0.96 }} animate={{ opacity: 1, y: 0, scale: 1 }} exit={{ opacity: 0 }} transition={SPRING}>
      {inner}
    </motion.div>
  );
}

function TypingBubble() {
  return (
    <motion.div layout className="mt-1.5 flex justify-start pl-2" initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} transition={SPRING}>
      <span className="relative inline-flex gap-1 rounded-[10px] rounded-tl-none bg-white px-3.5 py-3 text-[#8696a0] shadow-[0_1px_0.5px_rgba(11,20,26,0.13)]">
        <Tail me={false} />
        {[0, 1, 2].map((i) => (
          <span key={i} className="bx-dot h-2 w-2 rounded-full bg-current" style={{ animationDelay: `${i * 0.18}s` }} />
        ))}
      </span>
    </motion.div>
  );
}

function ChatHeader({ typing }: { typing: boolean }) {
  return (
    <div className="flex items-center gap-2 border-b border-black/[0.08] bg-[#f6f6f6] px-2 py-2">
      <ChevronLeft className={`h-6 w-6 ${IOS_BLUE}`} strokeWidth={2.2} />
      <span className="flex h-8 w-8 items-center justify-center rounded-full bg-[#25d366] text-white">
        <Store className="h-4 w-4" strokeWidth={2} />
      </span>
      <span className="min-w-0 flex-1 leading-tight">
        <span className="block truncate text-[15px] font-semibold text-black">Jouw webshop</span>
        <span className="block text-[11.5px] text-[#667781]">{typing ? "typt…" : "online"}</span>
      </span>
      <Video className={`h-[22px] w-[22px] ${IOS_BLUE}`} strokeWidth={1.8} />
      <Phone className={`ml-3 mr-1 h-5 w-5 ${IOS_BLUE}`} strokeWidth={1.8} />
    </div>
  );
}

/** Opens on the full conversation, then replays it: customer bubbles land, the shop types before each reply. */
function usePlayback(messages: ChatMsg[]) {
  const reduce = useReducedMotion();
  const n = messages.length;
  const [st, setSt] = useState({ shown: n, typing: false });
  useEffect(() => {
    if (reduce) return;
    let next: typeof st;
    let wait: number;
    if (st.shown >= n) [next, wait] = [{ shown: 1, typing: false }, 6000];
    else if (st.typing) [next, wait] = [{ shown: st.shown + 1, typing: false }, 1200];
    else if (messages[st.shown].from === "shop") [next, wait] = [{ shown: st.shown, typing: true }, 700];
    else [next, wait] = [{ shown: st.shown + 1, typing: false }, 1600];
    const t = window.setTimeout(() => setSt(next), wait);
    return () => clearTimeout(t);
  }, [st, n, messages, reduce]);
  return st;
}

function Messages({ messages, shown, typing, animate }: { messages: ChatMsg[]; shown: number; typing: boolean; animate: boolean }) {
  const list = messages.slice(0, shown).map((m, i) => (
    <Bubble key={i} m={m} tail={i === 0 || messages[i - 1].from !== m.from} animate={animate} />
  ));
  return (
    <div className="flex flex-col justify-end bg-[#efeae2] pb-2.5 pt-2" style={{ backgroundImage: "radial-gradient(rgba(0,0,0,0.035) 1px, transparent 1px)", backgroundSize: "14px 14px" }}>
      <div className="mx-auto mb-1 rounded-md bg-white/90 px-2 py-0.5 text-[11px] font-medium text-[#54656f] shadow-[0_1px_0.5px_rgba(11,20,26,0.13)]">Vandaag</div>
      {animate ? (
        <AnimatePresence initial={false}>
          {list}
          {typing && <TypingBubble key="typing" />}
        </AnimatePresence>
      ) : (
        list
      )}
    </div>
  );
}

/** Hero: an iPhone with the WhatsApp conversation about a late order. */
export function ChatHero() {
  const msgs = chatExamples[0].messages;
  const { shown, typing } = usePlayback(msgs);
  return (
    <div className="relative mx-auto w-full max-w-[350px]" style={IOS_FONT}>
      <div aria-hidden="true" className="absolute -inset-8 rounded-[60px] bg-[radial-gradient(55%_55%_at_40%_35%,rgba(37,211,102,0.18),transparent),radial-gradient(45%_45%_at_70%_80%,rgba(99,91,255,0.16),transparent)]" />
      <div className="relative rounded-[52px] bg-[#1d1d1f] p-[9px] shadow-[0_50px_90px_-40px_rgba(23,23,28,0.7)] ring-1 ring-black/40">
        <div className="overflow-hidden rounded-[44px] bg-[#f6f6f6]">
          {/* status bar with the island */}
          <div className="relative flex h-11 items-center justify-between px-7 text-[14px] font-semibold text-black">
            <span>21:48</span>
            <span aria-hidden="true" className="absolute left-1/2 top-2.5 h-[26px] w-[96px] -translate-x-1/2 rounded-full bg-black" />
            <span aria-hidden="true" className="flex items-center gap-1">
              <Signal className="h-3.5 w-3.5" strokeWidth={2.5} />
              <Wifi className="h-3.5 w-3.5" strokeWidth={2.5} />
              <BatteryFull className="h-4 w-4" strokeWidth={2} />
            </span>
          </div>
          <ChatHeader typing={typing} />
          <div className="flex h-[440px] flex-col justify-end overflow-hidden bg-[#efeae2]">
            <Messages messages={msgs} shown={shown} typing={typing} animate />
          </div>
          {/* input bar and home indicator */}
          <div aria-hidden="true" className="flex items-center gap-2.5 bg-[#f6f6f6] px-3 pb-2 pt-2">
            <Plus className={`h-6 w-6 ${IOS_BLUE}`} strokeWidth={1.8} />
            <span className="h-8 flex-1 rounded-full border border-black/[0.1] bg-white" />
            <Camera className={`h-[22px] w-[22px] ${IOS_BLUE}`} strokeWidth={1.8} />
            <Mic className={`h-[22px] w-[22px] ${IOS_BLUE}`} strokeWidth={1.8} />
          </div>
          <div aria-hidden="true" className="flex justify-center bg-[#f6f6f6] pb-2 pt-1">
            <span className="h-[5px] w-32 rounded-full bg-black" />
          </div>
        </div>
      </div>
    </div>
  );
}

/** The two questions every webshop gets, each with the rule the answers came from. */
export function ChatExamples() {
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:gap-5" style={IOS_FONT}>
      {chatExamples.map((ex) => (
        <article key={ex.tag} className="overflow-hidden rounded-[24px] border border-black/[0.07] bg-white shadow-[0_24px_50px_-40px_rgba(70,55,210,0.35)]">
          <div className="flex items-center gap-2 bg-white px-4 py-3">
            <BookOpen className="h-4 w-4 shrink-0 text-primary" strokeWidth={1.8} />
            <span className="text-[12.5px] leading-snug text-[#3f3f46]">
              <span className="font-semibold">Jouw regel:</span> {ex.rule}
            </span>
            <span className="ml-auto shrink-0 rounded-full bg-[#f5f5f7] px-2.5 py-1 text-[11px] font-semibold text-[#6e6e73]">{ex.tag}</span>
          </div>
          <ChatHeader typing={false} />
          <Messages messages={ex.messages} shown={ex.messages.length} typing={false} animate={false} />
        </article>
      ))}
    </div>
  );
}

/** Day and night on the easy questions; the hard ones land with you, summarised. */
export function Handover() {
  return (
    <section className="border-t border-black/[0.07] bg-white py-12 sm:py-20">
      <div className="container mx-auto max-w-6xl px-4 sm:px-6">
        <Eyebrow>Dag en nacht</Eyebrow>
        <h2 className="text-[26px] font-bold leading-tight tracking-[-0.02em] text-[#1d1d1f] [hyphens:none] sm:text-4xl">Makkelijk zelf, lastig naar jou</h2>
        <div className="mt-6 grid gap-3 sm:mt-10 sm:gap-4 lg:grid-cols-5">
          <div className="flex flex-col justify-between rounded-[24px] bg-[#1d1d1f] p-6 text-[#a1a1a6] lg:col-span-2">
            <div className="flex gap-2 text-[#a5b4fc]">
              <Sun className="h-5 w-5" strokeWidth={1.8} />
              <Moon className="h-5 w-5" strokeWidth={1.8} />
            </div>
            <div className="mt-6 text-[72px] font-extrabold leading-none tracking-[-0.05em] text-white">24/7</div>
            <div className="mt-2 text-[15px]">Bezorging, retour, maten: direct antwoord, ook om 23:00.</div>
          </div>

          <div className="rounded-[24px] bg-[#efeae2] p-3 sm:p-6 lg:col-span-3" style={IOS_FONT}>
            <Bubble m={{ from: "klant", time: "22:31", text: "Mijn jas is kapot aangekomen. Dit is al de tweede keer!" }} tail />
            <div className="my-3 flex items-center justify-center gap-2 text-[12px] font-semibold text-primary">
              <ArrowDown className="h-4 w-4" />
              Gaat naar jou
            </div>
            <div className="rounded-2xl border border-primary/30 bg-white p-4 shadow-[0_24px_50px_-36px_rgba(70,55,210,0.6)]">
              <div className="flex items-center gap-2">
                <span className="flex h-7 w-7 items-center justify-center rounded-full bg-[#ecebfc] text-primary">
                  <UserRound className="h-4 w-4" strokeWidth={1.8} />
                </span>
                <span className="text-[13px] font-semibold text-[#1d1d1f]">Voor jou, met samenvatting</span>
                <span className="ml-auto rounded-full bg-[#fff1e6] px-2 py-0.5 text-[11px] font-semibold text-[#c2410c]">Klant boos</span>
              </div>
              <ul className="mt-3 space-y-1.5 text-[#3f3f46] [&>li]:text-[13.5px]">
                <li>Jas kapot aangekomen, voor de tweede keer.</li>
                <li>Klant wil een nieuwe jas, geen retour.</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
