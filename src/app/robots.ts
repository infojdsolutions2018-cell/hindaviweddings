import { MetadataRoute } from "next";
import { BUSINESS_CONFIG } from "@/config/business";

export default function robots(): MetadataRoute.Robots {
  const baseUrl = BUSINESS_CONFIG.siteUrl.replace(/\/$/, "");

  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: [
          "/admin",
          "/admin/*",
          "/api/admin",
          "/api/admin/*",
        ],
      },
    ],
    sitemap: `${baseUrl}/sitemap.xml`,
  };
}
