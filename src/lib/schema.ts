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

type AutomationAchievementProps = {
  totalAutomations: number;
  aiAutomationPercentage: number;
  industriesServed: number;
  uptime: number;
};

export const servicesSchema = () => {
  return {
    "@context": "https://schema.org",
    "@type": "ItemList",
    itemListElement: [
      {
        "@type": "Service",
        name: "AI Development",
        description:
          "Custom AI solutions that automate business processes and enhance customer interactions.",
        provider: {
          "@type": "Organization",
          name: "Virelio",
          url: siteConfig.url,
        },
      },
      {
        "@type": "Service",
        name: "SaaS Development",
        description:
          "Tailored Software-as-a-Service solutions that are scalable, reliable, and user-friendly.",
        provider: {
          "@type": "Organization",
          name: "Virelio",
          url: siteConfig.url,
        },
      },
      {
        "@type": "Service",
        name: "KYC Integration",
        description:
          "Seamless Know Your Customer integrations that meet regulations and streamline user verification.",
        provider: {
          "@type": "Organization",
          name: "Virelio",
          url: siteConfig.url,
        },
      },
      {
        "@type": "Service",
        name: "E-commerce Automation",
        description:
          "Solutions that streamline online sales processes and improve operational efficiency.",
        provider: {
          "@type": "Organization",
          name: "Virelio",
          url: siteConfig.url,
        },
      },
      {
        "@type": "Service",
        name: "Workshop Training",
        description:
          "Expert-led workshops and training sessions on AI, SaaS development, and modern web technologies.",
        provider: {
          "@type": "Organization",
          name: "Virelio",
          url: siteConfig.url,
        },
      },
      {
        "@type": "Service",
        name: "Custom AI Solutions",
        description:
          "Personalized AI systems specifically tailored to your business's unique challenges.",
        provider: {
          "@type": "Organization",
          name: "Virelio",
          url: siteConfig.url,
        },
      },
      {
        "@type": "Service",
        name: "Web Development",
        description:
          "High-performance websites and web applications that increase conversion and user engagement.",
        provider: {
          "@type": "Organization",
          name: "Virelio",
          url: siteConfig.url,
        },
      },
    ],
  };
};

export function videoSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "VideoObject",
    "name": "AI Agent Demo",
    "description": "Watch our intelligent AI agent in action. This is one of our many AI solutions that can be customized for your specific business needs and industry.",
    "thumbnailUrl": `${siteConfig.url}/demo-vid-thumbnail.jpg`,
    "uploadDate": "2024-05-01T08:00:00+08:00",
    "duration": "PT1M",
    "contentUrl": `${siteConfig.url}/demo-vid.mp4`,
    "embedUrl": `${siteConfig.url}/#demo`,
    "potentialAction": {
      "@type": "SeekToAction",
      "target": `${siteConfig.url}/#demo{seek_to_second_number}`,
      "startOffset-input": "required name=seek_to_second_number"
    },
    "publisher": {
      "@type": "Organization",
      "name": "Virelio",
      "logo": {
        "@type": "ImageObject",
        "url": `${siteConfig.url}/logo.png`,
        "width": "96",
        "height": "96"
      }
    }
  };
}

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
          jobTitle: item.role,
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
            addressLocality: "Amsterdam",
          },
        },
        reviewRating: {
          "@type": "Rating",
          bestRating: "5",
          ratingValue: "5",
          worstRating: "1",
        },
        datePublished: new Date().toISOString(),
      },
    })),
  };
}

export function workshopSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "EducationalEvent",
    name: "Virelio AI & SaaS Development Workshop",
    description: "Expert-led workshops and training sessions on AI, SaaS development, and modern web technologies. Learn from industry professionals and get hands-on experience.",
    url: `${siteConfig.url}${siteConfig.sections.workshop}`,
    organizer: {
      "@type": "Organization",
      name: "Virelio",
      url: siteConfig.url,
    },
    location: {
      "@type": "Place",
      name: "Online & Amsterdam",
      address: {
        "@type": "PostalAddress",
        addressCountry: "NL",
        addressLocality: "Amsterdam",
      },
    },
    eventAttendanceMode: "https://schema.org/MixedEventAttendanceMode",
    eventStatus: "https://schema.org/EventScheduled",
    offers: {
      "@type": "Offer",
      availability: "https://schema.org/InStock",
      validFrom: new Date().toISOString(),
    },
    about: [
      {
        "@type": "Thing",
        name: "Artificial Intelligence",
      },
      {
        "@type": "Thing", 
        name: "SaaS Development",
      },
      {
        "@type": "Thing",
        name: "Web Development",
      },
      {
        "@type": "Thing",
        name: "Automation",
      },
    ],
  };
}

export function voiceAIServiceSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    "@id": `${siteConfig.url}/spraakassistent#service`,
    name: "AI Spraakassistent voor Bedrijven",
    alternateName: ["Voice AI", "Spraakassistent", "AI Telefonie", "Voice Assistant"],
    description: "24/7 AI spraakassistent die klantgesprekken automatiseert. Beantwoordt binnen 2 beltonen, vermindert gesprekvolume met 87%, en integreert met bestaande systemen.",
    url: `${siteConfig.url}/spraakassistent`,
    image: `${siteConfig.url}/images/logo.png`,
    serviceType: "AI Voice Automation",
    provider: {
      "@type": "Organization",
      "@id": `${siteConfig.url}#organization`,
      name: "Virelio",
      url: siteConfig.url,
      logo: `${siteConfig.url}/images/logo.png`,
      address: {
        "@type": "PostalAddress",
        addressLocality: "Amsterdam",
        addressCountry: "NL"
      },
      contactPoint: {
        "@type": "ContactPoint",
        telephone: "+31-6-12345678",
        contactType: "sales",
        availableLanguage: ["nl", "en"]
      }
    },
    areaServed: {
      "@type": "Country",
      name: "Netherlands"
    },
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "AI Spraakassistent Pakketten",
      itemListElement: [
        {
          "@type": "Offer",
          name: "Gratis Proefperiode",
          description: "Test onze AI spraakassistent gratis",
          price: "0",
          priceCurrency: "EUR"
        },
        {
          "@type": "Offer",
          name: "Business Pakket",
          description: "Voor MKB bedrijven",
          priceSpecification: {
            "@type": "PriceSpecification",
            price: "Op aanvraag",
            priceCurrency: "EUR"
          }
        },
        {
          "@type": "Offer",
          name: "Enterprise Pakket",
          description: "Voor grote organisaties",
          priceSpecification: {
            "@type": "PriceSpecification",
            price: "Op aanvraag",
            priceCurrency: "EUR"
          }
        }
      ]
    },
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: "4.8",
      reviewCount: "127",
      bestRating: "5",
      worstRating: "1"
    },
    potentialAction: {
      "@type": "UseAction",
      target: {
        "@type": "EntryPoint",
        urlTemplate: `${siteConfig.url}/spraakassistent`,
        actionPlatform: [
          "http://schema.org/DesktopWebPlatform",
          "http://schema.org/MobileWebPlatform"
        ]
      }
    }
  };
}
