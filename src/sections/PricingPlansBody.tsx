"use client";

import React from "react";
import Link from "next/link";
import { PageHero } from "@/components/layout/PageHero";
import { SectionHeader } from "@/components/marketing/SectionHeader";
import { Badge } from "@/components/core/Badge";
import { Button } from "@/components/core/Button";
import { Card } from "@/components/core/Card";
import { Icon } from "@/components/core/Icon";
import { ScrollReveal } from "@/components/core/ScrollReveal";
import type { SiteContent } from "@/lib/site-content";

/**
 * Тарифы по концепции «конвейер качества»: Бесплатный → подписка (Старт/Про/Бизнес)
 * → редактура человеком как доплата за слово. Единица учёта везде — слово.
 */
const PLANS = [
  {
    id: "free",
    name: "Бесплатный",
    price: "0 ₽",
    per: "",
    desc: "Мгновенный перевод фрагментов — попробовать качество.",
    words: 10_000,
    cta: { label: "Начать бесплатно", href: "/app", variant: "secondary" as const },
    features: [
      { text: "10 000 слов AI-перевода / мес", on: true },
      { text: "Фрагменты до 2 000 знаков", on: true },
      { text: "Оркестрация моделей", on: false },
      { text: "Термбаза и память переводов", on: false },
      { text: "Документы с сохранением вёрстки", on: false },
    ],
  },
  {
    id: "start",
    name: "Старт",
    price: "2 900 ₽",
    per: "/мес",
    desc: "Для специалистов и небольших команд.",
    words: 100_000,
    cta: { label: "Выбрать Старт", href: "/app/billing?plan=start", variant: "secondary" as const },
    features: [
      { text: "100 000 слов AI-перевода / мес", on: true },
      { text: "AI-оркестрация (выбор лучшей модели)", on: true },
      { text: "1 глоссарий", on: true },
      { text: "DOCX и PDF с сохранением вёрстки", on: true },
      { text: "API-доступ", on: false },
    ],
  },
  {
    id: "pro",
    name: "Про",
    price: "9 900 ₽",
    per: "/мес",
    desc: "Для команд с постоянным потоком документации.",
    words: 500_000,
    featured: true,
    cta: { label: "Выбрать Про", href: "/app/billing?plan=pro", variant: "primary" as const },
    features: [
      { text: "500 000 слов AI-перевода / мес", on: true },
      { text: "AI-оркестрация + объяснение выбора", on: true },
      { text: "Термбаза и TM без лимита", on: true },
      { text: "Все 65+ форматов, включая DWG", on: true },
      { text: "API-доступ", on: true },
    ],
  },
  {
    id: "business",
    name: "Бизнес",
    price: "по договору",
    per: "",
    desc: "Объёмы, SLA и интеграции под ваш процесс.",
    words: Infinity,
    cta: { label: "Связаться с нами", href: "/kontakty", variant: "secondary" as const },
    features: [
      { text: "Индивидуальные объёмы слов", on: true },
      { text: "Пакет редактуры инженером включён", on: true },
      { text: "NDA, выделенный менеджер", on: true },
      { text: "API и интеграция в ваш процесс", on: true },
      { text: "Приоритетная очередь Express", on: true },
    ],
  },
];

function recommendPlan(words: number): string {
  if (words <= 10_000) return "free";
  if (words <= 100_000) return "start";
  if (words <= 500_000) return "pro";
  return "business";
}

export interface PricingPlansBodyProps {
  content: SiteContent["tarify"];
}

