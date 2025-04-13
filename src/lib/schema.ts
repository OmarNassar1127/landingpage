import { siteConfig } from "./config";

type OrganizationProps = {
  name?: string;
  url?: string;
  logo?: string;
  description?: string;
  sameAs?: string[];
};

type WebsiteProps = {
  url?: string;
  name?: string;
  description?: string;
  language?: string;
};

type BreadcrumbItemProps = {
  position: number;
  name: string;
  item: string;
};

type BreadcrumbProps = {
  items: BreadcrumbItemProps[];
};

type BlogPostProps = {
  title: string;
  description: string;
  publishedAt: string;
  updatedAt?: string;
  authorName: string;
  authorUrl?: string;
  image?: string;
  url: string;
};

type ProductProps = {
  name: string;
  description: string;
  image: string;
  url: string;
  price?: string;
  priceCurrency?: string;
  availability?: "InStock" | "OutOfStock" | "PreOrder";
  sku?: string;
  brand?: string;
  reviewCount?: number;
  reviewRating?: number;
};

type FAQItemProps = {
  question: string;
  answer: string;
};

type FAQProps = {
  items: FAQItemProps[];
};

type TestimonialProps = {
  author: string;
  role: string;
  text: string;
  organization?: string;
};

type TestimonialsProps = {
  items: TestimonialProps[];
};

export const servicesSchema = () => {
  return {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    'itemListElement': [
      {
        '@type': 'Service',
        'name': 'AI Development',
        'description': 'Custom AI solutions that automate business processes and enhance customer interactions.',
        'provider': {
          '@type': 'Organization',
          'name': 'Virelio',
          'url': siteConfig.url
        }
      },
      {
        '@type': 'Service',
        'name': 'SaaS Development',
        'description': 'Tailored Software-as-a-Service solutions that are scalable, reliable, and user-friendly.',
        'provider': {
          '@type': 'Organization',
          'name': 'Virelio',
          'url': siteConfig.url
        }
      },
      {
        '@type': 'Service',
        'name': 'KYC Integration',
        'description': 'Seamless Know Your Customer integrations that meet regulations and streamline user verification.',
        'provider': {
          '@type': 'Organization',
          'name': 'Virelio',
          'url': siteConfig.url
        }
      },
      {
        '@type': 'Service',
        'name': 'E-commerce Automation',
        'description': 'Solutions that streamline online sales processes and improve operational efficiency.',
        'provider': {
          '@type': 'Organization',
          'name': 'Virelio',
          'url': siteConfig.url
        }
      },
      {
        '@type': 'Service',
        'name': 'Custom AI Solutions',
        'description': 'Personalized AI systems specifically tailored to your business\'s unique challenges.',
        'provider': {
          '@type': 'Organization',
          'name': 'Virelio',
          'url': siteConfig.url
        }
      },
      {
        '@type': 'Service',
        'name': 'Web Development',
        'description': 'High-performance websites and web applications that increase conversion and user engagement.',
        'provider': {
          '@type': 'Organization',
          'name': 'Virelio',
          'url': siteConfig.url
        }
      }
    ]
  };
};

export function organizationSchema({
  name = siteConfig.name,
  url = siteConfig.url,
  logo = `${siteConfig.url}${siteConfig.logoUrl}`,
  description = siteConfig.description,
  sameAs = [
    siteConfig.socials.twitter,
    siteConfig.socials.linkedin,
    siteConfig.socials.github,
  ],
}: OrganizationProps = {}) {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name,
    url,
    logo,
    description,
    sameAs,
  };
}

export function websiteSchema({
  url = siteConfig.url,
  name = siteConfig.name,
  description = siteConfig.description,
  language = `${siteConfig.locale}-US`,
}: WebsiteProps = {}) {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    url,
    name,
    description,
    inLanguage: language,
    potentialAction: {
      "@type": "SearchAction",
      target: `${url}/search?q={search_term_string}`,
      "query-input": "required name=search_term_string",
    },
  };
}

export function breadcrumbSchema({ items }: BreadcrumbProps) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map(({ position, name, item }) => ({
      "@type": "ListItem",
      position,
      name,
      item,
    })),
  };
}

export function blogPostSchema({
  title,
  description,
  publishedAt,
  updatedAt,
  authorName,
  authorUrl = "https://virelio.nl/team",
  image = "https://virelio.nl/og-image.jpg",
  url,
}: BlogPostProps) {
  return {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: title,
    description,
    image,
    url,
    datePublished: publishedAt,
    dateModified: updatedAt || publishedAt,
    author: {
      "@type": "Person",
      name: authorName,
      url: authorUrl,
    },
    publisher: {
      "@type": "Organization",
      name: "Virelio",
      logo: {
        "@type": "ImageObject",
        url: "https://virelio.nl/logo.png",
      },
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": url,
    },
  };
}

export function productSchema({
  name,
  description,
  image,
  url,
  price,
  priceCurrency = "EUR",
  availability = "InStock",
  sku,
  brand = "Virelio",
  reviewCount,
  reviewRating,
}: ProductProps) {
  const schema: any = {
    "@context": "https://schema.org",
    "@type": "Product",
    name,
    description,
    image,
    sku,
    brand: {
      "@type": "Brand",
      name: brand,
    },
    offers: {
      "@type": "Offer",
      url,
      availability: `https://schema.org/${availability}`,
      priceCurrency,
    },
  };

  if (price) {
    schema.offers.price = price;
  }

  if (reviewCount && reviewRating) {
    schema.aggregateRating = {
      "@type": "AggregateRating",
      ratingValue: reviewRating,
      reviewCount,
    };
  }

  return schema;
}

export function faqSchema({ items }: FAQProps) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map(({ question, answer }) => ({
      "@type": "Question",
      name: question,
      acceptedAnswer: {
        "@type": "Answer",
        text: answer,
      },
    })),
  };
}

export function testimonialsSchema({ items }: TestimonialsProps) {
  return {
    "@context": "https://schema.org",
    "@type": "ItemList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      item: {
        "@type": "Review",
        author: {
          "@type": "Person",
          name: item.author,
          jobTitle: item.role
        },
        reviewBody: item.text,
        itemReviewed: {
          "@type": "Organization",
          name: siteConfig.name,
          url: siteConfig.url,
          description: "Software development and AI solutions company",
          address: {
            "@type": "PostalAddress",
            addressCountry: "NL",
            addressLocality: "Amsterdam"
          }
        },
        reviewRating: {
          "@type": "Rating",
          bestRating: "5",
          ratingValue: "5",
          worstRating: "1"
        },
        datePublished: new Date().toISOString()
      }
    }))
  };
}
