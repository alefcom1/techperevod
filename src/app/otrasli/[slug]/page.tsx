import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { SiteShell } from "@/components/layout/SiteShell";
import { IndustryPageBody } from "@/sections/IndustryPageBody";
import { INDUSTRIES, getIndustry } from "@/data/site";
import { getContent } from "@/lib/site-content";

export const dynamic = "force-dynamic";

export function generateStaticParams() {
  return INDUSTRIES.map((i) => ({ slug: i.slug }));
}

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const industry = getIndustry(params.slug);
  if (!industry) return {};
  const override = (await getContent()).meta.otrasli[industry.slug];
  const title = override?.title || industry.metaTitle || industry.heroTitle;
  const description = override?.description || industry.heroSubtitle;
  const path = `/otrasli/${industry.slug}`;
  return {
    title,
    description,
    alternates: { canonical: path },
    openGraph: { title, description, url: path, type: "website" },
  };
}

export default function IndustryPage({ params }: { params: { slug: string } }) {
  const industry = getIndustry(params.slug);
  if (!industry) notFound();
  return (
    <SiteShell>
      <IndustryPageBody data={industry} />
    </SiteShell>
  );
}
