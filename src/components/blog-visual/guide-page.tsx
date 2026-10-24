/**
 * Visual shell for the two webshop guides (/blog/productteksten-laten-schrijven,
 * /blog/klantvragen-automatisch-beantwoorden). Exemplar: the /oplossingen/ pages,
 * same grey hero field, white tiles, one indigo tile. Each section is mostly a picture.
 */
import { ArrowRight, ChevronDown, type LucideIcon } from "lucide-react";
import type { ReactNode } from "react";
import Navbar from "@/components/sections/navbar";
import Footer from "@/components/sections/footer";
import { Eyebrow, card } from "@/components/oplossingen/shared";
import type { BlogPost } from "@/lib/blog-data";

export type Step = { icon: LucideIcon; text: string };

export type GuideProps = {
  post: BlogPost;
  eyebrow: string;
  headline: string;
  sub: string;
  hero: ReactNode;
  examplesTitle: string;
  examplesNote: string;
  examples: ReactNode;
  extra?: ReactNode;
  steps: Step[];
  free: { title: string; text: string };
  solution: { name: string; href: string };
};

function Section({ id, title, eyebrow, note, tint = false, children }: { id?: string; title: string; eyebrow: string; note?: string; tint?: boolean; children: ReactNode }) {
  return (
    <section id={id} className={`scroll-mt-20 border-t border-black/[0.07] py-12 sm:py-20 ${tint ? "bg-[#f5f5f7]" : "bg-white"}`}>
      <div className="container mx-auto max-w-6xl px-4 sm:px-6">
        <Eyebrow>{eyebrow}</Eyebrow>
        <h2 className="text-[26px] font-bold leading-tight tracking-[-0.02em] text-[#1d1d1f] [hyphens:none] sm:text-4xl">{title}</h2>
        {note && <p className="mt-2 max-w-xl text-sm text-[#6e6e73] sm:text-base">{note}</p>}
        <div className="mt-6 sm:mt-10">{children}</div>
      </div>
    </section>
  );
}

