# SEO Optimizations for Virelio

This document outlines all SEO optimizations implemented in the Virelio Next.js application.

## Core SEO Infrastructure

### 1. Metadata Utilities

- Created a centralized metadata generation system (`/src/lib/metadata.ts`)
- Implemented a consistent approach for all pages to use the same metadata structure
- Made metadata easily extendable for specific pages

### 2. Structured Data (JSON-LD)

- Added structured data for rich search results
- Implemented schemas for:
  - Organization information
  - Website information
  - Blog post articles
  - Breadcrumb navigation
  - (Ready to implement: Products, FAQs)

### 3. Configuration System

- Created a central configuration file (`/src/lib/config.ts`)
- Stored all site-wide information in one place
- Made it easy to update site information across all pages

### 4. Sitemap Generation

- Enhanced the sitemap with all key pages
- Added dynamic blog post entries
- Set appropriate priorities and change frequencies
- Made the sitemap auto-update with new content

### 5. Robots.txt

- Configured robots.txt for proper crawling
- Set index/follow directives

### 6. Internationalization Support

- Added alternate language links (hreflang tags)
- Created language utility functions
- Implemented a language switcher component

## Page-Specific Optimizations

### Home Page

- Optimized title and description
- Added appropriate keywords
- Included structured data

### Services Page

- Created with optimized metadata
- Used page-specific descriptions

### Blog Pages

- Created listing page with optimized metadata
- Implemented individual blog post pages with:
  - Dynamic metadata generation
  - Breadcrumb navigation
  - Blog post structured data
  - Rich text content structure

### 404 Page

- Created a dedicated 404 page
- Added noindex directive to prevent search engines from indexing error pages
- Included helpful navigation to guide users back to relevant content

## Social Media Optimization

### Open Graph Protocol

- Implemented Open Graph tags for Facebook and other platforms
- Added specific title, description, and image for social sharing
- Configured type, site_name, and other required OG properties

### Twitter Cards

- Added Twitter Card metadata for enhanced Twitter sharing
- Set appropriate card type, title, description, and image
- Included Twitter handles for attribution

## Technical SEO Enhancements

### Performance Optimization

- Utilized Next.js App Router for improved performance
- Implemented server components where appropriate
- Used metadata API for server-side generation of SEO tags

### Accessibility Improvements

- Ensured proper heading hierarchy
- Added descriptive alt text placeholders for images
- Used semantic HTML elements throughout the site

### Mobile Optimization

- Set appropriate viewport settings
- Created responsive design for all pages
- Added mobile-specific meta tags

## Future SEO Recommendations

### 1. Analytics Integration

- Implement web analytics to track user behavior and SEO performance
- Set up event tracking for key user interactions

### 2. Schema Enhancement

- Add more structured data types (Products, Services, FAQs)
- Implement aggregate ratings when reviews are available

### 3. Content Strategy

- Develop a regular blog posting schedule with keyword-focused content
- Create in-depth guides and resources related to your services

### 4. Local SEO (if applicable)

- Add LocalBusiness schema
- Set up Google Business Profile
- Include location-specific pages

### 5. Performance Monitoring

- Set up regular Core Web Vitals monitoring
- Implement continuous performance optimization

## Implementation Notes

### Directory Structure

The SEO optimizations have been organized in the following structure:

- `/src/lib/metadata.ts` - Central metadata generation
- `/src/lib/schema.ts` - JSON-LD schema generation
- `/src/lib/config.ts` - Site-wide configuration
- `/src/app/sitemap.ts` - Dynamic sitemap generation
- `/src/app/robots.ts` - Robots.txt configuration
- `/src/components/seo/json-ld.tsx` - JSON-LD component
- `/src/components/seo/seo-head.tsx` - SEO Head component for Pages Router
- `/src/lib/utils/language-utils.ts` - Internationalization utilities
- `/src/components/language-switcher/language-switcher.tsx` - Language selector

### Usage Instructions

#### For App Router Pages (Recommended for New Pages)

1. Import the metadata generator:

   ```typescript
   import { generateMetadata } from "@/lib/metadata";
   ```

2. Create the metadata object:

   ```typescript
   export const metadata = generateMetadata({
     title: "Page Title",
     description: "Page description goes here",
     keywords: "relevant, keywords, here",
     pathname: "/page-path",
   });
   ```

3. Add structured data if needed:

   ```typescript
   import JsonLd from "@/components/seo/json-ld";
   import { someSchemaFunction } from "@/lib/schema";

   // Inside your component
   return (
     <>
       <JsonLd
         data={someSchemaFunction({
           /* props */
         })}
       />
       {/* Rest of your component */}
     </>
   );
   ```

#### For Pages Router Pages (Legacy Support)

1. Import the SEOHead component:

   ```typescript
   import SEOHead from "@/components/seo/seo-head";
   ```

2. Use the component at the top of your page:

   ```typescript
   export default function YourPage() {
     return (
       <>
         <SEOHead
           title="Your Page Title"
           description="Your page description"
           keywords="your, keywords"
           canonicalPath="/your-page-path"
           // Add other SEO props as needed
         />
         {/* Your page content */}
       </>
     );
   }
   ```

3. For pages with structured data:

   ```typescript
   import SEOHead from "@/components/seo/seo-head";
   import { someSchemaFunction } from "@/lib/schema";

   export default function YourPage() {
     const structuredData = someSchemaFunction({
       /* props */
     });

     return (
       <>
         <SEOHead
           title="Your Page Title"
           description="Your page description"
           structuredData={structuredData}
           // Other SEO props
         />
         {/* Your page content */}
       </>
     );
   }
   ```

4. Update the sitemap to include the new page in `/src/app/sitemap.ts`
