import React from "react";
import Link from "next/link";
import { PageHero } from "@/components/layout/PageHero";
import { Card } from "@/components/core/Card";
import { Badge } from "@/components/core/Badge";
import { Icon } from "@/components/core/Icon";
import { ScrollReveal } from "@/components/core/ScrollReveal";
import { POSTS, formatPostDate } from "@/data/posts";

/** Индекс блога /blog — карточка на каждую статью из data/posts.ts. */
export function BlogBody() {
  return (
    <>
      <PageHero
        breadcrumb={
          <span>
            <Link href="/">Главная</Link> / Блог
          </span>
        }
        title="Блог"
        subtitle="Об AI-оркестрации, работе с термбазой и техническом переводе по отраслям."
        ctaHref="/#hero"
      />

      <section className="tp-section">
        <div className="tp-section__inner">
          <div className="tp-blog-grid">
            {POSTS.map((p, i) => (
              <ScrollReveal key={p.slug} delay={(i % 3) * 70}>
                <Link href={`/blog/${p.slug}`} style={{ textDecoration: "none", display: "block", height: "100%" }}>
                  <Card variant="elevated" padding="lg" interactive className="tp-blog-card">
                    <Badge tone={i % 3 === 0 ? "accent" : "neutral"} size="sm">
                      {p.category}
                    </Badge>
                    <h3 className="tp-blog-card__title">{p.title}</h3>
                    <p className="tp-blog-card__excerpt">{p.excerpt}</p>
                    <div className="tp-blog-card__meta">
                      <Icon name="calendar" size={14} />
                      <span>{formatPostDate(p.date)}</span>
                      <span>·</span>
                      <span>{p.readMinutes} мин</span>
                    </div>
                  </Card>
                </Link>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
