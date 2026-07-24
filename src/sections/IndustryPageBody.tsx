import React from "react";
import Link from "next/link";
import { PageHero } from "@/components/layout/PageHero";
import { SectionHeader } from "@/components/marketing/SectionHeader";
import { Card } from "@/components/core/Card";
import { PricingCard } from "@/components/marketing/PricingCard";
import { Badge } from "@/components/core/Badge";
import { IndustryCard } from "@/components/marketing/IndustryCard";
import { FormatChip } from "@/components/marketing/FormatChip";
import { StackedSteps } from "@/components/marketing/StackedSteps";
import { ScrollReveal } from "@/components/core/ScrollReveal";
import { Icon } from "@/components/core/Icon";
import { Button } from "@/components/core/Button";
import type { Industry } from "@/data/site";
import { otherIndustries } from "@/data/site";
import { SERVICES } from "@/data/services";
import { SamplesSection } from "@/sections/SamplesSection";

const SITE_URL = "https://techperevod.com";

/** JSON-LD BreadcrumbList: Главная → Отрасли → конкретная отрасль. */
function breadcrumbJsonLd(data: Industry) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Главная", item: `${SITE_URL}/` },
      { "@type": "ListItem", position: 2, name: "Отрасли", item: `${SITE_URL}/otrasli` },
      { "@type": "ListItem", position: 3, name: data.name, item: `${SITE_URL}/otrasli/${data.slug}` },
    ],
  };
}

/** JSON-LD FAQPage — собирается на сервере, если у отрасли заполнен faq. */
function faqJsonLd(data: Industry) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: (data.faq ?? []).map((item) => ({
      "@type": "Question",
      name: item.q,
      acceptedAnswer: { "@type": "Answer", text: item.a },
    })),
  };
}

/**
 * Shared content for every /otrasli/* industry page. Takes a plain Industry
 * object so the four pages stay thin and only differ in content.
 */
export function IndustryPageBody({ data }: { data: Industry }) {
  const others = otherIndustries(data.slug);
  const relatedServices = SERVICES.filter((s) => data.relatedServiceSlugs.includes(s.slug));

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd(data)) }}
      />
      {data.faq && data.faq.length > 0 ? (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd(data)) }}
        />
      ) : null}

      <PageHero
        breadcrumb={
          <span>
            <Link href="/">Главная</Link> / <Link href="/#industries">Отрасли</Link> / {data.name}
          </span>
        }
        icon={<Icon name={data.iconName} size={26} />}
        title={data.heroTitle}
        subtitle={data.heroSubtitle}
        ctaHref="#zakaz"
      />

      {data.intro && data.intro.length > 0 ? (
        <section className="tp-section">
          <div className="tp-section__inner">
            <ScrollReveal>
              <div className="tp-service-intro">
                {data.intro.map((paragraph, i) => (
                  <p key={i}>{paragraph}</p>
                ))}
              </div>
            </ScrollReveal>
          </div>
        </section>
      ) : null}

      <section className="tp-section">
        <div className="tp-section__inner">
          <ScrollReveal>
            <SectionHeader title="Что мы переводим" />
          </ScrollReveal>
          <div className="tp-doctype-grid">
            {data.docTypes.map((d, i) => (
              <ScrollReveal key={d.title} delay={i * 70} as="div">
                <Card padding="lg" className="tp-doctype-card">
                  <div className="tp-doctype-card__icon">
                    <Icon name={d.iconName} size={20} />
                  </div>
                  <div className="tp-doctype-card__title">{d.title}</div>
                  <p className="tp-doctype-card__desc">{d.desc}</p>
                </Card>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      <section className="tp-section tp-section--tint">
        <div className="tp-section__inner">
          <StackedSteps
            aside={
              <>
                <h2
                  className="tp-section-header__title"
                  style={{ fontSize: "var(--tp-text-h1)", lineHeight: "var(--tp-leading-display)" }}
                >
                  Как проходит <span className="tp-hero__title-accent">перевод</span>
                </h2>
                <p className="tp-section-header__subtitle">
                  {data.name}: от загрузки документа до сдачи готового перевода в исходном формате.
                </p>
                <div>
                  <Button variant="ghost" as="a" href="/perevodchik">
                    Попробовать бесплатно →
                  </Button>
                </div>
              </>
            }
            steps={data.steps.map((s) => ({
              title: s.title,
              description: s.description,
              rows: (s.bullets ?? []).map((b) => ({
                icon: <Icon name="check" size={20} color="var(--tp-accent)" />,
                text: b,
              })),
            }))}
          />
        </div>
      </section>

      <section className="tp-section">
        <div className="tp-section__inner">
          <ScrollReveal>
            <SectionHeader title="Форматы, с которыми мы работаем в этой отрасли" />
          </ScrollReveal>
          <div className="tp-format-strip">
            {data.formats.map((f) => (
              <FormatChip key={f}>{f}</FormatChip>
            ))}
          </div>
        </div>
      </section>

      <SamplesSection slug={data.slug} />

      <section className="tp-section tp-section--tint">
        <div className="tp-section__inner">
          <ScrollReveal>
            <SectionHeader
              title="Тарифы"
              subtitle="Те же три уровня, адаптированные под объём и срочность отраслевой документации"
            />
          </ScrollReveal>
          <div className="tp-pricing-grid">
            <ScrollReveal delay={0}>
              <PricingCard
                name="Full"
                description="Перевод + редактура инженером профильной специализации."
                features={["Инженер-переводчик по отрасли", "Полная редактура", "Персональная термбаза"]}
              />
            </ScrollReveal>
            <ScrollReveal delay={80}>
              <PricingCard
                name="MTPE"
                featured
                badge={<Badge tone="accent">Популярный</Badge>}
                description="AI-черновик + доводка человеком."
                features={["AI-оркестрация черновика", "Правка инженером", "Экономия 30–40%"]}
              />
            </ScrollReveal>
            <ScrollReveal delay={160}>
              <PricingCard
                name="Express"
                description="Срочная сдача, приоритетная очередь."
                features={["Приоритетная очередь", "Сдача от 24 часов"]}
              />
            </ScrollReveal>
          </div>
        </div>
      </section>

      {data.faq && data.faq.length > 0 ? (
        <section className="tp-section tp-section--tint">
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
                    <p className="tp-faq__a">{item.a}</p>
                  </details>
                </ScrollReveal>
              ))}
            </div>
          </div>
        </section>
      ) : null}

      {relatedServices.length ? (
        <section className="tp-section">
          <div className="tp-section__inner">
            <ScrollReveal>
              <SectionHeader title="Смежные услуги" />
            </ScrollReveal>
            <div className="tp-industry-grid">
              {relatedServices.map((s, i) => (
                <ScrollReveal key={s.slug} delay={i * 70}>
                  <Link href={`/uslugi/${s.slug}`} style={{ textDecoration: "none", display: "block" }}>
                    <IndustryCard icon={<Icon name={s.iconName} color="var(--tp-primary)" />} name={s.name} />
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
            <SectionHeader title="Другие отрасли" />
          </ScrollReveal>
          <div className="tp-industry-grid">
            {others.map((ind, i) => (
              <ScrollReveal key={ind.slug} delay={i * 70}>
                <Link href={`/otrasli/${ind.slug}`} style={{ textDecoration: "none", display: "block" }}>
                  <IndustryCard icon={<Icon name={ind.iconName} color="var(--tp-primary)" />} name={ind.name} />
                </Link>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
