import React from "react";
import SEOHead from "@/components/seo/seo-head";
import { organizationSchema } from "@/lib/schema";

/**
 * Example page showing how to use the SEOHead component in a Pages Router page
 * This is useful for older Next.js projects that don't use the App Router
 */
export default function SEOExamplePage() {
  // Example structured data for this page
  const orgSchema = organizationSchema();

  return (
    <>
      <SEOHead
        title="SEO Example Page"
        description="An example page demonstrating how to use the SEOHead component for comprehensive SEO optimization."
        keywords="Next.js, SEO, metadata, structured data, optimization"
        canonicalPath="/examples/seo-example"
        ogImage="/images/example-og.jpg"
        ogType="article"
        structuredData={orgSchema}
      />

      <div className="container mx-auto px-4 py-12">
        <h1 className="text-4xl font-bold mb-6">SEO Example Page</h1>
        <p className="mb-4">
          This page demonstrates how to use the SEOHead component for
          comprehensive SEO optimization in a Next.js page using the Pages
          Router.
        </p>
        <p className="mb-4">
          Check the page source to see all the metadata tags that have been
          added:
        </p>
        <ul className="list-disc pl-6 mb-6">
          <li>Meta title and description</li>
          <li>Open Graph tags</li>
          <li>Twitter Card tags</li>
          <li>Canonical URL</li>
          <li>Alternate language links</li>
          <li>Structured data (JSON-LD)</li>
        </ul>

        <div className="p-4 bg-gray-100 rounded-lg">
          <h2 className="text-xl font-semibold mb-2">Page Metadata:</h2>
          <code className="block whitespace-pre-wrap">
            {`
title: "SEO Example Page | Virelio"
description: "An example page demonstrating how to use the SEOHead component for comprehensive SEO optimization."
canonical: "https://virelio.nl/examples/seo-example"
            `}
          </code>
        </div>
      </div>
    </>
  );
}
