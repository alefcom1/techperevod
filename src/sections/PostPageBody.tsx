import React from "react";
import Link from "next/link";
import { PageHero } from "@/components/layout/PageHero";
import { SectionHeader } from "@/components/marketing/SectionHeader";
import { Card } from "@/components/core/Card";
import { Badge } from "@/components/core/Badge";
import { IndustryCard } from "@/components/marketing/IndustryCard";
import { ScrollReveal } from "@/components/core/ScrollReveal";
import { Icon } from "@/components/core/Icon";
import { Button } from "@/components/core/Button";
import type { Post } from "@/data/posts";
import { formatPostDate, otherPosts } from "@/data/posts";
import { SERVICES } from "@/data/services";
import { INDUSTRIES } from "@/data/site";

const SITE_URL = "https://techperevod.com";

/** Токен инлайн-ссылки в строковых полях данных: [[/путь|текст]]. Тот же
 * синтаксис и та же реализация, что и в sections/LanguagePageBody.tsx. */
const LINK_TOKEN_RE = /\[\[(\/[^|\]]+)\|([^\]]+)\]\]/g;

/** Схлопывает токены [[/путь|текст]] до простого текста — для JSON-LD. */
function stripLinkTokens(text: string): string {
  return text.replace(LINK_TOKEN_RE, (_m, _href, label) => label);
}

/** Рендерит строку с токенами [[/путь|текст]] как обычный текст вперемешку с <Link>. */
function renderInlineLinks(text: string): React.ReactNode {
  const nodes: React.ReactNode[] = [];
  let lastIndex = 0;
  let key = 0;
  const re = new RegExp(LINK_TOKEN_RE);
  let match: RegExpExecArray | null;
  while ((match = re.exec(text)) !== null) {
    if (match.index > lastIndex) {
      nodes.push(<React.Fragment key={key++}>{text.slice(lastIndex, match.index)}</React.Fragment>);
    }
    nodes.push(
      <Link key={key++} href={match[1]}>
        {match[2]}
      </Link>
    );
    lastIndex = match.index + match[0].length;
  }
  if (lastIndex < text.length) {
    nodes.push(<React.Fragment key={key++}>{text.slice(lastIndex)}</React.Fragment>);
  }
  return nodes;
}

/** JSON-LD Article — публикатор и автор указаны как организация. */
function articleJsonLd(data: Post) {
  const path = `/blog/${data.slug}`;
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: data.title,
    description: data.excerpt,
    datePublished: data.date,
    dateModified: data.date,
    author: { "@type": "Organization", name: "Техперевод.com" },
    publisher: { "@type": "Organization", name: "Техперевод.com" },
    mainEntityOfPage: `${SITE_URL}${path}`,
  };
}

/** JSON-LD BreadcrumbList: Главная → Блог → статья. */
function breadcrumbJsonLd(data: Post) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Главная", item: `${SITE_URL}/` },
      { "@type": "ListItem", position: 2, name: "Блог", item: `${SITE_URL}/blog` },
      { "@type": "ListItem", position: 3, name: data.title, item: `${SITE_URL}/blog/${data.slug}` },
    ],
  };
}

/** JSON-LD FAQPage — только если у статьи есть блок FAQ. */
function faqJsonLd(data: Post) {
  if (!data.faq || data.faq.length === 0) return null;
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: data.faq.map((item) => ({
      "@type": "Question",
      name: item.q,
      acceptedAnswer: { "@type": "Answer", text: stripLinkTokens(item.a) },
    })),
  };
}

/**
 * Общий каркас страницы статьи /blog/*. Принимает объект Post — как
 * ServicePageBody и LanguagePageBody, только тело — не карточки, а
 * связная проза с узкой колонкой чтения.
 */
