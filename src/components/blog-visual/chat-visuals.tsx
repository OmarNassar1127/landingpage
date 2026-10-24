import { ArrowDown, BookOpen, Moon, Sun, UserRound } from "lucide-react";
import { Eyebrow } from "@/components/oplossingen/shared";
import { chatExamples } from "@/lib/blog-webshop";

function Bubble({ from, children, className = "" }: { from: "klant" | "shop"; children: React.ReactNode; className?: string }) {
  const shop = from === "shop";
  return (
    <div className={`flex ${shop ? "justify-end" : "justify-start"} ${className}`}>
      <p
        className={`max-w-[85%] rounded-[20px] px-3.5 py-2.5 text-[13.5px] leading-snug ${
          shop ? "rounded-br-md bg-primary text-white" : "rounded-bl-md bg-[#e9e9eb] text-[#1d1d1f]"
        }`}
      >
        <span className="sr-only">{shop ? "Assistent: " : "Klant: "}</span>
        {children}
      </p>
    </div>
  );
}

function ChatHeader() {
  return (
    <div className="flex items-center gap-2.5 border-b border-black/[0.06] px-4 py-3">
      <span className="flex h-8 w-8 items-center justify-center rounded-full bg-primary text-xs font-bold text-white">W</span>
      <div className="leading-tight">
        <p className="text-[13px] font-semibold text-[#1d1d1f]">Webshop klantenservice</p>
        <p className="flex items-center gap-1 text-[11px] text-[#34c759]">
          <span className="h-1.5 w-1.5 rounded-full bg-[#34c759]" />
          Altijd bereikbaar
        </p>
      </div>
    </div>
  );
}

/** Hero: a phone chat. The customer asks, the assistant types, the answer lands. */
export function ChatHero() {
  const ex = chatExamples[0];
  return (
    <div className="relative mx-auto max-w-[360px]">
      <div aria-hidden="true" className="absolute -inset-6 rounded-[48px] bg-[radial-gradient(60%_60%_at_50%_40%,rgba(99,91,255,0.18),transparent)]" />
      <div className="relative overflow-hidden rounded-[40px] border-[6px] border-[#1d1d1f] bg-white shadow-[0_40px_80px_-40px_rgba(29,29,31,0.6)]">
        <div aria-hidden="true" className="mx-auto mt-2 h-5 w-24 rounded-full bg-[#1d1d1f]" />
        <ChatHeader />
        <div className="flex flex-col gap-2.5 px-3 py-4">
          <Bubble from="klant">{ex.customer}</Bubble>
          <div className="grid">
            <div aria-hidden="true" className="bx-typing col-start-1 row-start-1 flex items-start justify-end">
              <span className="inline-flex gap-1 rounded-[20px] rounded-br-md bg-primary/15 px-4 py-3 text-primary">
                {[0, 1, 2].map((i) => (
                  <span key={i} className="bx-dot h-1.5 w-1.5 rounded-full bg-current" style={{ animationDelay: `${i * 0.18}s` }} />
                ))}
              </span>
            </div>
            <Bubble from="shop" className="bx-reply col-start-1 row-start-1">
              {ex.reply}
            </Bubble>
          </div>
          <p className="bx-reply text-right text-[10px] text-[#8e8e93]">Beantwoord om 23:14</p>
        </div>
      </div>
    </div>
  );
}

/** The two questions every webshop gets, each with the rule the answer came from. */
export function ChatExamples() {
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:gap-5">
      {chatExamples.map((ex) => (
        <article key={ex.tag} className="overflow-hidden rounded-[24px] border border-black/[0.07] bg-white shadow-[0_24px_50px_-40px_rgba(70,55,210,0.35)]">
          <div className="flex items-center gap-2 bg-[#f5f5f7] px-4 py-3">
            <BookOpen className="h-4 w-4 shrink-0 text-primary" strokeWidth={1.8} />
            <p className="text-[12.5px] leading-snug text-[#3f3f46]">
              <span className="font-semibold">Jouw regel:</span> {ex.rule}
            </p>
            <span className="ml-auto shrink-0 rounded-full bg-white px-2.5 py-1 text-[11px] font-semibold text-[#6e6e73]">{ex.tag}</span>
          </div>
          <div className="flex flex-col gap-2.5 p-4">
            <Bubble from="klant">{ex.customer}</Bubble>
            <Bubble from="shop">{ex.reply}</Bubble>
          </div>
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
            <p className="mt-6 text-[72px] font-extrabold leading-none tracking-[-0.05em] text-white">24/7</p>
            <p className="mt-2 text-[15px]">Bezorging, retour, maten: direct antwoord, ook om 23:00.</p>
          </div>

          <div className="rounded-[24px] bg-[#f5f5f7] p-4 sm:p-6 lg:col-span-3">
            <Bubble from="klant">Mijn jas is kapot aangekomen. Dit is de tweede keer!</Bubble>
            <div className="my-3 flex items-center justify-center gap-2 text-[12px] font-semibold text-primary">
              <ArrowDown className="h-4 w-4" />
              Gaat naar jou
            </div>
            <div className="rounded-2xl border border-primary/30 bg-white p-4 shadow-[0_24px_50px_-36px_rgba(70,55,210,0.6)]">
              <div className="flex items-center gap-2">
                <span className="flex h-7 w-7 items-center justify-center rounded-full bg-[#ecebfc] text-primary">
                  <UserRound className="h-4 w-4" strokeWidth={1.8} />
                </span>
                <p className="text-[13px] font-semibold text-[#1d1d1f]">Voor jou, met samenvatting</p>
                <span className="ml-auto rounded-full bg-[#fff1e6] px-2 py-0.5 text-[11px] font-semibold text-[#c2410c]">Klant boos</span>
              </div>
              <ul className="mt-3 space-y-1.5 text-[13.5px] text-[#3f3f46]">
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
