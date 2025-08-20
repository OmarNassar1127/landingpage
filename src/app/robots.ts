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
          "/search",
          "/test-terms/",
          "/blog/", // If blog is not ready yet
        ],
      }
    ],
    sitemap: `${siteConfig.url}/sitemap.xml`,
  };
}
