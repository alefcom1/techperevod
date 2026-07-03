import React from "react";
import Link from "next/link";
import { PageHero } from "@/components/layout/PageHero";
import { SectionHeader } from "@/components/marketing/SectionHeader";
import { Card } from "@/components/core/Card";
import { ScrollReveal } from "@/components/core/ScrollReveal";
import { Icon } from "@/components/core/Icon";
import { Button } from "@/components/core/Button";
import { LANGUAGES } from "@/data/languages";

const SITE_URL = "https://techperevod.com";

const FAQ = [
  {
    q: "Работаете ли вы с языковыми парами, которых нет в списке ниже?",
    a: "Да. Шесть пар ниже — самые частые запросы у наших клиентов, но AI-оркестратор поддерживает десятки языков, включая корейский, итальянский, турецкий и другие. Если нужной пары нет отдельной страницей — это не значит, что мы её не переводим: пришлите документ на страницу контактов, оценим объём и подберём редактора.",
  },
  {
    q: "Как вы подбираете модель под конкретную языковую пару?",
    a: "AI-оркестратор роутит документ на модель, которая объективно точнее для этой пары языков и типа документа — например, для европейских языков это часто DeepL или Claude, а для пар с русским хорошо показывают себя и локальные модели вроде YandexGPT. Маршрутизация видна в отчёте по заказу.",
  },
  {
    q: "Нужен ли перевод носителем языка, или достаточно двуязычного редактора?",
    a: "Для внутренней документации и большинства инженерных текстов достаточно редактора-инженера, свободно владеющего обоими языками — это быстрее и дешевле. Для публичных материалов, маркетинга и текстов, которые увидят конечные пользователи в стране языка перевода, рекомендуем добавить вычитку носителем — это доплата за слово поверх любого тарифа.",
  },
  {
    q: "Перевод с редкого языка стоит дороже?",
    a: "Да, обычно так: чем меньше квалифицированных инженеров-редакторов работает с парой, тем выше ставка. Английский, немецкий и китайский — самые ходовые пары с наиболее конкурентной ценой; точную стоимость для вашей пары и объёма покажет калькулятор на странице тарифов.",
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
      { "@type": "ListItem", position: 2, name: "Языковые пары", item: `${SITE_URL}/perevod` },
    ],
  };
}

/**
 * Хаб-страница /perevod — с какими языками мы работаем. Индекс языковых пар
 * из data/languages.ts (LANGUAGES); карточка ведёт на /perevod/[slug]
 * (LanguagePageBody).
 */
export function LanguagesHubBody() {
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
            <Link href="/">Главная</Link> / Языковые пары
          </span>
        }
        icon={<Icon name="globe" size={26} />}
        title="С какими языками мы работаем"
        subtitle="AI-оркестратор моделей плюс инженер-редактор для каждой языковой пары — с учётом терминологии, стандартов и грамматических особенностей конкретного языка."
        ctaHref="/kontakty"
        ctaLabel="Получить оценку за 2 минуты"
      />

      <section className="tp-section">
        <div className="tp-section__inner">
          <ScrollReveal>
            <div className="tp-service-intro">
              <p>
                Технический перевод — это не «прогнать текст через модель», а выбрать модель и
                процесс проверки под конкретную пару языков. Немецкие составные термины, китайские
                иероглифы без пробелов между словами, различия между испанским Испании и Латинской
                Америки — у каждой пары свои подводные камни, из-за которых буквальный машинный
                перевод искажает смысл технического документа.
              </p>
              <p>
                Роутер платформы выбирает модель, которая объективно точнее для конкретной пары и
                типа документа — GPT, Claude, DeepL или локальные модели вроде YandexGPT и
                DeepSeek — а редактор с профильным образованием и знанием обоих языков проверяет
                черновик и сверяет термины с вашей термбазой. Ниже — языковые пары, для которых у
                нас накоплена отдельная практика; работаем и с другими парами по запросу.
              </p>
            </div>
          </ScrollReveal>
        </div>
      </section>

      <section className="tp-section tp-section--tint">
        <div className="tp-section__inner">
          <ScrollReveal>
            <SectionHeader title="Языковые пары" />
          </ScrollReveal>
          <div className="tp-service-features">
            {LANGUAGES.map((lang, i) => (
              <ScrollReveal key={lang.slug} delay={i * 60} as="div">
                <Link
                  href={`/perevod/${lang.slug}`}
                  style={{ textDecoration: "none", display: "block", height: "100%" }}
                >
                  <Card padding="lg" interactive className="tp-value-card" style={{ height: "100%" }}>
                    <div className="tp-value-card__icon">
                      <Icon name="globe" size={22} />
                    </div>
                    <div className="tp-value-card__title">{lang.name}</div>
                    <p className="tp-value-card__desc">{lang.heroSubtitle}</p>
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
                  Не нашли свою языковую пару?
                </div>
                <p className="tp-value-card__desc">
                  Пришлите документ — скажем, работаем ли с этой парой, и оценим объём за 2 минуты.
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
