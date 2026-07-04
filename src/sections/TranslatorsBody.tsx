import React from "react";
import Link from "next/link";
import { PageHero } from "@/components/layout/PageHero";
import { SectionHeader } from "@/components/marketing/SectionHeader";
import { Card } from "@/components/core/Card";
import { Icon } from "@/components/core/Icon";
import { ScrollReveal } from "@/components/core/ScrollReveal";
import { StackedSteps } from "@/components/marketing/StackedSteps";
import { TranslatorApplicationForm } from "@/components/translators/TranslatorApplicationForm";
import { TRANSLATOR_BENEFITS, TRANSLATOR_REQUIREMENTS, TRANSLATOR_STEPS } from "@/data/translators";

const SITE_URL = "https://techperevod.com";

function breadcrumbJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Главная", item: `${SITE_URL}/` },
      { "@type": "ListItem", position: 2, name: "Переводчикам", item: `${SITE_URL}/perevodchikam` },
    ],
  };
}

export function TranslatorsBody() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd()) }}
      />

      <PageHero
        breadcrumb={
          <span>
            <Link href="/">Главная</Link> / Переводчикам
          </span>
        }
        icon={<Icon name="user-check" size={26} />}
        title="Присоединяйтесь к команде переводчиков-инженеров"
        subtitle="Техперевод.com — бюро технического перевода: AI-черновик снимает рутину, вы отвечаете за смысл и терминологию. Ищем переводчиков с профильной специализацией для постоянного сотрудничества."
        ctaHref="#anketa"
        ctaLabel="Заполнить анкету"
      />

      <section className="tp-section">
        <div className="tp-section__inner">
          <ScrollReveal>
            <SectionHeader title="Почему переводчики выбирают нас" />
          </ScrollReveal>
          <div className="tp-benefit-grid">
            {TRANSLATOR_BENEFITS.map((b, i) => (
              <ScrollReveal key={b.title} delay={i * 70} as="div">
                <Card padding="lg" className="tp-doctype-card">
                  <div className="tp-doctype-card__icon">
                    <Icon name={b.iconName} size={20} />
                  </div>
                  <div className="tp-doctype-card__title">{b.title}</div>
                  <p className="tp-doctype-card__desc">{b.desc}</p>
                </Card>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      <section className="tp-section tp-section--tint">
        <div className="tp-section__inner">
          <StackedSteps
            aside={
              <>
                <h2
                  className="tp-section-header__title"
                  style={{ fontSize: "var(--tp-text-h1)", lineHeight: "var(--tp-leading-display)" }}
                >
                  Как проходит работа с нашей <span className="tp-hero__title-accent">ТМС</span>
                </h2>
                <p className="tp-section-header__subtitle">
                  От анкеты до оплаты — прозрачный процесс через систему управления заказами бюро.
                </p>
              </>
            }
            steps={TRANSLATOR_STEPS.map((s) => ({
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

      <section className="tp-section">
        <div className="tp-section__inner">
          <ScrollReveal>
            <SectionHeader title="Что мы ожидаем" />
          </ScrollReveal>
          <ScrollReveal delay={60}>
            <Card padding="lg" style={{ maxWidth: 780, margin: "0 auto" }}>
              <ul className="tp-requirements">
                {TRANSLATOR_REQUIREMENTS.map((r) => (
                  <li key={r}>
                    <Icon name="check" size={18} color="var(--tp-accent)" />
                    <span>{r}</span>
                  </li>
                ))}
              </ul>
            </Card>
          </ScrollReveal>
        </div>
      </section>

      <section className="tp-section tp-section--tint" id="anketa">
        <div className="tp-section__inner">
          <ScrollReveal>
            <SectionHeader
              title="Анкета соискателя"
              subtitle="Расскажите о себе, укажите языковые пары и, если хотите, пройдите короткий AI-тест — это ускорит рассмотрение анкеты."
            />
          </ScrollReveal>
          <ScrollReveal delay={80}>
            <TranslatorApplicationForm />
          </ScrollReveal>
        </div>
      </section>
    </>
  );
}
