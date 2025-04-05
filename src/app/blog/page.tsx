import { Metadata } from "next";
import { generateMetadata } from "@/lib/metadata";
import Navbar from "@/components/sections/navbar";
import Footer from "@/components/sections/footer";
import Link from "next/link";

export const metadata: Metadata = generateMetadata({
  title: "Blog",
  description:
    "Stay updated with the latest tech insights, industry trends, and news from Virelio.",
  keywords:
    "tech blog, SaaS insights, AI developments, e-commerce trends, technology news",
  pathname: "/blog",
});

// Mock blog posts data
const blogPosts = [
  {
    id: 1,
    slug: "ai-in-ecommerce",
    title: "The Future of AI in E-commerce",
    excerpt:
      "Discover how artificial intelligence is transforming the e-commerce landscape and what it means for your business.",
    date: "2025-03-15",
  },
  {
    id: 2,
    slug: "saas-development-best-practices",
    title: "Best Practices in SaaS Development",
    excerpt:
      "Learn about the most effective strategies and methodologies for building scalable SaaS applications.",
    date: "2025-03-01",
  },
  {
    id: 3,
    slug: "kyc-integration-guide",
    title: "A Comprehensive Guide to KYC Integration",
    excerpt:
      "Everything you need to know about implementing secure and efficient KYC processes in your platform.",
    date: "2025-02-15",
  },
];

export default function BlogPage() {
  return (
    <>
      <Navbar />
      <main className="container mx-auto px-4 py-12">
        <h1 className="text-4xl font-bold mb-8">Blog</h1>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {blogPosts.map((post) => (
            <div
              key={post.id}
              className="border rounded-lg overflow-hidden shadow-md"
            >
              <div className="p-6">
                <p className="text-sm text-gray-500 mb-2">{post.date}</p>
                <h2 className="text-xl font-semibold mb-2">
                  <Link href={`/blog/${post.slug}`} className="hover:underline">
                    {post.title}
                  </Link>
                </h2>
                <p className="text-gray-700">{post.excerpt}</p>
                <div className="mt-4">
                  <Link
                    href={`/blog/${post.slug}`}
                    className="text-blue-600 hover:underline"
                  >
                    Read more →
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </main>
      <Footer />
    </>
  );
}
