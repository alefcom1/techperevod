import React from "react";
import Link from "next/link";
import { PageHero } from "@/components/layout/PageHero";
import { SectionHeader } from "@/components/marketing/SectionHeader";
import { Card } from "@/components/core/Card";
import { Badge } from "@/components/core/Badge";
import { ScrollReveal } from "@/components/core/ScrollReveal";
import { Icon } from "@/components/core/Icon";
import { Button } from "@/components/core/Button";
import { STANDARD_GROUPS } from "@/data/standards";
import { getService } from "@/data/services";
import { getPost } from "@/data/posts";

const SITE_URL = "https://techperevod.com";

function breadcrumbJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Главная", item: `${SITE_URL}/` },
      { "@type": "ListItem", position: 2, name: "Стандарты и нормативы перевода", item: `${SITE_URL}/standarty` },
    ],
  };
}

const TOTAL_STANDARDS = STANDARD_GROUPS.reduce((sum, g) => sum + g.standards.length, 0);

/** Хаб-страница /standarty — на какие стандарты и нормативы опирается перевод по 3 группам специализаций. */
export function StandartyBody() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd()) }}
      />

      <PageHero
        breadcrumb={
          <span>
            <Link href="/">Главная</Link> / Стандарты и нормативы перевода
          </span>
        }
        badge={<Badge tone="accent">{TOTAL_STANDARDS} стандартов и нормативов</Badge>}
        icon={<Icon name="shield-check" size={26} />}
        title="Стандарты и нормативы перевода"
        subtitle="На что мы опираемся при переводе технической, медицинской, юридической и IT-документации — и что конкретно каждый стандарт требует от готового текста."
        ctaHref="/kontakty"
        ctaLabel="Спросить про конкретный стандарт"
      />

      <section className="tp-section tp-samples-filter-section">
        <div className="tp-section__inner" style={{ gap: "var(--tp-space-4)" }}>
          <nav className="tp-samples-filter" aria-label="Быстрый переход по группам стандартов">
            {STANDARD_GROUPS.map((group) => (
              <a key={group.key} href={`#${group.key}`} className="tp-samples-filter__chip">
                <Icon name={group.iconName} size={16} />
                {group.label}
                <span className="tp-samples-filter__count">{group.standards.length}</span>
              </a>
            ))}
          </nav>
        </div>
      </section>

      {STANDARD_GROUPS.map((group, groupIndex) => (
        <section
          key={group.key}
          id={group.key}
          className={`tp-section${groupIndex % 2 === 1 ? " tp-section--tint" : ""}`}
          style={{ scrollMarginTop: 88 }}
        >
          <div className="tp-section__inner">
            <ScrollReveal>
              <div className="tp-samples-spec-header">
                <div className="tp-samples-spec-header__icon">
                  <Icon name={group.iconName} size={24} />
                </div>
                <SectionHeader align="left" title={group.label} subtitle={group.description} />
              </div>
            </ScrollReveal>

            <div className="tp-standards-grid">
              {group.standards.map((std, i) => {
                const service = std.relatedServiceSlug ? getService(std.relatedServiceSlug) : undefined;
                const post = std.relatedPostSlug ? getPost(std.relatedPostSlug) : undefined;
                return (
                  <ScrollReveal key={std.id} delay={i * 60}>
                    <Card padding="lg" className="tp-standard-card" id={std.id} style={{ scrollMarginTop: 88 }}>
                      <div>
                        <div className="tp-standard-card__code">{std.code}</div>
                        <div className="tp-standard-card__fullname">{std.fullName}</div>
                      </div>

                      <p className="tp-standard-card__summary">{std.summary}</p>

                      <div className="tp-sample-card__markers">
                        <div className="tp-sample-card__markers-label">Что это значит для перевода</div>
                        <ul>
                          {std.requirements.map((r) => (
                            <li key={r}>{r}</li>
                          ))}
                        </ul>
                      </div>

                      <div className="tp-standard-card__footer">
                        <div className="tp-standard-card__forwhom">
                          <Icon name="user-check" size={16} />
                          <span>{std.forWhom}</span>
                        </div>
                        {service ? (
                          <Link href={`/uslugi/${service.slug}`} className="tp-standard-card__link">
                            {service.name}
                            <Icon name="arrow-right" size={14} />
                          </Link>
                        ) : null}
                        {post ? (
                          <Link href={`/blog/${post.slug}`} className="tp-standard-card__link">
                            Подробнее
                            <Icon name="arrow-right" size={14} />
                          </Link>
                        ) : null}
                      </div>
                    </Card>
                  </ScrollReveal>
                );
              })}
            </div>
          </div>
        </section>
      ))}

      <section className="tp-section">
        <div className="tp-section__inner">
          <ScrollReveal>
            <Card variant="glass" className="tp-about-cta">
              <div>
                <div className="tp-value-card__title" style={{ fontSize: 22, marginBottom: 8 }}>
                  Нужен перевод под конкретный стандарт?
                </div>
                <p className="tp-value-card__desc">
                  Скажите, под какой норматив готовится документ — ISO 13485, 152-ФЗ или требования Роспатента —
                  подберём редактора с нужным профилем.
                </p>
              </div>
              <Button size="lg" variant="primary" as="a" href="/kontakty">
                Обсудить проект
              </Button>
            </Card>
          </ScrollReveal>
        </div>
      </section>
    </>
  );
}
