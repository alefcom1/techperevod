import { POSTS } from "@/data/posts";

const SITE_URL = "https://techperevod.com";

function escapeXml(s: string): string {
  return s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
}

export async function GET() {
  const items = POSTS.map(
    (p) => `
    <item>
      <title>${escapeXml(p.title)}</title>
      <link>${SITE_URL}/blog/${p.slug}</link>
      <guid>${SITE_URL}/blog/${p.slug}</guid>
      <pubDate>${new Date(p.date).toUTCString()}</pubDate>
      <description>${escapeXml(p.excerpt)}</description>
    </item>`,
  ).join("");

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0">
  <channel>
    <title>Техперевод.com — блог</title>
    <link>${SITE_URL}/blog</link>
    <description>Статьи о техническом переводе: стандарты, форматы, практика.</description>
    <language>ru</language>${items}
  </channel>
</rss>`;

  return new Response(xml, { headers: { "Content-Type": "application/xml; charset=utf-8" } });
}
