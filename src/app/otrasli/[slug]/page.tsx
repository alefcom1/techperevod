import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { SiteShell } from "@/components/layout/SiteShell";
import { IndustryPageBody } from "@/sections/IndustryPageBody";
import { INDUSTRIES, getIndustry } from "@/data/site";

export function generateStaticParams() {
  return INDUSTRIES.map((i) => ({ slug: i.slug }));
}

export function generateMetadata({ params }: { params: { slug: string } }): Metadata {
  const industry = getIndustry(params.slug);
  if (!industry) return {};
  const path = `/otrasli/${industry.slug}`;
  return {
    title: industry.heroTitle,
    description: industry.heroSubtitle,
    alternates: { canonical: path },
    openGraph: {
      title: industry.heroTitle,
      description: industry.heroSubtitle,
      url: path,
      type: "website",
    },
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
