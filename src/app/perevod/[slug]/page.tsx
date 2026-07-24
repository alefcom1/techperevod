import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { SiteShell } from "@/components/layout/SiteShell";
import { LanguagePageBody } from "@/sections/LanguagePageBody";
import { LANGUAGES, getLanguage } from "@/data/languages";

// Метаданные статичны и живут в data/languages.ts (без admin-store — осознанно),
// поэтому страницы можно полностью пререндерить.
export function generateStaticParams() {
  return LANGUAGES.map((l) => ({ slug: l.slug }));
}

export function generateMetadata({ params }: { params: { slug: string } }): Metadata {
  const language = getLanguage(params.slug);
  if (!language) return {};
  const title = language.metaTitle || language.heroTitle;
  const description =
    language.heroSubtitle.length > 155 ? `${language.heroSubtitle.slice(0, 154).trimEnd()}…` : language.heroSubtitle;
  const path = `/perevod/${language.slug}`;
  return {
    title,
    description,
    alternates: { canonical: path },
    openGraph: { title, description, url: path, type: "website" },
  };
}

export default function LanguagePage({ params }: { params: { slug: string } }) {
  const language = getLanguage(params.slug);
  if (!language) notFound();
  return (
    <SiteShell>
      <LanguagePageBody data={language} />
    </SiteShell>
  );
}
