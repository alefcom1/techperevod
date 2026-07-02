import React from "react";
import Link from "next/link";
import { PageHero } from "@/components/layout/PageHero";
import { SectionHeader } from "@/components/marketing/SectionHeader";
import { Card } from "@/components/core/Card";
import { IndustryCard } from "@/components/marketing/IndustryCard";
import { FormatChip } from "@/components/marketing/FormatChip";
import { ScrollReveal } from "@/components/core/ScrollReveal";
import { Icon } from "@/components/core/Icon";
import { Button } from "@/components/core/Button";
import type { Service } from "@/data/services";
import { otherServices } from "@/data/services";
import { getIndustry } from "@/data/site";

const SITE_URL = "https://techperevod.com";

/** JSON-LD FAQPage — собирается на сервере из данных услуги. */
function faqJsonLd(data: Service) {
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

/** JSON-LD BreadcrumbList: Главная → страница услуги. */
function breadcrumbJsonLd(data: Service) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Главная", item: `${SITE_URL}/` },
      {
        "@type": "ListItem",
        position: 2,
        name: data.name,
        item: `${SITE_URL}/uslugi/${data.slug}`,
      },
    ],
  };
}

/**
 * Общий каркас страницы услуги /uslugi/*. Принимает объект Service,
 * поэтому все семь страниц различаются только контентом — как IndustryPageBody.
 */
export function ServicePageBody({ data }: { data: Service }) {
  const others = otherServices(data.slug);
  const industries = data.relatedIndustrySlugs
    .map((slug) => getIndustry(slug))
    .filter((i): i is NonNullable<typeof i> => Boolean(i));

  return (
    <>
      {/* Структурированные данные для сниппетов поиска */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd(data)) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd(data)) }}
      />

      <PageHero
        breadcrumb={
          <span>
            <Link href="/">Главная</Link> / Услуги / {data.name}
          </span>
        }
        icon={<Icon name={data.iconName} size={26} />}
        title={data.heroTitle}
        subtitle={data.heroSubtitle}
        ctaHref="/kontakty"
        ctaLabel="Получить оценку за 2 минуты"
      />

      {/* Вводный SEO-текст — узкая читабельная колонка */}
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

      <section className="tp-section tp-section--tint">
        <div className="tp-section__inner">
          <ScrollReveal>
            <SectionHeader title="Что мы переводим" />
          </ScrollReveal>
          <div className="tp-doctype-grid">
            {data.whatWeTranslate.map((d, i) => (
              <ScrollReveal key={d.title} delay={i * 70} as="div">
                <Card padding="lg" className="tp-doctype-card">
                  <div className="tp-doctype-card__title">{d.title}</div>
                  <p className="tp-doctype-card__desc">{d.desc}</p>
                </Card>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      <section className="tp-section">
        <div className="tp-section__inner">
          <ScrollReveal>
            <SectionHeader title="Почему это стоит доверить нам" />
          </ScrollReveal>
          <div className="tp-service-features">
            {data.features.map((f, i) => (
              <ScrollReveal key={f.title} delay={i * 70} as="div">
                <Card padding="lg" className="tp-value-card">
                  <div className="tp-value-card__icon">
                    <Icon name={f.iconName} size={22} />
                  </div>
                  <div className="tp-value-card__title">{f.title}</div>
                  <p className="tp-value-card__desc">{f.desc}</p>
                </Card>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      <section className="tp-section tp-section--tint">
        <div className="tp-section__inner">
          <ScrollReveal>
            <SectionHeader title="Форматы, с которыми работаем" />
          </ScrollReveal>
          <div className="tp-format-strip">
            {data.formats.map((f) => (
              <FormatChip key={f}>{f}</FormatChip>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ — доступный аккордеон на <details>, дублируется в JSON-LD выше */}
      <section className="tp-section">
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

      {industries.length > 0 ? (
        <section className="tp-section tp-section--tint">
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

      <section className="tp-section">
        <div className="tp-section__inner">
          <ScrollReveal>
            <SectionHeader title="Другие услуги" />
          </ScrollReveal>
          <div className="tp-industry-grid">
            {others.map((svc, i) => (
              <ScrollReveal key={svc.slug} delay={i * 60}>
                <Link href={`/uslugi/${svc.slug}`} style={{ textDecoration: "none", display: "block" }}>
                  <IndustryCard icon={<Icon name={svc.iconName} color="var(--tp-primary)" />} name={svc.name} />
                </Link>
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
                  Пришлите документ — оценим за 2 минуты
                </div>
                <p className="tp-value-card__desc">
                  Объём, стоимость и срок вы увидите сразу после загрузки, до оформления заказа.
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
