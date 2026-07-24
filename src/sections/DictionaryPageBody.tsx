"use client";

import React from "react";
import Link from "next/link";
import { PageHero } from "@/components/layout/PageHero";
import { SectionHeader } from "@/components/marketing/SectionHeader";
import { Card } from "@/components/core/Card";
import { Badge } from "@/components/core/Badge";
import { ScrollReveal } from "@/components/core/ScrollReveal";
import { Icon } from "@/components/core/Icon";
import { Button } from "@/components/core/Button";
import { Input } from "@/components/forms/Input";
import type { DictionaryCollection } from "@/data/dictionary";
import { DICTIONARIES } from "@/data/dictionary";

const SITE_URL = "https://techperevod.com";

/** JSON-LD BreadcrumbList: Главная → Словарь → коллекция. */
function breadcrumbJsonLd(data: DictionaryCollection) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Главная", item: `${SITE_URL}/` },
      { "@type": "ListItem", position: 2, name: "Словарь", item: `${SITE_URL}/slovar` },
      {
        "@type": "ListItem",
        position: 3,
        name: data.title,
        item: `${SITE_URL}/slovar/${data.slug}`,
      },
    ],
  };
}

/**
 * Страница коллекции терминов /slovar/[slug]. Клиентский компонент — нужен
 * для лайв-фильтра по списку (аналог поиска в GlossarySection на главной);
 * сам список терминов приходит с сервера как проп, JS только фильтрует уже
 * отрисованные данные, ничего не дозагружает.
 */
export function DictionaryPageBody({ data }: { data: DictionaryCollection }) {
  const [query, setQuery] = React.useState("");

  const normalized = query.trim().toLowerCase();
  const filtered = normalized
    ? data.terms.filter(
        (t) =>
          t.ru.toLowerCase().includes(normalized) ||
          t.en.toLowerCase().includes(normalized) ||
          (t.note ?? "").toLowerCase().includes(normalized)
      )
    : data.terms;

  const others = DICTIONARIES.filter((d) => d.slug !== data.slug);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd(data)) }}
      />

      <PageHero
        breadcrumb={
          <span>
            <Link href="/">Главная</Link> / <Link href="/slovar">Словарь</Link> / {data.title}
          </span>
        }
        badge={<Badge tone="primary">{data.terms.length} терминов</Badge>}
        icon={<Icon name={data.iconName} size={26} />}
        title={data.title}
        subtitle={data.subtitle}
        ctaHref="#zakaz"
        ctaLabel="Получить оценку за 2 минуты"
      />

      {/* Вводный SEO-текст */}
      <section className="tp-section" style={{ paddingTop: 0 }}>
        <div className="tp-section__inner">
          <ScrollReveal>
            <div className="tp-service-intro">
              <p>{data.intro}</p>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* Список терминов с лайв-фильтром */}
      <section className="tp-section tp-section--tint">
        <div className="tp-section__inner">
          <ScrollReveal>
            <SectionHeader title="Список терминов" subtitle="Начните вводить термин на русском или английском — список отфильтруется на лету." />
          </ScrollReveal>

          <div className="tp-dict">
            <div className="tp-dict__toolbar">
              <Input
                placeholder="Поиск термина…"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                aria-label="Поиск термина в коллекции"
              />
              <span className="tp-dict__count">
                {filtered.length === data.terms.length
                  ? `Всего терминов: ${data.terms.length}`
                  : `Найдено: ${filtered.length} из ${data.terms.length}`}
              </span>
            </div>

            {filtered.length > 0 ? (
              <div className="tp-dict__table-wrap">
                <table className="tp-dict__table">
                  <thead>
                    <tr>
                      <th>Русский</th>
                      <th>English</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filtered.map((t) => (
                      <tr key={t.ru}>
                        <td>
                          <span className="tp-mono">{t.ru}</span>
                          {t.note ? <div className="tp-dict__note">{t.note}</div> : null}
                        </td>
                        <td className="tp-mono">{t.en}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ) : (
              <p className="tp-dict__empty">
                По запросу «{query}» ничего не нашлось. Проверьте написание или{" "}
                <Link href="/kontakty">пришлите термин нам</Link> — уточним перевод и, возможно,
                добавим его в коллекцию.
              </p>
            )}
          </div>
        </div>
      </section>

      {others.length > 0 ? (
        <section className="tp-section">
          <div className="tp-section__inner">
            <ScrollReveal>
              <SectionHeader title="Другие коллекции" />
            </ScrollReveal>
            <div className="tp-service-features">
              {others.map((d, i) => (
                <ScrollReveal key={d.slug} delay={i * 60} as="div">
                  <Link
                    href={`/slovar/${d.slug}`}
                    style={{ textDecoration: "none", display: "block", height: "100%" }}
                  >
                    <Card padding="lg" interactive className="tp-value-card" style={{ height: "100%" }}>
                      <div className="tp-value-card__icon">
                        <Icon name={d.iconName} size={22} />
                      </div>
                      <div className="tp-value-card__title">{d.title}</div>
                      <p className="tp-value-card__desc">{d.subtitle}</p>
                    </Card>
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
                  Не нашли термин? Пришлите документ — уточним терминологию для вашей отрасли
                </div>
                <p className="tp-value-card__desc">
                  Загрузите документ на странице контактов — соберём глоссарий под вашу компанию и
                  дадим оценку стоимости и срока перевода.
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