export default function GuidePage(p: GuideProps) {
  const { post } = p;
  const cta = post.cta!;
  return (
    <main className="min-h-screen bg-white">
      <Navbar
        customNavLinks={[
          { name: "Voorbeelden", href: "#voorbeelden" },
          { name: "Hoe het werkt", href: "#hoe-het-werkt" },
          { name: "Prijs", href: "#prijs" },
          { name: "Vragen", href: "#vragen" },
        ]}
      />

      {/* Hero: one-line promise next to the object itself */}
      <section className="overflow-hidden bg-[#f5f5f7] pb-12 pt-[88px] sm:pb-20 sm:pt-28 lg:pt-32">
        <div className="container mx-auto grid max-w-6xl items-center gap-8 px-4 sm:px-6 lg:grid-cols-2 lg:gap-12">
          <div>
            <nav aria-label="Breadcrumb" className="mb-4 hidden text-sm text-zinc-500 sm:block">
              <a href="/blog/" className="transition-colors hover:text-primary">
                Blog
              </a>
              <span className="mx-2 text-zinc-300">/</span>
              <span className="text-zinc-900">{p.eyebrow}</span>
            </nav>
            <Eyebrow>{p.eyebrow}</Eyebrow>
            <h1 className="text-[32px] font-bold leading-[1.05] tracking-[-0.03em] text-[#1d1d1f] [hyphens:none] sm:text-5xl lg:text-[56px]">{p.headline}</h1>
            <p className="mt-3 max-w-md text-[15px] leading-relaxed text-[#6e6e73] sm:text-lg">{p.sub}</p>
            <div className="mt-6 flex flex-wrap items-center gap-x-5 gap-y-3">
              <a
                href={cta.href}
                className="group inline-flex items-center gap-2 rounded-full bg-primary px-5 py-3 text-sm font-semibold text-white shadow-[0_14px_30px_-14px_rgba(70,55,210,0.7)] transition-transform active:scale-[0.98]"
              >
                {cta.label}
                <ArrowRight className="bx-nudge h-4 w-4" />
              </a>
              <a href="#voorbeelden" className="py-3 text-sm font-medium leading-none text-[#6e6e73] underline-offset-4 hover:underline">
                Bekijk voorbeelden
              </a>
            </div>
          </div>
          <div>{p.hero}</div>
        </div>
      </section>

      <Section id="voorbeelden" eyebrow="Voor en na" title={p.examplesTitle} note={p.examplesNote}>
        {p.examples}
      </Section>

      {p.extra}

      <Section id="hoe-het-werkt" eyebrow="Hoe het werkt" title="Drie stappen" tint>
        <ol className="grid gap-2.5 sm:grid-cols-3 sm:gap-4">
          {p.steps.map((s, i) => (
            <li key={s.text} className={`flex items-center gap-4 p-4 sm:flex-col sm:items-start sm:p-6 ${card}`}>
              <span className="relative flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-[#ecebfc] text-primary sm:h-14 sm:w-14">
                <s.icon className="h-6 w-6" strokeWidth={1.8} />
                <span className="absolute -right-1.5 -top-1.5 flex h-5 w-5 items-center justify-center rounded-full bg-[#1d1d1f] text-[11px] font-bold text-white">{i + 1}</span>
              </span>
              <span className="text-[15px] font-semibold leading-snug text-[#1d1d1f] [hyphens:none] sm:text-[17px]">{s.text}</span>
            </li>
          ))}
        </ol>
      </Section>

      {/* Price and the free first ten, one card */}
      <section id="prijs" className="scroll-mt-20 border-t border-black/[0.07] bg-white py-12 sm:py-20">
        <div className="container mx-auto max-w-6xl px-4 sm:px-6">
          <div className="grid overflow-hidden rounded-[28px] bg-primary text-white shadow-[0_40px_80px_-40px_rgba(70,55,210,0.6)] lg:grid-cols-12">
            <div className="p-6 sm:p-10 lg:col-span-7">
              <p className="text-[11px] font-semibold uppercase tracking-[0.08em] text-white/70">Gratis proberen</p>
              <p className="mt-2 text-[34px] font-extrabold leading-none tracking-[-0.04em] sm:text-5xl">{p.free.title}</p>
              <p className="mt-3 max-w-md text-[15px] leading-relaxed text-white/85">{p.free.text}</p>
              <a
                href={cta.href}
                className="group mt-6 inline-flex w-full items-center justify-center gap-2 rounded-full bg-white px-6 py-3.5 text-sm font-semibold text-[#1d1d1f] transition-transform active:scale-[0.98] sm:w-auto"
              >
                {cta.label}
                <ArrowRight className="bx-nudge h-4 w-4" />
              </a>
            </div>
            <div className="border-t border-white/15 bg-white/[0.07] p-6 sm:p-10 lg:col-span-5 lg:border-l lg:border-t-0">
              <p className="text-[11px] font-semibold uppercase tracking-[0.08em] text-white/70">Daarna</p>
              <p className="mt-2 text-[34px] font-extrabold leading-none tracking-[-0.04em] sm:text-5xl">€1.000</p>
              <p className="mt-1 text-sm text-white/85">eenmalig, onderhoud vanaf €99 per maand</p>
              <p className="mt-4 text-xs leading-relaxed text-white/65">
                Excl. btw. Het AI-gebruik betaal je apart aan de aanbieder.{" "}
                <a href={p.solution.href} className="underline underline-offset-2 hover:text-white">
                  Wat er in zit
                </a>
              </p>
            </div>
          </div>
        </div>
      </section>

      <Section id="vragen" eyebrow="Vragen" title="Veelgestelde vragen" tint>
        <div className="mx-auto max-w-3xl divide-y divide-black/[0.07] overflow-hidden rounded-[22px] border border-black/[0.07] bg-white">
          {post.faq!.map((f) => (
            <details key={f.question} className="group">
              <summary className="flex cursor-pointer list-none items-center justify-between gap-4 px-5 py-4 text-[15px] font-semibold text-[#1d1d1f] [&::-webkit-details-marker]:hidden">
                {f.question}
                <ChevronDown className="h-4 w-4 shrink-0 text-[#6e6e73] transition-transform group-open:rotate-180" />
              </summary>
              <p className="px-5 pb-4 text-[14px] leading-relaxed text-[#6e6e73]">{f.answer}</p>
            </details>
          ))}
        </div>

        <div className="mx-auto mt-8 flex max-w-3xl items-center gap-3 text-sm text-[#6e6e73]">
          <img src="/favicon-96x96.png" alt="Virelio logo" className="h-8 w-8 shrink-0 rounded-lg" />
          <p>
            Virelio helpt webshops met slimme assistenten voor teksten en klantvragen.{" "}
            <a href={p.solution.href} className="font-medium text-primary hover:underline">
              {p.solution.name}
            </a>
          </p>
        </div>
      </Section>

      <Footer />
    </main>
  );
}
