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
import { StackedSteps } from "@/components/marketing/StackedSteps";
import type { LanguagePage } from "@/data/languages";
import { SERVICES } from "@/data/services";
import { INDUSTRIES } from "@/data/site";
import { GENERIC_PROCESS_STEPS } from "@/data/genericSteps";

const SITE_URL = "https://techperevod.com";

/** Токен инлайн-ссылки в строковых полях данных: [[/путь|текст]]. */
const LINK_TOKEN_RE = /\[\[(\/[^|\]]+)\|([^\]]+)\]\]/g;

/** Схлопывает токены [[/путь|текст]] до простого текста — для JSON-LD и метаданных. */
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

/** JSON-LD FAQPage — собирается на сервере из данных языковой пары. */
function faqJsonLd(data: LanguagePage) {
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

/** JSON-LD BreadcrumbList: Главная → страница языковой пары. */
function breadcrumbJsonLd(data: LanguagePage) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Главная", item: `${SITE_URL}/` },
      {
        "@type": "ListItem",
        position: 2,
        name: data.name,
        item: `${SITE_URL}/perevod/${data.slug}`,
      },
    ],
  };
}

/**
 * Общий каркас страницы языковой пары /perevod/*. Принимает объект
 * LanguagePage, поэтому все шесть страниц различаются только контентом —
 * как ServicePageBody и IndustryPageBody.
 */
export function LanguagePageBody({ data }: { data: LanguagePage }) {
  const services = data.relatedServiceSlugs
    .map((slug) => SERVICES.find((s) => s.slug === slug))
    .filter((s): s is NonNullable<typeof s> => Boolean(s));
  const industries = data.relatedIndustrySlugs
    .map((slug) => INDUSTRIES.find((i) => i.slug === slug))
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
            <Link href="/">Главная</Link> / Языковые пары / {data.name}
          </span>
        }
        title={data.heroTitle}
        subtitle={data.heroSubtitle}
        ctaHref="#zakaz"
        ctaLabel="Получить оценку за 2 минуты"
      />

      {/* Вводный SEO-текст — узкая читабельная колонка */}
      <section className="tp-section">
        <div className="tp-section__inner">
          <ScrollReveal>
            <div className="tp-service-intro">
              {data.intro.map((paragraph, i) => (
                <p key={i}>{renderInlineLinks(paragraph)}</p>
              ))}
            </div>
          </ScrollReveal>
        </div>
      </section>

      <section className="tp-section tp-section--tint">
        <div className="tp-section__inner">
          <ScrollReveal>
            <SectionHeader title="Особенности перевода" />
          </ScrollReveal>
          <div className="tp-doctype-grid">
            {data.linguisticNotes.map((note, i) => (
              <ScrollReveal key={note.title} delay={i * 70} as="div">
                <Card padding="lg" className="tp-doctype-card">
                  <div className="tp-doctype-card__icon">
                    <Icon name={note.iconName} size={20} />
                  </div>
                  <div className="tp-doctype-card__title">{note.title}</div>
                  <p className="tp-doctype-card__desc">{note.desc}</p>
                </Card>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      <section className="tp-section">
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
            steps={GENERIC_PROCESS_STEPS.map((s) => ({
              title: s.title,
              description: s.description,
              rows: s.bullets.map((b) => ({
                icon: <Icon name="check" size={20} color="var(--tp-accent)" />,
                text: b,
              })),
            }))}
          />
        </div>
      </section>

      <section className="tp-section tp-section--tint">
        <div className="tp-section__inner">
          <ScrollReveal>
            <SectionHeader title="Какие документы чаще всего переводим" />
          </ScrollReveal>
          <div className="tp-format-strip">
            {data.typicalDocuments.map((doc) => (
              <FormatChip key={doc}>{doc}</FormatChip>
            ))}
          </div>
        </div>
      </section>

      <section className="tp-section">
        <div className="tp-section__inner">
          <ScrollReveal>
            <SectionHeader title="Кто чаще всего заказывает" />
          </ScrollReveal>
          <div className="tp-service-intro">
            <p>{renderInlineLinks(data.whoOrdersThis)}</p>
          </div>
        </div>
      </section>

      {/* FAQ — доступный аккордеон на <details>, дублируется в JSON-LD выше */}
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
                  <p className="tp-faq__a">{renderInlineLinks(item.a)}</p>
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
