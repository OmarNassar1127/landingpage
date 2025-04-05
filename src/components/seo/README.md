# SEO Components

This directory contains reusable components for search engine optimization (SEO) in the Virelio application.

## Components

### JsonLd

A component for adding structured data (JSON-LD) to your pages.

**Usage:**

```tsx
import JsonLd from "@/components/seo/json-ld";
import { organizationSchema } from "@/lib/schema";

// In your component
return (
  <>
    <JsonLd data={organizationSchema()} />
    {/* Rest of your component */}
  </>
);
```

### SEOHead

A comprehensive head component for Pages Router pages that includes all necessary meta tags.

**Usage:**

```tsx
import SEOHead from "@/components/seo/seo-head";

export default function YourPage() {
  return (
    <>
      <SEOHead
        title="Your Page Title"
        description="Your page description here"
        keywords="relevant, keywords, here"
        canonicalPath="/your-page-path"
        ogImage="/path-to-og-image.jpg"
        ogType="website" // or "article" for blog posts
        // Add structured data if needed
        structuredData={{
          "@context": "https://schema.org",
          "@type": "WebPage",
          name: "Your Page Title",
          // ...more structured data
        }}
      />

      {/* Rest of your page content */}
    </>
  );
}
```

## When to Use Which Component

1. **App Router (New Projects)**:

   - Use the metadata API in your page or layout files:

   ```tsx
   export const metadata = generateMetadata({
     title: "Page Title",
     description: "Description",
     // ...other metadata props
   });
   ```

   - Add JsonLd component for structured data in layout or page components

2. **Pages Router (Legacy Projects)**:
   - Use the SEOHead component in each page for complete meta tag coverage
   - SEOHead already includes structured data support via its structuredData prop

## SEO Best Practices

1. **Every page should have:**

   - Unique title
   - Relevant description (150-160 characters)
   - Proper canonical URL
   - Appropriate Open Graph and Twitter Card tags

2. **For blog posts:**

   - Use "article" for ogType
   - Include author information in structured data
   - Add breadcrumb navigation

3. **For product/service pages:**

   - Add detailed structured data for rich snippets
   - Include relevant keywords in title and description

4. **For international content:**
   - Use hreflang attributes (built into both approaches)
   - Localize meta descriptions
