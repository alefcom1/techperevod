import type { Metadata } from "next";
import { SiteShell } from "@/components/layout/SiteShell";
import { BlogBody } from "@/sections/BlogBody";
import { getContent } from "@/lib/site-content";

export const dynamic = "force-dynamic";

export async function generateMetadata(): Promise<Metadata> {
  const { title, description } = (await getContent()).meta.blog;
  return {
    title,
    description,
    alternates: { canonical: "/blog" },
    openGraph: { title: `${title} | Техперевод.com`, url: "/blog", type: "website" },
  };
}

export default function BlogPage() {
  return (
    <SiteShell>
      <BlogBody />
    </SiteShell>
  );
}
