import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { SiteShell } from "@/components/layout/SiteShell";
import { PostPageBody } from "@/sections/PostPageBody";
import { POSTS, getPost } from "@/data/posts";

// Данные статей статичны и живут в data/posts.ts (без admin-store —
// осознанно, как и /uslugi/[slug]), поэтому страницы можно полностью
// пререндерить.
export function generateStaticParams() {
  return POSTS.map((p) => ({ slug: p.slug }));
}

export function generateMetadata({ params }: { params: { slug: string } }): Metadata {
  const post = getPost(params.slug);
  if (!post) return {};
  const title = post.title;
  const description = post.excerpt;
  const path = `/blog/${post.slug}`;
  return {
    title,
    description,
    alternates: { canonical: path },
    openGraph: { title: `${title} | Техперевод.com`, description, url: path, type: "article" },
  };
}

export default function PostPage({ params }: { params: { slug: string } }) {
  const post = getPost(params.slug);
  if (!post) notFound();
  return (
    <SiteShell>
      <PostPageBody data={post} />
    </SiteShell>
  );
}
