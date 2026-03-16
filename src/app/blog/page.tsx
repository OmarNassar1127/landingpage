import Link from "next/link";
import { ArrowRight, Clock, Calendar, BookOpen } from "lucide-react";
import { generateMetadata as genMeta } from "@/lib/metadata";
import { blogPosts, formatDate } from "@/lib/blog-data";
import Navbar from "@/components/sections/navbar";
import Footer from "@/components/sections/footer";

export const metadata = genMeta({
  title: "Blog — AI Agents & Automatisering voor Bedrijven",
  description:
    "Praktische artikelen over AI agents, automatisering, RAG-systemen en WhatsApp bots voor het Nederlandse MKB. Concrete adviezen, eerlijke prijzen en bewezen strategieën van Virelio.",
  keywords:
    "AI blog Nederland, AI agents artikelen, automatisering MKB blog, RAG systeem gids, WhatsApp AI bedrijven, klantenservice automatisering gids",
  pathname: "/blog",
  locale: "nl_NL",
  type: "website",
});

export default function BlogPage() {
  const sortedPosts = [...blogPosts].sort(
    (a, b) =>
      new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()
  );

  const [featured, ...rest] = sortedPosts;

  return (
    <main className="min-h-screen">
      <Navbar />

      {/* Hero */}
      <section className="pt-32 sm:pt-40 pb-16 sm:pb-20">
        <div className="container mx-auto px-4 sm:px-6 max-w-7xl">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-primary/10 text-primary text-sm font-medium mb-6">
              <BookOpen className="h-4 w-4" />
              Kennisbank
            </div>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-foreground mb-5">
              AI Insights
            </h1>
            <p className="text-lg sm:text-xl text-muted-foreground leading-relaxed max-w-2xl">
              Praktische artikelen over AI agents, automatisering en het bouwen
              van intelligente systemen voor Nederlandse bedrijven.
            </p>
          </div>
        </div>
      </section>

      <div className="container mx-auto px-4 sm:px-6 max-w-7xl pb-20">
        {/* Featured post */}
        <div className="mb-16">
          <p className="mb-6 text-xs font-semibold uppercase tracking-widest text-muted-foreground">
            Uitgelicht
          </p>
          <Link
            href={`/blog/${featured.slug}`}
            className="group block relative overflow-hidden rounded-3xl bg-gradient-to-br from-primary/5 via-primary/[0.02] to-transparent border border-border/50 p-8 sm:p-10 transition-all duration-500 hover:border-primary/30 hover:shadow-xl"
          >
            <div className="absolute -top-20 -right-20 w-60 h-60 rounded-full bg-primary/5 blur-3xl group-hover:bg-primary/10 transition-all duration-700" />

            <div className="relative">
              <div className="mb-5 flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
                <span className="flex items-center gap-1.5">
                  <Calendar className="h-4 w-4" />
                  {formatDate(featured.publishedAt)}
                </span>
                <span className="flex items-center gap-1.5">
                  <Clock className="h-4 w-4" />
                  {featured.readingTime} min leestijd
                </span>
              </div>

              <h2 className="mb-4 text-2xl sm:text-3xl font-bold text-foreground transition-colors group-hover:text-primary">
                {featured.title}
              </h2>

              <p className="mb-6 max-w-2xl text-base leading-relaxed text-muted-foreground">
                {featured.description}
              </p>

              <span className="inline-flex items-center gap-2 text-sm font-semibold text-primary">
                Lees artikel
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </span>
            </div>
          </Link>
        </div>

        {/* All other posts */}
        <div>
          <p className="mb-6 text-xs font-semibold uppercase tracking-widest text-muted-foreground">
            Alle artikelen
          </p>
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {rest.map((post) => (
              <Link
                key={post.slug}
                href={`/blog/${post.slug}`}
                className="group flex flex-col rounded-2xl bg-muted/40 border border-border/60 p-6 shadow-sm transition-all duration-300 hover:shadow-lg hover:border-primary/30 hover:bg-muted/60"
              >
                <div className="mb-4 flex flex-wrap items-center gap-3 text-xs text-muted-foreground">
                  <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-background/80">
                    <Calendar className="h-3 w-3" />
                    {formatDate(post.publishedAt)}
                  </span>
                  <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-background/80">
                    <Clock className="h-3 w-3" />
                    {post.readingTime} min
                  </span>
                </div>

                <h2 className="mb-3 flex-1 text-lg font-bold leading-snug text-foreground transition-colors group-hover:text-primary">
                  {post.title}
                </h2>

                <p className="mb-5 line-clamp-3 text-sm leading-relaxed text-muted-foreground">
                  {post.description}
                </p>

                <span className="mt-auto inline-flex items-center gap-1.5 text-sm font-semibold text-primary">
                  Lees meer
                  <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
                </span>
              </Link>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div className="mt-20 rounded-3xl border border-border/60 bg-muted/40 shadow-sm px-8 sm:px-12 py-14 sm:py-16">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-8">
            <div className="sm:max-w-2xl">
              <h2 className="text-2xl sm:text-3xl font-bold text-foreground mb-3 whitespace-nowrap">
                Benieuwd wat AI voor jou kan doen?
              </h2>
              <p className="text-muted-foreground leading-relaxed">
                Vertel ons over je uitdaging. We denken gratis en vrijblijvend mee.
              </p>
            </div>
            <a
              href="https://calendly.com/omarnassar1127/30min"
              target="_blank"
              rel="noopener noreferrer"
              className="shrink-0 inline-flex items-center gap-2 rounded-xl bg-foreground px-7 py-3.5 text-sm font-medium text-background transition-all hover:bg-foreground/90 active:scale-[0.98]"
            >
              Plan een gesprek
              <ArrowRight className="h-4 w-4" />
            </a>
          </div>
        </div>
      </div>

      <Footer />
    </main>
  );
}
