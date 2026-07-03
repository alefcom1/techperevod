import type { Metadata } from "next";
import { SiteShell } from "@/components/layout/SiteShell";
import { PricingPlansBody } from "@/sections/PricingPlansBody";
import { getContent } from "@/lib/site-content";

export const dynamic = "force-dynamic";

export async function generateMetadata(): Promise<Metadata> {
  const { title, description } = (await getContent()).meta.tarify;
  return {
    title,
    description,
    alternates: { canonical: "/tarify" },
    openGraph: { title: `${title} | Техперевод.com`, url: "/tarify", type: "website" },
  };
}

export default async function PricingPage() {
  const content = await getContent();
  return (
    <SiteShell>
      <PricingPlansBody content={content.tarify} />
    </SiteShell>
  );
}
