import React from 'react';
import SEOHead from '@/components/seo/seo-head';
import Link from 'next/link';

export default function ExamplesIndex() {
  return (
    <>
      <SEOHead
        title="SEO Examples"
        description="Examples of SEO implementation techniques in Next.js"
        canonicalPath="/examples"
        noIndex={true} // We often want to hide example pages from search engines
      />
      
      <div className="container mx-auto px-4 py-12">
        <h1 className="text-4xl font-bold mb-6">SEO Examples</h1>
        <p className="mb-6">
          This section contains examples of different SEO implementation techniques in Next.js.
        </p>
        
        <div className="grid gap-4">
          <div className="p-4 border rounded-lg">
            <h2 className="text-xl font-semibold mb-2">
              <Link href="/examples/seo-example" className="text-blue-600 hover:underline">
                SEO Head Component Example
              </Link>
            </h2>
            <p>
              Demonstrates how to use the SEOHead component for comprehensive SEO optimization
              in a Next.js page using the Pages Router.
            </p>
            <div className="mt-2">
              <Link href="/examples/seo-example" className="text-blue-600 hover:underline">
                View Example →
              </Link>
            </div>
          </div>
        </div>
        
        <div className="mt-6">
          <Link href="/" className="text-blue-600 hover:underline">
            ← Back to Home
          </Link>
        </div>
      </div>
    </>
  );
}
