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
import { CASES } from "@/data/cases";

const SITE_URL = "https://techperevod.com";

function breadcrumbJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Главная", item: `${SITE_URL}/` },
      { "@type": "ListItem", position: 2, name: "Кейсы", item: `${SITE_URL}/keysy` },
    ],
  };
}

/** Хаб-страница /keysy — реальные клиенты и что мы для них переводим. */
export function KeysyBody() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd()) }}
      />

      <PageHero
        breadcrumb={
          <span>
            <Link href="/">Главная</Link> / Кейсы
          </span>
        }
        badge={<Badge tone="accent">{CASES.length} компаний</Badge>}
        icon={<Icon name="user-check" size={26} />}
        title="Компании, которые работают с нами годами"
        subtitle="От 10 до 25 лет сотрудничества — производство, тяжёлое машиностроение, строительство, сельхозтехника, юридические услуги."
        ctaHref="/kontakty"
        ctaLabel="Стать следующим кейсом"
      />

      <section className="tp-section">
        <div className="tp-section__inner">
          <ScrollReveal>
            <p className="tp-service-intro">
              Здесь — реальные, действующие клиенты платформы, а не абстрактные примеры. Мы намеренно не
              приводим цифры и детали, которые нам не подтверждали сами компании — только то, что описывает
              суть многолетней работы.
            </p>
          </ScrollReveal>
        </div>
      </section>

      <section className="tp-section tp-section--tint">
        <div className="tp-section__inner">
          <ScrollReveal>
            <SectionHeader title="Истории сотрудничества" />
          </ScrollReveal>
          <div style={{ display: "flex", flexDirection: "column", gap: "var(--tp-space-6)" }}>
            {CASES.map((c, i) => (
              <ScrollReveal key={c.slug} delay={i * 50} as="div">
                <Card padding="lg" id={c.slug} style={{ scrollMarginTop: 96 }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", flexWrap: "wrap", gap: "var(--tp-space-4)", marginBottom: "var(--tp-space-4)" }}>
                    <div style={{ display: "flex", alignItems: "center", gap: "var(--tp-space-4)" }}>
                      <div className="tp-value-card__icon">
                        <Icon name={c.iconName} size={22} />
                      </div>
                      <div className="tp-value-card__title" style={{ fontSize: 20 }}>
                        {c.name}
                      </div>
                    </div>
                    <Badge tone="primary">{c.years}</Badge>
                  </div>
                  <p className="tp-value-card__desc" style={{ fontSize: 16, marginBottom: "var(--tp-space-4)" }}>
                    {c.summary}
                  </p>
                  <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
                    {c.languages.map((l) => (
                      <FormatChip key={l}>{l}</FormatChip>
                    ))}
                    {c.docTypes.map((d) => (
                      <Badge key={d} tone="neutral" size="sm">
                        {d}
                      </Badge>
                    ))}
                  </div>
                </Card>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      <section className="tp-section">
        <div className="tp-section__inner">
          <ScrollReveal>
            <Card variant="glass" className="tp-about-cta">
              <div>
                <div className="tp-value-card__title" style={{ fontSize: 22, marginBottom: 8 }}>
                  Хотите так же?
                </div>
                <p className="tp-value-card__desc">
                  Пришлите документ — оценим объём и стоимость за 2 минуты, дальше решаем, как выстроить
                  долгосрочную работу.
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
