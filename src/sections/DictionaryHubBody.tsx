import React from "react";
import Link from "next/link";
import { PageHero } from "@/components/layout/PageHero";
import { SectionHeader } from "@/components/marketing/SectionHeader";
import { Card } from "@/components/core/Card";
import { Badge } from "@/components/core/Badge";
import { ScrollReveal } from "@/components/core/ScrollReveal";
import { Icon } from "@/components/core/Icon";
import { Button } from "@/components/core/Button";
import { DICTIONARIES } from "@/data/dictionary";

const SITE_URL = "https://techperevod.com";

/** JSON-LD BreadcrumbList: Главная → Словарь. */
function breadcrumbJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Главная", item: `${SITE_URL}/` },
      { "@type": "ListItem", position: 2, name: "Словарь", item: `${SITE_URL}/slovar` },
    ],
  };
}

/**
 * Хаб-страница /slovar — индекс тематических коллекций терминов из
 * data/dictionary.ts. Каждая карточка ведёт на свою страницу /slovar/[slug]
 * (DictionaryPageBody). Структура намеренно повторяет ServicesHubBody.
 */
export function DictionaryHubBody() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd()) }}
      />

      <PageHero
        breadcrumb={
          <span>
            <Link href="/">Главная</Link> / Словарь
          </span>
        }
        badge={<Badge tone="primary">{DICTIONARIES.length} коллекции терминов</Badge>}
        icon={<Icon name="database" size={26} />}
        title="Технический словарь"
        subtitle="Коллекции терминов «русский ↔ английский» по отраслям: машиностроение, нефтегаз, IT и локализация, медтехника и фарма — с пояснениями там, где перевод неочевиден."
        ctaHref="#zakaz"
        ctaLabel="Получить оценку за 2 минуты"
      />

      {/* Вводный SEO-текст */}
      <section className="tp-section" style={{ paddingTop: 0 }}>
        <div className="tp-section__inner">
          <ScrollReveal>
            <div className="tp-service-intro">
              <p>
                Технический перевод почти всегда упирается в терминологию: правильно назвать узел,
                документ или процедуру важнее, чем гладко построить фразу. Мы собрали словарь по
                направлениям, с которыми чаще всего работаем, — не как исчерпывающий справочник, а
                как рабочий список терминов, которые снимают большинство вопросов при первом
                знакомстве с документом отрасли.
              </p>
              <p>
                Каждая коллекция — это 50–80 пар терминов с указанием случаев, где перевод
                неочевиден: ложные друзья переводчика, ссылки на ГОСТ и другие стандарты,
                неоднозначные термины, которые в разных разделах документа переводятся по-разному.
                Если нужного термина нет в коллекции или он специфичен для вашего производства —
                пришлите документ на <Link href="/kontakty">страницу контактов</Link>, уточним
                терминологию отдельно.
              </p>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* Сетка коллекций */}
      <section className="tp-section tp-section--tint">
        <div className="tp-section__inner">
          <ScrollReveal>
            <SectionHeader title="Коллекции терминов" />
          </ScrollReveal>
          <div className="tp-service-features">
            {DICTIONARIES.map((dict, i) => (
              <ScrollReveal key={dict.slug} delay={i * 60} as="div">
                <Link
                  href={`/slovar/${dict.slug}`}
                  style={{ textDecoration: "none", display: "block", height: "100%" }}
                >
                  <Card padding="lg" interactive className="tp-value-card" style={{ height: "100%" }}>
                    <div className="tp-value-card__icon">
                      <Icon name={dict.iconName} size={22} />
                    </div>
                    <div className="tp-value-card__title">{dict.title}</div>
                    <p className="tp-value-card__desc">{dict.subtitle}</p>
                    <Badge tone="neutral" size="sm">
                      {dict.terms.length} терминов
                    </Badge>
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
            <Card variant="glass" className="tp-about-cta">
              <div>
                <div className="tp-value-card__title" style={{ fontSize: 22, marginBottom: 8 }}>
                  Не нашли термин?
                </div>
                <p className="tp-value-card__desc">
                  Пришлите документ — уточним терминологию для вашей отрасли и, если нужно, соберём
                  отдельный глоссарий под ваше производство.
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
