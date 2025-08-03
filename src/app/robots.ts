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
        ],
      }
    ],
    sitemap: `${siteConfig.url}/sitemap.xml`,
  };
}
