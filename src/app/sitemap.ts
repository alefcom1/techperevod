import type { MetadataRoute } from "next";
import { INDUSTRIES } from "@/data/site";

const SITE_URL = "https://techperevod.com";

export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes = ["", "/o-nas", "/blog", "/kontakty"].map((path) => ({
    url: `${SITE_URL}${path}`,
    changeFrequency: "monthly" as const,
    priority: path === "" ? 1 : 0.7,
  }));

  const industryRoutes = INDUSTRIES.map((i) => ({
    url: `${SITE_URL}/otrasli/${i.slug}`,
    changeFrequency: "monthly" as const,
    priority: 0.8,
  }));

  return [...staticRoutes, ...industryRoutes];
}
