import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { SiteShell } from "@/components/layout/SiteShell";
import { ServicePageBody } from "@/sections/ServicePageBody";
import { SERVICES, getService } from "@/data/services";

// Метаданные статичны и живут в data/services.ts (без admin-store — осознанно),
// поэтому страницы можно полностью пререндерить.
export function generateStaticParams() {
  return SERVICES.map((s) => ({ slug: s.slug }));
}

export function generateMetadata({ params }: { params: { slug: string } }): Metadata {
  const service = getService(params.slug);
  if (!service) return {};
  const title = service.heroTitle;
  const description = service.heroSubtitle;
  const path = `/uslugi/${service.slug}`;
  return {
    title,
    description,
    alternates: { canonical: path },
    openGraph: { title, description, url: path, type: "website" },
  };
}

export default function ServicePage({ params }: { params: { slug: string } }) {
  const service = getService(params.slug);
  if (!service) notFound();
  return (
    <SiteShell>
      <ServicePageBody data={service} />
    </SiteShell>
  );
}
