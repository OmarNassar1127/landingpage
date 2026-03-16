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
      <section className="pt-28 sm:pt-36 md:pt-44 pb-12 sm:pb-16 md:pb-20">
        <div className="container mx-auto px-6 sm:px-8 max-w-7xl">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-primary/10 text-primary text-xs sm:text-sm font-medium mb-5 sm:mb-6">
              <BookOpen className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
              Kennisbank
            </div>
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-foreground mb-4 sm:mb-5">
              AI Insights
            </h1>
            <p className="text-base sm:text-lg md:text-xl text-muted-foreground leading-relaxed max-w-2xl">
              Praktische artikelen over AI agents, automatisering en het bouwen
              van intelligente systemen voor Nederlandse bedrijven.
            </p>
          </div>
        </div>
      </section>

      <div className="container mx-auto px-6 sm:px-8 max-w-7xl pb-12 sm:pb-20">
        {/* Featured post */}
        <div className="mb-10 sm:mb-16">
          <Link
            href={`/blog/${featured.slug}`}
            className="group block relative overflow-hidden rounded-2xl sm:rounded-3xl bg-muted/40 border border-border/60 shadow-sm p-5 sm:p-8 md:p-10 transition-all duration-500 hover:border-primary/30 hover:shadow-lg"
          >
            <div className="flex flex-wrap items-center gap-2 mb-4 text-xs text-muted-foreground">
              <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-primary/10 text-primary font-medium">
                Uitgelicht
              </span>
              <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-background/80">
                <Calendar className="h-3 w-3" />
                {formatDate(featured.publishedAt)}
              </span>
              <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-background/80">
                <Clock className="h-3 w-3" />
                {featured.readingTime} min
              </span>
            </div>

            <h2 className="mb-3 text-lg sm:text-2xl md:text-3xl font-bold text-foreground transition-colors group-hover:text-primary">
              {featured.title}
            </h2>

            <p className="mb-4 text-sm sm:text-base leading-relaxed text-muted-foreground line-clamp-3 sm:line-clamp-none">
              {featured.description}
            </p>

            <span className="inline-flex items-center gap-2 text-sm font-semibold text-primary">
              Lees artikel
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </span>
          </Link>
        </div>

        {/* All other posts */}
        <div>
          <p className="mb-4 sm:mb-6 text-xs font-semibold uppercase tracking-widest text-muted-foreground">
            Alle artikelen
          </p>
          <div className="grid gap-4 sm:gap-5 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
            {rest.map((post) => (
              <Link
                key={post.slug}
                href={`/blog/${post.slug}`}
                className="group flex flex-col rounded-2xl bg-muted/40 border border-border/60 p-5 sm:p-6 shadow-sm transition-all duration-300 hover:shadow-lg hover:border-primary/30 hover:bg-muted/60"
              >
                <div className="mb-3 sm:mb-4 flex flex-wrap items-center gap-2 text-[11px] sm:text-xs text-muted-foreground">
                  <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-background/80">
                    <Calendar className="h-3 w-3" />
                    {formatDate(post.publishedAt)}
                  </span>
                  <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-background/80">
                    <Clock className="h-3 w-3" />
                    {post.readingTime} min
                  </span>
                </div>

                <h2 className="mb-2 sm:mb-3 flex-1 text-base sm:text-lg font-bold leading-snug text-foreground transition-colors group-hover:text-primary">
                  {post.title}
                </h2>

                <p className="mb-4 sm:mb-5 line-clamp-3 text-sm leading-relaxed text-muted-foreground">
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
        <div className="mt-12 sm:mt-20 rounded-2xl sm:rounded-3xl border border-border/60 bg-muted/40 shadow-sm px-5 sm:px-8 md:px-12 py-10 sm:py-14 md:py-16">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 sm:gap-8">
            <div>
              <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-foreground mb-2 sm:mb-3">
                Benieuwd wat AI voor jou kan doen?
              </h2>
              <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">
                Vertel ons over je uitdaging. We denken gratis en vrijblijvend mee.
              </p>
            </div>
            <a
              href="https://calendly.com/omarnassar1127/30min"
              target="_blank"
              rel="noopener noreferrer"
              className="shrink-0 w-full sm:w-auto text-center inline-flex items-center justify-center gap-2 rounded-xl bg-foreground px-7 py-3.5 text-sm font-medium text-background transition-all hover:bg-foreground/90 active:scale-[0.98]"
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
