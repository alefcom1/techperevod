import type { Metadata } from "next";
import { SiteShell } from "@/components/layout/SiteShell";
import { BlogBody } from "@/sections/BlogBody";

export const metadata: Metadata = {
  title: "Блог",
  description:
    "Статьи об AI-оркестрации, работе с термбазой и памятью переводов, и техническом переводе по отраслям — от нефтегаза до медтеха.",
  alternates: { canonical: "/blog" },
  openGraph: { title: "Блог | techperevod.com", url: "/blog", type: "website" },
};

export default function BlogPage() {
  return (
    <SiteShell>
      <BlogBody />
    </SiteShell>
  );
}
