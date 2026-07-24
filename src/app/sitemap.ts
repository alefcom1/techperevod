import type { MetadataRoute } from "next";
import { INDUSTRIES } from "@/data/site";
import { SERVICES } from "@/data/services";
import { LANGUAGES } from "@/data/languages";
import { POSTS } from "@/data/posts";
import { DICTIONARIES } from "@/data/dictionary";
import { USECASES } from "@/data/usecases";

const SITE_URL = "https://techperevod.com";

export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes = [
    "",
    "/perevodchik",
    "/tarify",
    "/product/orchestrator",
    "/product/terminology",
    "/product/api",
    "/product/localization",
    "/uslugi",
    "/zadachi",
    "/otrasli",
    "/perevod",
    "/slovar",
    "/bezopasnost",
    "/o-nas",
    "/blog",
    "/keysy",
    "/primery-perevodov",
    "/standarty",
    "/kontakty",
    "/oferta",
    "/politika-pd",
  ].map((path) => ({
    url: `${SITE_URL}${path}`,
    changeFrequency: "monthly" as const,
    priority: path === "" ? 1 : 0.7,
  }));

  const industryRoutes = INDUSTRIES.map((i) => ({
    url: `${SITE_URL}/otrasli/${i.slug}`,
    changeFrequency: "monthly" as const,
    priority: 0.8,
  }));

  const serviceRoutes = SERVICES.map((s) => ({
    url: `${SITE_URL}/uslugi/${s.slug}`,
    changeFrequency: "monthly" as const,
    // Флагманская SEO-страница (китайское оборудование) — приоритет выше
    priority: s.slug === "perevod-kitajskogo-oborudovaniya" ? 0.9 : 0.8,
  }));

  const languageRoutes = LANGUAGES.map((l) => ({
    url: `${SITE_URL}/perevod/${l.slug}`,
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }));

  const postRoutes = POSTS.map((p) => ({
    url: `${SITE_URL}/blog/${p.slug}`,
    changeFrequency: "yearly" as const,
    priority: 0.6,
  }));

  const usecaseRoutes = USECASES.map((u) => ({
    url: `${SITE_URL}/zadachi/${u.slug}`,
    changeFrequency: "monthly" as const,
    priority: 0.8,
  }));

  const dictionaryRoutes = DICTIONARIES.map((d) => ({
    url: `${SITE_URL}/slovar/${d.slug}`,
    changeFrequency: "monthly" as const,
    priority: 0.5,
  }));

  return [
    ...staticRoutes,
    ...industryRoutes,
    ...serviceRoutes,
    ...languageRoutes,
    ...usecaseRoutes,
    ...postRoutes,
    ...dictionaryRoutes,
  ];
}
