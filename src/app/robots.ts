import { MetadataRoute } from "next";
import { siteConfig } from "@/lib/config";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: [
          "/api/", 
          "/_next/", 
          "/admin/",
          "/*#*", // Disallow all hash fragments
          "*.woff2", // Disallow font files
          "*.woff",
          "*.ttf",
          "*.otf",
          "/manifest.json", // Disallow manifest
          "*.ico", // Disallow icons
          "/search", // Disallow search URLs
          "/search?*", // Disallow search with parameters
        ],
      }
    ],
    sitemap: `${siteConfig.url}/sitemap.xml`,
  };
}