export function PostPageBody({ data }: { data: Post }) {
  const services = data.relatedServiceSlugs
    .map((slug) => SERVICES.find((s) => s.slug === slug))
    .filter((s): s is NonNullable<typeof s> => Boolean(s));
  const industries = data.relatedIndustrySlugs
    .map((slug) => INDUSTRIES.find((i) => i.slug === slug))
    .filter((i): i is NonNullable<typeof i> => Boolean(i));
  const others = otherPosts(data.slug, 3);
  const faqLd = faqJsonLd(data);

  // Чередуем tp-section / tp-section--tint по ходу страницы, начиная с
  // обычного фона сразу после шапки — как в ServicePageBody. Финальная
  // CTA-карточка всегда на обычном фоне, вне счётчика.
  let sectionIndex = 0;
  const nextSectionClass = () => (sectionIndex++ % 2 === 0 ? "tp-section" : "tp-section--tint");

  return (
    <>
      {/* Структурированные данные для сниппетов поиска */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd(data)) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd(data)) }}
      />
      {faqLd ? (
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqLd) }} />
      ) : null}

      <PageHero
        breadcrumb={
          <span>
            <Link href="/">Главная</Link> / <Link href="/blog">Блог</Link> / {data.title}
          </span>
        }
        icon={<Icon name={data.coverIconName} size={26} />}
        title={data.title}
        subtitle={data.excerpt}
        badge={
          <span
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              flexWrap: "wrap",
              gap: "var(--tp-space-3)",
            }}
          >
            <Badge tone="accent">{data.category}</Badge>
            <span className="tp-post-meta">
              <Icon name="calendar" size={14} />
              <span>{formatPostDate(data.date)}</span>
              <span className="tp-post-meta__dot">·</span>
              <span>{data.readMinutes} мин чтения</span>
            </span>
          </span>
        }
        ctaHref="/kontakty"
        ctaLabel="Получить оценку за 2 минуты"
      />

      {/* Тело статьи — узкая колонка чтения, заголовки + абзацы с инлайн-ссылками */}
      <section className={nextSectionClass()}>
        <div className="tp-section__inner">
          <ScrollReveal>
            <article className="tp-post-body">
              {data.sections.map((section) => (
                <div className="tp-post-section" key={section.heading}>
                  <h2 className="tp-post-section__title">{section.heading}</h2>
                  {section.body.map((paragraph, i) => (
                    <p key={i}>{renderInlineLinks(paragraph)}</p>
                  ))}
                </div>
              ))}
            </article>
          </ScrollReveal>
        </div>
      </section>

      {/* FAQ — доступный аккордеон на <details>, дублируется в JSON-LD выше */}
      {data.faq && data.faq.length > 0 ? (
        <section className={nextSectionClass()}>
          <div className="tp-section__inner">
            <ScrollReveal>
              <SectionHeader title="Частые вопросы" />
            </ScrollReveal>
            <div className="tp-faq">
              {data.faq.map((item, i) => (
                <ScrollReveal key={item.q} delay={i * 50} as="div">
                  <details className="tp-faq__item">
                    <summary className="tp-faq__q">
                      <span>{item.q}</span>
                      <Icon name="arrow-right" size={18} className="tp-faq__chevron" />
                    </summary>
                    <p className="tp-faq__a">{renderInlineLinks(item.a)}</p>
                  </details>
                </ScrollReveal>
              ))}
            </div>
          </div>
        </section>
      ) : null}

      {services.length > 0 ? (
        <section className={nextSectionClass()}>
          <div className="tp-section__inner">
            <ScrollReveal>
              <SectionHeader title="Смежные услуги" />
            </ScrollReveal>
            <div className="tp-industry-grid">
              {services.map((svc, i) => (
                <ScrollReveal key={svc.slug} delay={i * 70}>
                  <Link href={`/uslugi/${svc.slug}`} style={{ textDecoration: "none", display: "block" }}>
                    <IndustryCard icon={<Icon name={svc.iconName} color="var(--tp-primary)" />} name={svc.name} />
                  </Link>
                </ScrollReveal>
              ))}
            </div>
          </div>
        </section>
      ) : null}

      {industries.length > 0 ? (
        <section className={nextSectionClass()}>
          <div className="tp-section__inner">
            <ScrollReveal>
              <SectionHeader title="Смежные отрасли" />
            </ScrollReveal>
            <div className="tp-industry-grid">
              {industries.map((ind, i) => (
                <ScrollReveal key={ind.slug} delay={i * 70}>
                  <Link href={`/otrasli/${ind.slug}`} style={{ textDecoration: "none", display: "block" }}>
                    <IndustryCard icon={<Icon name={ind.iconName} color="var(--tp-primary)" />} name={ind.name} />
                  </Link>
                </ScrollReveal>
              ))}
            </div>
          </div>
        </section>
      ) : null}

      {others.length > 0 ? (
        <section className={nextSectionClass()}>
          <div className="tp-section__inner">
            <ScrollReveal>
              <SectionHeader title="Другие статьи" />
            </ScrollReveal>
            <div className="tp-blog-grid">
              {others.map((post, i) => (
                <ScrollReveal key={post.slug} delay={(i % 3) * 70}>
                  <Link href={`/blog/${post.slug}`} style={{ textDecoration: "none", display: "block", height: "100%" }}>
                    <Card variant="elevated" padding="lg" interactive className="tp-blog-card">
                      <Badge tone={i % 2 === 0 ? "accent" : "neutral"} size="sm">
                        {post.category}
                      </Badge>
                      <h3 className="tp-blog-card__title">{post.title}</h3>
                      <p className="tp-blog-card__excerpt">{post.excerpt}</p>
                      <div className="tp-blog-card__meta">
                        <Icon name="calendar" size={14} />
                        <span>{formatPostDate(post.date)}</span>
                        <span>·</span>
                        <span>{post.readMinutes} мин</span>
                      </div>
                    </Card>
                  </Link>
                </ScrollReveal>
              ))}
            </div>
          </div>
        </section>
      ) : null}

      <section className="tp-section">
        <div className="tp-section__inner">
          <ScrollReveal>
            <Card variant="glass" className="tp-about-cta">
              <div>
                <div className="tp-value-card__title" style={{ fontSize: 22, marginBottom: 8 }}>
                  Пришлите документ — оценим за 2 минуты
                </div>
                <p className="tp-value-card__desc">
                  Объём, стоимость и срок вы увидите сразу после загрузки, до оформления заказа. Работаем по
                  152-ФЗ, данные храним в РФ — <Link href="/bezopasnost">NDA подписываем за 2 часа</Link>.
                </p>
              </div>
              <Button size="lg" variant="primary" as="a" href="/kontakty">
                Получить оценку
              </Button>
            </Card>
          </ScrollReveal>
        </div>
      </section>
    </>
  );
}
