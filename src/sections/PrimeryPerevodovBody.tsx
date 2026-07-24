import React from "react";
import Link from "next/link";
import { PageHero } from "@/components/layout/PageHero";
import { SectionHeader } from "@/components/marketing/SectionHeader";
import { Card } from "@/components/core/Card";
import { Badge } from "@/components/core/Badge";
import { FormatChip } from "@/components/marketing/FormatChip";
import { ScrollReveal } from "@/components/core/ScrollReveal";
import { Icon } from "@/components/core/Icon";
import { Button } from "@/components/core/Button";
import { SAMPLE_SPECIALIZATIONS } from "@/data/samples";

const SITE_URL = "https://techperevod.com";

function breadcrumbJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Главная", item: `${SITE_URL}/` },
      { "@type": "ListItem", position: 2, name: "Примеры переводов", item: `${SITE_URL}/primery-perevodov` },
    ],
  };
}

const TOTAL_SAMPLES = SAMPLE_SPECIALIZATIONS.reduce((sum, s) => sum + s.samples.length, 0);

/** Хаб-страница /primery-perevodov — фрагменты «исходный текст / перевод» по 4 специализациям. */
export function PrimeryPerevodovBody() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd()) }}
      />

      <PageHero
        breadcrumb={
          <span>
            <Link href="/">Главная</Link> / Примеры переводов
          </span>
        }
        badge={<Badge tone="accent">{TOTAL_SAMPLES} фрагментов, реальный уровень без прикрас</Badge>}
        icon={<Icon name="file-text" size={26} />}
        title="Примеры переводов"
        subtitle="Исходный текст и перевод рядом — по техническому, юридическому, медицинскому и IT-переводу. Данные обезличены, но формулировки и терминология — те же, что в реальных проектах."
        ctaHref="#zakaz"
        ctaLabel="Обсудить свой документ"
      />

      <section className="tp-section tp-samples-filter-section">
        <div className="tp-section__inner" style={{ gap: "var(--tp-space-4)" }}>
          <nav className="tp-samples-filter" aria-label="Быстрый переход по специализациям">
            {SAMPLE_SPECIALIZATIONS.map((spec) => (
              <a key={spec.key} href={`#${spec.key}`} className="tp-samples-filter__chip">
                <Icon name={spec.iconName} size={16} />
                {spec.label}
                <span className="tp-samples-filter__count">{spec.samples.length}</span>
              </a>
            ))}
          </nav>
        </div>
      </section>

      {SAMPLE_SPECIALIZATIONS.map((spec, specIndex) => (
        <section
          key={spec.key}
          id={spec.key}
          className={`tp-section${specIndex % 2 === 1 ? " tp-section--tint" : ""}`}
          style={{ scrollMarginTop: 88 }}
        >
          <div className="tp-section__inner">
            <ScrollReveal>
              <div className="tp-samples-spec-header">
                <div className="tp-samples-spec-header__icon">
                  <Icon name={spec.iconName} size={24} />
                </div>
                <SectionHeader align="left" title={spec.label} subtitle={spec.description} />
              </div>
            </ScrollReveal>

            <div className="tp-samples-grid">
              {spec.samples.map((s, i) => (
                <ScrollReveal key={s.id} delay={i * 60}>
                  <Card padding="lg" className="tp-sample-card" id={s.id} style={{ scrollMarginTop: 88 }}>
                    <div className="tp-sample-card__meta">
                      <Badge tone="neutral" size="sm">
                        {s.docType}
                      </Badge>
                      <FormatChip>{s.langPair}</FormatChip>
                    </div>

                    <div className="tp-before-after tp-before-after--samples">
                      <div className="tp-before-after__panel">
                        <div className="tp-before-after__label tp-before-after__label--before">Исходный текст</div>
                        <p className="tp-before-after__text">{s.before}</p>
                      </div>
                      <div className="tp-before-after__panel tp-before-after__panel--after">
                        <div className="tp-before-after__label tp-before-after__label--after">Перевод</div>
                        <p className="tp-before-after__text">{s.after}</p>
                      </div>
                    </div>

                    <div className="tp-sample-card__markers">
                      <div className="tp-sample-card__markers-label">Что отличает профессиональный перевод</div>
                      <ul>
                        {s.markers.map((m) => (
                          <li key={m}>{m}</li>
                        ))}
                      </ul>
                    </div>
                  </Card>
                </ScrollReveal>
              ))}
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
                  Такой же уровень нужен вашему документу?
                </div>
                <p className="tp-value-card__desc">
                  Пришлите фрагмент — переведём бесплатно и покажем, как работаем, прежде чем вы закажете полный
                  объём.
                </p>
              </div>
              <Button size="lg" variant="primary" as="a" href="#zakaz">
                Обсудить проект
              </Button>
            </Card>
          </ScrollReveal>
        </div>
      </section>
    </>
  );
}
