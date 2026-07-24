import React from "react";
import Link from "next/link";
import { PageHero } from "@/components/layout/PageHero";
import { SectionHeader } from "@/components/marketing/SectionHeader";
import { Card } from "@/components/core/Card";
import { ScrollReveal } from "@/components/core/ScrollReveal";
import { Icon } from "@/components/core/Icon";
import { Button } from "@/components/core/Button";
import { USECASES } from "@/data/usecases";

/**
 * Хаб /zadachi — четвёртое измерение решений: бизнес-сценарии, в которых
 * нужен технический перевод. Карточки ведут на /zadachi/[slug].
 */
export function UseCasesHubBody() {
  return (
    <>
      <PageHero
        breadcrumb={
          <span>
            <Link href="/">Главная</Link> / Задачи
          </span>
        }
        title="Задачи, которые мы решаем"
        subtitle="Сертификация, экспорт, патентование, тендеры — перевод как часть бизнес-процесса, а не «текст за деньги». Выберите свой сценарий."
        ctaHref="#zakaz"
        ctaLabel="Получить оценку за 2 минуты"
      />

      <section className="tp-section">
        <div className="tp-section__inner">
          <div className="tp-doctype-grid">
            {USECASES.map((u, i) => (
              <ScrollReveal key={u.slug} delay={i * 70} as="div">
                <Link href={`/zadachi/${u.slug}`} style={{ textDecoration: "none", display: "block", height: "100%" }}>
                  <Card padding="lg" className="tp-doctype-card" style={{ height: "100%" }}>
                    <div className="tp-doctype-card__icon">
                      <Icon name={u.iconName} size={20} />
                    </div>
                    <div className="tp-doctype-card__title">{u.name}</div>
                    <p className="tp-doctype-card__desc">{u.heroSubtitle}</p>
                  </Card>
                </Link>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      <section className="tp-section tp-section--tint">
        <div className="tp-section__inner">
          <ScrollReveal>
            <SectionHeader
              title="Не нашли свой сценарий?"
              subtitle="Опишите задачу — предложим процесс и посчитаем стоимость. Другие разрезы: по типу документа, по отрасли, по языку."
            />
          </ScrollReveal>
          <ScrollReveal delay={60}>
            <div style={{ display: "flex", gap: "var(--tp-space-3)", flexWrap: "wrap", justifyContent: "center" }}>
              <Button variant="primary" size="lg" as="a" href="#zakaz">
                Описать задачу
              </Button>
              <Button variant="ghost" size="lg" as="a" href="/uslugi">
                По документам →
              </Button>
              <Button variant="ghost" size="lg" as="a" href="/otrasli">
                По отраслям →
              </Button>
              <Button variant="ghost" size="lg" as="a" href="/perevod">
                По языкам →
              </Button>
            </div>
          </ScrollReveal>
        </div>
      </section>
    </>
  );
}
