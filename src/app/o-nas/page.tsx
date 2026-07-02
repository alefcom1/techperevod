import type { Metadata } from "next";
import { SiteShell } from "@/components/layout/SiteShell";
import { AboutBody } from "@/sections/AboutBody";
import { getContent } from "@/lib/site-content";

export const dynamic = "force-dynamic";

export async function generateMetadata(): Promise<Metadata> {
  const { title, description } = (await getContent()).meta["o-nas"];
  return {
    title,
    description,
    alternates: { canonical: "/o-nas" },
    openGraph: { title: `${title} | techperevod.com`, url: "/o-nas", type: "website" },
  };
}

export default function AboutPage() {
  return (
    <SiteShell>
      <AboutBody />
    </SiteShell>
  );
}
