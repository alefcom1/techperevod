import type { Metadata } from "next";
import { SiteShell } from "@/components/layout/SiteShell";
import { IndustriesHubBody } from "@/sections/IndustriesHubBody";

const title = "Перевод документации по отраслям";
const description =
  "Технический перевод с отраслевой термбазой: нефтегаз, машиностроение, IT, медтех, строительство, автопром, металлургия, авиация и другие направления.";

export function generateMetadata(): Metadata {
  return {
    title,
    description,
    alternates: { canonical: "/otrasli" },
    openGraph: { title, description, url: "/otrasli", type: "website" },
  };
}

export default function IndustriesHubPage() {
  return (
    <SiteShell>
      <IndustriesHubBody />
    </SiteShell>
  );
}
