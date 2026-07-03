import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { SiteShell } from "@/components/layout/SiteShell";
import { DictionaryPageBody } from "@/sections/DictionaryPageBody";
import { DICTIONARIES, getDictionary } from "@/data/dictionary";

// Метаданные и содержимое статичны и живут в data/dictionary.ts (без
// admin-content-store — осознанно, по образцу uslugi/[slug]), поэтому
// страницы можно полностью пререндерить.
export function generateStaticParams() {
  return DICTIONARIES.map((d) => ({ slug: d.slug }));
}

export function generateMetadata({ params }: { params: { slug: string } }): Metadata {
  const dict = getDictionary(params.slug);
  if (!dict) return {};
  const title = dict.title;
  const description = dict.subtitle;
  const path = `/slovar/${dict.slug}`;
  return {
    title,
    description,
    alternates: { canonical: path },
    openGraph: {
      title: `${title} | Техперевод.com`,
      description,
      url: path,
      type: "website",
    },
  };
}

export default function DictionaryCollectionPage({ params }: { params: { slug: string } }) {
  const dict = getDictionary(params.slug);
  if (!dict) notFound();
  return (
    <SiteShell>
      <DictionaryPageBody data={dict} />
    </SiteShell>
  );
}
