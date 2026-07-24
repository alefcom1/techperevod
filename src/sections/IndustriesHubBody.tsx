import React from "react";
import Link from "next/link";
import { PageHero } from "@/components/layout/PageHero";
import { SectionHeader } from "@/components/marketing/SectionHeader";
import { Card } from "@/components/core/Card";
import { Badge } from "@/components/core/Badge";
import { ScrollReveal } from "@/components/core/ScrollReveal";
import { Icon } from "@/components/core/Icon";
import { Button } from "@/components/core/Button";
import { INDUSTRIES } from "@/data/site";

const SITE_URL = "https://techperevod.com";

const FAQ = [
  {
    q: "Не нашли свою отрасль в списке — работаете ли вы с ней?",
    a: "Список ниже — это отрасли, для которых у нас накоплена отдельная терминологическая база и есть закреплённые инженеры-редакторы. Мы переводим документацию и для других сфер — пришлите документ на страницу контактов, подберём специалиста профильного образования под вашу задачу.",
  },
  {
    q: "Чем перевод «для отрасли» отличается от перевода конкретного типа документа?",
    a: "Тип документа определяет формат и структуру работы (чертёж переводится иначе, чем инструкция), а отрасль — терминологию и нормативную базу: одно и то же слово в нефтегазе, машиностроении и медтехе может переводиться по-разному. Отраслевая термбаза фиксирует правильный вариант для вашей компании раз и навсегда.",
  },
  {
    q: "Можно ли получить инженера с опытом именно в моей отрасли, а не общего технического переводчика?",
    a: "Да, это стандартная практика на платформе: заказы распределяются редакторам с профильным образованием и опытом в конкретной отрасли — металлургу не отдают патентную заявку по фармацевтике, и наоборот.",
  },
];

function faqJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: FAQ.map((item) => ({
      "@type": "Question",
      name: item.q,
      acceptedAnswer: { "@type": "Answer", text: item.a },
    })),
  };
}

function breadcrumbJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Главная", item: `${SITE_URL}/` },
      { "@type": "ListItem", position: 2, name: "Отрасли", item: `${SITE_URL}/otrasli` },
    ],
  };
}

/**
 * Хаб-страница /otrasli — индекс всех отраслей из data/site.ts (INDUSTRIES).
 * Карточка ведёт на свою SEO-страницу /otrasli/[slug] (IndustryPageBody).
 */
export function IndustriesHubBody() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd()) }} />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd()) }}
      />

      <PageHero
        breadcrumb={
          <span>
            <Link href="/">Главная</Link> / Отрасли
          </span>
        }
        badge={<Badge tone="primary">{INDUSTRIES.length} отраслей</Badge>}
        icon={<Icon name="cog" size={26} />}
        title="Технический перевод по отраслям"
        subtitle="Своя терминологическая база, форматы и специалист-редактор для каждой отрасли — от нефтегаза до авиации."
        ctaHref="#zakaz"
        ctaLabel="Получить оценку за 2 минуты"
      />

      <section className="tp-section">
        <div className="tp-section__inner">
          <ScrollReveal>
            <div className="tp-service-intro">
              <p>
                Инженер, который двадцать лет проработал с нефтегазовым оборудованием, и инженер,
                специализирующийся на медицинской технике, по-разному переведут одно и то же слово
                «клапан» — и оба будут правы в своей области, потому что за термином стоит разное
                оборудование, разные стандарты и разная цена ошибки. Универсальный переводчик,
                даже человек с профильным техническим образованием, не может одинаково хорошо
                знать регламенты Ростехнадзора для нефтегазовой отрасли, требования Росздравнадзора
                к медицинским изделиям и ГОСТы машиностроения одновременно.
              </p>
              <p>
                Поэтому на платформе заказ маршрутизируется не просто к «техническому переводчику»,
                а к редактору с опытом именно в вашей отрасли, и подставляется термбаза, накопленная
                по этой отрасли — своя для нефтегаза, своя для IT, своя для машиностроения. Ниже —
                отрасли, с которыми мы работаем регулярно; для каждой указаны типичные документы и
                форматы.
              </p>
            </div>
          </ScrollReveal>
        </div>
      </section>

      <section className="tp-section tp-section--tint">
        <div className="tp-section__inner">
          <ScrollReveal>
            <SectionHeader title="Все отрасли" />
          </ScrollReveal>
          <div className="tp-service-features">
            {INDUSTRIES.map((ind, i) => (
              <ScrollReveal key={ind.slug} delay={i * 60} as="div">
                <Link
                  href={`/otrasli/${ind.slug}`}
                  style={{ textDecoration: "none", display: "block", height: "100%" }}
                >
                  <Card padding="lg" interactive className="tp-value-card" style={{ height: "100%" }}>
                    <div className="tp-value-card__icon">
                      <Icon name={ind.iconName} size={22} />
                    </div>
                    <div className="tp-value-card__title">{ind.name}</div>
                    <p className="tp-value-card__desc">{ind.heroSubtitle}</p>
                  </Card>
                </Link>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      <section className="tp-section">
        <div className="tp-section__inner">
          <ScrollReveal>
            <SectionHeader title="Частые вопросы" />
          </ScrollReveal>
          <div className="tp-faq">
            {FAQ.map((item, i) => (
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

      <section className="tp-section">
        <div className="tp-section__inner">
          <ScrollReveal>
            <Card variant="glass" className="tp-about-cta">
              <div>
                <div className="tp-value-card__title" style={{ fontSize: 22, marginBottom: 8 }}>
                  Не нашли свою отрасль?
                </div>
                <p className="tp-value-card__desc">
                  Пришлите документ — подберём редактора с подходящим профильным образованием и
                  оценим объём за 2 минуты.
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
