import React from "react";
import Link from "next/link";
import { PageHero } from "@/components/layout/PageHero";
import { SectionHeader } from "@/components/marketing/SectionHeader";
import { Card } from "@/components/core/Card";
import { IndustryCard } from "@/components/marketing/IndustryCard";
import { ScrollReveal } from "@/components/core/ScrollReveal";
import { Icon } from "@/components/core/Icon";
import { Button } from "@/components/core/Button";
import type { UseCase } from "@/data/usecases";
import { otherUseCases } from "@/data/usecases";
import { SERVICES } from "@/data/services";
import { getIndustry } from "@/data/site";

const SITE_URL = "https://techperevod.com";

/** JSON-LD BreadcrumbList: Главная → Задачи → сценарий. */
function breadcrumbJsonLd(data: UseCase) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Главная", item: `${SITE_URL}/` },
      { "@type": "ListItem", position: 2, name: "Задачи", item: `${SITE_URL}/zadachi` },
      { "@type": "ListItem", position: 3, name: data.name, item: `${SITE_URL}/zadachi/${data.slug}` },
    ],
  };
}

/** JSON-LD FAQPage из данных сценария. */
function faqJsonLd(data: UseCase) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: data.faq.map((item) => ({
      "@type": "Question",
      name: item.q,
      acceptedAnswer: { "@type": "Answer", text: item.a },
    })),
  };
}

/**
 * Общее тело страниц /zadachi/* — сценарии использования («выйти на экспорт»,
 * «получить сертификат ЕАЭС»). Отвечает на бизнес-задачу и связывает
 * перелинковкой услуги (/uslugi) и отрасли (/otrasli).
 */
export function UseCasePageBody({ data }: { data: UseCase }) {
  const others = otherUseCases(data.slug);
  const services = data.relatedServiceSlugs
    .map((slug) => SERVICES.find((s) => s.slug === slug))
    .filter((s): s is NonNullable<typeof s> => Boolean(s));
  const industries = data.relatedIndustrySlugs
    .map((slug) => getIndustry(slug))
    .filter((i): i is NonNullable<typeof i> => Boolean(i));

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd(data)) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd(data)) }} />

      <PageHero
        breadcrumb={
          <span>
            <Link href="/">Главная</Link> / <Link href="/zadachi">Задачи</Link> / {data.name}
          </span>
        }
        icon={<Icon name={data.iconName} size={26} />}
        title={data.heroTitle}
        subtitle={data.heroSubtitle}
        ctaHref="#zakaz"
        ctaLabel="Получить оценку за 2 минуты"
      />

      {/* Вводный SEO-текст */}
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

      {/* Боли сценария */}
      <section className="tp-section tp-section--tint">
        <div className="tp-section__inner">
          <ScrollReveal>
            <SectionHeader title="Знакомая ситуация?" />
          </ScrollReveal>
          <div className="tp-doctype-grid">
            {data.painPoints.map((p, i) => (
              <ScrollReveal key={p.title} delay={i * 70} as="div">
                <Card padding="lg" className="tp-doctype-card">
                  <div className="tp-doctype-card__title">{p.title}</div>
                  <p className="tp-doctype-card__desc">{p.desc}</p>
                </Card>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Что получает клиент */}
      <section className="tp-section">
        <div className="tp-section__inner">
          <ScrollReveal>
            <SectionHeader title="Что вы получаете" />
          </ScrollReveal>
          <div className="tp-doctype-grid">
            {data.deliverables.map((d, i) => (
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

      {/* FAQ — аккордеон, дублируется в JSON-LD выше */}
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

      {services.length > 0 ? (
        <section className="tp-section">
          <div className="tp-section__inner">
            <ScrollReveal>
              <SectionHeader title="Услуги в этом сценарии" />
            </ScrollReveal>
            <div className="tp-industry-grid">
              {services.map((svc, i) => (
                <ScrollReveal key={svc.slug} delay={i * 60}>
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
        <section className="tp-section tp-section--tint">
          <div className="tp-section__inner">
            <ScrollReveal>
              <SectionHeader title="Типичные отрасли" />
            </ScrollReveal>
            <div className="tp-industry-grid">
              {industries.map((ind, i) => (
                <ScrollReveal key={ind.slug} delay={i * 60}>
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
        <section className="tp-section">
          <div className="tp-section__inner">
            <ScrollReveal>
              <SectionHeader title="Другие задачи" />
            </ScrollReveal>
            <div className="tp-industry-grid">
              {others.map((u, i) => (
                <ScrollReveal key={u.slug} delay={i * 60}>
                  <Link href={`/zadachi/${u.slug}`} style={{ textDecoration: "none", display: "block" }}>
                    <IndustryCard icon={<Icon name={u.iconName} color="var(--tp-primary)" />} name={u.name} />
                  </Link>
                </ScrollReveal>
              ))}
            </div>
          </div>
        </section>
      ) : null}

      <section className="tp-section tp-section--tint">
        <div className="tp-section__inner">
          <ScrollReveal>
            <Card variant="glass" className="tp-about-cta">
              <div>
                <div className="tp-value-card__title" style={{ fontSize: 22, marginBottom: 8 }}>
                  Пришлите документы — оценим за 2 минуты
                </div>
                <p className="tp-value-card__desc">
                  Объём, стоимость и срок вы увидите сразу после загрузки, до оформления заказа. Работаем по 152-ФЗ,
                  данные храним в РФ — <Link href="/bezopasnost">NDA подписываем за 2 часа</Link>.
                </p>
              </div>
              <Button size="lg" variant="primary" as="a" href="#zakaz">
                Получить оценку
              </Button>
            </Card>
          </ScrollReveal>
        </div>
      </section>
    </>
  );
}
