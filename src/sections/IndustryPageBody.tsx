import React from "react";
import Link from "next/link";
import { PageHero } from "@/components/layout/PageHero";
import { SectionHeader } from "@/components/marketing/SectionHeader";
import { Card } from "@/components/core/Card";
import { PricingCard } from "@/components/marketing/PricingCard";
import { Badge } from "@/components/core/Badge";
import { IndustryCard } from "@/components/marketing/IndustryCard";
import { FormatChip } from "@/components/marketing/FormatChip";
import { ScrollSteps } from "@/components/marketing/ScrollSteps";
import { ScrollReveal } from "@/components/core/ScrollReveal";
import { Icon } from "@/components/core/Icon";
import type { Industry } from "@/data/site";
import { otherIndustries } from "@/data/site";

/**
 * Shared content for every /otrasli/* industry page. Takes a plain Industry
 * object so the four pages stay thin and only differ in content.
 */
export function IndustryPageBody({ data }: { data: Industry }) {
  const others = otherIndustries(data.slug);

  return (
    <>
      <PageHero
        breadcrumb={
          <span>
            <Link href="/">Главная</Link> / <Link href="/#industries">Отрасли</Link> / {data.name}
          </span>
        }
        icon={<Icon name={data.iconName} size={26} />}
        title={data.heroTitle}
        subtitle={data.heroSubtitle}
        ctaHref="/#hero"
      />

      <section className="tp-section">
        <div className="tp-section__inner">
          <ScrollReveal>
            <SectionHeader title="Что мы переводим" />
          </ScrollReveal>
          <div className="tp-doctype-grid">
            {data.docTypes.map((d, i) => (
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

      <section className="tp-section tp-section--tint">
        <div className="tp-section__inner">
          <ScrollReveal>
            <SectionHeader title="Как проходит перевод" />
          </ScrollReveal>
          <ScrollSteps
            steps={data.steps.map((s) => ({
              icon: <Icon name={s.iconName} />,
              title: s.title,
              description: s.description,
              bullets: s.bullets,
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
