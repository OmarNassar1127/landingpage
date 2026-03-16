import { notFound } from "next/navigation";
import Link from "next/link";
import { Clock, Calendar, ArrowRight } from "lucide-react";
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
        <header className="pt-20 sm:pt-32 md:pt-40 pb-6 sm:pb-10 md:pb-14">
          <div className="container mx-auto px-6 sm:px-8 max-w-3xl">
            {/* Back link on mobile, breadcrumb on desktop */}
            <Link
              href="/blog"
              className="inline-flex items-center gap-1.5 text-xs sm:text-sm text-muted-foreground hover:text-foreground transition-colors mb-4 sm:mb-6"
            >
              <ArrowRight className="h-3 w-3 rotate-180" />
              <span className="sm:hidden">Blog</span>
              <span className="hidden sm:inline">Home / Blog / {post.title.length > 40 ? post.title.slice(0, 40) + '...' : post.title}</span>
            </Link>

            <h1 className="mb-4 sm:mb-5 text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold leading-[1.15] tracking-tight text-foreground">
              {post.title}
            </h1>

            <div className="flex flex-wrap items-center gap-3 text-xs sm:text-sm text-muted-foreground">
              <span className="flex items-center gap-1.5">
                <div className="h-6 w-6 sm:h-7 sm:w-7 rounded-full bg-primary flex items-center justify-center text-[10px] font-bold text-white">
                  V
                </div>
                {post.author}
              </span>
              <span className="flex items-center gap-1.5">
                <Calendar className="h-3.5 w-3.5" />
                {formatDate(post.publishedAt)}
              </span>
              <span className="flex items-center gap-1.5">
                <Clock className="h-3.5 w-3.5" />
                {post.readingTime} min
              </span>
            </div>
          </div>
        </header>

        {/* Article content */}
        <article className="container mx-auto px-6 sm:px-8 max-w-3xl pt-8 sm:pt-12 pb-10 sm:pb-16">
          <style dangerouslySetInnerHTML={{ __html: `
            .blog-content h2 { font-size: 1.375rem; font-weight: 700; margin-top: 2.5rem; margin-bottom: 1rem; padding-bottom: 0.75rem; border-bottom: 1px solid hsl(var(--border) / 0.3); color: hsl(var(--foreground)); line-height: 1.3; }
            .blog-content h3 { font-size: 1.125rem; font-weight: 700; margin-top: 2rem; margin-bottom: 0.75rem; color: hsl(var(--foreground)); line-height: 1.4; }
            .blog-content p { font-size: 1rem; line-height: 1.8; color: hsl(var(--foreground) / 0.7); margin-bottom: 1.25rem; }
            .blog-content ul, .blog-content ol { margin: 1.25rem 0; padding-left: 1.25rem; }
            .blog-content li { font-size: 1rem; line-height: 1.8; color: hsl(var(--foreground) / 0.7); margin-bottom: 0.5rem; }
            .blog-content strong { color: hsl(var(--foreground)); font-weight: 600; }
            .blog-content a { color: hsl(var(--primary)); text-decoration: underline; text-underline-offset: 3px; }
            .blog-content blockquote { border-left: 3px solid hsl(var(--primary)); background: hsl(var(--primary) / 0.05); border-radius: 0 0.75rem 0.75rem 0; padding: 1rem 1.25rem; margin: 1.5rem 0; }
            .blog-content blockquote p { margin-bottom: 0; }
            .blog-content table { font-size: 0.8125rem; width: 100%; border-collapse: collapse; margin: 1.5rem 0; overflow-x: auto; display: block; }
            .blog-content th { background: hsl(var(--muted) / 0.5); font-weight: 600; color: hsl(var(--foreground)); padding: 0.625rem; text-align: left; }
            .blog-content td { padding: 0.625rem; color: hsl(var(--foreground) / 0.7); border: 1px solid hsl(var(--border) / 0.3); }
            .blog-content h2:first-child { margin-top: 0; border-bottom: none; padding-bottom: 0; }
            @media (min-width: 640px) {
              .blog-content h2 { font-size: 1.625rem; margin-top: 3rem; margin-bottom: 1.25rem; }
              .blog-content h3 { font-size: 1.25rem; margin-top: 2.5rem; margin-bottom: 1rem; }
              .blog-content p { font-size: 1.0625rem; margin-bottom: 1.5rem; }
              .blog-content li { font-size: 1.0625rem; margin-bottom: 0.625rem; }
              .blog-content ul, .blog-content ol { padding-left: 1.5rem; margin: 1.5rem 0; }
              .blog-content blockquote { padding: 1.25rem 1.5rem; margin: 2rem 0; }
              .blog-content table { display: table; font-size: 0.875rem; }
              .blog-content th, .blog-content td { padding: 0.875rem; }
            }
          `}} />
          <div
            className="blog-content"
            dangerouslySetInnerHTML={{ __html: post.content }}
          />
        </article>

        {/* Author card */}
        <div className="container mx-auto px-6 sm:px-8 max-w-3xl pb-10 sm:pb-16">
          <div className="flex flex-col sm:flex-row items-start gap-4 sm:gap-5 rounded-2xl bg-muted/30 border border-border/50 p-5 sm:p-8">
            <div className="flex h-12 w-12 sm:h-14 sm:w-14 shrink-0 items-center justify-center rounded-xl sm:rounded-2xl bg-primary text-base sm:text-lg font-bold text-white">
              V
            </div>
            <div>
              <p className="font-bold text-foreground text-base sm:text-lg">{post.author}</p>
              <p className="mt-1 sm:mt-1.5 text-sm leading-relaxed text-muted-foreground">
                Virelio is een AI agent development bureau in Amsterdam. We
                bouwen maatwerk AI-oplossingen voor het Nederlandse MKB en
                enterprise — live in 2 weken.
              </p>
              <Link
                href="/"
                className="mt-2 sm:mt-3 inline-flex items-center gap-1.5 text-sm font-semibold text-primary hover:underline"
              >
                Meer over Virelio
                <ArrowRight className="h-3.5 w-3.5" />
              </Link>
            </div>
          </div>
        </div>

        {/* Related posts */}
        {relatedPosts.length > 0 && (
          <section className="border-t border-border/50 py-10 sm:py-16 md:py-20">
            <div className="container mx-auto px-6 sm:px-8 max-w-7xl">
              <h2 className="mb-6 sm:mb-8 text-xl sm:text-2xl font-bold text-foreground">
                Meer artikelen
              </h2>
              <div className="grid gap-4 sm:gap-5 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
                {relatedPosts.map((related) => (
                  <Link
                    key={related.slug}
                    href={`/blog/${related.slug}`}
                    className="group flex flex-col rounded-2xl bg-muted/40 border border-border/60 p-5 sm:p-6 shadow-sm transition-all duration-300 hover:border-primary/20 hover:shadow-lg"
                  >
                    <div className="mb-3 flex items-center gap-2 text-[11px] sm:text-xs text-muted-foreground">
                      <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-background/80">
                        <Calendar className="h-3 w-3" />
                        {formatDate(related.publishedAt)}
                      </span>
                      <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-background/80">
                        <Clock className="h-3 w-3" />
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
          <div className="container mx-auto px-6 sm:px-8 max-w-4xl py-12 sm:py-16 md:py-20 text-center">
            <h2 className="mb-3 sm:mb-4 text-xl sm:text-2xl md:text-3xl font-bold text-foreground">
              Klaar om te beginnen?
            </h2>
            <p className="mb-6 sm:mb-8 text-sm sm:text-base text-muted-foreground max-w-lg mx-auto">
              Plan een gratis intake en ontdek wat AI kan betekenen voor jouw
              bedrijf.
            </p>
            <a
              href="https://calendly.com/omarnassar1127/30min"
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-xl bg-foreground px-7 py-3.5 text-sm font-medium text-background transition-all hover:bg-foreground/90 active:scale-[0.98]"
            >
              Plan een gesprek
              <ArrowRight className="h-4 w-4" />
            </a>
          </div>
        </section>

        <Footer />
      </main>
    </>
  );
}
