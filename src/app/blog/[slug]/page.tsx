import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, Clock, Calendar, User, ArrowRight, ChevronRight } from "lucide-react";
import { generateMetadata as genMeta } from "@/lib/metadata";
import { blogPostSchema, breadcrumbSchema } from "@/lib/schema";
import {
  blogPosts,
  getBlogPost,
  getRelatedPosts,
  formatDate,
} from "@/lib/blog-data";
import { siteConfig } from "@/lib/config";
import Navbar from "@/components/sections/navbar";
import Footer from "@/components/sections/footer";

type Props = {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
  return blogPosts.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({ params }: Props) {
  const { slug } = await params;
  const post = getBlogPost(slug);

  if (!post) {
    return genMeta({ title: "Artikel niet gevonden", noIndex: true });
  }

  return genMeta({
    title: post.title,
    description: post.description,
    keywords: post.keywords.join(", "),
    pathname: `/blog/${post.slug}`,
    locale: "nl_NL",
    type: "article",
  });
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params;
  const post = getBlogPost(slug);

  if (!post) {
    notFound();
  }

  const relatedPosts = getRelatedPosts(slug);

  const postSchemaData = blogPostSchema({
    title: post.title,
    description: post.description,
    publishedAt: post.publishedAt,
    authorName: post.author,
    url: `${siteConfig.url}/blog/${post.slug}`,
  });

  const breadcrumbData = breadcrumbSchema({
    items: [
      { position: 1, name: "Home", item: siteConfig.url },
      { position: 2, name: "Blog", item: `${siteConfig.url}/blog` },
      {
        position: 3,
        name: post.title,
        item: `${siteConfig.url}/blog/${post.slug}`,
      },
    ],
  });

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(postSchemaData) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbData) }}
      />

      <main className="min-h-screen">
        <Navbar />

        {/* Article header */}
        <header className="pt-32 sm:pt-40 pb-10 sm:pb-14">
          <div className="container mx-auto px-4 sm:px-6 max-w-4xl">
            {/* Breadcrumb */}
            <nav
              aria-label="Breadcrumb"
              className="mb-8 flex items-center gap-1.5 text-sm text-muted-foreground"
            >
              <Link href="/" className="transition-colors hover:text-foreground">
                Home
              </Link>
              <ChevronRight className="h-3.5 w-3.5" />
              <Link
                href="/blog"
                className="transition-colors hover:text-foreground"
              >
                Blog
              </Link>
              <ChevronRight className="h-3.5 w-3.5" />
              <span className="max-w-[200px] truncate text-foreground/70">
                {post.title}
              </span>
            </nav>

            <h1 className="mb-6 text-3xl sm:text-4xl lg:text-5xl font-bold leading-tight tracking-tight text-foreground">
              {post.title}
            </h1>

            <p className="mb-8 text-lg leading-relaxed text-muted-foreground max-w-3xl">
              {post.description}
            </p>

            <div className="flex flex-wrap items-center gap-5 text-sm text-muted-foreground pb-8 border-b border-border/50">
              <span className="flex items-center gap-2">
                <div className="h-8 w-8 rounded-full bg-primary flex items-center justify-center text-xs font-bold text-white">
                  V
                </div>
                {post.author}
              </span>
              <span className="flex items-center gap-2">
                <Calendar className="h-4 w-4" />
                {formatDate(post.publishedAt)}
              </span>
              <span className="flex items-center gap-2">
                <Clock className="h-4 w-4" />
                {post.readingTime} min leestijd
              </span>
            </div>
          </div>
        </header>

        {/* Article content */}
        <article className="container mx-auto px-4 sm:px-6 max-w-3xl py-12 sm:py-16">
          <div
            className="prose prose-lg max-w-none
              prose-headings:font-bold prose-headings:tracking-tight prose-headings:text-foreground
              prose-h2:mt-16 prose-h2:mb-6 prose-h2:text-2xl sm:prose-h2:text-[1.75rem] prose-h2:leading-snug prose-h2:border-b prose-h2:border-border/30 prose-h2:pb-4
              prose-h3:mt-10 prose-h3:mb-4 prose-h3:text-lg sm:prose-h3:text-xl
              prose-p:text-[1.05rem] prose-p:leading-[1.85] prose-p:text-foreground/70 prose-p:mb-6
              prose-li:text-[1.05rem] prose-li:text-foreground/70 prose-li:leading-[1.85] prose-li:mb-2
              prose-strong:text-foreground prose-strong:font-semibold
              prose-a:text-primary prose-a:underline prose-a:underline-offset-4 prose-a:decoration-primary/30 hover:prose-a:decoration-primary
              prose-blockquote:border-l-4 prose-blockquote:border-l-primary prose-blockquote:bg-primary/5 prose-blockquote:rounded-r-2xl prose-blockquote:py-4 prose-blockquote:px-6 prose-blockquote:my-8 prose-blockquote:not-italic prose-blockquote:text-foreground/70
              prose-table:text-sm prose-table:rounded-xl prose-table:overflow-hidden prose-table:my-8
              prose-th:bg-muted/50 prose-th:font-semibold prose-th:text-foreground prose-th:p-4 prose-th:text-left
              prose-td:p-4 prose-td:text-foreground/70 prose-td:border prose-td:border-border/30
              prose-ul:my-6 prose-ul:space-y-1 prose-ol:my-6 prose-ol:space-y-1
              prose-ul:pl-6 prose-ol:pl-6
              prose-img:rounded-2xl prose-img:my-8
              prose-hr:border-border/30 prose-hr:my-12
              prose-code:bg-muted/50 prose-code:px-1.5 prose-code:py-0.5 prose-code:rounded-md prose-code:text-sm prose-code:text-foreground prose-code:before:content-none prose-code:after:content-none
              first:prose-h2:mt-0 first:prose-h2:border-b-0 first:prose-h2:pb-0"
            dangerouslySetInnerHTML={{ __html: post.content }}
          />
        </article>

        {/* Author card */}
        <div className="container mx-auto px-4 sm:px-6 max-w-3xl pb-16">
          <div className="flex items-start gap-5 rounded-2xl bg-muted/30 border border-border/50 p-6 sm:p-8">
            <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-primary text-lg font-bold text-white">
              V
            </div>
            <div>
              <p className="font-bold text-foreground text-lg">{post.author}</p>
              <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">
                Virelio is een AI agent development bureau in Amsterdam. We
                bouwen maatwerk AI-oplossingen voor het Nederlandse MKB en
                enterprise — live in 2 weken.
              </p>
              <Link
                href="/"
                className="mt-3 inline-flex items-center gap-1.5 text-sm font-semibold text-primary hover:underline"
              >
                Meer over Virelio
                <ArrowRight className="h-3.5 w-3.5" />
              </Link>
            </div>
          </div>
        </div>

        {/* Related posts */}
        {relatedPosts.length > 0 && (
          <section className="border-t border-border/50 py-16 sm:py-20">
            <div className="container mx-auto px-4 sm:px-6 max-w-7xl">
              <h2 className="mb-8 text-2xl font-bold text-foreground">
                Meer artikelen
              </h2>
              <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
                {relatedPosts.map((related) => (
                  <Link
                    key={related.slug}
                    href={`/blog/${related.slug}`}
                    className="group flex flex-col rounded-2xl border border-border/50 bg-background p-6 transition-all duration-300 hover:border-primary/20 hover:shadow-lg"
                  >
                    <div className="mb-3 flex items-center gap-3 text-xs text-muted-foreground">
                      <span className="flex items-center gap-1">
                        <Calendar className="h-3.5 w-3.5" />
                        {formatDate(related.publishedAt)}
                      </span>
                      <span className="flex items-center gap-1">
                        <Clock className="h-3.5 w-3.5" />
                        {related.readingTime} min
                      </span>
                    </div>

                    <h3 className="mb-2 flex-1 text-base font-bold leading-snug text-foreground transition-colors group-hover:text-primary">
                      {related.title}
                    </h3>

                    <p className="mb-4 line-clamp-2 text-sm leading-relaxed text-muted-foreground">
                      {related.description}
                    </p>

                    <span className="mt-auto inline-flex items-center gap-1.5 text-sm font-semibold text-primary">
                      Lees meer
                      <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
                    </span>
                  </Link>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* CTA */}
        <section className="border-t border-border/50">
          <div className="container mx-auto px-4 sm:px-6 max-w-4xl py-16 sm:py-20 text-center">
            <h2 className="mb-4 text-2xl sm:text-3xl font-bold text-foreground">
              Klaar om te beginnen?
            </h2>
            <p className="mb-8 text-muted-foreground max-w-lg mx-auto">
              Plan een gratis intake en ontdek wat AI kan betekenen voor jouw
              bedrijf.
            </p>
            <a
              href="https://calendly.com/omarnassar1127/30min"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-xl bg-primary px-7 py-3.5 text-sm font-semibold text-white transition-all hover:bg-primary/90 hover:scale-[1.02] active:scale-[0.98]"
            >
              Plan gratis intake
              <ArrowRight className="h-4 w-4" />
            </a>
          </div>
        </section>

        <Footer />
      </main>
    </>
  );
}