export function PricingPlansBody({ content }: PricingPlansBodyProps) {
  const [words, setWords] = React.useState(60_000);
  const recommended = recommendPlan(words);
  const plans = PLANS.map((plan) => ({ ...plan, ...content.plans[plan.id as keyof typeof content.plans] }));

  return (
    <>
      <PageHero
        breadcrumb={
          <span>
            <Link href="/">Главная</Link> / Тарифы
          </span>
        }
        title={content.heroTitle}
        subtitle={content.heroSubtitle}
        ctaHref="/perevodchik"
        ctaLabel="Попробовать бесплатно"
      />

      <section className="tp-section">
        <div className="tp-section__inner">
          <ScrollReveal>
            <div className="tp-calc">
              <div className="tp-calc__row">
                <span className="tp-calc__label">Сколько слов вы переводите в месяц?</span>
                <span className="tp-calc__value">
                  {words >= 1_000_000 ? "1 000 000+" : words.toLocaleString("ru-RU")}
                </span>
              </div>
              <input
                type="range"
                className="tp-calc__slider"
                min={1000}
                max={1_000_000}
                step={1000}
                value={words}
                onChange={(e) => setWords(Number(e.target.value))}
                aria-label="Объём слов в месяц"
              />
              <span className="tp-calc__hint">
                Вам подойдёт тариф <strong>{plans.find((p) => p.id === recommended)?.name}</strong>
                {recommended === "business" ? " — обсудим объём индивидуально" : ""}
              </span>
            </div>
          </ScrollReveal>

          <div className="tp-plans" style={{ marginTop: "var(--tp-space-7)" }}>
            {plans.map((plan, i) => (
              <ScrollReveal key={plan.id} delay={i * 70}>
                <div
                  className={[
                    "tp-plan",
                    plan.featured ? "tp-plan--featured" : "",
                    plan.id === recommended ? "tp-plan--recommended" : "",
                  ]
                    .filter(Boolean)
                    .join(" ")}
                >
                  {plan.id === recommended ? (
                    <span className="tp-plan__badge">
                      <Badge tone="primary">Вам подойдёт</Badge>
                    </span>
                  ) : plan.featured ? (
                    <span className="tp-plan__badge">
                      <Badge tone="accent">Популярный</Badge>
                    </span>
                  ) : null}
                  <div className="tp-plan__name">{plan.name}</div>
                  <div className="tp-plan__price">
                    {plan.price}
                    {plan.per ? <small>{plan.per}</small> : null}
                  </div>
                  <p className="tp-plan__desc">{plan.desc}</p>
                  <ul className="tp-plan__features">
                    {plan.features.map((f) => (
                      <li key={f.text} className={f.on ? "" : "tp-plan__feature--off"}>
                        {f.text}
                      </li>
                    ))}
                  </ul>
                  <Button variant={plan.cta.variant} fullWidth as="a" href={plan.cta.href}>
                    {plan.cta.label}
                  </Button>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      <section className="tp-section tp-section--tint">
        <div className="tp-section__inner">
          <ScrollReveal>
            <SectionHeader title={content.addonTitle} subtitle={content.addonSubtitle} />
          </ScrollReveal>
          <div className="tp-addon">
            <ScrollReveal delay={0}>
              <Card padding="lg" className="tp-value-card">
                <div className="tp-value-card__icon">
                  <Icon name="user-check" size={22} />
                </div>
                <div className="tp-value-card__title">{content.addonEngineerTitle}</div>
                <p className="tp-value-card__desc">{content.addonEngineerDesc}</p>
                <p className="tp-value-card__desc" style={{ marginTop: 4, fontWeight: 600 }}>
                  ≈ 375 ₽ за переводческую страницу (250 слов)
                </p>
              </Card>
            </ScrollReveal>
            <ScrollReveal delay={80}>
              <Card padding="lg" className="tp-value-card">
                <div className="tp-value-card__icon">
                  <Icon name="globe" size={22} />
                </div>
                <div className="tp-value-card__title">{content.addonNativeTitle}</div>
                <p className="tp-value-card__desc">{content.addonNativeDesc}</p>
                <p className="tp-value-card__desc" style={{ marginTop: 4, fontWeight: 600 }}>
                  ≈ 750 ₽ за переводческую страницу (250 слов)
                </p>
              </Card>
            </ScrollReveal>
          </div>
        </div>
      </section>

      <section className="tp-section">
        <div className="tp-section__inner">
          <ScrollReveal>
            <Card variant="glass" className="tp-about-cta">
              <div>
                <div className="tp-value-card__title" style={{ fontSize: 22, marginBottom: 8 }}>
                  Не уверены, какой уровень нужен?
                </div>
                <p className="tp-value-card__desc">
                  Пришлите документ — покажем разницу между уровнями на вашем тексте.
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
