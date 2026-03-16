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
        name: "AI Agent Development",
        description:
          "Custom AI agent teams built for your business — handling tasks autonomously, collaborating with each other, and integrating with your existing tools.",
        provider: {
          "@type": "Organization",
          name: "Virelio",
          url: siteConfig.url,
        },
      },
      {
        "@type": "Service",
        name: "Sales Automation",
        description:
          "AI agents that qualify leads, follow up prospects, and manage your sales pipeline 24/7 — so your team closes more deals with less effort.",
        provider: {
          "@type": "Organization",
          name: "Virelio",
          url: siteConfig.url,
        },
      },
      {
        "@type": "Service",
        name: "Customer Service Automation",
        description:
          "AI agents that handle customer inquiries, resolve common issues, and escalate edge cases — delivering instant, consistent support around the clock.",
        provider: {
          "@type": "Organization",
          name: "Virelio",
          url: siteConfig.url,
        },
      },
      {
        "@type": "Service",
        name: "Knowledge Base Systems",
        description:
          "AI-powered knowledge management agents that capture, organise and surface institutional knowledge — making information instantly accessible across your team.",
        provider: {
          "@type": "Organization",
          name: "Virelio",
          url: siteConfig.url,
        },
      },
      {
        "@type": "Service",
        name: "Operations Automation",
        description:
          "AI agents that automate repetitive back-office processes — from data entry and reporting to scheduling and workflow coordination.",
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
    "@id": `${url}#organization`,
    name,
    url,
    logo,
    description,
    sameAs,
    address: {
      "@type": "PostalAddress",
      addressLocality: "Amsterdam",
      addressCountry: "NL",
    },
    contactPoint: {
      "@type": "ContactPoint",
      telephone: "+31687838713",
      email: "info@virelio.nl",
      contactType: "sales",
      availableLanguage: ["nl", "en"],
    },
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
    inLanguage: "nl-NL",
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
          description: "AI agency that builds custom AI agent teams for businesses — based in Amsterdam, Netherlands.",
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
    name: "Virelio AI Agent Workshop",
    description: "Expert-led workshops on building AI agents, automation workflows, and integrating AI into business processes. Hands-on experience with real use cases.",
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
        name: "AI Agents",
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

export function certificationsSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "Team Certifications",
    description: "Professional AI and cloud certifications held by the Virelio team",
    numberOfItems: 19,
    itemListElement: [
      { "@type": "ListItem", position: 1, item: { "@type": "EducationalOccupationalCredential", name: "Model Context Protocol: Advanced Topics", credentialCategory: "AI Agent Development", recognizedBy: { "@type": "Organization", name: "Anthropic" } } },
      { "@type": "ListItem", position: 2, item: { "@type": "EducationalOccupationalCredential", name: "Certificate of Completion: Agent Skills", credentialCategory: "Autonomous AI Agents", recognizedBy: { "@type": "Organization", name: "Anthropic" } } },
      { "@type": "ListItem", position: 3, item: { "@type": "EducationalOccupationalCredential", name: "Claude Code in Action", credentialCategory: "AI-Powered Development", recognizedBy: { "@type": "Organization", name: "Anthropic" } } },
      { "@type": "ListItem", position: 4, item: { "@type": "EducationalOccupationalCredential", name: "Gemini Multimodality and Multimodal RAG", credentialCategory: "Retrieval Augmented Generation", recognizedBy: { "@type": "Organization", name: "Google" } } },
      { "@type": "ListItem", position: 5, item: { "@type": "EducationalOccupationalCredential", name: "Prompt Design in Vertex AI", credentialCategory: "Prompt Engineering", recognizedBy: { "@type": "Organization", name: "Google" } } },
      { "@type": "ListItem", position: 6, item: { "@type": "EducationalOccupationalCredential", name: "MLOps for Generative AI", credentialCategory: "Machine Learning Operations", recognizedBy: { "@type": "Organization", name: "Google" } } },
      { "@type": "ListItem", position: 7, item: { "@type": "EducationalOccupationalCredential", name: "Advanced: Generative AI for Developers", credentialCategory: "Generative AI", recognizedBy: { "@type": "Organization", name: "Google" } } },
      { "@type": "ListItem", position: 8, item: { "@type": "EducationalOccupationalCredential", name: "Building AI Agents with Vertex AI and LangChain", credentialCategory: "AI Agent Development", recognizedBy: { "@type": "Organization", name: "Google" } } },
      { "@type": "ListItem", position: 9, item: { "@type": "EducationalOccupationalCredential", name: "Multi-Agent Systems with Vertex AI", credentialCategory: "Multi-Agent Orchestration", recognizedBy: { "@type": "Organization", name: "Google" } } },
      { "@type": "ListItem", position: 10, item: { "@type": "EducationalOccupationalCredential", name: "Azure AI Fundamentals (AI-900)", credentialCategory: "Azure AI", recognizedBy: { "@type": "Organization", name: "Microsoft" } } },
      { "@type": "ListItem", position: 11, item: { "@type": "EducationalOccupationalCredential", name: "Azure Data Fundamentals (DP-900)", credentialCategory: "Azure Data", recognizedBy: { "@type": "Organization", name: "Microsoft" } } },
      { "@type": "ListItem", position: 12, item: { "@type": "EducationalOccupationalCredential", name: "Azure AI Engineer Associate (AI-102)", credentialCategory: "Azure AI Engineering", recognizedBy: { "@type": "Organization", name: "Microsoft" } } },
      { "@type": "ListItem", position: 13, item: { "@type": "EducationalOccupationalCredential", name: "Azure Solutions Architect Expert (AZ-305)", credentialCategory: "Cloud Architecture", recognizedBy: { "@type": "Organization", name: "Microsoft" } } },
      { "@type": "ListItem", position: 14, item: { "@type": "EducationalOccupationalCredential", name: "Develop AI Agents using Azure OpenAI and Semantic Kernel", credentialCategory: "AI Agent Development", recognizedBy: { "@type": "Organization", name: "Microsoft" } } },
      { "@type": "ListItem", position: 15, item: { "@type": "EducationalOccupationalCredential", name: "Build Copilot AI Agents with Azure AI Studio", credentialCategory: "Copilot Development", recognizedBy: { "@type": "Organization", name: "Microsoft" } } },
      { "@type": "ListItem", position: 16, item: { "@type": "EducationalOccupationalCredential", name: "OCI Generative AI Professional", credentialCategory: "Cloud AI Deployment", recognizedBy: { "@type": "Organization", name: "Oracle" } } },
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
    image: `${siteConfig.url}/og-image.png`,
    serviceType: "AI Voice Automation",
    provider: {
      "@type": "Organization",
      "@id": `${siteConfig.url}#organization`,
      name: "Virelio",
      url: siteConfig.url,
      logo: `${siteConfig.url}/og-image.png`,
      address: {
        "@type": "PostalAddress",
        addressLocality: "Amsterdam",
        addressCountry: "NL"
      },
      contactPoint: {
        "@type": "ContactPoint",
        telephone: "+31687838713",
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
