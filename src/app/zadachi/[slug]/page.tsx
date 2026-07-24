import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { SiteShell } from "@/components/layout/SiteShell";
import { UseCasePageBody } from "@/sections/UseCasePageBody";
import { USECASES, getUseCase } from "@/data/usecases";

// Метаданные статичны и живут в data/usecases.ts — страницы пререндерятся.
export function generateStaticParams() {
  return USECASES.map((u) => ({ slug: u.slug }));
}

export function generateMetadata({ params }: { params: { slug: string } }): Metadata {
  const usecase = getUseCase(params.slug);
  if (!usecase) return {};
  const title = usecase.metaTitle || usecase.heroTitle;
  const description =
    usecase.heroSubtitle.length > 155 ? `${usecase.heroSubtitle.slice(0, 154).trimEnd()}…` : usecase.heroSubtitle;
  const path = `/zadachi/${usecase.slug}`;
  return {
    title,
    description,
    alternates: { canonical: path },
    openGraph: { title, description, url: path, type: "website" },
  };
}

export default function UseCasePage({ params }: { params: { slug: string } }) {
  const usecase = getUseCase(params.slug);
  if (!usecase) notFound();
  return (
    <SiteShell>
      <UseCasePageBody data={usecase} />
    </SiteShell>
  );
}
