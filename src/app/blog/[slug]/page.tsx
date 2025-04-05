import { Metadata } from "next";
import { generateMetadata as createMetadata } from "@/lib/metadata";
import Navbar from "@/components/sections/navbar";
import Footer from "@/components/sections/footer";
import { notFound } from "next/navigation";
import JsonLd from "@/components/seo/json-ld";
import { blogPostSchema, breadcrumbSchema } from "@/lib/schema";

// Mock blog posts data (in a real app, this would come from a database or CMS)
const blogPosts = [
  {
    id: 1,
    slug: "ai-in-ecommerce",
    title: "The Future of AI in E-commerce",
    content:
      "This is the full content of the blog post about AI in e-commerce...",
    excerpt:
      "Discover how artificial intelligence is transforming the e-commerce landscape and what it means for your business.",
    date: "2025-03-15",
    author: "Jane Smith",
    authorRole: "AI Specialist",
    coverImage: "/images/blog/ai-ecommerce.jpg", // This would be a real image path in your project
  },
  {
    id: 2,
    slug: "saas-development-best-practices",
    title: "Best Practices in SaaS Development",
    content:
      "This is the full content of the blog post about SaaS development...",
    excerpt:
      "Learn about the most effective strategies and methodologies for building scalable SaaS applications.",
    date: "2025-03-01",
    author: "John Doe",
    authorRole: "Lead Developer",
    coverImage: "/images/blog/saas-development.jpg",
  },
  {
    id: 3,
    slug: "kyc-integration-guide",
    title: "A Comprehensive Guide to KYC Integration",
    content:
      "This is the full content of the blog post about KYC integration...",
    excerpt:
      "Everything you need to know about implementing secure and efficient KYC processes in your platform.",
    date: "2025-02-15",
    author: "Emma Johnson",
    authorRole: "Security Expert",
    coverImage: "/images/blog/kyc-integration.jpg",
  },
];

// This generates metadata for each blog post page dynamically
export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Promise<Metadata> {
  const post = blogPosts.find((post) => post.slug === params.slug);

  if (!post) {
    return createMetadata({
      title: "Post Not Found",
      description: "The requested blog post could not be found.",
      noIndex: true, // Don't index 404 pages
    });
  }

  return createMetadata({
    title: post.title,
    description: post.excerpt,
    keywords: `${post.title}, blog, Virelio, technology, insights`,
    pathname: `/blog/${post.slug}`,
    imageUrl: post.coverImage,
    imageAlt: `Cover image for ${post.title}`,
    type: "article", // Important for blog posts
  });
}

export default function BlogPostPage({ params }: { params: { slug: string } }) {
  const post = blogPosts.find((post) => post.slug === params.slug);

  if (!post) {
    notFound(); // This will show the not-found page
  }

  // Prepare breadcrumb data
  const breadcrumbs = [
    {
      position: 1,
      name: "Home",
      item: "https://virelio.nl",
    },
    {
      position: 2,
      name: "Blog",
      item: "https://virelio.nl/blog",
    },
    {
      position: 3,
      name: post.title,
      item: `https://virelio.nl/blog/${post.slug}`,
    },
  ];

  // Prepare blog post schema data
  const postUrl = `https://virelio.nl/blog/${post.slug}`;

  return (
    <>
      {/* Add structured data for this blog post */}
      <JsonLd
        data={blogPostSchema({
          title: post.title,
          description: post.excerpt,
          publishedAt: post.date,
          authorName: post.author,
          image: post.coverImage,
          url: postUrl,
        })}
      />

      {/* Add breadcrumb structured data */}
      <JsonLd data={breadcrumbSchema({ items: breadcrumbs })} />

      <Navbar />
      <main className="container mx-auto px-4 py-12">
        <article className="max-w-3xl mx-auto">
          <div className="mb-8">
            <p className="text-gray-500 mb-2">{post.date}</p>
            <h1 className="text-4xl font-bold mb-4">{post.title}</h1>
            <div className="flex items-center mb-6">
              <div className="w-10 h-10 rounded-full bg-gray-200 mr-3"></div>{" "}
              {/* Placeholder for author avatar */}
              <div>
                <p className="font-medium">{post.author}</p>
                <p className="text-sm text-gray-500">{post.authorRole}</p>
              </div>
            </div>
          </div>

          {/* This would be the actual blog content, possibly in markdown or rich text */}
          <div className="prose lg:prose-xl">
            <p>{post.content}</p>
            <p>This is a placeholder for the full blog post content.</p>
            <p>
              In a real application, this would be rich content fetched from a
              CMS or database.
            </p>
          </div>
        </article>
      </main>
      <Footer />
    </>
  );
}
