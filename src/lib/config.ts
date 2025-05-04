export const siteConfig = {
  name: "Virelio",
  description: "Innovative Solutions for Modern Challenges",
  url: "https://Virelio.nl", // Updated domain
  metadataBase: "https://Virelio.nl", // Updated domain
  logoUrl: "/logo.svg",
  ogImage: "/og-image.jpg",
  twitterHandle: "@Virelio",
  locale: "nl", // Changed default locale to Dutch
  authors: [
    {
      name: "Virelio Team",
      url: "https://Virelio.nl", // Landing page, no /team page
    },
  ],
  socials: {
    twitter: "https://twitter.com/Virelio",
    github: "https://github.com/Virelio",
    linkedin: "https://linkedin.com/company/Virelio",
  },
  contact: {
    email: "info@Virelio.nl",
    phone: "+31 (0)6 12345678",
    address: "Amsterdam, Netherlands",
  },
  themeColor: "#ffffff",
  keywords: [
    "AI Solutions",
    "SaaS platforms",
    "KYC integrations",
    "Shop Automations",
    "Web Development",
    "Software Development",
    "Digital Innovation",
    "Technology Solutions",
  ],
  // For language-specific URLs (better for SEO)
  alternateLanguages: {
    nl: "https://Virelio.nl",
    en: "https://Virelio.nl/en",
  },
  // Add sections for the one-page layout
  sections: {
    projects: "#projects",
    services: "#services",
    about: "#about",
    testimonials: "#testimonials",
    demo: "#demo",
    bookMeeting: "#book-meeting",
    contact: "#contact",
    home: "#",
  },
};
